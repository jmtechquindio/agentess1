# Revisión de un caso · Brilla Hogar

**Autor:** Carlos  
**Fecha:** 30 de octubre de 2026  
**Curso:** Conocimiento y memoria para un agente (Módulo 7 · Fundación Cognitus)

---

## El caso que revisé

### 1. ¿Qué pasó?
El 6 de octubre de 2026 a las 11:00 (hora de Bogotá), Camila Pardo (contacto de instalaciones de [[Dental Aurora]]) solicitó cancelar el servicio de limpieza de oficinas programado para ese mismo día a las 19:00 (Caso `BH-AURORA-0610`). La cancelación se notificó con exactamente **8 horas de anticipación**. [[Lucía Mora]] (responsable de operaciones) liquidó un cobro del **25% ($108.000 COP)**, aclarando la situación ante [[Andrés Ríos]] (líder de equipo), quien inicialmente consideraba cobrar el 50% según la política general.

### 2. ¿Qué regla aplicaba?
En esa fecha coexistían dos disposiciones:
1. **Regla General (`04-cancelaciones.md`):** Para cancelaciones ordinarias con menos de 10 horas de anticipación aplica un cobro del 50% del valor de la visita.
2. **Norma Específica Prevalente (`07-cliente-dental-aurora.md`):** El contrato corporativo suscrito con Dental Aurora (vigente desde el 1 de octubre de 2026) sustituye formalmente las condiciones generales para este cliente y establece que las cancelaciones entre 2 y 12 horas generan un cobro del **25% del precio de la visita**.

### 3. ¿Hubo un error o una excepción autorizada?
**Fue una excepción contractual debidamente autorizada.**
- **Cálculo y cifras:** La tarifa de visita de oficina recurrente para 300 m² es de $432.000 COP (conforme a `02-tarifas-octubre.md`). El 25% de $432.000 COP es exactamente **$108.000 COP**. No existió ningún error de liquidación.
- **Autoridad:** Lucía Mora, como responsable de operaciones, cuenta con la potestad formal para aplicar acuerdos comerciales y autorizar excepciones según `06-personas-y-permisos.md`.
- **Acción a seguir por el equipo:** El equipo actuó de forma impecable. Debe registrarse la visita como cancelada con cobro informado de $108.000 COP trasladado a facturación, sin marcar la visita como realizada ni aplicar cargos adicionales.

### 4. ¿Qué mensajes y documentos respaldan la respuesta?
- **Conversación:** `BH-C010` (mensajes `[BH-C010-M001]` al `[BH-C010-M008]`, Caso `BH-AURORA-0610`).
- **Acuerdo particular:** Documento `07-cliente-dental-aurora.md` (sección *Condiciones propias de cancelación*).
- **Norma general:** Documento `04-cancelaciones.md` (sección *Cancelaciones y falta de acceso*).
- **Tarifas:** Documento `02-tarifas-octubre.md` (sección *Oficinas recurrentes*).
- **Nota en la wiki:** [Caso BH-AURORA-0610](boveda-obsidian/cases/Caso%20BH-AURORA-0610.md).

---

## Cómo abrir y consultar la memoria
- **Bóveda de Obsidian:** Carpeta [`boveda-obsidian/`](boveda-obsidian/) (ubicación en el equipo: `C:\Users\Carlos\modulo-7-cognitus\entregable-modulo-07\boveda-obsidian`).
- **Índice Pinecone:** Índice `brilla-hogar` (Serverless AWS `us-east-1`, modelo integrado `multilingual-e5-large`), indexado con los 8 documentos normativos y las 24 conversaciones.
- **Consulta con Hermes:**
  ```text
  Usa llm-wiki para consultar el caso BH-AURORA-0610 de Brilla Hogar en la wiki configurada. Resume qué pasó, qué regla aplicaba, qué concluimos y cita sus fuentes.
  ```

---

## Comprobaciones breves
- **Sesión nueva (`/new`):** En una sesión limpia sin volver a adjuntar los archivos, Hermes recuperó el contexto desde las notas conectadas de la bóveda (`Caso BH-AURORA-0610.md`, `Acuerdo Especial Dental Aurora.md` y `Política de Cancelaciones.md`), distinguiendo la regla general del acuerdo particular y citando las fuentes primarias.
- **Documento 09 (Actualización aprobada para noviembre):**
  - **Tarifa al 23 de octubre de 2026:** **$138.000 COP** (tarifa vigente en octubre para vivienda estándar de 2 habitaciones y 1 baño).
  - **Tarifa al 3 de noviembre de 2026:** **$145.000 COP** (tarifa aprobada por Lucía Mora vigente a partir del 1 de noviembre de 2026).
  - **Impacto en el caso revisado:** Ninguno. La actualización modifica exclusivamente la tarifa de limpieza estándar residencial y no tiene retroactividad ni efecto sobre el servicio corporativo de oficinas de Dental Aurora.

---

## Video
- **Ubicación:** [`video/demostracion-modulo-07.mp4`](video/)
- Instrucciones de grabación y estructura de los 3–5 minutos detalladas en [`video/INSTRUCCIONES-VIDEO.md`](video/INSTRUCCIONES-VIDEO.md).
