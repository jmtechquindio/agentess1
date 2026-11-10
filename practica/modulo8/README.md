# Comercial La Esquina · Módulo 8: Del Comprobante al Sistema

Aplicación local con agente inteligente que interpreta comprobantes comerciales y bancarios, los relaciona con ventas registradas en SQLite y permite crear ventas faltantes con revisión humana (*human-in-the-loop*) y trazabilidad de auditoría.

Desarrollada siguiendo los lineamientos pedagógicos y de negocio de la **Fundación Cognitus - Curso de Desarrollo Agéntico para Pymes (Módulo 8)**.

---

## 🛠️ Arquitectura de la Solución

- **Frontend:** Interfaz web local (`HTML5`, `CSS3` con paleta oficial de Cognitus, `JavaScript vanilla`) que ofrece chat interactivo, visor de comprobantes extraídos, resolución visual de ambigüedades, constructor de ventas con cálculo dinámico y tablas de base de datos en tiempo real.
- **Backend:** Servidor `FastAPI` (Python) con arquitectura modular.
- **Extractor Multimodal:** Módulo configurado para `OPENAI_OCR_MODEL=gpt-5.6-luna` con salidas estructuradas (`Structured Outputs` vía Pydantic) y motor de mocks declarados para pruebas deterministas sin consumir cuota.
- **Base de Datos:** `SQLite3` con claves foráneas habilitadas, gestión transaccional atómica (`BEGIN TRANSACTION` / `ROLLBACK`), control de idempotencia y deduplicación por hash criptográfico `SHA-256`.

---

## 📁 Estructura del Repositorio

```text
modulo-8-comprobantes/
├── backend/
│   ├── __init__.py
│   ├── app.py          # API FastAPI y servidor de archivos estáticos
│   ├── agent.py        # Orquestador del ciclo agéntico y estados de negocio
│   ├── database.py     # Esquema SQLite, migraciones y datos semilla (seed)
│   ├── extractor.py    # Extractor con prompt acordado y soporte de Structured Outputs
│   ├── schema.py       # Modelos Pydantic y tipado estricto
│   └── tools.py        # Las 6 herramientas de negocio (extract, register, search, link, draft, commit)
├── frontend/
│   ├── index.html      # Aplicación web local
│   ├── style.css       # Estilos adaptados
│   └── app.js          # Lógica cliente y sincronización reactiva
├── tests/
│   ├── __init__.py
│   └── test_acceptance.py # Suite automatizada de los 9 casos de aceptación
├── evidencia/
│   └── RESULTADOS.md   # Matriz oficial de resultados, pruebas y límites
├── sample_receipts/    # Comprobantes de prueba (148k, crédito, gasto, recortado)
├── run_tests.py        # Ejecutor de pruebas estándar (sin dependencias adicionales)
├── .env.example        # Plantilla de variables de entorno
├── requirements.txt    # Dependencias de Python
└── README.md           # Guía de preparación, ejecución y demostración
```

---

## 🚀 Instalación y Preparación

### 1. Ingresar a la carpeta del proyecto
```bash
cd C:\Users\Carlos\.gemini\antigravity\scratch\modulo-8-comprobantes
```

### 2. Configurar variables de entorno
Copia el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```
*(Nota: Si no configuras una clave de OpenAI, el sistema funciona fluidamente en modo mock declarado, permitiendo probar toda la lógica de negocio sin conexión).*

---

## 🧪 Ejecución de Pruebas Automatizadas

Puedes ejecutar los 9 casos de aceptación inmediatamente con Python (sin dependencias adicionales):
```bash
python run_tests.py
```
O también con `pytest`:
```bash
pytest tests/test_acceptance.py -v
```

Casos evaluados y verificados:
1. `test_case_1_faithful_extraction`: Extracción fiel ($148.000, 2026-09-11, ref 0184283, nulls respetados).
2. `test_case_2_duplicate_file_detection`: Control de hash SHA-256 para evitar duplicar archivos.
3. `test_case_3_ambiguous_sales_search`: Detección de ambigüedad entre ventas `V-041` y `V-043`.
4. `test_case_4_confirmed_association`: Transacción atómica de pago y vínculo.
5. `test_case_5_missing_sale_creation`: Creación de venta faltante calculada por código.
6. `test_case_6_cropped_missing_amount`: Tratamiento de monto ausente (`amount_basis='missing'`).
7. `test_case_7_credit_support_financed_value`: Soporte de crédito Sistecrédito separado de caja.
8. `test_case_8_store_expense_invoice`: Factura de transporte clasificada como gasto operativo.
9. `test_case_9_idempotency_of_action`: Idempotencia ante doble confirmación.

---

## 💻 Inicio de la Aplicación

Para iniciar el servidor local:
```bash
uvicorn backend.app:app --host 127.0.0.1 --port 8000 --reload
```
Abre tu navegador en:
👉 **[http://localhost:8000](http://localhost:8000)**

---

## 🎬 Guía de Demostración (Recorridos Paso a Paso)

### Recorrido 1: Comprobante existente con ambigüedad resuelta
1. En la aplicación web, haz clic en **Seleccionar comprobante** y elige `sample_receipts/comprobante_148k_transferencia.png` (o deja el escenario por defecto).
2. Presiona **Procesar Comprobante**.
3. El agente mostrará la ficha extraída con el monto `$148.000`, fecha `2026-09-11`, referencia `0184283` y campos nulos.
4. El agente informará que existen dos ventas candidatas con igual monto (`V-041` de Camilo R. y `V-043` del vestido de fiesta).
5. Selecciona `V-043` y presiona **Aprobar y Registrar Vínculo**.
6. Observa en la pestaña **Ventas en Sistema** que `V-043` ahora tiene el pago vinculado, y en **Comprobantes** el estado cambia a `matched`.

### Recorrido 2: Creación de venta faltante con cálculo exacto
1. En el selector de escenarios o subiendo un nuevo comprobante, procesa un pago que no exista en el sistema.
2. El agente informará que no hay coincidencias y desplegará el constructor de ventas.
3. Elige productos del catálogo (ej. 2 Blusas seda + 1 Camisa lino).
4. Verifica que el total de `$150.000` se calcula estrictamente por código y no por estimación del modelo.
5. Presiona **Calcular y Presentar Borrador**, revisa la propuesta versionada y pulsa **Aprobar y Confirmar Venta en Base**.
6. Observa la nueva venta creada en la tabla `sales` con sus líneas y el pago persistido.

### Recorrido 3: Prueba de controles y fallas observables
1. **Prueba de duplicado:** Vuelve a procesar el mismo archivo de $148.000. El agente notificará que el archivo ya existe por hash SHA-256 y no sumará un segundo pago.
2. **Prueba de monto recortado:** En el selector de escenarios elige **Monto Ausente / Recortado**. El agente asignará `amount_basis='missing'`, pondrá el registro en `manual_check` y no inventará cifras.
3. **Prueba de persistencia:** Detén el servidor uvicorn con `Ctrl+C`, vuelve a arrancarlo y refresca la página: todos los registros y eventos de auditoría siguen guardados en SQLite.

---

## ⚖️ Definición de Terminado y Límites

El proyecto cumple la **Definición de Terminado** del Módulo 8:
- Se puede reconstruir desde cero siguiendo este README.
- Separa claramente comprobante, pago y venta.
- Separa pruebas simuladas (mocks) de llamadas reales de API.
- Todo cambio se registra con trazabilidad en `audit_events`.
- Consulte `evidencia/RESULTADOS.md` para la matriz detallada de resultados.
