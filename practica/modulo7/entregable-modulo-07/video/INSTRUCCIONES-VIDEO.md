# Guía para el Video de Demostración (3 a 5 minutos)

Para completar la entrega del Módulo 7, graba un video breve (por ejemplo usando OBS Studio o la barra de juegos de Windows `Win + G`) siguiendo este guión exacto:

## Estructura sugerida del video

### Minuto 0:00 - 1:00 · Presentación del caso
- Muestra el archivo `README.md` y explica brevemente el caso **BH-AURORA-0610**:
  - Cancelación avisada por Camila Pardo (Dental Aurora) con 8 horas de anticipación.
  - La duda inicial de Andrés Ríos sobre la regla general del 50%.
  - La intervención de Lucía Mora aplicando el 25% ($108.000 COP).

### Minuto 1:00 - 2:15 · Verificación RAG y fuentes
- Muestra la consola de Pinecone o la consulta en Hermes sobre el índice `brilla-hogar`.
- Enseña el documento `07-cliente-dental-aurora.md` y la conversación `BH-C010`, destacando cómo el acuerdo especial sustituye a la regla general.

### Minuto 2:15 - 3:45 · La bóveda en Obsidian y el Grafo
- Abre Obsidian en la carpeta `entregable-modulo-07/boveda-obsidian`.
- Muestra la nota del `Caso BH-AURORA-0610`, sus enlaces con `Dental Aurora` y `Política de Cancelaciones`.
- Pulsa `Ctrl + G` para mostrar la **Vista de Grafo (Graph view)** y enseñar cómo están interconectadas las entidades y los conceptos.

### Minuto 3:45 - 5:00 · Demostración en Hermes (Sesión limpia)
- En Hermes o la terminal, ejecuta una consulta en una sesión nueva (`/new`) pidiéndole al agente que consulte la wiki sobre el caso Dental Aurora.
- Muestra que Hermes recupera los datos y cita las fuentes sin tener que reenviarle los documentos originales.
- Menciona brevemente la actualización del Documento 09 ($138.000 vs $145.000 COP).

Guarda el archivo resultante como `demostracion-modulo-07.mp4` en esta misma carpeta `video/`.
