# proyecto-inicial · Bot de Telegram para el Spa Manos y Pies

Punto de partida del Módulo 5 del curso de IA para agentes de Fundación Cognitus.
Telegram es la interfaz, **TypeScript** ejecuta las reglas y **Supabase** guarda
los datos y aloja la función.

Este paquete es solo el andamiaje: la especificación, las reglas del proyecto y
los tres scripts que administran el webhook. El bot, la migración y las pruebas
los construye OpenCode con los prompts del taller.

> Este paquete fue **reconstruido a partir de la guía publicada**, porque el ZIP
> original `taller-telegram-opencode.zip` no está disponible para descarga en
> `cursoia.cognitus.org`. Consulta `NOTAS-RECONSTRUCCION.md`.

## Contenido

```
proyecto-inicial/
├── AGENTS.md              Reglas que vigilan en todo el proyecto
├── ESPECIFICACION.md      Contrato de datos, RPC, avisos, permisos y pruebas
├── README.md              Este archivo
├── NOTAS-RECONSTRUCCION.md
├── opencode.json          Agentes Plan (sin escritura) y Build
├── deno.json              Tareas telegram:identificar, telegram:conectar, telegram:estado
├── .env.example           Plantilla de variables; sin secretos
├── .gitignore
├── evidencia/
│   └── RESULTADOS.md      Pruebas ejecutadas y pendientes
└── scripts/
    ├── entorno.ts                Carga .env y process.env
    ├── telegram-config.ts        Funciones puras (sin red, sin leer .env)
    ├── telegram-config_test.ts   Pruebas de las funciones puras
    ├── telegram-api.ts           Cliente HTTP de Telegram
    ├── telegram-identificar.ts   Lista quién interactuó con el bot
    ├── telegram-conectar.ts      Registra el webhook
    └── telegram-estado.ts        Comprueba el webhook registrado
```

## Requisitos

| Herramienta | Versión | Para qué |
| --- | --- | --- |
| [OpenCode](https://opencode.ai/docs/) | Última | Escribir el código y ejecutar las comprobaciones |
| [Node.js](https://nodejs.org/en/download) | 20 o superior | Ejecutar Supabase CLI con `npx` |
| [Deno](https://docs.deno.com/runtime/getting_started/installation/) | 2 o superior | Verificar el TypeScript y ejecutar los scripts |
| Telegram | Cuenta | Hablar con el bot |
| Supabase | Proyecto nuevo | Base de datos y Edge Function |

## Uso

```bash
cp .env.example .env          # o: Copy-Item .env.example .env
# Edita .env tú mismo y reemplaza los REEMPLAZAR
```

```bash
deno task telegram:identificar   # ver quién escribió al bot y obtener ADMIN_USER_ID / ADMIN_CHAT_ID
deno task telegram:conectar      # registrar el webhook
deno task telegram:estado        # verificar la conexión
deno test scripts/telegram-config_test.ts   # pruebas de las funciones puras
```

Los tres scripts leen el token de `.env` y se lo pasan directamente a Telegram en
la petición. **Nunca imprimen el token** y no debes construir URLs con el token en
el navegador.

## Orden de trabajo del taller

1. **Plan** — pega el *Prompt 1* y revisa el plan contra `ESPECIFICACION.md`.
2. **Build** — *Prompt 2*: `deno.json` (`check`, `test`), `supabase/config.toml`,
   migración `202610020001_spa.sql`, RPC, `tests/integration.sql` y
   `evidencia/RESULTADOS.md`.
3. **Build** — *Prompt 3*: función `spa-telegram` completa.
4. **Build** — *Prompt 4*: pruebas con mocks y reloj fijo.
5. **Tú, en el navegador y la terminal** — proyecto de Supabase, SQL en SQL
   Editor, bot con `@BotFather`, secretos, `functions deploy` y `telegram:conectar`.
6. **Prueba del negocio** con dos cuentas y, para el horario ocupado, una tercera.
7. **Build** — *Prompt 5*: revisión final contra la especificación.

## Recordatorios

- No pegues tokens, `.env` ni claves de Supabase en el chat de OpenCode.
- `.gitignore` evita que Git versione `.env`, pero **no** lo excluye de un ZIP:
  revisa el contenido antes de comprimir.
- Precios, horarios y citas son ficticios.
