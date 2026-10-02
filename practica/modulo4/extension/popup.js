/*
 * popup.js — Módulo 04 · Ferricentro
 *
 * Toda la interaccion ocurre aqui. No hay service worker: la extension no
 * necesita uno, y no declararlo reduce la superficie de permisos.
 *
 * No se usa runtime.sendMessage en ningun punto. Por eso no existe ningun
 * listener de mensajes al que haya que validar: no hay frontera de confianza
 * entre la pagina y un contexto privilegiado, porque el unico codigo que toca
 * la pagina es extractor.js, inyectado de forma puntual por la accion de la
 * persona.
 */
(() => {
  'use strict';

  /* --------------------------------- DOM ------------------------------ */
  const $ = (id) => document.getElementById(id);
  const ui = {
    analizar: $('analizar'),
    descargar: $('descargar'),
    estado: $('estado'),
    estadoTexto: $('estado').querySelector('.estado__texto'),
    cifras: $('cifras'),
    conteo: $('conteo'),
    total: $('total'),
    verificados: $('verificados'),
    avisos: $('avisos'),
    faltantes: $('faltantes'),
    faltantesLista: $('faltantes-lista'),
    vista: $('vista'),
    vistaCuerpo: $('vista-cuerpo'),
    vistaNota: $('vista-nota'),
    vistaRango: $('vista-rango'),
    descarga: document.querySelector('.descarga')
  };

  const COLS = [
    'proveedor', 'sku', 'nombre', 'marca', 'precio_cop',
    'inventario', 'activo', 'fuente_url', 'fecha_consulta', 'estado_revision'
  ];

  const FILAS_PREVIAS = 12;

  /** Estado de la ultima ejecucion. Se conserva para el CSV. */
  let resultado = null;
  let urlFuente = '';

  /* ------------------------------- pintar ----------------------------- */

  function texto(etiqueta, clase, contenido) {
    const el = document.createElement(etiqueta);
    if (clase) el.className = clase;
    // textContent, nunca innerHTML: el contenido viene de la pagina y se trata
    // como datos no confiables.
    el.textContent = contenido;
    return el;
  }

  function fijarEstado(nivel, titular, detalle) {
    ui.estado.dataset.nivel = nivel;
    ui.estadoTexto.textContent = titular;
    const previo = ui.estado.querySelector('.estado__detalle');
    if (previo) previo.remove();
    if (detalle) {
      ui.estado.appendChild(texto('p', 'estado__detalle', detalle));
    }
  }

  function limpiarAvisos() {
    ui.avisos.textContent = '';
    ui.avisos.hidden = true;
  }

  function agregarAviso(mensaje, grave) {
    ui.avisos.hidden = false;
    ui.avisos.appendChild(
      texto('div', grave ? 'aviso aviso--error' : 'aviso', mensaje)
    );
  }

  function pintarFaltantes(productos) {
    ui.faltantesLista.textContent = '';

    // Columnas del contrato que estan vacias en TODOS los productos: eso es una
    // propiedad de la fuente, no una carencia por registro (D4, TXT §5.5).
    const siempreVacias = ['inventario', 'activo'].filter((campo) =>
      productos.length > 0 && productos.every((p) => !p[campo])
    );

    if (siempreVacias.length === 0) return;

    ui.faltantes.hidden = false;
    const motivos = {
      inventario: 'la pagina no muestra ninguna cantidad. Un boton "Agregar al carro" ' +
        'deshabilitado no es evidencia de existencias.',
      activo: 'no hay regla documentada. El boton esta deshabilitado en toda la pagina, ' +
        'sin variacion, y no permite deducir disponibilidad.'
    };

    for (const campo of siempreVacias) {
      const li = document.createElement('li');
      li.appendChild(texto('span', 'faltantes__campo', campo));
      li.appendChild(texto('span', 'faltantes__motivo', ' — ' + motivos[campo] + ' Queda vacío en los ' + productos.length + ' registros.'));
      ui.faltantesLista.appendChild(li);
    }
  }

  function pintarVista(productos, total) {
    ui.vistaCuerpo.textContent = '';

    const visibles = productos.slice(0, FILAS_PREVIAS);
    for (const p of visibles) {
      const fila = document.createElement('tr');

      const celdaSku = texto('td', null, p.sku);
      celdaSku.className = 'estado-pila';
      if (!p.sku) celdaSku.classList.add('vacio');

      const celdaNombre = texto('td', null, p.nombre);
      if (!p.nombre) celdaNombre.classList.add('vacio');

      const celdaMarca = texto('td', null, p.marca);
      if (!p.marca) celdaMarca.classList.add('vacio');

      const celdaPrecio = texto('td', null, p.precio_cop);
      if (!p.precio_cop) celdaPrecio.classList.add('vacio');

      const celdaInv = texto('td', null, p.inventario);
      if (!p.inventario) celdaInv.classList.add('vacio');

      const celdaAct = texto('td', null, p.activo);
      if (!p.activo) celdaAct.classList.add('vacio');

      const celdaEstado = texto('td', 'estado-pila', p.estado_revision);

      fila.append(celdaSku, celdaNombre, celdaMarca, celdaPrecio, celdaInv, celdaAct, celdaEstado);
      ui.vistaCuerpo.appendChild(fila);
    }

    ui.vistaNota.textContent =
      'Columnas del CSV: ' + COLS.join(', ') + '. ' +
      'URL y fecha van en cada fila y no se muestran aquí para no repetir la misma ' +
      'pestaña 24 veces.';

    if (productos.length > visibles.length) {
      ui.vistaRango.textContent =
        `Mostrando ${visibles.length} de ${productos.length} productos. ` +
        'El CSV lleva todos.';
    } else {
      ui.vistaRango.textContent = `Mostrando los ${visibles.length} productos.`;
    }

    if (total !== null && total !== undefined && total !== productos.length) {
      ui.vistaRango.textContent +=
        ` La categoría declara ${total} artículos y esta extensión solo lee ` +
        `${productos.length} porque analiza la página actual y no pagina.`;
    }

    ui.vista.hidden = false;
  }

  /* ------------------------------- CSV -------------------------------- */

  function celda(valor) {
    const v = valor == null ? '' : String(valor);
    // Estandar CSV: envolver entre comillas y duplicar las comillas internas.
    // Riesgo real observado en esta fuente: 9 de 24 nombres llevan comillas
    // dobles (TXT §8.3). Cero nombres llevan coma, pero el escape se aplica
    // siempre.
    if (/[",\r\n]/.test(v)) {
      return '"' + v.replace(/"/g, '""') + '"';
    }
    return v;
  }

  function construirCsv(productos, columnas) {
    const lineas = [columnas.join(',')];
    for (const p of productos) {
      lineas.push(columnas.map((c) => celda(p[c])).join(','));
    }
    // UTF-8 (sin BOM), salto de linea CRLF, como pide el brief.
    return lineas.join('\r\n') + '\r\n';
  }

  const COLS_EXCEPCIONES = [
    'fuente_url', 'fecha_consulta', 'sku', 'nombre', 'campo_afectado',
    'valor_observado', 'motivo'
  ];

  function construirCsvExcepciones(productos) {
    const filas = [];
    for (const p of productos) {
      const observaciones = Array.isArray(p.observaciones) ? p.observaciones : [];

      if (observaciones.length === 0) {
        // No deberia ocurrir con las reglas adoptadas, pero si un producto
        // quedara limpio igual hay que dejar constancia de la regla D1, que
        // aplica a toda la pagina.
        filas.push({
          fuente_url: p.fuente_url,
          fecha_consulta: p.fecha_consulta,
          sku: p.sku,
          nombre: p.nombre,
          campo_afectado: 'precio_cop',
          valor_observado: p.precio_cop,
          motivo: 'La pagina no muestra codigo de moneda. Importe entero observado; ' +
            'que sea COP es una inferencia (DECISIONES.md D1).'
        });
        continue;
      }

      for (const o of observaciones) {
        filas.push({
          fuente_url: p.fuente_url,
          fecha_consulta: p.fecha_consulta,
          sku: p.sku,
          nombre: p.nombre,
          campo_afectado: o.campo || 'general',
          valor_observado: o.valor == null ? '' : o.valor,
          motivo: o.motivo || ''
        });
      }
    }
    return construirCsv(filas, COLS_EXCEPCIONES);
  }

  function descargar(nombre, contenido) {
    const blob = new Blob([contenido], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    chrome.downloads.download({ url, filename: nombre, saveAs: true }, (id) => {
      if (chrome.runtime.lastError || id === undefined) {
        agregarAviso(
          'No se pudo iniciar la descarga de ' + nombre + ': ' +
          (chrome.runtime.lastError ? chrome.runtime.lastError.message : 'motivo desconocido'),
          true
        );
        URL.revokeObjectURL(url);
        return;
      }
      // Revocar solo cuando la descarga termine, no antes.
      const alCambiar = (delta) => {
        if (delta.id !== id) return;
        if (delta.state && delta.state.current === 'complete') {
          chrome.downloads.onChanged.removeListener(alCambiar);
          URL.revokeObjectURL(url);
        }
      };
      chrome.downloads.onChanged.addListener(alCambiar);
    });
  }

  /* ------------------------------ analizar ----------------------------- */

  ui.analizar.addEventListener('click', () => {
    ui.analizar.disabled = true;
    ui.descargar.disabled = true;
    ui.descarga.hidden = true;
    ui.vista.hidden = true;
    ui.faltantes.hidden = true;
    ui.cifras.hidden = true;
    limpiarAvisos();
    fijarEstado('', 'Analizando la página actual…');
    resultado = null;

    chrome.tabs.query({ active: true, currentWindow: true }, (pestanas) => {
      const pestana = pestanas && pestanas[0];

      if (chrome.runtime.lastError || !pestana) {
        ui.analizar.disabled = false;
        fijarEstado('error', 'No se pudo leer la pestaña activa.',
          chrome.runtime.lastError ? chrome.runtime.lastError.message : undefined);
        return;
      }

      // D6: fuente_url es la URL literal de la pestaña que la persona autorizó.
      urlFuente = pestana.url || '';

      chrome.scripting.executeScript({
        target: { tabId: pestana.id },
        files: ['extractor.js']
      }, (salida) => {
        ui.analizar.disabled = false;

        if (chrome.runtime.lastError) {
          fijarEstado('error', 'El navegador no permitió analizar esta pestaña.',
            chrome.runtime.lastError.message);
            return;
        }

        const bruto = salida && salida[0] ? salida[0].result : null;
        if (!bruto || typeof bruto !== 'object') {
          fijarEstado('error', 'El extractor no devolvió un resultado utilizable.',
            'Puede que la página siga cargando. Espera a que termine y vuelve a intentar.');
          return;
        }

        mostrar(bruto);
      });
    });
  });

  function mostrar(datos) {
    const productos = Array.isArray(datos.productos) ? datos.productos : [];

    // Validación de forma: nunca confiar en la estructura recibida sin revisarla.
    for (const p of productos) {
      for (const campo of COLS) {
        if (p[campo] != null && typeof p[campo] !== 'string') {
          agregarAviso('Dato inesperado de tipo "' + typeof p[campo] + '" en ' + campo +
            '. Ese registro se ha descartado por seguridad.', true);
          return;
        }
      }
      p.fuente_url = p.fuente_url || urlFuente;
    }

    if (datos.estado === 'parada') {
      fijarEstado('error', 'Análisis detenido.', datos.motivo);
      agregarAviso(
        'No se generó ningún CSV. Un archivo con datos incompletos sería engañoso: ' +
        'la diferencia entre "cero productos" y "no se pudo leer" es justo lo que ' +
        'esta vista debe mostrar.', true
      );
      return;
    }

    if (datos.estado === 'vacio') {
      fijarEstado('aviso', '0 productos encontrados.', datos.motivo);
      ui.cifras.hidden = false;
      ui.conteo.textContent = '0';
      ui.total.textContent = datos.total === null || datos.total === undefined
        ? '?' : String(datos.total);
      ui.verificados.textContent = '0';
      // Estructura verificada con cero productos: es un resultado válido. Se
      // habilita la descarga para que la persona pueda dejar constancia del CSV
      // con solo encabezados.
      resultado = { productos: [], advertencias: [] };
      ui.descarga.hidden = false;
      ui.descargar.disabled = false;
      return;
    }

    resultado = { productos, advertencias: datos.advertencias || [] };

    const sinRevision = productos.filter((p) => p.estado_revision === 'verificado').length;

    ui.cifras.hidden = false;
    ui.conteo.textContent = String(productos.length);
    ui.total.textContent = datos.total === null || datos.total === undefined
      ? '?' : String(datos.total);
    ui.verificados.textContent = String(sinRevision);

    const porEstado = new Map();
    for (const p of productos) {
      porEstado.set(p.estado_revision, (porEstado.get(p.estado_revision) || 0) + 1);
    }
    const resumen = Array.from(porEstado.entries())
      .map(([k, v]) => `${v} ${k}`).join(', ');

    fijarEstado('aviso',
      `${productos.length} productos leídos. Estado de revisión: ${resumen}.`,
      'El botón de descarga se habilita para que revises la vista previa. ' +
      'No se descarga nada hasta que lo pulses.');

    for (const aviso of resultado.advertencias) {
      agregarAviso(aviso);
    }

    if (sinRevision < productos.length) {
      agregarAviso(
        `${productos.length - sinRevision} registro(s) llevan condiciones a revisar. ` +
        'Las causas están en el archivo excepciones.csv que se descarga con el CSV principal.'
      );
    }

    pintarFaltantes(productos);
    pintarVista(productos, datos.total);

    ui.descarga.hidden = false;
    ui.descargar.disabled = false;
  }

  /* ------------------------------ descargar --------------------------- */

  ui.descargar.addEventListener('click', () => {
    if (!resultado) return;

    descargar('productos_erp.csv', construirCsv(resultado.productos, COLS));
    descargar('excepciones.csv', construirCsvExcepciones(resultado.productos));

    agregarAviso(
      'Se solicitaron dos archivos: productos_erp.csv y excepciones.csv. ' +
      'Revisa excepciones.csv para saber por qué cada registro no quedó verificado.'
    );
  });
})();