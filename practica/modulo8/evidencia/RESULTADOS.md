# Evidencia de Resultados · Módulo 8 (Comercial La Esquina)

**Proyecto:** Del comprobante al sistema: agente conectado a la operación (SQLite + Extractor Multimodal).  
**Fecha de evaluación:** Noviembre de 2026.  
**Modelo acordado para extracción:** `gpt-5.6-luna`.  
**Entorno de ejecución:** Local (`localhost:8000`), Python 3.10+, SQLite 3, FastAPI.

---

## 1. Resumen de Ejecución y Estado del Sistema

La solución implementa la arquitectura completa definida en el Módulo 8:
- **Frontend local:** Interfaz web interactiva con chat conversacional, cargador de comprobantes, visor de fichas de extracción con advertencias, resolución de ambigüedad con selección explícita de candidatos, constructor de venta faltante con catálogo y tablas sincronizadas en tiempo real (`sales`, `receipts`, `audit_events`).
- **Backend / Agente:** Coordinación de herramientas (*tool calling*), manejo de estado conversacional y cálculo determinista de importes.
- **Extractor Multimodal:** Implementado con el prompt del sistema oficial de 8 reglas, salida estructurada (*Structured Outputs* Pydantic) y fallback de mocks declarados.
- **Persistencia y Control:** SQLite con claves foráneas, deduplicación por hash SHA-256, control de idempotencia y transacciones atómicas con rollback.

**Resultado total de la suite de pruebas:** **16 pruebas ejecutadas, 16 aprobadas (100% de éxito).**

---

## 2. Matriz de Casos de Aceptación Oficiales (9/9 Casos Verificados)

| # | Caso de Aceptación | Tipo de Prueba | Estado | Evidencia y Comportamiento Observado |
|---|--------------------|----------------|:------:|---------------------------------------|
| **1** | **Extracción fiel** | Automatizada (Mock) + Manual | **APROBADA** | Lee monto numérico `148000.0`, fecha `2026-09-11`, referencia `0184283`. Campos no visibles (`sender`, `aprobación`, `mensaje`) se conservan estrictamente como `null`. Se conserva la advertencia sobre la beneficiaria persona natural `Lina María Gómez H.` sin asumir que es la tienda. |
| **2** | **Archivo duplicado (SHA-256)** | Automatizada + Backend | **APROBADA** | El cálculo SHA-256 reconoce el mismo archivo al subirlo por segunda vez. Devuelve el registro previo (`receipt_id`) sin reenviar a la API ni duplicar pagos. El conteo en la tabla `receipts` permanece en 1. |
| **3** | **Búsqueda ambigua** | Automatizada + Flujo UI | **APROBADA** | Ante el monto de $148.000, la herramienta `search_sales` encuentra dos ventas abiertas (`V-041` y `V-043`). El agente detiene el ciclo y no asocia automáticamente; solicita confirmación de la persona mostrando el detalle comercial de ambas. |
| **4** | **Asociación confirmada** | Automatizada + Transacción | **APROBADA** | Al confirmar la persona la venta `V-043`, se ejecuta `link_receipt_to_sale` dentro de una transacción SQLite: se registra en `payments`, se enlaza en `sale_payments`, el comprobante pasa a estado `matched` y se crea el evento en `audit_events`. Vínculo permanente tras reiniciar. |
| **5** | **Venta faltante** | Automatizada + Flujo UI | **APROBADA** | Con un comprobante sin venta compatible, el agente solicita productos y cantidades. Los subtotales y el total se calculan mediante código en `create_sale_draft` (ej. 2 Blusas seda + 1 Camisa lino = $150.000). Tras aprobación, `commit_sale` guarda la venta `V-046`, sus `sale_items`, el pago y la asociación de forma atómica. |
| **6** | **Monto ausente / recortado** | Automatizada + Flujo UI | **APROBADA** | Soporte recortado sin cifra total. El extractor devuelve `amount: null` y `amount_basis: "missing"`. La app coloca el comprobante en estado `manual_check`, no inventa cifras y emite advertencia explícita solicitando un soporte legible. |
| **7** | **Soporte de crédito (Sistecrédito)** | Automatizada + Flujo UI | **APROBADA** | Soporte de crédito clasificado como `sistecredito_credit` con `amount_basis: "financed_value"` por $300.000. No se suma a la caja como efectivo recibido ni crea una venta automática de mostrador; se conserva su naturaleza de financiación. |
| **8** | **Gasto de la tienda (Transporte)** | Automatizada + Flujo UI | **APROBADA** | Factura de flete clasificada como `expense_invoice` de $55.000. Se conserva el proveedor `Transportes Rápidos S.A.S.` y el número `FAC-TR-8812` para revisión de salida. No genera venta comercial de la tienda ni ingresos acreditados. |
| **9** | **Idempotencia de acción** | Automatizada + Transacción | **APROBADA** | Doble clic o reintento de la confirmación `link_receipt_to_sale`. La segunda llamada detecta que la operación ya fue realizada (`is_idempotent_hit: True`), manteniendo exactamente un registro de pago y evitando cobros duplicados. |

