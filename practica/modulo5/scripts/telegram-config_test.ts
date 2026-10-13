/**
 * Pruebas de las funciones puras de `telegram-config.ts`.
 *
 * Sin red, sin `.env`, sin reloj real ni servicios externos. No se usan
 * dependencias externas para que `deno test` funcione sin conexión.
 *
 *   deno test scripts/telegram-config_test.ts
 */

import {
  comando,
  esPlaceholder,
  extraeUsuarios,
  horaBogota,
  normalizaUrlWebhook,
  oculta,
  parseDotEnv,
  type TelegramUpdate,
  urlApiTelegram,
  urlEsWebhookValido,
  variablesFaltantes,
  webhookCoincide,
} from "./telegram-config.ts";

function afirma(condicion: boolean, mensaje: string): void {
  if (!condicion) throw new Error(`FALLA: ${mensaje}`);
}

function afirmaIgual<T>(obtenido: T, esperado: T, mensaje: string): void {
  if (JSON.stringify(obtenido) !== JSON.stringify(esperado)) {
    throw new Error(
      `FALLA: ${mensaje}\n  esperado: ${Deno.inspect(esperado)}\n  obtenido: ${
        Deno.inspect(obtenido)
      }`,
    );
  }
}

function actual(userId: number, texto: string, chatId = userId, type = "private"): TelegramUpdate {
  return {
    update_id: userId,
    message: {
      message_id: userId,
      date: 1_760_000_000 + userId,
      text: texto,
      chat: { id: chatId, type },
      from: { id: userId, first_name: `Persona ${userId}`, username: `persona${userId}` },
    },
  };
}

Deno.test("esPlaceholder detecta valores vacíos y marcadores sin reemplazar", () => {
  afirma(esPlaceholder(undefined), "undefined es un placeholder");
  afirma(esPlaceholder(null), "null es un placeholder");
  afirma(esPlaceholder(""), "cadena vacía es un placeholder");
  afirma(esPlaceholder("   "), "espacios son un placeholder");
  afirma(esPlaceholder("REEMPLAZAR_TOKEN_DE_BOTFATHER"), "REEMPLAZAR es un placeholder");
  afirma(
    esPlaceholder("https://REEMPLAZAR.supabase.co/functions/v1/spa-telegram"),
    "URL sin reemplazar",
  );
  afirma(!esPlaceholder("123456789"), "un id real no es un placeholder");
  afirma(!esPlaceholder("  123456789  "), "un id real con espacios no es un placeholder");
});

Deno.test("parseDotEnv lee claves, ignora comentarios y quita comillas", () => {
  const texto = [
    "# comentario de encabezado",
    "",
    "TELEGRAM_BOT_TOKEN=123:abc",
    "  export ADMIN_USER_ID = 42 ",
    'TELEGRAM_WEBHOOK_SECRET="con espacio"',
    "ADMIN_CHAT_ID=99 # comentario al final",
    "SIN_IGUAL",
    "=sin_clave",
  ].join("\r\n");

  const variables = parseDotEnv(texto);

  afirmaIgual(variables.TELEGRAM_BOT_TOKEN, "123:abc", "token sin comillas");
  afirmaIgual(variables.ADMIN_USER_ID, "42", "export y espacios");
  afirmaIgual(variables.TELEGRAM_WEBHOOK_SECRET, "con espacio", "comillas dobles");
  afirmaIgual(variables.ADMIN_CHAT_ID, "99", "comentario al final se corta");
  afirma(!("SIN_IGUAL" in variables), "una línea sin = se ignora");
  afirma(!("" in variables), "una línea sin clave se ignora");
});

Deno.test("normalizaUrlWebhook ignora mayúsculas, barra final, query y fragmento", () => {
  const base = "https://abc.supabase.co/functions/v1/spa-telegram";
  afirmaIgual(
    normalizaUrlWebhook("https://ABC.supabase.co/functions/v1/spa-telegram/"),
    base,
    "mayúsculas y barra final",
  );
  afirmaIgual(
    normalizaUrlWebhook(`${base}?x=1#y`),
    base,
    "query y fragmento",
  );
  afirmaIgual(normalizaUrlWebhook(""), "", "vacía");
  afirmaIgual(normalizaUrlWebhook(null), "", "null");
});

Deno.test("webhookCoincide solo es verdadero con la misma URL destino", () => {
  const esperada = "https://abc.supabase.co/functions/v1/spa-telegram";
  afirma(webhookCoincide(esperada, esperada), "misma URL");
  afirma(webhookCoincide(`${esperada}/`, esperada), "barra final inocua");
  afirma(
    !webhookCoincide("https://otro.supabase.co/functions/v1/spa-telegram", esperada),
    "otro proyecto",
  );
  afirma(!webhookCoincide("", esperada), "sin webhook registrado");
  afirma(!webhookCoincide(undefined, esperada), "undefined no coincide");
});

