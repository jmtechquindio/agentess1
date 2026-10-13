# NOTAS DE RECONSTRUCCIÓN

## Qué es este paquete

Una **reconstrucción** del paquete inicial `taller-telegram-opencode.zip` del
Módulo 5, hecha a partir de la guía publicada en
`https://cursoia.cognitus.org/entregables/modulo-5/index.html` el 2 de octubre de
2026.

## Por qué se reconstruyó

El ZIP original **no está publicado** en el sitio del curso. Comprobaciones
hechas:

| Comprobación | Resultado |
| --- | --- |
| Enlaces `.zip` en el HTML del entregable | Ninguno; el nombre del archivo aparece solo como texto |
| `GET /modulo-5/taller-telegram-opencode.zip` | `403 AccessDenied` (S3 tras CloudFront) |
| Otras rutas plausibles (`/recursos/`, `/clase-1/recursos/`, `proyecto-inicial.zip`) | `403` |
| Un `.zip` de otro módulo (`/modulo-4/chrome-extension-development-safe.zip`) | `206 OK` → el servidor sí publica zips |
| Recursos descargables en la página del módulo 5 y en el inicio del curso | Solo PDF |

Lo más probable es que el ZIP se entregue por la plataforma del curso o
directamente por los instructores.

## Qué está tomado de la guía y qué se decidió aquí

### Fiel a la guía

- Archivos que la guía dice que trae el paquete: `AGENTS.md`, `ESPECIFICACION.md`,
  `opencode.json`, `.env.example`, `scripts/`.
- `deno.json` con **solo** las tres tareas `telegram:identificar`,
  `telegram:conectar` y `telegram:estado`; la guía pide "conservar" esas tres y
  que `check` y `test` se añadan después.
- Plan sin escritura ni comandos; Build con permisos.
- Zona `America/Bogota`, confirmación humana, permisos por `user_id` desde el
  entorno, restricción real de ocupación en Postgres y notificaciones
  persistentes.
- `tests/integration.sql` con `BEGIN`/`ROLLBACK` y el resto de casos de prueba
  enumerados en la guía.

### Decisiones de diseño (pueden diferir del ZIP original)

La guía menciona "las seis tablas" y cuatro nombres (`spa_servicios`,
`spa_horarios`, `spa_citas`, `spa_notificaciones`), pero **no publica el
contrato**. Las dos tablas restantes se definieron así:

| Tabla | Razón |
| --- | --- |
| `spa_usuarios` | La guía pide que el bot no mantenga la conversación solo en memoria y que el rol se resuelva por `user_id`; hace falta registrar quién interactuó. |
| `spa_eventos` | La guía dice que la mutación "guarda el **evento**, la cita y los avisos en una sola transacción". Aquí vive también la deduplicación de `update_id` (índice único parcial), para no inventar una séptima tabla. |

Otros puntos fijados aquí y que el ZIP puede tener distintos:

- **RPC**: `spa_generar_horarios`, `spa_mutar_cita`, `spa_registrar_usuario`,
  `spa_registrar_update`, `spa_reclamar_avisos`, `spa_finalizar_aviso`,
  `spa_vencer_citas`. La guía solo nombra las dos primeras.
- **Firmas exactas y mensajes de error** (`HORARIO_OCUPADO`,
  `CITA_ACTIVA_EXISTENTE`, `TRANSICION_INVALIDA`, `SIN_PERMISO`,
  `LEASE_INVALIDO`, ...). Son una decisión de este paquete.
- **Rejilla de horarios**: lunes a sábado, 09:00–17:00 en pasos de 60 minutos, y
  un slot solo se ofrece si `inicio + duracion_min` no pasa de las 18:00.
- **Servicios ficticios**: los nombres, precios y duraciones concretos de §3.1.
- **Backoff** de avisos: `min(30 * 2^intentos, 900)` segundos, `max_intentos = 3`.
- **Formato de callback**: `cita:<id>:<accion>:<emitido>:<nonce>`, con ventana de
  15 minutos.
- **Duración del webhook**: 15 segundos antes de marcar el aviso como incierto.

## Qué no incluye

Ni la migración SQL, ni la función `spa-telegram`, ni `tests/integration.sql`:
esos los construye OpenCode con los prompts 2, 3 y 4, que es exactamente el
ejercicio del taller.

## Qué sí se verificó aquí

Con Deno 2.9.7 portable, sin tocar cuentas de Telegram ni de Supabase:

