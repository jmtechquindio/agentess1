# pruebas.md — Módulo 04 · Ferricentro

Este documento separa dos cosas que suelen mezclarse:

1. **Lo que se ejecutó de verdad** y con qué resultado.
2. **Lo que NO se ha probado** y sigue pendiente.

Toda cifra de este archivo es una salida real de una ejecución, no una
expectativa.

---

## 0. Método de verificación y qué NO es

**Cómo se ejecutó.** El código de `extension/` se ejecutó en un **Chrome y un Edge
reales** (versión 154), no en un simulador. El arnés está en `arnes/` y consists
en tres piezas:

- `servidor_fijo.py`: sirve el HTML guardado tal cual en
  `https://ferricentro.com/productos/herramienta-manual`, sobre TLS, con un
  certificado autorrelleno.
- `lanzar_navegador.sh`: abre el navegador con un **perfil desechable aparte**
  (no toca tu perfil real) y una regla de resolución que apunta
  `ferricentro.com` al servidor local.
- `prueba_navegador.py`: conduce el navegador por CDP. Carga la extensión con
  `Extensions.loadUnpacked`, ejecuta `extractor.js` **tal cual** sobre el DOM
  real, y ejecuta el código real de `popup.js` dentro del popup real.

Dentro de esas pruebas, el código de la extensión no se simuló:

| Componente | Cómo se ejecutó |
|---|---|
| `manifest.json` | Lo aceptó el navegador: `Extensions.loadUnpacked` devuelve id solo si el manifiesto es válido. |
| `extractor.js` | Archivo íntegro, sin editar, mediante `Runtime.evaluate` sobre la página real. |
| `mostrar()`, `construirCsv()`, `construirCsvExcepciones()`, `descargar()` | Código íntegro de `popup.js`, con la IIFE desenvuelta **solo** para poder invocarlo desde el conductor. No se editó ninguna línea. |
| `chrome.downloads` | API real. Los archivos se leyeron del disco después. |
| `chrome.scripting` | **No automatizable**, ver abajo. |

Resultado: **53 comprobaciones, 53 correctas, en Chrome 154.0.8037.58 y en Edge
154.0.4258.48.** Los informes están en `informe-chrome.json` e `informe-edge.json`.

**Qué NO es, y es importante:**

1. **La página servida no era Ferricentro en vivo.** Es el HTML que Ferricentro
   sirvió el 2026-10-01, servido desde un servidor local para poder repetir la
   prueba. Durante estas pruebas **no se hizo ninguna petición a ferricentro.com
   ni a ningún otro sitio**. El DOM es el mismo, pero no se comprueba que hoy la
   página siga igual.
2. **`chrome.scripting.executeScript` no se ejecutó.** Chrome concede `activeTab`
   únicamente con una pulsación sobre el icono, y CDP no tiene forma de
   concederlo. Es el único punto del flujo sin verificar. Todo lo demás
   —extracción, UI, CSV y descarga— se ejecutó con el código real.
3. **`saveAs: true` abre un diálogo nativo** que en modo headless no se abre. Por
   eso se comprobó que la llamada a `chrome.downloads` se produce y se completa,
   y el contenido se verificó leyendo los archivos que el navegador escribió de
   verdad.
4. **Las capturas no se inspeccionaron visualmente.** El que hace esta revisión
   no puede ver imágenes. El diseño se verificó por DOM: el botón «Analizar» es
   visible (`display: inline-block`), el título tiene altura distinta de cero, el
   popup compone con 291 px y el botón «Descargar» arranca deshabilitado.
5. **No se hizo la carga manual desde la interfaz** (`chrome://extensions` →
   «Cargar descomprimida»). La carga se hizo por CDP, que es el mismo motor pero
   no la misma pantalla.

Los casos 7 (Chrome) y 8 (Edge) del brief quedan **ejecutados en su parte
verificable**, con un hueco explícito: el clic sobre el icono.

