/**
 * Implementación del `Repositorio` sobre Supabase (PostgREST + RPC).
 *
 * Usa la clave de servicio (service_role) que Supabase inyecta en la Edge
 * Function. El bot NUNCA lleva claves al cliente: todo pasa por aquí.
 *
 * Las RPC son la autoridad de negocio. Este módulo solo traduce entre filas de
 * Postgres y los tipos del bot.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { horarioOfrecible } from "./formato.ts";
import {
  type Aviso,
  type Cita,
  type Config,
  type DatosUsuario,
  type EntradaFinalizar,
  type EntradaMutacion,
  ErrorNegocio,
  type Horario,
  type Repositorio,
  type ResultadoMutacion,
  type Servicio,
} from "./tipos.ts";

/** Códigos de negocio que las RPC lanzan con errcode P0001. */
const CODIGOS_NEGOCIO = [
  "ACCION_DESCONOCIDA",
  "HORARIO_OCUPADO",
  "CITA_ACTIVA_EXISTENTE",
  "CITA_NO_ENCONTRADA",
  "TRANSICION_INVALIDA",
  "SIN_PERMISO",
  "HORARIO_PASADO",
  "SERVICIO_INACTIVO",
  "HORARIO_FUERA_DE_JORNADA",
  "USUARIO_NO_REGISTRADO",
  "LEASE_INVALIDO",
  "AVISO_NO_ENCONTRADO",
  "RESULTADO_DESCONOCIDO",
] as const;

interface ErrorPostgrest {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
}

function mapearError(error: ErrorPostgrest): Error {
  const texto = `${error.message ?? ""} ${error.details ?? ""} ${error.hint ?? ""}`;
  for (const codigo of CODIGOS_NEGOCIO) {
    if (texto.includes(codigo)) return new ErrorNegocio(codigo, error.message);
  }
  return new Error(
    `Supabase (${error.code ?? "sin código"}): ${error.message ?? "error desconocido"}`,
  );
}

export class RepositorioSupabase implements Repositorio {
  readonly #client: SupabaseClient;
  readonly #config: Config;

