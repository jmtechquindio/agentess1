# Guion del video - Agente "Diario-Hermes"

Duracion objetivo: 5-8 minutos.

## Preparacion antes de grabar

1. Gateway activo:  `hermes gateway status`  (debe decir "process running")
2. Ollama o Gemini disponibles (modelo configurado).
3. Telegram abierto en una ventana junto a la terminal.
4. Ejecutar ambos jobs justo antes para tener mensajes frescos:
   - `hermes cron run 1b2504355aca`  (noticias)  -> esperar "Ran now: succeeded"
   - `hermes cron run fc212bedee93`  (correo)    -> esperar "Ran now: succeeded"

## 1. Presentacion (0:00 - 1:00)

- "Hola, este es mi agente **Diario-Hermes** hecho con Hermes Agent."
- Que hace: brief de noticias diario + resumen de correos importantes, ambos por Telegram.
- Temas de noticias elegidos: IA, tecnologia, productividad.

## 2. Conexion Telegram (1:00 - 1:30)

- `hermes cron list`  -> mostrar los 2 jobs, su horario y destino Telegram.
- Mostrar en Telegram que el bot responde / ya envio mensajes.

## 3. Brief REAL de noticias (1:30 - 3:00)

- Abrir el mensaje de Telegram del brief.
- Señalar: titulo, fecha, fuente (WIRED, WEF, etc.) y enlace real.
- (Opcional) Abrir un enlace para comprobar que es real.

## 4. Resumen REAL de correos (3:00 - 4:30)

- Abrir el mensaje de Telegram del resumen de correos.
- Mostrar asunto, remitente, fecha y la linea de relevancia.
- Enfatizar: **solo lectura**. El agente NO envia, NO borra, NO mueve, NO marca spam.
- Mostrar en `scripts/fetch-mail.py`: `readonly=True` y `BODY.PEEK`.

## 5. Automatizacion (4:30 - 5:30)

- `hermes cron list`  -> resaltar "Next run" 08:00 y 08:30 con zona horaria -05:00.
- Explicar: scheduler cron activo, gateway corriendo, zona horaria UTC-05:00.
- (Opcional) Herramienta panel: http://127.0.0.1:9119

## 6. Cierre (5:30 - 6:00)

- Recapitular: noticias + correo, Telegram, automatico, solo lectura.
- Mencionar el modelo de IA gratuito (Gemini 3.7 Flash) y la alternativa local (llama3.2:3b).

## Puntos obligatorios del checklist

- [x] Presentacion del agente
- [x] Explicar que hace, temas, Telegram
- [x] Brief REAL de noticias con fuentes/enlaces
- [x] Resumen REAL de correos
- [x] Restriccion solo lectura
- [x] Horarios, zona horaria, proximas ejecuciones
