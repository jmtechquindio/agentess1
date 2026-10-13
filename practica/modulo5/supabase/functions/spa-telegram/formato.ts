/**
 * Utilidades puras del bot: zona horaria de Bogotá, formato de textos y firma de
 * los botones (callback_data).
 *
 * Este módulo NO hace red, NO lee `.env` y NO toca la base: todo entra y sale
 * como datos. Las pruebas lo cubren con reloj fijo.
 *
 * Firma de botones: Telegram permite que cualquiera reenvíe un `callback_data`.
 * Para que el bot solo acepte botones que él mismo emitió, cada dato lleva una
 * firma HMAC corta calculada con `TELEGRAM_WEBHOOK_SECRET`. El servidor no
 * guarda estado de conversación: el estado viaja firmado en el propio botón.
 */

export const HUSO = "America/Bogota";

/** Etiquetas del menú fijo (teclado de respuestas). */
export const MENU_LABELS = ["Servicios", "Agendar", "Mi cita", "Ayuda"] as const;

const FORMATO_PARTES = new Intl.DateTimeFormat("en-CA", {
  timeZone: HUSO,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export interface PartesBogota {
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:MM
  minutos: number; // minutos desde medianoche
}

/** Descompone un instante en su fecha y hora locales de Bogotá. */
export function partesBogota(iso: string): PartesBogota {
  const mapa: Record<string, string> = {};
  for (const parte of FORMATO_PARTES.formatToParts(new Date(iso))) {
    if (parte.type !== "literal") mapa[parte.type] = parte.value;
  }
  const hora = mapa.hour === "24" ? "00" : mapa.hour;
  return {
    fecha: `${mapa.year}-${mapa.month}-${mapa.day}`,
    hora: `${hora}:${mapa.minute}`,
    minutos: Number(hora) * 60 + Number(mapa.minute),
  };
}

/** Formatea un instante como "DD/MM/YYYY HH:MM" en Bogotá. */
export function fechaHoraBogota(iso: string): string {
  const p = partesBogota(iso);
  const [anio, mes, dia] = p.fecha.split("-");
  return `${dia}/${mes}/${anio} ${p.hora}`;
}

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

/** Formatea la fecha como "lunes 13/10/2026" en Bogotá. */
export function diaBogota(fecha: string): string {
  const [anio, mes, dia] = fecha.split("-").map(Number);
  const d = new Date(Date.UTC(anio, mes - 1, dia, 12));
  const nombre = DIAS[d.getUTCDay()];
  return `${nombre} ${String(dia).padStart(2, "0")}/${String(mes).padStart(2, "0")}/${anio}`;
}

/** Precio en pesos, sin decimales. */
export function precioCop(valor: number): string {
  return `${new Intl.NumberFormat("es-CO").format(valor)} COP`;
}

/**
 * Un horario es ofrecible si empieza en el futuro, no cruza de día en Bogotá y
 * su fin (inicio + duración del servicio) no pasa de las 18:00 del mismo día.
 * Réplica de la regla de §3.2 de ESPECIFICACION.md; la autoridad final sigue
 * siendo `spa_mutar_cita`.
 */
export function horarioOfrecible(
  inicioIso: string,
  duracionMin: number,
  ahoraIso: string,
): boolean {
  const inicio = new Date(inicioIso).getTime();
  if (Number.isNaN(inicio)) return false;
  if (inicio <= new Date(ahoraIso).getTime()) return false;

  const pInicio = partesBogota(inicioIso);
  const fin = new Date(inicio + duracionMin * 60_000).toISOString();
  const pFin = partesBogota(fin);

  if (pInicio.fecha !== pFin.fecha) return false;
  return pFin.minutos <= 18 * 60;
}

/** Extrae el comando de un texto que empieza por "/". Devuelve "start", etc. */
export function comando(texto: string | null | undefined): string | null {
  if (typeof texto !== "string") return null;
  const limpio = texto.trim();
  if (!limpio.startsWith("/")) return null;
  const [crudo] = limpio.split(/\s+/, 1);
  const sinBarra = crudo.slice(1).split("@")[0];
  return sinBarra === "" ? null : sinBarra.toLowerCase();
}

// ---------------------------------------------------------------------------
// Firma de callback_data
// ---------------------------------------------------------------------------

const LARGO_FIRMA = 12;

async function hmacHex(secreto: string, datos: string): Promise<string> {
  const enc = new TextEncoder();
  const llave = await crypto.subtle.importKey(
    "raw",
    enc.encode(secreto),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const firma = await crypto.subtle.sign("HMAC", llave, enc.encode(datos));
  return [...new Uint8Array(firma)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, LARGO_FIRMA);
}

/** Compara dos cadenas sin filtrar por tiempo (evita ataques de temporización). */
export function comparacionSegura(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let dif = 0;
  for (let i = 0; i < a.length; i++) dif |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return dif === 0;
}

/** Construye un callback del flujo de agenda y lo firma. */
export async function callbackAgenda(secreto: string, cuerpo: string): Promise<string> {
  const firma = await hmacHex(secreto, `ag:${cuerpo}`);
  return `ag:${cuerpo}:${firma}`;
}

/**
 * Valida un callback de agenda. Devuelve la parte firmada o `null` si no es un
 * botón emitido por el bot.
 */
export async function validarCallbackAgenda(
  secreto: string,
  datos: string,
): Promise<string | null> {
  const partes = datos.split(":");
  if (partes.length < 3 || partes[0] !== "ag") return null;
  const firma = partes[partes.length - 1];
  const cuerpo = partes.slice(1, -1).join(":");
  const esperada = await hmacHex(secreto, `ag:${cuerpo}`);
  return comparacionSegura(firma, esperada) ? cuerpo : null;
}

/** Construye un callback de cita (confirmar, rechazar, cancelar...). */
export async function callbackCita(
  secreto: string,
  citaId: number,
  accion: string,
  emitido: number,
): Promise<string> {
  const nonce = await hmacHex(secreto, `cita:${citaId}:${accion}:${emitido}`);
  return `cita:${citaId}:${accion}:${emitido}:${nonce}`;
}

export interface CallbackCita {
  citaId: number;
  accion: string;
  emitido: number;
}

/** Valida un callback de cita: formato, firma y ventana de 15 minutos. */
export async function validarCallbackCita(
  secreto: string,
  datos: string,
  ahoraMs: number,
): Promise<CallbackCita | null> {
  const partes = datos.split(":");
  if (partes.length !== 5 || partes[0] !== "cita") return null;
  const citaId = Number(partes[1]);
  const accion = partes[2];
  const emitido = Number(partes[3]);
  const nonce = partes[4];
  if (!Number.isInteger(citaId) || !Number.isFinite(emitido)) return null;
  if (!/^[a-z0-9]+$/.test(accion)) return null;

  const esperado = await hmacHex(secreto, `cita:${citaId}:${accion}:${emitido}`);
  if (!comparacionSegura(nonce, esperado)) return null;

  const edadMs = ahoraMs - emitido * 1000;
  if (edadMs < -120_000 || edadMs > 15 * 60_000) return null; // >15 min o del futuro

  return { citaId, accion, emitido };
}

// ---------------------------------------------------------------------------
// Textos
// ---------------------------------------------------------------------------

export function menuPrincipal(): string {
  return [
    "Spa Manos y Pies — recepción por Telegram.",
    "",
    "Elige una opción del menú o escribe una de estas palabras:",
    "• Servicios — precios y duraciones",
    "• Agendar — solicitar una cita",
    "• Mi cita — ver tu cita activa",
    "• Ayuda — cómo funciona",
    "",
    "Recuerda: al enviar una solicitud la cita queda PENDIENTE hasta que la",
    "responsable la confirme.",
  ].join("\n");
}

export function textoAyuda(): string {
  return [
    "Esto es lo que puedo hacer:",
    "",
    "/start — menú principal",
    "/help — esta ayuda",
    "Servicios — los tres servicios con precio y duración",
    "Agendar — elegir servicio, día y hora, y enviar la solicitud",
    "Mi cita — ver solo tu cita activa",
    "/identificar — ver tu user_id (para la persona responsable)",
    "",
    "La cita se crea PENDIENTE. La persona responsable la confirma o rechaza.",
  ].join("\n");
}

export function textoAccesoDenegado(): string {
  return "Acceso denegado. Esta opción es solo para la persona responsable.";
}
