/*
 * extractor.js — Módulo 04 · Ferricentro
 *
 * Se inyecta en la pestaña actual mediante chrome.scripting.executeScript con
 * activeTab. Se ejecuta en el mundo aislado y lee SOLO el DOM. No usa
 * jQuery ni variables de la página, no hace fetch, no envía nada.
 *
 * IMPORTANTE: este archivo devuelve un objeto plano y serializable. chrome.scripting
 * no puede transportar nodos del DOM, así que todo se resuelve dentro del script.
 *
 * Cada selector y cada regla Sale de evidencia/proceso-extension-ferricentro.txt.
 * No hay ningún selector inventado. Si un selector deja de coincidir, el script
 * NO busca alternativas por intuición: lo reporta como cambio estructural.
 *
 * Reglas de negocio: DECISIONES.md (D1..D6). Campos ausentes quedan VACÍOS.
 * Nunca 0, nunca "Desconocida".
 */
(() => {
  'use strict';

  /* ---------------------------------------------------------------------
   * POLITICA — decisiones explícitas, revisables. Ver DECISIONES.md.
   * Si la persona responsable cambia una de estas reglas, se cambia aqui.
   * ------------------------------------------------------------------- */
  const POLITICA = {
    proveedor: 'Ferricentro',
    // D1: la moneda no es explicita en la pagina. Se registra el entero
    // verificado y se marca requiere_revision. Poner 'vacio' para no escribir
    // el precio; nunca convertir ni asumir otra moneda en silencio.
    precio: 'registrar_y_marcar',
    // D2: `referencia` e `imagen_url` se observaron pero no estan en el
    // contrato de 10 columnas. No se anaden.
    camposFueraDeContrato: 'omitir',
    // D3: no hay regla documentada para `activo`. Se deja vacio.
    activo: 'vacio',
    // D4: la fuente nunca muestra inventario. Su ausencia no degrada el estado.
    inventarioAusente: 'no_degrada',
    // TXT 10.11: tope de seguridad de tarjetas por pagina.
    maximoProductos: 200
  };

  /* ---------------------------------------------------------------------
   * SELECTORES — TXT §6.3. Todos acotados a la grilla. Acotar es
   * OBLIGATORIO: la pagina tiene 26 `li.product-item` pero solo 24 son
   * productos (2 son plantillas ocultas de comparar y de lista de deseos).
   * ------------------------------------------------------------------- */
  const SEL = {
    grilla: 'div.products-grid',
    listas: 'div.products-grid ol.product-items',
    tarjeta: 'div.products-grid ol.product-items > li.product-item',
    info: '> div.product-item-info',
    marca: 'span.product-item-brand',
    referencia: 'span.product-item-reference',
    nombre: 'a.product-item-link',
    skuId: 'div[id^="availability-product-"]',
    skuTexto: 'span.product-item-row_label',
    skuForm: 'form[data-role="tocart-form"]',
    precioCaja: 'div[data-role="priceBox"]',
    precioEntero: 'span[data-price-amount]',
    precioVisible: 'span.price',
    total: 'p.toolbar-amount span.toolbar-number'
  };

  const PREFIJO_SKU = 'availability-product-';
  const PREFIJO_TEXTO_SKU = 'SKU:';

  /* ------------------------------ utilidades -------------------------- */

  const limpiar = (v) => (v == null ? '' : String(v).replace(/\s+/g, ' ').trim());
  const digitos = (v) => (v == null ? '' : String(v).replace(/[^\d]/g, ''));

  function textoDe(elemento) {
    return elemento ? limpiar(elemento.textContent) : '';
  }

  function fechaLocalConZona() {
    const d = new Date();
    const dos = (n) => String(n).padStart(2, '0');
    const desfase = -d.getTimezoneOffset();
    const signo = desfase >= 0 ? '+' : '-';
    const abs = Math.abs(desfase);
    return `${d.getFullYear()}-${dos(d.getMonth() + 1)}-${dos(d.getDate())}` +
      `T${dos(d.getHours())}:${dos(d.getMinutes())}:${dos(d.getSeconds())}` +
      `${signo}${dos(Math.floor(abs / 60))}:${dos(abs % 60)}`;
  }

  /* ---------------------------- condiciones de parada ------------------ */

  // No son errores: describen por que no se puede garantizar la extraccion.
  // Devolver un motivo concreto permite que la persona decida, en vez de
  // exportar un CSV enganoso.
  const PARADA = {
    SIN_GRILLA: 'La pagina no contiene el contenedor de productos documentado. ' +
      'Puede ser la portada, una ficha, un aviso o un tema distinto.',
    GRILLA_VACIA: 'La pagina es una categoria de Ferricentro, pero su grilla de ' +
      'productos esta vacia. Cero productos es un resultado valido, no un error.',
    VARIAS_LISTAS: 'Se detectaron varias listas de productos dentro de la grilla. ' +
      'El alcance documentado espera exactamente una.',
    TARJETAS_SIN_INFO: 'Hay tarjetas de producto sin el contenedor interno ' +
      'esperado. La estructura cambio.',
    DEMASIADOS: 'La pagina muestra demasiadas tarjetas. El alcance esperado es ' +
      'una grilla de catalogo pequena.',
    HOST_NO_AUTORIZADO: 'La pestaña no pertenece al dominio autorizado ' +
      'ferricentro.com. No se analiza.',
    SIN_PERMISO: 'El navegador no concedio permiso para analizar esta pestaña. ' +
      'Vuelve a abrir la extension sobre la pagina autorizada.',
    SIN_ACCESO: 'No se pudo leer la pagina. Puede ser una pestana restringida ' +
      'del navegador (por ejemplo una tienda de extensiones).'
  };

  /* --------------------------------- correr ---------------------------- */

  function analizar() {
    const problemas = [];
    const advertencia = [];

    // --- Condicion de parada: dominio autorizado (TXT §1, una sola fuente).
    if (location.hostname !== 'ferricentro.com' && location.hostname !== 'www.ferricentro.com') {
      return { estado: 'parada', motivo: PARADA.HOST_NO_AUTORIZADO, productos: [] };
    }

    // --- Condicion de parada: la grilla debe existir (TXT §10.1).
    const grilla = document.querySelector(SEL.grilla);
    if (!grilla) {
      return { estado: 'parada', motivo: PARADA.SIN_GRILLA, productos: [] };
    }

    // --- Condicion de parada: exactamente una lista de productos (TXT §10.3).
    const listas = grilla.querySelectorAll('ol.product-items');
    if (listas.length !== 1) {
      return {
        estado: 'parada',
        motivo: PARADA.VARIAS_LISTAS + ` (encontradas: ${listas.length})`,
        productos: []
      };
    }

    const tarjetas = Array.from(document.querySelectorAll(SEL.tarjeta));

    // --- Condicion de parada: tope de seguridad (TXT §10.11).
    if (tarjetas.length > POLITICA.maximoProductos) {
      return {
        estado: 'parada',
        motivo: PARADA.DEMASIADOS + ` (encontradas: ${tarjetas.length})`,
        productos: []
      };
    }

    // --- Condicion de parada: cada tarjeta debe tener su contenedor (TXT §10.4).
    const sinInfo = tarjetas.filter((t) => !t.querySelector(':scope > div.product-item-info')).length;
    if (sinInfo > 0) {
      return {
        estado: 'parada',
        motivo: PARADA.TARJETAS_SIN_INFO + ` (${sinInfo} de ${tarjetas.length})`,
        productos: []
      };
    }

    const total = leerTotalDeclarado();

    // --- Caso C (TXT §10.2): grilla compatible con cero productos.
    if (tarjetas.length === 0) {
      return {
        estado: 'vacio',
        motivo: PARADA.GRILLA_VACIA,
        total,
        productos: []
      };
    }

    const productos = [];
    const vistos = new Map();
    let duplicados = 0;

    for (const tarjeta of tarjetas) {
      const registro = leerProducto(tarjeta);
      productos.push(registro);

      const clave = registro.sku;
      if (clave) {
        if (vistos.has(clave)) {
          duplicados += 1;
          registro.observaciones.push({
            campo: 'sku',
            valor: clave,
            motivo: `SKU repetido en la pagina: ya aparecia en la tarjeta ${vistos.get(clave) + 1}.`
          });
          registro.estado_revision = 'requiere_revision';
        } else {
          vistos.set(clave, productos.length - 1);
        }
      }
    }

    if (duplicados > 0) {
      advertencia.push(`${duplicados} producto(s) con SKU repetido en esta pagina.`);
    }

    const sinPrecio = productos.filter((p) => !p.precio_cop).length;
    if (sinPrecio > 0) {
      advertencia.push(`${sinPrecio} producto(s) sin precio: quedan vacios y marcados para revision.`);
    }

    const sinSku = productos.filter((p) => !p.sku).length;
    if (sinSku > 0) {
      advertencia.push(`${sinSku} producto(s) sin SKU: quedan vacios y marcados para revision.`);
    }

    // Aviso de marca ausente (TXT §9.3): senal de cambio estructural, no de
    // que los productos no tengan marca.
    const conMarca = productos.filter((p) => p.marca).length;
    if (conMarca === 0 && productos.length > 0) {
      return {
        estado: 'parada',
        motivo: 'Ningun producto muestra marca. En la pagina observada las 24 la ' +
          'mostraban, asi que esto indica un cambio de estructura, no una pagina vacia.',
        productos: [],
        total
      };
    }
    if (conMarca < productos.length) {
      advertencia.push(
        `${productos.length - conMarca} producto(s) sin marca. En la pagina observada ` +
        `las 24 la mostraban: revisar si el tema cambio.`
      );
    }

    return { estado: 'ok', productos, total, advertencias: advertencia };
  }

  /* --------------------------- leer un producto ------------------------ */

  function leerProducto(tarjeta) {
    const observaciones = [];
    let estado = 'verificado';

    // Cada observacion es un objeto {campo, valor, motivo} para que
    // excepciones.csv pueda decir QUE se vio y POR QUE, sin adivinarlo
    // parseando el texto del motivo.
    const observar = (campo, valor, motivo) => {
      observaciones.push({ campo, valor: valor == null ? '' : String(valor), motivo });
    };
    const degradar = (campo, valor, motivo) => {
      estado = 'requiere_revision';
      observar(campo, valor, motivo);
    };

    // --- nombre (obligatorio segun el brief).
    const enlace = tarjeta.querySelector(SEL.nombre);
    const nombre = textoDe(enlace);
    if (!nombre) {
      degradar('nombre', '',
        'No se observo nombre de producto. No se rellena con la imagen ni con la URL.');
    }

    // --- SKU: tres fuentes verificadas en la observacion (TXT §4.4).
    const nodoSkuId = tarjeta.querySelector(SEL.skuId);
    const skuId = nodoSkuId && nodoSkuId.id.startsWith(PREFIJO_SKU)
      ? nodoSkuId.id.slice(PREFIJO_SKU.length).trim()
      : '';

    const textoSku = textoDe(tarjeta.querySelector(SEL.skuTexto));
    const skuTexto = textoSku.startsWith(PREFIJO_TEXTO_SKU)
      ? textoSku.slice(PREFIJO_TEXTO_SKU.length).trim()
      : textoSku;

    const formulario = tarjeta.querySelector(SEL.skuForm);
    const skuFormulario = formulario ? limpiar(formulario.getAttribute('data-product-sku')) : '';

    let sku = skuId;
    if (!sku) sku = skuTexto;
    if (!sku) sku = skuFormulario;

    // Discrepancia entre fuentes: no elegir por intuccion (TXT §10.6).
    const fuentes = [
      ['id availability-product-', skuId],
      ['texto visible del SKU', skuTexto],
      ['data-product-sku del formulario', skuFormulario]
    ].filter(([, v]) => v);

    const distintas = fuentes.filter(([, v]) => v !== sku);
    if (distintas.length > 0) {
      degradar('sku', sku,
        'Las fuentes de SKU no coinciden. Se conservó "' + sku + '". ' +
        'Discrepancia: ' + fuentes.map(([n, v]) => `${n}="${v}"`).join(', ') + '.');
    }
    if (!sku) {
      degradar('sku', '', 'No se observo SKU en ninguna de las tres fuentes.');
    }

    // --- marca.
    const marca = textoDe(tarjeta.querySelector(SEL.marca));
    if (!marca) {
      degradar('marca', '', 'No se observo marca.');
    }

    // --- precio (TXT §4.5).
    const cajaPrecio = tarjeta.querySelector(SEL.precioCaja);
    const importes = tarjeta.querySelectorAll(SEL.precioEntero);

    // TXT §10.5: mas de un precio por tarjeta significa un desglose no observado.
    if (importes.length > 1) {
      degradar('precio_cop', '',
        `La tarjeta contiene ${importes.length} importes de precio. El documento ` +
        'observado solo conoce uno por producto.');
    }

    let precio_cop = '';
    if (importes.length === 1) {
      const bruto = limpiar(importes[0].getAttribute('data-price-amount'));
      const tipo = limpiar(importes[0].getAttribute('data-price-type'));

      if (tipo && tipo !== 'finalPrice') {
        degradar('precio_cop', bruto,
          `El tipo de precio observado es "${tipo}", no "finalPrice".`);
      }

      if (/^\d+$/.test(bruto)) {
        precio_cop = bruto;
      } else if (/^\d+\.\d+$/.test(bruto)) {
        // TXT §8.4: posible decimal. No redondear en silencio.
        degradar('precio_cop', bruto,
          `El precio observado tiene decimales ("${bruto}"). El contrato exige ` +
          'un entero. Se conserva la parte entera y se informa el valor original.');
        precio_cop = bruto.split('.')[0];
      } else if (bruto) {
        degradar('precio_cop', bruto,
          `El importe de precio "${bruto}" no es numerico. Se deja vacio.`);
      } else {
        degradar('precio_cop', '', 'No se observo importe de precio.');
      }

      // Comprobacion cruzada contra el texto visible (TXT §10.8).
      const visible = digitos(textoDe(cajaPrecio && cajaPrecio.querySelector(SEL.precioVisible)));
      if (precio_cop && visible && visible !== digitos(precio_cop)) {
        degradar('precio_cop', precio_cop,
          `El importe "${precio_cop}" no coincide con el texto visible "${visible}". ` +
          'Se conservó el atributo y se informan ambos.');
      }
    } else if (importes.length === 0) {
      degradar('precio_cop', '', 'No se observo bloque de precio en la tarjeta.');
    }

    // D1: la moneda no aparece en la pagina. Se registra y se marca.
    if (POLITICA.precio === 'registrar_y_marcar') {
      estado = 'requiere_revision';
      observar('precio_cop', precio_cop,
        'La pagina no muestra codigo de moneda (ni COP, ni "pesos", ni "colombiano"). ' +
        'El importe es el entero observado; que sea COP se deduce del locale es_CO y ' +
        'del simbolo $, no de un dato explicito.');
    }

    // --- inventario: la fuente no lo muestra (D4, TXT §4.7).
    const inventario = '';

    // --- activo: sin regla documentada (D3, TXT §5.6).
    const activo = '';
    if (POLITICA.activo === 'vacio') {
      observar('activo', '',
        'El campo activo queda vacio: no existe regla documentada. Los botones ' +
        '"Agregar al carro" estan deshabilitados en toda la pagina, sin variacion, ' +
        'y un boton de carrito no prueba disponibilidad ni cantidad.');
    }

    // Escalera de estado de revision (brief §9), de mayor a menor severidad:
    //   requiere_revision  >  incompleto  >  verificado
    // `requiere_revision` ya quedo fijado por cualquier condicion ambigua,
    // inconsistente o inesperada de este producto (SKU discrepante, precio
    // ilegible, nombre vacio, y por D1 la moneda sin codigo observable).
    //
    // `incompleto` significa "falta un dato que la FUENTE no muestra". Por D4 el
    // inventario no cuenta, porque la fuente no lo muestra en NINGUN producto:
    // es una propiedad de la fuente, no una carencia por fila. Por la misma
    // razon D3 excluye `activo`.
    //
    // NOTA HONESTA: con D1 en 'registrar_y_marcar', todas las filas quedan en
    // `requiere_revision`, y por tanto `incompleto` y `verificado` no se alcanzan
    // en esta fuente. Esa rama se conserva para que el cambio sea revisable si
    // alguien modifica D1, no porque se espere alcanzarla.
    if (estado === 'verificado') {
      const mostrados = { nombre, sku, marca, precio_cop };
      const camposQueLaFuenteMuestra = ['nombre', 'sku', 'marca', 'precio_cop'];
      const faltan = camposQueLaFuenteMuestra.filter((campo) => !mostrados[campo]);
      if (faltan.length > 0) {
        estado = 'incompleto';
        observar('estado_revision', 'incompleto',
          'Campos que la fuente normalmente muestra y faltan en esta fila: ' +
          faltan.join(', ') + '.');
      }
    }

    return {
      proveedor: POLITICA.proveedor,
      sku,
      nombre,
      marca,
      precio_cop,
      inventario,
      activo,
      fuente_url: '',
      fecha_consulta: fechaLocalConZona(),
      estado_revision: estado,
      url_producto: enlace ? enlace.href : '',
      observaciones
    };
  }

  /* --------------------- total declarado por la pagina ------------------ */

  function leerTotalDeclarado() {
    // "24 articulos de 2147" -> el segundo numero es el total de la categoria.
    const nodos = document.querySelectorAll(SEL.total);
    if (nodos.length >= 2) {
      const total = limpiar(nodos[1].textContent);
      return /^\d+$/.test(total) ? Number(total) : null;
    }
    return null;
  }

  /* ------------------------------- ejecutar ---------------------------- */

  try {
    return analizar();
  } catch (error) {
    return {
      estado: 'parada',
      motivo: 'Error inesperado al leer la pagina: ' + (error && error.message ? error.message : String(error)),
      productos: []
    };
  }
})();