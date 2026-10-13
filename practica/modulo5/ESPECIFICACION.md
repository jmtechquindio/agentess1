# ESPECIFICACION · Bot de Telegram para el Spa Manos y Pies

Contrato único del proyecto. Cualquier cambio de comportamiento debe seguir este
documento. Si una implementación se contradice con esta especificación, gana la
especificación y el código se corrige.

Precios, nombres, duraciones y horarios son **ficticios**. No se usan datos
personales reales.

---

## 1. Alcance

### 1.1 Fuera de alcance (no construir)

- Pagos.
- Recordatorios automáticos.
- IA conversacional en el bot. La IA que ayuda a programar es OpenCode; el bot
  ejecuta reglas definidas.
- Notificaciones automáticas por tiempo (no hay cron en esta práctica).
- Compra y entrega del producto: el bot solo acepta, guarda y notifica.

### 1.2 Supuesto central

La clienta puede tener **una sola cita activa** a la vez. **Solicitar no equivale a
tener cita confirmada**: una cita nace en estado `pendiente` y solo el
responsable la confirma.

---

## 2. Variables de entorno

### 2.1 Configuradas por la persona (en `.env` local y en Supabase → Secrets)

| Variable | Descripción | Origen |
| --- | --- | --- |
| `TELEGRAM_BOT_TOKEN` | Token que entrega `@BotFather`. | `.env` + secreto de Supabase |
| `TELEGRAM_WEBHOOK_SECRET` | Secreto del webhook, generado con `crypto.randomUUID()`. **Distinto del token.** | `.env` + secreto de Supabase |
| `ADMIN_USER_ID` | `user_id` de Telegram del responsable. | Salida de `deno task telegram:identificar` → secreto de Supabase |
| `ADMIN_CHAT_ID` | `chat_id` de su chat privado. | Salida de `deno task telegram:identificar` → secreto de Supabase |
| `TELEGRAM_WEBHOOK_URL` | URL pública de la Edge Function. | `.env` local, no se copia a Supabase |

`ADMIN_USER_ID` y `ADMIN_CHAT_ID` cumplen funciones distintas y en chats privados
suelen coincidir. **Nunca** se toma el responsable del mensaje recibido: siempre
del entorno del servidor.

### 2.2 Inyectadas por Supabase en la función alojada

`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_PROJECT_REF` y la clave de
servicio, que puede llegar como `SUPABASE_SERVICE_ROLE_KEY` **o** como
`SUPABASE_SECRET_KEYS` (arreglo JSON). El código debe aceptar ambas.

No se copia ninguna clave de Supabase a `.env`, a ejemplos ni a la evidencia.

---

## 3. Modelo de datos

Seis tablas en el esquema `public`. Todas con `row level security` activado.

### 3.1 `spa_servicios`

| Columna | Tipo | Reglas |
| --- | --- | --- |
| `id` | `bigint generated always as identity` | PK |
| `nombre` | `text` | `not null`, `unique` |
| `descripcion` | `text` | `not null` |
| `precio_cop` | `integer` | `not null`, `check (precio_cop > 0)` |
| `duracion_min` | `integer` | `not null`, `check (duracion_min between 15 and 240)` |
| `activo` | `boolean` | `not null default true` |
| `creado_en` | `timestamptz` | `not null default now()` |

Datos iniciales ficticios (exactamente tres):

| nombre | descripcion | precio_cop | duracion_min |
| --- | --- | --- | --- |
| Manicure clásica | Limpieza de uñas, cutícula y esmaltado semipermanente. | 35000 | 60 |
| Pedicura spa | Exfoliación, soaking y máximo brillo con masaje corto. | 45000 | 75 |
| Uñas de gel | Relleno y gel curado con lámpara. | 60000 | 90 |

Los precios y las duraciones **se leen siempre de la base**, nunca se codifican en
el bot.

### 3.2 `spa_horarios`

