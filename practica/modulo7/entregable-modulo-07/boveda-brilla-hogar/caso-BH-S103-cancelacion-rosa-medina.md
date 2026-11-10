---
case_id: "BH-S103"
conversation_id: "BH-C014"
date: "2026-10-14"
client: "[[cliente-rosa-medina]]"
category: "cancelacion"
outcome: "error_operativo"
service_type: "limpieza_estandar_2hab_1baño"
base_amount_cop: 135000
quoted_penalty_cop: 33750
rule_penalty_cop: 67500
discrepancy_cop: -33750
tags:
  - caso
  - revision
  - error_operativo
  - cancelaciones
---

# Caso BH-S103: Cancelación del Servicio de Rosa Medina

## 1. ¿Qué pasó?
El 14 de octubre de 2026 a las 09:00 (hora de Bogotá), la clienta **Rosa Medina** se comunicó mediante la conversación `BH-C014` para cancelar su servicio de limpieza estándar programado para ese mismo día a las 19:00 (reserva `BH-S103`, apartamento de 2 habitaciones y 1 baño, con valor pactado de **$135.000 COP**).

El aviso de cancelación se entregó con exactamente **10 horas de anticipación**. Ante la solicitud, el líder de equipo **Andrés Ríos** liquidó e informó a la clienta una penalidad por cancelación del **25%**, equivalente a **$33.750 COP**:
> *"Para este aviso dejo el cobro en el 25% de $135.000: $33.750."* (Andrés Ríos, BH-C014).

La clienta acusó recibo, aclaró que no poseía ningún acuerdo especial con la empresa y solicitó dejar constancia de que la visita quedaba cancelada pero que el cobro aún no había sido pagado.

---

## 2. ¿Qué regla aplicaba en esa fecha?
Para la fecha del evento (14 de octubre de 2026), la política general vigente de la empresa correspondía al documento oficial `fuentes/04-cancelaciones.md` ([[regla-04-cancelaciones]]), emitida por Lucía Mora con vigencia desde el 1 de octubre de 2026.

Dicha norma establece taxativamente los cobros para servicios residenciales sin acuerdo particular:
- Con más de 24 horas de anticipación: **$0 COP (sin cobro)**.
- **Entre 4 y 24 horas de anticipación (ambos límites incluidos): 50% del valor programado del servicio.**
- Con menos de 4 horas o falta de acceso: **100% del valor programado.**

Dado que la clienta dio aviso con **10 horas de antelación** (intervalo comprendido estrictamente entre 4 y 24 horas), la regla general aplicable estipulaba un cobro del **50%**.

---

## 3. ¿Hubo un error o una excepción autorizada?

### Conclusión: **Hubo un error operativo de aplicación de políticas.**

### Análisis y Causa Raíz
1. **Confusión con el contrato de otro cliente:** La tasa del **25%** para cancelaciones notificadas entre 2 y 12 horas no pertenece a la política general de Brilla Hogar, sino que es una cláusula preferencial exclusiva del contrato de [[cliente-dental-aurora]] (`fuentes/07-cliente-dental-aurora.md`). Andrés Ríos traspuso indebidamente dicha cláusula a un cliente residencial que carecía de acuerdo particular.
2. **Incompetencia funcional:** De acuerdo con `fuentes/06-personas-y-permisos.md` ([[regla-06-permisos-y-limites]]), Andrés Ríos como líder de equipo **no tiene facultades** para conceder excepciones a las políticas de cancelación ni otorgar descuentos superiores al 10%.
3. **Ausencia de autorización de operaciones:** La responsable de operaciones, Lucía Mora, intervino en la conversación limitándose a solicitar datos contables de control:
   > *"Pásame el registro del valor informado y la hora del aviso para la conciliación de la semana."*
   En ningún momento Lucía Mora emitió una aprobación ni documentó una excepción en favor de Rosa Medina.

