/**
 * Manejador del bot: convierte un `update` de Telegram en acciones.
 *
 * Reglas que respeta:
 *   - El responsable es exactamente `ADMIN_USER_ID` (y su chat `ADMIN_CHAT_ID`),
 *     leídos del entorno. Un mensaje que diga ser el responsable no autoriza nada.
 *   - No guarda la conversación en memoria: el estado del flujo de agenda viaja
 *     firmado en el propio botón (`callback_data`).
 *   - Nunca muestra citas de otras personas.
 *   - Una cita no se pierde si falla un aviso: la mutación va a la base y el
 *     envío ocurre después, por separado (cola persistente).
 */

import {
  callbackAgenda,
  callbackCita,
  comando,
  diaBogota,
  fechaHoraBogota,
  menuPrincipal,
  partesBogota,
  precioCop,
  textoAccesoDenegado,
  textoAyuda,
  validarCallbackAgenda,
  validarCallbackCita,
} from "./formato.ts";
import { ErrorIncierto, ErrorTelegram } from "./telegram.ts";
import {
  type Aviso,
  type Cita,
  type Deps,
  ErrorNegocio,
  type FilaBotones,
  type Horario,
  type MensajeTelegram,
  type UpdateTelegram,
} from "./tipos.ts";

const MENU: string[][] = [["Servicios", "Agendar"], ["Mi cita", "Ayuda"]];
const POR_PAGINA = 3;

function esResponsable(deps: Deps, userId: number, chatId: number): boolean {
  return userId === deps.config.adminUserId && chatId === deps.config.adminChatId;
}

/** Punto de entrada: deduplica, registra a la persona y enruta. */
export async function manejarUpdate(update: UpdateTelegram, deps: Deps): Promise<void> {
  if (!update || typeof update.update_id !== "number") return;

  const esNuevo = await deps.repo.registrarUpdate(update.update_id);
  if (!esNuevo) return; // replay del mismo update_id: se ignora

  if (update.message) {
    await manejarMensaje(update.message, deps);
  } else if (update.callback_query) {
    await manejarCallback(update.callback_query, deps);
  }

  // Sin cron, la cola de avisos avanza con cada evento nuevo.
  await procesarCola(deps);
}

async function registrar(deps: Deps, userId: number, chatId: number, from: {
  first_name?: string;
  username?: string;
}): Promise<void> {
  await deps.repo.registrarUsuario({
    user_id: userId,
    chat_id: chatId,
    nombre: from.first_name ?? "Sin nombre",
    username: from.username ?? null,
  });
}

// ---------------------------------------------------------------------------
// Mensajes
// ---------------------------------------------------------------------------

async function manejarMensaje(msg: MensajeTelegram, deps: Deps): Promise<void> {
  if (msg.chat?.type !== "private") return; // los grupos no se procesan
  const from = msg.from;
  if (!from || from.is_bot) return;

  await registrar(deps, from.id, msg.chat.id, from);

  const texto = (msg.text ?? "").trim();
  const cmd = comando(texto);
  const responsable = esResponsable(deps, from.id, msg.chat.id);

  if (cmd === "start" || texto === "Ayuda") {
    await enviar(deps, msg.chat.id, menuPrincipal(), { menu: MENU });
    return;
  }
  if (cmd === "help") {
    await enviar(deps, msg.chat.id, textoAyuda(), { menu: MENU });
    return;
  }
  if (cmd === "identificar") {
    await enviar(
      deps,
      msg.chat.id,
      `Tu user_id es ${from.id} y el chat_id es ${msg.chat.id}.\n` +
        "La persona responsable guarda estos valores en Supabase, no los pega en el chat.",
    );
    return;
  }
  if (texto === "Servicios") {
    await enviarServicios(deps, msg.chat.id);
    return;
  }
  if (texto === "Agendar") {
    await iniciarAgenda(deps, from.id, msg.chat.id);
    return;
  }
  if (texto === "Mi cita") {
    await mostrarMiCita(deps, from.id, msg.chat.id);
    return;
  }
  if (cmd === "pendientes") {
    if (!responsable) {
      await enviar(deps, msg.chat.id, textoAccesoDenegado());
      return;
    }
    await mostrarPendientes(deps, msg.chat.id, 0);
    return;
  }
  if (cmd === "reintentar") {
    if (!responsable) {
      await enviar(deps, msg.chat.id, textoAccesoDenegado());
      return;
    }
    const r = await procesarCola(deps);
    await enviar(
      deps,
      msg.chat.id,
      `Reintento terminado. Enviados: ${r.enviados}. Fallidos: ${r.fallidos}. ` +
        `En revisión: ${r.revision}. Sin cron, solo avanza lo que ya estaba listo.`,
    );
    return;
  }

  // Texto no reconocido: ayuda con opciones, no un error.
  await enviar(deps, msg.chat.id, `No entendí esa opción.\n\n${menuPrincipal()}`, { menu: MENU });
}

