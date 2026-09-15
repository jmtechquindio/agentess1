# Evidencia de trazabilidad — Módulo 02

Este archivo conecta, conversación por conversación, cada campo extraído en `conversaciones.csv` con los **mensajes originales** de `dataset.json` (id + texto). Verificación: **200/200** conversaciones documentadas y 0 campos sin evidencia.

> Regla (skill): no inventar datos. Si un dato no aparece en estos mensajes, debe quedar pendiente/ambigua, no presentarse como hecho.

## wa-hogar-0001 — Ana Gómez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0001-msg-01` **Cliente**: Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Manizales?
- `wa-hogar-0001-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0001-msg-03` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0001. Queda a nombre de Ana Gómez.
- `wa-hogar-0001-msg-04` **Tienda**: El subtotal es $242.000, domicilio $14.000. Total: $256.000. ¿Confirmas?
- `wa-hogar-0001-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0001-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0001-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0001-msg-01 → _Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Manizales?_ |
| `barrio` | Palermo | wa-hogar-0001-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0001. Queda a nombre de Ana Gómez._ |
| `tienda` | Casa Ficticia | wa-hogar-0001-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Ana Gómez | wa-hogar-0001-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0001. Queda a nombre de Ana Gómez._ |
| `metodo_pago` | nequi | wa-hogar-0001-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 242000/14000/256000 | wa-hogar-0001-msg-04 → _El subtotal es $242.000, domicilio $14.000. Total: $256.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo verde oliva (cant 2); juego de toallas blancas x3 (cant 3) | wa-hogar-0001-msg-01 → _Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Manizales?_ |

## wa-hogar-0002 — Carlos Gómez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0002-msg-01` **Cliente**: ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cartagena?
- `wa-hogar-0002-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0002-msg-03` **Cliente**: Sí, barrio Manga. Punto de entrega de prueba HOG-0002. Queda a nombre de Carlos Gómez.
- `wa-hogar-0002-msg-04` **Tienda**: El subtotal es $413.000, domicilio $18.000. Total: $431.000. ¿Confirmas?
- `wa-hogar-0002-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0002-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0002-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0002-msg-01 → _ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas_ |
| `barrio` | Manga | wa-hogar-0002-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0002. Queda a nombre de Carlos Gómez._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0002-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Carlos Gómez | wa-hogar-0002-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0002. Queda a nombre de Carlos Gómez._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0002-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 413000/18000/431000 | wa-hogar-0002-msg-04 → _El subtotal es $413.000, domicilio $18.000. Total: $431.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón sencillo (cant 3); cobija térmica queen beige (cant 1); juego de sábanas doble algodón (cant 2) | wa-hogar-0002-msg-01 → _ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas_ |

## wa-hogar-0003 — Diana Gómez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0003-msg-01` **Cliente**: Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Medellín?
- `wa-hogar-0003-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0003-msg-03` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0003. Queda a nombre de Diana Gómez.
- `wa-hogar-0003-msg-04` **Tienda**: El subtotal es $115.000, domicilio $10.000. Total: $125.000. ¿Confirmas?
- `wa-hogar-0003-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0003-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0003-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0003-msg-01 → _Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Medellín?_ |
| `barrio` | Laureles | wa-hogar-0003-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0003. Queda a nombre de Diana Gómez._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0003-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Diana Gómez | wa-hogar-0003-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0003. Queda a nombre de Diana Gómez._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0003-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 115000/10000/125000 | wa-hogar-0003-msg-04 → _El subtotal es $115.000, domicilio $10.000. Total: $125.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 140x220 gris (cant 1) | wa-hogar-0003-msg-01 → _Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Medellín?_ |

## wa-hogar-0004 — Felipe Gómez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0004-msg-01` **Cliente**: Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Ibagué?
- `wa-hogar-0004-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0004-msg-03` **Cliente**: Sí, barrio La Pola. Punto de entrega de prueba HOG-0004. Queda a nombre de Felipe Gómez.
- `wa-hogar-0004-msg-04` **Tienda**: El subtotal es $232.000, domicilio $14.000. Total: $246.000. ¿Confirmas?
- `wa-hogar-0004-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0004-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0004-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0004-msg-01 → _Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Ibagué?_ |
| `barrio` | La Pola | wa-hogar-0004-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0004. Queda a nombre de Felipe Gómez._ |
| `tienda` | Textiles de Prueba | wa-hogar-0004-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Felipe Gómez | wa-hogar-0004-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0004. Queda a nombre de Felipe Gómez._ |
| `metodo_pago` | daviplata | wa-hogar-0004-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 232000/14000/246000 | wa-hogar-0004-msg-04 → _El subtotal es $232.000, domicilio $14.000. Total: $246.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño gris (cant 2); protector de colchón doble (cant 3) | wa-hogar-0004-msg-01 → _Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Ibagué?_ |

## wa-hogar-0005 — Laura Gómez · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0005-msg-01` **Cliente**: Hola, si almohada hotelera no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0005-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0005-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0005-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0005-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0005-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0006 — Mateo Gómez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0006-msg-01` **Cliente**: Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cali?
- `wa-hogar-0006-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0006-msg-03` **Cliente**: Sí, barrio San Fernando. Punto de entrega de prueba HOG-0006. Queda a nombre de Mateo Gómez.
- `wa-hogar-0006-msg-04` **Tienda**: El subtotal es $78.000, domicilio $11.000. Total: $89.000. ¿Confirmas?
- `wa-hogar-0006-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0006-msg-06` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0006-msg-06 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0006-msg-01 → _Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cali?_ |
| `barrio` | San Fernando | wa-hogar-0006-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0006. Queda a nombre de Mateo Gómez._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0006-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Mateo Gómez | wa-hogar-0006-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0006. Queda a nombre de Mateo Gómez._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0006-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 78000/11000/89000 | wa-hogar-0006-msg-04 → _El subtotal es $78.000, domicilio $11.000. Total: $89.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas doble algodón (cant 1) | wa-hogar-0006-msg-01 → _Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cali?_ |

## wa-hogar-0007 — Natalia Gómez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0007-msg-01` **Cliente**: Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0007-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0007-msg-03` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0007. Queda a nombre de Natalia Gómez.
- `wa-hogar-0007-msg-04` **Tienda**: El subtotal es $241.000, domicilio $16.000. Total: $257.000. ¿Confirmas?
- `wa-hogar-0007-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0007-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0007-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0007-msg-01 → _Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Santa Marta?_ |
| `barrio` | Bavaria | wa-hogar-0007-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0007. Queda a nombre de Natalia Gómez._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0007-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Natalia Gómez | wa-hogar-0007-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0007. Queda a nombre de Natalia Gómez._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0007-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 241000/16000/257000 | wa-hogar-0007-msg-04 → _El subtotal es $241.000, domicilio $16.000. Total: $257.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas gris x3 (cant 2); almohada hotelera firme (cant 3) | wa-hogar-0007-msg-01 → _Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Santa Marta?_ |

## wa-hogar-0008 — Santiago Gómez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0008-msg-01` **Cliente**: Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño verde. ¿Cuánto queda para Pereira?
- `wa-hogar-0008-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0008-msg-03` **Cliente**: Sí, en Álamos, a nombre de Santiago Gómez. Perdón: la cobija térmica la quiero en otra referencia, doble gris.
- `wa-hogar-0008-msg-04` **Tienda**: El subtotal es $409.000, domicilio $16.000. Total: $425.000. ¿Confirmas?
- `wa-hogar-0008-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0008-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0008-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0008-msg-01 → _Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño_ |
| `barrio` | Álamos | wa-hogar-0008-msg-03 → _Sí, en Álamos, a nombre de Santiago Gómez. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |
| `tienda` | Textiles de Prueba | wa-hogar-0008-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Santiago Gómez | wa-hogar-0008-msg-03 → _Sí, en Álamos, a nombre de Santiago Gómez. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |
| `metodo_pago` | daviplata | wa-hogar-0008-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 409000/16000/425000 | wa-hogar-0008-msg-04 → _El subtotal es $409.000, domicilio $16.000. Total: $425.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica doble gris (cant 3); juego de sábanas queen blancas (cant 1); tapete de baño verde (cant 2) | wa-hogar-0008-msg-01 → _Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño_ |
| `referencia_corregida` | sí | wa-hogar-0008-msg-03 → _Sí, en Álamos, a nombre de Santiago Gómez. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |

## wa-hogar-0009 — Valentina Gómez · `confirmado`

**Conversación original** (7 mensajes):
- `wa-hogar-0009-msg-01` **Cliente**: Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0009-msg-02` **Cliente**: Ah y si hay color crema mejor 🙏
- `wa-hogar-0009-msg-03` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0009-msg-04` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0009. Queda a nombre de Valentina Gómez.
- `wa-hogar-0009-msg-05` **Tienda**: El subtotal es $28.000, domicilio $13.000. Total: $41.000. ¿Confirmas?
- `wa-hogar-0009-msg-06` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0009-msg-07` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0009-msg-07 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0009-msg-01 → _Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Barranquilla?_ |
| `barrio` | El Prado | wa-hogar-0009-msg-04 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0009. Queda a nombre de Valentina Gómez._ |
| `tienda` | Casa Ficticia | wa-hogar-0009-msg-03 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Valentina Gómez | wa-hogar-0009-msg-04 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0009. Queda a nombre de Valentina Gómez._ |
| `metodo_pago` | nequi | wa-hogar-0009-msg-06 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 28000/13000/41000 | wa-hogar-0009-msg-05 → _El subtotal es $28.000, domicilio $13.000. Total: $41.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo terracota (cant 1) | wa-hogar-0009-msg-01 → _Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Barranquilla?_ |
| `color_crema_pendiente` | sí (sin confirmación) | wa-hogar-0009-msg-02 → _Ah y si hay color crema mejor 🙏_ |

## wa-hogar-0010 — Andrés Gómez · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0010-msg-01` **Cliente**: Hola, si protector de colchón no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0010-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0010-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $11.000?
- `wa-hogar-0010-msg-04` **Tienda**: Sí, el envío estándar cuesta $11.000. ¿Deseas hacer el pedido?
- `wa-hogar-0010-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0010-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0010-msg-03 → _¿Y el domicilio a Suba queda en $11.000?_ |
| `costo_envio_estandar` | 11000 | wa-hogar-0010-msg-04 → _Sí, el envío estándar cuesta $11.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0011 — Camila Gómez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0011-msg-01` **Cliente**: Buenas tardes, estoy buscando 3 unidades de cortina blackout 200x220 azul y 1 unidades de cojín decorativo verde oliva y 2 unidades de juego de toallas blancas x3. ¿Cuánto queda para Manizales?
- `wa-hogar-0011-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0011-msg-03` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0011. Queda a nombre de Camila Gómez.
- `wa-hogar-0011-msg-04` **Tienda**: El subtotal es $497.000, domicilio $16.000. Total: $513.000. ¿Confirmas?
- `wa-hogar-0011-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0011-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0011-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0011-msg-01 → _Buenas tardes, estoy buscando 3 unidades de cortina blackout 200x220 azul y 1 unidades de cojín decorativo verde oliva y 2 unidades de juego_ |
| `barrio` | Palermo | wa-hogar-0011-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0011. Queda a nombre de Camila Gómez._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0011-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Camila Gómez | wa-hogar-0011-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0011. Queda a nombre de Camila Gómez._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0011-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 497000/16000/513000 | wa-hogar-0011-msg-04 → _El subtotal es $497.000, domicilio $16.000. Total: $513.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 200x220 azul (cant 3); cojín decorativo verde oliva (cant 1); juego de toallas blancas x3 (cant 2) | wa-hogar-0011-msg-01 → _Buenas tardes, estoy buscando 3 unidades de cortina blackout 200x220 azul y 1 unidades de cojín decorativo verde oliva y 2 unidades de juego_ |

## wa-hogar-0012 — Julián Gómez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0012-msg-01` **Cliente**: Buen día, quisiera 1 unidades de tapete de baño verde. ¿Cuánto queda para Cartagena?
- `wa-hogar-0012-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0012-msg-03` **Cliente**: Sí, barrio Manga. Punto de entrega de prueba HOG-0012. Queda a nombre de Julián Gómez.
- `wa-hogar-0012-msg-04` **Tienda**: El subtotal es $32.000, domicilio $14.000. Total: $46.000. ¿Confirmas?
- `wa-hogar-0012-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0012-msg-06` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0012-msg-06 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0012-msg-01 → _Buen día, quisiera 1 unidades de tapete de baño verde. ¿Cuánto queda para Cartagena?_ |
| `barrio` | Manga | wa-hogar-0012-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0012. Queda a nombre de Julián Gómez._ |
| `tienda` | Textiles de Prueba | wa-hogar-0012-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Julián Gómez | wa-hogar-0012-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0012. Queda a nombre de Julián Gómez._ |
| `metodo_pago` | daviplata | wa-hogar-0012-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 32000/14000/46000 | wa-hogar-0012-msg-04 → _El subtotal es $32.000, domicilio $14.000. Total: $46.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño verde (cant 1) | wa-hogar-0012-msg-01 → _Buen día, quisiera 1 unidades de tapete de baño verde. ¿Cuánto queda para Cartagena?_ |

## wa-hogar-0013 — Marcela Gómez · `pendiente`

**Conversación original** (6 mensajes):
- `wa-hogar-0013-msg-01` **Cliente**: Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Medellín?
- `wa-hogar-0013-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0013-msg-03` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0013. Queda a nombre de Marcela Gómez.
- `wa-hogar-0013-msg-04` **Tienda**: El subtotal es $423.000, domicilio $12.000. Total: $435.000. ¿Confirmas?
- `wa-hogar-0013-msg-05` **Cliente**: Déjamelo pendiente mientras confirmo la dirección, porfa.
- `wa-hogar-0013-msg-06` **Tienda**: Claro, queda pendiente y no se despacha todavía.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | pendiente | wa-hogar-0013-msg-06 → _Claro, queda pendiente y no se despacha todavía._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0013-msg-01 → _Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Medellín?_ |
| `barrio` | Laureles | wa-hogar-0013-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0013. Queda a nombre de Marcela Gómez._ |
| `tienda` | Casa Ficticia | wa-hogar-0013-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Marcela Gómez | wa-hogar-0013-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0013. Queda a nombre de Marcela Gómez._ |
| `subtotal/domicilio/total` | 423000/12000/435000 | wa-hogar-0013-msg-04 → _El subtotal es $423.000, domicilio $12.000. Total: $435.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera media (cant 2); cortina blackout 140x220 gris (cant 3) | wa-hogar-0013-msg-01 → _Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Medellín?_ |

## wa-hogar-0014 — Nicolás Gómez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0014-msg-01` **Cliente**: Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón doble. ¿Cuánto queda para Ibagué?
- `wa-hogar-0014-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0014-msg-03` **Cliente**: Sí, barrio La Pola. Punto de entrega de prueba HOG-0014. Queda a nombre de Nicolás Gómez.
- `wa-hogar-0014-msg-04` **Tienda**: El subtotal es $378.000, domicilio $16.000. Total: $394.000. ¿Confirmas?
- `wa-hogar-0014-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0014-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0014-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0014-msg-01 → _Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón_ |
| `barrio` | La Pola | wa-hogar-0014-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0014. Queda a nombre de Nicolás Gómez._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0014-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Nicolás Gómez | wa-hogar-0014-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0014. Queda a nombre de Nicolás Gómez._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0014-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 378000/16000/394000 | wa-hogar-0014-msg-04 → _El subtotal es $378.000, domicilio $16.000. Total: $394.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas sencillas estampadas (cant 3); tapete de baño gris (cant 1); protector de colchón doble (cant 2) | wa-hogar-0014-msg-01 → _Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón_ |

## wa-hogar-0015 — Paola Gómez · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0015-msg-01` **Cliente**: Hola, si juego de toallas no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0015-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0015-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0015-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0015-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0015-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0016 — Sebastián Gómez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0016-msg-01` **Cliente**: Hola, quiero pedir 2 unidades de cobija térmica queen beige y 3 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cali?
- `wa-hogar-0016-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0016-msg-03` **Cliente**: Sí, en San Fernando, a nombre de Sebastián Gómez. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul.
- `wa-hogar-0016-msg-04` **Tienda**: El subtotal es $412.000, domicilio $13.000. Total: $425.000. ¿Confirmas?
- `wa-hogar-0016-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0016-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0016-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0016-msg-01 → _Hola, quiero pedir 2 unidades de cobija térmica queen beige y 3 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cali?_ |
| `barrio` | San Fernando | wa-hogar-0016-msg-03 → _Sí, en San Fernando, a nombre de Sebastián Gómez. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul._ |
| `tienda` | Textiles de Prueba | wa-hogar-0016-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Sebastián Gómez | wa-hogar-0016-msg-03 → _Sí, en San Fernando, a nombre de Sebastián Gómez. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul._ |
| `metodo_pago` | daviplata | wa-hogar-0016-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 412000/13000/425000 | wa-hogar-0016-msg-04 → _El subtotal es $412.000, domicilio $13.000. Total: $425.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica sencilla azul (cant 2); juego de sábanas doble algodón (cant 3) | wa-hogar-0016-msg-01 → _Hola, quiero pedir 2 unidades de cobija térmica queen beige y 3 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cali?_ |
| `referencia_corregida` | sí | wa-hogar-0016-msg-03 → _Sí, en San Fernando, a nombre de Sebastián Gómez. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul._ |

## wa-hogar-0017 — Tatiana Gómez · `cancelado`

**Conversación original** (6 mensajes):
- `wa-hogar-0017-msg-01` **Cliente**: Hola 😊 necesito 3 unidades de cojín decorativo crema y 1 unidades de juego de toallas gris x3 y 2 unidades de almohada hotelera firme. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0017-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0017-msg-03` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0017. Queda a nombre de Tatiana Gómez.
- `wa-hogar-0017-msg-04` **Tienda**: El subtotal es $224.000, domicilio $18.000. Total: $242.000. ¿Confirmas?
- `wa-hogar-0017-msg-05` **Cliente**: No, mejor cancélalo por ahora. Gracias.
- `wa-hogar-0017-msg-06` **Tienda**: Entendido, no se genera el pedido.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | cancelado | wa-hogar-0017-msg-06 → _Entendido, no se genera el pedido._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0017-msg-01 → _Hola 😊 necesito 3 unidades de cojín decorativo crema y 1 unidades de juego de toallas gris x3 y 2 unidades de almohada hotelera firme. ¿Cuán_ |
| `barrio` | Bavaria | wa-hogar-0017-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0017. Queda a nombre de Tatiana Gómez._ |
| `tienda` | Casa Ficticia | wa-hogar-0017-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Tatiana Gómez | wa-hogar-0017-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0017. Queda a nombre de Tatiana Gómez._ |
| `subtotal/domicilio/total` | 224000/18000/242000 | wa-hogar-0017-msg-04 → _El subtotal es $224.000, domicilio $18.000. Total: $242.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo crema (cant 3); juego de toallas gris x3 (cant 1); almohada hotelera firme (cant 2) | wa-hogar-0017-msg-01 → _Hola 😊 necesito 3 unidades de cojín decorativo crema y 1 unidades de juego de toallas gris x3 y 2 unidades de almohada hotelera firme. ¿Cuán_ |

## wa-hogar-0018 — Daniel Gómez · `confirmado`

**Conversación original** (7 mensajes):
- `wa-hogar-0018-msg-01` **Cliente**: ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Pereira?
- `wa-hogar-0018-msg-02` **Cliente**: Ah y si hay color crema mejor 🙏
- `wa-hogar-0018-msg-03` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0018-msg-04` **Cliente**: Sí, barrio Álamos. Punto de entrega de prueba HOG-0018. Queda a nombre de Daniel Gómez.
- `wa-hogar-0018-msg-05` **Tienda**: El subtotal es $56.000, domicilio $12.000. Total: $68.000. ¿Confirmas?
- `wa-hogar-0018-msg-06` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0018-msg-07` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0018-msg-07 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0018-msg-01 → _ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Pereira?_ |
| `barrio` | Álamos | wa-hogar-0018-msg-04 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0018. Queda a nombre de Daniel Gómez._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0018-msg-03 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Daniel Gómez | wa-hogar-0018-msg-04 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0018. Queda a nombre de Daniel Gómez._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0018-msg-06 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 56000/12000/68000 | wa-hogar-0018-msg-05 → _El subtotal es $56.000, domicilio $12.000. Total: $68.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón doble (cant 1) | wa-hogar-0018-msg-01 → _ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Pereira?_ |
| `color_crema_pendiente` | sí (sin confirmación) | wa-hogar-0018-msg-02 → _Ah y si hay color crema mejor 🙏_ |

## wa-hogar-0019 — Gabriela Gómez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0019-msg-01` **Cliente**: Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0019-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0019-msg-03` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0019. Queda a nombre de Gabriela Gómez.
- `wa-hogar-0019-msg-04` **Tienda**: El subtotal es $314.000, domicilio $15.000. Total: $329.000. ¿Confirmas?
- `wa-hogar-0019-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0019-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0019-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0019-msg-01 → _Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Ba_ |
| `barrio` | El Prado | wa-hogar-0019-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0019. Queda a nombre de Gabriela Gómez._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0019-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Gabriela Gómez | wa-hogar-0019-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0019. Queda a nombre de Gabriela Gómez._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0019-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 314000/15000/329000 | wa-hogar-0019-msg-04 → _El subtotal es $314.000, domicilio $15.000. Total: $329.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 140x220 beige (cant 2); cojín decorativo terracota (cant 3) | wa-hogar-0019-msg-01 → _Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Ba_ |

## wa-hogar-0020 — Ricardo Gómez · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0020-msg-01` **Cliente**: Hola, si tapete de baño no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0020-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0020-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $13.000?
- `wa-hogar-0020-msg-04` **Tienda**: Sí, el envío estándar cuesta $13.000. ¿Deseas hacer el pedido?
- `wa-hogar-0020-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0020-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0020-msg-03 → _¿Y el domicilio a Suba queda en $13.000?_ |
| `costo_envio_estandar` | 13000 | wa-hogar-0020-msg-04 → _Sí, el envío estándar cuesta $13.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0021 — Ana Rodríguez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0021-msg-01` **Cliente**: Hola! tienen disponible 1 unidades de almohada hotelera firme. ¿Cuánto queda para Manizales?
- `wa-hogar-0021-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0021-msg-03` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0021. Queda a nombre de Ana Rodríguez.
- `wa-hogar-0021-msg-04` **Tienda**: El subtotal es $39.000, domicilio $12.000. Total: $51.000. ¿Confirmas?
- `wa-hogar-0021-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0021-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0021-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0021-msg-01 → _Hola! tienen disponible 1 unidades de almohada hotelera firme. ¿Cuánto queda para Manizales?_ |
| `barrio` | Palermo | wa-hogar-0021-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0021. Queda a nombre de Ana Rodríguez._ |
| `tienda` | Casa Ficticia | wa-hogar-0021-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Ana Rodríguez | wa-hogar-0021-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0021. Queda a nombre de Ana Rodríguez._ |
| `metodo_pago` | nequi | wa-hogar-0021-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 39000/12000/51000 | wa-hogar-0021-msg-04 → _El subtotal es $39.000, domicilio $12.000. Total: $51.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera firme (cant 1) | wa-hogar-0021-msg-01 → _Hola! tienen disponible 1 unidades de almohada hotelera firme. ¿Cuánto queda para Manizales?_ |

## wa-hogar-0022 — Carlos Rodríguez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0022-msg-01` **Cliente**: Holaa, necesito 2 unidades de juego de sábanas queen blancas y 3 unidades de tapete de baño verde. ¿Cuánto queda para Cartagena?
- `wa-hogar-0022-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0022-msg-03` **Cliente**: Sí, barrio Manga. Punto de entrega de prueba HOG-0022. Queda a nombre de Carlos Rodríguez.
- `wa-hogar-0022-msg-04` **Tienda**: El subtotal es $252.000, domicilio $16.000. Total: $268.000. ¿Confirmas?
- `wa-hogar-0022-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0022-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0022-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0022-msg-01 → _Holaa, necesito 2 unidades de juego de sábanas queen blancas y 3 unidades de tapete de baño verde. ¿Cuánto queda para Cartagena?_ |
| `barrio` | Manga | wa-hogar-0022-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0022. Queda a nombre de Carlos Rodríguez._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0022-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Carlos Rodríguez | wa-hogar-0022-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0022. Queda a nombre de Carlos Rodríguez._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0022-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 252000/16000/268000 | wa-hogar-0022-msg-04 → _El subtotal es $252.000, domicilio $16.000. Total: $268.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas queen blancas (cant 2); tapete de baño verde (cant 3) | wa-hogar-0022-msg-01 → _Holaa, necesito 2 unidades de juego de sábanas queen blancas y 3 unidades de tapete de baño verde. ¿Cuánto queda para Cartagena?_ |

## wa-hogar-0023 — Diana Rodríguez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0023-msg-01` **Cliente**: Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Medellín?
- `wa-hogar-0023-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0023-msg-03` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0023. Queda a nombre de Diana Rodríguez.
- `wa-hogar-0023-msg-04` **Tienda**: El subtotal es $455.000, domicilio $14.000. Total: $469.000. ¿Confirmas?
- `wa-hogar-0023-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0023-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0023-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0023-msg-01 → _Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220_ |
| `barrio` | Laureles | wa-hogar-0023-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0023. Queda a nombre de Diana Rodríguez._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0023-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Diana Rodríguez | wa-hogar-0023-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0023. Queda a nombre de Diana Rodríguez._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0023-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 455000/14000/469000 | wa-hogar-0023-msg-04 → _El subtotal es $455.000, domicilio $14.000. Total: $469.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas arena x2 (cant 3); almohada hotelera media (cant 1); cortina blackout 140x220 gris (cant 2) | wa-hogar-0023-msg-01 → _Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220_ |

## wa-hogar-0024 — Felipe Rodríguez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0024-msg-01` **Cliente**: Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Ibagué?
- `wa-hogar-0024-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0024-msg-03` **Cliente**: Sí, en La Pola, a nombre de Felipe Rodríguez. Perdón: la cobija térmica la quiero en otra referencia, queen beige.
- `wa-hogar-0024-msg-04` **Tienda**: El subtotal es $89.000, domicilio $12.000. Total: $101.000. ¿Confirmas?
- `wa-hogar-0024-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0024-msg-06` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0024-msg-06 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0024-msg-01 → _Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Ibagué?_ |
| `barrio` | La Pola | wa-hogar-0024-msg-03 → _Sí, en La Pola, a nombre de Felipe Rodríguez. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |
| `tienda` | Textiles de Prueba | wa-hogar-0024-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Felipe Rodríguez | wa-hogar-0024-msg-03 → _Sí, en La Pola, a nombre de Felipe Rodríguez. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |
| `metodo_pago` | daviplata | wa-hogar-0024-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 89000/12000/101000 | wa-hogar-0024-msg-04 → _El subtotal es $89.000, domicilio $12.000. Total: $101.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica queen beige (cant 1) | wa-hogar-0024-msg-01 → _Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Ibagué?_ |
| `referencia_corregida` | sí | wa-hogar-0024-msg-03 → _Sí, en La Pola, a nombre de Felipe Rodríguez. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |

## wa-hogar-0025 — Laura Rodríguez · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0025-msg-01` **Cliente**: Hola, si cojín decorativo no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0025-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0025-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0025-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0025-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0025-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0026 — Mateo Rodríguez · `pendiente`

**Conversación original** (6 mensajes):
- `wa-hogar-0026-msg-01` **Cliente**: ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cali?
- `wa-hogar-0026-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0026-msg-03` **Cliente**: Sí, barrio San Fernando. Punto de entrega de prueba HOG-0026. Queda a nombre de Mateo Rodríguez.
- `wa-hogar-0026-msg-04` **Tienda**: El subtotal es $413.000, domicilio $15.000. Total: $428.000. ¿Confirmas?
- `wa-hogar-0026-msg-05` **Cliente**: Déjamelo pendiente mientras confirmo la dirección, porfa.
- `wa-hogar-0026-msg-06` **Tienda**: Claro, queda pendiente y no se despacha todavía.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | pendiente | wa-hogar-0026-msg-06 → _Claro, queda pendiente y no se despacha todavía._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0026-msg-01 → _ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas_ |
| `barrio` | San Fernando | wa-hogar-0026-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0026. Queda a nombre de Mateo Rodríguez._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0026-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Mateo Rodríguez | wa-hogar-0026-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0026. Queda a nombre de Mateo Rodríguez._ |
| `subtotal/domicilio/total` | 413000/15000/428000 | wa-hogar-0026-msg-04 → _El subtotal es $413.000, domicilio $15.000. Total: $428.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón sencillo (cant 3); cobija térmica queen beige (cant 1); juego de sábanas doble algodón (cant 2) | wa-hogar-0026-msg-01 → _ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas_ |

