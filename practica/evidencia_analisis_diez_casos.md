# Evidencia — Análisis de los diez casos (Actividad: Elegir la ruta mínima con OpenCode)

- **Fecha de la sesión:** 2026-09-08
- **Carpeta de trabajo:** /mnt/c/practica
- **Datos:** actividad_ruta_minima_operacion_comercial_operacion_comercial_app.xlsx (solo lectura) y productos_ferreteria.txt
- **Modelo utilizado:** OpenCode (modelo por defecto)
- **Herramienta:** OpenCode en modo Plan — no se construyó ni modificó nada; el Excel no fue editado.

---

## Caso P1 — Convertir tabla de 10 productos en mensaje WhatsApp

### Comprensión
- Necesidad: convertir la tabla ya dada (código, nombre, categoría, precio) en un mensaje breve para WhatsApp.
- Contexto: sin búsquedas externas ni acciones sobre sistemas.

### Hechos disponibles
- Tabla de 10 martillos en `productos_ferreteria.txt` (FER-0001…FER-0010), categoría Ferretería, precios en COP.

### Datos faltantes o supuestos
- Formato/tono exacto del mensaje y límite de caracteres; supongo mensaje breve por línea.

### Comparación de rutas
| Ruta | Encaja / no encaja |
|---|---|
| Respuesta directa | Encaja: transforma información ya suministrada |
| Regla | No: no hay condición de acción |
| Flujo | No: no hay pasos ni validaciones |
| Agente limitado | No: no hay herramientas que elegir |
| No automatizar | No: sin riesgo |

### Ruta propuesta
**Respuesta directa**
Justificación: solo transforma datos ya dados.

### Revisión crítica
- ¿Bastaría una más simple?: sí, es la mínima.
- Alternativa: hacerlo a mano.
- Riesgo principal: errores de transcripción.
- Control: revisión humana del texto antes de enviar.

### Condición para cambiar de ruta
Que el mensaje requiera consultar otro origen (catálogo, stock) → Agente limitado.

### Mensaje propuesto (producto de la Respuesta directa)
```
MARTILLOS DE UÑA — FERRETERÍA
FER-0001 Forte Mini $121.300
FER-0002 Andino Pequeño $164.500
FER-0003 Maestro Mediano $22.800
FER-0004 Roble Grande $18.200
FER-0005 Titan Familiar $107.100
FER-0006 Forte Económico $141.300
FER-0007 Andino Clásico $114.900
FER-0008 Maestro Premium $210.300
FER-0009 Roble Reforzado $142.900
FER-0010 Titan Especial $31.500
```

### Decisión del estudiante
- [x] Acepto — Motivo: La tarea es únicamente transformar la información ya disponible en un mensaje. No requiere razonamiento adicional ni consultas externas.

---

## Caso P2 — «Busco un martillo fuerte pero pequeño»

### Comprensión
- Necesidad: interpretar descripción libre, buscar en catálogo y pedir precisión ante varias coincidencias.
- Contexto: catálogo de martillos FER-0001…FER-0010; producto fuerte pero pequeño.

### Hechos disponibles
- Descripción del cliente; catálogo; instrucción de pedir precisión.
- Candidatos plausibles por tamaño: Forte Mini, Andino Pequeño, Titan Especial.

### Datos faltantes o supuestos
- Qué significa "fuerte" en el criterio del cliente (precio, material, garantía); coincidencias exactas.

### Comparación de rutas
| Ruta | Encaja / no encaja |
|---|---|
| Respuesta directa | No: exige buscar |
| Regla | No: entrada en texto libre |
| Flujo | Parcial: solo si las consultas fueran deterministas |
| Agente limitado | Encaja: interpreta, elige y adapta |
| No automatizar | No: riesgo bajo |

### Ruta propuesta
**Agente limitado**
Justificación: interpretación de lenguaje libre + elección entre opciones con paso adaptativo (pedir precisión).

### Revisión crítica
- ¿Bastaría una más simple?: si se normalizaran consultas a plantillas, bastaría Flujo.
- Alternativa: búsqueda por palabras clave + reglas.
- Riesgo principal: recomendar producto equivocado.
- Control: mostrar opciones y confirmar con el cliente.

### Condición para cambiar de ruta
Catálogo estático con consultas deterministas → Regla/Flujo.

### Decisión del estudiante
- [x] Acepto — Motivo: El agente limitado es adecuado porque debe interpretar una descripción libre, buscar coincidencias y pedir aclaración cuando exista ambigüedad.

