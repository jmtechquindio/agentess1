/**
 * Pruebas de las utilidades puras: zona horaria de Bogotá, formato de precios,
 * regla de horario ofrecible y firma/validación de botones.
 *
 * Reloj fijo, sin red y sin base de datos.
 */

import { assert, assertEquals } from "jsr:@std/assert@1";
import {
  callbackAgenda,
  callbackCita,
  comando,
  diaBogota,
  fechaHoraBogota,
  horarioOfrecible,
  partesBogota,
  precioCop,
  validarCallbackAgenda,
  validarCallbackCita,
} from "./formato.ts";

const SECRETO = "secreto-de-prueba";

Deno.test("partesBogota convierte a America/Bogota (UTC-5, sin DST)", () => {
  const p = partesBogota("2026-10-13T14:00:00.000Z");
  assertEquals(p.fecha, "2026-10-13");
  assertEquals(p.hora, "09:00");
});

Deno.test("fechaHoraBogota muestra DD/MM/YYYY HH:MM", () => {
  assertEquals(fechaHoraBogota("2026-10-14T14:00:00.000Z"), "14/10/2026 09:00");
});

Deno.test("diaBogota incluye el nombre del día", () => {
  // 2026-10-14 es miércoles.
  assertEquals(diaBogota("2026-10-14"), "miércoles 14/10/2026");
});

Deno.test("precioCop formatea sin decimales", () => {
  assertEquals(precioCop(35000), "35.000 COP");
});

Deno.test("horarioOfrecible: un horario futuro dentro de jornada se ofrece", () => {
  // 09:00 Bogotá + 60 min = 10:00, cabe.
  assert(horarioOfrecible("2026-10-14T14:00:00.000Z", 60, "2026-10-13T14:00:00.000Z"));
});

Deno.test("horarioOfrecible: un horario pasado no se ofrece (fecha pasada)", () => {
  assertEquals(horarioOfrecible("2026-10-12T14:00:00.000Z", 60, "2026-10-13T14:00:00.000Z"), false);
});

Deno.test("horarioOfrecible: si el fin pasa de las 18:00 no se ofrece", () => {
  // 17:30 Bogotá + 75 min = 18:45, no cabe.
  assertEquals(horarioOfrecible("2026-10-14T22:30:00.000Z", 75, "2026-10-13T14:00:00.000Z"), false);
});

Deno.test("comando extrae el nombre sin argumentos ni sufijo del bot", () => {
  assertEquals(comando("/start"), "start");
  assertEquals(comando("/Start@spa_bot algo"), "start");
  assertEquals(comando("hola"), null);
});

Deno.test("callbackAgenda se valida solo con la firma correcta", async () => {
  const datos = await callbackAgenda(SECRETO, "svc:3");
  assertEquals(await validarCallbackAgenda(SECRETO, datos), "svc:3");
  assertEquals(await validarCallbackAgenda(SECRETO, "ag:svc:3:000000000000"), null);
  assertEquals(await validarCallbackAgenda("otro-secreto", datos), null);
});

Deno.test("callbackCita se valida con firma y ventana de 15 minutos", async () => {
  const ahora = Date.parse("2026-10-13T14:00:00.000Z");
  const emitido = Math.floor(ahora / 1000);
  const datos = await callbackCita(SECRETO, 7, "confirmar", emitido);

  const ok = await validarCallbackCita(SECRETO, datos, ahora);
  assertEquals(ok?.citaId, 7);
  assertEquals(ok?.accion, "confirmar");

  // Callback viejo: 20 minutos después ya no es válido.
  assertEquals(await validarCallbackCita(SECRETO, datos, ahora + 20 * 60_000), null);

  // Callback manipulado: cambiar la acción invalida la firma.
  const manipulado = datos.replace("confirmar", "rechazar");
  assertEquals(await validarCallbackCita(SECRETO, manipulado, ahora), null);
});
