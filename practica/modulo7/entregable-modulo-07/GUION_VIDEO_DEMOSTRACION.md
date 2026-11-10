# Guion para el Video de Demostración (3–5 Minutos)

**Entregable Módulo 7 · Brilla Hogar · Cognitus**  
**Duración objetivo:** ~4:00 minutos  
**Herramientas en pantalla:** Obsidian (Bóveda `boveda-brilla-hogar`), Terminal/Chat con Hermes, Documentos fuente.

---

## Estructura del Video Minuto a Minuto

### [00:00 - 00:45] Bloque 1: Presentación del Caso y el Reto
- **En pantalla:** Portada de `README.md` o vista del grafo en Obsidian.
- **Narración:**
  > *"Hola a todos. En este video presento el entregable del Módulo 7 sobre conocimiento y memoria para un agente agéntico con RAG, Pinecone, LLM Wiki y Obsidian. En Brilla Hogar revisamos las decisiones operativas registradas en 24 conversaciones frente a los 8 documentos oficiales de la empresa. Identifiqué y analicé el caso **BH-S103**, correspondiente a la clienta **Rosa Medina** en la conversación `BH-C014`."*

### [00:45 - 01:45] Bloque 2: Las 4 Preguntas y las Fuentes
- **En pantalla:** Documento `04-cancelaciones.md` en paralelo con el chat `BH-C014` y la nota `caso-BH-S103-cancelacion-rosa-medina.md`.
- **Narración:**
  > *"1. **¿Qué pasó?** Rosa Medina canceló su servicio de limpieza de $135.000 COP con 10 horas de antelación. Andrés Ríos le liquidó un cobro de cancelación del 25% ($33.750 COP).*  
  > *2. **¿Qué regla aplicaba?** La política oficial `04-cancelaciones` exige cobrar el **50% ($67.500 COP)** para cancelaciones entre 4 y 24 horas.*  
  > *3. **¿Hubo error o excepción?** Fue un **error operativo**: Andrés confundió la regla general con el contrato exclusivo de Dental Aurora, donde sí existe una escala del 25%. Además, Andrés no tiene facultades para conceder excepciones y Lucía Mora nunca la autorizó.*  
  > *4. **Fuentes:** La conversación `BH-C014` (mensajes 1 al 8), `04-cancelaciones`, `06-personas-y-permisos` y `07-cliente-dental-aurora`."*

### [01:45 - 02:45] Bloque 3: Organización de la Memoria en Obsidian (LLM Wiki)
- **En pantalla:** Navegación por la bóveda de Obsidian: `index.md`, vista de grafo (`Graph View`), `SCHEMA.md` y `log.md`.
- **Narración:**
  > *"Aquí podemos ver la bóveda estructurada según los estándares de LLM Wiki. En `index.md` tenemos conectados el caso con la ficha del cliente `[[cliente-rosa-medina]]`, las políticas generales `[[regla-04-cancelaciones]]` y la regla corporativa de `[[cliente-dental-aurora]]`. Esta red de enlaces permite que el agente entienda que las condiciones de un cliente especial no alteran la política general de la empresa."*

### [02:45 - 03:45] Bloque 4: Demostración de Sesión Nueva (`/new`)
- **En pantalla:** Terminal o interfaz de Hermes. Se escribe `/new` y luego se pega el prompt de consulta.
- **Narración:**
  > *"Ahora simulamos la prueba de fuego de la memoria agéntica: ejecutamos `/new` para limpiar todo el contexto. Sin volver a adjuntar los documentos de texto ni los chats, le pedimos a Hermes que consulte la memoria de la bóveda sobre el caso de Brilla Hogar.*  
  > *Observen cómo Hermes consulta inmediatamente las notas de Obsidian, cita las fuentes, identifica que fue un error y explica cómo debe actuar el equipo en el futuro (cobrando el 50% y sin trasladar cláusulas de otros contratos), advirtiendo además lo que aún está pendiente por conciliar."*

### [03:45 - 04:30] Bloque 5: Actualización Documento 09 y Cierre
- **En pantalla:** Nota `regla-09-actualizacion-noviembre.md`.
- **Narración:**
  > *"Finalmente, incorporamos el Documento 09 emitido por Lucía Mora el 23 de octubre. Hermes reconoce que para el 23 de octubre la tarifa seguía siendo de $135.000 COP, mientras que para el 3 de noviembre pasa a $145.000 COP. Además, confirma que esta actualización no afecta retroactivamente el caso de Rosa Medina. Con esto demostramos la persistencia, precisión y gobierno de la memoria para un agente agéntico en una Pyme. Muchas gracias."*