## wa-hogar-0027 — Natalia Rodríguez · `confirmado`

**Conversación original** (7 mensajes):
- `wa-hogar-0027-msg-01` **Cliente**: Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0027-msg-02` **Cliente**: Ah y si hay color crema mejor 🙏
- `wa-hogar-0027-msg-03` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0027-msg-04` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0027. Queda a nombre de Natalia Rodríguez.
- `wa-hogar-0027-msg-05` **Tienda**: El subtotal es $115.000, domicilio $14.000. Total: $129.000. ¿Confirmas?
- `wa-hogar-0027-msg-06` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0027-msg-07` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0027-msg-07 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0027-msg-01 → _Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Santa Marta?_ |
| `barrio` | Bavaria | wa-hogar-0027-msg-04 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0027. Queda a nombre de Natalia Rodríguez._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0027-msg-03 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Natalia Rodríguez | wa-hogar-0027-msg-04 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0027. Queda a nombre de Natalia Rodríguez._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0027-msg-06 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 115000/14000/129000 | wa-hogar-0027-msg-05 → _El subtotal es $115.000, domicilio $14.000. Total: $129.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 140x220 gris (cant 1) | wa-hogar-0027-msg-01 → _Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Santa Marta?_ |
| `color_crema_pendiente` | sí (sin confirmación) | wa-hogar-0027-msg-02 → _Ah y si hay color crema mejor 🙏_ |

## wa-hogar-0028 — Santiago Rodríguez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0028-msg-01` **Cliente**: Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Pereira?
- `wa-hogar-0028-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0028-msg-03` **Cliente**: Sí, barrio Álamos. Punto de entrega de prueba HOG-0028. Queda a nombre de Santiago Rodríguez.
- `wa-hogar-0028-msg-04` **Tienda**: El subtotal es $232.000, domicilio $14.000. Total: $246.000. ¿Confirmas?
- `wa-hogar-0028-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0028-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0028-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0028-msg-01 → _Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Pereira?_ |
| `barrio` | Álamos | wa-hogar-0028-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0028. Queda a nombre de Santiago Rodríguez._ |
| `tienda` | Textiles de Prueba | wa-hogar-0028-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Santiago Rodríguez | wa-hogar-0028-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0028. Queda a nombre de Santiago Rodríguez._ |
| `metodo_pago` | daviplata | wa-hogar-0028-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 232000/14000/246000 | wa-hogar-0028-msg-04 → _El subtotal es $232.000, domicilio $14.000. Total: $246.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño gris (cant 2); protector de colchón doble (cant 3) | wa-hogar-0028-msg-01 → _Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Pereira?_ |

## wa-hogar-0029 — Valentina Rodríguez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0029-msg-01` **Cliente**: Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativo terracota. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0029-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0029-msg-03` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0029. Queda a nombre de Valentina Rodríguez.
- `wa-hogar-0029-msg-04` **Tienda**: El subtotal es $288.000, domicilio $17.000. Total: $305.000. ¿Confirmas?
- `wa-hogar-0029-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0029-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0029-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0029-msg-01 → _Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativ_ |
| `barrio` | El Prado | wa-hogar-0029-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0029. Queda a nombre de Valentina Rodríguez._ |
| `tienda` | Casa Ficticia | wa-hogar-0029-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Valentina Rodríguez | wa-hogar-0029-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0029. Queda a nombre de Valentina Rodríguez._ |
| `metodo_pago` | nequi | wa-hogar-0029-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 288000/17000/305000 | wa-hogar-0029-msg-04 → _El subtotal es $288.000, domicilio $17.000. Total: $305.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera suave (cant 3); cortina blackout 140x220 beige (cant 1); cojín decorativo terracota (cant 2) | wa-hogar-0029-msg-01 → _Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativ_ |

## wa-hogar-0030 — Andrés Rodríguez · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0030-msg-01` **Cliente**: Hola, si juego de sábanas no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0030-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0030-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $9.000?
- `wa-hogar-0030-msg-04` **Tienda**: Sí, el envío estándar cuesta $9.000. ¿Deseas hacer el pedido?
- `wa-hogar-0030-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0030-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0030-msg-03 → _¿Y el domicilio a Suba queda en $9.000?_ |
| `costo_envio_estandar` | 9000 | wa-hogar-0030-msg-04 → _Sí, el envío estándar cuesta $9.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0031 — Camila Rodríguez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0031-msg-01` **Cliente**: Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Manizales?
- `wa-hogar-0031-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0031-msg-03` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0031. Queda a nombre de Camila Rodríguez.
- `wa-hogar-0031-msg-04` **Tienda**: El subtotal es $241.000, domicilio $14.000. Total: $255.000. ¿Confirmas?
- `wa-hogar-0031-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0031-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0031-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0031-msg-01 → _Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Manizales?_ |
| `barrio` | Palermo | wa-hogar-0031-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0031. Queda a nombre de Camila Rodríguez._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0031-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Camila Rodríguez | wa-hogar-0031-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0031. Queda a nombre de Camila Rodríguez._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0031-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 241000/14000/255000 | wa-hogar-0031-msg-04 → _El subtotal es $241.000, domicilio $14.000. Total: $255.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas gris x3 (cant 2); almohada hotelera firme (cant 3) | wa-hogar-0031-msg-01 → _Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Manizales?_ |

## wa-hogar-0032 — Julián Rodríguez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0032-msg-01` **Cliente**: Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño verde. ¿Cuánto queda para Cartagena?
- `wa-hogar-0032-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0032-msg-03` **Cliente**: Sí, en Manga, a nombre de Julián Rodríguez. Perdón: la cobija térmica la quiero en otra referencia, doble gris.
- `wa-hogar-0032-msg-04` **Tienda**: El subtotal es $409.000, domicilio $18.000. Total: $427.000. ¿Confirmas?
- `wa-hogar-0032-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0032-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0032-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0032-msg-01 → _Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño_ |
| `barrio` | Manga | wa-hogar-0032-msg-03 → _Sí, en Manga, a nombre de Julián Rodríguez. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |
| `tienda` | Textiles de Prueba | wa-hogar-0032-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Julián Rodríguez | wa-hogar-0032-msg-03 → _Sí, en Manga, a nombre de Julián Rodríguez. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |
| `metodo_pago` | daviplata | wa-hogar-0032-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 409000/18000/427000 | wa-hogar-0032-msg-04 → _El subtotal es $409.000, domicilio $18.000. Total: $427.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica doble gris (cant 3); juego de sábanas queen blancas (cant 1); tapete de baño verde (cant 2) | wa-hogar-0032-msg-01 → _Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño_ |
| `referencia_corregida` | sí | wa-hogar-0032-msg-03 → _Sí, en Manga, a nombre de Julián Rodríguez. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |

## wa-hogar-0033 — Marcela Rodríguez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0033-msg-01` **Cliente**: Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Medellín?
- `wa-hogar-0033-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0033-msg-03` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0033. Queda a nombre de Marcela Rodríguez.
- `wa-hogar-0033-msg-04` **Tienda**: El subtotal es $28.000, domicilio $10.000. Total: $38.000. ¿Confirmas?
- `wa-hogar-0033-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0033-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0033-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0033-msg-01 → _Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Medellín?_ |
| `barrio` | Laureles | wa-hogar-0033-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0033. Queda a nombre de Marcela Rodríguez._ |
| `tienda` | Casa Ficticia | wa-hogar-0033-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Marcela Rodríguez | wa-hogar-0033-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0033. Queda a nombre de Marcela Rodríguez._ |
| `metodo_pago` | nequi | wa-hogar-0033-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 28000/10000/38000 | wa-hogar-0033-msg-04 → _El subtotal es $28.000, domicilio $10.000. Total: $38.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo terracota (cant 1) | wa-hogar-0033-msg-01 → _Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Medellín?_ |

## wa-hogar-0034 — Nicolás Rodríguez · `cancelado`

**Conversación original** (6 mensajes):
- `wa-hogar-0034-msg-01` **Cliente**: ola, quiero comprar 2 unidades de protector de colchón queen y 3 unidades de cobija térmica doble gris. ¿Cuánto queda para Ibagué?
- `wa-hogar-0034-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0034-msg-03` **Cliente**: Sí, barrio La Pola. Punto de entrega de prueba HOG-0034. Queda a nombre de Nicolás Rodríguez.
- `wa-hogar-0034-msg-04` **Tienda**: El subtotal es $379.000, domicilio $14.000. Total: $393.000. ¿Confirmas?
- `wa-hogar-0034-msg-05` **Cliente**: No, mejor cancélalo por ahora. Gracias.
- `wa-hogar-0034-msg-06` **Tienda**: Entendido, no se genera el pedido.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | cancelado | wa-hogar-0034-msg-06 → _Entendido, no se genera el pedido._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0034-msg-01 → _ola, quiero comprar 2 unidades de protector de colchón queen y 3 unidades de cobija térmica doble gris. ¿Cuánto queda para Ibagué?_ |
| `barrio` | La Pola | wa-hogar-0034-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0034. Queda a nombre de Nicolás Rodríguez._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0034-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Nicolás Rodríguez | wa-hogar-0034-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0034. Queda a nombre de Nicolás Rodríguez._ |
| `subtotal/domicilio/total` | 379000/14000/393000 | wa-hogar-0034-msg-04 → _El subtotal es $379.000, domicilio $14.000. Total: $393.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón queen (cant 2); cobija térmica doble gris (cant 3) | wa-hogar-0034-msg-01 → _ola, quiero comprar 2 unidades de protector de colchón queen y 3 unidades de cobija térmica doble gris. ¿Cuánto queda para Ibagué?_ |

## wa-hogar-0035 — Paola Rodríguez · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0035-msg-01` **Cliente**: Hola, si cortina blackout no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0035-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0035-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0035-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0035-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0035-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0036 — Sebastián Rodríguez · `confirmado`

**Conversación original** (7 mensajes):
- `wa-hogar-0036-msg-01` **Cliente**: Buen día, quisiera 1 unidades de tapete de baño verde. ¿Cuánto queda para Cali?
- `wa-hogar-0036-msg-02` **Cliente**: Ah y si hay color crema mejor 🙏
- `wa-hogar-0036-msg-03` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0036-msg-04` **Cliente**: Sí, barrio San Fernando. Punto de entrega de prueba HOG-0036. Queda a nombre de Sebastián Rodríguez.
- `wa-hogar-0036-msg-05` **Tienda**: El subtotal es $32.000, domicilio $11.000. Total: $43.000. ¿Confirmas?
- `wa-hogar-0036-msg-06` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0036-msg-07` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0036-msg-07 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0036-msg-01 → _Buen día, quisiera 1 unidades de tapete de baño verde. ¿Cuánto queda para Cali?_ |
| `barrio` | San Fernando | wa-hogar-0036-msg-04 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0036. Queda a nombre de Sebastián Rodríguez._ |
| `tienda` | Textiles de Prueba | wa-hogar-0036-msg-03 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Sebastián Rodríguez | wa-hogar-0036-msg-04 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0036. Queda a nombre de Sebastián Rodríguez._ |
| `metodo_pago` | daviplata | wa-hogar-0036-msg-06 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 32000/11000/43000 | wa-hogar-0036-msg-05 → _El subtotal es $32.000, domicilio $11.000. Total: $43.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño verde (cant 1) | wa-hogar-0036-msg-01 → _Buen día, quisiera 1 unidades de tapete de baño verde. ¿Cuánto queda para Cali?_ |
| `color_crema_pendiente` | sí (sin confirmación) | wa-hogar-0036-msg-02 → _Ah y si hay color crema mejor 🙏_ |

## wa-hogar-0037 — Tatiana Rodríguez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0037-msg-01` **Cliente**: Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0037-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0037-msg-03` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0037. Queda a nombre de Tatiana Rodríguez.
- `wa-hogar-0037-msg-04` **Tienda**: El subtotal es $423.000, domicilio $16.000. Total: $439.000. ¿Confirmas?
- `wa-hogar-0037-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0037-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0037-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0037-msg-01 → _Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Santa Marta?_ |
| `barrio` | Bavaria | wa-hogar-0037-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0037. Queda a nombre de Tatiana Rodríguez._ |
| `tienda` | Casa Ficticia | wa-hogar-0037-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Tatiana Rodríguez | wa-hogar-0037-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0037. Queda a nombre de Tatiana Rodríguez._ |
| `metodo_pago` | nequi | wa-hogar-0037-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 423000/16000/439000 | wa-hogar-0037-msg-04 → _El subtotal es $423.000, domicilio $16.000. Total: $439.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera media (cant 2); cortina blackout 140x220 gris (cant 3) | wa-hogar-0037-msg-01 → _Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Santa Marta?_ |

## wa-hogar-0038 — Daniel Rodríguez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0038-msg-01` **Cliente**: Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón doble. ¿Cuánto queda para Pereira?
- `wa-hogar-0038-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0038-msg-03` **Cliente**: Sí, barrio Álamos. Punto de entrega de prueba HOG-0038. Queda a nombre de Daniel Rodríguez.
- `wa-hogar-0038-msg-04` **Tienda**: El subtotal es $378.000, domicilio $16.000. Total: $394.000. ¿Confirmas?
- `wa-hogar-0038-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0038-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0038-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0038-msg-01 → _Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón_ |
| `barrio` | Álamos | wa-hogar-0038-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0038. Queda a nombre de Daniel Rodríguez._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0038-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Daniel Rodríguez | wa-hogar-0038-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0038. Queda a nombre de Daniel Rodríguez._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0038-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 378000/16000/394000 | wa-hogar-0038-msg-04 → _El subtotal es $378.000, domicilio $16.000. Total: $394.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas sencillas estampadas (cant 3); tapete de baño gris (cant 1); protector de colchón doble (cant 2) | wa-hogar-0038-msg-01 → _Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón_ |

## wa-hogar-0039 — Gabriela Rodríguez · `pendiente`

**Conversación original** (6 mensajes):
- `wa-hogar-0039-msg-01` **Cliente**: Buenas, me regalas 1 unidades de juego de toallas blancas x3. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0039-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0039-msg-03` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0039. Queda a nombre de Gabriela Rodríguez.
- `wa-hogar-0039-msg-04` **Tienda**: El subtotal es $62.000, domicilio $13.000. Total: $75.000. ¿Confirmas?
- `wa-hogar-0039-msg-05` **Cliente**: Déjamelo pendiente mientras confirmo la dirección, porfa.
- `wa-hogar-0039-msg-06` **Tienda**: Claro, queda pendiente y no se despacha todavía.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | pendiente | wa-hogar-0039-msg-06 → _Claro, queda pendiente y no se despacha todavía._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0039-msg-01 → _Buenas, me regalas 1 unidades de juego de toallas blancas x3. ¿Cuánto queda para Barranquilla?_ |
| `barrio` | El Prado | wa-hogar-0039-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0039. Queda a nombre de Gabriela Rodríguez._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0039-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Gabriela Rodríguez | wa-hogar-0039-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0039. Queda a nombre de Gabriela Rodríguez._ |
| `subtotal/domicilio/total` | 62000/13000/75000 | wa-hogar-0039-msg-04 → _El subtotal es $62.000, domicilio $13.000. Total: $75.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas blancas x3 (cant 1) | wa-hogar-0039-msg-01 → _Buenas, me regalas 1 unidades de juego de toallas blancas x3. ¿Cuánto queda para Barranquilla?_ |

## wa-hogar-0040 — Ricardo Rodríguez · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0040-msg-01` **Cliente**: Hola, si cobija térmica no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0040-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0040-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $11.000?
- `wa-hogar-0040-msg-04` **Tienda**: Sí, el envío estándar cuesta $11.000. ¿Deseas hacer el pedido?
- `wa-hogar-0040-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0040-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0040-msg-03 → _¿Y el domicilio a Suba queda en $11.000?_ |
| `costo_envio_estandar` | 11000 | wa-hogar-0040-msg-04 → _Sí, el envío estándar cuesta $11.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0041 — Ana Martínez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0041-msg-01` **Cliente**: Hola 😊 necesito 3 unidades de cojín decorativo crema y 1 unidades de juego de toallas gris x3 y 2 unidades de almohada hotelera firme. ¿Cuánto queda para Manizales?
- `wa-hogar-0041-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0041-msg-03` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0041. Queda a nombre de Ana Martínez.
- `wa-hogar-0041-msg-04` **Tienda**: El subtotal es $224.000, domicilio $16.000. Total: $240.000. ¿Confirmas?
- `wa-hogar-0041-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0041-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0041-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0041-msg-01 → _Hola 😊 necesito 3 unidades de cojín decorativo crema y 1 unidades de juego de toallas gris x3 y 2 unidades de almohada hotelera firme. ¿Cuán_ |
| `barrio` | Palermo | wa-hogar-0041-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0041. Queda a nombre de Ana Martínez._ |
| `tienda` | Casa Ficticia | wa-hogar-0041-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Ana Martínez | wa-hogar-0041-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0041. Queda a nombre de Ana Martínez._ |
| `metodo_pago` | nequi | wa-hogar-0041-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 224000/16000/240000 | wa-hogar-0041-msg-04 → _El subtotal es $224.000, domicilio $16.000. Total: $240.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo crema (cant 3); juego de toallas gris x3 (cant 1); almohada hotelera firme (cant 2) | wa-hogar-0041-msg-01 → _Hola 😊 necesito 3 unidades de cojín decorativo crema y 1 unidades de juego de toallas gris x3 y 2 unidades de almohada hotelera firme. ¿Cuán_ |

## wa-hogar-0042 — Carlos Martínez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0042-msg-01` **Cliente**: ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Cartagena?
- `wa-hogar-0042-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0042-msg-03` **Cliente**: Sí, barrio Manga. Punto de entrega de prueba HOG-0042. Queda a nombre de Carlos Martínez.
- `wa-hogar-0042-msg-04` **Tienda**: El subtotal es $56.000, domicilio $14.000. Total: $70.000. ¿Confirmas?
- `wa-hogar-0042-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0042-msg-06` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0042-msg-06 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0042-msg-01 → _ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Cartagena?_ |
| `barrio` | Manga | wa-hogar-0042-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0042. Queda a nombre de Carlos Martínez._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0042-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Carlos Martínez | wa-hogar-0042-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0042. Queda a nombre de Carlos Martínez._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0042-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 56000/14000/70000 | wa-hogar-0042-msg-04 → _El subtotal es $56.000, domicilio $14.000. Total: $70.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón doble (cant 1) | wa-hogar-0042-msg-01 → _ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Cartagena?_ |

## wa-hogar-0043 — Diana Martínez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0043-msg-01` **Cliente**: Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Medellín?
- `wa-hogar-0043-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0043-msg-03` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0043. Queda a nombre de Diana Martínez.
- `wa-hogar-0043-msg-04` **Tienda**: El subtotal es $314.000, domicilio $12.000. Total: $326.000. ¿Confirmas?
- `wa-hogar-0043-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0043-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0043-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0043-msg-01 → _Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Me_ |
| `barrio` | Laureles | wa-hogar-0043-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0043. Queda a nombre de Diana Martínez._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0043-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Diana Martínez | wa-hogar-0043-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0043. Queda a nombre de Diana Martínez._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0043-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 314000/12000/326000 | wa-hogar-0043-msg-04 → _El subtotal es $314.000, domicilio $12.000. Total: $326.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 140x220 beige (cant 2); cojín decorativo terracota (cant 3) | wa-hogar-0043-msg-01 → _Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Me_ |

## wa-hogar-0044 — Felipe Martínez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0044-msg-01` **Cliente**: Buen día, quisiera 3 unidades de tapete de baño beige y 1 unidades de protector de colchón queen y 2 unidades de cobija térmica doble gris. ¿Cuánto queda para Ibagué?
- `wa-hogar-0044-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0044-msg-03` **Cliente**: Sí, barrio La Pola. Punto de entrega de prueba HOG-0044. Queda a nombre de Felipe Martínez.
- `wa-hogar-0044-msg-04` **Tienda**: El subtotal es $330.000, domicilio $16.000. Total: $346.000. ¿Confirmas?
- `wa-hogar-0044-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0044-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0044-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0044-msg-01 → _Buen día, quisiera 3 unidades de tapete de baño beige y 1 unidades de protector de colchón queen y 2 unidades de cobija térmica doble gris._ |
| `barrio` | La Pola | wa-hogar-0044-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0044. Queda a nombre de Felipe Martínez._ |
| `tienda` | Textiles de Prueba | wa-hogar-0044-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Felipe Martínez | wa-hogar-0044-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0044. Queda a nombre de Felipe Martínez._ |
| `metodo_pago` | daviplata | wa-hogar-0044-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 330000/16000/346000 | wa-hogar-0044-msg-04 → _El subtotal es $330.000, domicilio $16.000. Total: $346.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño beige (cant 3); protector de colchón queen (cant 1); cobija térmica doble gris (cant 2) | wa-hogar-0044-msg-01 → _Buen día, quisiera 3 unidades de tapete de baño beige y 1 unidades de protector de colchón queen y 2 unidades de cobija térmica doble gris._ |

## wa-hogar-0045 — Laura Martínez · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0045-msg-01` **Cliente**: Hola, si almohada hotelera no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0045-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0045-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0045-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0045-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0045-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0046 — Mateo Martínez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0046-msg-01` **Cliente**: Holaa, necesito 2 unidades de juego de sábanas queen blancas y 3 unidades de tapete de baño verde. ¿Cuánto queda para Cali?
- `wa-hogar-0046-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0046-msg-03` **Cliente**: Sí, barrio San Fernando. Punto de entrega de prueba HOG-0046. Queda a nombre de Mateo Martínez.
- `wa-hogar-0046-msg-04` **Tienda**: El subtotal es $252.000, domicilio $13.000. Total: $265.000. ¿Confirmas?
- `wa-hogar-0046-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0046-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0046-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0046-msg-01 → _Holaa, necesito 2 unidades de juego de sábanas queen blancas y 3 unidades de tapete de baño verde. ¿Cuánto queda para Cali?_ |
| `barrio` | San Fernando | wa-hogar-0046-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0046. Queda a nombre de Mateo Martínez._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0046-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Mateo Martínez | wa-hogar-0046-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0046. Queda a nombre de Mateo Martínez._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0046-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 252000/13000/265000 | wa-hogar-0046-msg-04 → _El subtotal es $252.000, domicilio $13.000. Total: $265.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas queen blancas (cant 2); tapete de baño verde (cant 3) | wa-hogar-0046-msg-01 → _Holaa, necesito 2 unidades de juego de sábanas queen blancas y 3 unidades de tapete de baño verde. ¿Cuánto queda para Cali?_ |

## wa-hogar-0047 — Natalia Martínez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0047-msg-01` **Cliente**: Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0047-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0047-msg-03` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0047. Queda a nombre de Natalia Martínez.
- `wa-hogar-0047-msg-04` **Tienda**: El subtotal es $455.000, domicilio $18.000. Total: $473.000. ¿Confirmas?
- `wa-hogar-0047-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0047-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0047-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0047-msg-01 → _Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220_ |
| `barrio` | Bavaria | wa-hogar-0047-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0047. Queda a nombre de Natalia Martínez._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0047-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Natalia Martínez | wa-hogar-0047-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0047. Queda a nombre de Natalia Martínez._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0047-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 455000/18000/473000 | wa-hogar-0047-msg-04 → _El subtotal es $455.000, domicilio $18.000. Total: $473.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas arena x2 (cant 3); almohada hotelera media (cant 1); cortina blackout 140x220 gris (cant 2) | wa-hogar-0047-msg-01 → _Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220_ |

## wa-hogar-0048 — Santiago Martínez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0048-msg-01` **Cliente**: Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Pereira?
- `wa-hogar-0048-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0048-msg-03` **Cliente**: Sí, en Álamos, a nombre de Santiago Martínez. Perdón: la cobija térmica la quiero en otra referencia, queen beige.
- `wa-hogar-0048-msg-04` **Tienda**: El subtotal es $89.000, domicilio $12.000. Total: $101.000. ¿Confirmas?
- `wa-hogar-0048-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0048-msg-06` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0048-msg-06 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0048-msg-01 → _Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Pereira?_ |
| `barrio` | Álamos | wa-hogar-0048-msg-03 → _Sí, en Álamos, a nombre de Santiago Martínez. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |
| `tienda` | Textiles de Prueba | wa-hogar-0048-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Santiago Martínez | wa-hogar-0048-msg-03 → _Sí, en Álamos, a nombre de Santiago Martínez. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |
| `metodo_pago` | daviplata | wa-hogar-0048-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 89000/12000/101000 | wa-hogar-0048-msg-04 → _El subtotal es $89.000, domicilio $12.000. Total: $101.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica queen beige (cant 1) | wa-hogar-0048-msg-01 → _Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Pereira?_ |
| `referencia_corregida` | sí | wa-hogar-0048-msg-03 → _Sí, en Álamos, a nombre de Santiago Martínez. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |

## wa-hogar-0049 — Valentina Martínez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0049-msg-01` **Cliente**: Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0049-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0049-msg-03` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0049. Queda a nombre de Valentina Martínez.
- `wa-hogar-0049-msg-04` **Tienda**: El subtotal es $242.000, domicilio $15.000. Total: $257.000. ¿Confirmas?
- `wa-hogar-0049-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0049-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0049-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0049-msg-01 → _Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Barranquilla?_ |
| `barrio` | El Prado | wa-hogar-0049-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0049. Queda a nombre de Valentina Martínez._ |
| `tienda` | Casa Ficticia | wa-hogar-0049-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Valentina Martínez | wa-hogar-0049-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0049. Queda a nombre de Valentina Martínez._ |
| `metodo_pago` | nequi | wa-hogar-0049-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 242000/15000/257000 | wa-hogar-0049-msg-04 → _El subtotal es $242.000, domicilio $15.000. Total: $257.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo verde oliva (cant 2); juego de toallas blancas x3 (cant 3) | wa-hogar-0049-msg-01 → _Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Barranquilla?_ |

## wa-hogar-0050 — Andrés Martínez · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0050-msg-01` **Cliente**: Hola, si protector de colchón no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0050-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0050-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $13.000?
- `wa-hogar-0050-msg-04` **Tienda**: Sí, el envío estándar cuesta $13.000. ¿Deseas hacer el pedido?
- `wa-hogar-0050-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0050-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0050-msg-03 → _¿Y el domicilio a Suba queda en $13.000?_ |
| `costo_envio_estandar` | 13000 | wa-hogar-0050-msg-04 → _Sí, el envío estándar cuesta $13.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0051 — Camila Martínez · `cancelado`

**Conversación original** (6 mensajes):
- `wa-hogar-0051-msg-01` **Cliente**: Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Manizales?
- `wa-hogar-0051-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0051-msg-03` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0051. Queda a nombre de Camila Martínez.
- `wa-hogar-0051-msg-04` **Tienda**: El subtotal es $115.000, domicilio $12.000. Total: $127.000. ¿Confirmas?
- `wa-hogar-0051-msg-05` **Cliente**: No, mejor cancélalo por ahora. Gracias.
- `wa-hogar-0051-msg-06` **Tienda**: Entendido, no se genera el pedido.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | cancelado | wa-hogar-0051-msg-06 → _Entendido, no se genera el pedido._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0051-msg-01 → _Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Manizales?_ |
| `barrio` | Palermo | wa-hogar-0051-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0051. Queda a nombre de Camila Martínez._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0051-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Camila Martínez | wa-hogar-0051-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0051. Queda a nombre de Camila Martínez._ |
| `subtotal/domicilio/total` | 115000/12000/127000 | wa-hogar-0051-msg-04 → _El subtotal es $115.000, domicilio $12.000. Total: $127.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 140x220 gris (cant 1) | wa-hogar-0051-msg-01 → _Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Manizales?_ |

## wa-hogar-0052 — Julián Martínez · `pendiente`

**Conversación original** (6 mensajes):
- `wa-hogar-0052-msg-01` **Cliente**: Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Cartagena?
- `wa-hogar-0052-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0052-msg-03` **Cliente**: Sí, barrio Manga. Punto de entrega de prueba HOG-0052. Queda a nombre de Julián Martínez.
- `wa-hogar-0052-msg-04` **Tienda**: El subtotal es $232.000, domicilio $16.000. Total: $248.000. ¿Confirmas?
- `wa-hogar-0052-msg-05` **Cliente**: Déjamelo pendiente mientras confirmo la dirección, porfa.
- `wa-hogar-0052-msg-06` **Tienda**: Claro, queda pendiente y no se despacha todavía.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | pendiente | wa-hogar-0052-msg-06 → _Claro, queda pendiente y no se despacha todavía._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0052-msg-01 → _Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Cartagena?_ |
| `barrio` | Manga | wa-hogar-0052-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0052. Queda a nombre de Julián Martínez._ |
| `tienda` | Textiles de Prueba | wa-hogar-0052-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Julián Martínez | wa-hogar-0052-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0052. Queda a nombre de Julián Martínez._ |
| `subtotal/domicilio/total` | 232000/16000/248000 | wa-hogar-0052-msg-04 → _El subtotal es $232.000, domicilio $16.000. Total: $248.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño gris (cant 2); protector de colchón doble (cant 3) | wa-hogar-0052-msg-01 → _Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Cartagena?_ |

## wa-hogar-0053 — Marcela Martínez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0053-msg-01` **Cliente**: Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativo terracota. ¿Cuánto queda para Medellín?
- `wa-hogar-0053-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0053-msg-03` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0053. Queda a nombre de Marcela Martínez.
- `wa-hogar-0053-msg-04` **Tienda**: El subtotal es $288.000, domicilio $14.000. Total: $302.000. ¿Confirmas?
- `wa-hogar-0053-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0053-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0053-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0053-msg-01 → _Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativ_ |
| `barrio` | Laureles | wa-hogar-0053-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0053. Queda a nombre de Marcela Martínez._ |
| `tienda` | Casa Ficticia | wa-hogar-0053-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Marcela Martínez | wa-hogar-0053-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0053. Queda a nombre de Marcela Martínez._ |
| `metodo_pago` | nequi | wa-hogar-0053-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 288000/14000/302000 | wa-hogar-0053-msg-04 → _El subtotal es $288.000, domicilio $14.000. Total: $302.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera suave (cant 3); cortina blackout 140x220 beige (cant 1); cojín decorativo terracota (cant 2) | wa-hogar-0053-msg-01 → _Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativ_ |

## wa-hogar-0054 — Nicolás Martínez · `confirmado`

**Conversación original** (7 mensajes):
- `wa-hogar-0054-msg-01` **Cliente**: Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Ibagué?
- `wa-hogar-0054-msg-02` **Cliente**: Ah y si hay color crema mejor 🙏
- `wa-hogar-0054-msg-03` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0054-msg-04` **Cliente**: Sí, barrio La Pola. Punto de entrega de prueba HOG-0054. Queda a nombre de Nicolás Martínez.
- `wa-hogar-0054-msg-05` **Tienda**: El subtotal es $78.000, domicilio $12.000. Total: $90.000. ¿Confirmas?
- `wa-hogar-0054-msg-06` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0054-msg-07` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0054-msg-07 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0054-msg-01 → _Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Ibagué?_ |
| `barrio` | La Pola | wa-hogar-0054-msg-04 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0054. Queda a nombre de Nicolás Martínez._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0054-msg-03 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Nicolás Martínez | wa-hogar-0054-msg-04 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0054. Queda a nombre de Nicolás Martínez._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0054-msg-06 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 78000/12000/90000 | wa-hogar-0054-msg-05 → _El subtotal es $78.000, domicilio $12.000. Total: $90.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas doble algodón (cant 1) | wa-hogar-0054-msg-01 → _Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Ibagué?_ |
| `color_crema_pendiente` | sí (sin confirmación) | wa-hogar-0054-msg-02 → _Ah y si hay color crema mejor 🙏_ |

## wa-hogar-0055 — Paola Martínez · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0055-msg-01` **Cliente**: Hola, si juego de toallas no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0055-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0055-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0055-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0055-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0055-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0056 — Sebastián Martínez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0056-msg-01` **Cliente**: Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño verde. ¿Cuánto queda para Cali?
- `wa-hogar-0056-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0056-msg-03` **Cliente**: Sí, en San Fernando, a nombre de Sebastián Martínez. Perdón: la cobija térmica la quiero en otra referencia, doble gris.
- `wa-hogar-0056-msg-04` **Tienda**: El subtotal es $409.000, domicilio $15.000. Total: $424.000. ¿Confirmas?
- `wa-hogar-0056-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0056-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0056-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0056-msg-01 → _Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño_ |
| `barrio` | San Fernando | wa-hogar-0056-msg-03 → _Sí, en San Fernando, a nombre de Sebastián Martínez. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |
| `tienda` | Textiles de Prueba | wa-hogar-0056-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Sebastián Martínez | wa-hogar-0056-msg-03 → _Sí, en San Fernando, a nombre de Sebastián Martínez. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |
| `metodo_pago` | daviplata | wa-hogar-0056-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 409000/15000/424000 | wa-hogar-0056-msg-04 → _El subtotal es $409.000, domicilio $15.000. Total: $424.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica doble gris (cant 3); juego de sábanas queen blancas (cant 1); tapete de baño verde (cant 2) | wa-hogar-0056-msg-01 → _Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño_ |
| `referencia_corregida` | sí | wa-hogar-0056-msg-03 → _Sí, en San Fernando, a nombre de Sebastián Martínez. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |

## wa-hogar-0057 — Tatiana Martínez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0057-msg-01` **Cliente**: Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0057-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0057-msg-03` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0057. Queda a nombre de Tatiana Martínez.
- `wa-hogar-0057-msg-04` **Tienda**: El subtotal es $28.000, domicilio $14.000. Total: $42.000. ¿Confirmas?
- `wa-hogar-0057-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0057-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0057-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0057-msg-01 → _Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Santa Marta?_ |
| `barrio` | Bavaria | wa-hogar-0057-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0057. Queda a nombre de Tatiana Martínez._ |
| `tienda` | Casa Ficticia | wa-hogar-0057-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Tatiana Martínez | wa-hogar-0057-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0057. Queda a nombre de Tatiana Martínez._ |
| `metodo_pago` | nequi | wa-hogar-0057-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 28000/14000/42000 | wa-hogar-0057-msg-04 → _El subtotal es $28.000, domicilio $14.000. Total: $42.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo terracota (cant 1) | wa-hogar-0057-msg-01 → _Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Santa Marta?_ |

## wa-hogar-0058 — Daniel Martínez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0058-msg-01` **Cliente**: ola, quiero comprar 2 unidades de protector de colchón queen y 3 unidades de cobija térmica doble gris. ¿Cuánto queda para Pereira?
- `wa-hogar-0058-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0058-msg-03` **Cliente**: Sí, barrio Álamos. Punto de entrega de prueba HOG-0058. Queda a nombre de Daniel Martínez.
- `wa-hogar-0058-msg-04` **Tienda**: El subtotal es $379.000, domicilio $14.000. Total: $393.000. ¿Confirmas?
- `wa-hogar-0058-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0058-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0058-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0058-msg-01 → _ola, quiero comprar 2 unidades de protector de colchón queen y 3 unidades de cobija térmica doble gris. ¿Cuánto queda para Pereira?_ |
| `barrio` | Álamos | wa-hogar-0058-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0058. Queda a nombre de Daniel Martínez._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0058-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Daniel Martínez | wa-hogar-0058-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0058. Queda a nombre de Daniel Martínez._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0058-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 379000/14000/393000 | wa-hogar-0058-msg-04 → _El subtotal es $379.000, domicilio $14.000. Total: $393.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón queen (cant 2); cobija térmica doble gris (cant 3) | wa-hogar-0058-msg-01 → _ola, quiero comprar 2 unidades de protector de colchón queen y 3 unidades de cobija térmica doble gris. ¿Cuánto queda para Pereira?_ |

## wa-hogar-0059 — Gabriela Martínez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0059-msg-01` **Cliente**: Buenas tardes, estoy buscando 3 unidades de cortina blackout 200x220 azul y 1 unidades de cojín decorativo verde oliva y 2 unidades de juego de toallas blancas x3. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0059-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0059-msg-03` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0059. Queda a nombre de Gabriela Martínez.
- `wa-hogar-0059-msg-04` **Tienda**: El subtotal es $497.000, domicilio $17.000. Total: $514.000. ¿Confirmas?
- `wa-hogar-0059-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0059-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0059-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0059-msg-01 → _Buenas tardes, estoy buscando 3 unidades de cortina blackout 200x220 azul y 1 unidades de cojín decorativo verde oliva y 2 unidades de juego_ |
| `barrio` | El Prado | wa-hogar-0059-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0059. Queda a nombre de Gabriela Martínez._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0059-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Gabriela Martínez | wa-hogar-0059-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0059. Queda a nombre de Gabriela Martínez._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0059-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 497000/17000/514000 | wa-hogar-0059-msg-04 → _El subtotal es $497.000, domicilio $17.000. Total: $514.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 200x220 azul (cant 3); cojín decorativo verde oliva (cant 1); juego de toallas blancas x3 (cant 2) | wa-hogar-0059-msg-01 → _Buenas tardes, estoy buscando 3 unidades de cortina blackout 200x220 azul y 1 unidades de cojín decorativo verde oliva y 2 unidades de juego_ |

## wa-hogar-0060 — Ricardo Martínez · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0060-msg-01` **Cliente**: Hola, si tapete de baño no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0060-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0060-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $9.000?
- `wa-hogar-0060-msg-04` **Tienda**: Sí, el envío estándar cuesta $9.000. ¿Deseas hacer el pedido?
- `wa-hogar-0060-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0060-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0060-msg-03 → _¿Y el domicilio a Suba queda en $9.000?_ |
| `costo_envio_estandar` | 9000 | wa-hogar-0060-msg-04 → _Sí, el envío estándar cuesta $9.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0061 — Ana López · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0061-msg-01` **Cliente**: Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Manizales?
- `wa-hogar-0061-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0061-msg-03` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0061. Queda a nombre de Ana López.
- `wa-hogar-0061-msg-04` **Tienda**: El subtotal es $423.000, domicilio $14.000. Total: $437.000. ¿Confirmas?
- `wa-hogar-0061-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0061-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0061-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0061-msg-01 → _Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Manizales?_ |
| `barrio` | Palermo | wa-hogar-0061-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0061. Queda a nombre de Ana López._ |
| `tienda` | Casa Ficticia | wa-hogar-0061-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Ana López | wa-hogar-0061-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0061. Queda a nombre de Ana López._ |
| `metodo_pago` | nequi | wa-hogar-0061-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 423000/14000/437000 | wa-hogar-0061-msg-04 → _El subtotal es $423.000, domicilio $14.000. Total: $437.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera media (cant 2); cortina blackout 140x220 gris (cant 3) | wa-hogar-0061-msg-01 → _Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Manizales?_ |

## wa-hogar-0062 — Carlos López · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0062-msg-01` **Cliente**: Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón doble. ¿Cuánto queda para Cartagena?
- `wa-hogar-0062-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0062-msg-03` **Cliente**: Sí, barrio Manga. Punto de entrega de prueba HOG-0062. Queda a nombre de Carlos López.
- `wa-hogar-0062-msg-04` **Tienda**: El subtotal es $378.000, domicilio $18.000. Total: $396.000. ¿Confirmas?
- `wa-hogar-0062-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0062-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0062-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0062-msg-01 → _Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón_ |
| `barrio` | Manga | wa-hogar-0062-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0062. Queda a nombre de Carlos López._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0062-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Carlos López | wa-hogar-0062-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0062. Queda a nombre de Carlos López._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0062-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 378000/18000/396000 | wa-hogar-0062-msg-04 → _El subtotal es $378.000, domicilio $18.000. Total: $396.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas sencillas estampadas (cant 3); tapete de baño gris (cant 1); protector de colchón doble (cant 2) | wa-hogar-0062-msg-01 → _Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón_ |

## wa-hogar-0063 — Diana López · `confirmado`

**Conversación original** (7 mensajes):
- `wa-hogar-0063-msg-01` **Cliente**: Buenas, me regalas 1 unidades de juego de toallas blancas x3. ¿Cuánto queda para Medellín?
- `wa-hogar-0063-msg-02` **Cliente**: Ah y si hay color crema mejor 🙏
- `wa-hogar-0063-msg-03` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0063-msg-04` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0063. Queda a nombre de Diana López.
- `wa-hogar-0063-msg-05` **Tienda**: El subtotal es $62.000, domicilio $10.000. Total: $72.000. ¿Confirmas?
- `wa-hogar-0063-msg-06` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0063-msg-07` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0063-msg-07 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0063-msg-01 → _Buenas, me regalas 1 unidades de juego de toallas blancas x3. ¿Cuánto queda para Medellín?_ |
| `barrio` | Laureles | wa-hogar-0063-msg-04 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0063. Queda a nombre de Diana López._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0063-msg-03 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Diana López | wa-hogar-0063-msg-04 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0063. Queda a nombre de Diana López._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0063-msg-06 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 62000/10000/72000 | wa-hogar-0063-msg-05 → _El subtotal es $62.000, domicilio $10.000. Total: $72.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas blancas x3 (cant 1) | wa-hogar-0063-msg-01 → _Buenas, me regalas 1 unidades de juego de toallas blancas x3. ¿Cuánto queda para Medellín?_ |
| `color_crema_pendiente` | sí (sin confirmación) | wa-hogar-0063-msg-02 → _Ah y si hay color crema mejor 🙏_ |

## wa-hogar-0064 — Felipe López · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0064-msg-01` **Cliente**: Hola, quiero pedir 2 unidades de cobija térmica queen beige y 3 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Ibagué?
- `wa-hogar-0064-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0064-msg-03` **Cliente**: Sí, en La Pola, a nombre de Felipe López. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul.
- `wa-hogar-0064-msg-04` **Tienda**: El subtotal es $412.000, domicilio $14.000. Total: $426.000. ¿Confirmas?
- `wa-hogar-0064-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0064-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0064-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0064-msg-01 → _Hola, quiero pedir 2 unidades de cobija térmica queen beige y 3 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Ibagué?_ |
| `barrio` | La Pola | wa-hogar-0064-msg-03 → _Sí, en La Pola, a nombre de Felipe López. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul._ |
| `tienda` | Textiles de Prueba | wa-hogar-0064-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Felipe López | wa-hogar-0064-msg-03 → _Sí, en La Pola, a nombre de Felipe López. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul._ |
| `metodo_pago` | daviplata | wa-hogar-0064-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 412000/14000/426000 | wa-hogar-0064-msg-04 → _El subtotal es $412.000, domicilio $14.000. Total: $426.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica sencilla azul (cant 2); juego de sábanas doble algodón (cant 3) | wa-hogar-0064-msg-01 → _Hola, quiero pedir 2 unidades de cobija térmica queen beige y 3 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Ibagué?_ |
| `referencia_corregida` | sí | wa-hogar-0064-msg-03 → _Sí, en La Pola, a nombre de Felipe López. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul._ |

## wa-hogar-0065 — Laura López · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0065-msg-01` **Cliente**: Hola, si cojín decorativo no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0065-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0065-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0065-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0065-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0065-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0066 — Mateo López · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0066-msg-01` **Cliente**: ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Cali?
- `wa-hogar-0066-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0066-msg-03` **Cliente**: Sí, barrio San Fernando. Punto de entrega de prueba HOG-0066. Queda a nombre de Mateo López.
- `wa-hogar-0066-msg-04` **Tienda**: El subtotal es $56.000, domicilio $11.000. Total: $67.000. ¿Confirmas?
- `wa-hogar-0066-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0066-msg-06` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0066-msg-06 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0066-msg-01 → _ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Cali?_ |
| `barrio` | San Fernando | wa-hogar-0066-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0066. Queda a nombre de Mateo López._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0066-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Mateo López | wa-hogar-0066-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0066. Queda a nombre de Mateo López._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0066-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 56000/11000/67000 | wa-hogar-0066-msg-04 → _El subtotal es $56.000, domicilio $11.000. Total: $67.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón doble (cant 1) | wa-hogar-0066-msg-01 → _ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Cali?_ |

## wa-hogar-0067 — Natalia López · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0067-msg-01` **Cliente**: Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0067-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0067-msg-03` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0067. Queda a nombre de Natalia López.
- `wa-hogar-0067-msg-04` **Tienda**: El subtotal es $314.000, domicilio $16.000. Total: $330.000. ¿Confirmas?
- `wa-hogar-0067-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0067-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0067-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0067-msg-01 → _Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Sa_ |
| `barrio` | Bavaria | wa-hogar-0067-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0067. Queda a nombre de Natalia López._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0067-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Natalia López | wa-hogar-0067-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0067. Queda a nombre de Natalia López._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0067-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 314000/16000/330000 | wa-hogar-0067-msg-04 → _El subtotal es $314.000, domicilio $16.000. Total: $330.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 140x220 beige (cant 2); cojín decorativo terracota (cant 3) | wa-hogar-0067-msg-01 → _Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Sa_ |

## wa-hogar-0068 — Santiago López · `cancelado`

**Conversación original** (6 mensajes):
- `wa-hogar-0068-msg-01` **Cliente**: Buen día, quisiera 3 unidades de tapete de baño beige y 1 unidades de protector de colchón queen y 2 unidades de cobija térmica doble gris. ¿Cuánto queda para Pereira?
- `wa-hogar-0068-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0068-msg-03` **Cliente**: Sí, barrio Álamos. Punto de entrega de prueba HOG-0068. Queda a nombre de Santiago López.
- `wa-hogar-0068-msg-04` **Tienda**: El subtotal es $330.000, domicilio $16.000. Total: $346.000. ¿Confirmas?
- `wa-hogar-0068-msg-05` **Cliente**: No, mejor cancélalo por ahora. Gracias.
- `wa-hogar-0068-msg-06` **Tienda**: Entendido, no se genera el pedido.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | cancelado | wa-hogar-0068-msg-06 → _Entendido, no se genera el pedido._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0068-msg-01 → _Buen día, quisiera 3 unidades de tapete de baño beige y 1 unidades de protector de colchón queen y 2 unidades de cobija térmica doble gris._ |
| `barrio` | Álamos | wa-hogar-0068-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0068. Queda a nombre de Santiago López._ |
| `tienda` | Textiles de Prueba | wa-hogar-0068-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Santiago López | wa-hogar-0068-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0068. Queda a nombre de Santiago López._ |
| `subtotal/domicilio/total` | 330000/16000/346000 | wa-hogar-0068-msg-04 → _El subtotal es $330.000, domicilio $16.000. Total: $346.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño beige (cant 3); protector de colchón queen (cant 1); cobija térmica doble gris (cant 2) | wa-hogar-0068-msg-01 → _Buen día, quisiera 3 unidades de tapete de baño beige y 1 unidades de protector de colchón queen y 2 unidades de cobija térmica doble gris._ |

## wa-hogar-0069 — Valentina López · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0069-msg-01` **Cliente**: Hola! tienen disponible 1 unidades de almohada hotelera firme. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0069-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0069-msg-03` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0069. Queda a nombre de Valentina López.
- `wa-hogar-0069-msg-04` **Tienda**: El subtotal es $39.000, domicilio $13.000. Total: $52.000. ¿Confirmas?
- `wa-hogar-0069-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0069-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0069-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0069-msg-01 → _Hola! tienen disponible 1 unidades de almohada hotelera firme. ¿Cuánto queda para Barranquilla?_ |
| `barrio` | El Prado | wa-hogar-0069-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0069. Queda a nombre de Valentina López._ |
| `tienda` | Casa Ficticia | wa-hogar-0069-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Valentina López | wa-hogar-0069-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0069. Queda a nombre de Valentina López._ |
| `metodo_pago` | nequi | wa-hogar-0069-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 39000/13000/52000 | wa-hogar-0069-msg-04 → _El subtotal es $39.000, domicilio $13.000. Total: $52.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera firme (cant 1) | wa-hogar-0069-msg-01 → _Hola! tienen disponible 1 unidades de almohada hotelera firme. ¿Cuánto queda para Barranquilla?_ |

## wa-hogar-0070 — Andrés López · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0070-msg-01` **Cliente**: Hola, si juego de sábanas no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0070-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0070-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $11.000?
- `wa-hogar-0070-msg-04` **Tienda**: Sí, el envío estándar cuesta $11.000. ¿Deseas hacer el pedido?
- `wa-hogar-0070-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0070-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0070-msg-03 → _¿Y el domicilio a Suba queda en $11.000?_ |
| `costo_envio_estandar` | 11000 | wa-hogar-0070-msg-04 → _Sí, el envío estándar cuesta $11.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0071 — Camila López · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0071-msg-01` **Cliente**: Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Manizales?
- `wa-hogar-0071-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0071-msg-03` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0071. Queda a nombre de Camila López.
- `wa-hogar-0071-msg-04` **Tienda**: El subtotal es $455.000, domicilio $16.000. Total: $471.000. ¿Confirmas?
- `wa-hogar-0071-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0071-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0071-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0071-msg-01 → _Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220_ |
| `barrio` | Palermo | wa-hogar-0071-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0071. Queda a nombre de Camila López._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0071-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Camila López | wa-hogar-0071-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0071. Queda a nombre de Camila López._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0071-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 455000/16000/471000 | wa-hogar-0071-msg-04 → _El subtotal es $455.000, domicilio $16.000. Total: $471.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas arena x2 (cant 3); almohada hotelera media (cant 1); cortina blackout 140x220 gris (cant 2) | wa-hogar-0071-msg-01 → _Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220_ |

## wa-hogar-0072 — Julián López · `confirmado`

**Conversación original** (7 mensajes):
- `wa-hogar-0072-msg-01` **Cliente**: Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Cartagena?
- `wa-hogar-0072-msg-02` **Cliente**: Ah y si hay color crema mejor 🙏
- `wa-hogar-0072-msg-03` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0072-msg-04` **Cliente**: Sí, en Manga, a nombre de Julián López. Perdón: la cobija térmica la quiero en otra referencia, queen beige.
- `wa-hogar-0072-msg-05` **Tienda**: El subtotal es $89.000, domicilio $14.000. Total: $103.000. ¿Confirmas?
- `wa-hogar-0072-msg-06` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0072-msg-07` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0072-msg-07 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0072-msg-01 → _Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Cartagena?_ |
| `barrio` | Manga | wa-hogar-0072-msg-04 → _Sí, en Manga, a nombre de Julián López. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |
| `tienda` | Textiles de Prueba | wa-hogar-0072-msg-03 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Julián López | wa-hogar-0072-msg-04 → _Sí, en Manga, a nombre de Julián López. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |
| `metodo_pago` | daviplata | wa-hogar-0072-msg-06 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 89000/14000/103000 | wa-hogar-0072-msg-05 → _El subtotal es $89.000, domicilio $14.000. Total: $103.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica queen beige (cant 1) | wa-hogar-0072-msg-01 → _Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Cartagena?_ |
| `referencia_corregida` | sí | wa-hogar-0072-msg-04 → _Sí, en Manga, a nombre de Julián López. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |
| `color_crema_pendiente` | sí (sin confirmación) | wa-hogar-0072-msg-02 → _Ah y si hay color crema mejor 🙏_ |

## wa-hogar-0073 — Marcela López · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0073-msg-01` **Cliente**: Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Medellín?
- `wa-hogar-0073-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0073-msg-03` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0073. Queda a nombre de Marcela López.
- `wa-hogar-0073-msg-04` **Tienda**: El subtotal es $242.000, domicilio $12.000. Total: $254.000. ¿Confirmas?
- `wa-hogar-0073-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0073-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0073-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0073-msg-01 → _Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Medellín?_ |
| `barrio` | Laureles | wa-hogar-0073-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0073. Queda a nombre de Marcela López._ |
| `tienda` | Casa Ficticia | wa-hogar-0073-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Marcela López | wa-hogar-0073-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0073. Queda a nombre de Marcela López._ |
| `metodo_pago` | nequi | wa-hogar-0073-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 242000/12000/254000 | wa-hogar-0073-msg-04 → _El subtotal es $242.000, domicilio $12.000. Total: $254.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo verde oliva (cant 2); juego de toallas blancas x3 (cant 3) | wa-hogar-0073-msg-01 → _Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Medellín?_ |

## wa-hogar-0074 — Nicolás López · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0074-msg-01` **Cliente**: ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Ibagué?
- `wa-hogar-0074-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0074-msg-03` **Cliente**: Sí, barrio La Pola. Punto de entrega de prueba HOG-0074. Queda a nombre de Nicolás López.
- `wa-hogar-0074-msg-04` **Tienda**: El subtotal es $413.000, domicilio $16.000. Total: $429.000. ¿Confirmas?
- `wa-hogar-0074-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0074-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0074-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0074-msg-01 → _ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas_ |
| `barrio` | La Pola | wa-hogar-0074-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0074. Queda a nombre de Nicolás López._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0074-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Nicolás López | wa-hogar-0074-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0074. Queda a nombre de Nicolás López._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0074-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 413000/16000/429000 | wa-hogar-0074-msg-04 → _El subtotal es $413.000, domicilio $16.000. Total: $429.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón sencillo (cant 3); cobija térmica queen beige (cant 1); juego de sábanas doble algodón (cant 2) | wa-hogar-0074-msg-01 → _ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas_ |

## wa-hogar-0075 — Paola López · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0075-msg-01` **Cliente**: Hola, si cortina blackout no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0075-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0075-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0075-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0075-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0075-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0076 — Sebastián López · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0076-msg-01` **Cliente**: Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Cali?
- `wa-hogar-0076-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0076-msg-03` **Cliente**: Sí, barrio San Fernando. Punto de entrega de prueba HOG-0076. Queda a nombre de Sebastián López.
- `wa-hogar-0076-msg-04` **Tienda**: El subtotal es $232.000, domicilio $13.000. Total: $245.000. ¿Confirmas?
- `wa-hogar-0076-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0076-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0076-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0076-msg-01 → _Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Cali?_ |
| `barrio` | San Fernando | wa-hogar-0076-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0076. Queda a nombre de Sebastián López._ |
| `tienda` | Textiles de Prueba | wa-hogar-0076-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Sebastián López | wa-hogar-0076-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0076. Queda a nombre de Sebastián López._ |
| `metodo_pago` | daviplata | wa-hogar-0076-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 232000/13000/245000 | wa-hogar-0076-msg-04 → _El subtotal es $232.000, domicilio $13.000. Total: $245.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño gris (cant 2); protector de colchón doble (cant 3) | wa-hogar-0076-msg-01 → _Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Cali?_ |

## wa-hogar-0077 — Tatiana López · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0077-msg-01` **Cliente**: Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativo terracota. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0077-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0077-msg-03` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0077. Queda a nombre de Tatiana López.
- `wa-hogar-0077-msg-04` **Tienda**: El subtotal es $288.000, domicilio $18.000. Total: $306.000. ¿Confirmas?
- `wa-hogar-0077-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0077-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0077-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0077-msg-01 → _Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativ_ |
| `barrio` | Bavaria | wa-hogar-0077-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0077. Queda a nombre de Tatiana López._ |
| `tienda` | Casa Ficticia | wa-hogar-0077-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Tatiana López | wa-hogar-0077-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0077. Queda a nombre de Tatiana López._ |
| `metodo_pago` | nequi | wa-hogar-0077-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 288000/18000/306000 | wa-hogar-0077-msg-04 → _El subtotal es $288.000, domicilio $18.000. Total: $306.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera suave (cant 3); cortina blackout 140x220 beige (cant 1); cojín decorativo terracota (cant 2) | wa-hogar-0077-msg-01 → _Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativ_ |

## wa-hogar-0078 — Daniel López · `pendiente`

**Conversación original** (6 mensajes):
- `wa-hogar-0078-msg-01` **Cliente**: Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Pereira?
- `wa-hogar-0078-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0078-msg-03` **Cliente**: Sí, barrio Álamos. Punto de entrega de prueba HOG-0078. Queda a nombre de Daniel López.
- `wa-hogar-0078-msg-04` **Tienda**: El subtotal es $78.000, domicilio $12.000. Total: $90.000. ¿Confirmas?
- `wa-hogar-0078-msg-05` **Cliente**: Déjamelo pendiente mientras confirmo la dirección, porfa.
- `wa-hogar-0078-msg-06` **Tienda**: Claro, queda pendiente y no se despacha todavía.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | pendiente | wa-hogar-0078-msg-06 → _Claro, queda pendiente y no se despacha todavía._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0078-msg-01 → _Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Pereira?_ |
| `barrio` | Álamos | wa-hogar-0078-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0078. Queda a nombre de Daniel López._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0078-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Daniel López | wa-hogar-0078-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0078. Queda a nombre de Daniel López._ |
| `subtotal/domicilio/total` | 78000/12000/90000 | wa-hogar-0078-msg-04 → _El subtotal es $78.000, domicilio $12.000. Total: $90.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas doble algodón (cant 1) | wa-hogar-0078-msg-01 → _Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Pereira?_ |

## wa-hogar-0079 — Gabriela López · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0079-msg-01` **Cliente**: Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0079-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0079-msg-03` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0079. Queda a nombre de Gabriela López.
- `wa-hogar-0079-msg-04` **Tienda**: El subtotal es $241.000, domicilio $15.000. Total: $256.000. ¿Confirmas?
- `wa-hogar-0079-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0079-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0079-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0079-msg-01 → _Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Barranquilla?_ |
| `barrio` | El Prado | wa-hogar-0079-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0079. Queda a nombre de Gabriela López._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0079-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Gabriela López | wa-hogar-0079-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0079. Queda a nombre de Gabriela López._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0079-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 241000/15000/256000 | wa-hogar-0079-msg-04 → _El subtotal es $241.000, domicilio $15.000. Total: $256.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas gris x3 (cant 2); almohada hotelera firme (cant 3) | wa-hogar-0079-msg-01 → _Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Barranquilla?_ |