| Columna | Tipo | Reglas |
| --- | --- | --- |
| `id` | `bigint generated always as identity` | PK |
| `inicio` | `timestamptz` | `not null`, `unique` |
| `activo` | `boolean` | `not null default true` |
| `creado_en` | `timestamptz` | `not null default now()` |

`spa_horarios` guarda **candidatos**, no reservas: un horario existe aunque nadie
lo haya tomado. La duración la aporta el servicio, no la fila.

Rejilla de generación: **lunes a sábado, de 09:00 a 17:00 hora de Bogotá, en
pasos de 60 minutos** (9 slots por día). Un slot solo es ofrecible si
`inicio + duracion_min` del servicio elegido no pasa de las **18:00** del mismo
día de Bogotá.

### 3.3 `spa_usuarios`

| Columna | Tipo | Reglas |
| --- | --- | --- |
| `user_id` | `bigint` | PK (`user_id` de Telegram) |
| `chat_id` | `bigint` | `not null` |
| `nombre` | `text` | `not null` |
| `username` | `text` | `null` |
| `primer_mensaje_en` | `timestamptz` | `not null default now()` |
| `visto_en` | `timestamptz` | `not null default now()` |
| `activo` | `boolean` | `not null default true` |

Registra quién interactuó con el bot. **No autoriza nada**: el permiso se decide
con `ADMIN_USER_ID` del entorno. Los usuarios no se borran; se marca `activo`.

### 3.4 `spa_citas`

| Columna | Tipo | Reglas |
| --- | --- | --- |
| `id` | `bigint generated always as identity` | PK |
| `cliente_user_id` | `bigint` | `not null`, FK → `spa_usuarios(user_id)` |
| `cliente_chat_id` | `bigint` | `not null` |
| `servicio_id` | `bigint` | `not null`, FK → `spa_servicios(id)` |
| `horario_id` | `bigint` | `not null`, FK → `spa_horarios(id)` |
| `estado` | `text` | `not null`, `check` en §4, `default 'pendiente'` |
| `nota` | `text` | `null` |
| `cierre_motivo` | `text` | `null` |
| `decision_por_user_id` | `bigint` | `null` |
| `decision_en` | `timestamptz` | `null` |
| `solicitada_en` | `timestamptz` | `not null default now()` |
| `actualizada_en` | `timestamptz` | `not null default now()` |
| `expira_en` | `timestamptz` | `not null` |

`expira_en` = `least(solicitada_en + interval '24 hours', inicio del horario)`.
Al vencer, la cita pasa a `vencida` de forma **perezosa**: cuando alguien consulta
o agenda, no con un proceso de fondo (§8.4).

#### Índices de `spa_citas`

| Índice | Definición | Para qué |
| --- | --- | --- |
| `spa_citas_ocupacion_unica` | `unique (horario_id) where estado in ('pendiente','confirmada')` | **Restricción real de ocupación.** Dos solicitudes simultáneas al mismo horario: una gana, la otra recibe `HORARIO_OCUPADO`. |
| `spa_citas_activa_por_clienta_unica` | `unique (cliente_user_id) where estado in ('pendiente','confirmada')` | Una sola cita activa por clienta. |
| `spa_citas_por_estado` | `(estado, actualizada_en desc)` | Listados del responsable. |
| `spa_citas_por_clienta` | `(cliente_user_id, estado)` | "Mi cita". |

Los dos índices **parciales y únicos** son la garantía de concurrencia. Consultar
si el horario está libre y luego insertar **no cumple** esta especificación.

### 3.5 `spa_notificaciones`

