/**
 * Pruebas del cliente de Telegram con `fetch` simulado.
 *
 * Cubren la clasificación que exige ESPECIFICACION.md §6.2:
 *   ok = true → éxito · HTTP 200 con ok = false → permanente · 429 → retry_after
 *   · sin respuesta → incierto (NO reenviar a ciegas).
 *
 * No hay red real: `fetchImpl` es un doble.
 */

import { assert, assertEquals, assertRejects } from "jsr:@std/assert@1";
import { ClienteTelegramHttp, ErrorIncierto, ErrorTelegram } from "./telegram.ts";

function respuestaJson(cuerpo: unknown, status = 200): Response {
  return new Response(JSON.stringify(cuerpo), {
    status,
    headers: { "content-type": "application/json" },
  });
}

Deno.test("enviarMensaje devuelve el message_id con ok = true", async () => {
  const cliente = new ClienteTelegramHttp("token-falso", {
    fetchImpl: () => Promise.resolve(respuestaJson({ ok: true, result: { message_id: 42 } })),
  });
  const id = await cliente.enviarMensaje(123, "hola");
  assertEquals(id, 42);
});

Deno.test("HTTP 200 con ok = false se clasifica como error permanente", async () => {
  const cliente = new ClienteTelegramHttp("token-falso", {
    fetchImpl: () =>
      Promise.resolve(
        respuestaJson({ ok: false, error_code: 403, description: "bot was blocked by the user" }),
      ),
  });
  const error = await assertRejects(
    () => cliente.enviarMensaje(123, "hola"),
    ErrorTelegram,
  );
  assertEquals((error as ErrorTelegram).codigo, 403);
  assertEquals((error as ErrorTelegram).permanente, true);
});

Deno.test("429 conserva retry_after y no es permanente", async () => {
  const cliente = new ClienteTelegramHttp("token-falso", {
    fetchImpl: () =>
      Promise.resolve(
        respuestaJson({ ok: false, error_code: 429, parameters: { retry_after: 7 } }),
      ),
  });
  const error = await assertRejects(() => cliente.enviarMensaje(123, "hola"), ErrorTelegram);
  assertEquals((error as ErrorTelegram).codigo, 429);
  assertEquals((error as ErrorTelegram).retryAfter, 7);
  assertEquals((error as ErrorTelegram).permanente, false);
});

Deno.test("sin respuesta de la red el resultado es incierto", async () => {
  const cliente = new ClienteTelegramHttp("token-falso", {
    fetchImpl: () => Promise.reject(new Error("tiempo agotado")),
  });
  await assertRejects(() => cliente.enviarMensaje(123, "hola"), ErrorIncierto);
});

Deno.test("responderCallback llama answerCallbackQuery", async () => {
  let metodoVisto = "";
  const cliente = new ClienteTelegramHttp("token-falso", {
    fetchImpl: (entrada) => {
      metodoVisto = String(entrada);
      return Promise.resolve(respuestaJson({ ok: true, result: true }));
    },
  });
  await cliente.responderCallback("cb-1", "listo");
  assert(metodoVisto.endsWith("/answerCallbackQuery"));
});