---

## Caso I1 — Marcar «Reponer existencias»

### Comprensión
- Necesidad: marcar reposición si Stock < Stock mínimo; si no, no tocar el registro.
- Contexto: hoja Inventario con columnas Stock (G) y Stock mínimo (H).

### Hechos disponibles
- Condición explícita: Stock < Stock mínimo; misma entrada → misma acción.

### Datos faltantes o supuestos
- Calidad del dato de Stock; no falta nada para clasificar.

### Comparación de rutas
| Ruta | Encaja / no encaja |
|---|---|
| Respuesta directa | No: actualiza un registro |
| Regla | Encaja: condición estable |
| Flujo | No: sin pasos ni aprobación |
| Agente limitado | No: sin interpretación |
| No automatizar | No: riesgo bajo |

### Ruta propuesta
**Regla**
Justificación: condición determinista sobre columnas existentes del Inventario.

### Revisión crítica
- ¿Bastaría una más simple?: la Regla ya es mínima.
- Riesgo principal: stock errado → reposición mal marcada.
- Control: informe de excepciones; revisión del lote marcado.

### Condición para cambiar de ruta
Stock mínimo con criterio humano o varias fuentes → Flujo.

### Decisión del estudiante
- [x] Acepto — Motivo: Es una condición objetiva y determinista: comparar Stock con Stock mínimo produce siempre el mismo resultado con los mismos datos.

---

## Caso I2 — Reposición en pasos con aprobación

### Comprensión
- Necesidad: validar producto/proveedor, calcular diferencia, vista previa, aprobación y crear solicitud pendiente (sin compra).
- Contexto: reposición sobre Inventario y Proveedores.

### Hechos disponibles
- Pasos conocidos, validación, aprobación humana, cambio de estado a "pendiente".

### Datos faltantes o supuestos
- Criterio exacto de validación producto/proveedor.

### Comparación de rutas
| Ruta | Encaja / no encaja |
|---|---|
| Respuesta directa | No: crea solicitud |
| Regla | No: no es una sola condición |
| Flujo | Encaja: pasos, validaciones, excepciones, aprobación |
| Agente limitado | No: herramientas prefijadas |
| No automatizar | No: hay controles |

### Ruta propuesta
**Flujo**
Justificación: secuencia definida con validaciones y aprobación humana previa al cambio de estado.

### Revisión crítica
- ¿Bastaría una más simple?: no, la aprobación en medio obliga a pasos.
- Riesgo principal: solicitud inválida aprobada.
- Control: revisión del aprobador y auditoría de solicitudes pendientes.

### Condición para cambiar de ruta
Elegir proveedor por ofertas externas → Agente limitado.

### Decisión del estudiante
- [x] Acepto — Motivo: Los pasos están definidos y requieren una aprobación humana antes de crear la solicitud, por lo que un flujo controlado es apropiado.

---

## Caso V1 — Resumir informe único de ventas

### Comprensión
- Necesidad: resumir un informe de Ventas (total, métodos, venta mayor).
- Contexto: un único informe; sin consulta adicional.

### Hechos disponibles
- Hoja Ventas con Total, Método de pago; informe único.

### Datos faltantes o supuestos
- Formato exacto del informe.

### Comparación de rutas
| Ruta | Encaja / no encaja |
|---|---|
| Respuesta directa | Encaja: resume información dada |
| Regla | No: sin condición |
| Flujo | No: excesivo |
| Agente limitado | No: sin herramientas |
| No automatizar | No: sin riesgo |

### Ruta propuesta
**Respuesta directa**
Justificación: transforma un informe ya dado.

### Revisión crítica
- ¿Bastaría otra?: ya es mínima.
- Riesgo principal: lectura incorrecta de cifras.
- Control: verificación humana contra el informe.

### Condición para cambiar de ruta
Consolidar varios informes o fuentes → otra ruta.

### Decisión del estudiante
- [x] Acepto — Motivo: Si existe un único informe de Ventas y los datos están claramente disponibles, resumirlo no requiere un agente ni consultas adicionales.

---

## Caso V2 — Contrastar ventas con el libro diario

### Comprensión
- Necesidad: validar referencia, valor y método entre Ventas y Libro diario; registrar coincidencias o enviar diferencias a revisión.
- Contexto: Libro diario concilia con Ventas mediante la celda "Diferencia" (Q3−Q2).

