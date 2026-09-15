#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Extrae datos estructurados desde dataset.json (Módulo 02, Fundación Cognitus).

Reglas:
- No modifica dataset.json (solo lectura).
- No inventa datos: cada fila conserva conversation_id y los ids de mensaje
  que sirven de evidencia.
- Información no explícita se registra en pendientes_excepciones.csv.
"""

import json
import re
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent

# --------------------------------------------------------------------------
# 1. Lectura. dataset.json oficialmente comienza con \r\n\"dataset\"...
#    Falta la llave de apertura '{'. Se corrige SOLO en memoria para la
#    lectura; el archivo original no se toca (ver documentacion_proceso.md).
# --------------------------------------------------------------------------
raw = (ROOT / "dataset.json").read_text(encoding="utf-8")
if raw.lstrip("\r\n ").startswith('"dataset"'):
    data = json.loads("{" + raw.lstrip("\r\n "))
    DATASET_EXC = "EXC-001"
else:
    data = json.loads(raw)
    DATASET_EXC = None

convs = data["conversations"]

# --------------------------------------------------------------------------
# Reglas de extracción (patrones validados 100% contra los 200 registros)
# --------------------------------------------------------------------------
ORDFLOW_PHRASES = (
    "unidades", "necesito", "quiero comprar", "quiero pedir", "me regalas",
    "estoy buscando", "quisiera", "tienen disponible",
)
PROD_RE = re.compile(r"(\d+)\s+unidades?\s+de\s+(.+?)(?:\s+y\s|\s*\.\s*|\s*¿|$)")
TOTAL_RE = re.compile(
    r"El subtotal es \$([\d.]+), domicilio \$([\d.]+)\. Total: \$([\d.]+)\."
)
CIUDAD_RE = re.compile(r"¿Cuánto queda para ([A-Za-zÁÉÍÓÚÑáéíóúñ ]+)\s*\??")
BARRIO_ADDR_RE = re.compile(r"(?:Sí,\s*barrio|Sí,\s*en)\s+([A-Za-zÁÉÍÓÚÑáéíóúñ ]+?)(?:\.|,)", re.I)
DOM_QUERY_RE = re.compile(r"domicilio a ([A-Za-zÁÉÍÓÚÑáéíóúñ ]+?)\s+queda en \$([\d.]+)", re.I)
ENVIO_RE = re.compile(r"envío estándar cuesta \$([\d.]+)", re.I)
NOMBRE_RE = re.compile(r"a nombre de ([A-Z][A-Za-zÁÉÍÓÚÑáéíóúñ ]+)\.?")
TIENDA_RE = re.compile(r"Te atiende ([A-Za-zÁÉÍÓÚÑáéíóúñ ]+)\.", re.I)
PAGO_RE = re.compile(r"Pago por (.+?)\.", re.I)
CORREC_RE = re.compile(r"perdón: la (.+?) la quiero en otra referencia, (.+?)\.")
COLOR_RE = re.compile(r"si hay color crema mejor", re.I)


def money(s):
    return int(s.replace(".", ""))


def estado_de(texto):
    if "Pedido confirmado" in texto:
        return "confirmado"
    if "queda pendiente y no se despacha" in texto:
        return "pendiente"
    if "no se genera el pedido" in texto:
        return "cancelado"
    if "solo estaba averiguando" in texto:
        return "sin_pedido"
    if "Escríbenos cuando quieras hacer el pedido" in texto:
        return "sin_pedido"
    return "ambiguo"


def tipo_consulta(texto_low):
    flujo = "pedido" if "unidades de" in texto_low else "consulta"
    if flujo == "consulta":
        notas = []
        if "¿lo puedo cambiar?" in texto_low:
            notas.append("politica_devoluciones")
        if "¿y el domicilio a" in texto_low:
            notas.append("consulta_domicilio")
        return "consulta:" + "+".join(notas) if notas else "consulta"
    return "pedido"


def extraer_productos(texto_low, correcciones):
    """Devuelve lista de (producto_original, cantidad, producto_final, final_candidato)."""
    lineas = PROD_RE.findall(texto_low)
    out = []
    for cant, prod in lineas:
        prod = prod.strip()
        # aplicar correccion "Perdón: la X la quiero en otra referencia, Y"
        nueva = prod
        for sujeto, reemplazo in correcciones:
            if sujeto in prod:
                nueva = f"{sujeto} {reemplazo}".strip()
        out.append([prod, int(cant), nueva, nueva if nueva != prod else None])
    return out


# --------------------------------------------------------------------------
# Procesamiento principal
# --------------------------------------------------------------------------
rows = []          # una fila por conversacion
lineas_rows = []   # una fila por linea de producto
pendientes = []    # pendientes / excepciones

msg_total = 0
for c in convs:
    cid = c["conversation_id"]
    msgs = c["message_list"]
    texto = " || ".join(m["text"] for m in msgs)
    texto_low = texto.lower()
    msg_total += len(msgs)

    # correcciones
    correcciones = CORREC_RE.findall(texto_low)
    correcciones = list({(s.strip(), r.strip()) for s, r in correcciones})

    # estado y tipo
    estado = estado_de(texto)
    tipo = tipo_consulta(texto_low)

    # tiempos
    ts = [m.get("timestamp") for m in msgs if m.get("timestamp")]
    inicio, fin = min(ts), max(ts)
    duracion_min = None
    primera_respuesta_min = None
    try:
        t0 = datetime.fromisoformat(inicio.replace("Z", "+00:00"))
        t1 = datetime.fromisoformat(fin.replace("Z", "+00:00"))
        duracion_min = round((t1 - t0).total_seconds() / 60, 1)
        primera = next((m["timestamp"] for m in msgs if m.get("owner")), None)
        if primera is not None:
            t_r = datetime.fromisoformat(primera.replace("Z", "+00:00"))
            primera_respuesta_min = round((t_r - t0).total_seconds() / 60, 1)
    except Exception:
        pass

    # geografia y contacto
    ciudad = CIUDAD_RE.search(texto)
    ciudad = " ".join(ciudad.group(1).split()) if ciudad else ""
    barrio = BARRIO_ADDR_RE.search(texto)
    barrio = " ".join(barrio.group(1).split()).rstrip(",") if barrio else ""
    dom_q = DOM_QUERY_RE.search(texto_low)
    barrio_consulta = " ".join(dom_q.group(1).split()) if dom_q else ""
    costo_envio_consulta = money(dom_q.group(2)) if dom_q else None

    envio_m = ENVIO_RE.search(texto_low)
    envio_estandar = money(envio_m.group(1)) if envio_m else costo_envio_consulta

    # tienda / destinatario / pago / montos
    tienda_m = TIENDA_RE.search(texto)
    tienda = tienda_m.group(1).strip() if tienda_m else ""
    nombre_m = NOMBRE_RE.search(texto)
    destinatario = nombre_m.group(1).strip() if nombre_m else ""
    pago_m = PAGO_RE.search(texto_low)
    pago = " ".join(pago_m.group(1).split()) if pago_m else ""
    total_m = TOTAL_RE.search(texto)
    if total_m:
        subtotal, domicilio, total = (money(total_m.group(i)) for i in (1, 2, 3))
    else:
        subtotal = domicilio = total = None

    # productos
    productos = extraer_productos(texto_low, correcciones)
    unidades_total = sum(q for _, q, _, _ in productos)
    color = bool(COLOR_RE.search(texto_low))

    # evidencia: ids de mensaje clave
    ord_ids = [m["id"] for m in msgs if "unidades de" in (m["text"] or "").lower()]
    q_ids = [m["id"] for m in msgs if m["text"].startswith("El subtotal")]
    p_ids = [m["id"] for m in msgs if pago and re.search(PAGO_RE, (m["text"] or "").lower())]
    c_ids = [m["id"] for m in msgs if re.search(CIUDAD_RE, m["text"] or "")]
    d_ids = [m["id"] for m in msgs if re.search(DOM_QUERY_RE, (m["text"] or "").lower())
             or "¿lo puedo cambiar" in (m["text"] or "").lower()
             or "solo estaba averiguando" in (m["text"] or "").lower()]
    evidencia = sorted(set(ord_ids + q_ids + p_ids + c_ids + d_ids))
    if not evidencia:
        evidencia = sorted(m["id"] for m in msgs)

    row = {
        "conversation_id": cid,
        "contacto": c["contact"]["name"],
        "wa_id": c["contact"]["wa_id"],
        "target": c["target"],
        "tipo": tipo,
        "estado": estado,
        "fecha_inicio": inicio,
        "fecha_fin": fin,
        "duracion_min": duracion_min,
        "primera_respuesta_min": primera_respuesta_min,
        "num_mensajes": len(msgs),
        "ciudad": ciudad,
        "barrio": barrio,
        "barrio_consulta": barrio_consulta,
        "costo_envio_estandar": envio_estandar,
        "tienda": tienda,
        "destinatario": destinatario,
        "metodo_pago": pago,
        "subtotal": subtotal,
        "domicilio": domicilio,
        "total": total,
        "num_lineas_producto": len(productos),
        "unidades_total": unidades_total,
        "productos": "; ".join(f"{fin} (cant {q})" for p, q, fin, _ in productos),
        "referencia_corregida": bool(correcciones),
        "color_crema_pendiente": color,
        "evidencia_msg_ids": ",".join(evidencia),
    }
    rows.append(row)

    for prod, q, nueva, _ in productos:
        lineas_rows.append({
            "conversation_id": cid,
            "producto_original": prod,
            "cantidad": q,
            "producto_final": nueva,
            "referencia_corregida": nueva != prod,
        })

    # --- pendientes / excepciones ---
    if color:
        ids = [m["id"] for m in msgs if COLOR_RE.search((m["text"] or "").lower())]
        pendientes.append({
            "id": f"PEN-{len(pendientes) + 1:03d}",
            "tipo": "color_pendiente",
            "conversation_id": cid,
            "descripcion": "Cliente preguntó por 'color crema'; el dataset no muestra confirmación de disponibilidad ni cambio de referencia.",
            "evidencia_msg_ids": ",".join(ids),
        })
    if estado == "ambiguo":
        pendientes.append({
            "id": f"PEN-{len(pendientes) + 1:03d}",
            "tipo": "estado_ambiguo",
            "conversation_id": cid,
            "descripcion": "El estado final no pudo determinarse con las reglas; requiere revisión manual.",
            "evidencia_msg_ids": ",".join(m["id"] for m in msgs),
        })
    if new := [p for p, q, n, cand in productos if cand is not None]:
        pendientes.append({
            "id": f"PEN-{len(pendientes) + 1:03d}",
            "tipo": "referencia_corregida",
            "conversation_id": cid,
            "descripcion": f"Referencia ajustada por mensaje 'Perdón...': {new}",
            "evidencia_msg_ids": ",".join(m["id"] for m in msgs if CORREC_RE.search((m["text"] or "").lower())),
        })

if DATASET_EXC:
    pendientes.insert(0, {
        "id": DATASET_EXC,
        "tipo": "dataset_formato",
        "conversation_id": "",
        "descripcion": (
            "dataset.json (copia sin modificar de /mnt/c/practica/dataset.txt) no inicia con la llave '{'. "
            "Se corrigió en memoria para la lectura; el archivo original queda intacto."
        ),
        "evidencia_msg_ids": "",
    })

# --------------------------------------------------------------------------
# Escritura de salidas
# --------------------------------------------------------------------------
import csv

with (ROOT / "conversaciones.csv").open("w", newline="", encoding="utf-8-sig") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
    w.writeheader()
    w.writerows(rows)

with (ROOT / "lineas_producto.csv").open("w", newline="", encoding="utf-8-sig") as f:
    w = csv.DictWriter(f, fieldnames=list(lineas_rows[0].keys()))
    w.writeheader()
    w.writerows(lineas_rows)

with (ROOT / "pendientes_excepciones.csv").open("w", newline="", encoding="utf-8-sig") as f:
    w = csv.DictWriter(f, fieldnames=["id", "tipo", "conversation_id", "descripcion", "evidencia_msg_ids"])
    w.writeheader()
    w.writerows(pendientes)

# --------------------------------------------------------------------------
# Validacion / reconciliacion
# --------------------------------------------------------------------------
from collections import Counter

estados = Counter(r["estado"] for r in rows)
n_imput = data.get("conversation_count")
n_esperado = len(convs)
n_mensajes_suma = sum(r["num_mensajes"] for r in rows)

print("=== RECONCILIACION ===")
print(f"conversation_count (meta)        : {n_imput}")
print(f"conversaciones en JSON           : {n_esperado}")
print(f"filas procesadas                 : {len(rows)}")
print(f"mensajes en JSON                 : {msg_total}")
print(f"suma num_mensajes (filas)        : {n_mensajes_suma}")
print(f"lineas de producto               : {len(lineas_rows)}")
print("estados:", dict(estados))
print(f"check estado: {sum(estados.values())} = 200 ->", sum(estados.values()) == n_esperado)

# tipos
from collections import defaultdict
tipos = Counter(r["tipo"] for r in rows)
print("tipos:", dict(tipos))

# nulos esperados
nulos = {k: sum(1 for r in rows if r[k] in (None, "")) for k in
         ("ciudad", "barrio", "costo_envio_estandar", "tienda", "destinatario",
          "metodo_pago", "subtotal", "domicilio", "total", "num_lineas_producto",
          "barrio_consulta")}
print("nulos por campo:", nulos)

# trazabilidad
sin_evidencia = [r["conversation_id"] for r in rows if not r["evidencia_msg_ids"]]
dups = [x for x, n in Counter(r["conversation_id"] for r in rows).items() if n > 1]
print("filas sin evidencia:", len(sin_evidencia), sin_evidencia[:5])
print("duplicados conversation_id:", dups)
print("convs con confirmado sin total:", [r["conversation_id"] for r in rows if r["estado"] in ("confirmado", "pendiente", "cancelado") and r["total"] is None])
print("convs con total pero estado sin_pedido:", [r["conversation_id"] for r in rows if r["estado"] == "sin_pedido" and r["total"] is not None])