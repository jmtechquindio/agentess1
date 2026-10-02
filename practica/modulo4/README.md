# Módulo 04 — Inventario verificable desde el navegador (Ferricentro)

Extensión local Manifest V3 que lee los productos **visibles** de una página de
categoría de `ferricentro.com`, muestra una vista previa y permite descargar dos
CSV para revisión.

Todo ocurre dentro del navegador. La extensión no envía nada a ningún servidor.

---

## 1. Propósito

Convertir una página de catálogo en un CSV que una persona pueda revisar antes de
usarlo. La prioridad no es producir el mayor número de filas: es no producir datos
que no se hayan observado.

El diseño está gobernado por una regla: **un campo que no se vio, queda vacío**.
Nunca `0`, nunca `"Desconocida"`. Un CSV vacío en la columna equivocada es peor
que un CSV con un hueco visible.

## 2. Fuente

| | |
|---|---|
| Proveedor | Ferricentro |
| Dominio | `ferricentro.com` (y `www.ferricentro.com`) |
| Página observada | `https://ferricentro.com/productos/herramienta-manual` |
| Plataforma | Magento 2, tema `theme_ferricentro_b2c`, locale `es_CO` |
| Acceso | Público. No requiere sesión. |
| Productos en la página | 24 (de 2147 declarados en la categoría) |
| Observado el | 2026-10-01 23:27 (−05:00) |

Una sola fuente para toda la ejecución. La extensión rechaza cualquier pestaña
que no sea de este dominio.

## 3. Alcance

**Puede:**

- Analizar únicamente la pestaña que la persona abrió y sobre la que pulsó el botón.
- Extraer lo que está presente y observable: nombre, SKU, marca, precio, URL.
- Mostrar estado, conteo, vista previa y campos que la fuente no muestra.
- Generar `productos_erp.csv` y `excepciones.csv`.

**No puede, por diseño:**

- No pagina. Lee 24 de 2147 productos. La vista previa muestra los dos números
  juntos para que la diferencia sea visible en lugar de escondida.
- No inicia sesión, no compra, no añade al carrito, no envía formularios.
- No lee la ficha de producto.
- No inventa un dato ausente.
- No se ejecuta solo: sin pulsación, no hay análisis.

## 4. Instalación local

**Chrome**
1. `chrome://extensions`
2. Activar **Modo de desarrollador** (arriba a la derecha).
3. **Cargar descomprimida** → seleccionar la carpeta `extension/`.

**Edge**
1. `edge://extensions`
2. Activar **Modo de desarrollador**.
3. En la esquina inferior, permitir extensiones de otras tiendas si aparece el aviso.
4. **Cargar descomprimida** → seleccionar `extension/`.

La carpeta se carga sin comprimir. No hay empaquetado ni publicación.

## 5. Permisos: por qué cada uno y por qué no hay más

| Permiso | Para qué | Alternativa descartada |
|---|---|---|
| `activeTab` | Poder actuar sobre la pestaña que la persona autorizó con un clic. | Pedir acceso permanente a `*://ferricentro.com/*` no es necesario: el análisis es puntual y siempre inicia la persona. |
| `scripting` | Inyectar `extractor.js` en esa pestaña. | Un *content script* declarado en el manifiesto se ejecutaría en **cada** visita al dominio, sin que nadie lo pidiera. `scripting` + `activeTab` mantiene la acción bajo control de la persona. |
| `downloads` | Guardar los dos CSV. | — |

**No declarados, a propósito:**

- `host_permissions`: ninguno. `activeTab` cubre el caso.
- `<all_urls>`: nunca. La extensión solo lee `ferricentro.com`.
- `tabs`: no hace falta. `chrome.tabs.query({active:true})` funciona con `activeTab`.
- `background.service_worker`: **no declarado**. Todo cabe en el popup. Declararlo
  añadiría un contexto privilegiado sin necesidad.
