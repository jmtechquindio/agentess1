# Módulo 02 — Conversaciones a datos: informe de preguntas de negocio

- Fuente: `dataset.json` (copia sin modificar de `/mnt/c/practica/dataset.txt`)
- Conversaciones entradas: **200** (declaradas en el JSON: 200)
- Archivos de datos validados: `conversaciones.csv` (200 filas), `lineas_producto.csv` (320 filas), `pendientes_excepciones.csv`
- Regla de trazabilidad: cada cifra se puede rastrear vía `conversation_id` y `evidencia_msg_ids` a los CSV anteriores.

## Pregunta 1 — ¿Cuál es el embudo de atención por WhatsApp (conversión a pedido confirmado)?

De **200** conversaciones:

- **confirmado**: 139 (69.5%)
- **sin_pedido**: 40 (20.0%)
- **pendiente**: 12 (6.0%)
- **cancelado**: 9 (4.5%)

La tasa de conversión a **pedido confirmado** es **69.5%** (139 de 200). Un **20.0%** son consultas que no llegan a pedido (política de devoluciones y/o costo de domicilio).

### Evidencia (P1)

Todas las `conversation_id` por estado (los mismos registros de `conversaciones.csv`):

- `confirmado` (139): wa-hogar-0001, wa-hogar-0002, wa-hogar-0003, wa-hogar-0004, wa-hogar-0006, wa-hogar-0007, wa-hogar-0008, wa-hogar-0009, wa-hogar-0011, wa-hogar-0012, wa-hogar-0014, wa-hogar-0016, wa-hogar-0018, wa-hogar-0019, wa-hogar-0021, wa-hogar-0022, wa-hogar-0023, wa-hogar-0024, wa-hogar-0027, wa-hogar-0028, wa-hogar-0029, wa-hogar-0031, wa-hogar-0032, wa-hogar-0033, wa-hogar-0036, wa-hogar-0037, wa-hogar-0038, wa-hogar-0041, wa-hogar-0042, wa-hogar-0043, wa-hogar-0044, wa-hogar-0046, wa-hogar-0047, wa-hogar-0048, wa-hogar-0049, wa-hogar-0053, wa-hogar-0054, wa-hogar-0056, wa-hogar-0057, wa-hogar-0058, wa-hogar-0059, wa-hogar-0061, wa-hogar-0062, wa-hogar-0063, wa-hogar-0064, wa-hogar-0066, wa-hogar-0067, wa-hogar-0069, wa-hogar-0071, wa-hogar-0072, wa-hogar-0073, wa-hogar-0074, wa-hogar-0076, wa-hogar-0077, wa-hogar-0079, wa-hogar-0081, wa-hogar-0082, wa-hogar-0083, wa-hogar-0084, wa-hogar-0086, wa-hogar-0087, wa-hogar-0088, wa-hogar-0089, wa-hogar-0092, wa-hogar-0093, wa-hogar-0094, wa-hogar-0096, wa-hogar-0097, wa-hogar-0098, wa-hogar-0099, wa-hogar-0101, wa-hogar-0103, wa-hogar-0106, wa-hogar-0107, wa-hogar-0108, wa-hogar-0109, wa-hogar-0111, wa-hogar-0112, wa-hogar-0113, wa-hogar-0114, wa-hogar-0116, wa-hogar-0118, wa-hogar-0121, wa-hogar-0122, wa-hogar-0123, wa-hogar-0124, wa-hogar-0126, wa-hogar-0127, wa-hogar-0128, wa-hogar-0129, wa-hogar-0131, wa-hogar-0132, wa-hogar-0133, wa-hogar-0134, wa-hogar-0137, wa-hogar-0138, wa-hogar-0139, wa-hogar-0141, wa-hogar-0142, wa-hogar-0144, wa-hogar-0146, wa-hogar-0147, wa-hogar-0148, wa-hogar-0149, wa-hogar-0151, wa-hogar-0152, wa-hogar-0154, wa-hogar-0157, wa-hogar-0158, wa-hogar-0159, wa-hogar-0161, wa-hogar-0162, wa-hogar-0163, wa-hogar-0164, wa-hogar-0166, wa-hogar-0167, wa-hogar-0168, wa-hogar-0171, wa-hogar-0172, wa-hogar-0173, wa-hogar-0174, wa-hogar-0176, wa-hogar-0177, wa-hogar-0178, wa-hogar-0179, wa-hogar-0181, wa-hogar-0183, wa-hogar-0184, wa-hogar-0186, wa-hogar-0188, wa-hogar-0189, wa-hogar-0191, wa-hogar-0192, wa-hogar-0193, wa-hogar-0194, wa-hogar-0196, wa-hogar-0197, wa-hogar-0198, wa-hogar-0199
- `pendiente` (12): wa-hogar-0013, wa-hogar-0026, wa-hogar-0039, wa-hogar-0052, wa-hogar-0078, wa-hogar-0091, wa-hogar-0104, wa-hogar-0117, wa-hogar-0143, wa-hogar-0156, wa-hogar-0169, wa-hogar-0182
- `cancelado` (9): wa-hogar-0017, wa-hogar-0034, wa-hogar-0051, wa-hogar-0068, wa-hogar-0102, wa-hogar-0119, wa-hogar-0136, wa-hogar-0153, wa-hogar-0187
- `sin_pedido` (40): wa-hogar-0005, wa-hogar-0010, wa-hogar-0015, wa-hogar-0020, wa-hogar-0025, wa-hogar-0030, wa-hogar-0035, wa-hogar-0040, wa-hogar-0045, wa-hogar-0050, wa-hogar-0055, wa-hogar-0060, wa-hogar-0065, wa-hogar-0070, wa-hogar-0075, wa-hogar-0080, wa-hogar-0085, wa-hogar-0090, wa-hogar-0095, wa-hogar-0100, wa-hogar-0105, wa-hogar-0110, wa-hogar-0115, wa-hogar-0120, wa-hogar-0125, wa-hogar-0130, wa-hogar-0135, wa-hogar-0140, wa-hogar-0145, wa-hogar-0150, wa-hogar-0155, wa-hogar-0160, wa-hogar-0165, wa-hogar-0170, wa-hogar-0175, wa-hogar-0180, wa-hogar-0185, wa-hogar-0190, wa-hogar-0195, wa-hogar-0200

