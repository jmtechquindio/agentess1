# Piloto CDP ejecutado desde WINDOWS (el puerto de depuracion del navegador solo
# escucha en el loopback de Windows y WSL esta en modo NAT).
#
# LIMITACION REAL: CDP no puede conceder activeTab, que Chrome concede solo con
# una pulsacion sobre el icono. Por eso el puente chrome.scripting.executeScript
# no se puede automatizar. Lo que si se ejecuta con el codigo REAL de la
# extension, dentro del navegador real, sobre el DOM real:
#   - extractor.js tal cual, en la pagina real y en una pagina real ajena
#   - mostrar() y construirCsv()/construirCsvExcepciones()/descargar() de popup.js
#   - chrome.downloads
import base64
import json
import os
import re
import sys
import time
import urllib.request

import websocket

NAV = sys.argv[1] if len(sys.argv) > 1 else "chrome"
PUERTO = int(sys.argv[2]) if len(sys.argv) > 2 else 9222
EXT_DIR = r"C:\practica\modulo4\entregable-modulo-04\extension"
SALIDA = r"C:\practica\modulo4\entregable-modulo-04\salida"
CAPTURAS = r"C:\tmp\mod4-prueba\capturas"
DESCARGAS = r"C:\tmp\mod4-prueba\descargas-" + NAV
os.makedirs(DESCARGAS, exist_ok=True)
os.makedirs(CAPTURAS, exist_ok=True)

URL_CATEGORIA = "https://ferricentro.com/productos/herramienta-manual"
URL_AJENA = "https://sitio-ajeno-de-prueba.test/productos/herramienta-manual"

resultados = []


def ok(n, d=""):
    resultados.append(("PASS", n, d))
    print("PASS  %s%s" % (n, (" :: " + d) if d else ""))


def fallo(n, d=""):
    resultados.append(("FAIL", n, d))
    print("FAIL  %s%s" % (n, (" :: " + d) if d else ""))


class CDP:
    def __init__(self, u):
        self.ws = websocket.create_connection(u, timeout=45, max_size=90 * 1024 * 1024)
        self.id = 0

    def enviar(self, m, p=None, s=None, timeout=45):
        self.id += 1
        mid = self.id
        d = {"id": mid, "method": m, "params": p or {}}
        if s:
            d["sessionId"] = s
        self.ws.send(json.dumps(d))
        fin = time.time() + timeout
        while time.time() < fin:
            r = json.loads(self.ws.recv())
            if r.get("id") == mid:
                if "error" in r:
                    raise RuntimeError("%s -> %s" % (m, r["error"]))
                return r.get("result", {})
        raise TimeoutError(m)

    def ev(self, e, s, timeout=60):
        r = self.enviar("Runtime.evaluate",
                        {"expression": e, "returnByValue": True, "awaitPromise": True}, s, timeout)
        if r.get("exceptionDetails"):
            raise RuntimeError("JS: " + json.dumps(r["exceptionDetails"])[:260])
        return r.get("result", {}).get("value")

    def esperar_cambio(self, expr, s, anterior, segundos=45):
        fin = time.time() + segundos
        while time.time() < fin:
            v = self.ev(expr, s)
            if v and v != anterior:
                return v
            time.sleep(0.3)
        return self.ev(expr, s)


ver = json.load(urllib.request.urlopen("http://127.0.0.1:%d/json/version" % PUERTO, timeout=10))
print("navegador: %s" % ver.get("Browser"))
cdp = CDP(ver["webSocketDebuggerUrl"])


def abrir(url):
    t = cdp.enviar("Target.createTarget", {"url": "about:blank"})["targetId"]
    s = cdp.enviar("Target.attachToTarget", {"targetId": t, "flatten": True})["sessionId"]
    cdp.enviar("Page.enable", {}, s)
    cdp.enviar("Runtime.enable", {}, s)
    cdp.enviar("Page.navigate", {"url": url}, s)
    time.sleep(1.5)
    cdp.ev("new Promise(r=>document.readyState==='complete'?r(1):addEventListener('load',()=>r(1)))", s)
    return t, s