---

## 1. Página compatible

**Ejecutado** en navegador real, con el HTML servido por TLS.

| Comprobación | Resultado |
|---|---|
| La URL servida es `https://ferricentro.com/productos/herramienta-manual` | sí |
| Estado devuelto por `extractor.js` | `ok` |
| Productos detectados | **24** |
| Total declarado | **2147** |
| Selector acotado `div.products-grid ol.product-items > li.product-item` | **24** |
| Selector global `li.product-item` | **26** |
| Registros idénticos a una extracción independiente previa | **24/24** |
| Registros con los 10 campos del contrato | 24 de 24 |
| Total declarado en la UI real | `2147` |
| Conteo en la UI real | `24` |
| Verificados en la UI real | `0` |
| Filas en la vista previa real | 12 |

**Los dos números, 24 y 2147, aparecen juntos en la interfaz real.** La nota de
la vista previa lo dice con palabras: «La categoría declara 2147 artículos y esta
extensión solo lee 24 porque analiza la página actual y no pagina».

Ningún `advertencias`: no hubo SKU repetidos, ni faltantes de nombre, marca, SKU o
precio. `inventario` y `activo` vacíos en las **24** filas.

**Precio leído del DOM real:** `Abecedario De Golpe De 4Mm` → `66000`, con SKU
`FF-0000012528`.

**Paginación — resultado real.** Se ejecutó el mismo análisis sobre `?p=2`:
**24 productos, total 2147**, y **0 SKU coincidentes** con la página 1
(48 SKU distintos).

---

## 2. Página no compatible

**Ejecutado** con el HTML de la **portada** `https://ferricentro.com/`.

```
estado   : parada
productos: 0
motivo   : La pagina no contiene el contenedor de productos documentado.
           Puede ser la portada, una ficha, un aviso o un tema distinto.
```

No se generó ningún CSV. La interfaz muestra el motivo y un aviso explícito de
que exportar ahí habría sido engañoso.

**Dominio no autorizado — ejecutado en navegador real.** Se sirvió la misma página
de categoría bajo `https://sitio-ajeno-de-prueba.test/...` y se ejecutó
`extractor.js` tal cual:

```
estado   : parada
productos: 0
motivo   : La pestaña no pertenece al dominio autorizado ferricentro.com. No se analiza.
```

Ese mismo resultado, ya con la URL real, se pasó a `mostrar()` del popup real:

- `data-nivel` del estado = `error`
- el motivo aparece en la interfaz, nombrando `ferricentro.com`
- el botón «Descargar» sigue **deshabilitado**
- aviso mostrado: «No se generó ningún CSV. Un archivo con datos incompletos sería
  engañoso…»

Este caso no lo pedía el brief, pero es la condición de parada que impide que la
extensión lea cualquier otra pestaña.

---

## 3. Cero resultados

**Ejecutado** con una página de Ferricentro válida cuya grilla existe pero está
vacía (construida a propósito):

```
estado   : vacio
productos: 0
total    : null
motivo   : La pagina es una categoria de Ferricentro, pero su grilla de productos
           esta vacia. Cero productos es un resultado valido, no un error.
```

Comportamiento en la interfaz:

- Estado **nivel `aviso`**, no `error`. Cero productos no se trata como fallo técnico.
- Muestra conteo **0**.
- **Descarga habilitada**, para que la persona pueda dejar constancia del CSV con
  solo encabezados. La decisión es deliberada: la estructura fue verificada, así
  que el resultado es válido y vacío. En el caso 2, en cambio, la descarga queda
  bloqueada.

Este caso es la comprobación de que "página compatible con cero productos" y
"página incompatible" se distinguen por la **existencia del contenedor**, nunca
por el conteo.

---

## 4. Campo ausente

**Ejecutado** en navegador real. En esta página los campos ausentes son
`inventario` y `activo`, y están ausentes en los **24 de 24** registros.

