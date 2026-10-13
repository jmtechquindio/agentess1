/**
 * Cliente HTTP de la API de Telegram.
 *
 * Distingue tres situaciones que la cola de avisos necesita diferenciar:
 *   1. Error con código conocido (400, 403, 404, 429, 5xx).
 *   2. Error de red o tiempo de espera agotado: **no sabemos** si Telegram
 *      recibió el mensaje. No se puede reenviar a ciegas.
 *   3. Éxito: `ok = true` significa aceptado por Telegram, no leído.
 */

import { urlApiTelegram } from "./telegram-config.ts";

/** Tiempo máximo de espera de una llamada a Telegram. */
export const TIEMPO_LIMITE_MS = 15_000;

/** Respuesta con `ok = true` o con `error_code`. */
export interface RespuestaTelegram {
  ok: boolean;
  result?: unknown;
  error_code?: number;
  description?: string;
  parameters?: { retry_after?: number };
}

/** Telegram respondió con un error identificado. */
export class ErrorTelegram extends Error {
  readonly codigo: number;
  readonly descripcion: string;
  readonly retryAfter: number | null;
  /** `true` si reintentar no tiene sentido (chat bloqueado, bot expulsado, etc.). */
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

/** No hubo respuesta: el resultado es incierto. */
export class ErrorIncierto extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = "ErrorIncierto";
  }
}

function mensajeDe(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

/**
 * Llama un método de la API de Telegram con `fetch`.
 * El token viaja en la URL de la petición y **nunca** se registra ni se imprime.
 */
export async function llamaTelegram<T = unknown>(
  token: string,
  metodo: string,
  cuerpo: Record<string, unknown> = {},
): Promise<T> {
  const url = urlApiTelegram(token, metodo);

  let respuesta: Response;
  try {
    respuesta = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(cuerpo),
      signal: AbortSignal.timeout(TIEMPO_LIMITE_MS),
    });
  } catch (error) {
    throw new ErrorIncierto(`Sin respuesta de Telegram en ${metodo}: ${mensajeDe(error)}`);
  }

  let texto = "";
  try {
    texto = await respuesta.text();
  } catch (error) {
    throw new ErrorIncierto(`No se pudo leer la respuesta de ${metodo}: ${mensajeDe(error)}`);
  }

  let datos: RespuestaTelegram | undefined;
  try {
    datos = texto ? (JSON.parse(texto) as RespuestaTelegram) : undefined;
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

  return (datos?.result ?? datos) as T;
}