---

## 3. Pruebas de Integración de API (7/7 Casos Verificados)

| # | Endpoint / Flujo | Comportamiento Verificado | Estado |
|---|------------------|---------------------------|:------:|
| **10** | `GET /api/health` | Estado del servicio y metadatos de módulo | **APROBADA** |
| **11** | `GET /api/catalog` | Recuperación del catálogo de productos con precios | **APROBADA** |
| **12** | `GET /api/sales` | Consulta de ventas iniciales con sus líneas y pagos | **APROBADA** |
| **13** | `POST /api/upload` + `/api/select-candidate` | Flujo de subida, detección de ambigüedad y selección humana | **APROBADA** |
| **14** | `POST /api/create-draft` + `/api/confirm-proposal` | Flujo de creación de venta faltante con cálculo exacto por código | **APROBADA** |
| **15** | `GET /api/audit-events` | Registro de trazabilidad y eventos de auditoría | **APROBADA** |
| **16** | `POST /api/reset-db` | Reinicio y siembra limpia de la base de datos de Comercial La Esquina | **APROBADA** |

---

## 4. Separación de Entornos de Prueba: Mocks vs Llamadas Reales vs Manuales

1. **Pruebas Automatizadas con Mocks Declarados (`tests/test_acceptance.py`):**
   - Ejecutan y validan las 9 reglas de negocio sin requerir consumo de cuota ni conexión a internet.
   - Todo mock está identificado en los metadatos (`source: mock_extractor`, `is_real_api: false`) para no engañar al usuario haciéndolo pasar por una extracción real del modelo.
2. **Llamadas Reales al Modelo (`OPENAI_OCR_MODEL=gpt-5.6-luna`):**
   - Habilitadas cuando se configura `OPENAI_API_KEY` en el archivo `.env`.
   - Utilizan la API de OpenAI con `beta.chat.completions.parse` garantizando Structured Outputs contra la clase `ExtractedReceiptSchema`.
   - **Estado declarado:** *Habilitado y probado con mock funcional; la ejecución en vivo depende de la provisión de una API key con acceso al modelo `gpt-5.6-luna`.*
3. **Pruebas Manuales de Interfaz:**
   - Realizadas en navegador interactuando con el chat, los selectores de escenarios y la verificación directa de tablas en SQLite.

---

## 5. Instrucciones para Reconstruir la Demostración

1. **Instalar dependencias:**
   ```bash
   pip install -r requirements.txt
   ```
2. **Configurar entorno:**
   ```bash
   cp .env.example .env
   ```
3. **Ejecutar todas las pruebas (16 pruebas):**
   ```bash
   python run_tests.py
   ```
4. **Iniciar la aplicación:**
   ```bash
   uvicorn backend.app:app --host 127.0.0.1 --port 8000 --reload
   ```
5. **Abrir en navegador:**
   - Navegar a `http://localhost:8000`.
   - **Recorrido 1 (Asociación existente):** Adjuntar `sample_receipts/comprobante_148k_transferencia.png`. El agente detecta ambigüedad (`V-041` vs `V-043`), seleccionar `V-043`, aprobar y observar la asociación en la tabla `sales` y `receipts`.
   - **Recorrido 2 (Venta faltante):** Adjuntar un comprobante sin coincidencia o seleccionar crear venta, escoger productos del catálogo y verificar que el total se calcula por código y se guarda en `sales`.
   - **Recorrido 3 (Prueba de control y falla):** Reintentar subir el mismo comprobante (duplicado reconocido por hash) o subir `sample_receipts/comprobante_recortado_sin_monto.png` para observar la detención controlada por monto ausente.
   - Reiniciar el servidor y comprobar que todos los registros persisten en SQLite.

---

## 6. Límites que Conserva la Aplicación

- **No verifica fondos bancarios reales:** La aplicación interpreta la información visual aportada por el comprobante, pero no sustituye la conciliación bancaria ni se conecta a pasarelas bancarias en tiempo real.
- **No deduce productos no indicados:** La aplicación no inventa los productos de una venta a partir de un comprobante de transferencia; requiere que el personal de la tienda los confirme a partir del catálogo.
- **Soportes borrosos o mutilados:** Si un dato crítico (como el monto) no es visible, la app asigna `null` y `amount_basis='missing'`, deteniendo el flujo para revisión manual.
- **Privacidad:** En entornos de producción reales se requiere ofuscar números de cuenta y nombres completos antes de transmitirlos a APIs de terceros.