```
inventario y activo vacios en las 24 filas: true
```

En la vista previa, la sección «Campos que la fuente no muestra» muestra:

- `inventario` — la página no muestra ninguna cantidad. Un botón "Agregar al
  carro" deshabilitado no es evidencia de existencias. Queda vacío en los 24
  registros.
- `activo` — no hay regla documentada. El botón está deshabilitado en toda la
  página, sin variación, y no permite deducir disponibilidad. Queda vacío en los
  24 registros.

En `productos_erp.csv`, ambas columnas existen y están vacías. **No se escribió
`0` ni `Desconocida` en ninguna celda.**

**Verificación de que el CSV no inventa:** en el navegador real, `valor_observado`
de las 24 filas de precio contiene el importe (`66000`), no la palabra «pesos», y
las 24 filas de `activo` traen cadena vacía.

---

## 5. Selectores o estructura modificados

**Ejecutado** con una prueba controlada real, sin mocks: se renombró la clase
`product-item-brand` a `brand-x` en el HTML observado y se pasó al extractor.

```
estado   : parada
productos: 0
motivo   : Ningun producto muestra marca. En la pagina observada las 24 la
           mostraban, asi que esto indica un cambio de estructura, no una pagina
           vacia.
```

Detalle relevante: el extractor **no buscó la marca por otra vía** ni devolvió 24
productos con la marca vacía en silencio. Detectó la pérdida de un campo que la
fuente mostraba de forma consistente y se detuvo.

**En navegador real**, el selector acotado dio 24 y el global dio 26 sobre la misma
página. Esa diferencia es la razón de que los selectores estén acotados, y queda
medida, no supuesta.

**Caso "varias listas de productos".** No se ejecutó contra HTML real porque la
página observada tiene exactamente una lista. La comprobación está implementada
(`SIÑAL: listas.length !== 1 → parada`) pero **no está probada con un caso real**.

---

## 6. CSV

**Ejecutado dos veces:** con el resultado del navegador real y con un lector de CSV
independiente (módulo `csv` de Python), que es el modo real de consumirlo.

### productos_erp.csv

| Comprobación | Resultado |
|---|---|
| Codificación | UTF-8 |
| Separador | coma |
| Fin de línea | CRLF |
| Encabezado | exactamente los 10 campos del brief, en orden |
| Columnas | 10 |
| Filas de datos | 24 |
| Todas las filas con 10 campos | sí |
| `fuente_url` en las 24 filas | sí, una sola URL distinta, la de la pestaña (D6) |
| `fecha_consulta` con zona horaria | sí, formato `2026-10-02T00:20:11-05:00` |

**El archivo que escribió el navegador es idéntico, línea por línea, a la muestra
de `salida/productos_erp.csv`** (única diferencia: la marca de tiempo, que cambia
en cada ejecución). Lo mismo con `excepciones.csv`. Los cuatro archivos
escritos —Chrome y Edge, dos CSV cada uno— se leyeron del disco y se compararon
con las muestras: **4 de 4 idénticos**.

### Escape de comillas — el riesgo real de esta fuente

En la observación, **0 de 24 nombres contienen coma** y **9 de 24 contienen
comilla doble**. El riesgo de esta fuente es la comilla, no la coma. Una prueba
que solo comprobara comas no habría detectado nada.

Escape generado:

```csv
Ferricentro,FF-0000001111,"Acolilladora Manual 12"" Con Serrucho De 14""",STANLEY,...
Ferricentro,FF-0000043617,"Adaptador 3/4"" Hembra X 1/2"" Macho",SATA,...
```

Lectura de vuelta con el lector de CSV:

```
Acolilladora Manual 12" Con Serrucho De 14"
```

Correcto: envolver entre comillas y duplicar la comilla interna. El producto
original tiene **dos** comillas y el CSV devuelve **dos**. Verificado también en
el navegador real.

