# Módulo 02 — Conversaciones a datos: documentación del proceso

Documento de límites y decisiones del entregable. Generado por el procesamiento
determinista de `dataset.json` (ver `procesar_dataset.py`).

## 1. Fuente de datos

- Archivo original provisto: `/mnt/c/practica/dataset.txt`.
- Copia de trabajo: `dataset.json` en esta carpeta, **byte a byte idéntica al
  original** (`dataset.txt` no fue modificado).
- El archivo declara: `dataset = "Cognitus · Pedidos de productos para el hogar
  por WhatsApp"`, `synthetic = true`, `language = es-CO`, `conversation_count = 200`.

### 1.1 Excepción de formato en la fuente (EXC-001)

El archivo **no comienza con la llave de apertura `{`**: inicia con

```
\r\n  "dataset": "Cognitus · ..."
```

Es decir, el documento JSON está incompleto en 1 carácter. Esto impide
`json.load()` directo. Decisión:

- El archivo original **no se modifica** (regla del skill: conservar la fuente intacta).
- En la lectura, el prefijo se corrige **solo en memoria** anteponiendo un `{`.
- La excepción queda registrada en `pendientes_excepciones.csv` (EXC-001) y en
  este documento.
- Comprobación de integridad adicional: el resto del archivo es JSON válido y
  contiene 200 conversaciones exactamente, coincidiendo con `conversation_count`.

## 2. Inspección inicial (estructura real)

- Nivel principal: `dataset`, `version`, `language`, `synthetic`, `notice`,
  `conversation_count`, `response_timing`, `schema_note`, `schema`, `conversations`.
- Cada conversación (`conversations[]`) tiene: `target`, `contact`
  (`wa_id`, `name`), `conversation_id`, `message_list[]`, `page_number`, `page_size`.
- Cada mensaje (`message_list[]`) tiene: `id`, `text`, `type`, `timestamp`,
  `from`, `to`, `owner` (bool), `status`, `conversation_id`, `ticket_id`
  (siempre null), `event_type`.
- Conteos reales: **200** conversaciones, **1178** mensajes, todos de
  `type=text`, `status=delivered`, `event_type=message`, `ticket_id=null`.
- `conversation_id` único en las 200 conversaciones y el mensaje siempre
  coincide con el de su conversación (0 inconsistencias).
- 200 `conversation_id` = 200 `target` = 200 `contact.wa_id` únicos.

## 3. Esquema de datos de salida

### 3.1 `conversaciones.csv` — una fila por conversación (200 filas)

| Campo | Significado | Tipo | Regla de extracción | Obligatorio | Si no aparece | Si es ambiguo |
|---|---|---|---|---|---|---|
| `conversation_id` | Id único de conversación | string | del JSON | sí | — | — |
| `contacto` | Nombre del contact | string | `contact.name` | sí | — | — |
| `wa_id` / `target` | Teléfono sintético | string | `contact.wa_id` / `target` | sí | — | — |
| `tipo` | Flujo de la conversación | string | `pedido` si hay línea con "unidades de"; si no, `consulta:` más motivos (`politica_devoluciones`, `consulta_domicilio`) | sí | — | — |
| `estado` | Estado final del pedido | string | ver §4 | sí | — | no clasificable → `ambiguo` (0 casos) |
| `fecha_inicio` / `fecha_fin` | Primera/última marca de tiempo | ISO 8601 | min/max de `timestamp` | sí | — | — |
| `duracion_min` | Duración total de la conversación | número (min) | fin − inicio | depende | null | — |
| `primera_respuesta_min` | Minutos hasta la primera respuesta de la tienda (`owner=true`) | número (min) | timestamp del primer mensaje con `owner=true` − inicio | depende | null (sin respuesta de tienda) | — |
| `num_mensajes` | Nº de mensajes | entero | len(message_list) | sí | — | — |
| `ciudad` | Ciudad de entrega preguntada | string | "¿Cuánto queda para X?" | no | vacío (consultas) | — |
| `barrio` | Barrio confirmado por el cliente | string | "Sí, barrio/en X." (solo en confirmación de entrega) | no | vacío | — |
| `barrio_consulta` | Barrio en la consulta de domicilio | string | "domicilio a X queda en Y" | no | vacío | — |
| `costo_envio_estandar` | Costo de envío informado | entero | "envío estándar cuesta $X" o pregunta de domicilio | no | vacío | — |
| `tienda` | Nombre de la tienda que atiende | string | "Te atiende X." | no | vacío (consultas) | — |
| `destinatario` | Nombre en que queda el pedido | string | "…a nombre de [Mayúscula]…" | no | vacío | — |
| `metodo_pago` | Medio de pago confirmado | string | "Pago por X." | no | vacío | — |
| `subtotal`, `domicilio`, `total` | Montos cotizados | entero | "El subtotal es $A, domicilio $B. Total: $C." | no | vacío (consultas) | — |
| `num_lineas_producto` | Líneas de producto | entero | del primer mensaje de pedido | no | 0 | — |
| `unidades_total` | Unidades pedidas | entero | suma de cantidades | no | 0 | — |
| `productos` | Resumen de líneas | string | lista "producto (cant N)" | no | vacío | — |
| `referencia_corregida` | Si hubo cambio de referencia | bool | mensaje "Perdón… otra referencia" | sí | false | queda en excepciones |
| `color_crema_pendiente` | Pregunta por color sin resolver | bool | "si hay color crema mejor" | sí | false | registro PEN |
| `evidencia_msg_ids` | Ids de mensaje que sustentan la fila | string | ids de mensajes clave | sí | nunca (0 casos) | — |