## wa-hogar-0080 — Ricardo López · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0080-msg-01` **Cliente**: Hola, si cobija térmica no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0080-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0080-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $13.000?
- `wa-hogar-0080-msg-04` **Tienda**: Sí, el envío estándar cuesta $13.000. ¿Deseas hacer el pedido?
- `wa-hogar-0080-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0080-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0080-msg-03 → _¿Y el domicilio a Suba queda en $13.000?_ |
| `costo_envio_estandar` | 13000 | wa-hogar-0080-msg-04 → _Sí, el envío estándar cuesta $13.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0081 — Ana Hernández · `confirmado`

**Conversación original** (7 mensajes):
- `wa-hogar-0081-msg-01` **Cliente**: Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Manizales?
- `wa-hogar-0081-msg-02` **Cliente**: Ah y si hay color crema mejor 🙏
- `wa-hogar-0081-msg-03` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0081-msg-04` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0081. Queda a nombre de Ana Hernández.
- `wa-hogar-0081-msg-05` **Tienda**: El subtotal es $28.000, domicilio $12.000. Total: $40.000. ¿Confirmas?
- `wa-hogar-0081-msg-06` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0081-msg-07` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0081-msg-07 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0081-msg-01 → _Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Manizales?_ |
| `barrio` | Palermo | wa-hogar-0081-msg-04 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0081. Queda a nombre de Ana Hernández._ |
| `tienda` | Casa Ficticia | wa-hogar-0081-msg-03 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Ana Hernández | wa-hogar-0081-msg-04 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0081. Queda a nombre de Ana Hernández._ |
| `metodo_pago` | nequi | wa-hogar-0081-msg-06 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 28000/12000/40000 | wa-hogar-0081-msg-05 → _El subtotal es $28.000, domicilio $12.000. Total: $40.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo terracota (cant 1) | wa-hogar-0081-msg-01 → _Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Manizales?_ |
| `color_crema_pendiente` | sí (sin confirmación) | wa-hogar-0081-msg-02 → _Ah y si hay color crema mejor 🙏_ |

## wa-hogar-0082 — Carlos Hernández · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0082-msg-01` **Cliente**: ola, quiero comprar 2 unidades de protector de colchón queen y 3 unidades de cobija térmica doble gris. ¿Cuánto queda para Cartagena?
- `wa-hogar-0082-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0082-msg-03` **Cliente**: Sí, barrio Manga. Punto de entrega de prueba HOG-0082. Queda a nombre de Carlos Hernández.
- `wa-hogar-0082-msg-04` **Tienda**: El subtotal es $379.000, domicilio $16.000. Total: $395.000. ¿Confirmas?
- `wa-hogar-0082-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0082-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0082-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0082-msg-01 → _ola, quiero comprar 2 unidades de protector de colchón queen y 3 unidades de cobija térmica doble gris. ¿Cuánto queda para Cartagena?_ |
| `barrio` | Manga | wa-hogar-0082-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0082. Queda a nombre de Carlos Hernández._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0082-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Carlos Hernández | wa-hogar-0082-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0082. Queda a nombre de Carlos Hernández._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0082-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 379000/16000/395000 | wa-hogar-0082-msg-04 → _El subtotal es $379.000, domicilio $16.000. Total: $395.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón queen (cant 2); cobija térmica doble gris (cant 3) | wa-hogar-0082-msg-01 → _ola, quiero comprar 2 unidades de protector de colchón queen y 3 unidades de cobija térmica doble gris. ¿Cuánto queda para Cartagena?_ |

## wa-hogar-0083 — Diana Hernández · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0083-msg-01` **Cliente**: Buenas tardes, estoy buscando 3 unidades de cortina blackout 200x220 azul y 1 unidades de cojín decorativo verde oliva y 2 unidades de juego de toallas blancas x3. ¿Cuánto queda para Medellín?
- `wa-hogar-0083-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0083-msg-03` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0083. Queda a nombre de Diana Hernández.
- `wa-hogar-0083-msg-04` **Tienda**: El subtotal es $497.000, domicilio $14.000. Total: $511.000. ¿Confirmas?
- `wa-hogar-0083-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0083-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0083-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0083-msg-01 → _Buenas tardes, estoy buscando 3 unidades de cortina blackout 200x220 azul y 1 unidades de cojín decorativo verde oliva y 2 unidades de juego_ |
| `barrio` | Laureles | wa-hogar-0083-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0083. Queda a nombre de Diana Hernández._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0083-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Diana Hernández | wa-hogar-0083-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0083. Queda a nombre de Diana Hernández._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0083-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 497000/14000/511000 | wa-hogar-0083-msg-04 → _El subtotal es $497.000, domicilio $14.000. Total: $511.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 200x220 azul (cant 3); cojín decorativo verde oliva (cant 1); juego de toallas blancas x3 (cant 2) | wa-hogar-0083-msg-01 → _Buenas tardes, estoy buscando 3 unidades de cortina blackout 200x220 azul y 1 unidades de cojín decorativo verde oliva y 2 unidades de juego_ |

## wa-hogar-0084 — Felipe Hernández · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0084-msg-01` **Cliente**: Buen día, quisiera 1 unidades de tapete de baño verde. ¿Cuánto queda para Ibagué?
- `wa-hogar-0084-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0084-msg-03` **Cliente**: Sí, barrio La Pola. Punto de entrega de prueba HOG-0084. Queda a nombre de Felipe Hernández.
- `wa-hogar-0084-msg-04` **Tienda**: El subtotal es $32.000, domicilio $12.000. Total: $44.000. ¿Confirmas?
- `wa-hogar-0084-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0084-msg-06` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0084-msg-06 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0084-msg-01 → _Buen día, quisiera 1 unidades de tapete de baño verde. ¿Cuánto queda para Ibagué?_ |
| `barrio` | La Pola | wa-hogar-0084-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0084. Queda a nombre de Felipe Hernández._ |
| `tienda` | Textiles de Prueba | wa-hogar-0084-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Felipe Hernández | wa-hogar-0084-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0084. Queda a nombre de Felipe Hernández._ |
| `metodo_pago` | daviplata | wa-hogar-0084-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 32000/12000/44000 | wa-hogar-0084-msg-04 → _El subtotal es $32.000, domicilio $12.000. Total: $44.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño verde (cant 1) | wa-hogar-0084-msg-01 → _Buen día, quisiera 1 unidades de tapete de baño verde. ¿Cuánto queda para Ibagué?_ |

## wa-hogar-0085 — Laura Hernández · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0085-msg-01` **Cliente**: Hola, si almohada hotelera no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0085-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0085-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0085-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0085-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0085-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0086 — Mateo Hernández · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0086-msg-01` **Cliente**: Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón doble. ¿Cuánto queda para Cali?
- `wa-hogar-0086-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0086-msg-03` **Cliente**: Sí, barrio San Fernando. Punto de entrega de prueba HOG-0086. Queda a nombre de Mateo Hernández.
- `wa-hogar-0086-msg-04` **Tienda**: El subtotal es $378.000, domicilio $15.000. Total: $393.000. ¿Confirmas?
- `wa-hogar-0086-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0086-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0086-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0086-msg-01 → _Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón_ |
| `barrio` | San Fernando | wa-hogar-0086-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0086. Queda a nombre de Mateo Hernández._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0086-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Mateo Hernández | wa-hogar-0086-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0086. Queda a nombre de Mateo Hernández._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0086-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 378000/15000/393000 | wa-hogar-0086-msg-04 → _El subtotal es $378.000, domicilio $15.000. Total: $393.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas sencillas estampadas (cant 3); tapete de baño gris (cant 1); protector de colchón doble (cant 2) | wa-hogar-0086-msg-01 → _Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón_ |

## wa-hogar-0087 — Natalia Hernández · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0087-msg-01` **Cliente**: Buenas, me regalas 1 unidades de juego de toallas blancas x3. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0087-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0087-msg-03` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0087. Queda a nombre de Natalia Hernández.
- `wa-hogar-0087-msg-04` **Tienda**: El subtotal es $62.000, domicilio $14.000. Total: $76.000. ¿Confirmas?
- `wa-hogar-0087-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0087-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0087-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0087-msg-01 → _Buenas, me regalas 1 unidades de juego de toallas blancas x3. ¿Cuánto queda para Santa Marta?_ |
| `barrio` | Bavaria | wa-hogar-0087-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0087. Queda a nombre de Natalia Hernández._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0087-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Natalia Hernández | wa-hogar-0087-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0087. Queda a nombre de Natalia Hernández._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0087-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 62000/14000/76000 | wa-hogar-0087-msg-04 → _El subtotal es $62.000, domicilio $14.000. Total: $76.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas blancas x3 (cant 1) | wa-hogar-0087-msg-01 → _Buenas, me regalas 1 unidades de juego de toallas blancas x3. ¿Cuánto queda para Santa Marta?_ |

## wa-hogar-0088 — Santiago Hernández · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0088-msg-01` **Cliente**: Hola, quiero pedir 2 unidades de cobija térmica queen beige y 3 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Pereira?
- `wa-hogar-0088-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0088-msg-03` **Cliente**: Sí, en Álamos, a nombre de Santiago Hernández. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul.
- `wa-hogar-0088-msg-04` **Tienda**: El subtotal es $412.000, domicilio $14.000. Total: $426.000. ¿Confirmas?
- `wa-hogar-0088-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0088-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0088-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0088-msg-01 → _Hola, quiero pedir 2 unidades de cobija térmica queen beige y 3 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Pereira?_ |
| `barrio` | Álamos | wa-hogar-0088-msg-03 → _Sí, en Álamos, a nombre de Santiago Hernández. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul._ |
| `tienda` | Textiles de Prueba | wa-hogar-0088-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Santiago Hernández | wa-hogar-0088-msg-03 → _Sí, en Álamos, a nombre de Santiago Hernández. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul._ |
| `metodo_pago` | daviplata | wa-hogar-0088-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 412000/14000/426000 | wa-hogar-0088-msg-04 → _El subtotal es $412.000, domicilio $14.000. Total: $426.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica sencilla azul (cant 2); juego de sábanas doble algodón (cant 3) | wa-hogar-0088-msg-01 → _Hola, quiero pedir 2 unidades de cobija térmica queen beige y 3 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Pereira?_ |
| `referencia_corregida` | sí | wa-hogar-0088-msg-03 → _Sí, en Álamos, a nombre de Santiago Hernández. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul._ |

## wa-hogar-0089 — Valentina Hernández · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0089-msg-01` **Cliente**: Hola 😊 necesito 3 unidades de cojín decorativo crema y 1 unidades de juego de toallas gris x3 y 2 unidades de almohada hotelera firme. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0089-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0089-msg-03` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0089. Queda a nombre de Valentina Hernández.
- `wa-hogar-0089-msg-04` **Tienda**: El subtotal es $224.000, domicilio $17.000. Total: $241.000. ¿Confirmas?
- `wa-hogar-0089-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0089-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0089-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0089-msg-01 → _Hola 😊 necesito 3 unidades de cojín decorativo crema y 1 unidades de juego de toallas gris x3 y 2 unidades de almohada hotelera firme. ¿Cuán_ |
| `barrio` | El Prado | wa-hogar-0089-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0089. Queda a nombre de Valentina Hernández._ |
| `tienda` | Casa Ficticia | wa-hogar-0089-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Valentina Hernández | wa-hogar-0089-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0089. Queda a nombre de Valentina Hernández._ |
| `metodo_pago` | nequi | wa-hogar-0089-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 224000/17000/241000 | wa-hogar-0089-msg-04 → _El subtotal es $224.000, domicilio $17.000. Total: $241.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo crema (cant 3); juego de toallas gris x3 (cant 1); almohada hotelera firme (cant 2) | wa-hogar-0089-msg-01 → _Hola 😊 necesito 3 unidades de cojín decorativo crema y 1 unidades de juego de toallas gris x3 y 2 unidades de almohada hotelera firme. ¿Cuán_ |

## wa-hogar-0090 — Andrés Hernández · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0090-msg-01` **Cliente**: Hola, si protector de colchón no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0090-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0090-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $9.000?
- `wa-hogar-0090-msg-04` **Tienda**: Sí, el envío estándar cuesta $9.000. ¿Deseas hacer el pedido?
- `wa-hogar-0090-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0090-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0090-msg-03 → _¿Y el domicilio a Suba queda en $9.000?_ |
| `costo_envio_estandar` | 9000 | wa-hogar-0090-msg-04 → _Sí, el envío estándar cuesta $9.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0091 — Camila Hernández · `pendiente`

**Conversación original** (6 mensajes):
- `wa-hogar-0091-msg-01` **Cliente**: Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Manizales?
- `wa-hogar-0091-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0091-msg-03` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0091. Queda a nombre de Camila Hernández.
- `wa-hogar-0091-msg-04` **Tienda**: El subtotal es $314.000, domicilio $14.000. Total: $328.000. ¿Confirmas?
- `wa-hogar-0091-msg-05` **Cliente**: Déjamelo pendiente mientras confirmo la dirección, porfa.
- `wa-hogar-0091-msg-06` **Tienda**: Claro, queda pendiente y no se despacha todavía.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | pendiente | wa-hogar-0091-msg-06 → _Claro, queda pendiente y no se despacha todavía._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0091-msg-01 → _Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Ma_ |
| `barrio` | Palermo | wa-hogar-0091-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0091. Queda a nombre de Camila Hernández._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0091-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Camila Hernández | wa-hogar-0091-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0091. Queda a nombre de Camila Hernández._ |
| `subtotal/domicilio/total` | 314000/14000/328000 | wa-hogar-0091-msg-04 → _El subtotal es $314.000, domicilio $14.000. Total: $328.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 140x220 beige (cant 2); cojín decorativo terracota (cant 3) | wa-hogar-0091-msg-01 → _Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Ma_ |

## wa-hogar-0092 — Julián Hernández · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0092-msg-01` **Cliente**: Buen día, quisiera 3 unidades de tapete de baño beige y 1 unidades de protector de colchón queen y 2 unidades de cobija térmica doble gris. ¿Cuánto queda para Cartagena?
- `wa-hogar-0092-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0092-msg-03` **Cliente**: Sí, barrio Manga. Punto de entrega de prueba HOG-0092. Queda a nombre de Julián Hernández.
- `wa-hogar-0092-msg-04` **Tienda**: El subtotal es $330.000, domicilio $18.000. Total: $348.000. ¿Confirmas?
- `wa-hogar-0092-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0092-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0092-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0092-msg-01 → _Buen día, quisiera 3 unidades de tapete de baño beige y 1 unidades de protector de colchón queen y 2 unidades de cobija térmica doble gris._ |
| `barrio` | Manga | wa-hogar-0092-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0092. Queda a nombre de Julián Hernández._ |
| `tienda` | Textiles de Prueba | wa-hogar-0092-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Julián Hernández | wa-hogar-0092-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0092. Queda a nombre de Julián Hernández._ |
| `metodo_pago` | daviplata | wa-hogar-0092-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 330000/18000/348000 | wa-hogar-0092-msg-04 → _El subtotal es $330.000, domicilio $18.000. Total: $348.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño beige (cant 3); protector de colchón queen (cant 1); cobija térmica doble gris (cant 2) | wa-hogar-0092-msg-01 → _Buen día, quisiera 3 unidades de tapete de baño beige y 1 unidades de protector de colchón queen y 2 unidades de cobija térmica doble gris._ |

## wa-hogar-0093 — Marcela Hernández · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0093-msg-01` **Cliente**: Hola! tienen disponible 1 unidades de almohada hotelera firme. ¿Cuánto queda para Medellín?
- `wa-hogar-0093-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0093-msg-03` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0093. Queda a nombre de Marcela Hernández.
- `wa-hogar-0093-msg-04` **Tienda**: El subtotal es $39.000, domicilio $10.000. Total: $49.000. ¿Confirmas?
- `wa-hogar-0093-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0093-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0093-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0093-msg-01 → _Hola! tienen disponible 1 unidades de almohada hotelera firme. ¿Cuánto queda para Medellín?_ |
| `barrio` | Laureles | wa-hogar-0093-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0093. Queda a nombre de Marcela Hernández._ |
| `tienda` | Casa Ficticia | wa-hogar-0093-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Marcela Hernández | wa-hogar-0093-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0093. Queda a nombre de Marcela Hernández._ |
| `metodo_pago` | nequi | wa-hogar-0093-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 39000/10000/49000 | wa-hogar-0093-msg-04 → _El subtotal es $39.000, domicilio $10.000. Total: $49.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera firme (cant 1) | wa-hogar-0093-msg-01 → _Hola! tienen disponible 1 unidades de almohada hotelera firme. ¿Cuánto queda para Medellín?_ |

## wa-hogar-0094 — Nicolás Hernández · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0094-msg-01` **Cliente**: Holaa, necesito 2 unidades de juego de sábanas queen blancas y 3 unidades de tapete de baño verde. ¿Cuánto queda para Ibagué?
- `wa-hogar-0094-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0094-msg-03` **Cliente**: Sí, barrio La Pola. Punto de entrega de prueba HOG-0094. Queda a nombre de Nicolás Hernández.
- `wa-hogar-0094-msg-04` **Tienda**: El subtotal es $252.000, domicilio $14.000. Total: $266.000. ¿Confirmas?
- `wa-hogar-0094-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0094-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0094-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0094-msg-01 → _Holaa, necesito 2 unidades de juego de sábanas queen blancas y 3 unidades de tapete de baño verde. ¿Cuánto queda para Ibagué?_ |
| `barrio` | La Pola | wa-hogar-0094-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0094. Queda a nombre de Nicolás Hernández._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0094-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Nicolás Hernández | wa-hogar-0094-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0094. Queda a nombre de Nicolás Hernández._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0094-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 252000/14000/266000 | wa-hogar-0094-msg-04 → _El subtotal es $252.000, domicilio $14.000. Total: $266.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas queen blancas (cant 2); tapete de baño verde (cant 3) | wa-hogar-0094-msg-01 → _Holaa, necesito 2 unidades de juego de sábanas queen blancas y 3 unidades de tapete de baño verde. ¿Cuánto queda para Ibagué?_ |

## wa-hogar-0095 — Paola Hernández · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0095-msg-01` **Cliente**: Hola, si juego de toallas no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0095-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0095-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0095-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0095-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0095-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0096 — Sebastián Hernández · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0096-msg-01` **Cliente**: Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Cali?
- `wa-hogar-0096-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0096-msg-03` **Cliente**: Sí, en San Fernando, a nombre de Sebastián Hernández. Perdón: la cobija térmica la quiero en otra referencia, queen beige.
- `wa-hogar-0096-msg-04` **Tienda**: El subtotal es $89.000, domicilio $11.000. Total: $100.000. ¿Confirmas?
- `wa-hogar-0096-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0096-msg-06` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0096-msg-06 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0096-msg-01 → _Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Cali?_ |
| `barrio` | San Fernando | wa-hogar-0096-msg-03 → _Sí, en San Fernando, a nombre de Sebastián Hernández. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |
| `tienda` | Textiles de Prueba | wa-hogar-0096-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Sebastián Hernández | wa-hogar-0096-msg-03 → _Sí, en San Fernando, a nombre de Sebastián Hernández. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |
| `metodo_pago` | daviplata | wa-hogar-0096-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 89000/11000/100000 | wa-hogar-0096-msg-04 → _El subtotal es $89.000, domicilio $11.000. Total: $100.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica queen beige (cant 1) | wa-hogar-0096-msg-01 → _Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Cali?_ |
| `referencia_corregida` | sí | wa-hogar-0096-msg-03 → _Sí, en San Fernando, a nombre de Sebastián Hernández. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |

## wa-hogar-0097 — Tatiana Hernández · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0097-msg-01` **Cliente**: Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0097-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0097-msg-03` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0097. Queda a nombre de Tatiana Hernández.
- `wa-hogar-0097-msg-04` **Tienda**: El subtotal es $242.000, domicilio $16.000. Total: $258.000. ¿Confirmas?
- `wa-hogar-0097-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0097-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0097-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0097-msg-01 → _Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Santa Marta?_ |
| `barrio` | Bavaria | wa-hogar-0097-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0097. Queda a nombre de Tatiana Hernández._ |
| `tienda` | Casa Ficticia | wa-hogar-0097-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Tatiana Hernández | wa-hogar-0097-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0097. Queda a nombre de Tatiana Hernández._ |
| `metodo_pago` | nequi | wa-hogar-0097-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 242000/16000/258000 | wa-hogar-0097-msg-04 → _El subtotal es $242.000, domicilio $16.000. Total: $258.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo verde oliva (cant 2); juego de toallas blancas x3 (cant 3) | wa-hogar-0097-msg-01 → _Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Santa Marta?_ |

## wa-hogar-0098 — Daniel Hernández · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0098-msg-01` **Cliente**: ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Pereira?
- `wa-hogar-0098-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0098-msg-03` **Cliente**: Sí, barrio Álamos. Punto de entrega de prueba HOG-0098. Queda a nombre de Daniel Hernández.
- `wa-hogar-0098-msg-04` **Tienda**: El subtotal es $413.000, domicilio $16.000. Total: $429.000. ¿Confirmas?
- `wa-hogar-0098-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0098-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0098-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0098-msg-01 → _ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas_ |
| `barrio` | Álamos | wa-hogar-0098-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0098. Queda a nombre de Daniel Hernández._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0098-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Daniel Hernández | wa-hogar-0098-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0098. Queda a nombre de Daniel Hernández._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0098-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 413000/16000/429000 | wa-hogar-0098-msg-04 → _El subtotal es $413.000, domicilio $16.000. Total: $429.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón sencillo (cant 3); cobija térmica queen beige (cant 1); juego de sábanas doble algodón (cant 2) | wa-hogar-0098-msg-01 → _ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas_ |

## wa-hogar-0099 — Gabriela Hernández · `confirmado`

**Conversación original** (7 mensajes):
- `wa-hogar-0099-msg-01` **Cliente**: Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0099-msg-02` **Cliente**: Ah y si hay color crema mejor 🙏
- `wa-hogar-0099-msg-03` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0099-msg-04` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0099. Queda a nombre de Gabriela Hernández.
- `wa-hogar-0099-msg-05` **Tienda**: El subtotal es $115.000, domicilio $13.000. Total: $128.000. ¿Confirmas?
- `wa-hogar-0099-msg-06` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0099-msg-07` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0099-msg-07 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0099-msg-01 → _Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Barranquilla?_ |
| `barrio` | El Prado | wa-hogar-0099-msg-04 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0099. Queda a nombre de Gabriela Hernández._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0099-msg-03 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Gabriela Hernández | wa-hogar-0099-msg-04 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0099. Queda a nombre de Gabriela Hernández._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0099-msg-06 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 115000/13000/128000 | wa-hogar-0099-msg-05 → _El subtotal es $115.000, domicilio $13.000. Total: $128.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 140x220 gris (cant 1) | wa-hogar-0099-msg-01 → _Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Barranquilla?_ |
| `color_crema_pendiente` | sí (sin confirmación) | wa-hogar-0099-msg-02 → _Ah y si hay color crema mejor 🙏_ |

## wa-hogar-0100 — Ricardo Hernández · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0100-msg-01` **Cliente**: Hola, si tapete de baño no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0100-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0100-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $11.000?
- `wa-hogar-0100-msg-04` **Tienda**: Sí, el envío estándar cuesta $11.000. ¿Deseas hacer el pedido?
- `wa-hogar-0100-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0100-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0100-msg-03 → _¿Y el domicilio a Suba queda en $11.000?_ |
| `costo_envio_estandar` | 11000 | wa-hogar-0100-msg-04 → _Sí, el envío estándar cuesta $11.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0101 — Ana Ramírez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0101-msg-01` **Cliente**: Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativo terracota. ¿Cuánto queda para Manizales?
- `wa-hogar-0101-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0101-msg-03` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0101. Queda a nombre de Ana Ramírez.
- `wa-hogar-0101-msg-04` **Tienda**: El subtotal es $288.000, domicilio $16.000. Total: $304.000. ¿Confirmas?
- `wa-hogar-0101-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0101-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0101-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0101-msg-01 → _Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativ_ |
| `barrio` | Palermo | wa-hogar-0101-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0101. Queda a nombre de Ana Ramírez._ |
| `tienda` | Casa Ficticia | wa-hogar-0101-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Ana Ramírez | wa-hogar-0101-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0101. Queda a nombre de Ana Ramírez._ |
| `metodo_pago` | nequi | wa-hogar-0101-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 288000/16000/304000 | wa-hogar-0101-msg-04 → _El subtotal es $288.000, domicilio $16.000. Total: $304.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera suave (cant 3); cortina blackout 140x220 beige (cant 1); cojín decorativo terracota (cant 2) | wa-hogar-0101-msg-01 → _Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativ_ |

## wa-hogar-0102 — Carlos Ramírez · `cancelado`

**Conversación original** (6 mensajes):
- `wa-hogar-0102-msg-01` **Cliente**: Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cartagena?
- `wa-hogar-0102-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0102-msg-03` **Cliente**: Sí, barrio Manga. Punto de entrega de prueba HOG-0102. Queda a nombre de Carlos Ramírez.
- `wa-hogar-0102-msg-04` **Tienda**: El subtotal es $78.000, domicilio $14.000. Total: $92.000. ¿Confirmas?
- `wa-hogar-0102-msg-05` **Cliente**: No, mejor cancélalo por ahora. Gracias.
- `wa-hogar-0102-msg-06` **Tienda**: Entendido, no se genera el pedido.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | cancelado | wa-hogar-0102-msg-06 → _Entendido, no se genera el pedido._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0102-msg-01 → _Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cartagena?_ |
| `barrio` | Manga | wa-hogar-0102-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0102. Queda a nombre de Carlos Ramírez._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0102-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Carlos Ramírez | wa-hogar-0102-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0102. Queda a nombre de Carlos Ramírez._ |
| `subtotal/domicilio/total` | 78000/14000/92000 | wa-hogar-0102-msg-04 → _El subtotal es $78.000, domicilio $14.000. Total: $92.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas doble algodón (cant 1) | wa-hogar-0102-msg-01 → _Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cartagena?_ |

## wa-hogar-0103 — Diana Ramírez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0103-msg-01` **Cliente**: Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Medellín?
- `wa-hogar-0103-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0103-msg-03` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0103. Queda a nombre de Diana Ramírez.
- `wa-hogar-0103-msg-04` **Tienda**: El subtotal es $241.000, domicilio $12.000. Total: $253.000. ¿Confirmas?
- `wa-hogar-0103-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0103-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0103-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0103-msg-01 → _Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Medellín?_ |
| `barrio` | Laureles | wa-hogar-0103-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0103. Queda a nombre de Diana Ramírez._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0103-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Diana Ramírez | wa-hogar-0103-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0103. Queda a nombre de Diana Ramírez._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0103-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 241000/12000/253000 | wa-hogar-0103-msg-04 → _El subtotal es $241.000, domicilio $12.000. Total: $253.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas gris x3 (cant 2); almohada hotelera firme (cant 3) | wa-hogar-0103-msg-01 → _Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Medellín?_ |

## wa-hogar-0104 — Felipe Ramírez · `pendiente`

**Conversación original** (6 mensajes):
- `wa-hogar-0104-msg-01` **Cliente**: Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño verde. ¿Cuánto queda para Ibagué?
- `wa-hogar-0104-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0104-msg-03` **Cliente**: Sí, en La Pola, a nombre de Felipe Ramírez. Perdón: la cobija térmica la quiero en otra referencia, doble gris.
- `wa-hogar-0104-msg-04` **Tienda**: El subtotal es $409.000, domicilio $16.000. Total: $425.000. ¿Confirmas?
- `wa-hogar-0104-msg-05` **Cliente**: Déjamelo pendiente mientras confirmo la dirección, porfa.
- `wa-hogar-0104-msg-06` **Tienda**: Claro, queda pendiente y no se despacha todavía.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | pendiente | wa-hogar-0104-msg-06 → _Claro, queda pendiente y no se despacha todavía._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0104-msg-01 → _Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño_ |
| `barrio` | La Pola | wa-hogar-0104-msg-03 → _Sí, en La Pola, a nombre de Felipe Ramírez. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |
| `tienda` | Textiles de Prueba | wa-hogar-0104-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Felipe Ramírez | wa-hogar-0104-msg-03 → _Sí, en La Pola, a nombre de Felipe Ramírez. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |
| `subtotal/domicilio/total` | 409000/16000/425000 | wa-hogar-0104-msg-04 → _El subtotal es $409.000, domicilio $16.000. Total: $425.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica doble gris (cant 3); juego de sábanas queen blancas (cant 1); tapete de baño verde (cant 2) | wa-hogar-0104-msg-01 → _Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño_ |
| `referencia_corregida` | sí | wa-hogar-0104-msg-03 → _Sí, en La Pola, a nombre de Felipe Ramírez. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |

## wa-hogar-0105 — Laura Ramírez · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0105-msg-01` **Cliente**: Hola, si cojín decorativo no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0105-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0105-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0105-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0105-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0105-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0106 — Mateo Ramírez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0106-msg-01` **Cliente**: ola, quiero comprar 2 unidades de protector de colchón queen y 3 unidades de cobija térmica doble gris. ¿Cuánto queda para Cali?
- `wa-hogar-0106-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0106-msg-03` **Cliente**: Sí, barrio San Fernando. Punto de entrega de prueba HOG-0106. Queda a nombre de Mateo Ramírez.
- `wa-hogar-0106-msg-04` **Tienda**: El subtotal es $379.000, domicilio $13.000. Total: $392.000. ¿Confirmas?
- `wa-hogar-0106-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0106-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0106-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0106-msg-01 → _ola, quiero comprar 2 unidades de protector de colchón queen y 3 unidades de cobija térmica doble gris. ¿Cuánto queda para Cali?_ |
| `barrio` | San Fernando | wa-hogar-0106-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0106. Queda a nombre de Mateo Ramírez._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0106-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Mateo Ramírez | wa-hogar-0106-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0106. Queda a nombre de Mateo Ramírez._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0106-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 379000/13000/392000 | wa-hogar-0106-msg-04 → _El subtotal es $379.000, domicilio $13.000. Total: $392.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón queen (cant 2); cobija térmica doble gris (cant 3) | wa-hogar-0106-msg-01 → _ola, quiero comprar 2 unidades de protector de colchón queen y 3 unidades de cobija térmica doble gris. ¿Cuánto queda para Cali?_ |

