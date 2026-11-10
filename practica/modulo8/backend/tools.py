"""
Implementación de las 6 herramientas de negocio del Agente para Comercial La Esquina.
Herramientas:
1. extract_receipt_tool
2. register_receipt_tool
3. search_sales_tool
4. link_receipt_to_sale_tool
5. create_sale_draft_tool
6. commit_sale_tool
"""

import hashlib
import json
import os
from datetime import datetime
from typing import Dict, Any, List, Optional
from .database import get_connection
from .schema import ExtractedReceiptSchema, SaleItemDraft, SaleDraftProposal
from .extractor import extract_receipt

def calculate_sha256(file_path: str) -> str:
    """Calcula el hash SHA-256 de un archivo para deduplicación exacta."""
    hasher = hashlib.sha256()
    with open(file_path, "rb") as f:
        while chunk := f.read(8192):
            hasher.update(chunk)
    return hasher.hexdigest()

def extract_receipt_tool(file_path: str, force_mock: bool = False, mock_type: str = None) -> Dict[str, Any]:
    """
    Herramienta 1: extract_receipt
    Llama al extractor con el archivo y devuelve la ficha con advertencias.
    """
    if not os.path.exists(file_path):
        return {"error": f"El archivo '{file_path}' no existe."}

    parsed, meta = extract_receipt(file_path, force_mock=force_mock, mock_type=mock_type)
    if parsed is None:
        return {"error": meta.get("error", "Error desconocido al procesar el comprobante."), "metadata": meta}

    return {
        "success": True,
        "extracted_data": parsed.model_dump(),
        "metadata": meta
    }