async function enviarServicios(deps: Deps, chatId: number): Promise<void> {
  const servicios = await deps.repo.listarServicios();
  const lineas = servicios.map(
    (s) => `• ${s.nombre} — ${precioCop(s.precio_cop)}, ${s.duracion_min} min\n  ${s.descripcion}`,
  );
  await enviar(
    deps,
    chatId,
    `Servicios disponibles:\n\n${lineas.join("\n\n")}\n\nEscribe Agendar para solicitar una cita.`,
    { menu: MENU },
  );
}

function fechasDe(horarios: Horario[]): string[] {
  const vistos = new Set<string>();
  const fechas: string[] = [];
  for (const h of horarios) {
    const f = partesBogota(h.inicio).fecha;
    if (!vistos.has(f)) {
      vistos.add(f);
      fechas.push(f);
    }
  }
  return fechas;
}

async function iniciarAgenda(deps: Deps, userId: number, chatId: number): Promise<void> {
  await deps.repo.vencerCitas();
  await deps.repo.generarHorarios();

  const activa = await deps.repo.citaActiva(userId);
  if (activa) {
    await enviar(
      deps,
      chatId,
      `Ya tienes una cita activa (#${activa.id}, estado ${activa.estado}). ` +
        "Puedes verla en Mi cita. Si quieres otra, primero cancélala.",
      { menu: MENU },
    );
    return;
  }

  const servicios = await deps.repo.listarServicios();
  if (servicios.length === 0) {
    await enviar(deps, chatId, "No hay servicios disponibles por ahora.");
    return;
  }
  const filas: FilaBotones[] = [];
  for (const s of servicios) {
    filas.push([{
      texto: `${s.nombre} · ${precioCop(s.precio_cop)} · ${s.duracion_min} min`,
      datos: await callbackAgenda(deps.config.webhookSecret, `svc:${s.id}`),
    }]);
  }
  await enviar(deps, chatId, "Elige un servicio:", { teclado: filas });
}

async function mostrarFechas(deps: Deps, chatId: number, servicioId: number): Promise<void> {
  await deps.repo.generarHorarios();
  const horarios = await deps.repo.horariosDisponibles(servicioId);
  const fechas = fechasDe(horarios);
  if (fechas.length === 0) {
    await enviar(deps, chatId, "No hay horarios disponibles para ese servicio. Intenta más tarde.");
    return;
  }
  const botones: FilaBotones[] = [];
  for (const f of fechas) {
    botones.push([{
      texto: diaBogota(f),
      datos: await callbackAgenda(deps.config.webhookSecret, `d:${servicioId}:${f}`),
    }]);
  }
  await enviar(deps, chatId, "Elige un día:", { teclado: botones });
}

async function mostrarHoras(
  deps: Deps,
  chatId: number,
  servicioId: number,
  fecha: string,
): Promise<void> {
  const horarios = (await deps.repo.horariosDisponibles(servicioId))
    .filter((h) => partesBogota(h.inicio).fecha === fecha);
  if (horarios.length === 0) {
    await enviar(deps, chatId, "Ese día ya no tiene horarios. Elige otro con Agendar.");
    return;
  }
  const botones: FilaBotones[] = [];
  for (const h of horarios) {
    botones.push([{
      texto: partesBogota(h.inicio).hora,
      datos: await callbackAgenda(deps.config.webhookSecret, `h:${servicioId}:${h.id}`),
    }]);
  }
  await enviar(deps, chatId, `Horarios para ${diaBogota(fecha)}:`, { teclado: botones });
}

