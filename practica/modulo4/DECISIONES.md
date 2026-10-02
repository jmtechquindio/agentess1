# Decisiones de ejecucion — Módulo 04 · Ferricentro

Este archivo existe porque `proceso-extension-ferricentro.txt` dejo 6 puntos
abiertos (§11.5) que la extension **no puede decidir sola**. Nadie debe
inventarlos.

Cada decision esta marcada con su estado. Las marcadas `ADOPTADA (propuesta del
analista)` son las que la extension implementa por defecto. Las marcadas
`REQUIERE FIRMA` necesitan que la persona responsable las acepte por escrito:
hasta entonces la extension aplica la propuesta, pero la decision no esta
ratificada y el README lo declara como pendiente.

Ninguna de estas reglas se deduce de la pagina. Se deducen del brief y de lo
observado, y estan escritas aqui para que sean revisables y auditables.

---

## D1 — Moneda no explicita en la pagina

**Observado:** el precio es un entero en `data-price-amount`, verificado 24/24
contra el texto visible `$ 66.000`. Pero NO hay codigo de moneda en el HTML:
cero coincidencias de `COP`, `pesos`, `colombiano`, `USD`, `MXN` y cero `<meta>`
de region. Que ese entero sea pesos colombianos es una INFERENCIA a partir del
locale `es_CO` de los assets y del simbolo `$`.

**Opciones consideradas:** (A) registrar el entero y marcar `requiere_revision`;
(B) dejar el precio vacio; (C) fijar por escrito la regla "el entero observado es
COP".

**ADOPTADA (propuesta del analista): Opcion A.**
`precio_cop` = entero de `data-price-amount`. `estado_revision` = `requiere_revision`
para todos los registros, y `excepciones.csv` registra el motivo.

**Consecuencia asumida:** el 100% de las filas quedara `requiere_revision`. Es
correcto y no es un defecto: la duda es real y es la misma para todos.

Implementado en `extractor.js` como la constante `POLITICA.precio`.

---

## D2 — `referencia` e `imagen_url` no estan en el contrato

**Observado:** `referencia` (codigo de fabricante) presente en 22/24 con dato, y
`imagen_url` presente en 24/24. El brief define 10 columnas y ninguna es esa.

**ADOPTADA (propuesta del analista): no anadir columnas.**
`productos_erp.csv` lleva **exactamente** las 10 columnas del brief. Los
encabezados no se alteran. Los dos datos quedan documentados en el README como
observados-pero-fuera-de-contrato.

**Descartada:** anadirlas cambiaria los encabezados que el brief declara
estables (§11 Caso F).

Implementado en `extractor.js` como la constante `POLITICA.camposFueraDeContrato`.

---

## D3 — Regla para `activo`

**Observado:** los 24 botones "Agregar al carro" estan `disabled` en la pagina 1
y en la pagina 2. Variacion = 0. No hay productos agotados con los que comparar,
ni fecha de actualizacion, ni estado publicado. Con una sola valoracion no se
puede deducir que el estado del boton signifique disponibilidad.

**ADOPTADA (propuesta del analista): `activo` vacio, siempre.**
Nunca `true`, nunca `false`. Se deja `""` y `excepciones.csv` registra el motivo
"sin regla documentada". Un `true` inventado es justo lo que el modulo busca
evitar.

Implementado en `extractor.js` como la constante `POLITICA.activo`.

---

## D4 — La ausencia de inventario degrada el estado de revision?

**Observado:** `inventario` no existe en la fuente (0/24). No es una carencia por
producto: es una propriedade de la fuente.

**Problema:** el brief define `incompleto` como "falta uno o mas datos que la
fuente no muestra". Leido al pie de la letra, el 100% de filas seria
`incompleto` y el estado no distinguiria nada util.

**ADOPTADA (propuesta del analista): la ausencia de inventario NO degrada el
estado.** Se registra como una propiedad documentada de la fuente, en el README y
en la vista previa de la extension, no como un defecto por registro.

`incompleto` queda reservado para un campo que la fuente SI sabe mostrar y
falta en esa fila.

Implementado en `extractor.js` como la constante `POLITICA.inventarioAusente`.

---

## D5 — Avisar el total declarado (2147) frente a los 24 de la pagina

**Observado:** `p.toolbar-amount span.toolbar-number` -> "24 articulos de 2147".
Limite por pagina 24. La extension solo analiza la pagina actual.

**ADOPTADA (propuesta del analista): si, avisar en la vista previa.**
Se muestran los dos numeros juntos para que la limitacion de alcance sea
visible. La diferencia entre "24" y "2147" es informacion, no un defecto que
esconder.

Implementado en `popup.js`.

---

## D6 — Formato de `fuente_url`

**Observado:** la pagina 1 no tiene query ni fragmento. Las paginas 2+ llevan
`?p=N`. Ninguna URL de producto tiene query ni fragmento.

**ADOPTADA (propuesta del analista): literal, sin modificar.**
`fuente_url` = la URL exacta de la pestana que la persona autorizo, tal cual. Si
lleva `?p=N` se conserva, porque el registro salio de ESA pagina concreta y
recortarla perderia trazabilidad.

Implementado en `popup.js`.

---

## Resumen de lo que la extension produce con estas 6 decisiones

| Campo | Valor | Motivo |
|---|---|---|
| `proveedor` | `Ferricentro` | constante de la ejecucion |
| `sku` | codigo de `id="availability-product-<SKU>"` | verificado 24/24 con 2 fuentes mas |
| `nombre` | texto de `a.product-item-link` | verificado 24/24 |
| `marca` | texto de `span.product-item-brand` | verificado 24/24 |
| `precio_cop` | entero de `data-price-amount` | entero verificado 24/24; **moneda inferida** (D1) |
| `inventario` | **vacio** | la fuente no lo muestra (D4) |
| `activo` | **vacio** | sin regla documentada (D3) |
| `fuente_url` | URL literal de la pestana | metadato (D6) |
| `fecha_consulta` | momento de la ejecucion, con zona horaria | metadato |
| `estado_revision` | `requiere_revision` | D1 aplica a todas las filas |

Columnas que quedan SIEMPRE vacias: `inventario` y `activo`. No es un fallo: son
los dos campos sin base observacional, y ambos tienen su motivo en
`excepciones.csv`.

---

## Lo que queda abierto de verdad

Nada de lo anterior bloquea la construccion. Lo que sigue abierto:

- [ ] **Firma de D1 a D6** por la persona responsable.
- [ ] **Pruebas reales en Chrome y Edge.** Este entregable NO ha sido probado en
      ningun navegador. `evidencia/pruebas.md` esta preparado y vacio de
      resultados reales. Es el pendiente mas importante.
- [ ] Confirmar si el contenido de `#availability-product-<SKU>` se puebla al
      ejecutar JavaScript (TXT §8.6). Si se puebla con texto de disponibilidad,
      D3 y D4 deben revisarse de nuevo.