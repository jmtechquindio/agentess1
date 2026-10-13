/**
 * Pruebas del manejador con dobles (mocks) y reloj fijo.
 *
 * Cubre la lista de casos de ESPECIFICACION.md §8.3 sin red, sin `.env` y sin
 * Supabase real. Los dobles son `RepoFalso` y `TelegramFalso`.
 */

import { assert, assertEquals } from "jsr:@std/assert@1";
import { callbackAgenda, callbackCita } from "./formato.ts";
import { manejarUpdate, procesarCola } from "./manejador.ts";
import { ErrorIncierto, ErrorTelegram } from "./telegram.ts";
import {
  type Aviso,
  type Cita,
  type ClienteTelegram,
  type Config,
  type DatosUsuario,
  type Deps,
  type EntradaFinalizar,
  type EntradaMutacion,
  ErrorNegocio,
  type Horario,
  type OpcionesEnvio,
  type Repositorio,
  type ResultadoMutacion,
  type Servicio,
  type UpdateTelegram,
} from "./tipos.ts";

const SECRETO = "secreto-de-prueba";
// Martes 2026-10-13, 09:00 en America/Bogota.
const AHORA = new Date("2026-10-13T14:00:00.000Z");
const EMITIDO = Math.floor(AHORA.getTime() / 1000);

const CONFIG: Config = {
  botToken: "token",
  webhookSecret: SECRETO,
  adminUserId: 999,
  adminChatId: 999,
  supabaseUrl: "https://ejemplo.supabase.co",
  supabaseServiceKey: "clave",
};

const SERVICIOS: Servicio[] = [
  {
    id: 1,
    nombre: "Manicure clásica",
    descripcion: "Limpieza",
    precio_cop: 35000,
    duracion_min: 60,
  },
  {
    id: 2,
    nombre: "Pedicura spa",
    descripcion: "Exfoliación",
    precio_cop: 45000,
    duracion_min: 75,
  },
  { id: 3, nombre: "Uñas de gel", descripcion: "Gel", precio_cop: 60000, duracion_min: 90 },
];

const HORARIOS: Horario[] = [
  { id: 101, inicio: "2026-10-14T14:00:00.000Z" }, // miércoles 09:00 Bogotá
  { id: 102, inicio: "2026-10-14T15:00:00.000Z" }, // 10:00
];

function cita(parcial: Partial<Cita> = {}): Cita {
  return {
    id: 7,
    cliente_user_id: 555,
    cliente_chat_id: 555,
    servicio_id: 1,
    horario_id: 101,
    estado: "pendiente",
    nota: null,
    solicitada_en: "2026-10-13T13:00:00.000Z",
    servicio_nombre: "Manicure clásica",
    precio_cop: 35000,
    duracion_min: 60,
    horario_inicio: "2026-10-14T14:00:00.000Z",
    ...parcial,
  };
}

function aviso(parcial: Partial<Aviso> = {}): Aviso {
  return {
    id: 1,
    cita_id: 7,
    tipo: "solicitud_registrada",
    destino_chat_id: 999,
    destino_user_id: 999,
    cuerpo: "Solicitud #7",
    estado: "pendiente",
    intentos: 1,
    max_intentos: 3,
    lease_token: "00000000-0000-0000-0000-000000000001",
    ...parcial,
  };
}

class TelegramFalso implements ClienteTelegram {
  enviados: { chatId: number; texto: string; opciones?: OpcionesEnvio }[] = [];
  callbacks: string[] = [];
  alEnviar?: (chatId: number, texto: string) => Error | void;

  enviarMensaje(
    chatId: number,
    texto: string,
    opciones?: OpcionesEnvio,
  ): Promise<number> {
    const error = this.alEnviar?.(chatId, texto);
    if (error) return Promise.reject(error);
    this.enviados.push({ chatId, texto, opciones });
    return Promise.resolve(this.enviados.length);
  }

  responderCallback(callbackId: string, _texto?: string): Promise<void> {
    this.callbacks.push(callbackId);
    return Promise.resolve();
  }

  textoJunto(): string {
    return this.enviados.map((e) => e.texto).join("\n");
  }
}

class RepoFalso implements Repositorio {
  usuarios: DatosUsuario[] = [];
  updates = new Set<number>();
  servicios: Servicio[] = SERVICIOS;
  horarios: Horario[] = HORARIOS;
  citas: Cita[] = [];
  avisos: Aviso[] = [];
  finalizados: EntradaFinalizar[] = [];
  mutaciones: EntradaMutacion[] = [];
  mutarImpl: (e: EntradaMutacion) => ResultadoMutacion = (e) => ({
    citaId: 1,
    estado: e.accion === "solicitar" ? "pendiente" : "confirmada",
    horarioId: e.horarioId ?? 101,
    inicio: "2026-10-14T14:00:00.000Z",
  });
  finalizarImpl?: (a: EntradaFinalizar) => void;