async function mostrarResumen(
  deps: Deps,
  chatId: number,
  servicioId: number,
  horarioId: number,
): Promise<void> {
  const servicios = await deps.repo.listarServicios();
  const servicio = servicios.find((s) => s.id === servicioId);
  const horarios = await deps.repo.horariosDisponibles(servicioId);
  const horario = horarios.find((h) => h.id === horarioId);
  if (!servicio || !horario) {
    await enviar(deps, chatId, "Ese horario ya no está disponible. Elige otro con Agendar.");
    return;
  }
  const p = partesBogota(horario.inicio);
  const texto = [
    "Resumen de tu solicitud:",
    "",
    `Servicio: ${servicio.nombre}`,
    `Precio: ${precioCop(servicio.precio_cop)}`,
    `Duración: ${servicio.duracion_min} min`,
    `Día: ${diaBogota(p.fecha)}`,
    `Hora: ${p.hora} (America/Bogota)`,
    "",
    "Al enviar, la cita queda PENDIENTE hasta que la responsable la confirme.",
  ].join("\n");
  await enviar(deps, chatId, texto, {
    teclado: [[{
      texto: "Enviar solicitud",
      datos: await callbackAgenda(deps.config.webhookSecret, `x:${servicioId}:${horarioId}`),
    }]],
  });
}

async function enviarSolicitud(
  deps: Deps,
  userId: number,
  chatId: number,
  servicioId: number,
  horarioId: number,
): Promise<void> {
  try {
    const r = await deps.repo.mutar({
      accion: "solicitar",
      actorUserId: userId,
      actorChatId: chatId,
      clienteUserId: userId,
      clienteChatId: chatId,
      servicioId,
      horarioId,
    });
    await enviar(
      deps,
      chatId,
      `Solicitud registrada: cita #${r.citaId}, estado ${r.estado}.\n` +
        `Horario: ${fechaHoraBogota(r.inicio)} (America/Bogota).\n` +
        "La responsable la revisará y te confirmará por aquí.",
      { menu: MENU },
    );
  } catch (error) {
    if (error instanceof ErrorNegocio && error.codigo === "HORARIO_OCUPADO") {
      const activa = await deps.repo.citaActiva(userId);
      if (activa && activa.horario_id === horarioId) {
        await enviar(
          deps,
          chatId,
          `Ya registramos tu solicitud (#${activa.id}, estado ${activa.estado}). ` +
            "No se duplicó. Puedes verla en Mi cita.",
          { menu: MENU },
        );
        return;
      }
      await enviar(deps, chatId, "Ese horario acaba de ocuparse. Elige otro con Agendar.");
      return;
    }
    await enviar(deps, chatId, mensajeDeError(error));
  }
}

async function mostrarMiCita(deps: Deps, userId: number, chatId: number): Promise<void> {
  await deps.repo.vencerCitas();
  const cita = await deps.repo.citaActiva(userId);
  if (!cita) {
    await enviar(deps, chatId, "No tienes una cita activa. Escribe Agendar para solicitar una.");
    return;
  }
  await enviarCita(deps, chatId, cita, true);
}

async function enviarCita(
  deps: Deps,
  chatId: number,
  cita: Cita,
  permitirCancelar: boolean,
): Promise<void> {
  const cuando = cita.horario_inicio ? fechaHoraBogota(cita.horario_inicio) : "sin horario";
  const texto = [
    `Cita #${cita.id}`,
    `Servicio: ${cita.servicio_nombre ?? "(no disponible)"}`,
    `Horario: ${cuando} (America/Bogota)`,
    `Estado: ${cita.estado}`,
  ].join("\n");

  if (permitirCancelar && (cita.estado === "pendiente" || cita.estado === "confirmada")) {
    const emitido = Math.floor(deps.ahora().getTime() / 1000);
    await enviar(deps, chatId, texto, {
      teclado: [[{
        texto: "Cancelar cita",
        datos: await callbackCita(deps.config.webhookSecret, cita.id, "cancelar", emitido),
      }]],
    });
    return;
  }
  await enviar(deps, chatId, texto);
}

