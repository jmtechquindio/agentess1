/**
 * Tipos compartidos de la función `spa-telegram`.
 *
 * Aquí viven las interfaces que permiten separar el bot (manejador) de sus
 * dependencias externas:
 *   - `ClienteTelegram` (cliente HTTP de Telegram)
 *   - `Repositorio`      (acceso a Supabase)
 *
 * Nada de este módulo importa red ni Supabase: por eso las pruebas pueden
 * inyectar dobles (mocks) sin tocar servicios reales.
 */

// ---------------------------------------------------------------------------
// Tipos de Telegram (solo lo que el bot usa)
// ---------------------------------------------------------------------------

export interface UsuarioTelegram {
  id: number;
  is_bot?: boolean;
  first_name?: string;
  last_name?: string;
  username?: string;
}

export interface ChatTelegram {
  id: number;
  type: string;
}

export interface MensajeTelegram {
  message_id: number;
  date: number;
  text?: string;
  chat: ChatTelegram;
  from?: UsuarioTelegram;
}

export interface CallbackTelegram {
  id: string;
  from: UsuarioTelegram;
  message?: MensajeTelegram;
  data?: string;
}

export interface UpdateTelegram {
  update_id: number;
  message?: MensajeTelegram;
  callback_query?: CallbackTelegram;
}

// ---------------------------------------------------------------------------
// Contrato del cliente de Telegram
// ---------------------------------------------------------------------------

export interface Boton {
  texto: string;
  datos: string;
}

export type FilaBotones = Boton[];

export interface OpcionesEnvio {
  /** Botones en línea (pegados al mensaje). */
  teclado?: FilaBotones[];
  /** Teclado de respuestas (menú fijo). */
  menu?: string[][];
}

export interface ClienteTelegram {
  /** Devuelve el `message_id` que asignó Telegram. */
  enviarMensaje(chatId: number, texto: string, opciones?: OpcionesEnvio): Promise<number>;
  /** Detiene el "reloj" del botón pulsado. */
  responderCallback(callbackId: string, texto?: string): Promise<void>;
}

// ---------------------------------------------------------------------------
// Modelo de datos que consume el bot
// ---------------------------------------------------------------------------

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio_cop: number;
  duracion_min: number;
}

export interface Horario {
  id: number;
  inicio: string;
}

export interface Cita {
  id: number;
  cliente_user_id: number;
  cliente_chat_id: number;
  servicio_id: number;
  horario_id: number;
  estado: string;
  nota: string | null;
  solicitada_en: string;
  /** Datos unidos para mostrar, no columnas de `spa_citas`. */
  servicio_nombre: string | null;
  precio_cop: number | null;
  duracion_min: number | null;
  horario_inicio: string | null;
}

export interface Aviso {
  id: number;
  cita_id: number;
  tipo: string;
  destino_chat_id: number;
  destino_user_id: number;
  cuerpo: string;
  estado: string;
  intentos: number;
  max_intentos: number;
  lease_token: string;
}

export type AccionMutacion = "solicitar" | "confirmar" | "rechazar" | "cancelar";

export interface EntradaMutacion {
  accion: AccionMutacion;
  actorUserId: number;
  actorChatId: number;
  clienteUserId?: number | null;
  clienteChatId?: number | null;
  servicioId?: number | null;
  horarioId?: number | null;
  citaId?: number | null;
  nota?: string | null;
}

export interface ResultadoMutacion {
  citaId: number;
  estado: string;
  horarioId: number;
  inicio: string;
}

export interface EntradaFinalizar {
  id: number;
  token: string;
  resultado: "enviado" | "fallido" | "revision";
  errorCodigo?: string | null;
  errorDetalle?: string | null;
  telegramMessageId?: number | null;
}

export interface DatosUsuario {
  user_id: number;
  chat_id: number;
  nombre: string;
  username: string | null;
}

/**
 * Error de negocio devuelto por las RPC (errcode P0001). `codigo` es el texto
 * estable que define ESPECIFICACION.md: HORARIO_OCUPADO, SIN_PERMISO, etc.
 */
export class ErrorNegocio extends Error {
  readonly codigo: string;
  constructor(codigo: string, detalle?: string) {
    super(detalle ? `${codigo}: ${detalle}` : codigo);
    this.name = "ErrorNegocio";
    this.codigo = codigo;
  }
}

/** Falta una variable de entorno obligatoria. Nunca incluye el valor. */
export class ErrorConfig extends Error {
  constructor(nombre: string) {
    super(`Falta la variable de entorno ${nombre}.`);
    this.name = "ErrorConfig";
  }
}

export interface Repositorio {
  registrarUsuario(u: DatosUsuario): Promise<void>;
  registrarUpdate(updateId: number): Promise<boolean>;
  generarHorarios(dias?: number): Promise<number>;
  vencerCitas(): Promise<number>;
  listarServicios(): Promise<Servicio[]>;
  horariosDisponibles(servicioId: number): Promise<Horario[]>;
  citaActiva(userId: number): Promise<Cita | null>;
  citaPorId(citaId: number): Promise<Cita | null>;
  citasPendientes(limite: number): Promise<Cita[]>;
  mutar(e: EntradaMutacion): Promise<ResultadoMutacion>;
  reclamarAvisos(lote: number, leaseSegundos: number): Promise<Aviso[]>;
  finalizarAviso(a: EntradaFinalizar): Promise<void>;
}

// ---------------------------------------------------------------------------
// Configuración y dependencias
// ---------------------------------------------------------------------------

export interface Config {
  botToken: string;
  webhookSecret: string;
  adminUserId: number;
  adminChatId: number;
  supabaseUrl: string;
  supabaseServiceKey: string;
}

export interface Deps {
  repo: Repositorio;
  telegram: ClienteTelegram;
  config: Config;
  /** Reloj inyectable. Las pruebas lo fijan; en producción es `new Date()`. */
  ahora: () => Date;
}