## wa-hogar-0107 — Natalia Ramírez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0107-msg-01` **Cliente**: Buenas tardes, estoy buscando 3 unidades de cortina blackout 200x220 azul y 1 unidades de cojín decorativo verde oliva y 2 unidades de juego de toallas blancas x3. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0107-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0107-msg-03` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0107. Queda a nombre de Natalia Ramírez.
- `wa-hogar-0107-msg-04` **Tienda**: El subtotal es $497.000, domicilio $18.000. Total: $515.000. ¿Confirmas?
- `wa-hogar-0107-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0107-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0107-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0107-msg-01 → _Buenas tardes, estoy buscando 3 unidades de cortina blackout 200x220 azul y 1 unidades de cojín decorativo verde oliva y 2 unidades de juego_ |
| `barrio` | Bavaria | wa-hogar-0107-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0107. Queda a nombre de Natalia Ramírez._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0107-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Natalia Ramírez | wa-hogar-0107-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0107. Queda a nombre de Natalia Ramírez._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0107-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 497000/18000/515000 | wa-hogar-0107-msg-04 → _El subtotal es $497.000, domicilio $18.000. Total: $515.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 200x220 azul (cant 3); cojín decorativo verde oliva (cant 1); juego de toallas blancas x3 (cant 2) | wa-hogar-0107-msg-01 → _Buenas tardes, estoy buscando 3 unidades de cortina blackout 200x220 azul y 1 unidades de cojín decorativo verde oliva y 2 unidades de juego_ |

## wa-hogar-0108 — Santiago Ramírez · `confirmado`

**Conversación original** (7 mensajes):
- `wa-hogar-0108-msg-01` **Cliente**: Buen día, quisiera 1 unidades de tapete de baño verde. ¿Cuánto queda para Pereira?
- `wa-hogar-0108-msg-02` **Cliente**: Ah y si hay color crema mejor 🙏
- `wa-hogar-0108-msg-03` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0108-msg-04` **Cliente**: Sí, barrio Álamos. Punto de entrega de prueba HOG-0108. Queda a nombre de Santiago Ramírez.
- `wa-hogar-0108-msg-05` **Tienda**: El subtotal es $32.000, domicilio $12.000. Total: $44.000. ¿Confirmas?
- `wa-hogar-0108-msg-06` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0108-msg-07` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0108-msg-07 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0108-msg-01 → _Buen día, quisiera 1 unidades de tapete de baño verde. ¿Cuánto queda para Pereira?_ |
| `barrio` | Álamos | wa-hogar-0108-msg-04 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0108. Queda a nombre de Santiago Ramírez._ |
| `tienda` | Textiles de Prueba | wa-hogar-0108-msg-03 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Santiago Ramírez | wa-hogar-0108-msg-04 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0108. Queda a nombre de Santiago Ramírez._ |
| `metodo_pago` | daviplata | wa-hogar-0108-msg-06 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 32000/12000/44000 | wa-hogar-0108-msg-05 → _El subtotal es $32.000, domicilio $12.000. Total: $44.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño verde (cant 1) | wa-hogar-0108-msg-01 → _Buen día, quisiera 1 unidades de tapete de baño verde. ¿Cuánto queda para Pereira?_ |
| `color_crema_pendiente` | sí (sin confirmación) | wa-hogar-0108-msg-02 → _Ah y si hay color crema mejor 🙏_ |

## wa-hogar-0109 — Valentina Ramírez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0109-msg-01` **Cliente**: Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0109-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0109-msg-03` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0109. Queda a nombre de Valentina Ramírez.
- `wa-hogar-0109-msg-04` **Tienda**: El subtotal es $423.000, domicilio $15.000. Total: $438.000. ¿Confirmas?
- `wa-hogar-0109-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0109-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0109-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0109-msg-01 → _Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Barranquilla_ |
| `barrio` | El Prado | wa-hogar-0109-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0109. Queda a nombre de Valentina Ramírez._ |
| `tienda` | Casa Ficticia | wa-hogar-0109-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Valentina Ramírez | wa-hogar-0109-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0109. Queda a nombre de Valentina Ramírez._ |
| `metodo_pago` | nequi | wa-hogar-0109-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 423000/15000/438000 | wa-hogar-0109-msg-04 → _El subtotal es $423.000, domicilio $15.000. Total: $438.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera media (cant 2); cortina blackout 140x220 gris (cant 3) | wa-hogar-0109-msg-01 → _Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Barranquilla_ |

## wa-hogar-0110 — Andrés Ramírez · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0110-msg-01` **Cliente**: Hola, si juego de sábanas no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0110-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0110-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $13.000?
- `wa-hogar-0110-msg-04` **Tienda**: Sí, el envío estándar cuesta $13.000. ¿Deseas hacer el pedido?
- `wa-hogar-0110-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0110-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0110-msg-03 → _¿Y el domicilio a Suba queda en $13.000?_ |
| `costo_envio_estandar` | 13000 | wa-hogar-0110-msg-04 → _Sí, el envío estándar cuesta $13.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0111 — Camila Ramírez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0111-msg-01` **Cliente**: Buenas, me regalas 1 unidades de juego de toallas blancas x3. ¿Cuánto queda para Manizales?
- `wa-hogar-0111-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0111-msg-03` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0111. Queda a nombre de Camila Ramírez.
- `wa-hogar-0111-msg-04` **Tienda**: El subtotal es $62.000, domicilio $12.000. Total: $74.000. ¿Confirmas?
- `wa-hogar-0111-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0111-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0111-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0111-msg-01 → _Buenas, me regalas 1 unidades de juego de toallas blancas x3. ¿Cuánto queda para Manizales?_ |
| `barrio` | Palermo | wa-hogar-0111-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0111. Queda a nombre de Camila Ramírez._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0111-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Camila Ramírez | wa-hogar-0111-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0111. Queda a nombre de Camila Ramírez._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0111-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 62000/12000/74000 | wa-hogar-0111-msg-04 → _El subtotal es $62.000, domicilio $12.000. Total: $74.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas blancas x3 (cant 1) | wa-hogar-0111-msg-01 → _Buenas, me regalas 1 unidades de juego de toallas blancas x3. ¿Cuánto queda para Manizales?_ |

## wa-hogar-0112 — Julián Ramírez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0112-msg-01` **Cliente**: Hola, quiero pedir 2 unidades de cobija térmica queen beige y 3 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cartagena?
- `wa-hogar-0112-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0112-msg-03` **Cliente**: Sí, en Manga, a nombre de Julián Ramírez. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul.
- `wa-hogar-0112-msg-04` **Tienda**: El subtotal es $412.000, domicilio $16.000. Total: $428.000. ¿Confirmas?
- `wa-hogar-0112-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0112-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0112-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0112-msg-01 → _Hola, quiero pedir 2 unidades de cobija térmica queen beige y 3 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cartagena?_ |
| `barrio` | Manga | wa-hogar-0112-msg-03 → _Sí, en Manga, a nombre de Julián Ramírez. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul._ |
| `tienda` | Textiles de Prueba | wa-hogar-0112-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Julián Ramírez | wa-hogar-0112-msg-03 → _Sí, en Manga, a nombre de Julián Ramírez. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul._ |
| `metodo_pago` | daviplata | wa-hogar-0112-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 412000/16000/428000 | wa-hogar-0112-msg-04 → _El subtotal es $412.000, domicilio $16.000. Total: $428.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica sencilla azul (cant 2); juego de sábanas doble algodón (cant 3) | wa-hogar-0112-msg-01 → _Hola, quiero pedir 2 unidades de cobija térmica queen beige y 3 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cartagena?_ |
| `referencia_corregida` | sí | wa-hogar-0112-msg-03 → _Sí, en Manga, a nombre de Julián Ramírez. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul._ |

## wa-hogar-0113 — Marcela Ramírez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0113-msg-01` **Cliente**: Hola 😊 necesito 3 unidades de cojín decorativo crema y 1 unidades de juego de toallas gris x3 y 2 unidades de almohada hotelera firme. ¿Cuánto queda para Medellín?
- `wa-hogar-0113-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0113-msg-03` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0113. Queda a nombre de Marcela Ramírez.
- `wa-hogar-0113-msg-04` **Tienda**: El subtotal es $224.000, domicilio $14.000. Total: $238.000. ¿Confirmas?
- `wa-hogar-0113-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0113-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0113-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0113-msg-01 → _Hola 😊 necesito 3 unidades de cojín decorativo crema y 1 unidades de juego de toallas gris x3 y 2 unidades de almohada hotelera firme. ¿Cuán_ |
| `barrio` | Laureles | wa-hogar-0113-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0113. Queda a nombre de Marcela Ramírez._ |
| `tienda` | Casa Ficticia | wa-hogar-0113-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Marcela Ramírez | wa-hogar-0113-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0113. Queda a nombre de Marcela Ramírez._ |
| `metodo_pago` | nequi | wa-hogar-0113-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 224000/14000/238000 | wa-hogar-0113-msg-04 → _El subtotal es $224.000, domicilio $14.000. Total: $238.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo crema (cant 3); juego de toallas gris x3 (cant 1); almohada hotelera firme (cant 2) | wa-hogar-0113-msg-01 → _Hola 😊 necesito 3 unidades de cojín decorativo crema y 1 unidades de juego de toallas gris x3 y 2 unidades de almohada hotelera firme. ¿Cuán_ |

## wa-hogar-0114 — Nicolás Ramírez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0114-msg-01` **Cliente**: ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Ibagué?
- `wa-hogar-0114-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0114-msg-03` **Cliente**: Sí, barrio La Pola. Punto de entrega de prueba HOG-0114. Queda a nombre de Nicolás Ramírez.
- `wa-hogar-0114-msg-04` **Tienda**: El subtotal es $56.000, domicilio $12.000. Total: $68.000. ¿Confirmas?
- `wa-hogar-0114-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0114-msg-06` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0114-msg-06 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0114-msg-01 → _ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Ibagué?_ |
| `barrio` | La Pola | wa-hogar-0114-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0114. Queda a nombre de Nicolás Ramírez._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0114-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Nicolás Ramírez | wa-hogar-0114-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0114. Queda a nombre de Nicolás Ramírez._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0114-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 56000/12000/68000 | wa-hogar-0114-msg-04 → _El subtotal es $56.000, domicilio $12.000. Total: $68.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón doble (cant 1) | wa-hogar-0114-msg-01 → _ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Ibagué?_ |

## wa-hogar-0115 — Paola Ramírez · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0115-msg-01` **Cliente**: Hola, si cortina blackout no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0115-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0115-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0115-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0115-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0115-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0116 — Sebastián Ramírez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0116-msg-01` **Cliente**: Buen día, quisiera 3 unidades de tapete de baño beige y 1 unidades de protector de colchón queen y 2 unidades de cobija térmica doble gris. ¿Cuánto queda para Cali?
- `wa-hogar-0116-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0116-msg-03` **Cliente**: Sí, barrio San Fernando. Punto de entrega de prueba HOG-0116. Queda a nombre de Sebastián Ramírez.
- `wa-hogar-0116-msg-04` **Tienda**: El subtotal es $330.000, domicilio $15.000. Total: $345.000. ¿Confirmas?
- `wa-hogar-0116-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0116-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0116-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0116-msg-01 → _Buen día, quisiera 3 unidades de tapete de baño beige y 1 unidades de protector de colchón queen y 2 unidades de cobija térmica doble gris._ |
| `barrio` | San Fernando | wa-hogar-0116-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0116. Queda a nombre de Sebastián Ramírez._ |
| `tienda` | Textiles de Prueba | wa-hogar-0116-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Sebastián Ramírez | wa-hogar-0116-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0116. Queda a nombre de Sebastián Ramírez._ |
| `metodo_pago` | daviplata | wa-hogar-0116-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 330000/15000/345000 | wa-hogar-0116-msg-04 → _El subtotal es $330.000, domicilio $15.000. Total: $345.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño beige (cant 3); protector de colchón queen (cant 1); cobija térmica doble gris (cant 2) | wa-hogar-0116-msg-01 → _Buen día, quisiera 3 unidades de tapete de baño beige y 1 unidades de protector de colchón queen y 2 unidades de cobija térmica doble gris._ |

## wa-hogar-0117 — Tatiana Ramírez · `pendiente`

**Conversación original** (7 mensajes):
- `wa-hogar-0117-msg-01` **Cliente**: Hola! tienen disponible 1 unidades de almohada hotelera firme. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0117-msg-02` **Cliente**: Ah y si hay color crema mejor 🙏
- `wa-hogar-0117-msg-03` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0117-msg-04` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0117. Queda a nombre de Tatiana Ramírez.
- `wa-hogar-0117-msg-05` **Tienda**: El subtotal es $39.000, domicilio $14.000. Total: $53.000. ¿Confirmas?
- `wa-hogar-0117-msg-06` **Cliente**: Déjamelo pendiente mientras confirmo la dirección, porfa.
- `wa-hogar-0117-msg-07` **Tienda**: Claro, queda pendiente y no se despacha todavía.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | pendiente | wa-hogar-0117-msg-07 → _Claro, queda pendiente y no se despacha todavía._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0117-msg-01 → _Hola! tienen disponible 1 unidades de almohada hotelera firme. ¿Cuánto queda para Santa Marta?_ |
| `barrio` | Bavaria | wa-hogar-0117-msg-04 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0117. Queda a nombre de Tatiana Ramírez._ |
| `tienda` | Casa Ficticia | wa-hogar-0117-msg-03 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Tatiana Ramírez | wa-hogar-0117-msg-04 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0117. Queda a nombre de Tatiana Ramírez._ |
| `subtotal/domicilio/total` | 39000/14000/53000 | wa-hogar-0117-msg-05 → _El subtotal es $39.000, domicilio $14.000. Total: $53.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera firme (cant 1) | wa-hogar-0117-msg-01 → _Hola! tienen disponible 1 unidades de almohada hotelera firme. ¿Cuánto queda para Santa Marta?_ |
| `color_crema_pendiente` | sí (sin confirmación) | wa-hogar-0117-msg-02 → _Ah y si hay color crema mejor 🙏_ |

## wa-hogar-0118 — Daniel Ramírez · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0118-msg-01` **Cliente**: Holaa, necesito 2 unidades de juego de sábanas queen blancas y 3 unidades de tapete de baño verde. ¿Cuánto queda para Pereira?
- `wa-hogar-0118-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0118-msg-03` **Cliente**: Sí, barrio Álamos. Punto de entrega de prueba HOG-0118. Queda a nombre de Daniel Ramírez.
- `wa-hogar-0118-msg-04` **Tienda**: El subtotal es $252.000, domicilio $14.000. Total: $266.000. ¿Confirmas?
- `wa-hogar-0118-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0118-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0118-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0118-msg-01 → _Holaa, necesito 2 unidades de juego de sábanas queen blancas y 3 unidades de tapete de baño verde. ¿Cuánto queda para Pereira?_ |
| `barrio` | Álamos | wa-hogar-0118-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0118. Queda a nombre de Daniel Ramírez._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0118-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Daniel Ramírez | wa-hogar-0118-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0118. Queda a nombre de Daniel Ramírez._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0118-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 252000/14000/266000 | wa-hogar-0118-msg-04 → _El subtotal es $252.000, domicilio $14.000. Total: $266.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas queen blancas (cant 2); tapete de baño verde (cant 3) | wa-hogar-0118-msg-01 → _Holaa, necesito 2 unidades de juego de sábanas queen blancas y 3 unidades de tapete de baño verde. ¿Cuánto queda para Pereira?_ |

## wa-hogar-0119 — Gabriela Ramírez · `cancelado`

**Conversación original** (6 mensajes):
- `wa-hogar-0119-msg-01` **Cliente**: Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0119-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0119-msg-03` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0119. Queda a nombre de Gabriela Ramírez.
- `wa-hogar-0119-msg-04` **Tienda**: El subtotal es $455.000, domicilio $17.000. Total: $472.000. ¿Confirmas?
- `wa-hogar-0119-msg-05` **Cliente**: No, mejor cancélalo por ahora. Gracias.
- `wa-hogar-0119-msg-06` **Tienda**: Entendido, no se genera el pedido.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | cancelado | wa-hogar-0119-msg-06 → _Entendido, no se genera el pedido._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0119-msg-01 → _Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220_ |
| `barrio` | El Prado | wa-hogar-0119-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0119. Queda a nombre de Gabriela Ramírez._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0119-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Gabriela Ramírez | wa-hogar-0119-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0119. Queda a nombre de Gabriela Ramírez._ |
| `subtotal/domicilio/total` | 455000/17000/472000 | wa-hogar-0119-msg-04 → _El subtotal es $455.000, domicilio $17.000. Total: $472.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas arena x2 (cant 3); almohada hotelera media (cant 1); cortina blackout 140x220 gris (cant 2) | wa-hogar-0119-msg-01 → _Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220_ |

## wa-hogar-0120 — Ricardo Ramírez · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0120-msg-01` **Cliente**: Hola, si cobija térmica no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0120-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0120-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $9.000?
- `wa-hogar-0120-msg-04` **Tienda**: Sí, el envío estándar cuesta $9.000. ¿Deseas hacer el pedido?
- `wa-hogar-0120-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0120-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0120-msg-03 → _¿Y el domicilio a Suba queda en $9.000?_ |
| `costo_envio_estandar` | 9000 | wa-hogar-0120-msg-04 → _Sí, el envío estándar cuesta $9.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0121 — Ana Torres · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0121-msg-01` **Cliente**: Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Manizales?
- `wa-hogar-0121-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0121-msg-03` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0121. Queda a nombre de Ana Torres.
- `wa-hogar-0121-msg-04` **Tienda**: El subtotal es $242.000, domicilio $14.000. Total: $256.000. ¿Confirmas?
- `wa-hogar-0121-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0121-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0121-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0121-msg-01 → _Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Manizales?_ |
| `barrio` | Palermo | wa-hogar-0121-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0121. Queda a nombre de Ana Torres._ |
| `tienda` | Casa Ficticia | wa-hogar-0121-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Ana Torres | wa-hogar-0121-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0121. Queda a nombre de Ana Torres._ |
| `metodo_pago` | nequi | wa-hogar-0121-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 242000/14000/256000 | wa-hogar-0121-msg-04 → _El subtotal es $242.000, domicilio $14.000. Total: $256.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo verde oliva (cant 2); juego de toallas blancas x3 (cant 3) | wa-hogar-0121-msg-01 → _Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Manizales?_ |

## wa-hogar-0122 — Carlos Torres · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0122-msg-01` **Cliente**: ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cartagena?
- `wa-hogar-0122-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0122-msg-03` **Cliente**: Sí, barrio Manga. Punto de entrega de prueba HOG-0122. Queda a nombre de Carlos Torres.
- `wa-hogar-0122-msg-04` **Tienda**: El subtotal es $413.000, domicilio $18.000. Total: $431.000. ¿Confirmas?
- `wa-hogar-0122-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0122-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0122-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0122-msg-01 → _ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas_ |
| `barrio` | Manga | wa-hogar-0122-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0122. Queda a nombre de Carlos Torres._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0122-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Carlos Torres | wa-hogar-0122-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0122. Queda a nombre de Carlos Torres._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0122-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 413000/18000/431000 | wa-hogar-0122-msg-04 → _El subtotal es $413.000, domicilio $18.000. Total: $431.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón sencillo (cant 3); cobija térmica queen beige (cant 1); juego de sábanas doble algodón (cant 2) | wa-hogar-0122-msg-01 → _ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas_ |

## wa-hogar-0123 — Diana Torres · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0123-msg-01` **Cliente**: Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Medellín?
- `wa-hogar-0123-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0123-msg-03` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0123. Queda a nombre de Diana Torres.
- `wa-hogar-0123-msg-04` **Tienda**: El subtotal es $115.000, domicilio $10.000. Total: $125.000. ¿Confirmas?
- `wa-hogar-0123-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0123-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0123-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0123-msg-01 → _Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Medellín?_ |
| `barrio` | Laureles | wa-hogar-0123-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0123. Queda a nombre de Diana Torres._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0123-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Diana Torres | wa-hogar-0123-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0123. Queda a nombre de Diana Torres._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0123-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 115000/10000/125000 | wa-hogar-0123-msg-04 → _El subtotal es $115.000, domicilio $10.000. Total: $125.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 140x220 gris (cant 1) | wa-hogar-0123-msg-01 → _Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Medellín?_ |

## wa-hogar-0124 — Felipe Torres · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0124-msg-01` **Cliente**: Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Ibagué?
- `wa-hogar-0124-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0124-msg-03` **Cliente**: Sí, barrio La Pola. Punto de entrega de prueba HOG-0124. Queda a nombre de Felipe Torres.
- `wa-hogar-0124-msg-04` **Tienda**: El subtotal es $232.000, domicilio $14.000. Total: $246.000. ¿Confirmas?
- `wa-hogar-0124-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0124-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0124-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0124-msg-01 → _Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Ibagué?_ |
| `barrio` | La Pola | wa-hogar-0124-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0124. Queda a nombre de Felipe Torres._ |
| `tienda` | Textiles de Prueba | wa-hogar-0124-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Felipe Torres | wa-hogar-0124-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0124. Queda a nombre de Felipe Torres._ |
| `metodo_pago` | daviplata | wa-hogar-0124-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 232000/14000/246000 | wa-hogar-0124-msg-04 → _El subtotal es $232.000, domicilio $14.000. Total: $246.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño gris (cant 2); protector de colchón doble (cant 3) | wa-hogar-0124-msg-01 → _Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Ibagué?_ |

## wa-hogar-0125 — Laura Torres · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0125-msg-01` **Cliente**: Hola, si almohada hotelera no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0125-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0125-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0125-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0125-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0125-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0126 — Mateo Torres · `confirmado`

**Conversación original** (7 mensajes):
- `wa-hogar-0126-msg-01` **Cliente**: Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cali?
- `wa-hogar-0126-msg-02` **Cliente**: Ah y si hay color crema mejor 🙏
- `wa-hogar-0126-msg-03` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0126-msg-04` **Cliente**: Sí, barrio San Fernando. Punto de entrega de prueba HOG-0126. Queda a nombre de Mateo Torres.
- `wa-hogar-0126-msg-05` **Tienda**: El subtotal es $78.000, domicilio $11.000. Total: $89.000. ¿Confirmas?
- `wa-hogar-0126-msg-06` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0126-msg-07` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0126-msg-07 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0126-msg-01 → _Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cali?_ |
| `barrio` | San Fernando | wa-hogar-0126-msg-04 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0126. Queda a nombre de Mateo Torres._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0126-msg-03 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Mateo Torres | wa-hogar-0126-msg-04 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0126. Queda a nombre de Mateo Torres._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0126-msg-06 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 78000/11000/89000 | wa-hogar-0126-msg-05 → _El subtotal es $78.000, domicilio $11.000. Total: $89.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas doble algodón (cant 1) | wa-hogar-0126-msg-01 → _Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cali?_ |
| `color_crema_pendiente` | sí (sin confirmación) | wa-hogar-0126-msg-02 → _Ah y si hay color crema mejor 🙏_ |

## wa-hogar-0127 — Natalia Torres · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0127-msg-01` **Cliente**: Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0127-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0127-msg-03` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0127. Queda a nombre de Natalia Torres.
- `wa-hogar-0127-msg-04` **Tienda**: El subtotal es $241.000, domicilio $16.000. Total: $257.000. ¿Confirmas?
- `wa-hogar-0127-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0127-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0127-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0127-msg-01 → _Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Santa Marta?_ |
| `barrio` | Bavaria | wa-hogar-0127-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0127. Queda a nombre de Natalia Torres._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0127-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Natalia Torres | wa-hogar-0127-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0127. Queda a nombre de Natalia Torres._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0127-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 241000/16000/257000 | wa-hogar-0127-msg-04 → _El subtotal es $241.000, domicilio $16.000. Total: $257.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas gris x3 (cant 2); almohada hotelera firme (cant 3) | wa-hogar-0127-msg-01 → _Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Santa Marta?_ |

## wa-hogar-0128 — Santiago Torres · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0128-msg-01` **Cliente**: Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño verde. ¿Cuánto queda para Pereira?
- `wa-hogar-0128-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0128-msg-03` **Cliente**: Sí, en Álamos, a nombre de Santiago Torres. Perdón: la cobija térmica la quiero en otra referencia, doble gris.
- `wa-hogar-0128-msg-04` **Tienda**: El subtotal es $409.000, domicilio $16.000. Total: $425.000. ¿Confirmas?
- `wa-hogar-0128-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0128-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0128-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0128-msg-01 → _Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño_ |
| `barrio` | Álamos | wa-hogar-0128-msg-03 → _Sí, en Álamos, a nombre de Santiago Torres. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |
| `tienda` | Textiles de Prueba | wa-hogar-0128-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Santiago Torres | wa-hogar-0128-msg-03 → _Sí, en Álamos, a nombre de Santiago Torres. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |
| `metodo_pago` | daviplata | wa-hogar-0128-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 409000/16000/425000 | wa-hogar-0128-msg-04 → _El subtotal es $409.000, domicilio $16.000. Total: $425.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica doble gris (cant 3); juego de sábanas queen blancas (cant 1); tapete de baño verde (cant 2) | wa-hogar-0128-msg-01 → _Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño_ |
| `referencia_corregida` | sí | wa-hogar-0128-msg-03 → _Sí, en Álamos, a nombre de Santiago Torres. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |

## wa-hogar-0129 — Valentina Torres · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0129-msg-01` **Cliente**: Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0129-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0129-msg-03` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0129. Queda a nombre de Valentina Torres.
- `wa-hogar-0129-msg-04` **Tienda**: El subtotal es $28.000, domicilio $13.000. Total: $41.000. ¿Confirmas?
- `wa-hogar-0129-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0129-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0129-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0129-msg-01 → _Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Barranquilla?_ |
| `barrio` | El Prado | wa-hogar-0129-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0129. Queda a nombre de Valentina Torres._ |
| `tienda` | Casa Ficticia | wa-hogar-0129-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Valentina Torres | wa-hogar-0129-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0129. Queda a nombre de Valentina Torres._ |
| `metodo_pago` | nequi | wa-hogar-0129-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 28000/13000/41000 | wa-hogar-0129-msg-04 → _El subtotal es $28.000, domicilio $13.000. Total: $41.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo terracota (cant 1) | wa-hogar-0129-msg-01 → _Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Barranquilla?_ |