async function mostrarPendientes(deps: Deps, chatId: number, offset: number): Promise<void> {
  await deps.repo.vencerCitas();
  const todas = await deps.repo.citasPendientes(offset + POR_PAGINA + 1);
  const pagina = todas.slice(offset, offset + POR_PAGINA);

  if (offset === 0) {
    await enviar(
      deps,
      chatId,
      `Solicitudes pendientes (${todas.length}${todas.length > offset + POR_PAGINA ? "+" : ""}):`,
    );
  }
  if (pagina.length === 0) {
    await enviar(deps, chatId, "No hay solicitudes pendientes en esta página.");
    return;
  }
  for (const cita of pagina) {
    await enviarAvisoSolicitud(deps, chatId, cita);
  }
  if (todas.length > offset + POR_PAGINA) {
    await enviar(deps, chatId, "Hay más solicitudes.", {
      teclado: [[{
        texto: "Ver más",
        datos: await callbackAgenda(deps.config.webhookSecret, `pd:${offset + POR_PAGINA}`),
      }]],
    });
  }
}

async function enviarAvisoSolicitud(deps: Deps, chatId: number, cita: Cita): Promise<void> {
  const cuando = cita.horario_inicio ? fechaHoraBogota(cita.horario_inicio) : "sin horario";
  const emitido = Math.floor(deps.ahora().getTime() / 1000);
  const texto = [
    `Solicitud #${cita.id}`,
    `Servicio: ${cita.servicio_nombre ?? "(no disponible)"}`,
    cita.precio_cop !== null ? `Precio: ${precioCop(cita.precio_cop)}` : "",
    `Horario: ${cuando} (America/Bogota)`,
    `Solicitada: ${fechaHoraBogota(cita.solicitada_en)}`,
  ].filter(Boolean).join("\n");

  await enviar(deps, chatId, texto, {
    teclado: [[
      {
        texto: "Confirmar",
        datos: await callbackCita(deps.config.webhookSecret, cita.id, "confirmar", emitido),
      },
      {
        texto: "Rechazar",
        datos: await callbackCita(deps.config.webhookSecret, cita.id, "rechazar", emitido),
      },
    ]],
  });
}

// ---------------------------------------------------------------------------
// Callbacks
// ---------------------------------------------------------------------------

async function manejarCallback(
  cb: {
    id: string;
    from: { id: number; is_bot?: boolean };
    message?: MensajeTelegram;
    data?: string;
  },
  deps: Deps,
): Promise<void> {
  const chat = cb.message?.chat;
  if (!chat || chat.type !== "private" || cb.from.is_bot) return;
  await registrar(deps, cb.from.id, chat.id, cb.from as { first_name?: string; username?: string });
  const datos = cb.data ?? "";

  if (datos.startsWith("ag:")) {
    const cuerpo = await validarCallbackAgenda(deps.config.webhookSecret, datos);
    await deps.telegram.responderCallback(cb.id);
    if (!cuerpo) {
      await enviar(
        deps,
        chat.id,
        "Ese botón ya no es válido. Escribe Agendar para empezar de nuevo.",
      );
      return;
    }
    await flujoAgenda(deps, cb.from.id, chat.id, cuerpo);
    return;
  }

  if (datos.startsWith("cita:")) {
    const info = await validarCallbackCita(
      deps.config.webhookSecret,
      datos,
      deps.ahora().getTime(),
    );
    if (!info) {
      await deps.telegram.responderCallback(cb.id);
      await enviar(deps, chat.id, "Ese botón ya venció o no es válido. Usa Mi cita o /pendientes.");
      return;
    }
    await deps.telegram.responderCallback(cb.id);
    await flujoCita(deps, cb.from.id, chat.id, info.citaId, info.accion);
    return;
  }

  await deps.telegram.responderCallback(cb.id);
}

