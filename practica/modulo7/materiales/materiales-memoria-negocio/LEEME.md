# Materiales · ¿El equipo actuó correctamente?

Brilla Hogar es una empresa ficticia de limpieza en Bogotá. Las conversaciones
contienen decisiones del equipo: algunas tienen errores y otras son excepciones
autorizadas. Encuentra UN caso y explica si la decisión fue correcta.
No te indicamos en qué conversación buscar; no debes presentar varios casos.

## Tres pasos
1. Usa Hermes y RAG con Pinecone para encontrar y explicar un caso:
   ¿qué pasó?, ¿qué regla aplicaba?, ¿hubo un error o una excepción autorizada?,
   ¿qué mensajes y documentos respaldan la respuesta?
2. Guarda lo aprendido con LLM Wiki en una bóveda de Obsidian. Enlaza el caso,
   el cliente, la regla y las fuentes. Una excepción no cambia la regla general.
3. Inicia otra sesión con /new y comprueba que Hermes consulta las notas y
   explica cómo actuar ante un caso parecido, sin adjuntar los archivos otra vez.

Al terminar, incorpora el documento 09 y comprueba brevemente la actualización.
Si falta información para decidir, explica qué necesitas confirmar.
Una excepción bien explicada también resuelve el ejercicio.

## Archivos
- fuentes/: ocho documentos iniciales, también reunidos en documentos-brilla-hogar.txt.
- conversaciones/: 24 conversaciones y 192 mensajes; TXT y JSON equivalentes.
- actualizacion/: documento 09, para la comprobación final.
- prompt-inicial.txt: cinco prompts sencillos para adaptar.
- plantillas/README-ENTREGA.md: única plantilla para la explicación y comprobaciones.
- manifest-fuentes.json: huellas para verificar los originales.

## Cómo empezar
Carga los documentos y el TXT de conversaciones en el índice brilla-hogar de Pinecone
con Hermes. Usa TXT o Markdown para los documentos, y TXT o JSON para los chats;
no cargues dos veces el mismo contenido. El documento 09 espera hasta el final.
Si ya comenzaste, puedes reutilizar los datos y las notas: las conversaciones y
reglas de la edición anterior no cambian. Usa la nueva plantilla de README.

## Entrega
Sube al repositorio la bóveda, un README breve y un video de 3–5 minutos.
En el README responde las cuatro preguntas y registra brevemente la sesión nueva
y la actualización. No necesitas informes adicionales.

Todo es ficticio, en español colombiano, COP y hora de Bogotá.
Mismas herramientas: Hermes, Pinecone y Obsidian con LLM Wiki. Dedicación: 6–8 horas.
Guía: https://cursoia.cognitus.org/entregables/modulo-7/index.html
