# Revisión de un caso · Brilla Hogar

**Autor:** Carlos (Estudiante del Curso de Desarrollo Agéntico para Pymes · Cognitus)  
**Fecha:** 8 de noviembre de 2026 (Bogotá, Colombia)  
**Módulo:** 07 · Conocimiento y memoria para un agente (RAG con Pinecone, LLM Wiki y Obsidian)

---

## El caso que revisé

### 1. ¿Qué pasó?
En la conversación `BH-C014` (caso `BH-S103`), la clienta **Rosa Medina** canceló un servicio de limpieza estándar para un apartamento de dos habitaciones y un baño programado para el 14 de octubre de 2026 a las 19:00. El aviso de cancelación fue recibido por el líder de equipo **Andrés Ríos** a las 09:00 del mismo día, con exactamente **10 horas de anticipación**.

El líder de equipo decidió aplicar e informar a la clienta una penalidad por cancelación del **25%** del valor acordado ($135.000 COP), equivalente a **$33.750 COP**:
> *"Para este aviso dejo el cobro en el 25% de $135.000: $33.750."* (Andrés Ríos, `BH-C014-M004`).

Rosa Medina acusó recibo señalando que no tenía ningún acuerdo especial con la empresa, y solicitó que se dejara constancia de que la visita estaba cancelada, pero que aún no había realizado el pago. Andrés dejó el servicio como cancelado con $33.750 informado y sin confirmación de pago.

---

### 2. ¿Qué regla aplicaba?
La regla aplicable al 14 de octubre de 2026 era la política oficial de **Cancelaciones y falta de acceso** (`fuentes/04-cancelaciones.md`), aprobada por Lucía Mora con vigencia desde el 1 de octubre de 2026.

Dicha política estipula:
- Con más de 24 horas de anticipación: **Sin cobro ($0 COP)**.
- **Entre 4 y 24 horas de anticipación (ambos límites incluidos): 50% del valor programado del servicio.**
- Con menos de 4 horas o falta de acceso: **100% del valor programado.**

Dado que la cancelación ocurrió con **10 horas de antelación**, la regla general aplicable exigía cobrar el **50% del valor programado**.

Adicionalmente, según `fuentes/01-negocio.md` y `fuentes/07-cliente-dental-aurora.md`, un acuerdo específico solo sustituye la política general para el cliente que lo suscribió. Rosa Medina declaró explícitamente:
> *"No tengo un acuerdo firmado con ustedes; solo había pedido esta visita."* (`BH-C014-M005`).

---

### 3. ¿Hubo un error o una excepción autorizada?
**Conclusión: Hubo un error operativo de aplicación de políticas.**

#### Motivo y análisis:
1. **Confusión de origen:** El cobro del 25% para cancelaciones entre 2 y 12 horas es una cláusula propia y exclusiva del contrato corporativo de [[cliente-dental-aurora]] (`fuentes/07-cliente-dental-aurora.md`). Andrés Ríos confundió y trasladó indebidamente este porcentaje a un cliente residencial que se regía por la política general.
2. **Falta de competencia funcional:** Según `fuentes/06-personas-y-permisos.md`, Andrés Ríos como líder de equipo no tiene facultades para conceder excepciones a las políticas de cancelación ni otorgar descuentos superiores al 10%. Las excepciones documentadas están reservadas a Lucía Mora (responsable de operaciones).
3. **Ausencia de autorización:** Aunque Lucía Mora intervino en el chat, no autorizó ninguna excepción; únicamente solicitó el registro para control contable:
   > *"Pásame el registro del valor informado y la hora del aviso para la conciliación de la semana."* (`BH-C014-M006`).

#### Cálculo matemático de la discrepancia:
- **Tarifa base programada (2 hab / 1 baño, octubre):** $135.000 COP (`02-tarifas-octubre.md`).
- **Cobro que correspondía por regla general (50%):**
  $$\$135.000 \times 0.50 = \mathbf{\$67.500\text{ COP}}$$
- **Cobro liquidado e informado por Andrés Ríos (25%):**
  $$\$135.000 \times 0.25 = \mathbf{\$33.750\text{ COP}}$$
- **Diferencia dejada de percibir por la empresa:**
  $$\$67.500 - \$33.750 = \mathbf{\$33.750\text{ COP}}$$

#### Qué debería hacer el equipo:
- **No exigir un cobro sorpresivo a la clienta:** Dado que a Rosa Medina se le informó por escrito un valor de $33.750 COP y ella canceló bajo dicha información, exigirle posteriormente los $67.500 COP deterioraría la confianza comercial.
- **Escalamiento formal a Lucía Mora:** Andrés debe remitir el caso a Lucía Mora para que ella documente y apruebe una excepción puntual por error operativo, autorizando absorber los $33.750 COP restantes como cortesía comercial de cierre.
- **Acción preventiva:** Capacitar al personal y reforzar la consulta en la memoria/wiki para que nunca se apliquen las condiciones de clientes corporativos (como Dental Aurora) a clientes residenciales.

---

### 4. ¿Qué mensajes y documentos respaldan la respuesta?

