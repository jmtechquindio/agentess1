/**
 * Pruebas de la entrada: secreto del webhook, parseo del update y variables de
 * entorno. Ninguna incluye valores secretos reales.
 */

import { assert, assertEquals, assertThrows } from "jsr:@std/assert@1";
import { claveDeServicio, leerConfig, parsearUpdate, secretoCoincide } from "./entrada.ts";
import { ErrorConfig } from "./tipos.ts";

Deno.test("secretoCoincide rechaza un secreto incorrecto", () => {
  assertEquals(secretoCoincide("incorrecto", "correcto-largo"), false);
  assertEquals(secretoCoincide("", "correcto"), false);
  assertEquals(secretoCoincide("correcto", "correcto"), true);
});

Deno.test("parsearUpdate ignora JSON inválido o sin update_id", () => {
  assertEquals(parsearUpdate(""), null);
  assertEquals(parsearUpdate("{no es json"), null);
  assertEquals(parsearUpdate("123"), null);
  assertEquals(parsearUpdate('{"mensaje":"sin update_id"}'), null);

  const update = parsearUpdate('{"update_id":1}');
  assertEquals(update?.update_id, 1);
});

Deno.test("claveDeServicio acepta SUPABASE_SERVICE_ROLE_KEY", () => {
  assertEquals(
    claveDeServicio({ SUPABASE_SERVICE_ROLE_KEY: "clave-directa" }),
    "clave-directa",
  );
});

Deno.test("claveDeServicio acepta SUPABASE_SECRET_KEYS como arreglo JSON", () => {
  assertEquals(
    claveDeServicio({ SUPABASE_SECRET_KEYS: '["clave-json"]' }),
    "clave-json",
  );
  assertEquals(
    claveDeServicio({
      SUPABASE_SECRET_KEYS: '[{"name":"service_role","key":"clave-nombrada"}]',
    }),
    "clave-nombrada",
  );
  assertEquals(claveDeServicio({}), undefined);
});

Deno.test("leerConfig arma la configuración con las variables del entorno", () => {
  const config = leerConfig({
    TELEGRAM_BOT_TOKEN: "token",
    TELEGRAM_WEBHOOK_SECRET: "secreto",
    ADMIN_USER_ID: "999",
    ADMIN_CHAT_ID: "999",
    SUPABASE_URL: "https://ejemplo.supabase.co",
    SUPABASE_SERVICE_ROLE_KEY: "clave",
  });
  assertEquals(config.adminUserId, 999);
  assertEquals(config.adminChatId, 999);
  assertEquals(config.webhookSecret, "secreto");
});

Deno.test("leerConfig nombra la variable que falta sin revelar valores", () => {
  const error = assertThrows(
    () => leerConfig({ TELEGRAM_BOT_TOKEN: "token", SUPABASE_SERVICE_ROLE_KEY: "clave" }),
    ErrorConfig,
  );
  assert(error.message.includes("TELEGRAM_WEBHOOK_SECRET"));
});