| Columna | Tipo | Reglas |
| --- | --- | --- |
| `id` | `bigint generated always as identity` | PK |
| `cita_id` | `bigint` | `not null`, FK → `spa_citas(id)` `on delete cascade` |
| `tipo` | `text` | `not null`, `check` en `('solicitud_registrada','cita_confirmada','cita_rechazada','cita_cancelada')` |
| `destino_chat_id` | `bigint` | `not null` |
| `destino_user_id` | `bigint` | `not null` |
| `cuerpo` | `text` | `not null` |
| `estado` | `text` | `not null default 'pendiente'`, `check` en §6.1 |
| `intentos` | `integer` | `not null default 0`, `check (intentos >= 0)` |
| `max_intentos` | `integer` | `not null default 3`, `check (max_intentos > 0)` |
| `proximo_intento_en` | `timestamptz` | `not null default now()` |
| `lease_token` | `uuid` | `null` |
| `lease_expira_en` | `timestamptz` | `null` |
| `error_codigo` | `text` | `null` |
| `error_detalle` | `text` | `null` |
| `telegram_message_id` | `bigint` | `null` |
| `creada_en` | `timestamptz` | `not null default now()` |
| `enviada_en` | `timestamptz` | `null` |

`check ((lease_token is null) = (lease_expira_en is null))`.

| Índice | Definición |
| --- | --- |
| `spa_notificaciones_cola` | `(estado, proximo_intento_en, id)` |
| `spa_notificaciones_unica_por_tipo` | `unique (cita_id, tipo)` — un aviso por evento y cita, los reintentos actualizan la misma fila |

### 3.6 `spa_eventos`

Bitácora append-only. La mutación de cita escribe aquí su evento en la **misma
transacción**.

| Columna | Tipo | Reglas |
| --- | --- | --- |
| `id` | `bigint generated always as identity` | PK |
| `tipo` | `text` | `not null`, `check` en `('cita_solicitada','cita_confirmada','cita_rechazada','cita_cancelada','cita_vencida','aviso_reclamado','aviso_finalizado','telegram_update')` |
| `cita_id` | `bigint` | `null`, FK → `spa_citas(id)` |
| `actor_user_id` | `bigint` | `null` |
| `detalle` | `jsonb` | `not null default '{}'::jsonb` |
| `creado_en` | `timestamptz` | `not null default now()` |

Índices: `(cita_id, creado_en)` y
`unique ((detalle->>'update_id')) where tipo = 'telegram_update'` — replay de
`update_id`.

---

## 4. Estados de la cita

```
(solicitar)                     -> pendiente
pendiente  --responsable confirma-> confirmada
pendiente  --responsable rechaza-> rechazada
pendiente  --clienta cancela    -> cancelada
confirmada --clienta cancela    -> cancelada
pendiente  --expira             -> vencida
```

- Estados terminales: `rechazada`, `cancelada`, `vencida`. No admiten más
  transiciones y **liberan el horario** porque los índices parciales de §3.4 solo
  cubren `pendiente` y `confirmada`.
- `confirmar` y `rechazar` **solo** por el responsable. `cancelar` por la clienta
 dueña o por el responsable.
- Doble clic, doble confirmación o replay del mismo botón **no** crean una segunda
  transición: la transición es condicional al estado actual dentro de la
  transacción.

---

## 5. RPC

Todas `security definer`, con `set search_path = public`, y con permisos
restringidos (§9.2). Los errores de negocio se lanzan con
`errcode = 'P0001'` y un mensaje estable para poder probarlos.

### 5.1 `spa_generar_horarios(p_dias integer default 21) returns integer`

Genera slots de la rejilla de §3.2 para los próximos `p_dias` días, en
`America/Bogota`, con `insert ... on conflict (inicio) do nothing`. Devuelve
cuántos slots **nuevos** se insertaron. Es **idempotente**: llamarla dos veces no
duplica ni altera los existentes.

### 5.2 `spa_mutar_cita(...)`

Firma:

