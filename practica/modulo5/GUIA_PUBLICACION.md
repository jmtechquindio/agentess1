# GUÍA DE PUBLICACIÓN · Bot de Telegram del Spa Manos y Pies

Pasos para llevar la función `spa-telegram` a producción en Supabase y conectar
el webhook de Telegram. **La ejecuta la persona responsable**; este documento no
contiene secretos ni los pide.

Antes de empezar, comprueba que todo está verde en local:

```powershell
deno task check
deno task lint
deno task fmt
deno task test
```

---

## 1. Requisitos previos

- Proyecto de Supabase creado (el Project ID aparece en
  `Dashboard → Project Settings → General`).
- Bot creado en [@BotFather](https://t.me/BotFather) y su token a mano.
- `.env` local completo (copia de `.env.example` con los valores `REEMPLAZAR`
  reemplazados). El `.env` **no** se sube a Git ni se pega en el chat.
- Node 20+ (para el CLI de Supabase) o el CLI instalado por separado.

## 2. Identificar a la persona responsable

```powershell
deno task telegram:identificar
```

El script muestra los `user_id` y `chat_id` de quien haya escrito al bot.
Elige la fila de la persona responsable y guarda esos dos números como
`ADMIN_USER_ID` y `ADMIN_CHAT_ID` en los secretos de la función (paso 4).

## 3. Base de datos

1. Abre `Dashboard → SQL Editor` del proyecto.
2. Pega el contenido de `supabase/migrations/202610020001_spa.sql` y ejecútalo
   **una sola vez**.
3. Pega el contenido de `tests/integration.sql` y ejecútalo: debe terminar sin
   errores y dejar la base como estaba (la suite es un solo `DO` transaccional).
4. (Opcional) Prueba de concurrencia: abre **dos** ventanas del SQL Editor y
   ejecuta el mismo bloque de solicitud de cita en ambas; solo una debe ganar el
   horario.

## 4. Publicar la función

```powershell
npx --yes supabase@latest login
npx --yes supabase@latest functions deploy spa-telegram --project-ref <PROJECT_ID> --use-api
```

Reemplaza `<PROJECT_ID>` por el Project ID real (no el nombre del proyecto).

### Secretos de la función

En `Dashboard → Edge Functions → spa-telegram → Secrets` (o con
`supabase secrets set`), define:

| Variable | Valor |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | Token de @BotFather |
| `TELEGRAM_WEBHOOK_SECRET` | El mismo secreto que está en tu `.env` local |
| `ADMIN_USER_ID` | `user_id` de la persona responsable (paso 2) |
| `ADMIN_CHAT_ID` | `chat_id` de la persona responsable (paso 2) |

`SUPABASE_URL` y la clave de servicio (`SUPABASE_SERVICE_ROLE_KEY` o
`SUPABASE_SECRET_KEYS`) las inyecta Supabase automáticamente; **no** las copies
al `.env` ni a los secretos.

## 5. Conectar el webhook

```powershell
deno task telegram:conectar
```

El script registra el webhook con `secret_token` (el mismo
`TELEGRAM_WEBHOOK_SECRET`) y responde `"configurado": true`.

Comprueba el estado:

```powershell
deno task telegram:estado
```

Debe mostrar `"conectado_a_esta_funcion": true`.

## 6. Prueba de negocio en Telegram

Con el bot publicado y el webhook conectado:

1. `/start` muestra el menú.
2. Solicitar una cita (Agendar → servicio → día → hora → Enviar solicitud).
3. La responsable recibe la solicitud con botones Confirmar / Rechazar.
4. La clienta ve su cita con `Mi cita` y puede cancelarla.
5. Doble clic en un botón: no se duplica la cita.
6. Dos clientas distintas piden el mismo horario: solo una lo consigue
   (requiere una segunda cuenta de Telegram).
7. Bloquear el bot y confirmar: la cita queda confirmada igual (el aviso falla,
   la cita no se pierde).

## 7. Si algo falla

- `deno task telegram:estado` no conecta → revisa que la función esté
  desplegada y que `TELEGRAM_WEBHOOK_SECRET` sea el mismo en `.env` y en los
  secretos de la función.
- La función responde 401 → el `secret_token` del webhook no coincide con
  `TELEGRAM_WEBHOOK_SECRET`.
- La función responde 500 → revisa los logs en
  `Dashboard → Edge Functions → spa-telegram → Logs`; el mensaje de error
  nombra la variable de entorno que falta sin revelar valores.

---

## Notas

- La cola de avisos no tiene cron: avanza con cada evento nuevo o con
  `/reintentar` (solo la persona responsable).
- `ok = true` de Telegram significa mensaje aceptado, **no leído**.
- Un timeout incierto deja el aviso en `revision`; no se reenvía a ciegas.