Deno.test("urlEsWebhookValido exige https y la ruta de la Edge Function", () => {
  afirma(urlEsWebhookValido("https://abc.supabase.co/functions/v1/spa-telegram"), "URL del taller");
  afirma(urlEsWebhookValido("https://abc.supabase.co/functions/v1/spa-telegram/"), "barra final");
  afirma(!urlEsWebhookValido("http://abc.supabase.co/functions/v1/spa-telegram"), "http no sirve");
  afirma(!urlEsWebhookValido("https://abc.supabase.co/functions/v1/otra"), "otra función");
  afirma(!urlEsWebhookValido("no es una url"), "texto que no es URL");
  afirma(
    !urlEsWebhookValido("https://REEMPLAZAR.supabase.co/functions/v1/spa-telegram"),
    "sin Project ID",
  );
});

Deno.test("urlApiTelegram arma la ruta del método sin imprimir nada", () => {
  afirmaIgual(
    urlApiTelegram("123:abc", "getMe"),
    "https://api.telegram.org/bot123:abc/getMe",
    "URL de getMe",
  );
  afirmaIgual(
    urlApiTelegram(" 123:abc ", "setWebhook"),
    "https://api.telegram.org/bot123:abc/setWebhook",
    "los espacios del token se ignoran",
  );
});

Deno.test("variablesFaltantes lista solo lo que falta o sigue sin reemplazar", () => {
  const registro = {
    TELEGRAM_BOT_TOKEN: "123:abc",
    TELEGRAM_WEBHOOK_SECRET: "REEMPLAZAR_SECRETO",
    TELEGRAM_WEBHOOK_URL: "https://abc.supabase.co/functions/v1/spa-telegram",
  };
  afirmaIgual(
    variablesFaltantes(registro, [
      "TELEGRAM_BOT_TOKEN",
      "TELEGRAM_WEBHOOK_SECRET",
      "ADMIN_USER_ID",
    ]),
    ["TELEGRAM_WEBHOOK_SECRET", "ADMIN_USER_ID"],
    "faltan el placeholder y la variable ausente",
  );
  afirmaIgual(
    variablesFaltantes(
      { TELEGRAM_BOT_TOKEN: "123:abc", TELEGRAM_WEBHOOK_SECRET: "s3cr3t" },
      ["TELEGRAM_BOT_TOKEN", "TELEGRAM_WEBHOOK_SECRET"],
    ),
    [],
    "no falta nada",
  );
});

Deno.test("comando extrae el nombre sin argumentos ni sufijo del bot", () => {
  afirmaIgual(comando("/start"), "start", "comando simple");
  afirmaIgual(comando("/help con texto"), "help", "ignora los argumentos");
  afirmaIgual(comando("/IDENTIFICAR@spa_bot"), "identificar", "sin sufijo y en minúsculas");
  afirmaIgual(comando("hola"), null, "texto libre");
  afirmaIgual(comando(""), null, "vacío");
  afirmaIgual(comando(undefined), null, "undefined");
});

Deno.test("extraeUsuarios agrupa por persona y descarta grupos y canales", () => {
  const updates = [
    actual(10, "/start"),
    actual(10, "servicios"),
    { ...actual(20, "hola", -100, "group") },
    { ...actual(30, "/identificar", 30, "supergroup") },
    actual(10, "gracias", 99),
  ];

  const usuarios = extraeUsuarios(updates);

  afirmaIgual(usuarios.length, 1, "solo queda la persona de chat privado");
  afirmaIgual(usuarios[0].user_id, 10, "user_id");
  afirmaIgual(usuarios[0].chat_id, 99, "el chat_id más reciente");
  afirmaIgual(usuarios[0].mensajes, 3, "mensajes contados");
  afirmaIgual(usuarios[0].comandos, ["start"], "comandos sin repetir");
});

Deno.test("extraeUsuarios devuelve una lista vacía sin mensajes", () => {
  afirmaIgual(extraeUsuarios([]), [], "sin updates");
  afirmaIgual(extraeUsuarios([{ update_id: 1 }]), [], "update sin mensaje");
});

Deno.test("horaBogota usa America/Bogota y es determinista", () => {
  const instante = 1_772_000_000;
  const bogota = horaBogota(instante);
  const utc = new Intl.DateTimeFormat("es-CO", {
    timeZone: "UTC",
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(instante * 1000));

  afirma(bogota.length > 0, "devuelve un texto");
  afirmaIgual(bogota, horaBogota(instante), "mismo instante, mismo texto");
  afirma(bogota !== utc, "la hora de Bogotá no es la de UTC");
});

Deno.test("oculta nunca devuelve el valor de un secreto", () => {
  afirma(oculta("REEMPLAZAR").includes("sin configurar"), "placeholder sin configurar");
  afirma(oculta("123:abc").includes("oculto"), "valor real oculto");
  afirma(!oculta("123:abc").includes("123"), "el token no aparece");
});