def register_receipt_tool(file_path: str, extracted_data: Dict[str, Any], db_path: str = None) -> Dict[str, Any]:
    """
    Herramienta 2: register_receipt
    Calcula SHA-256. Si ya existe en 'receipts', devuelve el registro previo sin duplicar.
    Si es nuevo, lo guarda con estado explícito.
    """
    file_hash = calculate_sha256(file_path)
    conn = get_connection(db_path)
    cursor = conn.cursor()

    # Control de duplicados por hash exacto
    cursor.execute("SELECT * FROM receipts WHERE file_hash = ?", (file_hash,))
    existing = cursor.fetchone()
    if existing:
        conn.close()
        return {
            "is_duplicate": True,
            "receipt_id": existing["id"],
            "status": existing["status"],
            "message": "Control 1 ejecutado: Archivo duplicado detectado por hash SHA-256. Se retorna el registro existente sin reextraer ni duplicar.",
            "data": dict(existing)
        }

    now = datetime.now().isoformat()
    schema_obj = ExtractedReceiptSchema(**extracted_data)

    # Determinar estado inicial
    status = "pending_review"
    if schema_obj.amount is None or schema_obj.amount_basis == "missing":
        status = "manual_check"
    elif schema_obj.support_type == "expense_invoice":
        status = "manual_check" # Gastos no se acreditan como ventas
    elif schema_obj.support_type == "sistecredito_credit":
        status = "manual_check" # Financiación separada de cobro directo

    ref_str = ", ".join([r.value for r in schema_obj.references]) if schema_obj.references else None

    cursor.execute("""
    INSERT INTO receipts (
        file_path, file_hash, support_type, amount, amount_basis, receipt_date,
        reference, entity, sender, beneficiary, extracted_data, warnings, status,
        created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        file_path,
        file_hash,
        schema_obj.support_type,
        schema_obj.amount,
        schema_obj.amount_basis,
        schema_obj.date,
        ref_str,
        schema_obj.entity,
        schema_obj.sender,
        schema_obj.beneficiary,
        json.dumps(extracted_data, ensure_ascii=False),
        json.dumps(schema_obj.warnings, ensure_ascii=False),
        status,
        now,
        now
    ))
    receipt_id = cursor.lastrowid

    # Registrar evento de auditoría
    cursor.execute("""
    INSERT INTO audit_events (event_type, approved_by, tool_name, proposal_version, details, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (
        "RECEIPT_REGISTERED",
        "system_agent",
        "register_receipt",
        1,
        json.dumps({"receipt_id": receipt_id, "file_hash": file_hash, "status": status}),
        now
    ))

    conn.commit()
    conn.close()

    return {
        "is_duplicate": False,
        "receipt_id": receipt_id,
        "status": status,
        "message": f"Comprobante registrado exitosamente con ID {receipt_id}."
    }

def search_sales_tool(amount: Optional[float] = None, date: Optional[str] = None, reference: Optional[str] = None, db_path: str = None) -> Dict[str, Any]:
    """
    Herramienta 3: search_sales
    Consulta ventas abiertas o compatibles por monto, fecha o referencia.
    Retorna la lista de candidatos con sus ítems.
    """
    conn = get_connection(db_path)
    cursor = conn.cursor()

    query = "SELECT * FROM sales WHERE status = 'confirmed'"
    params = []

    if amount is not None:
        query += " AND total_amount = ?"
        params.append(amount)

    cursor.execute(query, params)
    sales = cursor.fetchall()

    candidates = []
    for s in sales:
        sale_id = s["id"]
        cursor.execute("SELECT * FROM sale_items WHERE sale_id = ?", (sale_id,))
        items = [dict(it) for it in cursor.fetchall()]

        # Verificar si ya tiene pagos asociados
        cursor.execute("""
        SELECT sp.applied_amount, p.reference, p.payment_method, p.payment_date 
        FROM sale_payments sp
        JOIN payments p ON sp.payment_id = p.id
        WHERE sp.sale_id = ?
        """, (sale_id,))
        existing_payments = [dict(p) for p in cursor.fetchall()]

        candidates.append({
            "sale_id": s["id"],
            "sale_date": s["sale_date"],
            "customer_name": s["customer_name"],
            "total_amount": s["total_amount"],
            "items": items,
            "existing_payments": existing_payments
        })

    conn.close()

    count = len(candidates)
    if count == 0:
        situation = "missing"
        message = "Sin coincidencias. No hay ventas que coincidan con los criterios. Se ofrece crear la venta faltante."
    elif count == 1:
        situation = "clear"
        message = "Coincidencia clara. Hay un candidato compatible listo para confirmación de la persona."
    else:
        situation = "ambiguous"
        message = f"Búsqueda ambigua: se encontraron {count} ventas candidatas con igual monto. Se requiere precisión de la persona."

    return {
        "situation": situation,
        "candidates_count": count,
        "candidates": candidates,
        "message": message
    }

def link_receipt_to_sale_tool(receipt_id: int, sale_id: str, applied_amount: float, approved_by: str, proposal_version: int = 1, db_path: str = None) -> Dict[str, Any]:
    """
    Herramienta 4: link_receipt_to_sale
    Asocia un comprobante a una venta existente dentro de una transacción SQLite.
    Verifica idempotencia (si ya está asociado, no duplica).
    """
    conn = get_connection(db_path)
    cursor = conn.cursor()
    now = datetime.now().isoformat()

    try:
        # 1. Comprobar existencia de venta y comprobante
        cursor.execute("SELECT * FROM sales WHERE id = ?", (sale_id,))
        sale = cursor.fetchone()
        if not sale:
            conn.close()
            return {"success": False, "error": f"La venta {sale_id} no existe."}

        cursor.execute("SELECT * FROM receipts WHERE id = ?", (receipt_id,))
        receipt = cursor.fetchone()
        if not receipt:
            conn.close()
            return {"success": False, "error": f"El comprobante {receipt_id} no existe."}

        # 2. Control de Idempotencia: Verificar si ya existe este vínculo
        cursor.execute("""
        SELECT sp.id FROM sale_payments sp
        JOIN payments p ON sp.payment_id = p.id
        WHERE sp.sale_id = ? AND p.receipt_id = ?
        """, (sale_id, receipt_id))
        already_linked = cursor.fetchone()
        if already_linked:
            conn.close()
            return {
                "success": True,
                "is_idempotent_hit": True,
                "message": f"Control 3 / Idempotencia: El comprobante {receipt_id} ya estaba asociado a la venta {sale_id}. No se duplica la operación."
            }

        # 3. Transacción atómica
        conn.execute("BEGIN TRANSACTION;")

        # Crear registro en payments
        cursor.execute("""
        INSERT INTO payments (receipt_id, payment_method, amount, payment_date, reference, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """, (
            receipt_id,
            receipt["support_type"] or "transferencia",
            applied_amount,
            receipt["receipt_date"] or now[:10],
            receipt["reference"],
            now
        ))
        payment_id = cursor.lastrowid

        # Crear registro en sale_payments
        cursor.execute("""
        INSERT INTO sale_payments (sale_id, payment_id, applied_amount, created_at)
        VALUES (?, ?, ?, ?)
        """, (sale_id, payment_id, applied_amount, now))

        # Actualizar estado de comprobante
        cursor.execute("UPDATE receipts SET status = 'matched', updated_at = ? WHERE id = ?", (now, receipt_id))

        # Registrar en audit_events
        cursor.execute("""
        INSERT INTO audit_events (event_type, approved_by, tool_name, proposal_version, details, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """, (
            "LINK_RECEIPT_TO_SALE",
            approved_by,
            "link_receipt_to_sale",
            proposal_version,
            json.dumps({"receipt_id": receipt_id, "sale_id": sale_id, "applied_amount": applied_amount, "payment_id": payment_id}),
            now
        ))

        conn.commit()
        return {
            "success": True,
            "is_idempotent_hit": False,
            "payment_id": payment_id,
            "message": f"Comprobante {receipt_id} asociado exitosamente a venta {sale_id} por ${applied_amount:,.0f}."
        }
    except Exception as e:
        conn.rollback()
        return {"success": False, "error": f"Error transaccional al asociar: {str(e)}"}
    finally:
        conn.close()

def create_sale_draft_tool(items: List[Dict[str, Any]], customer_name: Optional[str], sale_date: str, receipt_id: Optional[int] = None, proposal_version: int = 1, db_path: str = None) -> Dict[str, Any]:
    """
    Herramienta 5: create_sale_draft
    Calcula los subtotales y total estrictamente con código.
    Genera un identificador nuevo y una propuesta versionada lista para revisión humana.
    """
    conn = get_connection(db_path)
    cursor = conn.cursor()

    # Generar nuevo ID de venta V-XXX
    cursor.execute("SELECT id FROM sales WHERE id LIKE 'V-%' ORDER BY id DESC LIMIT 1")
    last_sale = cursor.fetchone()
    if last_sale:
        last_num = int(last_sale["id"].split("-")[1])
        new_id = f"V-{last_num + 1:03d}"
    else:
        new_id = "V-001"
    conn.close()

    computed_items = []
    total_amount = 0.0

    for it in items:
        qty = int(it.get("quantity", 1))
        price = float(it.get("unit_price", 0.0))
        subtotal = qty * price
        total_amount += subtotal
        computed_items.append({
            "product_code": it.get("product_code", "CUSTOM"),
            "product_name": it.get("product_name", "Producto"),
            "quantity": qty,
            "unit_price": price,
            "subtotal": subtotal
        })

    proposal = {
        "proposal_version": proposal_version,
        "sale_id": new_id,
        "sale_date": sale_date,
        "customer_name": customer_name or "Cliente no registrado",
        "items": computed_items,
        "total_amount": total_amount,
        "receipt_id": receipt_id
    }

    return {
        "success": True,
        "proposal": proposal,
        "message": f"Borrador de venta {new_id} calculado con éxito. Total: ${total_amount:,.0f}. Esperando confirmación de la persona."
    }

def commit_sale_tool(draft_proposal: Dict[str, Any], approved_by: str, db_path: str = None) -> Dict[str, Any]:
    """
    Herramienta 6: commit_sale
    Con la aprobación humana, guarda la venta, sus ítems, el pago y la asociación
    dentro de una única transacción atómica de SQLite con control de rollback.
    """
    conn = get_connection(db_path)
    cursor = conn.cursor()
    now = datetime.now().isoformat()

    sale_id = draft_proposal["sale_id"]
    sale_date = draft_proposal["sale_date"]
    customer_name = draft_proposal.get("customer_name")
    total_amount = draft_proposal["total_amount"]
    items = draft_proposal["items"]
    receipt_id = draft_proposal.get("receipt_id")
    proposal_version = draft_proposal.get("proposal_version", 1)

    try:
        conn.execute("BEGIN TRANSACTION;")

        # 1. Insertar venta
        cursor.execute("""
        INSERT INTO sales (id, sale_date, customer_name, status, total_amount, created_at, updated_at)
        VALUES (?, ?, ?, 'confirmed', ?, ?, ?)
        """, (sale_id, sale_date, customer_name, total_amount, now, now))

        # 2. Insertar sale_items
        for it in items:
            cursor.execute("""
            INSERT INTO sale_items (sale_id, product_code, product_name, quantity, unit_price, subtotal)
            VALUES (?, ?, ?, ?, ?, ?)
            """, (sale_id, it["product_code"], it["product_name"], it["quantity"], it["unit_price"], it["subtotal"]))

        # 3. Si hay comprobante asociado, registrar el pago y vincularlo
        payment_id = None
        if receipt_id:
            cursor.execute("SELECT * FROM receipts WHERE id = ?", (receipt_id,))
            receipt = cursor.fetchone()
            if receipt:
                applied_amount = receipt["amount"] or total_amount
                cursor.execute("""
                INSERT INTO payments (receipt_id, payment_method, amount, payment_date, reference, created_at)
                VALUES (?, ?, ?, ?, ?, ?)
                """, (
                    receipt_id,
                    receipt["support_type"] or "transferencia",
                    applied_amount,
                    receipt["receipt_date"] or sale_date,
                    receipt["reference"],
                    now
                ))
                payment_id = cursor.lastrowid

                cursor.execute("""
                INSERT INTO sale_payments (sale_id, payment_id, applied_amount, created_at)
                VALUES (?, ?, ?, ?)
                """, (sale_id, payment_id, applied_amount, now))

                cursor.execute("UPDATE receipts SET status = 'matched', updated_at = ? WHERE id = ?", (now, receipt_id))

        # 4. Registrar evento de auditoría
        cursor.execute("""
        INSERT INTO audit_events (event_type, approved_by, tool_name, proposal_version, details, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        """, (
            "COMMIT_SALE_CREATED",
            approved_by,
            "commit_sale",
            proposal_version,
            json.dumps({"sale_id": sale_id, "total_amount": total_amount, "receipt_id": receipt_id, "payment_id": payment_id}),
            now
        ))

        conn.commit()
        return {
            "success": True,
            "sale_id": sale_id,
            "payment_id": payment_id,
            "message": f"Venta faltante {sale_id} y su asociación guardadas en SQLite de manera permanente tras aprobación de {approved_by}."
        }
    except Exception as e:
        conn.rollback()
        return {"success": False, "error": f"Error transaccional al guardar la venta: {str(e)}"}
    finally:
        conn.close()
