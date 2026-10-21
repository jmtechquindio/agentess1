# Practica Modulo 6 - Agente "Diario-Hermes" (Hermes Agent)

Evidencia de la actividad del Modulo 6: agente personal que envia un brief de
noticias y un resumen de correos importantes por Telegram, de forma automatizada.

## Que hace

1. **Brief de noticias (8:00 AM)**: obtiene noticias reales via RSS de Google News
   (IA, tecnologia, productividad) y las envia a Telegram con titulo, fecha,
   fuente y enlace.
2. **Resumen de correos (8:30 AM)**: lee los correos no leidos de Gmail en
   **SOLO LECTURA** (IMAP) y resume los importantes a Telegram.

## Modelo de IA gratuito

**Gemini 3.7 Flash** (Google AI Studio). El script obtiene los datos reales y
exactos; el modelo redacta solo las lineas de valor ("Por que te interesa" /
"Relevancia"). Alternativa 100% local: **Ollama + llama3.2:3b**.

## Restriccion de correo (IMPORTANTE)

El agente **NUNCA** envia, borra, mueve a papelera, marca spam ni modifica flags.
Solo usa IMAP en modo lectura (`select readonly=True`, `BODY.PEEK`).
Ver `scripts/fetch-mail.py`.

## Contenido

```
practica/modulo-6/
  .env.example          Plantilla de variables de entorno (sin secretos)
  config.yaml           Config de Hermes (modelo, plataforma)
  configurar-hermes.bat Script de configuracion en Windows
  resumen-diario.html   Plantilla de resumen
  docs/                 PLAN, CHECKLIST y GUION del video
  prompts/              Prompts del agente y de los jobs
  notas/                Estado actual del proyecto
  scripts/              fetch-news.py, fetch-mail.py y wrappers de entrega
```

## Automatizacion

- Job noticias: `daily at 8am`  -> Telegram
- Job correo:   `daily at 8:30am` -> Telegram
- Zona horaria: UTC-05:00

## Video demostracion

`docs/GUION-VIDEO.md` contiene el guion. El video se entrega como
`video-demostracion.mp4` en la carpeta del entregable.

## Seguridad

Las credenciales NO se incluyen en este repositorio. El archivo `.env.example`
usa marcadores de posicion (placeholders). Configura tus propios valores en
`~/.hermes/.env`.