# ================================================================= carga
ext_id = cdp.enviar("Extensions.loadUnpacked", {"path": EXT_DIR}).get("id")
(ok if ext_id else fallo)("Chrome carga la extension sin errores de manifiesto", str(ext_id))
if not ext_id:
    sys.exit(1)

man = json.load(open(os.path.join(EXT_DIR, "manifest.json"), encoding="utf-8"))
(ok if man.get("manifest_version") == 3 else fallo)("Manifest V3", str(man.get("manifest_version")))
perm = sorted(man.get("permissions") or [])
(ok if perm == ["activeTab", "downloads", "scripting"] else fallo)(
    "Solo los tres permisos acordados", str(perm))
(ok if not man.get("background") else fallo)("Sin service worker declarado")
(ok if not man.get("content_scripts") else fallo)("Sin content scripts declarados")
(ok if "<all_urls>" not in json.dumps(man) and not man.get("host_permissions") else fallo)(
    "Sin <all_urls> ni host_permissions")
(ok if os.path.exists(os.path.join(EXT_DIR, man["action"]["default_popup"])) else fallo)(
    "Recurso declarado existe", man["action"]["default_popup"])

# ================================================================= pagina real
t_cat, s_cat = abrir(URL_CATEGORIA)
info = json.loads(cdp.ev(
    "JSON.stringify({href:location.href,"
    "acotadas:document.querySelectorAll('div.products-grid ol.product-items > li.product-item').length,"
    "globales:document.querySelectorAll('li.product-item').length})", s_cat))
(ok if info["href"].startswith("https://ferricentro.com/") else fallo)(
    "La pagina se sirve como ferricentro.com sobre TLS", info["href"])
(ok if info["acotadas"] == 24 else fallo)(
    "El selector acotado encuentra 24 en el navegador real",
    "acotadas=%d globales=%d" % (info["acotadas"], info["globales"]))

# ==================================================== extractor.js tal cual
src_ext = open(os.path.join(EXT_DIR, "extractor.js"), encoding="utf-8").read().strip().rstrip(";")
res = json.loads(cdp.ev("JSON.stringify((%s))" % src_ext, s_cat))
(ok if res.get("estado") == "ok" else fallo)(
    "extractor.js real devuelve estado ok", "%s / %d productos" % (res.get("estado"), len(res.get("productos", []))))
prods = res.get("productos", [])
(ok if len(prods) == 24 else fallo)("24 productos", str(len(prods)))
p0 = prods[0] if prods else {}
(ok if str(p0.get("sku", "")).startswith("FF-") else fallo)("SKU leido del DOM", str(p0.get("sku")))
(ok if str(p0.get("precio_cop")) == "66000" else fallo)(
    "precio leido del DOM real", "%s -> %s" % (str(p0.get("nombre"))[:30], p0.get("precio_cop")))
(ok if p0.get("estado_revision") == "requiere_revision" else fallo)(
    "estado coherente con D1", str(p0.get("estado_revision")))
(ok if len(p0.get("observaciones", [])) == 2 else fallo)(
    "observaciones con campo y valor explicitos",
    json.dumps(p0.get("observaciones", []), ensure_ascii=False)[:130])
CONTRATO = ["proveedor", "sku", "nombre", "marca", "precio_cop", "inventario", "activo",
            "fuente_url", "fecha_consulta", "estado_revision"]
(ok if set(CONTRATO) <= set(p0.keys()) else fallo)(
    "el registro incluye los 10 campos del contrato",
    "faltan: %s" % sorted(set(CONTRATO) - set(p0.keys())))
(ok if all(set(p.keys()) == set(p0.keys()) for p in prods) else fallo)(
    "las 24 filas tienen la misma forma", "12 claves: 10 del contrato + url_producto + observaciones")
(ok if res.get("total") == 2147 else fallo)("total declarado leido", str(res.get("total")))
(ok if all(not p.get("inventario") and not p.get("activo") for p in prods) else fallo)(
    "inventario y activo vacios en las 24 filas")

# ==================================================== guardia de dominio, real
t_aj, s_aj = abrir(URL_AJENA)
ajena = json.loads(cdp.ev("JSON.stringify((%s))" % src_ext, s_aj))
(ok if ajena.get("estado") == "parada" else fallo)(
    "extractor.js real se detiene en un dominio ajeno",
    "%s :: %s" % (ajena.get("estado"), str(ajena.get("motivo"))[:70]))
