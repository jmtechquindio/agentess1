# Reporte de calidad — la-esquina-productos-desorganizados.csv

**Archivo original conservado intacto** (no modificado)

---

## 1. Resumen ejecutivo

| Métrica | Valor |
|---|---|
| Filas de entrada | 100 |
| Duplicados exactos eliminados | 5 |
| Duplicados con precio distinto eliminados | 3 |
| **Filas finales** | **92** |
| 　Limpias | 90 |
| 　Pendientes de revisión humana | 2 |
| Precios imputados por serie | 7 |
| id_proveedor completados | 5 |

---

## 2. Chequeos ejecutados

| # | Check | Resultado |
|---|---|---|
| 1 | Completitud (vacíos) | 1 código, 1 nombre, 6 id_proveedor, 4 precio_venta vacíos/ambiguos |
| 2 | Duplicados exactos | 5 claves completas repetidas → 5 filas eliminadas |
| 3 | Duplicados con precio distinto | 3 códigos (ABA-0009, MIS-0027, PAP-0055) con 2 precios → se conservó el precio correcto |
| 4 | Regla de precios determinista | Verificada: 92/92 precios parseables válidos coinciden con la serie |
| 5 | Normalización de códigos | `ABA0014`→`ABA-0014`, minúsculas→mayúsculas, etc. |
| 6 | Normalización de proveedor | `PRV028`→`PRV-028`, etc. |
| 7 | Categoría canónica | 5 categorías unificadas (case/acentos) |
| 8 | Unidad canónica | `ud/UND/unidad`→`Unidad`; `paquete/Paquete`→`Paquete` |
| 9 | Consistencia código↔categoría | FER=Ferreteria, MIS=Miscelanea, PAN=Panaderia, ABA=Abarrotes, PAP=Papelería |

---

## 3. Regla de precios

El dataset genera precios con esta fórmula (verificada en 92 de 92 precios parseables):

```
precio(codigo) = 9719 + 7919 × (pos − 1) − 25 × (pase − 1)
donde pos  = ((k−1) mod 25) + 1   (posición dentro del ciclo)
      pase = (k−1) // 25 + 1       (número de ciclo)
      k    = número del código (ej. FER-0026 → 26)
```

| Ciclo | Rango de códigos | Descuento aplicado |
|---|---|---|
| 1 | 0001–0025 | −0 |
| 2 | 0026–0050 | −25 |
| 3 | 0051–0075 | −50 |
| 4 | 0076–0100 | −75 |

---

## 4. Resoluciones aplicadas

### 4.1 Precios imputados (valor original ambiguo → serie)

| Código | Valor original | Precio resuelto |
|---|---|---|
| MIS-0022 | `176 mil` | 176018 |
| FER-0031 | `vacio` | 49289 |
| ABA-0044 | `152 mil` | 152236 |
| MIS-0047 | `N/A` | 175993 |
| MIS-0062 | `vacio` | 96778 |
| FER-0066 | `128 mil` | 128454 |
| PAN-0088 | `105 mil` | 104672 |

### 4.2 Precios de duplicados corregidos (valor erróneo → serie)

En 3 códigos, la segunda aparición tenía el precio alterado en +5000 respecto al valor correcto. Se descartó la fila duplicada y se conservó el precio de la primera aparición (que coincide con la serie):

| Código | Precio correcto (1er+) | Precio erróneo (2do) | Diferencia |
|---|---|---|---|
| ABA-0009 | 73071 | 78071 | +5000 |
| MIS-0027 | 17613 | 22613 | +5000 |
| PAP-0055 | 41345 | 46345 | +5000 |

### 4.3 id_proveedor completados (mapeo derivado del propio archivo)

| Código | Proveedor | id completado | Origen del mapeo |
|---|---|---|---|
| MIS-0017 | Alianza Nueva Granada | PRV-010 | ABA-0004→PRV-001, etc. |
| ABA-0034 | Importadora San Martín | PRV-019 | ABA-0004→PRV-001, etc. |
| FER-0051 | Soluciones del Norte | PRV-028 | ABA-0004→PRV-001, etc. |
| PAN-0068 | Distribuciones Andina | PRV-001 | ABA-0004→PRV-001, etc. |
| PAP-0085 | Alianza Nueva Granada | PRV-010 | ABA-0004→PRV-001, etc. |

---

## 5. Filas pendientes de revisión humana

| Código | Nombre | Problema |
|---|---|---|
| — | Producto sin código | codigo_faltante; precio_ok |
| PAP-0099 | — | nombre_faltante; id_proveedor_faltante; precio_ok |

---

## 6. Supuestos y preguntas abiertas

1. Se asumió que la regla de 7919/−25×ciclo es intencional y fue usada para imputar precios `mil`, vacíos y `N/A`.
2. `PAP-0099` no tiene código válido ni nombre; su precio `COP 12.500` contradice la serie (esperado 191781). No se imputó.
3. La fila sin código (`Producto sin código`, precio 35000, proveedor Productos La Montaña PRV-007) no tiene código y no puede resolverse.
4. Confirmar con el autor del dataset que la regla aritmética es correcta antes de confiar en las imputaciones.