- `content_scripts`: ninguno declarado.
- `web_accessible_resources`, `externally_connectable`: ninguno.

Sin `host_permissions` hay una consecuencia que conviene saber: la extensión
**pierde el acceso cuando se cambia de pestaña**. Si el popup se cierra, hay que
volver a abrirlo sobre la página. Es el comportamiento correcto para este caso.

## 6. Uso

1. Abre `https://ferricentro.com/productos/herramienta-manual` (u otra categoría).
2. Pulsa el icono de la extensión y luego **Analizar página actual**.
3. Lee la vista previa: conteo, total declarado, campos ausentes, estados.
4. **Descargar CSV** se habilita solo después de ese paso.
5. El navegador ofrece dos archivos.

En la vista previa se muestran 12 filas; el CSV lleva las 24. `fuente_url` y
`fecha_consulta` van en cada fila y no se repiten en la tabla para no mostrar la
misma URL 24 veces.

## 7. Estructura de archivos

```
practica/modulo4/
├── extension/
│   ├── manifest.json     Manifest V3, 3 permisos
│   ├── popup.html        Interfaz
│   ├── popup.css         Estilos
│   ├── popup.js          Orquestación, vista previa, CSV, descarga
│   └── extractor.js      Lectura del DOM (se inyecta en la pestaña)
├── evidencia/
│   ├── proceso-extension-ferricentro.txt   Observación (92 KB)
│   ├── ferricentro-herramienta-manual-observado.html   HTML con tokens redactados
│   ├── pruebas.md        Resultados reales, incluidos Chrome y Edge
│   ├── informe-chrome.json / informe-edge.json   53 comprobaciones cada uno
│   ├── popup-chrome.png / popup-edge.png         Capturas del popup real
│   └── arnes/           Cómo se reprodujeron las pruebas
│       ├── prueba_navegador.py    Suite de 53 comprobaciones por CDP
│       ├── servidor_fijo.py       Sirve el HTML observado sobre TLS
│       └── lanzar_navegador.sh    Navegador con perfil desechable
├── salida/
│   ├── productos_erp.csv
│   └── excepciones.csv
├── DECISIONES.md         Las 6 decisiones que la extensión no podía tomar sola
└── README.md
```

Para cargar la extensión, seleccionar la carpeta `modulo4/extension`, que es la
que contiene `manifest.json`.

`extractor.js` se inyecta con `chrome.scripting.executeScript` y devuelve un
objeto plano: no usa jQuery ni variables de la página, y no hace peticiones de red.

## 8. Formato de salida

### productos_erp.csv — UTF-8, coma, CRLF

```
proveedor,sku,nombre,marca,precio_cop,inventario,activo,fuente_url,fecha_consulta,estado_revision
```

Las 10 columnas del brief, en ese orden, sin añadidos. `referencia` e
`imagen_url` se observaron pero **no están en el contrato**, así que no se
añadieron (decisión D2).

### excepciones.csv — una fila por condición a revisar

```
fuente_url,fecha_consulta,sku,nombre,campo_afectado,valor_observado,motivo
```

Permite responder, para cada registro, **por qué** no quedó verificado.

### Estados de revisión

| Estado | Significado |
|---|---|
| `verificado` | Se observó todo lo necesario sin ambigüedad. |
| `incompleto` | Falta un dato que la fuente normalmente muestra. |
| `requiere_revision` | Hay una condición ambigua, inconsistente o inesperada. |

> En esta fuente, **las 24 filas salen `requiere_revision`**. No es un defecto:
> la página no muestra ningún código de moneda (decisión D1) y `activo` no tiene
> regla documentada (D3). Está en `excepciones.csv` con el motivo de cada fila.

### Dos columnas siempre vacías

| Columna | Por qué |
|---|---|
| `inventario` | La página no muestra ninguna cantidad. Cero coincidencias de «stock», «Disponible», «Sin stock», «existencias». Un botón "Agregar al carro" deshabilitado **no** es evidencia de existencias. |
| `activo` | No hay regla documentada. Los 24 botones están deshabilitados, sin variación, y eso no permite deducir disponibilidad. |