### Hechos disponibles
- Campos a validar (referencia, valor, método); hoja Libro diario con Diferencia; rama de revisión.

### Datos faltantes o supuestos
- Tratamiento de coincidencias parciales (ej. valor ok, método distinto).

### Comparación de rutas
| Ruta | Encaja / no encaja |
|---|---|
| Respuesta directa | No: registra y gestiona excepciones |
| Regla | Parcial: la comparación es regla, pero la revisión la supera |
| Flujo | Encaja: pasos, validaciones, excepciones y revisión |
| Agente limitado | Posible si las fuentes varían |
| No automatizar | No: riesgo controlable |

### Ruta propuesta
**Flujo**
Justificación: validar, clasificar coincidencias/diferencias y derivar a revisión humana.

### Revisión crítica
- ¿Bastaría una más simple?: no, la rama de revisión exige Flujo.
- Riesgo principal: diferencia mal clasificada oculta error real.
- Control: revisión humana de la cola de diferencias.

### Condición para cambiar de ruta
Referencias ambiguas que exijan interpretar → Agente limitado.

### Decisión del estudiante
- [x] Acepto — Motivo: Comparar datos entre Ventas y Libro diario requiere una secuencia de validaciones definida; las diferencias pueden enviarse a revisión.

---

## Caso R1 — Excluir proveedores no «Activos»

### Comprensión
- Necesidad: excluir de la propuesta de compra proveedores con Estado ≠ "Activo", igual en todas las categorías.
- Contexto: hoja Proveedores, columna Estado (N); el dato "En revisión" existe en los datos.

### Hechos disponibles
- Condición explícita (Estado = "Activo") y transversal a todas las categorías.
- Ejemplo en datos: PRV-001 está "En revisión" → quedaría excluido.

### Datos faltantes o supuestos
- Actualización del dato Estado.

### Comparación de rutas
| Ruta | Encaja / no encaja |
|---|---|
| Respuesta directa | No: genera propuesta |
| Regla | Encaja: condición única y estable |
| Flujo | No: sin pasos adicionales |
| Agente limitado | No: sin interpretación |
| No automatizar | Solo si el Estado fuera poco fiable |

### Ruta propuesta
**Regla**
Justificación: misma condición, mismo resultado, aplica a todas las categorías.

### Revisión crítica
- ¿Bastaría otra?: no.
- Riesgo principal: Estado desactualizado → proveedor incorrecto en propuesta.
- Control: revisión de excepciones de la propuesta.

### Condición para cambiar de ruta
Interpretación contextual del Estado → Flujo/Regla revisada.

### Decisión del estudiante
- [x] Acepto — Motivo: La condición Estado ≠ Activo es explícita y determinista, por lo que una regla es suficiente.

---

## Caso R2 — Recomendar proveedor de ferretería

### Comprensión
- Necesidad: recomendar a quién reponer ferretería este mes, comparando proveedores Activos por condiciones de pago, ciudad y medio preferido; explicar sin crear pedidos.
- Contexto: hoja Proveedores con L (condiciones de pago), J (ciudad), M (medio preferido), N (Estado).

### Hechos disponibles
- Criterios: condiciones de pago, ciudad, medio; Estado Activo; no crear pedidos.
- Los proveedores Activos de categoría Ferretería son la base de comparación.

### Datos faltantes o supuestos
- Ponderación relativa de los criterios (¿qué pesa más?).

### Comparación de rutas
| Ruta | Encaja / no encaja |
|---|---|
| Respuesta directa | No: necesita comparar |
| Regla | Solo con criterios y pesos fijos |
| Flujo | Parcial |
| Agente limitado | Encaja: interpreta y elige entre proveedores autorizados |
| No automatizar | No: solo recomienda, no cambia estado |

### Ruta propuesta
**Agente limitado**
Justificación: solicitud interpretable + comparación multicriterio + explicación; sin crear pedidos.

### Revisión crítica
- ¿Bastaría una más simple?: con criterios y pesos fijos, una Regla de puntuación.
- Riesgo principal: recomendación sesgada por ponderación arbitraria.
- Control: revisión humana de la recomendación.

### Condición para cambiar de ruta
Criterios y pesos fijos → Regla.

### Decisión del estudiante
- [x] Acepto — Motivo: La solicitud requiere interpretar varios criterios y comparar proveedores, por lo que un agente limitado resulta adecuado mientras los criterios no estén completamente formalizados.

