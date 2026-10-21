# PLAN - Módulo 06: Agente diario con Hermes

## Objetivo
Crear un agente útil con Hermes que envíe noticias personalizadas por Telegram y resuma correos importantes (solo lectura), con automatización por horarios, zona horaria y sin avisos duplicados.

## Alcance obligatorio
- [ ] Noticias personalizadas: temas elegidos, breve con fechas, fuentes, enlaces y relevancia
- [ ] Correo conectado (Gmail vía Himalaya): leer, preparar borradores, usar etiquetas reversibles
- [ ] PROHIBIDO: enviar, borrar, mover a papelera
- [ ] Automatización: horarios, zona horaria, evitar duplicados, próximas ejecuciones
- [ ] Video demostrativo subido al repositorio mostrando todo lo anterior

## Ampliación opcional
- [ ] Explorar bots/integraciones de Hermes
- [ ] Añadir otra tarea útil para tu día a día
- [ ] Demostrarlo en el vídeo si se añade

## Ruta de trabajo
1. Investigar Hermes (sitio, docs, panel 127.0.0.1:9119, Tools/Keys/Scheduler)
2. Revisar los 3 vídeos complementarios y extraer ideas
3. Investigar Himalaya (instalación + config Gmail solo lectura)
4. Conectar Telegram (BotFather + token + chat_id)
5. Diseñar prompt con restricciones estrictas
6. Crear/Configurar agente en Hermes
7. Programar tareas (mañana + revisión correo)
8. Probar lectura primero, automatización después
9. Preparar checklist + grabar vídeo + subir al repo

## Notas
- Credenciales SIEMPRE fuera del chat (panel Hermes / almacén credenciales)
- Usar datos de práctica en el vídeo
- No mostrar contraseñas, tokens, emails privados
