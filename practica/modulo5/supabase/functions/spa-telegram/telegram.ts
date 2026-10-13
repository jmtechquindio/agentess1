/**
 * Cliente HTTP de la API de Telegram.
 *
 * Distingue tres resultados que la cola de avisos necesita separar:
 *   1. Error con código conocido (400, 403, 404, 429, 5xx) → `ErrorTelegram`.
 *   2. Error de red o tiempo agotado: NO sabemos si Telegram recibió el mensaje
 *      → `ErrorIncierto`. No se reenvía a ciegas.
 *   3. Éxito: `ok = true` significa ACEPTADO por Telegram, no leído.
 */

import type { ClienteTelegram, FilaBotones, OpcionesEnvio } from "./tipos.ts";

export const TIEMPO_LIMITE_MS = 15_000;

export class ErrorTelegram extends Error {
  readonly codigo: number;
  readonly descripcion: string;
  readonly retryAfter: number | null;
  readonly permanente: boolean;

  constructor(codigo: number, descripcion: string, retryAfter: number | null = null) {
    super(`Telegram ${codigo}: ${descripcion}`);
    this.name = "ErrorTelegram";
    this.codigo = codigo;
    this.descripcion = descripcion;
    this.retryAfter = retryAfter;
    this.permanente = codigo >= 400 && codigo < 500 && codigo !== 429;
  }
}

export class ErrorIncierto extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = "ErrorIncierto";
  }
}

interface RespuestaTelegram<T> {
  ok: boolean;
  result?: T;
  error_code?: number;
  description?: string;
  parameters?: { retry_after?: number };
}

export interface OpcionesCliente {
  fetchImpl?: typeof fetch;
  tiempoLimiteMs?: number;
  /** Inyectable para no depender del reloj real en pruebas. */
  crearTimeout?: (ms: number) => AbortSignal;
}

export class ClienteTelegramHttp implements ClienteTelegram {
  readonly #token: string;
  readonly #fetch: typeof fetch;
  readonly #tiempo: number;
  readonly #timeout: (ms: number) => AbortSignal;

  constructor(token: string, opciones: OpcionesCliente = {}) {
    this.#token = token.trim();
    this.#fetch = opciones.fetchImpl ?? fetch;
    this.#tiempo = opciones.tiempoLimiteMs ?? TIEMPO_LIMITE_MS;
    this.#timeout = opciones.crearTimeout ?? ((ms) => AbortSignal.timeout(ms));
  }

  #url(metodo: string): string {
    return `https://api.telegram.org/bot${this.#token}/${metodo}`;
  }

  async #llamar<T>(metodo: string, cuerpo: Record<string, unknown>): Promise<T> {
    let respuesta: Response;
    try {
      respuesta = await this.#fetch(this.#url(metodo), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(cuerpo),
        signal: this.#timeout(this.#tiempo),
      });
    } catch (error) {
      throw new ErrorIncierto(`Sin respuesta de Telegram en ${metodo}: ${mensaje(error)}`);
    }

    let texto = "";
    try {
      texto = await respuesta.text();
    } catch (error) {
      throw new ErrorIncierto(`No se pudo leer la respuesta de ${metodo}: ${mensaje(error)}`);
    }

    let datos: RespuestaTelegram<T> | undefined;
    try {
      datos = texto ? (JSON.parse(texto) as RespuestaTelegram<T>) : undefined;
    } catch {
      datos = undefined;
    }

    if (!respuesta.ok || datos?.ok !== true) {
      const codigo = Number(datos?.error_code ?? respuesta.status);
      const descripcion = datos?.description ??
        (texto ? texto.slice(0, 200) : respuesta.statusText || "respuesta vacía");
      const retryAfter = typeof datos?.parameters?.retry_after === "number"
        ? datos.parameters.retry_after
        : null;
      throw new ErrorTelegram(codigo, descripcion, retryAfter);
    }

    return datos!.result as T;
  }

  async enviarMensaje(
    chatId: number,
    texto: string,
    opciones: OpcionesEnvio = {},
  ): Promise<number> {
    const cuerpo: Record<string, unknown> = {
      chat_id: chatId,
      text: texto,
      disable_web_page_preview: true,
    };
    if (opciones.teclado) {
      cuerpo.reply_markup = {
        inline_keyboard: opciones.teclado.map((fila) =>
          fila.map((b) => ({ text: b.texto, callback_data: b.datos }))
        ),
      };
    } else if (opciones.menu) {
      cuerpo.reply_markup = {
        keyboard: opciones.menu.map((fila) => fila.map((t) => ({ text: t }))),
        resize_keyboard: true,
      };
    }
    const mensaje = await this.#llamar<{ message_id: number }>("sendMessage", cuerpo);
    return mensaje.message_id;
  }

  async responderCallback(callbackId: string, texto?: string): Promise<void> {
    await this.#llamar("answerCallbackQuery", { callback_query_id: callbackId, text: texto ?? "" });
  }
}

/** Teclado en línea a partir de filas de botones. */
export function inline(filas: FilaBotones[]): OpcionesEnvio {
  return { teclado: filas };
}

function mensaje(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
