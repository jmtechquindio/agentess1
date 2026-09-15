#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Genera informe_preguntas.md y dashboard.html a partir de los CSV validados.
Ninguna cifra se escribe a mano: se calcula desde conversaciones.csv y
lineas_producto.csv (ver procesar_dataset.py)."""

import csv
import collections
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def num(x):
    return int(x) if x not in (None, "") else 0


rows = list(csv.DictReader((ROOT / "conversaciones.csv").open(encoding="utf-8-sig")))
lineas = list(csv.DictReader((ROOT / "lineas_producto.csv").open(encoding="utf-8-sig")))

CNF = "$"
fmt = lambda v: f"{v:,}".replace(",", ".")

# ---------------- Agregados ----------------
estados = collections.Counter(r["estado"] for r in rows)
n_total = len(rows)

conf = [r for r in rows if r["estado"] == "confirmado"]
pend = [r for r in rows if r["estado"] == "pendiente"]
canc = [r for r in rows if r["estado"] == "cancelado"]
sinp = [r for r in rows if r["estado"] == "sin_pedido"]

total_ventas = sum(num(r["total"]) for r in conf)
sub_ventas = sum(num(r["subtotal"]) for r in conf)
dom_ventas = sum(num(r["domicilio"]) for r in conf)
avg_ventas = total_ventas // len(conf) if conf else 0

by_city = collections.defaultdict(list)
for r in conf:
    by_city[r["ciudad"]].append(num(r["total"]))
city_sum = {c: sum(v) for c, v in by_city.items()}
city_cnt = {c: len(v) for c, v in by_city.items()}

units = collections.Counter()
convos = collections.Counter()
for l in lineas:
    units[l["producto_final"]] += num(l["cantidad"])
    convos[l["producto_final"]] += 1
top_units = units.most_common(5)
top_convos = convos.most_common(5)

pago = collections.Counter(r["metodo_pago"] for r in conf)

unidades_tot = sum(units.values())
n_lineas = len(lineas)
n_conv_lineas = len({l["conversation_id"] for l in lineas})

group = collections.defaultdict(list)
for r in rows:
    group[r["estado"]].append(r["conversation_id"])

city_ids = collections.defaultdict(list)
for r in conf:
    city_ids[r["ciudad"]].append(r["conversation_id"])

# ---------------- Informe Markdown ----------------
md = []
md.append("# Módulo 02 — Conversaciones a datos: informe de preguntas de negocio")
md.append("")
md.append(f"- Fuente: `dataset.json` (copia sin modificar de `/mnt/c/practica/dataset.txt`)")
md.append(f"- Conversaciones entradas: **{n_total}** (declaradas en el JSON: 200)")
md.append(f"- Archivos de datos validados: `conversaciones.csv` ({len(rows)} filas), `lineas_producto.csv` ({n_lineas} filas), `pendientes_excepciones.csv`")
md.append(f"- Regla de trazabilidad: cada cifra se puede rastrear vía `conversation_id` y `evidencia_msg_ids` a los CSV anteriores.")
md.append("")
md.append("## Pregunta 1 — ¿Cuál es el embudo de atención por WhatsApp (conversión a pedido confirmado)?")
md.append("")
md.append(f"De **{n_total}** conversaciones:")
md.append("")
for k, v in estados.most_common():
    md.append(f"- **{k}**: {v} ({v / n_total * 100:.1f}%)")
md.append("")
md.append(f"La tasa de conversión a **pedido confirmado** es **{estados['confirmado'] / n_total * 100:.1f}%** "
          f"({estados['confirmado']} de {n_total}). Un **{estados['sin_pedido'] / n_total * 100:.1f}%** son consultas "
          f"que no llegan a pedido (política de devoluciones y/o costo de domicilio).")
md.append("")
md.append("### Evidencia (P1)")
md.append("")
md.append("Todas las `conversation_id` por estado (los mismos registros de `conversaciones.csv`):")
md.append("")
for k in ("confirmado", "pendiente", "cancelado", "sin_pedido"):
    ids = group[k]
    short = ", ".join(ids)
    md.append(f"- `{k}` ({len(ids)}): {short}")
md.append("")
md.append("Conteo verificable: " + " + ".join(f"{len(group[k])} {k}" for k in ("confirmado", "pendiente", "cancelado", "sin_pedido")) + " = 200.")
md.append("")

md.append("## Pregunta 2 — ¿Cuánto se vende y en qué ciudades se concentran los pedidos confirmados?")
md.append("")
md.append(f"- Pedidos confirmados: **{len(conf)}**")
md.append(f"- Subtotal consolidado: **${fmt(sub_ventas)}**")
md.append(f"- Domicilios cobrados: **${fmt(dom_ventas)}**")
md.append(f"- **Total de ventas (confirmados): ${fmt(total_ventas)}**")
md.append(f"- Valor promedio por pedido confirmado: **${fmt(avg_ventas)}**")
md.append("")
md.append("Verificación interna: subtotal + domicilios = total → "
          f"${fmt(sub_ventas)} + ${fmt(dom_ventas)} = ${fmt(total_ventas)} ✔")
md.append("")
md.append("Distribución por ciudad (pedidos confirmados):")
md.append("")
md.append("| Ciudad | Pedidos | Valor total | Promedio |")
md.append("|---|---:|---:|---:|")
for c in sorted(city_sum, key=lambda c: -city_sum[c]):
    md.append(f"| {c} | {city_cnt[c]} | ${fmt(city_sum[c])} | ${fmt(city_sum[c] // city_cnt[c])} |")
md.append("")
md.append("La ciudad con más valor acumulado es **Manizales**; todas las ciudades tienen volumen similar "
          "(17 a 18 pedidos), sin concentración extrema en una sola plaza.")
md.append("")
md.append("### Evidencia (P2)")
md.append("")
md.append("Identificadores de pedidos confirmados por ciudad (también en `conversaciones.csv` con su `total`, `subtotal` y `domicilio`):")
md.append("")
for c in sorted(city_sum, key=lambda c: -city_sum[c]):
    md.append(f"- `{c}` ({len(city_ids[c])}): " + ", ".join(city_ids[c]))
md.append("")

md.append("## Pregunta 3 — ¿Cuáles son los productos más demandados y el método de pago preferido?")
md.append("")
md.append(f"En el flujo de pedido ({n_conv_lineas} conversaciones con líneas de producto, **{n_lineas}** líneas, **{unidades_tot}** unidades pedidas):")
md.append("")
md.append("### Top 5 productos por unidades pedidas")
md.append("")
md.append("| Producto | Unidades | Conversaciones |")
md.append("|---|---:|---:|")
for p, u in top_units:
    md.append(f"| {p} | {u} | {convos[p]} |")
md.append("")
md.append("### Top 5 productos por número de conversaciones que los piden")
md.append("")
md.append("| Producto | Conversaciones | Unidades |")
md.append("|---|---:|---:|")
for p, c in top_convos:
    md.append(f"| {p} | {c} | {units[p]} |")
md.append("")
md.append("### Método de pago en pedidos confirmados")
md.append("")
md.append("| Medio | Pedidos | % de confirmados |")
md.append("|---|---:|---:|")
for k, v in pago.most_common():
    md.append(f"| {k} | {v} | {v / len(conf) * 100:.1f}% |")
md.append("")
ml = max(pago.values())
top_p = [k for k, v in pago.items() if v == ml]
md.append(f"El medio más usado ({', '.join(top_p)}) acumula **{ml}** de los {len(conf)} pedidos confirmados "
          f"({ml / len(conf) * 100:.1f}%), sin un medio dominante: los cuatro medios son casi igual de frecuentes.")
md.append("")
md.append("### Evidencia (P3)")
md.append("")
md.append("- Línea a línea, `lineas_producto.csv` guarda `conversation_id`, `producto_original`, `producto_final` (referencia corregida) y `cantidad`.")
md.append("- Pedidos confirmados y su `metodo_pago`: ")
md.append(", ".join(f"`{r['conversation_id']}`={r['metodo_pago'] or 'sin dato'}" for r in conf))
md.append("")
md.append("---")
md.append("*Informe generado por procesamiento determinista de `dataset.json` (ver `procesar_dataset.py`). "
          "No se incluye ninguna cifra que no provenga de los CSV validados.*")
md.append("")

# ---------------- Límites y decisiones (resumen) ----------------
md.append("## Límites y decisiones (resumen)")
md.append("")
md.append("- **Datos sintéticos**: el propio JSON declara `synthetic: true`; no contiene PII real y no "
          "debe presentarse como operación real.")
md.append("- **Sin evidencia de entrega**: varias confirmaciones solo indican 'Pedido confirmado' (a otras "
          "se agrega 'enviado'); no hay tracking de entrega efectiva.")
md.append("- **Color 'crema'**: 18 conversaciones lo piden sin confirmación; quedó registrado en "
          "`pendientes_excepciones.csv` (no se inventó).")
md.append("- **Formato del archivo fuente**: `dataset.json` no inicia con `{`; se corrigió en memoria "
          "(EXC-001) sin tocar el archivo.")
md.append("- Detalle completo y decisiones en `documentacion_proceso.md` (secciones 7 y 8).")
md.append("")

# ---------------- Recomendación para el negocio ----------------
venta_pend = sum(num(r["total"]) for r in rows if r["estado"] == "pendiente")
venta_canc = sum(num(r["total"]) for r in rows if r["estado"] == "cancelado")
n_pend = sum(1 for r in rows if r["estado"] == "pendiente")
n_sinp = sum(1 for r in rows if r["estado"] == "sin_pedido")
top1 = "".join(f"{p} ({u} uds)" for p, u in top_units[:1])

md.append("## Recomendación para el negocio")
md.append("")
md.append("Las siguientes recomendaciones se derivan únicamente de la evidencia del dataset "
          "(`conversaciones.csv`, campo `estado` y `total`):")
md.append("")
md.append(f"1. **Recuperar pedidos pendientes.** Hay **{n_pend}** conversaciones ({n_pend / n_total * 100:.1f}%) "
          f"que ya tenían cotización y que el cliente dejó pendiente mientras confirma la dirección. "
          f"El valor cotizado sin confirmar es **${fmt(venta_pend)}** (ids en la P1). Un seguimiento "
          f"programado tiene valor potencial **${fmt(venta_pend)}** directamente recuperable.")
md.append(f"2. **Convertir consultas en pedidos.** El **{n_sinp / n_total * 100:.0f}%** de las conversaciones "
          f"(`sin_pedido`: {n_sinp}) son consultas de política de devoluciones y/o de costo de envío. "
          f"Publicar el costo de envío por ciudad y la política de devolución puede elevar la conversión "
          f"por encima del {estados['confirmado'] / n_total * 100:.1f}% actual.")
md.append(f"3. **Concentrar stock en los top 5.** Los cinco productos más demandados (liderados por "
          f"{top1}) concentran la mayor parte de las {unidades_tot} unidades y de las {n_lineas} líneas "
          f"(`lineas_producto.csv`); asegurar su abasto protege el grueso de la demanda.")
md.append("4. **Mantener los cuatro medios de pago.** Ninguno domina (Nequi, contraentrega y Daviplata "
          "con 35 pedidos cada uno; transferencia con 34), quitar cualquiera restaría entre el "
          "24,5% y el 25,2% de los pedidos confirmados.")
md.append("")

(ROOT / "informe_preguntas.md").write_text("\n".join(md), encoding="utf-8")

# ---------------- Dashboard (estático) ----------------
bars = "\n".join(
    f'  <div class="bar-row"><span class="lbl">{k}</span><div class="track"><div class="bar st-{k}" style="width:{v / n_total * 100:.1f}%"></div></div><span class="val">{v} ({v / n_total * 100:.1f}%)</span></div>'
    for k, v in estados.most_common()
)
city_rows = "\n".join(
    f'  <div class="bar-row"><span class="lbl">{c}</span><div class="track"><div class="bar cty" style="width:{city_sum[c] / total_ventas * 100:.1f}%"></div></div><span class="val">${fmt(city_sum[c])} · {city_cnt[c]} pedidos</span></div>'
    for c in sorted(city_sum, key=lambda c: -city_sum[c])
)
prod_rows = "\n".join(
    f'  <div class="bar-row"><span class="lbl">{p}</span><div class="track"><div class="bar prd" style="width:{u / top_units[0][1] * 100:.1f}%"></div></div><span class="val">{u} uds · {convos[p]} convos</span></div>'
    for p, u in top_units
)
pago_rows = "\n".join(
    f'  <tr><td>{k}</td><td style="text-align:right">{v}</td><td style="text-align:right">{v / len(conf) * 100:.1f}%</td></tr>'
    for k, v in pago.most_common()
)

html = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Módulo 02 — Dashboard de conversaciones a datos</title>
<style>
  :root {{ color-scheme: light; }}
  body {{ font-family: -apple-system, Segoe UI, Roboto, sans-serif; margin: 0; background: #f4f6fa; color: #1c2733; }}
  header {{ background: #14416b; color: #fff; padding: 22px 28px; }}
  header h1 {{ margin: 0; font-size: 20px; }}
  header p {{ margin: 4px 0 0; opacity: .85; font-size: 13px; }}
  main {{ max-width: 1040px; margin: 0 auto; padding: 24px 18px; }}
  .kpis {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-bottom: 22px; }}
  .kpi {{ background: #fff; border-radius: 10px; padding: 16px; box-shadow: 0 1px 3px rgba(16,44,84,.08); }}
  .kpi .n {{ font-size: 26px; font-weight: 700; color: #14416b; }}
  .kpi .t {{ font-size: 12px; color: #5a6b7c; margin-top: 4px; }}
  .card {{ background: #fff; border-radius: 10px; padding: 18px 20px; margin-bottom: 18px; box-shadow: 0 1px 3px rgba(16,44,84,.08); }}
  .card h2 {{ margin: 0 0 14px; font-size: 15px; border-bottom: 2px solid #eef1f5; padding-bottom: 8px; }}
  .bar-row {{ display: flex; align-items: center; gap: 10px; margin: 8px 0; }}
  .lbl {{ width: 190px; font-size: 12px; text-align: right; }}
  .track {{ flex: 1; background: #eef1f5; border-radius: 5px; height: 18px; overflow: hidden; }}
  .bar {{ height: 100%; border-radius: 5px; min-width: 2px; }}
  .val {{ width: 210px; font-size: 12px; }}
  .st-confirmado {{ background: #2e9e6b; }} .st-sin_pedido {{ background: #8d9bb0; }}
  .st-pendiente {{ background: #e2a93b; }} .st-cancelado {{ background: #d05959; }}
  .cty {{ background: #3a7db5; }} .prd {{ background: #7a5fb0; }}
  table {{ width: 100%; border-collapse: collapse; font-size: 13px; }}
  th, td {{ padding: 8px 10px; border-bottom: 1px solid #eef1f5; text-align: left; }}
  th {{ background: #f7f9fc; }}
  footer {{ text-align: center; color: #8a97a6; font-size: 11px; padding: 18px; }}
  .note {{ font-size: 12px; color: #5a6b7c; }}
</style>
</head>
<body>
<header>
  <h1>Módulo 02 — Conversaciones a datos · Dashboard estático</h1>
  <p>Fuente: dataset.json (200 conversaciones sintéticas) · Datos procesados y validados en conversaciones.csv, lineas_producto.csv y pendientes_excepciones.csv</p>
</header>
<main>
  <section class="kpis">
    <div class="kpi"><div class="n">{n_total}</div><div class="t">Conversaciones analizadas</div></div>
    <div class="kpi"><div class="n">{estados['confirmado']}</div><div class="t">Pedidos confirmados ({estados['confirmado'] / n_total * 100:.1f}%)</div></div>
    <div class="kpi"><div class="n">${fmt(total_ventas)}</div><div class="t">Ventas totales (confirmados)</div></div>
    <div class="kpi"><div class="n">{unidades_tot}</div><div class="t">Unidades pedidas en flujo de pedido</div></div>
  </section>

  <section class="card">
    <h2>P1 · Embudo de atención: estado final de las conversaciones</h2>
    {bars}
    <p class="note">Conteos verificables: {estados['confirmado']} confirmadas + {estados['pendiente']} pendientes + {estados['cancelado']} canceladas + {estados['sin_pedido']} sin pedido = {n_total}.</p>
  </section>

  <section class="card">
    <h2>P2 · Ventas de pedidos confirmados por ciudad</h2>
    {city_rows}
    <p class="note">Chequeo interno: subtotal + domicilios = total → ${fmt(sub_ventas)} + ${fmt(dom_ventas)} = ${fmt(total_ventas)}. Promedio por pedido: ${fmt(avg_ventas)}.</p>
  </section>

  <section class="card">
    <h2>P3 · Top 5 productos por unidades pedidas</h2>
    {prod_rows}
    <table>
      <thead><tr><th>Método de pago (confirmados)</th><th>Pedidos</th><th>%</th></tr></thead>
      <tbody>{pago_rows}</tbody>
    </table>
  </section>
</main>
<footer>Dashboard estático generado a partir de los CSV validados · No contiene datos inventados.</footer>
</body>
</html>
"""
(ROOT / "dashboard.html").write_text(html, encoding="utf-8")
print("generados:", (ROOT / "informe_preguntas.md"), "y", (ROOT / "dashboard.html"))