(ok if "ferricentro.com" in str(ajena.get("motivo", "")) else fallo)(
    "el motivo nombra el dominio autorizado", str(ajena.get("motivo"))[:80])
(ok if len(ajena.get("productos", [])) == 0 else fallo)("cero productos en dominio ajeno")

# ================================================================= popup real
t_pop = cdp.enviar("Target.createTarget", {"url": "chrome-extension://%s/popup.html" % ext_id})["targetId"]
s_pop = cdp.enviar("Target.attachToTarget", {"targetId": t_pop, "flatten": True})["sessionId"]
cdp.enviar("Page.enable", {}, s_pop)
cdp.enviar("Runtime.enable", {}, s_pop)
cdp.ev("window.__err=[];addEventListener('error',e=>window.__err.push(String(e.message)));1", s_pop)

ini = json.loads(cdp.ev(
    "JSON.stringify({titulo:document.title,"
    "descarga:document.getElementById('descargar').disabled,"
    "estado:(document.querySelector('#estado .estado__texto')||{}).textContent,"
    "css:getComputedStyle(document.getElementById('analizar')).display,"
    "tituloVisible:!!document.querySelector('.app__title').offsetHeight,"
    "alto:document.body.scrollHeight})", s_pop))
(ok if "Ferricentro" in (ini["titulo"] or "") else fallo)("El popup carga desde chrome-extension://", ini["titulo"])
(ok if ini["descarga"] is True else fallo)("El boton Descargar arranca deshabilitado")
(ok if ini["css"] != "none" else fallo)("El CSS se aplico (boton visible)", "display=%s" % ini["css"])
(ok if ini["tituloVisible"] and ini["alto"] > 100 else fallo)(
    "La interfaz se compone en el navegador", "titulo visible, alto=%dpx" % ini["alto"])

api = json.loads(cdp.ev(
    "JSON.stringify({tabs:typeof chrome.tabs.query,scripting:typeof chrome.scripting.executeScript,"
    "downloads:typeof chrome.downloads.download})", s_pop))
(ok if all(v == "function" for v in api.values()) else fallo)("APIs presentes en el popup", json.dumps(api))

# exponer el codigo REAL de popup.js (se desenvuelve la IIFE, sin editarlo)
src_pop = open(os.path.join(EXT_DIR, "popup.js"), encoding="utf-8").read()
cuerpo = src_pop[src_pop.index("'use strict';") + len("'use strict';"):]
cuerpo = cuerpo[: cuerpo.rindex("})();")]
exponer = ("(function(){" + cuerpo + "\nreturn {construirCsv:construirCsv,"
           "construirCsvExcepciones:construirCsvExcepciones,descargar:descargar,mostrar:mostrar,"
           "COLS:COLS,COLS_EXCEPCIONES:COLS_EXCEPCIONES};})()").strip().rstrip(";")
cdp.ev("window.__x=(%s);1" % exponer, s_pop)
ch = json.loads(cdp.ev("JSON.stringify({f:Object.keys(window.__x),c:window.__x.COLS.length,"
                       "e:window.__x.COLS_EXCEPCIONES.length})", s_pop))
(ok if ch["c"] == 10 else fallo)("COLS tiene las 10 columnas", str(ch["c"]))
(ok if ch["e"] == 7 else fallo)("COLS_EXCEPCIONES tiene las 7 columnas", str(ch["e"]))

# ------------------------------------------- UI real con resultado real 'ok'
cdp.ev("window.__r=%s;1" % json.dumps(res), s_pop)
# popup.js linea 315: p.fuente_url = p.fuente_url || urlFuente  (D6)
cdp.ev("window.__r.productos.forEach(function(p){p.fuente_url=p.fuente_url||%s});1"
       % json.dumps(URL_CATEGORIA), s_pop)
relleno = json.loads(cdp.ev(
    "JSON.stringify({todas:window.__r.productos.every(function(p){return p.fuente_url===%s}),"
    "distintas:new Set(window.__r.productos.map(function(p){return p.fuente_url})).size})"
    % json.dumps(URL_CATEGORIA), s_pop))
