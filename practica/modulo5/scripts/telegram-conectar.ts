/**
 * `deno task telegram:conectar`
 *
 * Registra el webhook del bot contra la Edge Function y descarta los mensajes de
 * prueba acumulados antes de conectarlo. Por eso el taller usa un bot nuevo.
 *
 * No imprime el token ni el secreto: el token viaja dentro de la URL de la
 * petición y el secreto se envía como `secret_token`.
 */

import { aborta, cargaEnv, valor } from "./entorno.ts";
import { llamaTelegram } from "./telegram-api.ts";
import {
  esPlaceholder,
  oculta,
  urlEsWebhookValido,
  variablesFaltantes,
} from "./telegram-config.ts";

const REQUERIDAS = ["TELEGRAM_BOT_TOKEN", "TELEGRAM_WEBHOOK_SECRET", "TELEGRAM_WEBHOOK_URL"];

interface ResultadoSetWebhook {
  url: string;
  pending_update_count: number;
}

async function principal(): Promise<void> {
  const variables = cargaEnv();
  const faltantes = variablesFaltantes(variables, REQUERIDAS);
  if (faltantes.length > 0) {
    aborta(
      `Faltan variables en .env: ${faltantes.join(", ")}\n` +
        "Edita .env tú mismo y no pegues su contenido en el chat de OpenCode.",
    );
  }

  const token = valor(variables, "TELEGRAM_BOT_TOKEN");
  const secreto = valor(variables, "TELEGRAM_WEBHOOK_SECRET");
  const urlWebhook = valor(variables, "TELEGRAM_WEBHOOK_URL");

  if (esPlaceholder(secreto)) {
    aborta(
      "TELEGRAM_WEBHOOK_SECRET sigue como REEMPLAZAR.\n" +
        "Genera uno con:\n" +
        "  deno eval \"console.log(crypto.randomUUID().replaceAll('-', ''))\"\n" +
        "y guarda el MISMO valor en Supabase -> Edge Functions -> Secrets.",
    );
  }

  if (!urlEsWebhookValido(urlWebhook)) {
    aborta(
      `TELEGRAM_WEBHOOK_URL no parece la URL de la Edge Function:\n  ${urlWebhook}\n` +
        "Debe ser https://TU_PROJECT_ID.supabase.co/functions/v1/spa-telegram\n" +
        "Reemplaza REEMPLAZAR por el Project ID de Supabase, no por el nombre del proyecto.",
    );
  }

  const resultado = await llamaTelegram<ResultadoSetWebhook>(token, "setWebhook", {
    url: urlWebhook,
    secret_token: secreto,
    drop_pending_updates: true,
    allowed_updates: ["message", "callback_query"],
  });

  console.log(JSON.stringify(
    {
      "configurado": true,
      "url": resultado.url,
      "secret_token": oculta(secreto),
      "drop_pending_updates": true,
      "mensajes_descartados": resultado.pending_update_count ?? 0,
    },
    null,
    2,
  ));
  console.log("");
  console.log("Telegram aceptó la configuración. Eso no demuestra que el bot responda.");
  console.log("Comprueba con: deno task telegram:estado   y abre el bot en Telegram.");
}

if (import.meta.main) {
  await principal();
}