Conteo verificable: 139 confirmado + 12 pendiente + 9 cancelado + 40 sin_pedido = 200.

## Pregunta 2 — ¿Cuánto se vende y en qué ciudades se concentran los pedidos confirmados?

- Pedidos confirmados: **139**
- Subtotal consolidado: **$34.509.000**
- Domicilios cobrados: **$1.980.000**
- **Total de ventas (confirmados): $36.489.000**
- Valor promedio por pedido confirmado: **$262.510**

Verificación interna: subtotal + domicilios = total → $34.509.000 + $1.980.000 = $36.489.000 ✔

Distribución por ciudad (pedidos confirmados):

| Ciudad | Pedidos | Valor total | Promedio |
|---|---:|---:|---:|
| Manizales | 18 | $4.991.000 | $277.277 |
| Pereira | 18 | $4.855.000 | $269.722 |
| Ibagué | 18 | $4.835.000 | $268.611 |
| Santa Marta | 17 | $4.713.000 | $277.235 |
| Cartagena | 17 | $4.505.000 | $265.000 |
| Cali | 17 | $4.306.000 | $253.294 |
| Medellín | 17 | $4.151.000 | $244.176 |
| Barranquilla | 17 | $4.133.000 | $243.117 |

La ciudad con más valor acumulado es **Manizales**; todas las ciudades tienen volumen similar (17 a 18 pedidos), sin concentración extrema en una sola plaza.

### Evidencia (P2)

Identificadores de pedidos confirmados por ciudad (también en `conversaciones.csv` con su `total`, `subtotal` y `domicilio`):

