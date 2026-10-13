/**
 * Funciones puras de configuración del bot.
 *
 * Este módulo NO lee el `.env`, NO hace red y NO imprime nada: todo lo que hace es
 * transformar strings en datos. Eso permite probarlo con `scripts/telegram-config_test.ts`
 * sin tocar servicios reales ni secretos.
 */

/** Texto que marca un valor sin reemplazar en `.env`. */
export const PLACEHOLDER = "REEMPLAZAR";

/** Sufijo que debe tener la URL de la Edge Function. */
export const SUFIJO_FUNCION = "/functions/v1/spa-telegram";

/** Variables que el taller manipula a mano. */
export const VARIABLES = [
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_WEBHOOK_SECRET",
  "TELEGRAM_WEBHOOK_URL",
  "ADMIN_USER_ID",
  "ADMIN_CHAT_ID",
] as const;

export type NombreVariable = (typeof VARIABLES)[number];

export interface ChatTelegram {
  id: number;
  type: string;
}

export interface UsuarioTelegram {
  id: number;
  first_name?: string;
  username?: string;
}

export interface MensajeTelegram {
  message_id: number;
  date: number;
  text?: string;
  chat: ChatTelegram;
  from?: UsuarioTelegram;
}

export interface TelegramUpdate {
  update_id: number;
  message?: MensajeTelegram;
}

export interface UsuarioDetectado {
  user_id: number;
  chat_id: number;
  nombre: string;
  username: string | null;
  mensajes: number;
  primer_mensaje: number;
  ultimo_mensaje: number;
  comandos: string[];
}

/** Indica si un valor está vacío o es un marcador de posición sin reemplazar. */
export function esPlaceholder(valor: string | null | undefined): boolean {
  if (valor === null || valor === undefined) return true;
  const limpio = valor.trim();
  if (limpio === "") return true;
  if (limpio.toUpperCase().includes(PLACEHOLDER)) return true;
  return /^(TU_|PENDIENTE|TODO|CHANGE_?ME|XXX)/i.test(limpio);
}

/**
 * Parsea un archivo `.env`. Acepta `export`, comillas y `#` al inicio de línea.
 * No ejecuta nada ni interpreta escapes dentro de comillas.
 */
export function parseDotEnv(texto: string): Record<string, string> {
  const variables: Record<string, string> = {};
  for (const lineaCruda of texto.split(/\r?\n/)) {
    const linea = lineaCruda.trim();
    if (linea === "" || linea.startsWith("#")) continue;

    const sinExport = linea.startsWith("export ") ? linea.slice(7).trim() : linea;
    const corte = sinExport.indexOf("=");
    if (corte <= 0) continue;

    const clave = sinExport.slice(0, corte).trim();
    if (clave === "") continue;

    let valor = sinExport.slice(corte + 1).trim();
    if (
      (valor.startsWith('"') && valor.endsWith('"') && valor.length > 1) ||
      (valor.startsWith("'") && valor.endsWith("'") && valor.length > 1)
    ) {
      valor = valor.slice(1, -1).trim();
    } else {
      const comentario = valor.indexOf(" #");
      if (comentario >= 0) valor = valor.slice(0, comentario).trim();
    }

    variables[clave] = valor;
  }
  return variables;
}

/** Quita mayúsculas, barra final, query y fragmento para comparar URLs. */
export function normalizaUrlWebhook(url: string | null | undefined): string {
  const bruto = (url ?? "").trim();
  if (bruto === "") return "";
  try {
    const u = new URL(bruto);
    const ruta = u.pathname.replace(/\/+$/, "");
    return `${u.protocol}//${u.host.toLowerCase()}${ruta}`;
  } catch {
    return bruto.replace(/\/+$/, "");
  }
}

/** Compara la URL registrada por Telegram con la esperada, sin distinguir mayúsculas ni barra final. */
export function webhookCoincide(actual: string | null | undefined, esperado: string): boolean {
  const a = normalizaUrlWebhook(actual);
  const b = normalizaUrlWebhook(esperado);
  return a !== "" && a === b;
}

/** Valida que la URL del webhook sea https y apunte a la Edge Function del taller. */
export function urlEsWebhookValido(url: string): boolean {
  const limpio = url.trim();
  if (limpio === "" || esPlaceholder(limpio)) return false;
  try {
    const u = new URL(limpio);
    return u.protocol === "https:" && u.pathname.replace(/\/+$/, "").endsWith(SUFIJO_FUNCION);
  } catch {
    return false;
  }
}

/** Construye la URL de un método de la API de Telegram. No se imprime en ningún caso. */
export function urlApiTelegram(token: string, metodo: string): string {
  return `https://api.telegram.org/bot${token.trim()}/${metodo}`;
}

/** Devuelve los nombres de las variables pedidas que faltan o siguen sin reemplazar. */
export function variablesFaltantes(
  registro: Record<string, string | undefined>,
  requeridas: readonly string[],
): string[] {
  return requeridas.filter((nombre) => esPlaceholder(registro[nombre]));
}

/** Extrae el comando de un texto que empieza por `/`. */
export function comando(texto: string | null | undefined): string | null {
  if (typeof texto !== "string") return null;
  const limpio = texto.trim();
  if (!limpio.startsWith("/")) return null;
  const [crudo] = limpio.split(/\s+/, 1);
  const sinBarra = crudo.slice(1).split("@")[0];
  return sinBarra === "" ? null : sinBarra.toLowerCase();
}

/**
 * Resume en una fila por persona los mensajes privados que Telegram tiene
 * pendientes. Los mensajes de grupo, canales y supergrupos se descartan.
 */
export function extraeUsuarios(updates: readonly TelegramUpdate[]): UsuarioDetectado[] {
  const porUsuario = new Map<number, UsuarioDetectado>();

  for (const update of updates ?? []) {
    const mensaje = update?.message;
    if (!mensaje?.chat || !mensaje.from) continue;
    if (mensaje.chat.type !== "private") continue;

    const existente = porUsuario.get(mensaje.from.id);
    const cmd = comando(mensaje.text);
    if (existente) {
      existente.mensajes += 1;
      existente.ultimo_mensaje = Math.max(existente.ultimo_mensaje, mensaje.date);
      // En chats privados el chat_id suele ser estable, pero si cambia se guarda
      // el más reciente: es el valor que se copia a ADMIN_CHAT_ID.
      existente.chat_id = mensaje.chat.id;
      if (cmd && !existente.comandos.includes(cmd)) existente.comandos.push(cmd);
      continue;
    }

    porUsuario.set(mensaje.from.id, {
      user_id: mensaje.from.id,
      chat_id: mensaje.chat.id,
      nombre: mensaje.from.first_name ?? "(sin nombre)",
      username: mensaje.from.username ?? null,
      mensajes: 1,
      primer_mensaje: mensaje.date,
      ultimo_mensaje: mensaje.date,
      comandos: cmd ? [cmd] : [],
    });
  }

  return [...porUsuario.values()].sort((a, b) => b.ultimo_mensaje - a.ultimo_mensaje);
}

/** Formatea una marca de tiempo de Telegram (segundos) como hora de Bogotá. */
export function horaBogota(epochSegundos: number): string {
  return new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(epochSegundos * 1000));
}

/** Oculta un valor sensible para poder mostrarlo sin exponerlo. */
export function oculta(valor: string | null | undefined): string {
  if (esPlaceholder(valor)) return "(sin configurar)";
  return "(configurado, oculto)";
}