### Demostración Matemática
$$\text{Valor base del servicio (2 hab / 1 baño)} = \$135.000\text{ COP}$$
$$\text{Cobro informado por Andrés (25\%)} = \$135.000 \times 0.25 = \mathbf{\$33.750\text{ COP}}$$
$$\text{Cobro que exigía la regla oficial (50\%)} = \$135.000 \times 0.50 = \mathbf{\$67.500\text{ COP}}$$
$$\text{Diferencia dejada de cobrar (perjuicio a la empresa)} = \$67.500 - \$33.750 = \mathbf{\$33.750\text{ COP}}$$

### Qué debería hacer el equipo
1. **No ejecutar cobros forzados ni cobros sorpresa a la clienta:** Dado que a Rosa Medina se le informó por escrito un valor de $33.750 COP y ella confirmó la cancelación bajo ese entendido, exigirle $67.500 COP generaría un conflicto de atención al cliente.
2. **Revisión formal con Lucía Mora:** Andrés debe remitir formalmente el caso a Lucía Mora para que ella decida si:
   - **Opción A (Recomendada):** Autoriza y documenta retroactivamente una excepción comercial de $33.750 COP en favor de Rosa Medina, asumiendo el error como cortesía comercial para no afectar la relación con la clienta.
   - **Opción B:** Instruye contactar a la clienta explicando la inconsistencia de la tarifa informada para conciliar el pago.
3. **Medidas preventivas:** Incorporar en los protocolos operativos la verificación de si un cliente posee acuerdo especial antes de cotizar o liquidar penalidades por cancelación.

---

## 4. Fuentes y Mensajes de Respaldo

### Mensajes de Conversación (`conversaciones/conversaciones-brilla-hogar-24.json`, conversación `BH-C014`):
- `[BH-C014-M001]` **Rosa Medina (clienta):** *"Buenos días. Hoy teníamos una limpieza a las siete de la noche, pero necesito cancelarla."*
- `[BH-C014-M002]` **Andrés Ríos (líder de equipo):** *"Recibo el aviso a las nueve de la mañana: diez horas antes. La reserva BH-S103 es estándar de dos habitaciones y un baño, $135.000."*
- `[BH-C014-M003]` **Rosa Medina (clienta):** *"Sí, esa es. ¿Cuánto debo pagar por cancelarla?"*
- `[BH-C014-M004]` **Andrés Ríos (líder de equipo):** *"Para este aviso dejo el cobro en el 25% de $135.000: $33.750."*
- `[BH-C014-M005]` **Rosa Medina (clienta):** *"Recibido. No tengo un acuerdo firmado con ustedes; solo había pedido esta visita."*
- `[BH-C014-M006]` **Lucía Mora (responsable de operaciones):** *"Pásame el registro del valor informado y la hora del aviso para la conciliación de la semana."*
- `[BH-C014-M007]` **Rosa Medina (clienta):** *"Por favor déjenme claro que cancelé la visita, no que ya pagué ese cobro."*
- `[BH-C014-M008]` **Andrés Ríos (líder de equipo):** *"Dejo cancelada BH-S103, con $33.750 informado y sin confirmación de pago."*

### Documentos Oficiales de Respaldo:
- `fuentes/04-cancelaciones.md`: Define el cobro del 50% entre 4 y 24 horas y reserva las excepciones a Lucía Mora.
- `fuentes/02-tarifas-octubre.md`: Fija la tarifa de 2 habitaciones y 1 baño en $135.000 COP.
- `fuentes/06-personas-y-permisos.md`: Establece que Andrés Ríos no puede autorizar excepciones a políticas de cancelación.
- `fuentes/07-cliente-dental-aurora.md`: Evidencia de dónde provino la escala del 25% (exclusiva para Dental Aurora).

## Enlaces Internos
- [[cliente-rosa-medina]]
- [[cliente-dental-aurora]]
- [[regla-04-cancelaciones]]
- [[regla-06-permisos-y-limites]]
- [[regla-02-tarifas-octubre]]