async function flujoAgenda(
  deps: Deps,
  userId: number,
  chatId: number,
  cuerpo: string,
): Promise<void> {
  const partes = cuerpo.split(":");
  const tipo = partes[0];

  if (tipo === "svc") {
    await mostrarFechas(deps, chatId, Number(partes[1]));
    return;
  }
  if (tipo === "d") {
    await mostrarHoras(deps, chatId, Number(partes[1]), partes[2]);
    return;
  }
  if (tipo === "h") {
    await mostrarResumen(deps, chatId, Number(partes[1]), Number(partes[2]));
    return;
  }
  if (tipo === "x") {
    await enviarSolicitud(deps, userId, chatId, Number(partes[1]), Number(partes[2]));
    return;
  }
  if (tipo === "pd") {
    if (!esResponsable(deps, userId, chatId)) {
      await enviar(deps, chatId, textoAccesoDenegado());
      return;
    }
    await mostrarPendientes(deps, chatId, Number(partes[1]));
    return;
  }
  await enviar(deps, chatId, "Opción no reconocida. Escribe Agendar.");
}

async function flujoCita(
  deps: Deps,
  userId: number,
  chatId: number,
  citaId: number,
  accion: string,
): Promise<void> {
  const responsable = esResponsable(deps, userId, chatId);
  const cita = await deps.repo.citaPorId(citaId);
  if (!cita) {
    await enviar(deps, chatId, "No encontré esa cita. Usa Mi cita o /pendientes.");
    return;
  }
  const esDuenia = cita.cliente_user_id === userId;

  if (accion === "confirmar" || accion === "rechazar") {
    if (!responsable) {
      await enviar(deps, chatId, textoAccesoDenegado());
      return;
    }
    try {
      const r = await deps.repo.mutar({
        accion: accion as "confirmar" | "rechazar",
        actorUserId: userId,
        actorChatId: chatId,
        citaId,
      });
      await enviar(
        deps,
        chatId,
        `Cita #${r.citaId} ${r.estado}. Aviso enviado a la clienta.`,
      );
    } catch (error) {
      await enviar(deps, chatId, mensajeDeError(error));
    }
    return;
  }

  if (accion === "cancelar") {
    if (!esDuenia && !responsable) {
      await enviar(deps, chatId, textoAccesoDenegado());
      return;
    }
    if (cita.estado !== "pendiente" && cita.estado !== "confirmada") {
      await enviar(deps, chatId, "Esa cita ya no se puede cancelar.");
      return;
    }
    const emitido = Math.floor(deps.ahora().getTime() / 1000);
    await enviar(
      deps,
      chatId,
      `¿Seguro que quieres cancelar la cita #${cita.id}? Esta acción libera el horario.`,
      {
        teclado: [[
          {
            texto: "Sí, cancelar",
            datos: await callbackCita(deps.config.webhookSecret, cita.id, "cancelar2", emitido),
          },
          {
            texto: "No",
            datos: await callbackCita(deps.config.webhookSecret, cita.id, "nada", emitido),
          },
        ]],
      },
    );
    return;
  }

  if (accion === "cancelar2") {
    if (!esDuenia && !responsable) {
      await enviar(deps, chatId, textoAccesoDenegado());
      return;
    }
    try {
      const r = await deps.repo.mutar({
        accion: "cancelar",
        actorUserId: userId,
        actorChatId: chatId,
        citaId,
      });
      await enviar(deps, chatId, `Cita #${r.citaId} cancelada. El horario quedó libre.`);
    } catch (error) {
      await enviar(deps, chatId, mensajeDeError(error));
    }
    return;
  }

  // "nada" u otra acción: no se hace nada.
}

// ---------------------------------------------------------------------------
// Cola de avisos persistentes
// ---------------------------------------------------------------------------

export interface ResumenCola {
  enviados: number;
  fallidos: number;
  revision: number;
}

