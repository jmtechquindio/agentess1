"""
Orquestador del Agente de Comercial La Esquina.
Coordina el ciclo de atención:
1. Extrae comprobante con extractor fiel.
2. Registra con deduplicación SHA-256.
3. Busca candidatos en SQLite.
4. Si hay ambigüedad, solicita precisión sin escrituras prematuras.
5. Si falta la venta, consulta catálogo y propone borrador con totales calculados.
6. Espera confirmación humana explícita antes de asociar o registrar.
"""

from typing import Dict, Any, List, Optional
from .tools import (
    extract_receipt_tool,
    register_receipt_tool,
    search_sales_tool,
    link_receipt_to_sale_tool,
    create_sale_draft_tool,
    commit_sale_tool
)
from .database import get_connection

class StoreAgent:
    def __init__(self, db_path: str = None):
        self.db_path = db_path
        self.current_proposal: Optional[Dict[str, Any]] = None
        self.proposal_version: int = 1

    def process_file_upload(self, file_path: str, force_mock: bool = False, mock_type: str = None) -> Dict[str, Any]:
        """
        Paso 1 y 2: Extraer datos y registrar con deduplicación.
        """
        # 1. Extracción
        extraction = extract_receipt_tool(file_path, force_mock=force_mock, mock_type=mock_type)
        if not extraction.get("success"):
            return {
                "step": "extraction_error",
                "message": f"Error al procesar el archivo: {extraction.get('error')}",
                "data": extraction
            }

        extracted_data = extraction["extracted_data"]
        metadata = extraction["metadata"]

        # 2. Registro y control de duplicados
        reg_result = register_receipt_tool(file_path, extracted_data, db_path=self.db_path)
        receipt_id = reg_result["receipt_id"]
        is_duplicate = reg_result["is_duplicate"]

        # 3. Evaluar reglas de negocio especiales (Gasto, Crédito, Monto ausente)
        support_type = extracted_data.get("support_type")
        amount = extracted_data.get("amount")
        amount_basis = extracted_data.get("amount_basis")

        # Caso Monto Ausente
        if amount is None or amount_basis == "missing":
            return {
                "step": "manual_review_needed",
                "receipt_id": receipt_id,
                "is_duplicate": is_duplicate,
                "message": "Atención: El comprobante no muestra un monto visible legible (amount_basis='missing'). No se asumen compras netas ni fletes. Por favor adjunta un soporte legible o proporciona una aclaración.",
                "extracted_data": extracted_data,
                "metadata": metadata
            }

        # Caso Factura de Gasto
        if support_type == "expense_invoice":
            return {
                "step": "expense_routed",
                "receipt_id": receipt_id,
                "is_duplicate": is_duplicate,
                "message": f"El documento corresponde a una factura de gasto/servicio para la tienda ({extracted_data.get('sender', 'Proveedor')}). Se conserva su registro para revisión de salida. No se crea una venta comercial ni se acreditan ingresos en caja.",
                "extracted_data": extracted_data,
                "metadata": metadata
            }

        # Caso Financiación / Crédito
        if support_type in ["sistecredito_credit", "addi_credit"]:
            return {
                "step": "credit_routed",
                "receipt_id": receipt_id,
                "is_duplicate": is_duplicate,
                "message": f"El soporte corresponde a una financiación ({support_type}) por un valor financiado visible de ${amount:,.0f} (amount_basis='financed_value'). No representa dinero ingresado en efectivo a la caja; se conserva su naturaleza de crédito.",
                "extracted_data": extracted_data,
                "metadata": metadata
            }

        # 4. Caso Ingreso / Pago transferido -> Buscar candidatos en SQLite
        ref_val = extracted_data["references"][0]["value"] if extracted_data.get("references") else None
        sales_search = search_sales_tool(amount=amount, db_path=self.db_path)
        candidates = sales_search["candidates"]
        situation = sales_search["situation"]

        if situation == "ambiguous":
            return {
                "step": "ambiguous_candidates",
                "receipt_id": receipt_id,
                "is_duplicate": is_duplicate,
                "message": f"Se encontraron {len(candidates)} ventas de ${amount:,.0f}. La referencia visible en el comprobante es '{ref_val}'. ¿A cuál de las ventas corresponde?",
                "candidates": candidates,
                "extracted_data": extracted_data,
                "metadata": metadata
            }
        elif situation == "clear":
            cand = candidates[0]
            self.current_proposal = {
                "proposal_version": self.proposal_version,
                "action": "link_receipt_to_sale",
                "receipt_id": receipt_id,
                "sale_id": cand["sale_id"],
                "applied_amount": amount,
                "details": f"Asociar comprobante {ref_val or receipt_id} a venta {cand['sale_id']} ({cand['customer_name']}) por ${amount:,.0f}."
            }
            return {
                "step": "proposal_ready",
                "receipt_id": receipt_id,
                "is_duplicate": is_duplicate,
                "message": f"Hay una venta compatible: {cand['sale_id']} ({cand['customer_name']}) por ${amount:,.0f}. ¿Confirmas asociar este comprobante a la venta?",
                "proposal": self.current_proposal,
                "candidate": cand,
                "extracted_data": extracted_data,
                "metadata": metadata
            }
        else: # missing
            return {
                "step": "sale_missing",
                "receipt_id": receipt_id,
                "is_duplicate": is_duplicate,
                "message": f"No se encontró ninguna venta registrada por ${amount:,.0f}. Podemos crear la venta faltante utilizando los productos del catálogo. Por favor indica qué productos compró el cliente, cantidades y precios.",
                "extracted_data": extracted_data,
                "catalog": self.get_catalog(),
                "metadata": metadata
            }

    def get_catalog(self) -> List[Dict[str, Any]]:
        conn = get_connection(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM products")
        prods = [dict(r) for r in cursor.fetchall()]
        conn.close()
        return prods

    def prepare_sale_draft(self, items: List[Dict[str, Any]], customer_name: Optional[str], sale_date: str, receipt_id: Optional[int]) -> Dict[str, Any]:
        """Prepara el borrador de venta con cálculo determinista de totales."""
        self.proposal_version += 1
        draft = create_sale_draft_tool(
            items=items,
            customer_name=customer_name,
            sale_date=sale_date,
            receipt_id=receipt_id,
            proposal_version=self.proposal_version,
            db_path=self.db_path
        )
        self.current_proposal = draft["proposal"]
        return draft

    def confirm_proposal(self, approved_by: str = "Persona de la tienda") -> Dict[str, Any]:
        """Confirma y ejecuta la propuesta revisada de manera atómica."""
        if not self.current_proposal:
            return {"success": False, "error": "No hay ninguna propuesta pendiente de confirmación."}

        # Caso asociación existente
        if self.current_proposal.get("action") == "link_receipt_to_sale":
            res = link_receipt_to_sale_tool(
                receipt_id=self.current_proposal["receipt_id"],
                sale_id=self.current_proposal["sale_id"],
                applied_amount=self.current_proposal["applied_amount"],
                approved_by=approved_by,
                proposal_version=self.current_proposal.get("proposal_version", 1),
                db_path=self.db_path
            )
            self.current_proposal = None
            return res

        # Caso venta nueva
        res = commit_sale_tool(self.current_proposal, approved_by=approved_by, db_path=self.db_path)
        self.current_proposal = None
        return res
