/**
 * Carga de variables: archivo `.env` local + `Deno.env`.
 *
 * El orden importa. Lo que ya existe en el entorno del proceso gana sobre el
 * archivo, para que una variable se pueda sobreescribir sin editar el `.env`.
 */

import { parseDotEnv } from "./telegram-config.ts";

export type Variables = Record<string, string | undefined>;

/**
 * Devuelve las variables disponibles. Si el `.env` no existe, no es un error:
 * se trabaja solo con el entorno del proceso.
 */
export function cargaEnv(ruta = ".env"): Variables {
  const variables: Variables = {};

  let texto = "";
  try {
    texto = Deno.readTextFileSync(ruta);
  } catch {
    texto = "";
  }
  for (const [clave, valor] of Object.entries(parseDotEnv(texto))) {
    variables[clave] = valor;
  }

  for (const [clave, valor] of Object.entries(Deno.env.toObject())) {
    if (valor !== undefined && valor !== "") variables[clave] = valor;
  }

  return variables;
}

/** Lee una variable ya normalizada, o `""` si no existe. */
export function valor(variables: Variables, nombre: string): string {
  return (variables[nombre] ?? "").trim();
}

/** Imprime el motivo de salida y termina con código 1. */
export function aborta(mensaje: string): never {
  console.error(mensaje);
  Deno.exit(1);
}