(ok if relleno["todas"] and relleno["distintas"] == 1 else fallo)(
    "fuente_url se completa con la URL de la pestana (popup.js:315)", json.dumps(relleno))
cdp.ev("window.__x.mostrar(window.__r);1", s_pop)
ui = json.loads(cdp.ev(
    "JSON.stringify({conteo:document.getElementById('conteo').textContent.trim(),"
    "total:document.getElementById('total').textContent.trim(),"
    "verificados:document.getElementById('verificados').textContent.trim(),"
    "filas:document.querySelectorAll('#vista-cuerpo tr').length,"
    "rango:(document.getElementById('vista-rango')||{}).textContent,"
    "descargaActiva:!document.getElementById('descargar').disabled,"
    "faltantes:document.getElementById('faltantes-lista').textContent.replace(/\\s+/g,' ').trim()})", s_pop))
print("      UI ok  : %s" % json.dumps(ui, ensure_ascii=False)[:230])
(ok if ui["conteo"] == "24" else fallo)("La UI real muestra 24", ui["conteo"])
(ok if ui["total"] == "2147" else fallo)("La UI real muestra el total 2147 junto al conteo", ui["total"])
(ok if ui["verificados"] == "0" else fallo)("La UI real muestra 0 verificados", ui["verificados"])
(ok if ui["filas"] == 12 else fallo)("La vista previa real muestra 12 filas", str(ui["filas"]))
(ok if ui["descargaActiva"] else fallo)("La UI real habilita Descargar")
(ok if "inventario" in ui["faltantes"] and "activo" in ui["faltantes"] else fallo)(
    "La UI real declara los campos ausentes", ui["faltantes"][:100])

# ------------------------------------ UI real con resultado real 'parada'
# Se recarga el popup para partir del estado inicial: el manejador del boton
# reinicia 'descargar' en cada analisis y aqui se llama a mostrar() directamente.
cdp.enviar("Page.reload", {}, s_pop)
time.sleep(2.5)
cdp.ev("window.__x=(%s);1" % exponer, s_pop)
cdp.ev("window.__r=%s;1" % json.dumps(res), s_pop)
cdp.ev("window.__r.productos.forEach(function(p){p.fuente_url=p.fuente_url||%s});1"
       % json.dumps(URL_CATEGORIA), s_pop)
cdp.ev("window.__p=%s;window.__x.mostrar(window.__p);1" % json.dumps(ajena), s_pop)
uip = json.loads(cdp.ev(
    "JSON.stringify({nivel:document.getElementById('estado').dataset.nivel,"
    "titular:(document.querySelector('#estado .estado__texto')||{}).textContent,"
    "detalle:(document.querySelector('#estado .estado__detalle')||{}).textContent,"
    "descarga:document.getElementById('descargar').disabled,"
    "aviso:(document.getElementById('avisos')||{}).textContent})", s_pop))
(ok if uip["nivel"] == "error" else fallo)(
    "El resultado real 'parada' se pinta como estado de error", "nivel=%s" % uip["nivel"])
(ok if "dominio autorizado" in (uip["detalle"] or "") else fallo)(
    "La UI real explica el rechazo por dominio", str(uip["detalle"])[:80])
(ok if uip["descarga"] is True else fallo)("Sin descarga tras un resultado 'parada'")
(ok if "engañoso" in (uip["aviso"] or "") else fallo)(
    "La UI real advierte que no se genero CSV", str(uip["aviso"])[:80])

# ==================================================== CSV y descargas reales
cdp.ev("window.__c1=window.__x.construirCsv(window.__r.productos,window.__x.COLS);"
       "window.__c2=window.__x.construirCsvExcepciones(window.__r.productos);1", s_pop)
c1 = cdp.ev("window.__c1", s_pop)
c2 = cdp.ev("window.__c2", s_pop)
normaliza = lambda t: re.sub(r"\d{4}-\d\d-\d\dT[\d:.+-]+", "FECHA", t)
ref1 = open(os.path.join(SALIDA, "productos_erp.csv"), encoding="utf-8-sig").read()
ref2 = open(os.path.join(SALIDA, "excepciones.csv"), encoding="utf-8-sig").read()
def comparar(a, b, etiqueta):
    la, lb = normaliza(a).splitlines(), normaliza(b).splitlines()
    if la == lb:
        ok(etiqueta, "%d lineas identicas" % len(la))
        return
    dif = next((i for i, (x, y) in enumerate(zip(la, lb)) if x != y), min(len(la), len(lb)))
    fallo(etiqueta, "primera diferencia en la linea %d -> %s || %s"
          % (dif + 1, la[dif][:90] if dif < len(la) else "(fin)", lb[dif][:90] if dif < len(lb) else "(fin)"))