## 9. Límites conocidos

1. **24 de 2147.** No pagina. Es el alcance acordado, no un fallo.
2. **La moneda es una inferencia.** La página no muestra «COP» ni «pesos». El
   entero del precio está verificado contra el texto visible 24/24; que la unidad
   sea COP se deduce del locale `es_CO` y del símbolo `$`. Está marcado en todas
   las filas.
3. **La marca "EDUARDODO".** 3 de 24 productos la muestran así. Parece un error del
   catálogo. Se copia **tal cual**: corregirla sería inventar.
4. **Sin datos estructurados.** Ni JSON-LD ni microdata ni un solo `data-testid`.
   Los selectores dependen de clases CSS de un tema, que es lo único disponible.
5. **Plantillas ocultas.** La página tiene 3 listas `ol.product-items`: la grilla
   (24) y dos vacías (comparar, lista de deseos). Un selector global daría 26.
   Por eso todo está acotado a `div.products-grid`.
6. **`form_key` y `uenc` presentes.** Cada tarjeta trae tokens anti-CSRF. La
   extensión no los lee, no los registra y no envía el formulario.
7. **El contenedor de disponibilidad llega vacío** por HTML sin JavaScript. Con
   JavaScript **podría** poblarse. No está verificado; si lo hace, D3 y D4 deben
   revisarse.
8. **Una sola categoría observada.** No se sabe si los selectores se sostienen en
   otras categorías, especialmente con productos configurables o con precio
   «Desde».
9. **Sin probar en navegador.** Ver §11.

## 10. Casos de error

| Situación | Qué hace |
|---|---|
| Pestaña de otro dominio | Se detiene: «no pertenece al dominio autorizado». Sin CSV. |
| Página sin grilla (portada, ficha, aviso) | Se detiene con el motivo. Sin CSV. |
| Categoría válida con cero productos | Muestra 0. **No es un error.** Habilita la descarga de un CSV con solo encabezados. |
| Varias listas de productos | Se detiene. |
| Tarjeta sin contenedor interno | Se detiene. |
| Estructura cambiada (p. ej. la marca desaparece) | Se detiene y lo explica. No busca el dato por otra vía. |
| SKU: las 3 fuentes no coinciden | El registro va a `requiere_revision` con las tres valeurs en `excepciones.csv`. No elige una. |
| Precio ilegível o sin bloque | Vacío, `requiere_revision`. |
| Precio con decimales | Conserva la parte entera, marca y **no redondea en silencio**. |
| Más de 200 tarjetas | Se detiene. |
| El navegador deniega el permiso | Mensaje claro; reintentar tras reabrir la extensión. |
| Pestaña restringida (tienda de extensiones) | Mensaje claro; no intenta rodearlo. |

En ningún caso de parada se genera un CSV. La diferencia entre «cero productos» y
«no se pudo leer» es justo lo que la vista previa debe mostrar.

## 11. Pruebas

Ver `evidencia/pruebas.md` para los resultados completos y
`evidencia/informe-chrome.json` e `evidencia/informe-edge.json` para las 53
comprobaciones de cada navegador.

**53 de 53 correctas en Chrome 154 y 53 de 53 en Edge 154**, ejecutando el código
real de la extensión (`extractor.js` tal cual, y `mostrar()`,
`construirCsv()`, `construirCsvExcepciones()`, `descargar()` de `popup.js`) dentro
del popup real de cada navegador, sobre el DOM real.

Lo verificado, entre otras cosas:

- El manifiesto lo acepta el navegador; solo los tres permisos acordados.
- La URL se sirve como `ferricentro.com` sobre TLS y el selector acotado da 24
  frente a 26 del selector global.
