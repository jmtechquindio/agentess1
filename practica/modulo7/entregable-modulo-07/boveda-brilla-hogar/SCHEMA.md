# Esquema de la Bóveda (SCHEMA) · Brilla Hogar

Este documento define la estructura, taxonomía y convenciones de registro para la memoria operativa y base de conocimiento de **Brilla Hogar** gestionada a través de Obsidian y Hermes (LLM Wiki).

---

## 1. Tipos de Notas

### 1.1 Casos de Decisión y Servicio (`#caso`)
- **Prefijo:** `caso-`
- **Identificador:** Código de caso de Brilla Hogar (ej. `caso-BH-S103-cancelacion-rosa-medina.md`).
- **Propósito:** Documentar la revisión de una decisión operativa frente a las políticas oficiales del negocio.
- **Campos obligatorios:**
  - `case_id`: Identificador del caso.
  - `conversation_id`: Identificador de la conversación origen.
  - `date`: Fecha del evento (YYYY-MM-DD).
  - `client`: Enlace al cliente (`cliente-*`).
  - `category`: Categoría (`cancelacion`, `queja`, `descuento`, `cotizacion`, `reembolso`).
  - `outcome`: Resultado (`error_operativo`, `excepcion_autorizada`, `conforme_a_regla`, `pendiente`).
  - `applicable_rule`: Enlace a la política aplicable (`regla-*`).
  - `financial_discrepancy`: Monto o porcentaje de discrepancia si aplica.

### 1.2 Clientes (`#cliente`)
- **Prefijo:** `cliente-`
- **Propósito:** Registrar condiciones especiales, preferencias operativas, historial de servicios y restricciones.
- **Campos obligatorios:**
  - `client_id`: Identificador o código de cliente.
  - `client_name`: Nombre completo o razón social.
  - `has_custom_agreement`: Booleano (`true` / `false`).
  - `custom_agreement_ref`: Enlace al documento de acuerdo si aplica.
  - `preferences`: Lista de preferencias comunicacionales u operativas.

### 1.3 Reglas y Políticas Oficiales (`#regla`)
- **Prefijo:** `regla-`
- **Propósito:** Registrar directrices aprobadas de la empresa (tarifas, cancelaciones, permisos, calidad).
- **Campos obligatorios:**
  - `source_id`: Código del documento original de Brilla Hogar.
  - `title`: Título de la política.
  - `effective_date`: Fecha de entrada en vigencia.
  - `owner`: Persona responsable y cargo.
  - `status`: `vigente`, `sustituido`, `aprobado-con-vigencia-futura`.

---

## 2. Convenciones de Enlace y Nomenclatura
- Enlaces internos en formato WikiLink (por ejemplo a notas como `[[index]]`, `[[log]]`, etc.).
- Distinción estricta entre **Regla General** y **Excepción Puntual**: una excepción autorizada nunca modifica la regla general sin un documento oficial de actualización.
- Citas textuales: se citan mensajes con autor, rol, fecha y mensaje exacto (`BH-C0XX-M0XX`).
- Separación de hechos confirmados vs. aspectos pendientes de validación.

---

## 3. Bitácora de Modificaciones
Todas las operaciones de adición, corrección o actualización deben registrarse cronológicamente en [[log]].
