/**
 * Punto de entrada de la Edge Function `spa-telegram`.
 *
 * Orden estricto de la petición:
 *   1. Solo POST.
 *   2. Verificar `X-Telegram-Bot-Api-Secret-Token` ANTES de leer el cuerpo.
 *   3. Leer y parsear el JSON.
 *   4. Deduplicar por `update_id`, registrar a la persona y enrutar.
 *   5. Procesar la cola de avisos pendientes (no hay cron).
 *
 * Telegram NO manda JWT de Supabase: por eso `verify_jwt = false` en
 * config.toml y la autenticación real es el secreto del webhook.
 */

import { CABECERA_SECRETO, leerConfig, parsearUpdate, secretoCoincide } from "./entrada.ts";
import { manejarUpdate } from "./manejador.ts";
import { RepositorioSupabase } from "./repositorio.ts";
import { ClienteTelegramHttp } from "./telegram.ts";
import { type Deps, ErrorConfig } from "./tipos.ts";

function respuesta(cuerpo: Record<string, unknown>, estado = 200): Response {
  return new Response(JSON.stringify(cuerpo), {
    status: estado,
    headers: { "content-type": "application/json" },
  });
}

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method !== "POST") {
    return respuesta({ ok: false, error: "método no permitido" }, 405);
  }

  // 1. Configuración del entorno. Si falta algo, se dice QUÉ falta, nunca su valor.
  let deps: Deps;
  try {
    const config = leerConfig(Deno.env.toObject());
    deps = {
      repo: new RepositorioSupabase(config),
      telegram: new ClienteTelegramHttp(config.botToken),
      config,
      ahora: () => new Date(),
    };
  } catch (error) {
    const mensaje = error instanceof ErrorConfig ? error.message : "configuración inválida";
    return respuesta({ ok: false, error: mensaje }, 500);
  }

  // 2. El secreto se verifica antes de leer el cuerpo.
  const recibido = req.headers.get(CABECERA_SECRETO) ?? "";
  if (!secretoCoincide(recibido, deps.config.webhookSecret)) {
    return respuesta({ ok: false, error: "secreto inválido" }, 401);
  }

  // 3. Cuerpo.
  let texto = "";
  try {
    texto = await req.text();
  } catch {
    return respuesta({ ok: true, ignorado: "cuerpo ilegible" });
  }
  const update = parsearUpdate(texto);
  if (!update) {
    return respuesta({ ok: true, ignorado: "json inválido" });
  }

  // 4. y 5. Enrutar y vaciar la cola. Un fallo no debe provocar reintentos en
  // cascada de Telegram: se registra y se responde 200.
  try {
    await manejarUpdate(update, deps);
  } catch (error) {
    console.error("spa-telegram:", error instanceof Error ? error.message : String(error));
  }

  return respuesta({ ok: true });
});