/** Reclama y envía avisos. Un aviso que falla NO afecta a la cita. */
export async function procesarCola(deps: Deps, lote = 10): Promise<ResumenCola> {
  const resumen: ResumenCola = { enviados: 0, fallidos: 0, revision: 0 };

  let avisos: Aviso[] = [];
  try {
    avisos = await deps.repo.reclamarAvisos(lote, 60);
  } catch {
    return resumen;
  }

  for (const aviso of avisos) {
    try {
      const teclado = await tecladoDeAviso(deps, aviso);
      const messageId = teclado
        ? await deps.telegram.enviarMensaje(aviso.destino_chat_id, aviso.cuerpo, { teclado })
        : await deps.telegram.enviarMensaje(aviso.destino_chat_id, aviso.cuerpo);
      await deps.repo.finalizarAviso({
        id: aviso.id,
        token: aviso.lease_token,
        resultado: "enviado",
        telegramMessageId: messageId,
      });
      resumen.enviados++;
    } catch (error) {
      try {
        const resultado = await finalizarConError(deps, aviso, error);
        if (resultado === "revision") resumen.revision++;
        else resumen.fallidos++;
      } catch {
        // El lease pudo vencer: no se pierde la cita, solo el aviso se reintenta.
      }
    }
  }

  return resumen;
}

async function finalizarConError(
  deps: Deps,
  aviso: Aviso,
  error: unknown,
): Promise<"fallido" | "revision"> {
  if (error instanceof ErrorIncierto) {
    await deps.repo.finalizarAviso({
      id: aviso.id,
      token: aviso.lease_token,
      resultado: "revision",
      errorCodigo: "incierto",
      errorDetalle: error.message,
    });
    return "revision";
  }
  if (error instanceof ErrorTelegram) {
    const detalle = error.retryAfter ? `retry_after=${error.retryAfter}` : error.descripcion;
    await deps.repo.finalizarAviso({
      id: aviso.id,
      token: aviso.lease_token,
      resultado: "fallido",
      errorCodigo: String(error.codigo),
      errorDetalle: detalle,
    });
    return "fallido";
  }
  await deps.repo.finalizarAviso({
    id: aviso.id,
    token: aviso.lease_token,
    resultado: "revision",
    errorCodigo: "desconocido",
    errorDetalle: error instanceof Error ? error.message : String(error),
  });
  return "revision";
}

/** Las solicitudes llevan botones de confirmar/rechazar para el responsable. */
async function tecladoDeAviso(deps: Deps, aviso: Aviso): Promise<FilaBotones[] | undefined> {
  if (aviso.tipo !== "solicitud_registrada") return undefined;
  const emitido = Math.floor(deps.ahora().getTime() / 1000);
  return [[
    {
      texto: "Confirmar",
      datos: await callbackCita(deps.config.webhookSecret, aviso.cita_id, "confirmar", emitido),
    },
    {
      texto: "Rechazar",
      datos: await callbackCita(deps.config.webhookSecret, aviso.cita_id, "rechazar", emitido),
    },
  ]];
}

// ---------------------------------------------------------------------------
// Auxiliares
// ---------------------------------------------------------------------------

function mensajeDeError(error: unknown): string {
  if (error instanceof ErrorNegocio) {
    switch (error.codigo) {
      case "HORARIO_OCUPADO":
        return "Ese horario ya está ocupado. Elige otro con Agendar.";
      case "CITA_ACTIVA_EXISTENTE":
        return "Ya tienes una cita activa. Usa Mi cita para verla.";
      case "HORARIO_PASADO":
        return "Ese horario ya pasó. Elige otro con Agendar.";
      case "HORARIO_FUERA_DE_JORNADA":
        return "Ese horario no cabe en la jornada. Elige otro con Agendar.";
      case "SERVICIO_INACTIVO":
        return "Ese servicio no está disponible por ahora.";
      case "TRANSICION_INVALIDA":
        return "Esa cita ya no admite esa acción.";
      case "CITA_NO_ENCONTRADA":
        return "No encontré esa cita.";
      case "SIN_PERMISO":
        return textoAccesoDenegado();
      default:
        return "No pude completar la operación. Intenta de nuevo.";
    }
  }
  return "Ocurrió un error temporal. Intenta de nuevo en un momento.";
}

async function enviar(
  deps: Deps,
  chatId: number,
  texto: string,
  opciones: { teclado?: FilaBotones[]; menu?: string[][] } = {},
): Promise<void> {
  try {
    await deps.telegram.enviarMensaje(chatId, texto, opciones);
  } catch {
    // Una respuesta interactiva que falla no debe tumbar el update.
  }
}