- `Manizales` (18): wa-hogar-0001, wa-hogar-0011, wa-hogar-0021, wa-hogar-0031, wa-hogar-0041, wa-hogar-0061, wa-hogar-0071, wa-hogar-0081, wa-hogar-0101, wa-hogar-0111, wa-hogar-0121, wa-hogar-0131, wa-hogar-0141, wa-hogar-0151, wa-hogar-0161, wa-hogar-0171, wa-hogar-0181, wa-hogar-0191
- `Pereira` (18): wa-hogar-0008, wa-hogar-0018, wa-hogar-0028, wa-hogar-0038, wa-hogar-0048, wa-hogar-0058, wa-hogar-0088, wa-hogar-0098, wa-hogar-0108, wa-hogar-0118, wa-hogar-0128, wa-hogar-0138, wa-hogar-0148, wa-hogar-0158, wa-hogar-0168, wa-hogar-0178, wa-hogar-0188, wa-hogar-0198
- `Ibagué` (18): wa-hogar-0004, wa-hogar-0014, wa-hogar-0024, wa-hogar-0044, wa-hogar-0054, wa-hogar-0064, wa-hogar-0074, wa-hogar-0084, wa-hogar-0094, wa-hogar-0114, wa-hogar-0124, wa-hogar-0134, wa-hogar-0144, wa-hogar-0154, wa-hogar-0164, wa-hogar-0174, wa-hogar-0184, wa-hogar-0194
- `Santa Marta` (17): wa-hogar-0007, wa-hogar-0027, wa-hogar-0037, wa-hogar-0047, wa-hogar-0057, wa-hogar-0067, wa-hogar-0077, wa-hogar-0087, wa-hogar-0097, wa-hogar-0107, wa-hogar-0127, wa-hogar-0137, wa-hogar-0147, wa-hogar-0157, wa-hogar-0167, wa-hogar-0177, wa-hogar-0197
- `Cartagena` (17): wa-hogar-0002, wa-hogar-0012, wa-hogar-0022, wa-hogar-0032, wa-hogar-0042, wa-hogar-0062, wa-hogar-0072, wa-hogar-0082, wa-hogar-0092, wa-hogar-0112, wa-hogar-0122, wa-hogar-0132, wa-hogar-0142, wa-hogar-0152, wa-hogar-0162, wa-hogar-0172, wa-hogar-0192
- `Cali` (17): wa-hogar-0006, wa-hogar-0016, wa-hogar-0036, wa-hogar-0046, wa-hogar-0056, wa-hogar-0066, wa-hogar-0076, wa-hogar-0086, wa-hogar-0096, wa-hogar-0106, wa-hogar-0116, wa-hogar-0126, wa-hogar-0146, wa-hogar-0166, wa-hogar-0176, wa-hogar-0186, wa-hogar-0196
- `Medellín` (17): wa-hogar-0003, wa-hogar-0023, wa-hogar-0033, wa-hogar-0043, wa-hogar-0053, wa-hogar-0063, wa-hogar-0073, wa-hogar-0083, wa-hogar-0093, wa-hogar-0103, wa-hogar-0113, wa-hogar-0123, wa-hogar-0133, wa-hogar-0163, wa-hogar-0173, wa-hogar-0183, wa-hogar-0193
- `Barranquilla` (17): wa-hogar-0009, wa-hogar-0019, wa-hogar-0029, wa-hogar-0049, wa-hogar-0059, wa-hogar-0069, wa-hogar-0079, wa-hogar-0089, wa-hogar-0099, wa-hogar-0109, wa-hogar-0129, wa-hogar-0139, wa-hogar-0149, wa-hogar-0159, wa-hogar-0179, wa-hogar-0189, wa-hogar-0199

## Pregunta 3 — ¿Cuáles son los productos más demandados y el método de pago preferido?

En el flujo de pedido (160 conversaciones con líneas de producto, **320** líneas, **641** unidades pedidas):

### Top 5 productos por unidades pedidas

| Producto | Unidades | Conversaciones |
|---|---:|---:|
| cobija térmica doble gris | 51 | 19 |
| protector de colchón doble | 45 | 22 |
| cortina blackout 140x220 gris | 42 | 21 |
| cojín decorativo terracota | 42 | 21 |
| juego de toallas blancas x3 | 39 | 19 |

### Top 5 productos por número de conversaciones que los piden

| Producto | Conversaciones | Unidades |
|---|---:|---:|
| protector de colchón doble | 22 | 45 |
| cortina blackout 140x220 gris | 21 | 42 |
| cojín decorativo terracota | 21 | 42 |
| juego de sábanas doble algodón | 20 | 39 |
| juego de toallas blancas x3 | 19 | 39 |

### Método de pago en pedidos confirmados

| Medio | Pedidos | % de confirmados |
|---|---:|---:|
| nequi | 35 | 25.2% |
| pago contraentrega | 35 | 25.2% |
| daviplata | 35 | 25.2% |
| transferencia bancaria | 34 | 24.5% |

El medio más usado (nequi, pago contraentrega, daviplata) acumula **35** de los 139 pedidos confirmados (25.2%), sin un medio dominante: los cuatro medios son casi igual de frecuentes.

### Evidencia (P3)