## wa-hogar-0130 — Andrés Torres · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0130-msg-01` **Cliente**: Hola, si protector de colchón no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0130-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0130-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $11.000?
- `wa-hogar-0130-msg-04` **Tienda**: Sí, el envío estándar cuesta $11.000. ¿Deseas hacer el pedido?
- `wa-hogar-0130-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0130-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0130-msg-03 → _¿Y el domicilio a Suba queda en $11.000?_ |
| `costo_envio_estandar` | 11000 | wa-hogar-0130-msg-04 → _Sí, el envío estándar cuesta $11.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0131 — Camila Torres · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0131-msg-01` **Cliente**: Buenas tardes, estoy buscando 3 unidades de cortina blackout 200x220 azul y 1 unidades de cojín decorativo verde oliva y 2 unidades de juego de toallas blancas x3. ¿Cuánto queda para Manizales?
- `wa-hogar-0131-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0131-msg-03` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0131. Queda a nombre de Camila Torres.
- `wa-hogar-0131-msg-04` **Tienda**: El subtotal es $497.000, domicilio $16.000. Total: $513.000. ¿Confirmas?
- `wa-hogar-0131-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0131-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0131-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0131-msg-01 → _Buenas tardes, estoy buscando 3 unidades de cortina blackout 200x220 azul y 1 unidades de cojín decorativo verde oliva y 2 unidades de juego_ |
| `barrio` | Palermo | wa-hogar-0131-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0131. Queda a nombre de Camila Torres._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0131-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Camila Torres | wa-hogar-0131-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0131. Queda a nombre de Camila Torres._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0131-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 497000/16000/513000 | wa-hogar-0131-msg-04 → _El subtotal es $497.000, domicilio $16.000. Total: $513.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 200x220 azul (cant 3); cojín decorativo verde oliva (cant 1); juego de toallas blancas x3 (cant 2) | wa-hogar-0131-msg-01 → _Buenas tardes, estoy buscando 3 unidades de cortina blackout 200x220 azul y 1 unidades de cojín decorativo verde oliva y 2 unidades de juego_ |

## wa-hogar-0132 — Julián Torres · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0132-msg-01` **Cliente**: Buen día, quisiera 1 unidades de tapete de baño verde. ¿Cuánto queda para Cartagena?
- `wa-hogar-0132-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0132-msg-03` **Cliente**: Sí, barrio Manga. Punto de entrega de prueba HOG-0132. Queda a nombre de Julián Torres.
- `wa-hogar-0132-msg-04` **Tienda**: El subtotal es $32.000, domicilio $14.000. Total: $46.000. ¿Confirmas?
- `wa-hogar-0132-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0132-msg-06` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0132-msg-06 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0132-msg-01 → _Buen día, quisiera 1 unidades de tapete de baño verde. ¿Cuánto queda para Cartagena?_ |
| `barrio` | Manga | wa-hogar-0132-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0132. Queda a nombre de Julián Torres._ |
| `tienda` | Textiles de Prueba | wa-hogar-0132-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Julián Torres | wa-hogar-0132-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0132. Queda a nombre de Julián Torres._ |
| `metodo_pago` | daviplata | wa-hogar-0132-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 32000/14000/46000 | wa-hogar-0132-msg-04 → _El subtotal es $32.000, domicilio $14.000. Total: $46.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño verde (cant 1) | wa-hogar-0132-msg-01 → _Buen día, quisiera 1 unidades de tapete de baño verde. ¿Cuánto queda para Cartagena?_ |

## wa-hogar-0133 — Marcela Torres · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0133-msg-01` **Cliente**: Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Medellín?
- `wa-hogar-0133-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0133-msg-03` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0133. Queda a nombre de Marcela Torres.
- `wa-hogar-0133-msg-04` **Tienda**: El subtotal es $423.000, domicilio $12.000. Total: $435.000. ¿Confirmas?
- `wa-hogar-0133-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0133-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0133-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0133-msg-01 → _Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Medellín?_ |
| `barrio` | Laureles | wa-hogar-0133-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0133. Queda a nombre de Marcela Torres._ |
| `tienda` | Casa Ficticia | wa-hogar-0133-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Marcela Torres | wa-hogar-0133-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0133. Queda a nombre de Marcela Torres._ |
| `metodo_pago` | nequi | wa-hogar-0133-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 423000/12000/435000 | wa-hogar-0133-msg-04 → _El subtotal es $423.000, domicilio $12.000. Total: $435.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera media (cant 2); cortina blackout 140x220 gris (cant 3) | wa-hogar-0133-msg-01 → _Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Medellín?_ |

## wa-hogar-0134 — Nicolás Torres · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0134-msg-01` **Cliente**: Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón doble. ¿Cuánto queda para Ibagué?
- `wa-hogar-0134-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0134-msg-03` **Cliente**: Sí, barrio La Pola. Punto de entrega de prueba HOG-0134. Queda a nombre de Nicolás Torres.
- `wa-hogar-0134-msg-04` **Tienda**: El subtotal es $378.000, domicilio $16.000. Total: $394.000. ¿Confirmas?
- `wa-hogar-0134-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0134-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0134-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0134-msg-01 → _Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón_ |
| `barrio` | La Pola | wa-hogar-0134-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0134. Queda a nombre de Nicolás Torres._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0134-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Nicolás Torres | wa-hogar-0134-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0134. Queda a nombre de Nicolás Torres._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0134-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 378000/16000/394000 | wa-hogar-0134-msg-04 → _El subtotal es $378.000, domicilio $16.000. Total: $394.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas sencillas estampadas (cant 3); tapete de baño gris (cant 1); protector de colchón doble (cant 2) | wa-hogar-0134-msg-01 → _Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón_ |

## wa-hogar-0135 — Paola Torres · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0135-msg-01` **Cliente**: Hola, si juego de toallas no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0135-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0135-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0135-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0135-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0135-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0136 — Sebastián Torres · `cancelado`

**Conversación original** (6 mensajes):
- `wa-hogar-0136-msg-01` **Cliente**: Hola, quiero pedir 2 unidades de cobija térmica queen beige y 3 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cali?
- `wa-hogar-0136-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0136-msg-03` **Cliente**: Sí, en San Fernando, a nombre de Sebastián Torres. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul.
- `wa-hogar-0136-msg-04` **Tienda**: El subtotal es $412.000, domicilio $13.000. Total: $425.000. ¿Confirmas?
- `wa-hogar-0136-msg-05` **Cliente**: No, mejor cancélalo por ahora. Gracias.
- `wa-hogar-0136-msg-06` **Tienda**: Entendido, no se genera el pedido.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | cancelado | wa-hogar-0136-msg-06 → _Entendido, no se genera el pedido._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0136-msg-01 → _Hola, quiero pedir 2 unidades de cobija térmica queen beige y 3 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cali?_ |
| `barrio` | San Fernando | wa-hogar-0136-msg-03 → _Sí, en San Fernando, a nombre de Sebastián Torres. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul._ |
| `tienda` | Textiles de Prueba | wa-hogar-0136-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Sebastián Torres | wa-hogar-0136-msg-03 → _Sí, en San Fernando, a nombre de Sebastián Torres. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul._ |
| `subtotal/domicilio/total` | 412000/13000/425000 | wa-hogar-0136-msg-04 → _El subtotal es $412.000, domicilio $13.000. Total: $425.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica sencilla azul (cant 2); juego de sábanas doble algodón (cant 3) | wa-hogar-0136-msg-01 → _Hola, quiero pedir 2 unidades de cobija térmica queen beige y 3 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cali?_ |
| `referencia_corregida` | sí | wa-hogar-0136-msg-03 → _Sí, en San Fernando, a nombre de Sebastián Torres. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul._ |

## wa-hogar-0137 — Tatiana Torres · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0137-msg-01` **Cliente**: Hola 😊 necesito 3 unidades de cojín decorativo crema y 1 unidades de juego de toallas gris x3 y 2 unidades de almohada hotelera firme. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0137-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0137-msg-03` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0137. Queda a nombre de Tatiana Torres.
- `wa-hogar-0137-msg-04` **Tienda**: El subtotal es $224.000, domicilio $18.000. Total: $242.000. ¿Confirmas?
- `wa-hogar-0137-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0137-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0137-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0137-msg-01 → _Hola 😊 necesito 3 unidades de cojín decorativo crema y 1 unidades de juego de toallas gris x3 y 2 unidades de almohada hotelera firme. ¿Cuán_ |
| `barrio` | Bavaria | wa-hogar-0137-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0137. Queda a nombre de Tatiana Torres._ |
| `tienda` | Casa Ficticia | wa-hogar-0137-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Tatiana Torres | wa-hogar-0137-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0137. Queda a nombre de Tatiana Torres._ |
| `metodo_pago` | nequi | wa-hogar-0137-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 224000/18000/242000 | wa-hogar-0137-msg-04 → _El subtotal es $224.000, domicilio $18.000. Total: $242.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo crema (cant 3); juego de toallas gris x3 (cant 1); almohada hotelera firme (cant 2) | wa-hogar-0137-msg-01 → _Hola 😊 necesito 3 unidades de cojín decorativo crema y 1 unidades de juego de toallas gris x3 y 2 unidades de almohada hotelera firme. ¿Cuán_ |

## wa-hogar-0138 — Daniel Torres · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0138-msg-01` **Cliente**: ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Pereira?
- `wa-hogar-0138-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0138-msg-03` **Cliente**: Sí, barrio Álamos. Punto de entrega de prueba HOG-0138. Queda a nombre de Daniel Torres.
- `wa-hogar-0138-msg-04` **Tienda**: El subtotal es $56.000, domicilio $12.000. Total: $68.000. ¿Confirmas?
- `wa-hogar-0138-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0138-msg-06` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0138-msg-06 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0138-msg-01 → _ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Pereira?_ |
| `barrio` | Álamos | wa-hogar-0138-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0138. Queda a nombre de Daniel Torres._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0138-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Daniel Torres | wa-hogar-0138-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0138. Queda a nombre de Daniel Torres._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0138-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 56000/12000/68000 | wa-hogar-0138-msg-04 → _El subtotal es $56.000, domicilio $12.000. Total: $68.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón doble (cant 1) | wa-hogar-0138-msg-01 → _ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Pereira?_ |

## wa-hogar-0139 — Gabriela Torres · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0139-msg-01` **Cliente**: Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0139-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0139-msg-03` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0139. Queda a nombre de Gabriela Torres.
- `wa-hogar-0139-msg-04` **Tienda**: El subtotal es $314.000, domicilio $15.000. Total: $329.000. ¿Confirmas?
- `wa-hogar-0139-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0139-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0139-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0139-msg-01 → _Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Ba_ |
| `barrio` | El Prado | wa-hogar-0139-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0139. Queda a nombre de Gabriela Torres._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0139-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Gabriela Torres | wa-hogar-0139-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0139. Queda a nombre de Gabriela Torres._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0139-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 314000/15000/329000 | wa-hogar-0139-msg-04 → _El subtotal es $314.000, domicilio $15.000. Total: $329.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 140x220 beige (cant 2); cojín decorativo terracota (cant 3) | wa-hogar-0139-msg-01 → _Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Ba_ |

## wa-hogar-0140 — Ricardo Torres · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0140-msg-01` **Cliente**: Hola, si tapete de baño no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0140-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0140-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $13.000?
- `wa-hogar-0140-msg-04` **Tienda**: Sí, el envío estándar cuesta $13.000. ¿Deseas hacer el pedido?
- `wa-hogar-0140-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0140-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0140-msg-03 → _¿Y el domicilio a Suba queda en $13.000?_ |
| `costo_envio_estandar` | 13000 | wa-hogar-0140-msg-04 → _Sí, el envío estándar cuesta $13.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0141 — Ana Vargas · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0141-msg-01` **Cliente**: Hola! tienen disponible 1 unidades de almohada hotelera firme. ¿Cuánto queda para Manizales?
- `wa-hogar-0141-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0141-msg-03` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0141. Queda a nombre de Ana Vargas.
- `wa-hogar-0141-msg-04` **Tienda**: El subtotal es $39.000, domicilio $12.000. Total: $51.000. ¿Confirmas?
- `wa-hogar-0141-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0141-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0141-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0141-msg-01 → _Hola! tienen disponible 1 unidades de almohada hotelera firme. ¿Cuánto queda para Manizales?_ |
| `barrio` | Palermo | wa-hogar-0141-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0141. Queda a nombre de Ana Vargas._ |
| `tienda` | Casa Ficticia | wa-hogar-0141-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Ana Vargas | wa-hogar-0141-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0141. Queda a nombre de Ana Vargas._ |
| `metodo_pago` | nequi | wa-hogar-0141-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 39000/12000/51000 | wa-hogar-0141-msg-04 → _El subtotal es $39.000, domicilio $12.000. Total: $51.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera firme (cant 1) | wa-hogar-0141-msg-01 → _Hola! tienen disponible 1 unidades de almohada hotelera firme. ¿Cuánto queda para Manizales?_ |

## wa-hogar-0142 — Carlos Vargas · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0142-msg-01` **Cliente**: Holaa, necesito 2 unidades de juego de sábanas queen blancas y 3 unidades de tapete de baño verde. ¿Cuánto queda para Cartagena?
- `wa-hogar-0142-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0142-msg-03` **Cliente**: Sí, barrio Manga. Punto de entrega de prueba HOG-0142. Queda a nombre de Carlos Vargas.
- `wa-hogar-0142-msg-04` **Tienda**: El subtotal es $252.000, domicilio $16.000. Total: $268.000. ¿Confirmas?
- `wa-hogar-0142-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0142-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0142-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0142-msg-01 → _Holaa, necesito 2 unidades de juego de sábanas queen blancas y 3 unidades de tapete de baño verde. ¿Cuánto queda para Cartagena?_ |
| `barrio` | Manga | wa-hogar-0142-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0142. Queda a nombre de Carlos Vargas._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0142-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Carlos Vargas | wa-hogar-0142-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0142. Queda a nombre de Carlos Vargas._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0142-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 252000/16000/268000 | wa-hogar-0142-msg-04 → _El subtotal es $252.000, domicilio $16.000. Total: $268.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas queen blancas (cant 2); tapete de baño verde (cant 3) | wa-hogar-0142-msg-01 → _Holaa, necesito 2 unidades de juego de sábanas queen blancas y 3 unidades de tapete de baño verde. ¿Cuánto queda para Cartagena?_ |

## wa-hogar-0143 — Diana Vargas · `pendiente`

**Conversación original** (6 mensajes):
- `wa-hogar-0143-msg-01` **Cliente**: Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Medellín?
- `wa-hogar-0143-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0143-msg-03` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0143. Queda a nombre de Diana Vargas.
- `wa-hogar-0143-msg-04` **Tienda**: El subtotal es $455.000, domicilio $14.000. Total: $469.000. ¿Confirmas?
- `wa-hogar-0143-msg-05` **Cliente**: Déjamelo pendiente mientras confirmo la dirección, porfa.
- `wa-hogar-0143-msg-06` **Tienda**: Claro, queda pendiente y no se despacha todavía.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | pendiente | wa-hogar-0143-msg-06 → _Claro, queda pendiente y no se despacha todavía._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0143-msg-01 → _Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220_ |
| `barrio` | Laureles | wa-hogar-0143-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0143. Queda a nombre de Diana Vargas._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0143-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Diana Vargas | wa-hogar-0143-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0143. Queda a nombre de Diana Vargas._ |
| `subtotal/domicilio/total` | 455000/14000/469000 | wa-hogar-0143-msg-04 → _El subtotal es $455.000, domicilio $14.000. Total: $469.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas arena x2 (cant 3); almohada hotelera media (cant 1); cortina blackout 140x220 gris (cant 2) | wa-hogar-0143-msg-01 → _Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220_ |

## wa-hogar-0144 — Felipe Vargas · `confirmado`

**Conversación original** (7 mensajes):
- `wa-hogar-0144-msg-01` **Cliente**: Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Ibagué?
- `wa-hogar-0144-msg-02` **Cliente**: Ah y si hay color crema mejor 🙏
- `wa-hogar-0144-msg-03` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0144-msg-04` **Cliente**: Sí, en La Pola, a nombre de Felipe Vargas. Perdón: la cobija térmica la quiero en otra referencia, queen beige.
- `wa-hogar-0144-msg-05` **Tienda**: El subtotal es $89.000, domicilio $12.000. Total: $101.000. ¿Confirmas?
- `wa-hogar-0144-msg-06` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0144-msg-07` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0144-msg-07 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0144-msg-01 → _Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Ibagué?_ |
| `barrio` | La Pola | wa-hogar-0144-msg-04 → _Sí, en La Pola, a nombre de Felipe Vargas. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |
| `tienda` | Textiles de Prueba | wa-hogar-0144-msg-03 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Felipe Vargas | wa-hogar-0144-msg-04 → _Sí, en La Pola, a nombre de Felipe Vargas. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |
| `metodo_pago` | daviplata | wa-hogar-0144-msg-06 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 89000/12000/101000 | wa-hogar-0144-msg-05 → _El subtotal es $89.000, domicilio $12.000. Total: $101.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica queen beige (cant 1) | wa-hogar-0144-msg-01 → _Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Ibagué?_ |
| `referencia_corregida` | sí | wa-hogar-0144-msg-04 → _Sí, en La Pola, a nombre de Felipe Vargas. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |
| `color_crema_pendiente` | sí (sin confirmación) | wa-hogar-0144-msg-02 → _Ah y si hay color crema mejor 🙏_ |

## wa-hogar-0145 — Laura Vargas · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0145-msg-01` **Cliente**: Hola, si cojín decorativo no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0145-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0145-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0145-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0145-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0145-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0146 — Mateo Vargas · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0146-msg-01` **Cliente**: ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Cali?
- `wa-hogar-0146-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0146-msg-03` **Cliente**: Sí, barrio San Fernando. Punto de entrega de prueba HOG-0146. Queda a nombre de Mateo Vargas.
- `wa-hogar-0146-msg-04` **Tienda**: El subtotal es $413.000, domicilio $15.000. Total: $428.000. ¿Confirmas?
- `wa-hogar-0146-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0146-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0146-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0146-msg-01 → _ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas_ |
| `barrio` | San Fernando | wa-hogar-0146-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0146. Queda a nombre de Mateo Vargas._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0146-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Mateo Vargas | wa-hogar-0146-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0146. Queda a nombre de Mateo Vargas._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0146-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 413000/15000/428000 | wa-hogar-0146-msg-04 → _El subtotal es $413.000, domicilio $15.000. Total: $428.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón sencillo (cant 3); cobija térmica queen beige (cant 1); juego de sábanas doble algodón (cant 2) | wa-hogar-0146-msg-01 → _ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas_ |

## wa-hogar-0147 — Natalia Vargas · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0147-msg-01` **Cliente**: Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0147-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0147-msg-03` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0147. Queda a nombre de Natalia Vargas.
- `wa-hogar-0147-msg-04` **Tienda**: El subtotal es $115.000, domicilio $14.000. Total: $129.000. ¿Confirmas?
- `wa-hogar-0147-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0147-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0147-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0147-msg-01 → _Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Santa Marta?_ |
| `barrio` | Bavaria | wa-hogar-0147-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0147. Queda a nombre de Natalia Vargas._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0147-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Natalia Vargas | wa-hogar-0147-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0147. Queda a nombre de Natalia Vargas._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0147-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 115000/14000/129000 | wa-hogar-0147-msg-04 → _El subtotal es $115.000, domicilio $14.000. Total: $129.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 140x220 gris (cant 1) | wa-hogar-0147-msg-01 → _Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Santa Marta?_ |

## wa-hogar-0148 — Santiago Vargas · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0148-msg-01` **Cliente**: Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Pereira?
- `wa-hogar-0148-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0148-msg-03` **Cliente**: Sí, barrio Álamos. Punto de entrega de prueba HOG-0148. Queda a nombre de Santiago Vargas.
- `wa-hogar-0148-msg-04` **Tienda**: El subtotal es $232.000, domicilio $14.000. Total: $246.000. ¿Confirmas?
- `wa-hogar-0148-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0148-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0148-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0148-msg-01 → _Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Pereira?_ |
| `barrio` | Álamos | wa-hogar-0148-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0148. Queda a nombre de Santiago Vargas._ |
| `tienda` | Textiles de Prueba | wa-hogar-0148-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Santiago Vargas | wa-hogar-0148-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0148. Queda a nombre de Santiago Vargas._ |
| `metodo_pago` | daviplata | wa-hogar-0148-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 232000/14000/246000 | wa-hogar-0148-msg-04 → _El subtotal es $232.000, domicilio $14.000. Total: $246.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño gris (cant 2); protector de colchón doble (cant 3) | wa-hogar-0148-msg-01 → _Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Pereira?_ |

## wa-hogar-0149 — Valentina Vargas · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0149-msg-01` **Cliente**: Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativo terracota. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0149-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0149-msg-03` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0149. Queda a nombre de Valentina Vargas.
- `wa-hogar-0149-msg-04` **Tienda**: El subtotal es $288.000, domicilio $17.000. Total: $305.000. ¿Confirmas?
- `wa-hogar-0149-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0149-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0149-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0149-msg-01 → _Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativ_ |
| `barrio` | El Prado | wa-hogar-0149-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0149. Queda a nombre de Valentina Vargas._ |
| `tienda` | Casa Ficticia | wa-hogar-0149-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Valentina Vargas | wa-hogar-0149-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0149. Queda a nombre de Valentina Vargas._ |
| `metodo_pago` | nequi | wa-hogar-0149-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 288000/17000/305000 | wa-hogar-0149-msg-04 → _El subtotal es $288.000, domicilio $17.000. Total: $305.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera suave (cant 3); cortina blackout 140x220 beige (cant 1); cojín decorativo terracota (cant 2) | wa-hogar-0149-msg-01 → _Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativ_ |

## wa-hogar-0150 — Andrés Vargas · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0150-msg-01` **Cliente**: Hola, si juego de sábanas no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0150-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0150-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $9.000?
- `wa-hogar-0150-msg-04` **Tienda**: Sí, el envío estándar cuesta $9.000. ¿Deseas hacer el pedido?
- `wa-hogar-0150-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0150-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0150-msg-03 → _¿Y el domicilio a Suba queda en $9.000?_ |
| `costo_envio_estandar` | 9000 | wa-hogar-0150-msg-04 → _Sí, el envío estándar cuesta $9.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0151 — Camila Vargas · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0151-msg-01` **Cliente**: Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Manizales?
- `wa-hogar-0151-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0151-msg-03` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0151. Queda a nombre de Camila Vargas.
- `wa-hogar-0151-msg-04` **Tienda**: El subtotal es $241.000, domicilio $14.000. Total: $255.000. ¿Confirmas?
- `wa-hogar-0151-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0151-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0151-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0151-msg-01 → _Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Manizales?_ |
| `barrio` | Palermo | wa-hogar-0151-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0151. Queda a nombre de Camila Vargas._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0151-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Camila Vargas | wa-hogar-0151-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0151. Queda a nombre de Camila Vargas._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0151-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 241000/14000/255000 | wa-hogar-0151-msg-04 → _El subtotal es $241.000, domicilio $14.000. Total: $255.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas gris x3 (cant 2); almohada hotelera firme (cant 3) | wa-hogar-0151-msg-01 → _Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Manizales?_ |

## wa-hogar-0152 — Julián Vargas · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0152-msg-01` **Cliente**: Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño verde. ¿Cuánto queda para Cartagena?
- `wa-hogar-0152-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0152-msg-03` **Cliente**: Sí, en Manga, a nombre de Julián Vargas. Perdón: la cobija térmica la quiero en otra referencia, doble gris.
- `wa-hogar-0152-msg-04` **Tienda**: El subtotal es $409.000, domicilio $18.000. Total: $427.000. ¿Confirmas?
- `wa-hogar-0152-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0152-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0152-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0152-msg-01 → _Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño_ |
| `barrio` | Manga | wa-hogar-0152-msg-03 → _Sí, en Manga, a nombre de Julián Vargas. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |
| `tienda` | Textiles de Prueba | wa-hogar-0152-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Julián Vargas | wa-hogar-0152-msg-03 → _Sí, en Manga, a nombre de Julián Vargas. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |
| `metodo_pago` | daviplata | wa-hogar-0152-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 409000/18000/427000 | wa-hogar-0152-msg-04 → _El subtotal es $409.000, domicilio $18.000. Total: $427.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica doble gris (cant 3); juego de sábanas queen blancas (cant 1); tapete de baño verde (cant 2) | wa-hogar-0152-msg-01 → _Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño_ |
| `referencia_corregida` | sí | wa-hogar-0152-msg-03 → _Sí, en Manga, a nombre de Julián Vargas. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |

## wa-hogar-0153 — Marcela Vargas · `cancelado`

**Conversación original** (7 mensajes):
- `wa-hogar-0153-msg-01` **Cliente**: Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Medellín?
- `wa-hogar-0153-msg-02` **Cliente**: Ah y si hay color crema mejor 🙏
- `wa-hogar-0153-msg-03` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0153-msg-04` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0153. Queda a nombre de Marcela Vargas.
- `wa-hogar-0153-msg-05` **Tienda**: El subtotal es $28.000, domicilio $10.000. Total: $38.000. ¿Confirmas?
- `wa-hogar-0153-msg-06` **Cliente**: No, mejor cancélalo por ahora. Gracias.
- `wa-hogar-0153-msg-07` **Tienda**: Entendido, no se genera el pedido.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | cancelado | wa-hogar-0153-msg-07 → _Entendido, no se genera el pedido._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0153-msg-01 → _Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Medellín?_ |
| `barrio` | Laureles | wa-hogar-0153-msg-04 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0153. Queda a nombre de Marcela Vargas._ |
| `tienda` | Casa Ficticia | wa-hogar-0153-msg-03 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Marcela Vargas | wa-hogar-0153-msg-04 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0153. Queda a nombre de Marcela Vargas._ |
| `subtotal/domicilio/total` | 28000/10000/38000 | wa-hogar-0153-msg-05 → _El subtotal es $28.000, domicilio $10.000. Total: $38.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo terracota (cant 1) | wa-hogar-0153-msg-01 → _Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Medellín?_ |
| `color_crema_pendiente` | sí (sin confirmación) | wa-hogar-0153-msg-02 → _Ah y si hay color crema mejor 🙏_ |

## wa-hogar-0154 — Nicolás Vargas · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0154-msg-01` **Cliente**: ola, quiero comprar 2 unidades de protector de colchón queen y 3 unidades de cobija térmica doble gris. ¿Cuánto queda para Ibagué?
- `wa-hogar-0154-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0154-msg-03` **Cliente**: Sí, barrio La Pola. Punto de entrega de prueba HOG-0154. Queda a nombre de Nicolás Vargas.
- `wa-hogar-0154-msg-04` **Tienda**: El subtotal es $379.000, domicilio $14.000. Total: $393.000. ¿Confirmas?
- `wa-hogar-0154-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0154-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0154-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0154-msg-01 → _ola, quiero comprar 2 unidades de protector de colchón queen y 3 unidades de cobija térmica doble gris. ¿Cuánto queda para Ibagué?_ |
| `barrio` | La Pola | wa-hogar-0154-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0154. Queda a nombre de Nicolás Vargas._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0154-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Nicolás Vargas | wa-hogar-0154-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0154. Queda a nombre de Nicolás Vargas._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0154-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 379000/14000/393000 | wa-hogar-0154-msg-04 → _El subtotal es $379.000, domicilio $14.000. Total: $393.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón queen (cant 2); cobija térmica doble gris (cant 3) | wa-hogar-0154-msg-01 → _ola, quiero comprar 2 unidades de protector de colchón queen y 3 unidades de cobija térmica doble gris. ¿Cuánto queda para Ibagué?_ |

## wa-hogar-0155 — Paola Vargas · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0155-msg-01` **Cliente**: Hola, si cortina blackout no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0155-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0155-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0155-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0155-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0155-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0156 — Sebastián Vargas · `pendiente`

