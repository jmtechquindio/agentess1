/**
 * `deno task telegram:estado`
 *
 * Consulta el webhook registrado en Telegram y lo compara con la URL del `.env`.
 * `"conectado_a_esta_funcion": true` significa que el destino coincide, no que la
 * función esté viva: para eso hay que enviarle un mensaje al bot.
 */

import { aborta, cargaEnv, valor } from "./entorno.ts";
import { llamaTelegram } from "./telegram-api.ts";
import { esPlaceholder, oculta, webhookCoincide } from "./telegram-config.ts";

interface InfoWebhook {
  url: string;
  has_custom_certificate: boolean;
  pending_update_count: number;
  last_error_date?: number;
  last_error_message?: string;
}

async function principal(): Promise<void> {
  const variables = cargaEnv();
  const token = valor(variables, "TELEGRAM_BOT_TOKEN");
  if (esPlaceholder(token)) {
    aborta("Falta TELEGRAM_BOT_TOKEN en .env. Edítalo tú mismo; no lo pegues en el chat.");
  }

  const urlEsperada = valor(variables, "TELEGRAM_WEBHOOK_URL");
  const info = await llamaTelegram<InfoWebhook>(token, "getWebhookInfo");
  const coincide = webhookCoincide(info.url, urlEsperada);

  console.log(JSON.stringify(
    {
      "url_registrada": info.url === "" ? null : info.url,
      "url_esperada": esPlaceholder(urlEsperada) ? null : urlEsperada,
      "conectado_a_esta_funcion": coincide,
      "secreto_del_webhook": oculta(valor(variables, "TELEGRAM_WEBHOOK_SECRET")),
      "mensajes_pendientes": info.pending_update_count,
      "ultimo_error": info.last_error_message ?? null,
    },
    null,
    2,
  ));

  console.log("");
  if (info.url === "") {
    console.log("No hay webhook registrado. Ejecuta: deno task telegram:conectar");
    return;
  }

  if (!coincide) {
    console.log("El webhook apunta a otro destino.");
    console.log("Corrige TELEGRAM_WEBHOOK_URL en .env y ejecuta otra vez telegram:conectar.");
    return;
  }

  if (info.pending_update_count > 0) {
    console.log(
      `Hay ${info.pending_update_count} mensajes pendientes. Puede significar que la función ` +
        "todavía no está publicada o que responde con error.",
    );
    console.log("Revisa los logs de la función en Supabase antes de abrir el bot.");
    return;
  }

  console.log("Destino correcto. Abre el bot en Telegram y envía /start para ver el menú.");
  console.log("getWebhookInfo no expone el secreto: que la función rechace peticiones sin");
  console.log("X-Telegram-Bot-Api-Secret-Token se comprueba en las pruebas, no aquí.");
}

if (import.meta.main) {
  await principal();
}