comparar(c1, ref1, "El CSV del navegador coincide con la muestra del entregable")
comparar(c2, ref2, "excepciones.csv coincide con la muestra del entregable")
l1 = [l for l in c1.splitlines() if l.strip()]
(ok if l1[0] == "proveedor,sku,nombre,marca,precio_cop,inventario,activo,fuente_url,"
                 "fecha_consulta,estado_revision" else fallo)("Cabecera exacta", l1[0][:70])
(ok if len(l1) - 1 == 24 else fallo)("24 filas de datos", str(len(l1) - 1))
(ok if '""' in c1 else fallo)("Escapa comillas dobles")
(ok if all(l.count(",") >= 9 for l in l1[1:]) else fallo)("Cada fila con sus 10 campos")
l2 = [l for l in c2.splitlines() if l.strip()]
(ok if len(l2) - 1 == 48 else fallo)("excepciones.csv con 48 filas", str(len(l2) - 1))
(ok if "pesos" not in c2.split("\n")[1] or "66000" in c2 else fallo)(
    "valor_observado trae el importe real, no el texto del motivo")

# chrome.downloads: saveAs:true exige un dialogo que headless no abre, asi que se
# comprueba que la API real recibe la llamada y registra las dos descargas.
cdp.enviar("Browser.setDownloadBehavior", {"behavior": "allow", "downloadPath": DESCARGAS})
cdp.ev("window.__x.descargar('productos_erp.csv',window.__c1);"
       "window.__x.descargar('excepciones.csv',window.__c2);1", s_pop)
time.sleep(2)
dl = json.loads(cdp.ev("new Promise(r=>chrome.downloads.search({orderBy:['-startTime'],"
                       "limit:5},items=>r(JSON.stringify(items.map(i=>({f:i.filename,"
                       "e:i.error,s:i.state,m:i.mime}))))))", s_pop))
print("      descargas: %s" % json.dumps(dl, ensure_ascii=False)[:200])
(ok if len(dl) == 2 and all(d["s"] == "complete" for d in dl) else fallo)(
    "chrome.downloads completo las dos descargas",
    json.dumps([{"estado": d["s"], "error": d.get("e")} for d in dl]))
# El nombre propuesto se comprueba aparte (pruebanombre.py): al forzar
# downloadPath, la automatizacion de Chrome sustituye el nombre por un GUID, asi
# que aqui solo se verifica que las dos llamadas llegaron a la API.
(ok if all(str(d["f"]).endswith(".csv") for d in dl) else fallo)(
    "las dos descargas se materializaron como .csv",
    str([os.path.basename(str(d["f"]))[:12] for d in dl]))
(ok if all("text/csv" in (d["m"] or "") for d in dl) else fallo)(
    "Las descargas se piden como text/csv", str([d["m"] for d in dl]))

png = cdp.enviar("Page.captureScreenshot", {"format": "png", "captureBeyondViewport": True}, s_pop)["data"]
with open(os.path.join(CAPTURAS, "popup-%s.png" % NAV), "wb") as f:
    f.write(base64.b64decode(png))
ok("Captura del popup guardada", "capturas/popup-%s.png" % NAV)

err = cdp.ev("JSON.stringify(window.__err||[])", s_pop)
(ok if err in ("[]", "null") else fallo)("Sin errores de JavaScript en el popup", str(err)[:120])

with open(r"C:\tmp\mod4-prueba\informe-%s.json" % NAV, "w", encoding="utf-8") as f:
    json.dump({"navegador": ver.get("Browser"), "extension": ext_id, "resultados": resultados},
              f, ensure_ascii=False, indent=1)

falla = [r for r in resultados if r[0] == "FAIL"]
print("\n%s: %d PASS / %d FAIL" % (NAV, len(resultados) - len(falla), len(falla)))
sys.exit(0)
