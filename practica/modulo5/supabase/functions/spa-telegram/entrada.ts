/**
 * Entrada HTTP: cabecera del webhook, lectura del update y variables de entorno.
 *
 * Todo aquí es puro y comprobable sin red: `parsearUpdate` no lanza, y
 * `leerConfig` valida y falla con un mensaje que NUNCA incluye valores secretos.
 */

import { comparacionSegura } from "./formato.ts";
import { type Config, ErrorConfig, type UpdateTelegram } from "./tipos.ts";

/** Cabecera que Telegram envía cuando el webhook se registró con `secret_token`. */
export const CABECERA_SECRETO = "X-Telegram-Bot-Api-Secret-Token";

/** Compara el secreto recibido con el esperado sin filtrar por tiempo. */
export function secretoCoincide(recibido: string, esperado: string): boolean {
  if (!recibido || !esperado) return false;
  return comparacionSegura(recibido, esperado);
}

/** Lee y valida el cuerpo. Devuelve `null` si no es un update JSON válido. */
export function parsearUpdate(texto: string): UpdateTelegram | null {
  if (!texto) return null;
  let datos: unknown;
  try {
    datos = JSON.parse(texto);
  } catch {
    return null;
  }
  if (!datos || typeof datos !== "object") return null;
  const update = datos as UpdateTelegram;
  if (typeof update.update_id !== "number") return null;
  return update;
}

function extraerClaves(crudo: string): { nombre: string; valor: string }[] {
  const salida: { nombre: string; valor: string }[] = [];
  try {
    const datos = JSON.parse(crudo);
    const arreglo = Array.isArray(datos) ? datos : [datos];
    for (const elemento of arreglo) {
      if (typeof elemento === "string" && elemento) {
        salida.push({ nombre: "", valor: elemento });
      } else if (elemento && typeof elemento === "object") {
        const obj = elemento as Record<string, unknown>;
        const valor = typeof obj.key === "string"
          ? obj.key
          : typeof obj.value === "string"
          ? obj.value
          : typeof obj.secret === "string"
          ? obj.secret
          : "";
        if (valor) salida.push({ nombre: String(obj.name ?? obj.type ?? ""), valor });
      }
    }
  } catch {
    // Un JSON inválido no aporta claves; se reportará como variable faltante.
  }
  return salida;
}

/**
 * Supabase inyecta la clave de servicio como `SUPABASE_SERVICE_ROLE_KEY` o como
 * `SUPABASE_SECRET_KEYS` (arreglo JSON). El código acepta ambas.
 */
export function claveDeServicio(env: Record<string, string | undefined>): string | undefined {
  const directa = (env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();
  if (directa) return directa;

  const crudo = (env.SUPABASE_SECRET_KEYS ?? "").trim();
  if (!crudo) return undefined;

  const claves = extraerClaves(crudo);
  const conNombre = claves.find((c) => /service|secret/i.test(c.nombre));
  return (conNombre ?? claves[0])?.valor;
}

function requerido(env: Record<string, string | undefined>, nombre: string): string {
  const valor = (env[nombre] ?? "").trim();
  if (!valor) throw new ErrorConfig(nombre);
  return valor;
}

function requeridoNumero(env: Record<string, string | undefined>, nombre: string): number {
  const valor = requerido(env, nombre);
  const numero = Number(valor);
  if (!Number.isInteger(numero)) throw new ErrorConfig(nombre);
  return numero;
}

/** Construye la configuración del bot desde el entorno de la función. */
export function leerConfig(env: Record<string, string | undefined>): Config {
  const claveServicio = claveDeServicio(env);
  if (!claveServicio) {
    throw new ErrorConfig("SUPABASE_SERVICE_ROLE_KEY (o SUPABASE_SECRET_KEYS)");
  }
  return {
    botToken: requerido(env, "TELEGRAM_BOT_TOKEN"),
    webhookSecret: requerido(env, "TELEGRAM_WEBHOOK_SECRET"),
    adminUserId: requeridoNumero(env, "ADMIN_USER_ID"),
    adminChatId: requeridoNumero(env, "ADMIN_CHAT_ID"),
    supabaseUrl: requerido(env, "SUPABASE_URL"),
    supabaseServiceKey: claveServicio,
  };
}