  registrarUsuario(u: DatosUsuario): Promise<void> {
    this.usuarios.push(u);
    return Promise.resolve();
  }
  registrarUpdate(id: number): Promise<boolean> {
    if (this.updates.has(id)) return Promise.resolve(false);
    this.updates.add(id);
    return Promise.resolve(true);
  }
  generarHorarios(): Promise<number> {
    return Promise.resolve(0);
  }
  vencerCitas(): Promise<number> {
    return Promise.resolve(0);
  }
  listarServicios(): Promise<Servicio[]> {
    return Promise.resolve(this.servicios);
  }
  horariosDisponibles(_servicioId: number): Promise<Horario[]> {
    return Promise.resolve(this.horarios);
  }
  citaActiva(userId: number): Promise<Cita | null> {
    return Promise.resolve(
      this.citas.find(
        (c) =>
          c.cliente_user_id === userId && (c.estado === "pendiente" || c.estado === "confirmada"),
      ) ?? null,
    );
  }
  citaPorId(id: number): Promise<Cita | null> {
    return Promise.resolve(this.citas.find((c) => c.id === id) ?? null);
  }
  citasPendientes(_limite: number): Promise<Cita[]> {
    return Promise.resolve(this.citas.filter((c) => c.estado === "pendiente"));
  }
  mutar(e: EntradaMutacion): Promise<ResultadoMutacion> {
    this.mutaciones.push(e);
    return Promise.resolve().then(() => this.mutarImpl(e));
  }
  reclamarAvisos(): Promise<Aviso[]> {
    const salida = this.avisos;
    this.avisos = [];
    return Promise.resolve(salida);
  }
  finalizarAviso(a: EntradaFinalizar): Promise<void> {
    return Promise.resolve().then(() => {
      this.finalizarImpl?.(a);
      this.finalizados.push(a);
    });
  }
}

let contador = 0;
function proximoUpdate(): number {
  return ++contador;
}

function crear() {
  const repo = new RepoFalso();
  const telegram = new TelegramFalso();
  const deps: Deps = { repo, telegram, config: CONFIG, ahora: () => AHORA };
  return { repo, telegram, deps };
}

function mensaje(texto: string, userId = 555, chatId = 555, tipo = "private"): UpdateTelegram {
  return {
    update_id: proximoUpdate(),
    message: {
      message_id: 1,
      date: EMITIDO,
      text: texto,
      chat: { id: chatId, type: tipo },
      from: { id: userId, first_name: "Persona" },
    },
  };
}

function callback(datos: string, userId = 555, chatId = 555, tipo = "private"): UpdateTelegram {
  return {
    update_id: proximoUpdate(),
    callback_query: {
      id: `cb-${contador}`,
      from: { id: userId, first_name: "Persona" },
      message: { message_id: 2, date: EMITIDO, chat: { id: chatId, type: tipo } },
      data: datos,
    },
  };
}

// ---------------------------------------------------------------------------
// Superficie del bot
// ---------------------------------------------------------------------------

Deno.test("menú inicial: /start responde con el menú", async () => {
  const { deps, telegram } = crear();
  await manejarUpdate(mensaje("/start"), deps);
  assert(telegram.textoJunto().includes("Spa Manos y Pies"));
});

Deno.test("servicios: muestra precio y duración desde la base", async () => {
  const { deps, telegram } = crear();
  await manejarUpdate(mensaje("Servicios"), deps);
  const texto = telegram.textoJunto();
  assert(texto.includes("Manicure clásica"));
  assert(texto.includes("35.000 COP"));
  assert(texto.includes("60 min"));
});

Deno.test("agenda: servicio, día y hora en Bogotá, y resumen", async () => {
  const { deps, telegram } = crear();
  await manejarUpdate(mensaje("Agendar"), deps);
  await manejarUpdate(callback(await callbackAgenda(SECRETO, "svc:1")), deps);
  await manejarUpdate(callback(await callbackAgenda(SECRETO, "d:1:2026-10-14")), deps);
  await manejarUpdate(callback(await callbackAgenda(SECRETO, "h:1:101")), deps);
  const texto = telegram.textoJunto();
  assert(texto.includes("09:00 (America/Bogota)"));
  assert(texto.includes("Enviar solicitud") || texto.includes("Resumen de tu solicitud"));
});

