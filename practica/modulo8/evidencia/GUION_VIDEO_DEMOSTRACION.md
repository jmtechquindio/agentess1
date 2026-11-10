# Guion Oficial del Video de Demostración · Módulo 8
**Estudiante:** Carlos  
**Caso de Negocio:** Comercial La Esquina  
**Tema:** Del comprobante al sistema: agente conectado a la operación (SQLite + GPT-5.6 Luna)  
**Video Renderizado:** `evidencia/demostracion_modulo8.mp4`

---

## 🎙️ Guion en Primera Persona (Voz de Carlos)

### Escena 1: Introducción y Contexto (0:00 – 0:10)
> *"Hola a todos y al equipo docente de Cognitus. Mi nombre es Carlos. En este video presento la evidencia final del Módulo 8: 'Del comprobante al sistema' para nuestra tienda Comercial La Esquina.*  
> *Hemos construido una aplicación local con chat, backend en FastAPI, base de datos persistente en SQLite con claves foráneas, y un agente conectado con el modelo multimodal acordado: GPT-5.6 Luna.*  
> *Voy a demostrar los dos recorridos principales exigidos: la asociación de un comprobante resolviendo ambigüedades, la creación asistida de una venta faltante con cálculo exacto por código, y los controles de seguridad ante duplicados y fallas."*

---

### Escena 2: Recorrido 1 · Extracción Fiel y Resolución de Ambigüedad (0:10 – 0:25)
> *"Iniciamos con el primer recorrido. En la aplicación web adjunto el comprobante de transferencia bancaria de Bancolombia por $148.000.*  
> *Observen la ficha que devuelve el extractor: lee fielmente el monto 148000, la fecha 2026-09-11 y la referencia 0184283. Los datos que no están visibles en el papel, como el mensaje o el código de aprobación, quedan estrictamente como `null`. Además, el sistema advierte que la beneficiaria es una persona natural (Lina María Gómez H.) y no asume que es el comercio.*  
> *Al consultar la base de datos, el agente encuentra dos ventas por $148.000: la V-041 de Camilo R. y la V-043 del vestido de fiesta. Como dos coincidencias no autorizan una elección automática, el agente detiene el ciclo y me pide precisión.*  
> *Yo selecciono la V-043 y apruebo la propuesta. En ese instante, la herramienta `link_receipt_to_sale` ejecuta una transacción atómica en SQLite: se crea el registro en `payments`, se vincula en `sale_payments`, el comprobante pasa a estado `matched` y se guarda la auditoría formal."*

---

### Escena 3: Recorrido 2 · Creación de Venta Faltante con Cálculo Determinista (0:25 – 0:38)
> *"Ahora pasamos al segundo recorrido: ¿qué ocurre si el cliente pagó pero la venta no fue cargada en el sistema?*  
> *Adjunto un soporte de compra sin coincidencias previas. El agente consulta nuestro catálogo de productos y me pregunta qué artículos llevó el cliente.*  
> *Indico 1 Blusa de seda a $45.000 y 2 Pantalones de gabardina a $75.000. Noten un principio fundamental de la clase: el total de $195.000 es calculado directamente por CÓDIGO en `create_sale_draft`, nunca estimado o alucinado por el modelo.*  
> *El agente me presenta el borrador formal con número de versión. Al hacer clic en 'Aprobar y Confirmar', la herramienta `commit_sale` inserta la venta V-046, sus ítems en `sale_items`, el pago y el vínculo en una sola transacción con control de rollback."*

---

### Escena 4: Recorrido 3 · Controles de Seguridad, Deduplicación y Fallas (0:38 – 0:50)
> *"Una buena demostración también enseña cómo responde el sistema ante fallas. Probemos los controles:*  
> *1. Control de duplicados: Vuelvo a subir el mismo archivo de $148.000. El backend calcula su huella SHA-256, detecta que ya existe en la tabla `receipts` y me devuelve el registro anterior sin llamar a la API ni duplicar pagos en caja.*  
> *2. Control de monto ausente: Subo un comprobante con la cifra total recortada. El extractor devuelve `amount: null` y `amount_basis: 'missing'`. La aplicación no inventa compras netas ni fletes: clasifica el registro en `manual_check` y emite una advertencia clara en pantalla.*  
> *3. Casos especiales: Si es una financiación de Sistecrédito por $300.000, se guarda como `financed_value` y no entra a caja como efectivo. Si es una factura de flete de $55.000, se clasifica como `expense_invoice` de salida y no genera una venta de la tienda."*

---

### Escena 5: Cierre y Persistencia Total en SQLite (0:50 – 1:00)
> *"Para finalizar, verificamos la definición de terminado:*  
> *Si reiniciamos el servidor o cerramos el navegador, todos los registros persisten en SQLite. La tabla `sales` conserva sus pagos, `receipts` sus estados, y `audit_events` explica exactamente quién aprobó cada cambio y qué herramienta operó.*  
> *Contamos además con una suite de 16 pruebas automatizadas aprobadas al 100%.*  
> *Como nos enseña el curso: la imagen aporta evidencia, el modelo propone una lectura, las herramientas validan y registran, y la persona revisa las decisiones que cambian la operación.*  
> *Muchas gracias."*