#### Mensajes de la conversación `BH-C014` (`conversaciones/conversaciones-brilla-hogar-24.json` / `.txt`):
- `[BH-C014-M001]` **Rosa Medina (clienta):** Avisa la cancelación de la limpieza de hoy a las 19:00.
- `[BH-C014-M002]` **Andrés Ríos (líder de equipo):** Confirma recepción a las 09:00 (10 horas antes) y confirma reserva BH-S103 por $135.000 COP.
- `[BH-C014-M004]` **Andrés Ríos (líder de equipo):** Fija erróneamente el cobro en el 25% ($33.750 COP).
- `[BH-C014-M005]` **Rosa Medina (clienta):** Manifiesta no tener acuerdo firmado con Brilla Hogar.
- `[BH-C014-M006]` **Lucía Mora (operaciones):** Pide el registro para conciliación semanal sin autorizar excepción.
- `[BH-C014-M007] / [BH-C014-M008]`: Constancia de cancelación con pago pendiente de ingreso.

#### Documentos oficiales de respaldo:
- `fuentes/04-cancelaciones.md` ([[regla-04-cancelaciones]]): Establece el 50% entre 4 y 24 horas.
- `fuentes/02-tarifas-octubre.md` ([[regla-02-tarifas-octubre]]): Fija el valor del servicio en $135.000 COP.
- `fuentes/06-personas-y-permisos.md` ([[regla-06-permisos-y-limites]]): Delimita los permisos de Andrés Ríos y Lucía Mora.
- `fuentes/07-cliente-dental-aurora.md` ([[cliente-dental-aurora]]): Evidencia que la regla del 25% es exclusiva de Dental Aurora.

**Enlace en la bóveda:** [`boveda-brilla-hogar/caso-BH-S103-cancelacion-rosa-medina.md`](boveda-brilla-hogar/caso-BH-S103-cancelacion-rosa-medina.md).

---

## Cómo abrir y consultar la memoria

1. **Bóveda de Obsidian:**
   - Ubicación: `C:\Users\Carlos\.gemini\antigravity\scratch\entregable-modulo-07\boveda-brilla-hogar`
   - Abra Obsidian, seleccione *Open folder as vault* (Abrir carpeta como bóveda) y seleccione dicha ruta.
   - Navegue a través de `index.md` o abra la visualización de grafo para observar las interconexiones entre casos, clientes y reglas.

2. **Índice en Pinecone:**
   - Índice: `brilla-hogar` (namespace: `documentos` y `conversaciones`).
   - Dimensiones / modelo: 1536 dimensiones (ej. text-embedding-3-small de OpenAI o compatible de clase).

3. **Instrucciones para consultar con Hermes (LLM Wiki):**
   - Para que Hermes active la memoria de la bóveda:
     ```text
     Usa LLM Wiki para consultar la bóveda brilla-hogar en:
     C:\Users\Carlos\.gemini\antigravity\scratch\entregable-modulo-07\boveda-brilla-hogar
     Explica el caso BH-S103 de Rosa Medina y cita sus fuentes.
     ```

---

## Comprobaciones breves

### Sesión nueva (`/new`)
- **Comando ejecutado:** `/new` (reinicio completo de contexto sin re-adjuntar los archivos de texto ni conversaciones).
- **Prompt enviado a Hermes:**
  > *"Consulta con LLM Wiki el caso de Brilla Hogar que guardamos. ¿Qué pasó, qué regla aplicaba y qué concluimos? ¿Qué debería hacer el equipo si vuelve a ocurrir algo parecido? Abre las notas y cita sus fuentes. Distingue la regla general de una excepción. Si algo quedó sin confirmar, indícalo. No vuelvo a adjuntar los archivos."*
- **Resultado obtenido de Hermes:**
  - Hermes abrió exitosamente las notas: `boveda-brilla-hogar/caso-BH-S103-cancelacion-rosa-medina.md`, `boveda-brilla-hogar/regla-04-cancelaciones.md`, `boveda-brilla-hogar/cliente-rosa-medina.md` y `boveda-brilla-hogar/cliente-dental-aurora.md`.
  - Respondió correctamente que se trató de un **error operativo** en el cobro a Rosa Medina (se liquidó al 25% por confusión con la cláusula de Dental Aurora en vez del 50% reglamentario de la política general).
  - Precisó que si vuelve a ocurrir una cancelación entre 4 y 24 horas para un cliente residencial sin acuerdo especial, el equipo debe liquidar sin excepción el **50% ($67.500 COP)** y abstenerse de trasladar porcentajes contractuales de otros clientes.
  - Indicó con precisión los pendientes no confirmados: si Lucía Mora ratificará la absorción de los $33.750 COP o si se contactará a la clienta, y confirmó que el pago aún no ha ingresado.

### Documento 09 (`09-cambio-autorizado-noviembre.md`)
- **Tarifa para el 23 de octubre de 2026:** **$135.000 COP** (según `02-tarifas-octubre.md`).
- **Tarifa para el 3 de noviembre de 2026:** **$145.000 COP** (según `09-cambio-autorizado-noviembre.md`).
- **Fuente actualizada y vigencia:** Documento `fuentes/09-cambio-autorizado-noviembre.md` ([[regla-09-actualizacion-noviembre]]), aprobado por Lucía Mora el 23 de octubre de 2026 con vigencia oficial desde el **1 de noviembre de 2026**.
- **Afectación al caso revisado:** **NO afecta el caso BH-S103**. El servicio y cancelación de Rosa Medina tuvieron lugar el 14 de octubre de 2026, fecha en la que regía plenamente la tarifa de octubre ($135.000 COP). La actualización no es retroactiva y solo modifica servicios prestados desde el 1 de noviembre de 2026.

---

## Video
- **Ruta del archivo en el repositorio:** `entregable-modulo-07/video/demostracion-modulo-07.mp4`  
- **Guion y ficha técnica:** Documentado con marcas de tiempo en [`GUION_VIDEO_DEMOSTRACION.md`](GUION_VIDEO_DEMOSTRACION.md).
