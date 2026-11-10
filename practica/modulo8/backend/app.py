"""
Servidor API FastAPI y orquestación web local para Comercial La Esquina.
Expone los endpoints para interactuar con la app, el chat, la base SQLite y las herramientas.
"""

import os
import shutil
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .database import init_db, seed_data, get_connection
from .agent import StoreAgent

app = FastAPI(title="Comercial La Esquina - Del Comprobante al Sistema (Módulo 8)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
FRONTEND_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend")
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Inicializar base de datos al arrancar
init_db()
seed_data()
agent = StoreAgent()

class DraftRequest(BaseModel):
    items: List[Dict[str, Any]]
    customer_name: Optional[str] = "Cliente no registrado"
    sale_date: str
    receipt_id: Optional[int] = None

class CandidateSelectRequest(BaseModel):
    receipt_id: int
    sale_id: str
    applied_amount: float
    approved_by: str = "Persona de la tienda"

class ConfirmRequest(BaseModel):
    approved_by: str = "Persona de la tienda"

@app.get("/api/health")
def health():
    return {"status": "ok", "app": "Comercial La Esquina", "module": 8}

@app.post("/api/upload")
async def upload_receipt(
    file: UploadFile = File(...),
    mock_type: Optional[str] = Form(None),
    force_mock: Optional[bool] = Form(False)
):
    """
    Sube un comprobante y lo procesa mediante el agente.
    """
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    res = agent.process_file_upload(file_path, force_mock=force_mock, mock_type=mock_type)
    return res

@app.post("/api/select-candidate")
def select_candidate(req: CandidateSelectRequest):
    """
    Resuelve la ambigüedad seleccionando la venta aprobada por la persona.
    """
    agent.current_proposal = {
        "proposal_version": agent.proposal_version,
        "action": "link_receipt_to_sale",
        "receipt_id": req.receipt_id,
        "sale_id": req.sale_id,
        "applied_amount": req.applied_amount,
        "details": f"Asociar comprobante {req.receipt_id} a venta {req.sale_id} por ${req.applied_amount:,.0f}."
    }
    return {
        "success": True,
        "proposal": agent.current_proposal,
        "message": f"Propuesta armada: asociar comprobante {req.receipt_id} a venta {req.sale_id}. Esperando confirmación final."
    }

@app.post("/api/create-draft")
def create_draft(req: DraftRequest):
    """
    Prepara el borrador de venta faltante con cálculo exacto de subtotales y total.
    """
    draft = agent.prepare_sale_draft(
        items=req.items,
        customer_name=req.customer_name,
        sale_date=req.sale_date,
        receipt_id=req.receipt_id
    )
    return draft

@app.post("/api/confirm-proposal")
def confirm_proposal(req: ConfirmRequest):
    """
    Ejecuta y persiste la propuesta aprobada en SQLite.
    """
    res = agent.confirm_proposal(approved_by=req.approved_by)
    return res

@app.get("/api/sales")
def get_sales():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM sales ORDER BY sale_date DESC")
    sales = []
    for s in cursor.fetchall():
        sale_id = s["id"]
        cursor.execute("SELECT * FROM sale_items WHERE sale_id = ?", (sale_id,))
        items = [dict(it) for it in cursor.fetchall()]
        
        cursor.execute("""
        SELECT sp.applied_amount, p.reference, p.payment_method, p.payment_date, p.receipt_id
        FROM sale_payments sp
        JOIN payments p ON sp.payment_id = p.id
        WHERE sp.sale_id = ?
        """, (sale_id,))
        payments = [dict(p) for p in cursor.fetchall()]

        sales.append({
            "id": s["id"],
            "sale_date": s["sale_date"],
            "customer_name": s["customer_name"],
            "status": s["status"],
            "total_amount": s["total_amount"],
            "items": items,
            "payments": payments
        })
    conn.close()
    return sales

@app.get("/api/receipts")
def get_receipts():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM receipts ORDER BY id DESC")
    receipts = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return receipts

@app.get("/api/audit-events")
def get_audit_events():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM audit_events ORDER BY id DESC")
    events = [dict(e) for e in cursor.fetchall()]
    conn.close()
    return events

@app.get("/api/catalog")
def get_catalog():
    return agent.get_catalog()

@app.post("/api/reset-db")
def reset_db():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DROP TABLE IF EXISTS audit_events;")
    cursor.execute("DROP TABLE IF EXISTS sale_payments;")
    cursor.execute("DROP TABLE IF EXISTS payments;")
    cursor.execute("DROP TABLE IF EXISTS sale_items;")
    cursor.execute("DROP TABLE IF EXISTS sales;")
    cursor.execute("DROP TABLE IF EXISTS receipts;")
    cursor.execute("DROP TABLE IF EXISTS products;")
    conn.commit()
    conn.close()
    init_db()
    seed_data()
    return {"success": True, "message": "Base de datos reiniciada con datos semilla de Comercial La Esquina."}

# Servir Frontend
if os.path.exists(FRONTEND_DIR):
    app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="frontend")