*(Corrección de la observación: el TXT decía "11 de 24"; el conteo correcto es 9.
El error estaba en el TXT, en `popup.js` y en las dos copias del TXT, y se
corrigió en los cuatro sitios.)*

### excepciones.csv

| Comprobación | Resultado |
|---|---|
| Columnas | 7 (`fuente_url`, `fecha_consulta`, `sku`, `nombre`, `campo_afectado`, `valor_observado`, `motivo`) |
| Filas | 48 |
| SKUs distintos cubiertos | **24 de 24** |
| Motivos por campo | `precio_cop` 24, `activo` 24 |
| `valor_observado` con precio | 24 filas con el importe real |

Cada registro queda explicable: 24 filas por la moneda sin código observable
(decisión D1) y 24 por `activo` sin regla documentada (decisión D3).

*Nota de desarrollo:* una primera versión extraía `valor_observado` parseando el
texto del motivo y producía `pesos` en la fila del precio. La prueba end-to-end
lo detectó; se corrigió haciendo que el extractor entregue `campo` y `valor`
explícitos en cada observación.

---

## 7. Chrome

**Ejecutado — 53 de 53 correctas.** Informe completo en `informe-chrome.json`.

Chrome 154.0.8037.58, Windows, perfil desechable aparte.

| Comprobación | Resultado |
|---|---|
| La extensión se carga sin errores de manifiesto | sí, id `jhpamggeoecblhcmppikmemmilpclcnp` |
| Manifest V3 | sí |
| Solo `activeTab`, `scripting`, `downloads` | sí |
| Sin service worker declarado | sí |
| Sin content scripts declarados | sí |
| Sin `<all_urls>` ni `host_permissions` | sí |
| `default_popup` existe en disco | sí |
| El popup carga desde `chrome-extension://` | título «Inventario Ferricentro» |
| El botón «Descargar» arranca deshabilitado | sí |
| El CSS se aplicó | botón visible, `display: inline-block` |
| La interfaz compone | título con altura, popup de 291 px |
| `chrome.tabs` / `scripting` / `downloads` disponibles | sí |
| `COLS` = 10 columnas, `COLS_EXCEPCIONES` = 7 | sí |
| `mostrar()` pinta 24, 2147, 0 verificados | sí |
| Vista previa con 12 filas | sí |
| Campos ausentes declarados en pantalla | `inventario` y `activo` |
| `mostrar()` con resultado `parada` → nivel `error` | sí |
| El motivo del rechazo aparece en pantalla | sí |
| Sin descarga tras `parada` | sí |
| Aviso de que no se generó CSV | sí |
| `chrome.downloads` completa las 2 descargas | `state: complete`, sin error |
| Las descargas se piden como `text/csv` | sí |
| Sin errores de JavaScript en el popup | sí |
| Captura | `popup-chrome.png`, 764×485 |

**Lo que falta en Chrome, y es una sola cosa:** el clic sobre el icono. Eso es lo
que concede `activeTab`, y sin él `chrome.scripting.executeScript` no puede
correr. Chrome no expone por CDP ninguna forma de conceder ese permiso, así que
este punto necesita una persona.

**Un detalle de la automatización, no de la extensión:** al forzar `downloadPath`
por CDP, Chrome sustituye el nombre propuesto por un GUID
(`fdad81a7-….csv`). Se comprobó aparte, sin forzar la ruta, que Chrome **sí respeta**
el nombre `filename`: una descarga con `filename: 'PRUEBA_SIN_SAVEAS.csv'` se
guardó con ese nombre. El nombre GUID es artefacto del arnés.

---

## 8. Edge

**Ejecutado — 53 de 53 correctas.** Informe completo en `informe-edge.json`.

Edge 154.0.4258.48, Windows, perfil desechable aparte. Se ejecutó **la misma
suite**, sin cambiar una línea del arnés.