- `extractor.js` devuelve `ok`, 24 productos, total 2147, `inventario` y `activo`
  vacíos.
- El popup renderiza: 24, 2147, 0 verificados, 12 filas de vista previa, y
  declara los campos ausentes.
- Un dominio ajeno produce `parada` con el motivo en pantalla, estado `error` y
  descarga bloqueada.
- Los archivos que el navegador **escribió en disco** son idénticos línea por
  línea a las muestras de `salida/`: 4 de 4 (Chrome y Edge, dos CSV cada uno).
- En tiempo de ejecución, el popup hace **0 peticiones a terceros**.

**Lo único sin verificar:** el clic sobre el icono de la barra. Ese clic es lo que
concede `activeTab`, y Chrome no expone por CDP forma de concederlo, así que
`chrome.scripting.executeScript` no se pudo automatizar. Requiere una persona. Lo
demás del flujo se ejecutó de verdad.

Dos notas de honestidad: la página servida era el HTML capturado el 2026-10-01,
**no Ferricentro en vivo** (durante las pruebas no se hizo ninguna petición a
ferricentro.com), y las capturas de pantalla no se inspeccionaron visualmente
porque esta revisión no puede ver imágenes; el diseño se comprobó por DOM.

## 12. Privacidad

- Ninguna petición de red desde la extensión. Sin telemetría, sin analítica.
- Sin cookies, credenciales, historial ni contenido de otras pestañas.
- No lee ni registra `form_key` ni `uenc`.
- Sin código remoto, `eval`, `new Function` ni importaciones remotas.
- No usa `runtime.sendMessage` en ningún punto: no hay listener al que haya que
  validar, porque el único código que toca la página es `extractor.js` y se
  inyecta de forma puntual por acción de la persona.
- Todo el contenido de la página se trata como **datos no confiables** y se
  inserta en la interfaz con `textContent`, nunca con `innerHTML`.
- La extensión no se publica ni se empaqueta para una tienda.

## 13. Diferencias entre Chrome y Edge

**Medidas: ninguna.** Se ejecutó la misma suite de 53 comprobaciones en Chrome
154.0.8037.58 y en Edge 154.0.4258.48, y ambos dieron 53 correctas. La extensión
recibe el mismo id, produce el mismo popup y escribe CSV idénticos.

Lo que se esperaba y **no** se comprobó: que Edge pida «Permitir extensiones de
otras tiendas» en `edge://extensions`. La carga de prueba se hizo por CDP, no por
esa pantalla, así que ese paso de instalación sigue siendo manual.

Sí queda confirmado empíricamente que `activeTab`, `scripting` y `downloads`
están disponibles y funcionan en Edge con Manifest V3.

## 14. Elementos pendientes

1. **El clic sobre el icono**, en Chrome y en Edge. Es el único tramo sin
   verificar, y el motivo es que ese clic concede `activeTab`, que no se puede
   simular. Basta con abrir la categoría, pulsar el icono, «Analizar página
   actual», y confirmar los dos archivos.
2. **Firmar las decisiones D1–D6** de `DECISIONES.md`. Hoy son la propuesta del
   analista, no un acuerdo.
3. **Resolver la moneda.** Si la persona acepta por escrito que el entero
   observado es COP, D1 pasa a «registrar sin marcar» y las filas dejan de quedar
   `requiere_revision` solo por eso.
4. **Revisar si `#availability-product-<SKU>` se puebla** con JavaScript. Si
   aparece texto de disponibilidad, D3 y D4 se reconsideran.
5. **Observar una segunda categoría**, sobre todo con productos configurables o
   con precio «Desde», para saber si los selectores aguantan.
6. **Decidir qué hacer con `referencia` e `imagen_url`** si el contrato llega a
   admitir más columnas. Hoy se observan y se descartan (D2).
7. **Comprobar la carga manual** desde `chrome://extensions` y `edge://extensions`,
   que en esta revisión se hizo por CDP y no desde esas pantallas.