### 3.2 `lineas_producto.csv` — una fila por línea de producto (320 filas)

`conversation_id`, `producto_original`, `cantidad`, `producto_final`
(referencia resultante tras una posible corrección), `referencia_corregida`.

Regla de extracción de la línea: `N unidades de <producto>` (fin de línea en
` y `, punto, "¿" o fin de texto). Cuando el cliente corrige
("Perdón: la [producto] la quiero en otra referencia, [nueva]") el
`producto_final` se compone como `sujeto + " " + reemplazo` (20 líneas).

### 3.3 `pendientes_excepciones.csv`

- `EXC-001` — dataset.json no inicia con `{` (corregido en memoria, original intacto).
- `PEN-xxx tipo=color_pendiente` — 18 conversaciones preguntan por "color crema"
  y el dataset no muestra confirmación de disponibilidad ni cambio de referencia:
  **ambigüedad conservada**, no se inventó ningún color.
- `PEN-xxx tipo=referencia_corregida` — 20 correcciones de referencia que fueron
  **aplicadas** y quedan registradas de forma transparente (nota, no ambigüedad).

## 4. Reglas de estado (deterministas, en texto completo de la conversación)

1. Contiene "Pedido confirmado" → `confirmado`
2. Contiene "queda pendiente y no se despacha" → `pendiente`
3. Contiene "no se genera el pedido" → `cancelado`
4. Contiene "solo estaba averiguando" o "Escríbenos cuando quieras hacer el
   pedido" → `sin_pedido`
5. En otro caso → `ambiguo` (registrado como pendiente)

Resultado: confirmado 139 · pendiente 12 · cancelado 9 · sin_pedido 40 · ambiguo 0.

## 5. Validación y reconciliación

- Entrada declarada: 200 · Conversaciones en JSON: 200 · Filas procesadas: 200 ✔
- Mensajes en JSON: 1178 = suma de `num_mensajes`: 1178 ✔
- Líneas de producto: 320 (160 conversaciones con flujo de pedido) ✔
- `procesadas + pendientes/ambiguas = total` → 200 + 0 = 200 ✔
- `conversation_id` en CSV: 200 únicos, 0 duplicados ✔
- Tipos: `total`/`subtotal`/`domicilio` siempre juntos o siempre vacíos ✔
- Coherencia interna de montos: Σsubtotal + Σdomicilio = Σtotal
  → 34.509.000 + 1.980.000 = 36.489.000 ✔
- Cada fila tiene evidencia: 0 filas sin `evidencia_msg_ids` ✔
- Todas las filas tienen `primera_respuesta_min` o null solo si no hubo respuesta de tienda ✔
- Todos los confirmados (139) tienen `total`; 0 "sin_pedido" con `total` ✔
- Cajón de estados: 139+12+9+40=200 ✔

## 6. Tres preguntas de negocio respondidas con evidencia

Las preguntas se eligieron **después** de inspeccionar los datos disponibles y,
por tanto, son todas respondibles con evidencia del dataset (ver
`informe_preguntas.md`):

1. **Embudo de conversión**: distribución de estado final (confirmado 69,5%).
2. **Ventas y geografía**: total de ventas de confirmados y distribución por ciudad.
3. **Demanda y pagos**: top 5 de productos y método de pago más usado.

## 7. Límites

- **Datos sintéticos**: el propio JSON lo declara (`synthetic: true`) y el aviso
  del archivo indica que no contiene PII real. Ningún resultado debe presentarse
  como dato de operación real.
- **No hay registro de despacho/tracking**: solo queda marcado en el texto
  "Pedido confirmado y enviado" en algunas conversaciones; no se puede afirmar
  entregas efectivas.
- **Precio de referencia**: el "color crema" pedido por clientes no tiene
  confirmación; los montos corresponden a la referencia final, no a color.
- **`page_number`/`page_size`**: constantes (1 y 5) por diseño del dataset; no
  aportan información de negocio.
- **Ticket id**: siempre null en el dataset; no usado.
- **Una sola fecha base por mensaje**: no se infiere zona horaria distinta a la
  del timestamp.

## 8. Decisiones tomadas

1. No modificar `dataset.json` pese a la llave faltante; corregir en memoria y
   documentar (EXC-001).
2. Una fila por conversación en `conversaciones.csv` (200 filas, dentro del
   rango 100–300 exigido) + granularidad por línea de producto.
3. Estado final determinado solo por textos explícitos de la tienda/cliente;
   ninguna inferencia no respaldada se presentó como hecho.
4. Consultas de devolución y de costo de domicilio se clasifican como
   `sin_pedido` porque el cliente cierra con "solo estaba averiguando".
5. Las 20 correcciones de referencia se aplican usando exactamente el reemplazo
   textual del cliente y quedan registradas.
6. Salidas elegidas: CSV (conjunto) + Markdown (informe) + HTML (dashboard
   estático), todos generados a partir de los CSV para evitar cifras manuales.