| Comprobación | Resultado |
|---|---|
| Total de comprobaciones | 53 |
| Correctas | **53** |
| La extensión se carga sin errores | id `jhpamggeoecblhcmppikmemmilpclcnp` (el mismo, por la misma ruta) |
| Diferencias respecto a Chrome | **ninguna detectada** |
| Captura | `popup-edge.png`, 756×488 |

**Sobre lo que se esperaba y no se comprobó.** Antes se anotaron dos cosas:

- Que `activeTab`, `scripting` y `downloads` funcionen en Edge con Manifest V3
  desde la versión 114. **Confirmado empíricamente**: los tres están disponibles
  y se usaron en las pruebas.
- Que Edge pida «Permitir extensiones de otras tiendas» en `edge://extensions`.
  **No se comprobó**, porque la carga se hizo por CDP y no por esa pantalla. Ese
  paso de instalación sigue siendo manual.

Los CSV que escribió Edge son idénticos a los de Chrome y a las muestras: 2 de 2.

---

## 9. Privacy y empaquetado de la extensión

| Comprobación | Resultado |
|---|---|
| Archivos declarados en el manifest | 3, los 3 existen |
| Referencias rotas en el manifest | ninguna |
| `<all_urls>` | ausente |
| `host_permissions` | ninguno declarado |
| Permisos | solo `activeTab`, `scripting`, `downloads` |
| `background.service_worker` | **no declarado** |
| Código remoto, `eval`, `new Function`, `import` remoto | ninguno |
| Lectura de cookies, `form_key` o `uenc` | ninguna |
| Content scripts declarados | ninguno |
| `externally_connectable` / `web_accessible_resources` | ninguno |

**Peticiones de red en tiempo de ejecución.** Con `Network.enable` sobre el popup
real durante su funcionamiento, las únicas peticiones fueron sus dos recursos
propios:

```
chrome-extension://<id>/popup.css
chrome-extension://<id>/popup.js
peticiones a terceros: 0
```

**Tokens en la evidencia.** Al guardar el HTML observado se encontraron 25
valores de `form_key` y 24 de `uenc`, tokens anti-CSRF de la sesión del servidor.
Se **redactaron** antes de dejarlos en `evidencia/`: se conservó la estructura
(25 `product-item-info`, 24 `data-price-amount`, 24 `availability-product-FF-`),
que es lo que sirve como evidencia, y se sustituyó cada valor por `REDACTADO`.
Verificado: 0 valores reales remanentes.

**Sobre el arnés de pruebas.** Usa un certificado TLS autorrelleno y una regla de
resolución que apunta `ferricentro.com` a `127.0.0.1`. Eso afecta **solo** a la
prueba: la extensión no resuelve ni fuerza ningún nombre, y no se hizo ninguna
petición a ferricentro.com ni a ningún otro sitio durante las pruebas.

---

## 10. Resumen

| Caso | Brief | Estado |
|---|---|---|
| 1 Página compatible | A | **ejecutado** — 24 productos, navegador real |
| 2 Página no compatible | B | **ejecutado** — parada, sin CSV |
| 3 Cero resultados | C | **ejecutado** — 0, no es error |
| 4 Campo ausente | D | **ejecutado** — inventario y activo vacíos |
| 5 Estructura modificada | E | **ejecutado** — parada, y 24 vs 26 medido |
| 6 CSV | F | **ejecutado** — 4 archivos del navegador, 4/4 idénticos a las muestras |
| 7 Chrome | G | **53/53**, salvo el clic que concede `activeTab` |
| 8 Edge | H | **53/53**, mismas condiciones |

Extra: dominio no autorizado y paginación real (`?p=2`).

**Lo único que queda sin verificar de extremo a extremo** es el clic sobre el icono
de la barra, porque ese clic es justamente lo que concede `activeTab` y ningún
automatizador puede simularlo. Todo lo demás se ejecutó con el código real, en
Chrome y Edge reales.
