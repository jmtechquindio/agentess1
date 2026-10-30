# Esquema de la Base de Conocimiento y Memoria · Brilla Hogar

Esta bóveda implementa el modelo **LLM Wiki** para conservar el conocimiento operativo, las reglas de negocio, los acuerdos particulares y los casos revisados de la empresa Brilla Hogar.

## Estructura de Directorios
- `cases/`: Notas detalladas de casos analizados (decisión, regla, evaluación y justificación).
- `entities/`: Clientes corporativos, miembros del equipo y proveedores.
- `concepts/`: Políticas generales del negocio, tarifas y acuerdos marco.
- `raw/`: Transcripciones íntegras de conversaciones y documentos normativos originales.
- `index.md`: Mapa general de navegación y relaciones clave.
- `log.md`: Bitácora cronológica de modificaciones, ingestas y actualizaciones.

## Reglas de Mantenimiento
1. **Conservación de fuentes:** Toda afirmación debe enlazar a su fuente en `raw/` conservando fecha y autor.
2. **Distinción regla vs. excepción:** Un acuerdo particular nunca modifica la regla general de forma automática.
3. **Historial de cambios:** Al actualizar tarifas o normas, se conserva la vigencia anterior y la fecha de inicio del nuevo valor.