  constructor(config: Config, client?: SupabaseClient) {
    this.#config = config;
    this.#client = client ??
      createClient(config.supabaseUrl, config.supabaseServiceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
  }

  async registrarUsuario(u: DatosUsuario): Promise<void> {
    const { error } = await this.#client.rpc("spa_registrar_usuario", {
      p_user_id: u.user_id,
      p_chat_id: u.chat_id,
      p_nombre: u.nombre,
      p_username: u.username,
    });
    if (error) throw mapearError(error);
  }

  async registrarUpdate(updateId: number): Promise<boolean> {
    const { data, error } = await this.#client.rpc("spa_registrar_update", {
      p_update_id: updateId,
    });
    if (error) throw mapearError(error);
    return data === true;
  }

  async generarHorarios(dias = 21): Promise<number> {
    const { data, error } = await this.#client.rpc("spa_generar_horarios", { p_dias: dias });
    if (error) throw mapearError(error);
    return Number(data ?? 0);
  }

  async vencerCitas(): Promise<number> {
    const { data, error } = await this.#client.rpc("spa_vencer_citas");
    if (error) throw mapearError(error);
    return Number(data ?? 0);
  }

  async listarServicios(): Promise<Servicio[]> {
    const { data, error } = await this.#client
      .from("spa_servicios")
      .select("id,nombre,descripcion,precio_cop,duracion_min")
      .eq("activo", true)
      .order("id", { ascending: true });
    if (error) throw mapearError(error);
    return (data ?? []).map((s) => ({
      id: Number(s.id),
      nombre: String(s.nombre),
      descripcion: String(s.descripcion),
      precio_cop: Number(s.precio_cop),
      duracion_min: Number(s.duracion_min),
    }));
  }

  async horariosDisponibles(servicioId: number): Promise<Horario[]> {
    const servicios = await this.listarServicios();
    const servicio = servicios.find((s) => s.id === servicioId);
    if (!servicio) return [];

    const ahora = new Date().toISOString();
    const { data: horarios, error } = await this.#client
      .from("spa_horarios")
      .select("id,inicio")
      .eq("activo", true)
      .gt("inicio", ahora)
      .order("inicio", { ascending: true })
      .limit(400);
    if (error) throw mapearError(error);

    const { data: ocupados, error: errorOcupados } = await this.#client
      .from("spa_citas")
      .select("horario_id")
      .in("estado", ["pendiente", "confirmada"]);
    if (errorOcupados) throw mapearError(errorOcupados);

    const tomados = new Set((ocupados ?? []).map((c) => Number(c.horario_id)));
    return (horarios ?? [])
      .map((h) => ({ id: Number(h.id), inicio: String(h.inicio) }))
      .filter((h) => !tomados.has(h.id) && horarioOfrecible(h.inicio, servicio.duracion_min, ahora))
      .slice(0, 60);
  }

  async citaActiva(userId: number): Promise<Cita | null> {
    const { data, error } = await this.#client
      .from("spa_citas")
      .select("id,cliente_user_id,cliente_chat_id,servicio_id,horario_id,estado,nota,solicitada_en")
      .eq("cliente_user_id", userId)
      .in("estado", ["pendiente", "confirmada"])
      .order("id", { ascending: false })
      .limit(1);
    if (error) throw mapearError(error);
    const fila = (data ?? [])[0];
    return fila ? await this.#enriquecer(fila) : null;
  }

  async citaPorId(citaId: number): Promise<Cita | null> {
    const { data, error } = await this.#client
      .from("spa_citas")
      .select("id,cliente_user_id,cliente_chat_id,servicio_id,horario_id,estado,nota,solicitada_en")
      .eq("id", citaId)
      .limit(1);
    if (error) throw mapearError(error);
    const fila = (data ?? [])[0];
    return fila ? await this.#enriquecer(fila) : null;
  }

  async citasPendientes(limite: number): Promise<Cita[]> {
    const { data, error } = await this.#client
      .from("spa_citas")
      .select("id,cliente_user_id,cliente_chat_id,servicio_id,horario_id,estado,nota,solicitada_en")
      .eq("estado", "pendiente")
      .order("actualizada_en", { ascending: true })
      .limit(limite);
    if (error) throw mapearError(error);
    const filas = data ?? [];
    return await Promise.all(filas.map((f) => this.#enriquecer(f)));
  }

  async mutar(e: EntradaMutacion): Promise<ResultadoMutacion> {
    const { data, error } = await this.#client.rpc("spa_mutar_cita", {
      p_accion: e.accion,
      p_actor_user_id: e.actorUserId,
      p_actor_chat_id: e.actorChatId,
      p_cliente_user_id: e.clienteUserId ?? null,
      p_cliente_chat_id: e.clienteChatId ?? null,
      p_servicio_id: e.servicioId ?? null,
      p_horario_id: e.horarioId ?? null,
      p_cita_id: e.citaId ?? null,
      p_nota: e.nota ?? null,
      p_responsable_user_id: this.#config.adminUserId,
      p_responsable_chat_id: this.#config.adminChatId,
    });
    if (error) throw mapearError(error);
    const fila = (Array.isArray(data) ? data[0] : data) as Record<string, unknown> | undefined;
    if (!fila) throw new ErrorNegocio("CITA_NO_ENCONTRADA");
    return {
      citaId: Number(fila.cita_id),
      estado: String(fila.estado),
      horarioId: Number(fila.horario_id),
      inicio: String(fila.inicio),
    };
  }

  async reclamarAvisos(lote: number, leaseSegundos: number): Promise<Aviso[]> {
    const { data, error } = await this.#client.rpc("spa_reclamar_avisos", {
      p_lote: lote,
      p_lease_segundos: leaseSegundos,
    });
    if (error) throw mapearError(error);
    return (data ?? []).map((a: Record<string, unknown>) => ({
      id: Number(a.id),
      cita_id: Number(a.cita_id),
      tipo: String(a.tipo),
      destino_chat_id: Number(a.destino_chat_id),
      destino_user_id: Number(a.destino_user_id),
      cuerpo: String(a.cuerpo),
      estado: String(a.estado),
      intentos: Number(a.intentos),
      max_intentos: Number(a.max_intentos),
      lease_token: String(a.lease_token),
    }));
  }

  async finalizarAviso(a: EntradaFinalizar): Promise<void> {
    const { error } = await this.#client.rpc("spa_finalizar_aviso", {
      p_id: a.id,
      p_lease_token: a.token,
      p_resultado: a.resultado,
      p_error_codigo: a.errorCodigo ?? null,
      p_error_detalle: a.errorDetalle ?? null,
      p_telegram_message_id: a.telegramMessageId ?? null,
    });
    if (error) throw mapearError(error);
  }

  /** Añade el nombre del servicio y el inicio del horario para poder mostrarlos. */
  async #enriquecer(fila: Record<string, unknown>): Promise<Cita> {
    const servicioId = Number(fila.servicio_id);
    const horarioId = Number(fila.horario_id);

    const { data: servicio } = await this.#client
      .from("spa_servicios")
      .select("nombre,precio_cop,duracion_min")
      .eq("id", servicioId)
      .limit(1);
    const { data: horario } = await this.#client
      .from("spa_horarios")
      .select("inicio")
      .eq("id", horarioId)
      .limit(1);

    return {
      id: Number(fila.id),
      cliente_user_id: Number(fila.cliente_user_id),
      cliente_chat_id: Number(fila.cliente_chat_id),
      servicio_id: servicioId,
      horario_id: horarioId,
      estado: String(fila.estado),
      nota: (fila.nota as string | null) ?? null,
      solicitada_en: String(fila.solicitada_en),
      servicio_nombre: servicio?.[0] ? String(servicio[0].nombre) : null,
      precio_cop: servicio?.[0] ? Number(servicio[0].precio_cop) : null,
      duracion_min: servicio?.[0] ? Number(servicio[0].duracion_min) : null,
      horario_inicio: horario?.[0] ? String(horario[0].inicio) : null,
    };
  }
}