- `deno check scripts/*.ts` → sin errores.
- `deno lint` → 7 archivos, 0 problemas.
- `deno fmt --check` → 9 archivos, sin cambios pendientes.
- `deno test scripts/telegram-config_test.ts` → 12 pruebas, 0 fallas.
- `deno task telegram:conectar` y `deno task telegram:estado` sin `.env` → mensaje
  accionable y código de salida 1.

Lo que **no** se verificó, y sigue PENDIENTE: integración SQL, concurrencia en
dos sesiones, publicación de la función y cualquier flujo real de Telegram.

## Lo que añadió el Prompt 2

- `supabase/migrations/202610020001_spa.sql` y `supabase/config.toml`.
- `tests/integration.sql`, transaccional, con `ROLLBACK` y datos ficticios.

Las decisiones que la ejecución local dejó fijadas:

- **`rechazar` notifica siempre a la clienta.** La primera versión de la prueba
  asumía que no, porque un rechazo parece interno; pero la especificación lista
  `cita_rechazada` como aviso a la clienta, y cancelar sin avisar deja a la persona
  sin saber qué pasó con su cita.
- **`rechazar` solo aplica a citas `pendiente`; `cancelar` acepta `pendiente` y
  `confirmada`.** Cancelar lo confirmado es parte del flujo; rechazar lo ya
  confirmado no tiene sentido.
- **`spa_mutar_cita` necesita `#variable_conflict use_column`** dentro del cuerpo.
  Sus columnas `OUT` (`cita_id`, `estado`, `horario_id`, `inicio`) se convierten en
  variables de plpgsql que chocan con las columnas reales dentro del propio
  `insert ... on conflict (cita_id, tipo)`. Sin esta opción, la **primera** llamada
  falla por ambigüedad aunque el SQL compile.
- **La suite NO toca `plpgsql.variable_conflict`.** Se intentó y en Supabase falla
  con `42501 permission denied to set parameter`, porque el rol `postgres` de un
  proyecto alojado no es superusuario. No hace falta: la ambigüedad ocurre dentro
  de la función, y ahí ya se resuelve con la directiva en el cuerpo. Fuera de la
  función, los resultados se nombran con alias (`_res`, `_libre`, `_otra`).
- **La migración se aplicó en Supabase** con el SQL Editor: 79 sentencias sin
  error. `tests/integration.sql` se corrigió después al aparecer ese `42501`, así
  que hay que volver a pegarla (el archivo cambió).

### Cómo se ejecutó el SQL sin Supabase

Con `@electric-sql/pglite`, que es PostgreSQL 18.3 en WASM, sobre una base
desechable y sentencia por sentencia. Es una verificación real de sintaxis,
plpgsql, índices, RLS y semántica; **no** sustituye a ejecutar en el SQL Editor,
que además corre en 15/17. El arnés se usó desde el directorio temporal: no forma
parte del paquete ni de `deno.json`. Los resultados están en
`evidencia/RESULTADOS.md`.

## Lo que enseña el SQL Editor de Supabase

Esto costó tres intentos fallidos contra el proyecto real y conviene no volver a
aprenderlo por la vía dura:

1. **Parte el texto en varias sentencias y las manda por conexiones distintas.**
   Probado: `begin; create temporary table x; select * from x; rollback;` falla
   con `relation "x" does not exist`. Así que las tablas temporales no sobreviven
   entre sentencias, y `BEGIN`/`ROLLBACK` tampoco abarca nada.
2. **El texto pegado entra en el portapapeles de la sesión del usuario.** La vía
   que sí funcionó fue abrir el archivo en el Bloc de notas desde la terminal y
   copiar desde ahí.
3. **`postgres` no es superusuario.** Cualquier `set_config` de un parámetro que
   solo el superusuario puede cambiar da `42501`.
4. **Desde plpgsql no hay transacciones parciales.** `EXECUTE of SAVEPOINT`,
   `ROLLBACK TO` y `SELECT ... INTO` por `execute` dan
   `EXECUTE of transaction commands is not implemented`.

De ahí la forma final de `tests/integration.sql`: **una sola instrucción**
`do $todo$ ... $todo$`. Un `DO` es atómico, así que si algo falla no queda nada;
y como no hay `SAVEPOINT`, la limpieza del final es explícita y de alcance
estrecho (solo lo que la prueba creó), verificada comparando contra el estado
inicial. Los helpers y las tablas de prueba viven en `pg_temp`, que desaparece al
cerrar la conexión, así que el proyecto no se queda con ningún objeto extra.

### Si consigues el ZIP original

Compara `ESPECIFICACION.md` con la versión oficial y ajusta lo que difiera antes
de empezar el Prompt 1. Todo lo demás (`AGENTS.md`, `opencode.json`,
`.env.example`, scripts) debería seguir siendo válido.