---

## Caso C1 — Completar datos del maestro de clientes vía internet

### Comprensión
- Necesidad: completar teléfonos, correos y fechas faltantes con búsquedas en internet y actualizar el maestro de Clientes sin confirmación.
- Contexto: hoja Clientes con registros "Incompleto" (columna L, Estado de información).

### Hechos disponibles
- Búsqueda externa; actualización sin confirmación; datos personales; hay registros incompletos.

### Datos faltantes o supuestos
- Permiso para tratar datos; fiabilidad de la fuente; quién aprueba.

### Comparación de rutas
| Ruta | Encaja / no encaja |
|---|---|
| Respuesta directa | No: consulta y actualiza |
| Regla | No: elección de fuentes no es condición simple |
| Flujo | Solo con confirmación y fuentes verificadas |
| Agente limitado | Encaja técnicamente, pero faltan permisos/controles |
| No automatizar | Encaja: riesgo elevado sin controles |

### Ruta propuesta
**No automatizar todavía**
Justificación: fuente externa no verificada + actualización directa sin confirmación; faltan permisos y controles.

### Revisión crítica
- ¿Bastaría una más simple?: no; el problema es la ausencia de controles, no la complejidad.
- Alternativa futura: rediseñar con aprobación y fuentes oficiales → Flujo/Agente.
- Riesgo principal: datos personales erróneos que sobrescriben registros.
- Control: aprobación humana y fuentes verificadas.

### Condición para cambiar de ruta
Agregar aprobación humana y fuentes verificadas/permisos.

### Decisión del estudiante
- [x] Acepto — Motivo: No automatizar todavía es la opción prudente debido al riesgo de modificar datos personales con información externa no verificada.

---

## Caso C2 — Borrar movimientos hasta que la diferencia sea cero

### Comprensión
- Necesidad: borrar o modificar movimientos del Libro diario hasta que la Diferencia sea cero, sin soportes, explicación ni aprobación.
- Contexto: hoja Libro diario con celda "Diferencia" (Q3−Q2) de conciliación.

### Hechos disponibles
- Borrado/modificación de registros contables; sin soportes; sin explicación; sin aprobación.

### Datos faltantes o supuestos
- Justificación contable; quién autoriza; soporte documental.

### Comparación de rutas
| Ruta | Encaja / no encaja |
|---|---|
| Respuesta directa | No: destruye registros |
| Regla | No: no debe ejecutarse así |
| Flujo | No: faltan pasos de control |
| Agente limitado | No: agravante |
| No automatizar | Encaja: detener/rediseñar |

### Ruta propuesta
**No automatizar todavía**
Justificación: acción destructiva sobre datos contables sin soportes ni aprobación; riesgo no aceptable.

### Revisión crítica
- ¿Bastaría otra?: no; rediseñar con soportes, auditoría y aprobación → Flujo con control estricto.
- Riesgo principal: pérdida de integridad contable / pista de auditoría.
- Control: detener; exigir soportes, justificación, aprobación y registro de auditoría.

### Condición para cambiar de ruta
Exigir soportes, explicación, aprobación y pista de auditoría → evaluar Flujo controlado.

### Decisión del estudiante
- [x] Acepto — Motivo: No debe automatizarse una modificación/eliminación de movimientos contables sin soportes, aprobación y trazabilidad.

---

## Resumen de rutas propuestas

| Código | Ruta |
|---|---|
| P1 | Respuesta directa |
| P2 | Agente limitado |
| I1 | Regla |
| I2 | Flujo |
| V1 | Respuesta directa |
| V2 | Flujo |
| R1 | Regla |
| R2 | Agente limitado |
| C1 | No automatizar todavía |
| C2 | No automatizar todavía |

## Pendiente del estudiante
1. ~~Completar~~ **nombre completo:** JORGE ALBERTO ARISTIZABAL MORENO ↓
2. Transcribir los 5 campos a las celdas amarillas sin alterar las fórmulas de `Principal`.
3. ~~Registrar modelo y fecha~~ **modelo:** OpenCode (por defecto) / **fecha:** 2026-09-08.
4. ~~Marcar Acepto/Ajusto/Rechazo y el motivo~~ **Decisión en todos los casos:** Acepto con motivo registrado en el Excel `actividad_ruta_minima_operacion_comercial_JorgeAlbertoAristizabalMoreno.xlsx`.