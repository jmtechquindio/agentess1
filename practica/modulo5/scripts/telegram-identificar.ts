/**
 * `deno task telegram:identificar`
 *
 * Lista las personas que escribieron al bot (mediante /start, /help o
 * /identificar) y muestra su `user_id` y su `chat_id`, para poder elegir quién es
 * el responsable y guardar `ADMIN_USER_ID` y `ADMIN_CHAT_ID` en Supabase.
 *
 * Lee los mensajes pendientes con `getUpdates`, así que debe ejecutarse **antes**
 * de registrar el webhook. Si ya hay un webhook, no lo borra: lo dice.
 */

import { aborta, cargaEnv, valor } from "./entorno.ts";
import { ErrorIncierto, ErrorTelegram, llamaTelegram } from "./telegram-api.ts";
import {
  esPlaceholder,
  extraeUsuarios,
  horaBogota,
  type TelegramUpdate,
} from "./telegram-config.ts";

interface InfoWebhook {
  url: string;
  pending_update_count: number;
  last_error_message?: string;
}

interface UsuarioBot {
  id: number;
  username?: string;
  first_name?: string;
}

function tabla(usuarios: ReturnType<typeof extraeUsuarios>): void {
  if (usuarios.length === 0) return;

  const encabezado = ["user_id (ADMIN_USER_ID)", "chat_id (ADMIN_CHAT_ID)", "nombre", "comandos"];
  const filas = usuarios.map((u) => [
    String(u.user_id),
    String(u.chat_id),
    u.username ? `${u.nombre} (@${u.username})` : u.nombre,
    u.comandos.length > 0 ? u.comandos.join(", ") : "(sin comandos)",
  ]);

  const anchos = encabezado.map((columna, i) =>
    Math.max(columna.length, ...filas.map((fila) => fila[i].length))
  );
  const linea = (celdas: string[]): string =>
    celdas.map((celda, i) => celda.padEnd(anchos[i])).join("  ");

  console.log(linea(encabezado));
  console.log(anchos.map((ancho) => "-".repeat(ancho)).join("  "));
  for (const fila of filas) console.log(linea(fila));
}

async function principal(): Promise<void> {
  const variables = cargaEnv();
  const token = valor(variables, "TELEGRAM_BOT_TOKEN");

  if (esPlaceholder(token)) {
    aborta(
      "Falta TELEGRAM_BOT_TOKEN.\n" +
        "Copia .env.example a .env, reemplaza REEMPLAZAR_TOKEN_DE_BOTFATHER por el token de\n" +
        "BotFather y vuelve a ejecutar. No pegues el token en el chat de OpenCode.",
    );
  }

  const yo = await llamaTelegram<UsuarioBot>(token, "getMe");
  console.log(`Bot: @${yo.username ?? yo.id} (${yo.first_name ?? "sin nombre"})`);

  const webhook = await llamaTelegram<InfoWebhook>(token, "getWebhookInfo");
  if (webhook.url !== "") {
    console.log("");
    console.log("Aviso: este bot ya tiene un webhook registrado:");
    console.log(`  ${webhook.url}`);
    console.log(
      "getUpdates no funciona mientras exista un webhook. No lo borres a ciegas: usa los IDs que\n" +
        "ya guardaste en Supabase, o crea un bot nuevo de taller.",
    );
  }

  let updates: TelegramUpdate[] = [];
  try {
    updates = await llamaTelegram<TelegramUpdate[]>(token, "getUpdates", {
      timeout: 0,
      allowed_updates: ["message"],
    });
  } catch (error) {
    if (error instanceof ErrorTelegram && error.codigo === 409) {
      console.error(
        "Telegram indica que ya hay una llamada en curso o un webhook registrado.\n" +
          "Usa los IDs que ya guardaste o crea un bot nuevo de taller. No borres el webhook a ciegas.",
      );
      Deno.exit(1);
    }
    if (error instanceof ErrorIncierto) aborta(error.message);
    throw error;
  }

  const usuarios = extraeUsuarios(updates);
  console.log("");

  if (usuarios.length === 0) {
    console.log("No hay personas todavía.");
    console.log("");
    console.log("Qué hacer:");
    console.log("  1. Abre el bot en Telegram y pulsa Iniciar.");
    console.log("  2. Envía /identificar (o /start) desde la cuenta que será responsable.");
    console.log("  3. Repite este comando.");
    console.log("");
    console.log("Los bots de Telegram no pueden escribir a alguien que no haya iniciado el chat.");
    return;
  }

  console.log(`Personas que escribieron (${usuarios.length}):`);
  console.log("");
  tabla(usuarios);
  console.log("");

  const primera = usuarios[0];
  console.log("Elige la fila del responsable y guarda estos valores en");
  console.log("Supabase -> Edge Functions -> Secrets:");
  console.log("");
  console.log(`  ADMIN_USER_ID=${primera.user_id}`);
  console.log(`  ADMIN_CHAT_ID=${primera.chat_id}`);
  console.log("");
  console.log(
    `Último mensaje de @${primera.username ?? primera.user_id}: ${
      horaBogota(primera.ultimo_mensaje)
    }`,
  );
  console.log("");
  console.log(
    "Este comando solo lee. Los mensajes pendientes se conservan hasta telegram:conectar.",
  );
}

if (import.meta.main) {
  await principal();
}