**Conversación original** (6 mensajes):
- `wa-hogar-0156-msg-01` **Cliente**: Buen día, quisiera 1 unidades de tapete de baño verde. ¿Cuánto queda para Cali?
- `wa-hogar-0156-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0156-msg-03` **Cliente**: Sí, barrio San Fernando. Punto de entrega de prueba HOG-0156. Queda a nombre de Sebastián Vargas.
- `wa-hogar-0156-msg-04` **Tienda**: El subtotal es $32.000, domicilio $11.000. Total: $43.000. ¿Confirmas?
- `wa-hogar-0156-msg-05` **Cliente**: Déjamelo pendiente mientras confirmo la dirección, porfa.
- `wa-hogar-0156-msg-06` **Tienda**: Claro, queda pendiente y no se despacha todavía.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | pendiente | wa-hogar-0156-msg-06 → _Claro, queda pendiente y no se despacha todavía._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0156-msg-01 → _Buen día, quisiera 1 unidades de tapete de baño verde. ¿Cuánto queda para Cali?_ |
| `barrio` | San Fernando | wa-hogar-0156-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0156. Queda a nombre de Sebastián Vargas._ |
| `tienda` | Textiles de Prueba | wa-hogar-0156-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Sebastián Vargas | wa-hogar-0156-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0156. Queda a nombre de Sebastián Vargas._ |
| `subtotal/domicilio/total` | 32000/11000/43000 | wa-hogar-0156-msg-04 → _El subtotal es $32.000, domicilio $11.000. Total: $43.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño verde (cant 1) | wa-hogar-0156-msg-01 → _Buen día, quisiera 1 unidades de tapete de baño verde. ¿Cuánto queda para Cali?_ |

## wa-hogar-0157 — Tatiana Vargas · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0157-msg-01` **Cliente**: Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0157-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0157-msg-03` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0157. Queda a nombre de Tatiana Vargas.
- `wa-hogar-0157-msg-04` **Tienda**: El subtotal es $423.000, domicilio $16.000. Total: $439.000. ¿Confirmas?
- `wa-hogar-0157-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0157-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0157-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0157-msg-01 → _Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Santa Marta?_ |
| `barrio` | Bavaria | wa-hogar-0157-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0157. Queda a nombre de Tatiana Vargas._ |
| `tienda` | Casa Ficticia | wa-hogar-0157-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Tatiana Vargas | wa-hogar-0157-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0157. Queda a nombre de Tatiana Vargas._ |
| `metodo_pago` | nequi | wa-hogar-0157-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 423000/16000/439000 | wa-hogar-0157-msg-04 → _El subtotal es $423.000, domicilio $16.000. Total: $439.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera media (cant 2); cortina blackout 140x220 gris (cant 3) | wa-hogar-0157-msg-01 → _Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Santa Marta?_ |

## wa-hogar-0158 — Daniel Vargas · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0158-msg-01` **Cliente**: Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón doble. ¿Cuánto queda para Pereira?
- `wa-hogar-0158-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0158-msg-03` **Cliente**: Sí, barrio Álamos. Punto de entrega de prueba HOG-0158. Queda a nombre de Daniel Vargas.
- `wa-hogar-0158-msg-04` **Tienda**: El subtotal es $378.000, domicilio $16.000. Total: $394.000. ¿Confirmas?
- `wa-hogar-0158-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0158-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0158-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0158-msg-01 → _Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón_ |
| `barrio` | Álamos | wa-hogar-0158-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0158. Queda a nombre de Daniel Vargas._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0158-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Daniel Vargas | wa-hogar-0158-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0158. Queda a nombre de Daniel Vargas._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0158-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 378000/16000/394000 | wa-hogar-0158-msg-04 → _El subtotal es $378.000, domicilio $16.000. Total: $394.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas sencillas estampadas (cant 3); tapete de baño gris (cant 1); protector de colchón doble (cant 2) | wa-hogar-0158-msg-01 → _Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón_ |

## wa-hogar-0159 — Gabriela Vargas · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0159-msg-01` **Cliente**: Buenas, me regalas 1 unidades de juego de toallas blancas x3. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0159-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0159-msg-03` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0159. Queda a nombre de Gabriela Vargas.
- `wa-hogar-0159-msg-04` **Tienda**: El subtotal es $62.000, domicilio $13.000. Total: $75.000. ¿Confirmas?
- `wa-hogar-0159-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0159-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0159-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0159-msg-01 → _Buenas, me regalas 1 unidades de juego de toallas blancas x3. ¿Cuánto queda para Barranquilla?_ |
| `barrio` | El Prado | wa-hogar-0159-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0159. Queda a nombre de Gabriela Vargas._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0159-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Gabriela Vargas | wa-hogar-0159-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0159. Queda a nombre de Gabriela Vargas._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0159-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 62000/13000/75000 | wa-hogar-0159-msg-04 → _El subtotal es $62.000, domicilio $13.000. Total: $75.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas blancas x3 (cant 1) | wa-hogar-0159-msg-01 → _Buenas, me regalas 1 unidades de juego de toallas blancas x3. ¿Cuánto queda para Barranquilla?_ |

## wa-hogar-0160 — Ricardo Vargas · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0160-msg-01` **Cliente**: Hola, si cobija térmica no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0160-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0160-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $11.000?
- `wa-hogar-0160-msg-04` **Tienda**: Sí, el envío estándar cuesta $11.000. ¿Deseas hacer el pedido?
- `wa-hogar-0160-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0160-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0160-msg-03 → _¿Y el domicilio a Suba queda en $11.000?_ |
| `costo_envio_estandar` | 11000 | wa-hogar-0160-msg-04 → _Sí, el envío estándar cuesta $11.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0161 — Ana Castro · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0161-msg-01` **Cliente**: Hola 😊 necesito 3 unidades de cojín decorativo crema y 1 unidades de juego de toallas gris x3 y 2 unidades de almohada hotelera firme. ¿Cuánto queda para Manizales?
- `wa-hogar-0161-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0161-msg-03` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0161. Queda a nombre de Ana Castro.
- `wa-hogar-0161-msg-04` **Tienda**: El subtotal es $224.000, domicilio $16.000. Total: $240.000. ¿Confirmas?
- `wa-hogar-0161-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0161-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0161-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0161-msg-01 → _Hola 😊 necesito 3 unidades de cojín decorativo crema y 1 unidades de juego de toallas gris x3 y 2 unidades de almohada hotelera firme. ¿Cuán_ |
| `barrio` | Palermo | wa-hogar-0161-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0161. Queda a nombre de Ana Castro._ |
| `tienda` | Casa Ficticia | wa-hogar-0161-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Ana Castro | wa-hogar-0161-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0161. Queda a nombre de Ana Castro._ |
| `metodo_pago` | nequi | wa-hogar-0161-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 224000/16000/240000 | wa-hogar-0161-msg-04 → _El subtotal es $224.000, domicilio $16.000. Total: $240.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo crema (cant 3); juego de toallas gris x3 (cant 1); almohada hotelera firme (cant 2) | wa-hogar-0161-msg-01 → _Hola 😊 necesito 3 unidades de cojín decorativo crema y 1 unidades de juego de toallas gris x3 y 2 unidades de almohada hotelera firme. ¿Cuán_ |

## wa-hogar-0162 — Carlos Castro · `confirmado`

**Conversación original** (7 mensajes):
- `wa-hogar-0162-msg-01` **Cliente**: ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Cartagena?
- `wa-hogar-0162-msg-02` **Cliente**: Ah y si hay color crema mejor 🙏
- `wa-hogar-0162-msg-03` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0162-msg-04` **Cliente**: Sí, barrio Manga. Punto de entrega de prueba HOG-0162. Queda a nombre de Carlos Castro.
- `wa-hogar-0162-msg-05` **Tienda**: El subtotal es $56.000, domicilio $14.000. Total: $70.000. ¿Confirmas?
- `wa-hogar-0162-msg-06` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0162-msg-07` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0162-msg-07 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0162-msg-01 → _ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Cartagena?_ |
| `barrio` | Manga | wa-hogar-0162-msg-04 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0162. Queda a nombre de Carlos Castro._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0162-msg-03 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Carlos Castro | wa-hogar-0162-msg-04 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0162. Queda a nombre de Carlos Castro._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0162-msg-06 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 56000/14000/70000 | wa-hogar-0162-msg-05 → _El subtotal es $56.000, domicilio $14.000. Total: $70.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón doble (cant 1) | wa-hogar-0162-msg-01 → _ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Cartagena?_ |
| `color_crema_pendiente` | sí (sin confirmación) | wa-hogar-0162-msg-02 → _Ah y si hay color crema mejor 🙏_ |

## wa-hogar-0163 — Diana Castro · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0163-msg-01` **Cliente**: Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Medellín?
- `wa-hogar-0163-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0163-msg-03` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0163. Queda a nombre de Diana Castro.
- `wa-hogar-0163-msg-04` **Tienda**: El subtotal es $314.000, domicilio $12.000. Total: $326.000. ¿Confirmas?
- `wa-hogar-0163-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0163-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0163-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0163-msg-01 → _Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Me_ |
| `barrio` | Laureles | wa-hogar-0163-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0163. Queda a nombre de Diana Castro._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0163-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Diana Castro | wa-hogar-0163-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0163. Queda a nombre de Diana Castro._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0163-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 314000/12000/326000 | wa-hogar-0163-msg-04 → _El subtotal es $314.000, domicilio $12.000. Total: $326.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 140x220 beige (cant 2); cojín decorativo terracota (cant 3) | wa-hogar-0163-msg-01 → _Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Me_ |

## wa-hogar-0164 — Felipe Castro · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0164-msg-01` **Cliente**: Buen día, quisiera 3 unidades de tapete de baño beige y 1 unidades de protector de colchón queen y 2 unidades de cobija térmica doble gris. ¿Cuánto queda para Ibagué?
- `wa-hogar-0164-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0164-msg-03` **Cliente**: Sí, barrio La Pola. Punto de entrega de prueba HOG-0164. Queda a nombre de Felipe Castro.
- `wa-hogar-0164-msg-04` **Tienda**: El subtotal es $330.000, domicilio $16.000. Total: $346.000. ¿Confirmas?
- `wa-hogar-0164-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0164-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0164-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0164-msg-01 → _Buen día, quisiera 3 unidades de tapete de baño beige y 1 unidades de protector de colchón queen y 2 unidades de cobija térmica doble gris._ |
| `barrio` | La Pola | wa-hogar-0164-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0164. Queda a nombre de Felipe Castro._ |
| `tienda` | Textiles de Prueba | wa-hogar-0164-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Felipe Castro | wa-hogar-0164-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0164. Queda a nombre de Felipe Castro._ |
| `metodo_pago` | daviplata | wa-hogar-0164-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 330000/16000/346000 | wa-hogar-0164-msg-04 → _El subtotal es $330.000, domicilio $16.000. Total: $346.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño beige (cant 3); protector de colchón queen (cant 1); cobija térmica doble gris (cant 2) | wa-hogar-0164-msg-01 → _Buen día, quisiera 3 unidades de tapete de baño beige y 1 unidades de protector de colchón queen y 2 unidades de cobija térmica doble gris._ |

## wa-hogar-0165 — Laura Castro · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0165-msg-01` **Cliente**: Hola, si almohada hotelera no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0165-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0165-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0165-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0165-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0165-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0166 — Mateo Castro · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0166-msg-01` **Cliente**: Holaa, necesito 2 unidades de juego de sábanas queen blancas y 3 unidades de tapete de baño verde. ¿Cuánto queda para Cali?
- `wa-hogar-0166-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0166-msg-03` **Cliente**: Sí, barrio San Fernando. Punto de entrega de prueba HOG-0166. Queda a nombre de Mateo Castro.
- `wa-hogar-0166-msg-04` **Tienda**: El subtotal es $252.000, domicilio $13.000. Total: $265.000. ¿Confirmas?
- `wa-hogar-0166-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0166-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0166-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0166-msg-01 → _Holaa, necesito 2 unidades de juego de sábanas queen blancas y 3 unidades de tapete de baño verde. ¿Cuánto queda para Cali?_ |
| `barrio` | San Fernando | wa-hogar-0166-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0166. Queda a nombre de Mateo Castro._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0166-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Mateo Castro | wa-hogar-0166-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0166. Queda a nombre de Mateo Castro._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0166-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 252000/13000/265000 | wa-hogar-0166-msg-04 → _El subtotal es $252.000, domicilio $13.000. Total: $265.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas queen blancas (cant 2); tapete de baño verde (cant 3) | wa-hogar-0166-msg-01 → _Holaa, necesito 2 unidades de juego de sábanas queen blancas y 3 unidades de tapete de baño verde. ¿Cuánto queda para Cali?_ |

## wa-hogar-0167 — Natalia Castro · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0167-msg-01` **Cliente**: Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0167-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0167-msg-03` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0167. Queda a nombre de Natalia Castro.
- `wa-hogar-0167-msg-04` **Tienda**: El subtotal es $455.000, domicilio $18.000. Total: $473.000. ¿Confirmas?
- `wa-hogar-0167-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0167-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0167-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0167-msg-01 → _Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220_ |
| `barrio` | Bavaria | wa-hogar-0167-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0167. Queda a nombre de Natalia Castro._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0167-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Natalia Castro | wa-hogar-0167-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0167. Queda a nombre de Natalia Castro._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0167-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 455000/18000/473000 | wa-hogar-0167-msg-04 → _El subtotal es $455.000, domicilio $18.000. Total: $473.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas arena x2 (cant 3); almohada hotelera media (cant 1); cortina blackout 140x220 gris (cant 2) | wa-hogar-0167-msg-01 → _Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220_ |

## wa-hogar-0168 — Santiago Castro · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0168-msg-01` **Cliente**: Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Pereira?
- `wa-hogar-0168-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0168-msg-03` **Cliente**: Sí, en Álamos, a nombre de Santiago Castro. Perdón: la cobija térmica la quiero en otra referencia, queen beige.
- `wa-hogar-0168-msg-04` **Tienda**: El subtotal es $89.000, domicilio $12.000. Total: $101.000. ¿Confirmas?
- `wa-hogar-0168-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0168-msg-06` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0168-msg-06 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0168-msg-01 → _Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Pereira?_ |
| `barrio` | Álamos | wa-hogar-0168-msg-03 → _Sí, en Álamos, a nombre de Santiago Castro. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |
| `tienda` | Textiles de Prueba | wa-hogar-0168-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Santiago Castro | wa-hogar-0168-msg-03 → _Sí, en Álamos, a nombre de Santiago Castro. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |
| `metodo_pago` | daviplata | wa-hogar-0168-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 89000/12000/101000 | wa-hogar-0168-msg-04 → _El subtotal es $89.000, domicilio $12.000. Total: $101.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica queen beige (cant 1) | wa-hogar-0168-msg-01 → _Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Pereira?_ |
| `referencia_corregida` | sí | wa-hogar-0168-msg-03 → _Sí, en Álamos, a nombre de Santiago Castro. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |

## wa-hogar-0169 — Valentina Castro · `pendiente`

**Conversación original** (6 mensajes):
- `wa-hogar-0169-msg-01` **Cliente**: Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0169-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0169-msg-03` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0169. Queda a nombre de Valentina Castro.
- `wa-hogar-0169-msg-04` **Tienda**: El subtotal es $242.000, domicilio $15.000. Total: $257.000. ¿Confirmas?
- `wa-hogar-0169-msg-05` **Cliente**: Déjamelo pendiente mientras confirmo la dirección, porfa.
- `wa-hogar-0169-msg-06` **Tienda**: Claro, queda pendiente y no se despacha todavía.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | pendiente | wa-hogar-0169-msg-06 → _Claro, queda pendiente y no se despacha todavía._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0169-msg-01 → _Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Barranquilla?_ |
| `barrio` | El Prado | wa-hogar-0169-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0169. Queda a nombre de Valentina Castro._ |
| `tienda` | Casa Ficticia | wa-hogar-0169-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Valentina Castro | wa-hogar-0169-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0169. Queda a nombre de Valentina Castro._ |
| `subtotal/domicilio/total` | 242000/15000/257000 | wa-hogar-0169-msg-04 → _El subtotal es $242.000, domicilio $15.000. Total: $257.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo verde oliva (cant 2); juego de toallas blancas x3 (cant 3) | wa-hogar-0169-msg-01 → _Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Barranquilla?_ |

## wa-hogar-0170 — Andrés Castro · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0170-msg-01` **Cliente**: Hola, si protector de colchón no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0170-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0170-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $13.000?
- `wa-hogar-0170-msg-04` **Tienda**: Sí, el envío estándar cuesta $13.000. ¿Deseas hacer el pedido?
- `wa-hogar-0170-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0170-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0170-msg-03 → _¿Y el domicilio a Suba queda en $13.000?_ |
| `costo_envio_estandar` | 13000 | wa-hogar-0170-msg-04 → _Sí, el envío estándar cuesta $13.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0171 — Camila Castro · `confirmado`

**Conversación original** (7 mensajes):
- `wa-hogar-0171-msg-01` **Cliente**: Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Manizales?
- `wa-hogar-0171-msg-02` **Cliente**: Ah y si hay color crema mejor 🙏
- `wa-hogar-0171-msg-03` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0171-msg-04` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0171. Queda a nombre de Camila Castro.
- `wa-hogar-0171-msg-05` **Tienda**: El subtotal es $115.000, domicilio $12.000. Total: $127.000. ¿Confirmas?
- `wa-hogar-0171-msg-06` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0171-msg-07` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0171-msg-07 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0171-msg-01 → _Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Manizales?_ |
| `barrio` | Palermo | wa-hogar-0171-msg-04 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0171. Queda a nombre de Camila Castro._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0171-msg-03 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Camila Castro | wa-hogar-0171-msg-04 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0171. Queda a nombre de Camila Castro._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0171-msg-06 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 115000/12000/127000 | wa-hogar-0171-msg-05 → _El subtotal es $115.000, domicilio $12.000. Total: $127.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 140x220 gris (cant 1) | wa-hogar-0171-msg-01 → _Buenas tardes, estoy buscando 1 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Manizales?_ |
| `color_crema_pendiente` | sí (sin confirmación) | wa-hogar-0171-msg-02 → _Ah y si hay color crema mejor 🙏_ |

## wa-hogar-0172 — Julián Castro · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0172-msg-01` **Cliente**: Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Cartagena?
- `wa-hogar-0172-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0172-msg-03` **Cliente**: Sí, barrio Manga. Punto de entrega de prueba HOG-0172. Queda a nombre de Julián Castro.
- `wa-hogar-0172-msg-04` **Tienda**: El subtotal es $232.000, domicilio $16.000. Total: $248.000. ¿Confirmas?
- `wa-hogar-0172-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0172-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0172-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0172-msg-01 → _Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Cartagena?_ |
| `barrio` | Manga | wa-hogar-0172-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0172. Queda a nombre de Julián Castro._ |
| `tienda` | Textiles de Prueba | wa-hogar-0172-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Julián Castro | wa-hogar-0172-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0172. Queda a nombre de Julián Castro._ |
| `metodo_pago` | daviplata | wa-hogar-0172-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 232000/16000/248000 | wa-hogar-0172-msg-04 → _El subtotal es $232.000, domicilio $16.000. Total: $248.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño gris (cant 2); protector de colchón doble (cant 3) | wa-hogar-0172-msg-01 → _Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Cartagena?_ |

## wa-hogar-0173 — Marcela Castro · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0173-msg-01` **Cliente**: Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativo terracota. ¿Cuánto queda para Medellín?
- `wa-hogar-0173-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0173-msg-03` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0173. Queda a nombre de Marcela Castro.
- `wa-hogar-0173-msg-04` **Tienda**: El subtotal es $288.000, domicilio $14.000. Total: $302.000. ¿Confirmas?
- `wa-hogar-0173-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0173-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0173-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0173-msg-01 → _Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativ_ |
| `barrio` | Laureles | wa-hogar-0173-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0173. Queda a nombre de Marcela Castro._ |
| `tienda` | Casa Ficticia | wa-hogar-0173-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Marcela Castro | wa-hogar-0173-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0173. Queda a nombre de Marcela Castro._ |
| `metodo_pago` | nequi | wa-hogar-0173-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 288000/14000/302000 | wa-hogar-0173-msg-04 → _El subtotal es $288.000, domicilio $14.000. Total: $302.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera suave (cant 3); cortina blackout 140x220 beige (cant 1); cojín decorativo terracota (cant 2) | wa-hogar-0173-msg-01 → _Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativ_ |

## wa-hogar-0174 — Nicolás Castro · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0174-msg-01` **Cliente**: Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Ibagué?
- `wa-hogar-0174-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0174-msg-03` **Cliente**: Sí, barrio La Pola. Punto de entrega de prueba HOG-0174. Queda a nombre de Nicolás Castro.
- `wa-hogar-0174-msg-04` **Tienda**: El subtotal es $78.000, domicilio $12.000. Total: $90.000. ¿Confirmas?
- `wa-hogar-0174-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0174-msg-06` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0174-msg-06 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0174-msg-01 → _Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Ibagué?_ |
| `barrio` | La Pola | wa-hogar-0174-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0174. Queda a nombre de Nicolás Castro._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0174-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Nicolás Castro | wa-hogar-0174-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0174. Queda a nombre de Nicolás Castro._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0174-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 78000/12000/90000 | wa-hogar-0174-msg-04 → _El subtotal es $78.000, domicilio $12.000. Total: $90.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas doble algodón (cant 1) | wa-hogar-0174-msg-01 → _Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Ibagué?_ |

## wa-hogar-0175 — Paola Castro · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0175-msg-01` **Cliente**: Hola, si juego de toallas no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0175-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0175-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0175-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0175-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0175-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0176 — Sebastián Castro · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0176-msg-01` **Cliente**: Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño verde. ¿Cuánto queda para Cali?
- `wa-hogar-0176-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0176-msg-03` **Cliente**: Sí, en San Fernando, a nombre de Sebastián Castro. Perdón: la cobija térmica la quiero en otra referencia, doble gris.
- `wa-hogar-0176-msg-04` **Tienda**: El subtotal es $409.000, domicilio $15.000. Total: $424.000. ¿Confirmas?
- `wa-hogar-0176-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0176-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0176-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0176-msg-01 → _Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño_ |
| `barrio` | San Fernando | wa-hogar-0176-msg-03 → _Sí, en San Fernando, a nombre de Sebastián Castro. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |
| `tienda` | Textiles de Prueba | wa-hogar-0176-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Sebastián Castro | wa-hogar-0176-msg-03 → _Sí, en San Fernando, a nombre de Sebastián Castro. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |
| `metodo_pago` | daviplata | wa-hogar-0176-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 409000/15000/424000 | wa-hogar-0176-msg-04 → _El subtotal es $409.000, domicilio $15.000. Total: $424.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica doble gris (cant 3); juego de sábanas queen blancas (cant 1); tapete de baño verde (cant 2) | wa-hogar-0176-msg-01 → _Hola, quiero pedir 3 unidades de cobija térmica sencilla azul y 1 unidades de juego de sábanas queen blancas y 2 unidades de tapete de baño_ |
| `referencia_corregida` | sí | wa-hogar-0176-msg-03 → _Sí, en San Fernando, a nombre de Sebastián Castro. Perdón: la cobija térmica la quiero en otra referencia, doble gris._ |

## wa-hogar-0177 — Tatiana Castro · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0177-msg-01` **Cliente**: Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0177-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0177-msg-03` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0177. Queda a nombre de Tatiana Castro.
- `wa-hogar-0177-msg-04` **Tienda**: El subtotal es $28.000, domicilio $14.000. Total: $42.000. ¿Confirmas?
- `wa-hogar-0177-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0177-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0177-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0177-msg-01 → _Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Santa Marta?_ |
| `barrio` | Bavaria | wa-hogar-0177-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0177. Queda a nombre de Tatiana Castro._ |
| `tienda` | Casa Ficticia | wa-hogar-0177-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Tatiana Castro | wa-hogar-0177-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0177. Queda a nombre de Tatiana Castro._ |
| `metodo_pago` | nequi | wa-hogar-0177-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 28000/14000/42000 | wa-hogar-0177-msg-04 → _El subtotal es $28.000, domicilio $14.000. Total: $42.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo terracota (cant 1) | wa-hogar-0177-msg-01 → _Hola 😊 necesito 1 unidades de cojín decorativo terracota. ¿Cuánto queda para Santa Marta?_ |

## wa-hogar-0178 — Daniel Castro · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0178-msg-01` **Cliente**: ola, quiero comprar 2 unidades de protector de colchón queen y 3 unidades de cobija térmica doble gris. ¿Cuánto queda para Pereira?
- `wa-hogar-0178-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0178-msg-03` **Cliente**: Sí, barrio Álamos. Punto de entrega de prueba HOG-0178. Queda a nombre de Daniel Castro.
- `wa-hogar-0178-msg-04` **Tienda**: El subtotal es $379.000, domicilio $14.000. Total: $393.000. ¿Confirmas?
- `wa-hogar-0178-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0178-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0178-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0178-msg-01 → _ola, quiero comprar 2 unidades de protector de colchón queen y 3 unidades de cobija térmica doble gris. ¿Cuánto queda para Pereira?_ |
| `barrio` | Álamos | wa-hogar-0178-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0178. Queda a nombre de Daniel Castro._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0178-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Daniel Castro | wa-hogar-0178-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0178. Queda a nombre de Daniel Castro._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0178-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 379000/14000/393000 | wa-hogar-0178-msg-04 → _El subtotal es $379.000, domicilio $14.000. Total: $393.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón queen (cant 2); cobija térmica doble gris (cant 3) | wa-hogar-0178-msg-01 → _ola, quiero comprar 2 unidades de protector de colchón queen y 3 unidades de cobija térmica doble gris. ¿Cuánto queda para Pereira?_ |

## wa-hogar-0179 — Gabriela Castro · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0179-msg-01` **Cliente**: Buenas tardes, estoy buscando 3 unidades de cortina blackout 200x220 azul y 1 unidades de cojín decorativo verde oliva y 2 unidades de juego de toallas blancas x3. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0179-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0179-msg-03` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0179. Queda a nombre de Gabriela Castro.
- `wa-hogar-0179-msg-04` **Tienda**: El subtotal es $497.000, domicilio $17.000. Total: $514.000. ¿Confirmas?
- `wa-hogar-0179-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0179-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0179-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0179-msg-01 → _Buenas tardes, estoy buscando 3 unidades de cortina blackout 200x220 azul y 1 unidades de cojín decorativo verde oliva y 2 unidades de juego_ |
| `barrio` | El Prado | wa-hogar-0179-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0179. Queda a nombre de Gabriela Castro._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0179-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Gabriela Castro | wa-hogar-0179-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0179. Queda a nombre de Gabriela Castro._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0179-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 497000/17000/514000 | wa-hogar-0179-msg-04 → _El subtotal es $497.000, domicilio $17.000. Total: $514.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 200x220 azul (cant 3); cojín decorativo verde oliva (cant 1); juego de toallas blancas x3 (cant 2) | wa-hogar-0179-msg-01 → _Buenas tardes, estoy buscando 3 unidades de cortina blackout 200x220 azul y 1 unidades de cojín decorativo verde oliva y 2 unidades de juego_ |