```sql
spa_mutar_cita(
  p_accion              text,    -- solicitar | confirmar | rechazar | cancelar
  p_actor_user_id       bigint,
  p_actor_chat_id       bigint,
  p_cliente_user_id     bigint default null,
  p_cliente_chat_id     bigint default null,
  p_servicio_id         bigint  default null,
  p_horario_id          bigint  default null,
  p_cita_id             bigint  default null,
  p_nota                text    default null,
  p_responsable_user_id bigint,
  p_responsable_chat_id bigint
) returns table (cita_id bigint, estado text, horario_id bigint, inicio timestamptz)
```

Responsabilidades, en **una sola transacción**:

1. **`solicitar`**
   - Valida `p_servicio_id` activo y `p_horario_id` activo.
   - Revalida disponibilidad en el momento: `inicio > now()`, y
     `inicio + duracion_min <= 18:00` del día de Bogotá.
   - Inserta la cita en `pendiente` con `expira_en` según §3.4.
   - Inserta el evento `cita_solicitada`.
   - Inserta el aviso `solicitud_registrada` al responsable
     (`p_responsable_*`).
   - Si viola un índice único parcial, traduce el error a
     `HORARIO_OCUPADO` o `CITA_ACTIVA_EXISTENTE`.
2. **`confirmar` / `rechazar`**
   - Verifica `p_actor_user_id = p_responsable_user_id`; si no, `SIN_PERMISO`.
   - Exige estado `pendiente`; si no, `TRANSICION_INVALIDA`.
   - Actualiza estado, `decision_por_user_id`, `decision_en`.
   - Inserta el evento y el aviso `cita_confirmada` / `cita_rechazada` a la
     clienta.
3. **`cancelar`**
   - Permite actor = clienta dueña o responsable; en otro caso `SIN_PERMISO`.
   - Acepta `pendiente` y `confirmada`; en otro caso `TRANSICION_INVALIDA`.
   - Marca `cancelada` con `cierre_motivo` e inserta el evento y el aviso
     `cita_cancelada` a la contraparte.

Eventos de error con `errcode = 'P0001'`: `ACCION_DESCONOCIDA`,
`HORARIO_OCUPADO`, `CITA_ACTIVA_EXISTENTE`, `CITA_NO_ENCONTRADA`,
`TRANSICION_INVALIDA`, `SIN_PERMISO`, `HORARIO_PASADO`, `SERVICIO_INACTIVO`,
`HORARIO_FUERA_DE_JORNADA`, `USUARIO_NO_REGISTRADO`.

### 5.3 `spa_registrar_usuario(p_user_id bigint, p_chat_id bigint, p_nombre text, p_username text) returns void`

`upsert` en `spa_usuarios`. Es idempotente y nunca degrada a `inactivo`.

### 5.4 `spa_registrar_update(p_update_id bigint) returns boolean`

`insert` en `spa_eventos` con `tipo = 'telegram_update'` y
`detalle = {"update_id": ...}`. Devuelve `true` si es un update nuevo y `false` si
ya se había procesado (replay). El bot ignora los `false`.

### 5.5 `spa_reclamar_avisos(p_lote integer default 10, p_lease_segundos integer default 60) returns setof spa_notificaciones`

Reclama trabajo de la cola:

```sql
select * from spa_notificaciones
where estado = 'pendiente'
  and proximo_intento_en <= now()
  and (lease_expira_en is null or lease_expira_en < now())
order by proximo_intento_en, id
for update skip locked
limit least(p_lote, 50);
```

Marca cada fila con `lease_token = gen_random_uuid()`,
`lease_expira_en = now() + make_interval(secs => p_lease_segundos)` e
`intentos = intentos + 1`, y registra el evento `aviso_reclamado`. Un lease
vencido vuelve a ser reclamable.

### 5.6 `spa_finalizar_aviso(p_id bigint, p_lease_token uuid, p_resultado text, p_error_codigo text default null, p_error_detalle text default null, p_telegram_message_id bigint default null) returns spa_notificaciones`

`p_resultado` ∈ `enviado`, `fallido`, `revision`.