- Línea a línea, `lineas_producto.csv` guarda `conversation_id`, `producto_original`, `producto_final` (referencia corregida) y `cantidad`.
- Pedidos confirmados y su `metodo_pago`: 
`wa-hogar-0001`=nequi, `wa-hogar-0002`=pago contraentrega, `wa-hogar-0003`=transferencia bancaria, `wa-hogar-0004`=daviplata, `wa-hogar-0006`=pago contraentrega, `wa-hogar-0007`=transferencia bancaria, `wa-hogar-0008`=daviplata, `wa-hogar-0009`=nequi, `wa-hogar-0011`=transferencia bancaria, `wa-hogar-0012`=daviplata, `wa-hogar-0014`=pago contraentrega, `wa-hogar-0016`=daviplata, `wa-hogar-0018`=pago contraentrega, `wa-hogar-0019`=transferencia bancaria, `wa-hogar-0021`=nequi, `wa-hogar-0022`=pago contraentrega, `wa-hogar-0023`=transferencia bancaria, `wa-hogar-0024`=daviplata, `wa-hogar-0027`=transferencia bancaria, `wa-hogar-0028`=daviplata, `wa-hogar-0029`=nequi, `wa-hogar-0031`=transferencia bancaria, `wa-hogar-0032`=daviplata, `wa-hogar-0033`=nequi, `wa-hogar-0036`=daviplata, `wa-hogar-0037`=nequi, `wa-hogar-0038`=pago contraentrega, `wa-hogar-0041`=nequi, `wa-hogar-0042`=pago contraentrega, `wa-hogar-0043`=transferencia bancaria, `wa-hogar-0044`=daviplata, `wa-hogar-0046`=pago contraentrega, `wa-hogar-0047`=transferencia bancaria, `wa-hogar-0048`=daviplata, `wa-hogar-0049`=nequi, `wa-hogar-0053`=nequi, `wa-hogar-0054`=pago contraentrega, `wa-hogar-0056`=daviplata, `wa-hogar-0057`=nequi, `wa-hogar-0058`=pago contraentrega, `wa-hogar-0059`=transferencia bancaria, `wa-hogar-0061`=nequi, `wa-hogar-0062`=pago contraentrega, `wa-hogar-0063`=transferencia bancaria, `wa-hogar-0064`=daviplata, `wa-hogar-0066`=pago contraentrega, `wa-hogar-0067`=transferencia bancaria, `wa-hogar-0069`=nequi, `wa-hogar-0071`=transferencia bancaria, `wa-hogar-0072`=daviplata, `wa-hogar-0073`=nequi, `wa-hogar-0074`=pago contraentrega, `wa-hogar-0076`=daviplata, `wa-hogar-0077`=nequi, `wa-hogar-0079`=transferencia bancaria, `wa-hogar-0081`=nequi, `wa-hogar-0082`=pago contraentrega, `wa-hogar-0083`=transferencia bancaria, `wa-hogar-0084`=daviplata, `wa-hogar-0086`=pago contraentrega, `wa-hogar-0087`=transferencia bancaria, `wa-hogar-0088`=daviplata, `wa-hogar-0089`=nequi, `wa-hogar-0092`=daviplata, `wa-hogar-0093`=nequi, `wa-hogar-0094`=pago contraentrega, `wa-hogar-0096`=daviplata, `wa-hogar-0097`=nequi, `wa-hogar-0098`=pago contraentrega, `wa-hogar-0099`=transferencia bancaria, `wa-hogar-0101`=nequi, `wa-hogar-0103`=transferencia bancaria, `wa-hogar-0106`=pago contraentrega, `wa-hogar-0107`=transferencia bancaria, `wa-hogar-0108`=daviplata, `wa-hogar-0109`=nequi, `wa-hogar-0111`=transferencia bancaria, `wa-hogar-0112`=daviplata, `wa-hogar-0113`=nequi, `wa-hogar-0114`=pago contraentrega, `wa-hogar-0116`=daviplata, `wa-hogar-0118`=pago contraentrega, `wa-hogar-0121`=nequi, `wa-hogar-0122`=pago contraentrega, `wa-hogar-0123`=transferencia bancaria, `wa-hogar-0124`=daviplata, `wa-hogar-0126`=pago contraentrega, `wa-hogar-0127`=transferencia bancaria, `wa-hogar-0128`=daviplata, `wa-hogar-0129`=nequi, `wa-hogar-0131`=transferencia bancaria, `wa-hogar-0132`=daviplata, `wa-hogar-0133`=nequi, `wa-hogar-0134`=pago contraentrega, `wa-hogar-0137`=nequi, `wa-hogar-0138`=pago contraentrega, `wa-hogar-0139`=transferencia bancaria, `wa-hogar-0141`=nequi, `wa-hogar-0142`=pago contraentrega, `wa-hogar-0144`=daviplata, `wa-hogar-0146`=pago contraentrega, `wa-hogar-0147`=transferencia bancaria, `wa-hogar-0148`=daviplata, `wa-hogar-0149`=nequi, `wa-hogar-0151`=transferencia bancaria, `wa-hogar-0152`=daviplata, `wa-hogar-0154`=pago contraentrega, `wa-hogar-0157`=nequi, `wa-hogar-0158`=pago contraentrega, `wa-hogar-0159`=transferencia bancaria, `wa-hogar-0161`=nequi, `wa-hogar-0162`=pago contraentrega, `wa-hogar-0163`=transferencia bancaria, `wa-hogar-0164`=daviplata, `wa-hogar-0166`=pago contraentrega, `wa-hogar-0167`=transferencia bancaria, `wa-hogar-0168`=daviplata, `wa-hogar-0171`=transferencia bancaria, `wa-hogar-0172`=daviplata, `wa-hogar-0173`=nequi, `wa-hogar-0174`=pago contraentrega, `wa-hogar-0176`=daviplata, `wa-hogar-0177`=nequi, `wa-hogar-0178`=pago contraentrega, `wa-hogar-0179`=transferencia bancaria, `wa-hogar-0181`=nequi, `wa-hogar-0183`=transferencia bancaria, `wa-hogar-0184`=daviplata, `wa-hogar-0186`=pago contraentrega, `wa-hogar-0188`=daviplata, `wa-hogar-0189`=nequi, `wa-hogar-0191`=transferencia bancaria, `wa-hogar-0192`=daviplata, `wa-hogar-0193`=nequi, `wa-hogar-0194`=pago contraentrega, `wa-hogar-0196`=daviplata, `wa-hogar-0197`=nequi, `wa-hogar-0198`=pago contraentrega, `wa-hogar-0199`=transferencia bancaria

