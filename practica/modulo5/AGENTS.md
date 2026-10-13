# AGENTS.md · Reglas del proyecto

Vigilan en todo el repositorio. Si una instrucción entra en conflicto con
`ESPECIFICACION.md`, manda `ESPECIFICACION.md`.

## Idioma y tono

- Responde y escribe el código en **español**.
- Explica los cambios en pasos verificables, no con promesas.

## Alcance

- Construye **exactamente** el alcance de `ESPECIFICACION.md`.
- No agregues_framework_, _modelo de IA_, pagos, recordatorios automáticos, cron,
  webhooks adicionales, librerías de terceros que no estén justificadas ni
  capacidades que la persona no pidió.
- Si un cambio parece necesario pero no está en la especificación, **propónlo y
  espera aprobación**. No lo implementes por tu cuenta.

## Agentes

- **Plan**: no escribe archivos ni ejecuta comandos. Solo lee y propone.
- **Build**: crea archivos y ejecuta comprobaciones.
- No cambies la configuración de permisos de `opencode.json` para poder hacer el
  trabajo con más libertad.

## Secretos

- **Nunca** leas, imprimas, copies ni resumas `.env`, tokens, claves de API ni
  contraseñas.
- **Nunca** pidas tokens, claves o contraseñas. Si falta una variable, dilo con el
  nombre y sigue con el resto.
- No copies claves de servidor a ejemplos locales, a `.env.example` ni a la
  evidencia.
- No escribas un `.env` real en el repositorio.
- No incluyas datos personales reales en pruebas, capturas ni ejemplos.

## Datos

- Prohibido `DROP TABLE`, `DROP SCHEMA`, `TRUNCATE` y cualquier operación que
  destruya datos para "dejar limpio" el entorno.
- Si una migración ya corrió, las correcciones van en una **migración
  incremental**.
- Los servicios, precios, horarios y citas del taller son **ficticios**.

## Base de datos

- La ocupación y la cita activa se garantizan con **índices únicos parciales** en
  Postgres. Nunca con "consultar si está libre y luego insertar".
- La mutación de cita escribe evento, cita y aviso en **una sola transacción**.
  No la repartas en llamadas HTTP separadas.

## Zona horaria

- Todo horario visible y toda comparación de fechas usa **`America/Bogota`**.
- Almacena `timestamptz`. Muestra la hora local de Bogotá de forma explícita.

## Notificaciones

- Una cita nunca se pierde ni se revierte porque falle el envío de un aviso.
- `ok = true` de Telegram significa **aceptado**, no leído. No prometas entrega ni
  lectura.
- Ante un timeout incierto, conserva el aviso en `revision`. No reenvíes a ciegas.

## Pruebas

- Prueba con **datos ficticios**, **reloj fijo** y **mocks**. Sin red real.
- Distingue siempre las pruebas con mocks de las que necesitan una base real.
- **No elimines una prueba** ni **reduzcas sus aserciones** para que pase.
- No crees archivos o pruebas ficticias solo para hacer pasar `check` o `test`.
- Si una comprobación falla, corrige la causa y repite. No ajustes el criterio.
- Si algo no se pudo ejecutar, repórtalo como **PENDIENTE**. Nunca declares
  aprobada una integración, una prueba de concurrencia o un flujo real de
  Telegram que no hayas ejecutado.

## Entrega

- No publiques la función en Supabase ni registres el webhook sin que la persona
  lo pida en ese momento.
- Mantén `evidencia/RESULTADOS.md` actualizado con lo ejecutado y lo pendiente,
  separando lo que ejecutó la persona de lo que observaste tú.
- Sin secretos en capturas, consultas ni ejemplos.