Deno.test("enviar solicitud crea la cita en estado pendiente", async () => {
  const { deps, telegram, repo } = crear();
  repo.mutarImpl = (e) => ({
    citaId: 11,
    estado: "pendiente",
    horarioId: e.horarioId ?? 101,
    inicio: "2026-10-14T14:00:00.000Z",
  });
  await manejarUpdate(callback(await callbackAgenda(SECRETO, "x:1:101")), deps);
  const texto = telegram.textoJunto();
  assert(texto.includes("cita #11"));
  assert(texto.includes("pendiente"));
});

Deno.test("horario ocupado se informa con un mensaje comprensible", async () => {
  const { deps, telegram, repo } = crear();
  repo.mutarImpl = () => {
    throw new ErrorNegocio("HORARIO_OCUPADO");
  };
  await manejarUpdate(callback(await callbackAgenda(SECRETO, "x:1:101")), deps);
  assert(telegram.textoJunto().includes("acaba de ocuparse"));
});

Deno.test("doble clic: si la cita es la propia, no se duplica", async () => {
  const { deps, telegram, repo } = crear();
  repo.citas = [cita({ id: 20, horario_id: 101, estado: "pendiente" })];
  repo.mutarImpl = () => {
    throw new ErrorNegocio("HORARIO_OCUPADO");
  };
  await manejarUpdate(callback(await callbackAgenda(SECRETO, "x:1:101")), deps);
  assert(telegram.textoJunto().includes("No se duplicó"));
});

Deno.test("dos solicitudes de la misma persona: una sola cita activa", async () => {
  const { deps, telegram, repo } = crear();
  repo.mutarImpl = () => {
    throw new ErrorNegocio("CITA_ACTIVA_EXISTENTE");
  };
  await manejarUpdate(callback(await callbackAgenda(SECRETO, "x:1:102")), deps);
  assert(telegram.textoJunto().includes("Ya tienes una cita activa"));
});

Deno.test("Mi cita muestra solo la cita propia", async () => {
  const { deps, telegram, repo } = crear();
  repo.citas = [cita({ id: 7, cliente_user_id: 555 }), cita({ id: 8, cliente_user_id: 777 })];
  await manejarUpdate(mensaje("Mi cita", 555, 555), deps);
  const texto = telegram.textoJunto();
  assert(texto.includes("Cita #7"));
  assert(!texto.includes("#8"));
});

Deno.test("cancelación ajena se rechaza sin tocar nada", async () => {
  const { deps, telegram, repo } = crear();
  repo.citas = [cita({ id: 7, cliente_user_id: 777 })];
  const datos = await callbackCita(SECRETO, 7, "cancelar2", EMITIDO);
  await manejarUpdate(callback(datos, 555, 555), deps);
  assert(telegram.textoJunto().includes("Acceso denegado"));
  assertEquals(repo.mutaciones.length, 0);
});

Deno.test("confirmación por alguien que no es responsable se rechaza", async () => {
  const { deps, telegram, repo } = crear();
  repo.citas = [cita({ id: 7, cliente_user_id: 555 })];
  const datos = await callbackCita(SECRETO, 7, "confirmar", EMITIDO);
  await manejarUpdate(callback(datos, 555, 555), deps);
  assert(telegram.textoJunto().includes("Acceso denegado"));
  assertEquals(repo.mutaciones.length, 0);
});

Deno.test("el responsable sí puede confirmar", async () => {
  const { deps, telegram, repo } = crear();
  repo.citas = [cita({ id: 7, cliente_user_id: 555 })];
  repo.mutarImpl = () => ({
    citaId: 7,
    estado: "confirmada",
    horarioId: 101,
    inicio: "2026-10-14T14:00:00.000Z",
  });
  const datos = await callbackCita(SECRETO, 7, "confirmar", EMITIDO);
  await manejarUpdate(callback(datos, 999, 999), deps);
  assert(telegram.textoJunto().includes("confirmada"));
  assertEquals(repo.mutaciones[0].accion, "confirmar");
});

Deno.test("doble confirmación no crea otra transición", async () => {
  const { deps, telegram, repo } = crear();
  repo.citas = [cita({ id: 7, cliente_user_id: 555 })];
  repo.mutarImpl = () => {
    throw new ErrorNegocio("TRANSICION_INVALIDA");
  };
  const datos = await callbackCita(SECRETO, 7, "confirmar", EMITIDO);
  await manejarUpdate(callback(datos, 999, 999), deps);
  assert(telegram.textoJunto().includes("ya no admite"));
});

Deno.test("callback manipulado se ignora", async () => {
  const { deps, telegram } = crear();
  await manejarUpdate(callback("ag:svc:1:000000000000"), deps);
  assert(telegram.textoJunto().includes("ya no es válido"));
});

