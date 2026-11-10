"""
Suite de Pruebas Automatizadas de Aceptación (Módulo 8 - Comercial La Esquina).
Compatible con `pytest` y `unittest`.
Verifica los 9 casos de aceptación definidos en la Sección 16 de la guía oficial:
1. Extracción fiel
2. Archivo duplicado (SHA-256)
3. Búsqueda ambigua (dos ventas con igual valor)
4. Asociación confirmada (transacción atómica)
5. Venta faltante (cálculo por código y creación)
6. Monto ausente (null y amount_basis='missing')
7. Soporte de crédito (Sistecrédito financiado separado de caja)
8. Gasto de la tienda (factura de transporte sin venta de tienda)
9. Idempotencia de acción (doble clic / reintento sin duplicación)
"""

import os
import tempfile
import unittest
from backend.database import init_db, seed_data, get_connection
from backend.tools import (
    extract_receipt_tool,
    register_receipt_tool,
    search_sales_tool,
    link_receipt_to_sale_tool,
    create_sale_draft_tool,
    commit_sale_tool
)
from backend.agent import StoreAgent

class TestAcceptanceSuite(unittest.TestCase):

    def setUp(self):
        fd, self.db_path = tempfile.mkstemp(suffix=".db")
        os.close(fd)
        init_db(self.db_path)
        seed_data(self.db_path)

        fd2, self.dummy_receipt = tempfile.mkstemp(suffix=".png")
        with open(self.dummy_receipt, "wb") as f:
            f.write(b"COMERCIAL_LA_ESQUINA_VOUCHER_148K_SAMPLE_DATA")
        os.close(fd2)

    def tearDown(self):
        if os.path.exists(self.db_path):
            os.remove(self.db_path)
        if os.path.exists(self.dummy_receipt):
            os.remove(self.dummy_receipt)

    # CASO 1: Extracción fiel
    def test_case_1_faithful_extraction(self):
        res = extract_receipt_tool(self.dummy_receipt, force_mock=True)
        self.assertTrue(res["success"])
        data = res["extracted_data"]
        self.assertEqual(data["amount"], 148000.0)
        self.assertEqual(data["date"], "2026-09-11")
        self.assertEqual(data["amount_basis"], "transferred_value")
        ref_vals = [r["value"] for r in data["references"]]
        self.assertIn("0184283", ref_vals)
        self.assertIsNone(data["sender"])
        self.assertTrue(any("Lina María Gómez H." in w for w in data["warnings"]))

    # CASO 2: Archivo duplicado (Deduplicación por SHA-256)
    def test_case_2_duplicate_file_detection(self):
        ext = extract_receipt_tool(self.dummy_receipt, force_mock=True)["extracted_data"]
        reg1 = register_receipt_tool(self.dummy_receipt, ext, db_path=self.db_path)
        self.assertFalse(reg1["is_duplicate"])
        rec_id = reg1["receipt_id"]

        reg2 = register_receipt_tool(self.dummy_receipt, ext, db_path=self.db_path)
        self.assertTrue(reg2["is_duplicate"])
        self.assertEqual(reg2["receipt_id"], rec_id)

        conn = get_connection(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) as count FROM receipts")
        self.assertEqual(cursor.fetchone()["count"], 1)
        conn.close()

    # CASO 3: Búsqueda ambigua (Dos ventas con igual monto)
    def test_case_3_ambiguous_sales_search(self):
        res = search_sales_tool(amount=148000.0, db_path=self.db_path)
        self.assertEqual(res["situation"], "ambiguous")
        self.assertEqual(res["candidates_count"], 2)
        sale_ids = [c["sale_id"] for c in res["candidates"]]
        self.assertIn("V-041", sale_ids)
        self.assertIn("V-043", sale_ids)

    # CASO 4: Asociación confirmada (Transacción atómica)
    def test_case_4_confirmed_association(self):
        ext = extract_receipt_tool(self.dummy_receipt, force_mock=True)["extracted_data"]
        reg = register_receipt_tool(self.dummy_receipt, ext, db_path=self.db_path)
        rec_id = reg["receipt_id"]

        link_res = link_receipt_to_sale_tool(
            receipt_id=rec_id,
            sale_id="V-043",
            applied_amount=148000.0,
            approved_by="William Vergara",
            proposal_version=1,
            db_path=self.db_path
        )
        self.assertTrue(link_res["success"])

        conn = get_connection(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM sale_payments WHERE sale_id = 'V-043'")
        sp = cursor.fetchone()
        self.assertIsNotNone(sp)
        self.assertEqual(sp["applied_amount"], 148000.0)

        cursor.execute("SELECT status FROM receipts WHERE id = ?", (rec_id,))
        self.assertEqual(cursor.fetchone()["status"], "matched")
        conn.close()

    # CASO 5: Venta faltante (Cálculo exacto por código y commit en transacción)
    def test_case_5_missing_sale_creation(self):
        agent = StoreAgent(db_path=self.db_path)
        items = [
            {"product_code": "PROD-004", "product_name": "Blusa seda", "quantity": 2, "unit_price": 45000.0},
            {"product_code": "PROD-001", "product_name": "Camisa lino", "quantity": 1, "unit_price": 60000.0}
        ]
        draft = agent.prepare_sale_draft(
            items=items,
            customer_name="Valeria P.",
            sale_date="2026-09-13",
            receipt_id=None
        )
        self.assertTrue(draft["success"])
        self.assertEqual(draft["proposal"]["total_amount"], 150000.0)

        commit_res = agent.confirm_proposal(approved_by="William Vergara")
        self.assertTrue(commit_res["success"])
        new_sale_id = commit_res["sale_id"]

        conn = get_connection(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM sales WHERE id = ?", (new_sale_id,))
        sale = cursor.fetchone()
        self.assertIsNotNone(sale)
        self.assertEqual(sale["total_amount"], 150000.0)

        cursor.execute("SELECT COUNT(*) as count FROM sale_items WHERE sale_id = ?", (new_sale_id,))
        self.assertEqual(cursor.fetchone()["count"], 2)
        conn.close()

    # CASO 6: Monto ausente / imagen recortada
    def test_case_6_cropped_missing_amount(self):
        agent = StoreAgent(db_path=self.db_path)
        fd, path = tempfile.mkstemp(suffix=".png")
        with open(path, "wb") as f:
            f.write(b"CROPPED_RECEIPT_WITHOUT_TOTAL")
        os.close(fd)

        res = agent.process_file_upload(path, force_mock=True, mock_type="cropped")
        os.remove(path)

        self.assertEqual(res["step"], "manual_review_needed")
        self.assertIsNone(res["extracted_data"]["amount"])
        self.assertEqual(res["extracted_data"]["amount_basis"], "missing")

        conn = get_connection(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT status FROM receipts WHERE id = ?", (res["receipt_id"],))
        self.assertEqual(cursor.fetchone()["status"], "manual_check")
        conn.close()

    # CASO 7: Soporte de crédito (Sistecrédito $300.000 financiado)
    def test_case_7_credit_support_financed_value(self):
        agent = StoreAgent(db_path=self.db_path)
        fd, path = tempfile.mkstemp(suffix=".png")
        with open(path, "wb") as f:
            f.write(b"SISTECREDITO_VOUCHER")
        os.close(fd)

        res = agent.process_file_upload(path, force_mock=True, mock_type="credit")
        os.remove(path)

        self.assertEqual(res["step"], "credit_routed")
        self.assertEqual(res["extracted_data"]["support_type"], "sistecredito_credit")
        self.assertEqual(res["extracted_data"]["amount"], 300000.0)
        self.assertEqual(res["extracted_data"]["amount_basis"], "financed_value")

        conn = get_connection(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) as count FROM payments WHERE receipt_id = ?", (res["receipt_id"],))
        self.assertEqual(cursor.fetchone()["count"], 0)
        conn.close()

    # CASO 8: Gasto de la tienda (Factura de transporte)
    def test_case_8_store_expense_invoice(self):
        agent = StoreAgent(db_path=self.db_path)
        fd, path = tempfile.mkstemp(suffix=".png")
        with open(path, "wb") as f:
            f.write(b"EXPENSE_INVOICE_TRANSPORT")
        os.close(fd)

        res = agent.process_file_upload(path, force_mock=True, mock_type="expense")
        os.remove(path)

        self.assertEqual(res["step"], "expense_routed")
        self.assertEqual(res["extracted_data"]["support_type"], "expense_invoice")
        self.assertEqual(res["extracted_data"]["amount"], 55000.0)

        conn = get_connection(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) as count FROM sales WHERE customer_name = 'Transportes Rápidos S.A.S.'")
        self.assertEqual(cursor.fetchone()["count"], 0)
        conn.close()

    # CASO 9: Idempotencia de acción (Doble clic en confirmación)
    def test_case_9_idempotency_of_action(self):
        ext = extract_receipt_tool(self.dummy_receipt, force_mock=True)["extracted_data"]
        reg = register_receipt_tool(self.dummy_receipt, ext, db_path=self.db_path)
        rec_id = reg["receipt_id"]

        call1 = link_receipt_to_sale_tool(
            receipt_id=rec_id,
            sale_id="V-041",
            applied_amount=148000.0,
            approved_by="William Vergara",
            proposal_version=1,
            db_path=self.db_path
        )
        self.assertTrue(call1["success"])
        self.assertFalse(call1["is_idempotent_hit"])

        call2 = link_receipt_to_sale_tool(
            receipt_id=rec_id,
            sale_id="V-041",
            applied_amount=148000.0,
            approved_by="William Vergara",
            proposal_version=1,
            db_path=self.db_path
        )
        self.assertTrue(call2["success"])
        self.assertTrue(call2["is_idempotent_hit"])

        conn = get_connection(self.db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) as count FROM sale_payments WHERE sale_id = 'V-041' AND applied_amount = 148000.0")
        self.assertEqual(cursor.fetchone()["count"], 1)
        conn.close()

if __name__ == "__main__":
    unittest.main(verbosity=2)