- Exige `lease_token` igual al de la fila y lease vigente; si no,
  `LEASE_INVALIDO`.
- **`enviado`**: `estado = 'enviada'`, `telegram_message_id`,
  `enviada_en = now()`, lease liberado.
- **`fallido`** clasifica por código (§6.2) y aplica backoff o estado terminal.
- **`revision`**: `estado = 'revision'`, no reintentable automáticamente.
- En todos los casos libera el lease.

### 5.7 `spa_vencer_citas() returns integer`

Marca como `vencida` toda cita `pendiente` cuyo `expira_en < now()` o cuyo horario
ya pasó; inserta el evento `cita_vencida`; devuelve cuántas vencieron. No envía
avisos. Se invoca de forma oportunista antes de listar citas o disponibilidad.

---

## 6. Avisos persistentes

### 6.1 Estados

`pendiente` → `enviada` (éxito) · `fallida` (permanente o agotó intentos) ·
`revision` (resultado incierto, requiere decisión humana).

### 6.2 Clasificación de errores de Telegram

| Situación | Código | Tratamiento |
| --- | --- | --- |
| HTTP 200 con `ok = false`, error permanente | `400`, `403`, `404` | `estado = 'fallida'`, sin reintento |
| HTTP 429 | `429` | Reintento con espera indicada por `retry_after` |
| HTTP 5xx | `500`–`599` | Reintento con backoff |
| `ok = true` | — | `enviado` con `telegram_message_id` |
| **Timeout incierto** (no sabemos si Telegram recibió el mensaje) | — | `estado = 'revision'`; **no reenviar a ciegas** |

Backoff: `min(30 * 2^intentos, 900)` segundos. Al superar `max_intentos`, el aviso
queda `fallida`.

### 6.3 Reglas que no se negocian

- Una **cita nunca se pierde ni se revierte** porque falle el envío de un aviso.
  La mutación de la cita y la creación del aviso ocurren en la misma transacción;
  el envío ocurre después, aparte.
- Un aviso enviado no se vuelve a enviar solo porque la clienta no lo leyó.
- `/reintentar` procesa **solo** avisos elegibles (`pendiente` y
  `proximo_intento_en <= now()`). No resuelve bloqueos de la clienta ni reenvía
  estados `fallida` o `revision`.

---

## 7. Permisos y superficie del bot

### 7.1 Comandos

| Comando | Quién | Resultado |
| --- | --- | --- |
| `/start` | Cualquiera | Menú principal y registro del usuario. |
| `/help` | Cualquiera | Explicación de las opciones. |
| `Servicios` | Cualquiera | Los tres servicios con precio y duración desde la base. |
| `Agendar` | Cualquiera | Servicio → fecha → hora → resumen → `Enviar solicitud`. |
| `Mi cita` | Cualquiera | **Solo** su cita activa; nunca la de otra persona. |
| `/pendientes` | Responsable | Avisos paginados de solicitudes sin responder. |
| `/reintentar` | Responsable | Procesa la cola elegible. |
| `/identificar` | Cualquiera | Registra el `user_id` para poder administrarlo. |

### 7.2 Reglas de autorización

- El responsable es exactamente el `user_id` de `ADMIN_USER_ID`. En chat privado,
  el `chat_id` debe coincidir con `ADMIN_CHAT_ID`.
- `ADMIN_USER_ID` y `ADMIN_CHAT_ID` se leen **del entorno**. Un mensaje que diga
  ser el responsable no otorga ningún permiso.
- Confirmar, rechazar, `/pendientes` y `/reintentar` sin permiso devuelven un
  aviso de acceso denegado **sin revelar datos de citas**.

### 7.3 Validación de la entrada

