# ESTADO ACTUAL (20/10/2026)

## Hecho
- [x] Hermes v0.22.2 instalado y actualizado (stable)
- [x] Gateway corriendo + scheduler cron activo
- [x] Panel http://127.0.0.1:9119 responde (hermes dashboard)
- [x] Telegram configurado (TELEGRAM_BOT_TOKEN + HOME_CHANNEL configurado)
- [x] Correo: IMAP nativo de Hermes (solo lectura). Cuenta de practica conectada.
- [x] Zona horaria detectada: UTC-5 (Bogota/Lima/Quito)
- [x] Job 1: brief-noticias-diario (8am) -> telegram. id 1b2504355aca. OK
- [x] Job 2: resumen-correo (8:30am) -> telegram. id fc212bedee93. OK
- [x] Modelo IA: Gemini 3.7 Flash (gratuito). Alternativa local: llama3.2:3b (Ollama)
- [x] README del entregable + Guion del video creados

## Arquitectura (patron hibrido)
- El script obtiene datos reales EXACTOS (titulos, fechas, fuentes, enlaces) y los
  imprime en ASCII para el agente.
- El modelo (Gemini) redacta SOLO las lineas de valor ("Por que te interesa" /
  "Relevancia"). Nunca toca URLs ni fechas -> evita corrupcion y alucinaciones.

## Pendiente
- [ ] Grabar video y subirlo a entregable-modulo-06/video-demostracion.mp4
- [ ] Inicializar git y subir el repo (no existe .git todavia)
- [ ] (Opcional) Habilitar Himalaya como alternativa al email nativo

## Restriccion de correo (CRITICO)
El agente NUNCA envia, borra, mueve a papelera, marca spam ni modifica flags.
Solo IMAP readonly + BODY.PEEK.

## Comandos utiles
hermes status --full
hermes cron create "daily at 7am" "<prompt>" --deliver telegram:<chat_id> --name X --script fetch-news.py
hermes cron list
hermes cron run <id>
hermes send telegram "hola"
hermes gateway status