---
*Informe generado por procesamiento determinista de `dataset.json` (ver `procesar_dataset.py`). No se incluye ninguna cifra que no provenga de los CSV validados.*

## Límites y decisiones (resumen)

- **Datos sintéticos**: el propio JSON declara `synthetic: true`; no contiene PII real y no debe presentarse como operación real.
- **Sin evidencia de entrega**: varias confirmaciones solo indican 'Pedido confirmado' (a otras se agrega 'enviado'); no hay tracking de entrega efectiva.
- **Color 'crema'**: 18 conversaciones lo piden sin confirmación; quedó registrado en `pendientes_excepciones.csv` (no se inventó).
- **Formato del archivo fuente**: `dataset.json` no inicia con `{`; se corrigió en memoria (EXC-001) sin tocar el archivo.
- Detalle completo y decisiones en `documentacion_proceso.md` (secciones 7 y 8).

## Recomendación para el negocio

Las siguientes recomendaciones se derivan únicamente de la evidencia del dataset (`conversaciones.csv`, campo `estado` y `total`):

1. **Recuperar pedidos pendientes.** Hay **12** conversaciones (6.0%) que ya tenían cotización y que el cliente dejó pendiente mientras confirma la dirección. El valor cotizado sin confirmar es **$3.247.000** (ids en la P1). Un seguimiento programado tiene valor potencial **$3.247.000** directamente recuperable.
2. **Convertir consultas en pedidos.** El **20%** de las conversaciones (`sin_pedido`: 40) son consultas de política de devoluciones y/o de costo de envío. Publicar el costo de envío por ciudad y la política de devolución puede elevar la conversión por encima del 69.5% actual.
3. **Concentrar stock en los top 5.** Los cinco productos más demandados (liderados por cobija térmica doble gris (51 uds)) concentran la mayor parte de las 641 unidades y de las 320 líneas (`lineas_producto.csv`); asegurar su abasto protege el grueso de la demanda.
4. **Mantener los cuatro medios de pago.** Ninguno domina (Nequi, contraentrega y Daviplata con 35 pedidos cada uno; transferencia con 34), quitar cualquiera restaría entre el 24,5% y el 25,2% de los pedidos confirmados.