- Se procesa el evento, se **verifica `X-Telegram-Bot-Api-Secret-Token`** contra
  `TELEGRAM_WEBHOOK_SECRET` **antes** de leer el cuerpo, y después:
  - `message.chat.type` debe ser `private`.
  - `callback_query.data` se valida contra un formato generado por el servidor
    (`cita:<id>:<accion>:<emitido>:<nonce>`), el actor debe ser el responsable y
    `emitido` no puede tener más de 15 minutos.
  - Un `callback_query` que no corresponde a un botón emitido por el bot se
    ignora.
- Texto libre no reconocido responde con ayuda y opciones, no con un error.

### 7.4 Webhook

`POST` a `TELEGRAM_WEBHOOK_URL` con `verify_jwt = false` en
`supabase/config.toml`: Telegram no manda JWT de Supabase. La autenticación real
es el secreto del webhook en el código. **No se desactiva la comprobación del
secreto.**

---

## 8. Criterios de aceptación

### 8.1 Base de datos

- Seis tablas, checks, índices, RLS y privilegios aplicados.
- Tres servicios ficticios y horarios futuros generados en Bogotá.
- La mutación escribe evento, cita y aviso en una sola transacción.
- Los índices parciales únicos impiden doble ocupación y doble cita activa, con
  dos sesiones concurrentes.

### 8.2 Bot

- Menú, servicios, día y hora en Bogotá, resumen y envío.
- Fecha pasada y horario ocupado rechazados con mensaje comprensible.
- Confirmación, rechazo y cancelación con permisos por `user_id`.
- Doble clic y doble confirmación no duplican nada.
- Callback manipulado, callback viejo y replay de `update_id` se ignoran.
- Se muestran mensajes de grupo no se procesan.
- Ninguna falla de envío borra la cita.

### 8.3 Pruebas obligatorias

Con datos ficticios, **reloj fijo** y mocks; sin leer `.env` ni llamar servicios
reales. Casos mínimos:

menú inicial · servicios · día y horario en Bogotá · fecha pasada · horario
ocupado · cita propia · cancelación ajena · confirmación por alguien que no es
responsable · callback manipulado · callback viejo · dos solicitudes de la misma
persona · replay de `update_id` · doble confirmación · aviso fallido después de
guardar · HTTP 200 con `ok = false` · 429 · timeout incierto · lease vencido ·
secreto incorrecto · JSON inválido · mensaje de grupo · texto no reconocido.

Además: `tests/integration.sql` con `BEGIN`/`ROLLBACK` cubriendo permisos,
duplicados, ocupación, cancelación, vencimiento y avisos, con instrucciones para
reproducir la concurrencia en dos sesiones separadas.

### 8.4 Limitaciones que hay que reportar

- **Sin cron**: la cola de avisos solo avanza con un evento nuevo o con
  `/reintentar`. No se procesa sola.
- El bloqueo del bot por la clienta hace que el aviso quede `fallida`; la cita
  sigue siendo correcta.
- Un timeout incierto exige revisar el caso antes de reenviar.

---

## 9. Migración

Ruta: `supabase/migrations/202610020001_spa.sql`. Se ejecuta **una sola vez** en un
proyecto nuevo desde SQL Editor.

### 9.1 Prohibiciones

- Nada de `DROP TABLE`, `DROP SCHEMA` ni `TRUNCATE`.
- Nada de datos personales reales.
- Idempotencia por diseño: si hay que corregir algo, una migración incremental, no
  repetir la inicial ni borrar la base.

### 9.2 Seguridad de la base

```sql
alter table <tabla> enable row level security;
-- Políticas solo para service_role. Ninguna para anon ni authenticated.
revoke all on all tables in schema public from anon, authenticated, PUBLIC;
revoke all on function <rpc>(...) from public, anon, authenticated;
grant execute on function <rpc>(...) to service_role;
```

Como la función se despliega con `verify_jwt = false`, la clave `anon` puede
alcanzar PostgREST. Por eso no existe ninguna política ni privilegio para `anon` o
`authenticated`: el acceso es exclusivamente del rol `service_role`.
