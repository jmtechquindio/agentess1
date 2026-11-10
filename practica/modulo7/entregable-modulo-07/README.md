# Revisión de un caso · Brilla Hogar

**Autor:** Carlos  
**Fecha:** 30 de octubre de 2026  
**Curso:** Conocimiento y memoria para un agente (Módulo 7 · Fundación Cognitus)

---

## El caso que revisé

### 1. ¿Qué pasó?

El 6 de octubre de 2026 a las 11:00 (hora de Bogotá), Camila Pardo, contacto de instalaciones de [[Dental Aurora]], solicitó cancelar el servicio de limpieza de oficinas programado para ese mismo día a las 19:00 (caso `BH-AURORA-0610`). La cancelación se notificó con exactamente **8 horas de anticipación**.

[[Lucía Mora]] (responsable de operaciones) revisó el acuerdo particular vigente y confirmó un cobro del **25% ($108.000 COP)**. Andrés Ríos había considerado inicialmente el 50% de la regla general, pero esa regla no prevalece cuando el acuerdo específico del cliente regula expresamente la situación.

### 2. ¿Qué regla aplicaba?

En esa fecha coexistían dos disposiciones:

1. **Regla general (`04-cancelaciones.md`):** más de 24 horas: 0%; entre 4 y 24 horas, incluidos ambos límites: 50%; menos de 4 horas: 100%; falta de acceso: 100%.
2. **Acuerdo específico prevalente (`07-cliente-dental-aurora.md`):** para Dental Aurora, más de 12 horas: 0%; entre 2 y 12 horas: 25%; menos de 2 horas: 50%.

Como el aviso se dio con 8 horas, aplica el **25% del acuerdo de Dental Aurora**, no el 50% de la regla general.

### 3. ¿Cuál fue el resultado?

- **Cálculo:** la tarifa de visita de oficina recurrente para 300 m² es de $432.000 COP. El 25% equivale a **$108.000 COP**.
- **Autoridad:** Lucía Mora, responsable de operaciones, cuenta con facultad para aplicar las condiciones comerciales documentadas según `06-personas-y-permisos.md`.
- **Estado del cobro:** la conversación confirma que el valor fue calculado e informado para remitirlo a facturación. Camila indicó expresamente que **no estaba reportando un pago todavía**. Andrés registró la visita como cancelada y el cobro como informado, no como visita realizada.
- **Conclusión:** la decisión fue correcta por prevalencia contractual. La evidencia consultada no demuestra que el cobro haya sido pagado.

### 4. ¿Qué mensajes y documentos respaldan la respuesta?

- **Conversación:** `BH-C010` (mensajes `[BH-C010-M001]` a `[BH-C010-M008]`, caso `BH-AURORA-0610`).
- **Acuerdo particular:** `07-cliente-dental-aurora.md` (condiciones propias de cancelación).
- **Norma general:** `04-cancelaciones.md` (cancelaciones y falta de acceso).
- **Tarifas:** `02-tarifas-octubre.md` (oficinas recurrentes).
- **Nota en la wiki:** [Caso BH-AURORA-0610](boveda-obsidian/cases/Caso%20BH-AURORA-0610.md).

---

## Cómo abrir y consultar la memoria

- **Bóveda de Obsidian:** carpeta [`boveda-obsidian/`](boveda-obsidian/) (ubicación local indicada en la entrega: `C:\Users\Carlos\modulo-7-cognitus\entregable-modulo-07\boveda-obsidian`).
- **Índice Pinecone:** el README declara un índice `brilla-hogar` (Serverless AWS `us-east-1`, embedding `multilingual-e5-large`) con 8 documentos normativos y 24 conversaciones. Esta declaración describe la configuración reportada por el autor; para que sea evidencia verificable de ejecución, conviene adjuntar captura del índice, estadísticas de vectores y resultado de una consulta real.
- **Consulta con Hermes:** 
  ```text
  Usa llm-wiki para consultar el caso BH-AURORA-0610 de Brilla Hogar en la wiki configurada. Resume qué pasó, qué regla aplicaba, qué concluimos y cita sus fuentes.
  ```

---

## Comprobaciones y alcance de la evidencia

- **Sesión nueva (`/new`):** el autor reporta que Hermes recuperó el contexto desde las notas conectadas de la bóveda, sin volver a adjuntar los archivos. En el repositorio revisado no se adjuntan transcripciones de esa sesión, logs de recuperación ni capturas que permitan verificar independientemente el resultado.
- **Documento 09 (actualización aprobada para noviembre):**
  - **Tarifa en octubre de 2026:** **$138.000 COP** para vivienda estándar de 2 habitaciones y 1 baño.
  - **Desde el 1 de noviembre de 2026:** **$145.000 COP**, según el cambio documentado y aprobado por Lucía Mora.
  - **Impacto en el caso revisado:** ninguno. La actualización modifica exclusivamente la tarifa de limpieza residencial estándar; no tiene retroactividad ni efecto sobre el servicio corporativo de oficinas de Dental Aurora.

---

## Video de demostración

La ruta prevista es `video/demostracion-modulo-07.mp4`. En la versión del repositorio revisada para esta corrección no se encontró el archivo MP4; sí están las [instrucciones de grabación](video/INSTRUCCIONES-VIDEO.md). Por tanto, el video debe incorporarse antes de presentar la entrega como evidencia audiovisual completa.