## wa-hogar-0180 — Ricardo Castro · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0180-msg-01` **Cliente**: Hola, si tapete de baño no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0180-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0180-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $9.000?
- `wa-hogar-0180-msg-04` **Tienda**: Sí, el envío estándar cuesta $9.000. ¿Deseas hacer el pedido?
- `wa-hogar-0180-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0180-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0180-msg-03 → _¿Y el domicilio a Suba queda en $9.000?_ |
| `costo_envio_estandar` | 9000 | wa-hogar-0180-msg-04 → _Sí, el envío estándar cuesta $9.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0181 — Ana Moreno · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0181-msg-01` **Cliente**: Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Manizales?
- `wa-hogar-0181-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0181-msg-03` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0181. Queda a nombre de Ana Moreno.
- `wa-hogar-0181-msg-04` **Tienda**: El subtotal es $423.000, domicilio $14.000. Total: $437.000. ¿Confirmas?
- `wa-hogar-0181-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0181-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0181-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0181-msg-01 → _Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Manizales?_ |
| `barrio` | Palermo | wa-hogar-0181-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0181. Queda a nombre de Ana Moreno._ |
| `tienda` | Casa Ficticia | wa-hogar-0181-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Ana Moreno | wa-hogar-0181-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0181. Queda a nombre de Ana Moreno._ |
| `metodo_pago` | nequi | wa-hogar-0181-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 423000/14000/437000 | wa-hogar-0181-msg-04 → _El subtotal es $423.000, domicilio $14.000. Total: $437.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera media (cant 2); cortina blackout 140x220 gris (cant 3) | wa-hogar-0181-msg-01 → _Hola! tienen disponible 2 unidades de almohada hotelera media y 3 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Manizales?_ |

## wa-hogar-0182 — Carlos Moreno · `pendiente`

**Conversación original** (6 mensajes):
- `wa-hogar-0182-msg-01` **Cliente**: Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón doble. ¿Cuánto queda para Cartagena?
- `wa-hogar-0182-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0182-msg-03` **Cliente**: Sí, barrio Manga. Punto de entrega de prueba HOG-0182. Queda a nombre de Carlos Moreno.
- `wa-hogar-0182-msg-04` **Tienda**: El subtotal es $378.000, domicilio $18.000. Total: $396.000. ¿Confirmas?
- `wa-hogar-0182-msg-05` **Cliente**: Déjamelo pendiente mientras confirmo la dirección, porfa.
- `wa-hogar-0182-msg-06` **Tienda**: Claro, queda pendiente y no se despacha todavía.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | pendiente | wa-hogar-0182-msg-06 → _Claro, queda pendiente y no se despacha todavía._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0182-msg-01 → _Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón_ |
| `barrio` | Manga | wa-hogar-0182-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0182. Queda a nombre de Carlos Moreno._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0182-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Carlos Moreno | wa-hogar-0182-msg-03 → _Sí, barrio Manga. Punto de entrega de prueba HOG-0182. Queda a nombre de Carlos Moreno._ |
| `subtotal/domicilio/total` | 378000/18000/396000 | wa-hogar-0182-msg-04 → _El subtotal es $378.000, domicilio $18.000. Total: $396.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas sencillas estampadas (cant 3); tapete de baño gris (cant 1); protector de colchón doble (cant 2) | wa-hogar-0182-msg-01 → _Holaa, necesito 3 unidades de juego de sábanas sencillas estampadas y 1 unidades de tapete de baño gris y 2 unidades de protector de colchón_ |

## wa-hogar-0183 — Diana Moreno · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0183-msg-01` **Cliente**: Buenas, me regalas 1 unidades de juego de toallas blancas x3. ¿Cuánto queda para Medellín?
- `wa-hogar-0183-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0183-msg-03` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0183. Queda a nombre de Diana Moreno.
- `wa-hogar-0183-msg-04` **Tienda**: El subtotal es $62.000, domicilio $10.000. Total: $72.000. ¿Confirmas?
- `wa-hogar-0183-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0183-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0183-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0183-msg-01 → _Buenas, me regalas 1 unidades de juego de toallas blancas x3. ¿Cuánto queda para Medellín?_ |
| `barrio` | Laureles | wa-hogar-0183-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0183. Queda a nombre de Diana Moreno._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0183-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Diana Moreno | wa-hogar-0183-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0183. Queda a nombre de Diana Moreno._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0183-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 62000/10000/72000 | wa-hogar-0183-msg-04 → _El subtotal es $62.000, domicilio $10.000. Total: $72.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas blancas x3 (cant 1) | wa-hogar-0183-msg-01 → _Buenas, me regalas 1 unidades de juego de toallas blancas x3. ¿Cuánto queda para Medellín?_ |

## wa-hogar-0184 — Felipe Moreno · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0184-msg-01` **Cliente**: Hola, quiero pedir 2 unidades de cobija térmica queen beige y 3 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Ibagué?
- `wa-hogar-0184-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0184-msg-03` **Cliente**: Sí, en La Pola, a nombre de Felipe Moreno. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul.
- `wa-hogar-0184-msg-04` **Tienda**: El subtotal es $412.000, domicilio $14.000. Total: $426.000. ¿Confirmas?
- `wa-hogar-0184-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0184-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0184-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0184-msg-01 → _Hola, quiero pedir 2 unidades de cobija térmica queen beige y 3 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Ibagué?_ |
| `barrio` | La Pola | wa-hogar-0184-msg-03 → _Sí, en La Pola, a nombre de Felipe Moreno. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul._ |
| `tienda` | Textiles de Prueba | wa-hogar-0184-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Felipe Moreno | wa-hogar-0184-msg-03 → _Sí, en La Pola, a nombre de Felipe Moreno. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul._ |
| `metodo_pago` | daviplata | wa-hogar-0184-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 412000/14000/426000 | wa-hogar-0184-msg-04 → _El subtotal es $412.000, domicilio $14.000. Total: $426.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica sencilla azul (cant 2); juego de sábanas doble algodón (cant 3) | wa-hogar-0184-msg-01 → _Hola, quiero pedir 2 unidades de cobija térmica queen beige y 3 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Ibagué?_ |
| `referencia_corregida` | sí | wa-hogar-0184-msg-03 → _Sí, en La Pola, a nombre de Felipe Moreno. Perdón: la cobija térmica la quiero en otra referencia, sencilla azul._ |

## wa-hogar-0185 — Laura Moreno · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0185-msg-01` **Cliente**: Hola, si cojín decorativo no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0185-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0185-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0185-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0185-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0185-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0186 — Mateo Moreno · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0186-msg-01` **Cliente**: ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Cali?
- `wa-hogar-0186-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0186-msg-03` **Cliente**: Sí, barrio San Fernando. Punto de entrega de prueba HOG-0186. Queda a nombre de Mateo Moreno.
- `wa-hogar-0186-msg-04` **Tienda**: El subtotal es $56.000, domicilio $11.000. Total: $67.000. ¿Confirmas?
- `wa-hogar-0186-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0186-msg-06` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0186-msg-06 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0186-msg-01 → _ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Cali?_ |
| `barrio` | San Fernando | wa-hogar-0186-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0186. Queda a nombre de Mateo Moreno._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0186-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Mateo Moreno | wa-hogar-0186-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0186. Queda a nombre de Mateo Moreno._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0186-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 56000/11000/67000 | wa-hogar-0186-msg-04 → _El subtotal es $56.000, domicilio $11.000. Total: $67.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón doble (cant 1) | wa-hogar-0186-msg-01 → _ola, quiero comprar 1 unidades de protector de colchón doble. ¿Cuánto queda para Cali?_ |

## wa-hogar-0187 — Natalia Moreno · `cancelado`

**Conversación original** (6 mensajes):
- `wa-hogar-0187-msg-01` **Cliente**: Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0187-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0187-msg-03` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0187. Queda a nombre de Natalia Moreno.
- `wa-hogar-0187-msg-04` **Tienda**: El subtotal es $314.000, domicilio $16.000. Total: $330.000. ¿Confirmas?
- `wa-hogar-0187-msg-05` **Cliente**: No, mejor cancélalo por ahora. Gracias.
- `wa-hogar-0187-msg-06` **Tienda**: Entendido, no se genera el pedido.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | cancelado | wa-hogar-0187-msg-06 → _Entendido, no se genera el pedido._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0187-msg-01 → _Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Sa_ |
| `barrio` | Bavaria | wa-hogar-0187-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0187. Queda a nombre de Natalia Moreno._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0187-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Natalia Moreno | wa-hogar-0187-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0187. Queda a nombre de Natalia Moreno._ |
| `subtotal/domicilio/total` | 314000/16000/330000 | wa-hogar-0187-msg-04 → _El subtotal es $314.000, domicilio $16.000. Total: $330.000. ¿Confirmas?_ |
| `productos (líneas)` | cortina blackout 140x220 beige (cant 2); cojín decorativo terracota (cant 3) | wa-hogar-0187-msg-01 → _Buenas tardes, estoy buscando 2 unidades de cortina blackout 140x220 beige y 3 unidades de cojín decorativo terracota. ¿Cuánto queda para Sa_ |

## wa-hogar-0188 — Santiago Moreno · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0188-msg-01` **Cliente**: Buen día, quisiera 3 unidades de tapete de baño beige y 1 unidades de protector de colchón queen y 2 unidades de cobija térmica doble gris. ¿Cuánto queda para Pereira?
- `wa-hogar-0188-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0188-msg-03` **Cliente**: Sí, barrio Álamos. Punto de entrega de prueba HOG-0188. Queda a nombre de Santiago Moreno.
- `wa-hogar-0188-msg-04` **Tienda**: El subtotal es $330.000, domicilio $16.000. Total: $346.000. ¿Confirmas?
- `wa-hogar-0188-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0188-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0188-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0188-msg-01 → _Buen día, quisiera 3 unidades de tapete de baño beige y 1 unidades de protector de colchón queen y 2 unidades de cobija térmica doble gris._ |
| `barrio` | Álamos | wa-hogar-0188-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0188. Queda a nombre de Santiago Moreno._ |
| `tienda` | Textiles de Prueba | wa-hogar-0188-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Santiago Moreno | wa-hogar-0188-msg-03 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0188. Queda a nombre de Santiago Moreno._ |
| `metodo_pago` | daviplata | wa-hogar-0188-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 330000/16000/346000 | wa-hogar-0188-msg-04 → _El subtotal es $330.000, domicilio $16.000. Total: $346.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño beige (cant 3); protector de colchón queen (cant 1); cobija térmica doble gris (cant 2) | wa-hogar-0188-msg-01 → _Buen día, quisiera 3 unidades de tapete de baño beige y 1 unidades de protector de colchón queen y 2 unidades de cobija térmica doble gris._ |

## wa-hogar-0189 — Valentina Moreno · `confirmado`

**Conversación original** (7 mensajes):
- `wa-hogar-0189-msg-01` **Cliente**: Hola! tienen disponible 1 unidades de almohada hotelera firme. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0189-msg-02` **Cliente**: Ah y si hay color crema mejor 🙏
- `wa-hogar-0189-msg-03` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0189-msg-04` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0189. Queda a nombre de Valentina Moreno.
- `wa-hogar-0189-msg-05` **Tienda**: El subtotal es $39.000, domicilio $13.000. Total: $52.000. ¿Confirmas?
- `wa-hogar-0189-msg-06` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0189-msg-07` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0189-msg-07 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0189-msg-01 → _Hola! tienen disponible 1 unidades de almohada hotelera firme. ¿Cuánto queda para Barranquilla?_ |
| `barrio` | El Prado | wa-hogar-0189-msg-04 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0189. Queda a nombre de Valentina Moreno._ |
| `tienda` | Casa Ficticia | wa-hogar-0189-msg-03 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Valentina Moreno | wa-hogar-0189-msg-04 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0189. Queda a nombre de Valentina Moreno._ |
| `metodo_pago` | nequi | wa-hogar-0189-msg-06 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 39000/13000/52000 | wa-hogar-0189-msg-05 → _El subtotal es $39.000, domicilio $13.000. Total: $52.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera firme (cant 1) | wa-hogar-0189-msg-01 → _Hola! tienen disponible 1 unidades de almohada hotelera firme. ¿Cuánto queda para Barranquilla?_ |
| `color_crema_pendiente` | sí (sin confirmación) | wa-hogar-0189-msg-02 → _Ah y si hay color crema mejor 🙏_ |

## wa-hogar-0190 — Andrés Moreno · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0190-msg-01` **Cliente**: Hola, si juego de sábanas no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0190-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0190-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $11.000?
- `wa-hogar-0190-msg-04` **Tienda**: Sí, el envío estándar cuesta $11.000. ¿Deseas hacer el pedido?
- `wa-hogar-0190-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0190-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0190-msg-03 → _¿Y el domicilio a Suba queda en $11.000?_ |
| `costo_envio_estandar` | 11000 | wa-hogar-0190-msg-04 → _Sí, el envío estándar cuesta $11.000. ¿Deseas hacer el pedido?_ |

## wa-hogar-0191 — Camila Moreno · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0191-msg-01` **Cliente**: Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220 gris. ¿Cuánto queda para Manizales?
- `wa-hogar-0191-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?
- `wa-hogar-0191-msg-03` **Cliente**: Sí, barrio Palermo. Punto de entrega de prueba HOG-0191. Queda a nombre de Camila Moreno.
- `wa-hogar-0191-msg-04` **Tienda**: El subtotal es $455.000, domicilio $16.000. Total: $471.000. ¿Confirmas?
- `wa-hogar-0191-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0191-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0191-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Manizales | wa-hogar-0191-msg-01 → _Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220_ |
| `barrio` | Palermo | wa-hogar-0191-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0191. Queda a nombre de Camila Moreno._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0191-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en Palermo y a nombre de quién queda el pedido?_ |
| `destinatario` | Camila Moreno | wa-hogar-0191-msg-03 → _Sí, barrio Palermo. Punto de entrega de prueba HOG-0191. Queda a nombre de Camila Moreno._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0191-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 455000/16000/471000 | wa-hogar-0191-msg-04 → _El subtotal es $455.000, domicilio $16.000. Total: $471.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas arena x2 (cant 3); almohada hotelera media (cant 1); cortina blackout 140x220 gris (cant 2) | wa-hogar-0191-msg-01 → _Buenas, me regalas 3 unidades de juego de toallas arena x2 y 1 unidades de almohada hotelera media y 2 unidades de cortina blackout 140x220_ |

## wa-hogar-0192 — Julián Moreno · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0192-msg-01` **Cliente**: Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Cartagena?
- `wa-hogar-0192-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?
- `wa-hogar-0192-msg-03` **Cliente**: Sí, en Manga, a nombre de Julián Moreno. Perdón: la cobija térmica la quiero en otra referencia, queen beige.
- `wa-hogar-0192-msg-04` **Tienda**: El subtotal es $89.000, domicilio $14.000. Total: $103.000. ¿Confirmas?
- `wa-hogar-0192-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0192-msg-06` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0192-msg-06 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cartagena | wa-hogar-0192-msg-01 → _Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Cartagena?_ |
| `barrio` | Manga | wa-hogar-0192-msg-03 → _Sí, en Manga, a nombre de Julián Moreno. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |
| `tienda` | Textiles de Prueba | wa-hogar-0192-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en Manga y a nombre de quién queda el pedido?_ |
| `destinatario` | Julián Moreno | wa-hogar-0192-msg-03 → _Sí, en Manga, a nombre de Julián Moreno. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |
| `metodo_pago` | daviplata | wa-hogar-0192-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 89000/14000/103000 | wa-hogar-0192-msg-04 → _El subtotal es $89.000, domicilio $14.000. Total: $103.000. ¿Confirmas?_ |
| `productos (líneas)` | cobija térmica queen beige (cant 1) | wa-hogar-0192-msg-01 → _Hola, quiero pedir 1 unidades de cobija térmica doble gris. ¿Cuánto queda para Cartagena?_ |
| `referencia_corregida` | sí | wa-hogar-0192-msg-03 → _Sí, en Manga, a nombre de Julián Moreno. Perdón: la cobija térmica la quiero en otra referencia, queen beige._ |

## wa-hogar-0193 — Marcela Moreno · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0193-msg-01` **Cliente**: Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Medellín?
- `wa-hogar-0193-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?
- `wa-hogar-0193-msg-03` **Cliente**: Sí, barrio Laureles. Punto de entrega de prueba HOG-0193. Queda a nombre de Marcela Moreno.
- `wa-hogar-0193-msg-04` **Tienda**: El subtotal es $242.000, domicilio $12.000. Total: $254.000. ¿Confirmas?
- `wa-hogar-0193-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0193-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0193-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Medellín | wa-hogar-0193-msg-01 → _Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Medellín?_ |
| `barrio` | Laureles | wa-hogar-0193-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0193. Queda a nombre de Marcela Moreno._ |
| `tienda` | Casa Ficticia | wa-hogar-0193-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Laureles y a nombre de quién queda el pedido?_ |
| `destinatario` | Marcela Moreno | wa-hogar-0193-msg-03 → _Sí, barrio Laureles. Punto de entrega de prueba HOG-0193. Queda a nombre de Marcela Moreno._ |
| `metodo_pago` | nequi | wa-hogar-0193-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 242000/12000/254000 | wa-hogar-0193-msg-04 → _El subtotal es $242.000, domicilio $12.000. Total: $254.000. ¿Confirmas?_ |
| `productos (líneas)` | cojín decorativo verde oliva (cant 2); juego de toallas blancas x3 (cant 3) | wa-hogar-0193-msg-01 → _Hola 😊 necesito 2 unidades de cojín decorativo verde oliva y 3 unidades de juego de toallas blancas x3. ¿Cuánto queda para Medellín?_ |

## wa-hogar-0194 — Nicolás Moreno · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0194-msg-01` **Cliente**: ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Ibagué?
- `wa-hogar-0194-msg-02` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?
- `wa-hogar-0194-msg-03` **Cliente**: Sí, barrio La Pola. Punto de entrega de prueba HOG-0194. Queda a nombre de Nicolás Moreno.
- `wa-hogar-0194-msg-04` **Tienda**: El subtotal es $413.000, domicilio $16.000. Total: $429.000. ¿Confirmas?
- `wa-hogar-0194-msg-05` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0194-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0194-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Ibagué | wa-hogar-0194-msg-01 → _ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas_ |
| `barrio` | La Pola | wa-hogar-0194-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0194. Queda a nombre de Nicolás Moreno._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0194-msg-02 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en La Pola y a nombre de quién queda el pedido?_ |
| `destinatario` | Nicolás Moreno | wa-hogar-0194-msg-03 → _Sí, barrio La Pola. Punto de entrega de prueba HOG-0194. Queda a nombre de Nicolás Moreno._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0194-msg-05 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 413000/16000/429000 | wa-hogar-0194-msg-04 → _El subtotal es $413.000, domicilio $16.000. Total: $429.000. ¿Confirmas?_ |
| `productos (líneas)` | protector de colchón sencillo (cant 3); cobija térmica queen beige (cant 1); juego de sábanas doble algodón (cant 2) | wa-hogar-0194-msg-01 → _ola, quiero comprar 3 unidades de protector de colchón sencillo y 1 unidades de cobija térmica queen beige y 2 unidades de juego de sábanas_ |

## wa-hogar-0195 — Paola Moreno · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0195-msg-01` **Cliente**: Hola, si cortina blackout no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0195-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0195-msg-03` **Cliente**: Perfecto, muchas gracias por la información.
- `wa-hogar-0195-msg-04` **Tienda**: Con gusto. Escríbenos cuando quieras hacer el pedido.
- `wa-hogar-0195-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0195-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones | _(derivado de la composición de la conversación)_ |

## wa-hogar-0196 — Sebastián Moreno · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0196-msg-01` **Cliente**: Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Cali?
- `wa-hogar-0196-msg-02` **Tienda**: ¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?
- `wa-hogar-0196-msg-03` **Cliente**: Sí, barrio San Fernando. Punto de entrega de prueba HOG-0196. Queda a nombre de Sebastián Moreno.
- `wa-hogar-0196-msg-04` **Tienda**: El subtotal es $232.000, domicilio $13.000. Total: $245.000. ¿Confirmas?
- `wa-hogar-0196-msg-05` **Cliente**: sí, confirmado. Pago por Daviplata.
- `wa-hogar-0196-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0196-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Cali | wa-hogar-0196-msg-01 → _Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Cali?_ |
| `barrio` | San Fernando | wa-hogar-0196-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0196. Queda a nombre de Sebastián Moreno._ |
| `tienda` | Textiles de Prueba | wa-hogar-0196-msg-02 → _¡Hola! Te atiende Textiles de Prueba. Sí tenemos. ¿La entrega sería en San Fernando y a nombre de quién queda el pedido?_ |
| `destinatario` | Sebastián Moreno | wa-hogar-0196-msg-03 → _Sí, barrio San Fernando. Punto de entrega de prueba HOG-0196. Queda a nombre de Sebastián Moreno._ |
| `metodo_pago` | daviplata | wa-hogar-0196-msg-05 → _sí, confirmado. Pago por Daviplata._ |
| `subtotal/domicilio/total` | 232000/13000/245000 | wa-hogar-0196-msg-04 → _El subtotal es $232.000, domicilio $13.000. Total: $245.000. ¿Confirmas?_ |
| `productos (líneas)` | tapete de baño gris (cant 2); protector de colchón doble (cant 3) | wa-hogar-0196-msg-01 → _Buen día, quisiera 2 unidades de tapete de baño gris y 3 unidades de protector de colchón doble. ¿Cuánto queda para Cali?_ |

## wa-hogar-0197 — Tatiana Moreno · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0197-msg-01` **Cliente**: Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativo terracota. ¿Cuánto queda para Santa Marta?
- `wa-hogar-0197-msg-02` **Tienda**: ¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?
- `wa-hogar-0197-msg-03` **Cliente**: Sí, barrio Bavaria. Punto de entrega de prueba HOG-0197. Queda a nombre de Tatiana Moreno.
- `wa-hogar-0197-msg-04` **Tienda**: El subtotal es $288.000, domicilio $18.000. Total: $306.000. ¿Confirmas?
- `wa-hogar-0197-msg-05` **Cliente**: perfecto, confirmo el pedido. Pago por Nequi.
- `wa-hogar-0197-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0197-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Santa Marta | wa-hogar-0197-msg-01 → _Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativ_ |
| `barrio` | Bavaria | wa-hogar-0197-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0197. Queda a nombre de Tatiana Moreno._ |
| `tienda` | Casa Ficticia | wa-hogar-0197-msg-02 → _¡Hola! Te atiende Casa Ficticia. Sí tenemos. ¿La entrega sería en Bavaria y a nombre de quién queda el pedido?_ |
| `destinatario` | Tatiana Moreno | wa-hogar-0197-msg-03 → _Sí, barrio Bavaria. Punto de entrega de prueba HOG-0197. Queda a nombre de Tatiana Moreno._ |
| `metodo_pago` | nequi | wa-hogar-0197-msg-05 → _perfecto, confirmo el pedido. Pago por Nequi._ |
| `subtotal/domicilio/total` | 288000/18000/306000 | wa-hogar-0197-msg-04 → _El subtotal es $288.000, domicilio $18.000. Total: $306.000. ¿Confirmas?_ |
| `productos (líneas)` | almohada hotelera suave (cant 3); cortina blackout 140x220 beige (cant 1); cojín decorativo terracota (cant 2) | wa-hogar-0197-msg-01 → _Hola! tienen disponible 3 unidades de almohada hotelera suave y 1 unidades de cortina blackout 140x220 beige y 2 unidades de cojín decorativ_ |

## wa-hogar-0198 — Daniel Moreno · `confirmado`

**Conversación original** (7 mensajes):
- `wa-hogar-0198-msg-01` **Cliente**: Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Pereira?
- `wa-hogar-0198-msg-02` **Cliente**: Ah y si hay color crema mejor 🙏
- `wa-hogar-0198-msg-03` **Tienda**: ¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?
- `wa-hogar-0198-msg-04` **Cliente**: Sí, barrio Álamos. Punto de entrega de prueba HOG-0198. Queda a nombre de Daniel Moreno.
- `wa-hogar-0198-msg-05` **Tienda**: El subtotal es $78.000, domicilio $12.000. Total: $90.000. ¿Confirmas?
- `wa-hogar-0198-msg-06` **Cliente**: listo, queda así. Pago por pago contraentrega.
- `wa-hogar-0198-msg-07` **Tienda**: Pedido confirmado y enviado. Entrega estimada: 1 días hábiles.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0198-msg-07 → _Pedido confirmado y enviado. Entrega estimada: 1 días hábiles._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Pereira | wa-hogar-0198-msg-01 → _Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Pereira?_ |
| `barrio` | Álamos | wa-hogar-0198-msg-04 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0198. Queda a nombre de Daniel Moreno._ |
| `tienda` | Hogar Demo Colombia | wa-hogar-0198-msg-03 → _¡Hola! Te atiende Hogar Demo Colombia. Sí tenemos. ¿La entrega sería en Álamos y a nombre de quién queda el pedido?_ |
| `destinatario` | Daniel Moreno | wa-hogar-0198-msg-04 → _Sí, barrio Álamos. Punto de entrega de prueba HOG-0198. Queda a nombre de Daniel Moreno._ |
| `metodo_pago` | pago contraentrega | wa-hogar-0198-msg-06 → _listo, queda así. Pago por pago contraentrega._ |
| `subtotal/domicilio/total` | 78000/12000/90000 | wa-hogar-0198-msg-05 → _El subtotal es $78.000, domicilio $12.000. Total: $90.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de sábanas doble algodón (cant 1) | wa-hogar-0198-msg-01 → _Holaa, necesito 1 unidades de juego de sábanas doble algodón. ¿Cuánto queda para Pereira?_ |
| `color_crema_pendiente` | sí (sin confirmación) | wa-hogar-0198-msg-02 → _Ah y si hay color crema mejor 🙏_ |

## wa-hogar-0199 — Gabriela Moreno · `confirmado`

**Conversación original** (6 mensajes):
- `wa-hogar-0199-msg-01` **Cliente**: Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Barranquilla?
- `wa-hogar-0199-msg-02` **Tienda**: ¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?
- `wa-hogar-0199-msg-03` **Cliente**: Sí, barrio El Prado. Punto de entrega de prueba HOG-0199. Queda a nombre de Gabriela Moreno.
- `wa-hogar-0199-msg-04` **Tienda**: El subtotal es $241.000, domicilio $15.000. Total: $256.000. ¿Confirmas?
- `wa-hogar-0199-msg-05` **Cliente**: dale, hagámosle. Pago por transferencia bancaria.
- `wa-hogar-0199-msg-06` **Tienda**: Pedido confirmado. Te avisamos por este chat cuando salga a reparto.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | confirmado | wa-hogar-0199-msg-06 → _Pedido confirmado. Te avisamos por este chat cuando salga a reparto._ |
| `tipo` | pedido | _(derivado de la composición de la conversación)_ |
| `ciudad` | Barranquilla | wa-hogar-0199-msg-01 → _Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Barranquilla?_ |
| `barrio` | El Prado | wa-hogar-0199-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0199. Queda a nombre de Gabriela Moreno._ |
| `tienda` | Almacén Hogar Ejemplo | wa-hogar-0199-msg-02 → _¡Hola! Te atiende Almacén Hogar Ejemplo. Sí tenemos. ¿La entrega sería en El Prado y a nombre de quién queda el pedido?_ |
| `destinatario` | Gabriela Moreno | wa-hogar-0199-msg-03 → _Sí, barrio El Prado. Punto de entrega de prueba HOG-0199. Queda a nombre de Gabriela Moreno._ |
| `metodo_pago` | transferencia bancaria | wa-hogar-0199-msg-05 → _dale, hagámosle. Pago por transferencia bancaria._ |
| `subtotal/domicilio/total` | 241000/15000/256000 | wa-hogar-0199-msg-04 → _El subtotal es $241.000, domicilio $15.000. Total: $256.000. ¿Confirmas?_ |
| `productos (líneas)` | juego de toallas gris x3 (cant 2); almohada hotelera firme (cant 3) | wa-hogar-0199-msg-01 → _Buenas, me regalas 2 unidades de juego de toallas gris x3 y 3 unidades de almohada hotelera firme. ¿Cuánto queda para Barranquilla?_ |

## wa-hogar-0200 — Ricardo Moreno · `sin_pedido`

**Conversación original** (5 mensajes):
- `wa-hogar-0200-msg-01` **Cliente**: Hola, si cobija térmica no me sirve, ¿lo puedo cambiar?
- `wa-hogar-0200-msg-02` **Tienda**: Sí, aceptamos cambios sin uso y con el empaque dentro del plazo informado.
- `wa-hogar-0200-msg-03` **Cliente**: ¿Y el domicilio a Suba queda en $13.000?
- `wa-hogar-0200-msg-04` **Tienda**: Sí, el envío estándar cuesta $13.000. ¿Deseas hacer el pedido?
- `wa-hogar-0200-msg-05` **Cliente**: Por ahora no, solo estaba averiguando. Gracias.

| Campo | Valor extraído | Mensaje que lo sustenta |
|---|---|---|
| `estado` | sin_pedido | wa-hogar-0200-msg-05 → _Por ahora no, solo estaba averiguando. Gracias._ |
| `tipo` | consulta:politica_devoluciones+consulta_domicilio | _(derivado de la composición de la conversación)_ |
| `barrio_consulta` | suba | wa-hogar-0200-msg-03 → _¿Y el domicilio a Suba queda en $13.000?_ |
| `costo_envio_estandar` | 13000 | wa-hogar-0200-msg-04 → _Sí, el envío estándar cuesta $13.000. ¿Deseas hacer el pedido?_ |

---
**Resumen de trazabilidad**: 200 conversaciones documentadas; 1377 campos con mensaje de respaldo.