Deno.test("callback viejo se ignora", async () => {
  const { deps, telegram } = crear();
  const viejo = await callbackCita(SECRETO, 7, "cancelar", EMITIDO - 20 * 60);
  await manejarUpdate(callback(viejo), deps);
  assert(telegram.textoJunto().includes("venció"));
});

Deno.test("replay de update_id se ignora", async () => {
  const { deps, telegram } = crear();
  const update = mensaje("/start");
  await manejarUpdate(update, deps);
  const antes = telegram.enviados.length;
  await manejarUpdate({ ...update }, deps);
  assertEquals(telegram.enviados.length, antes);
});

Deno.test("mensaje de grupo no se procesa", async () => {
  const { deps, telegram, repo } = crear();
  await manejarUpdate(mensaje("Servicios", 555, -100123, "group"), deps);
  assertEquals(telegram.enviados.length, 0);
  assertEquals(repo.usuarios.length, 0);
});

Deno.test("texto no reconocido responde con ayuda, no con error", async () => {
  const { deps, telegram } = crear();
  await manejarUpdate(mensaje("hola, qué puedes hacer"), deps);
  assert(telegram.textoJunto().includes("No entendí"));
});

Deno.test("/pendientes sin permiso no revela citas", async () => {
  const { deps, telegram, repo } = crear();
  repo.citas = [cita({ id: 7 })];
  await manejarUpdate(mensaje("/pendientes", 555, 555), deps);
  const texto = telegram.textoJunto();
  assert(texto.includes("Acceso denegado"));
  assert(!texto.includes("#7"));
});

Deno.test("/pendientes del responsable lista con botones de decisión", async () => {
  const { deps, telegram, repo } = crear();
  repo.citas = [cita({ id: 7, cliente_user_id: 555 })];
  await manejarUpdate(mensaje("/pendientes", 999, 999), deps);
  const texto = telegram.textoJunto();
  assert(texto.includes("Solicitud #7"));
  const conTeclado = telegram.enviados.find((e) => e.opciones?.teclado);
  assertEquals(conTeclado?.opciones?.teclado?.[0]?.length, 2);
});

// ---------------------------------------------------------------------------
// Cola de avisos persistentes
// ---------------------------------------------------------------------------

Deno.test("aviso fallido después de guardar: la cita sigue confirmada", async () => {
  const { deps, repo, telegram } = crear();
  repo.citas = [cita({ id: 7, estado: "confirmada" })];
  repo.avisos = [aviso({ tipo: "cita_confirmada", destino_user_id: 555 })];
  telegram.alEnviar = () => new ErrorTelegram(403, "bot was blocked by the user");

  const resumen = await procesarCola(deps);

  assertEquals(repo.citas[0].estado, "confirmada");
  assertEquals(resumen.fallidos, 1);
  assertEquals(repo.finalizados[0].resultado, "fallido");
  assertEquals(repo.finalizados[0].errorCodigo, "403");
});

Deno.test("HTTP 429 se guarda con retry_after para el backoff", async () => {
  const { deps, repo, telegram } = crear();
  repo.avisos = [aviso()];
  telegram.alEnviar = () => new ErrorTelegram(429, "Too Many Requests", 7);

  await procesarCola(deps);

  assertEquals(repo.finalizados[0].resultado, "fallido");
  assertEquals(repo.finalizados[0].errorCodigo, "429");
  assert(String(repo.finalizados[0].errorDetalle).includes("retry_after=7"));
});

Deno.test("timeout incierto deja el aviso en revisión, no reenviado", async () => {
  const { deps, repo, telegram } = crear();
  repo.avisos = [aviso()];
  telegram.alEnviar = () => new ErrorIncierto("sin respuesta de Telegram");

  const resumen = await procesarCola(deps);

  assertEquals(resumen.revision, 1);
  assertEquals(repo.finalizados[0].resultado, "revision");
});

Deno.test("lease vencido no tumba la cola ni pierde la cita", async () => {
  const { deps, repo } = crear();
  repo.citas = [cita({ id: 7, estado: "confirmada" })];
  repo.avisos = [aviso()];
  repo.finalizarImpl = () => {
    throw new ErrorNegocio("LEASE_INVALIDO");
  };

  const resumen = await procesarCola(deps);

  assertEquals(resumen.enviados, 0);
  assertEquals(repo.citas[0].estado, "confirmada");
});

Deno.test("una solicitud registrada lleva botones de confirmar y rechazar", async () => {
  const { deps, telegram, repo } = crear();
  repo.avisos = [aviso({ tipo: "solicitud_registrada", destino_chat_id: 999 })];
  await procesarCola(deps);
  assertEquals(telegram.enviados[0].opciones?.teclado?.[0]?.length, 2);
});
