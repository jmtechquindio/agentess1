"""
Pruebas de Integración End-to-End para la API FastAPI de Comercial La Esquina.
Prueba todos los endpoints HTTP y el flujo completo de cliente y servidor.
"""

import sys
import os
import unittest
from starlette.testclient import TestClient

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from backend.app import app
from backend.database import init_db, seed_data

class TestApiIntegration(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        init_db()
        seed_data()
        cls.client = TestClient(app)

    def test_01_health_endpoint(self):
        res = self.client.get("/api/health")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["status"], "ok")
        self.assertEqual(data["module"], 8)

    def test_02_catalog_endpoint(self):
        res = self.client.get("/api/catalog")
        self.assertEqual(res.status_code, 200)
        catalog = res.json()
        self.assertGreaterEqual(len(catalog), 5)
        codes = [p["code"] for p in catalog]
        self.assertIn("PROD-001", codes) # Camisa lino
        self.assertIn("PROD-003", codes) # Vestido fiesta

    def test_03_sales_list_endpoint(self):
        res = self.client.get("/api/sales")
        self.assertEqual(res.status_code, 200)
        sales = res.json()
        self.assertGreaterEqual(len(sales), 3)
        sale_ids = [s["id"] for s in sales]
        self.assertIn("V-041", sale_ids)
        self.assertIn("V-043", sale_ids)

    def test_04_upload_voucher_and_resolve_ambiguity(self):
        # 1. Subir comprobante $148.000
        file_payload = ("comprobante_148k.png", b"TEST_VOUCHER_148K_CONTENT", "image/png")
        res = self.client.post("/api/upload", files={"file": file_payload}, data={"force_mock": "true"})
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertEqual(data["step"], "ambiguous_candidates")
        self.assertEqual(data["extracted_data"]["amount"], 148000.0)
        receipt_id = data["receipt_id"]

        # 2. Seleccionar venta V-043
        res_sel = self.client.post("/api/select-candidate", json={
            "receipt_id": receipt_id,
            "sale_id": "V-043",
            "applied_amount": 148000.0,
            "approved_by": "Persona de prueba"
        })
        self.assertEqual(res_sel.status_code, 200)
        sel_data = res_sel.json()
        self.assertTrue(sel_data["success"])

        # 3. Confirmar propuesta
        res_conf = self.client.post("/api/confirm-proposal", json={
            "approved_by": "Persona de prueba"
        })
        self.assertEqual(res_conf.status_code, 200)
        conf_data = res_conf.json()
        self.assertTrue(conf_data["success"])

        # 4. Verificar en lista de ventas
        res_sales = self.client.get("/api/sales")
        v043 = next(s for s in res_sales.json() if s["id"] == "V-043")
        self.assertGreaterEqual(len(v043["payments"]), 1)
        self.assertEqual(v043["payments"][0]["applied_amount"], 148000.0)

    def test_05_create_missing_sale_workflow(self):
        # 1. Crear borrador con cálculo de total
        items = [
            {"product_code": "PROD-004", "product_name": "Blusa seda", "quantity": 1, "unit_price": 45000.0},
            {"product_code": "PROD-005", "product_name": "Pantalón gabardina", "quantity": 2, "unit_price": 75000.0}
        ]
        # Total: 45.000 + (2 * 75.000) = 45.000 + 150.000 = 195.000
        res_draft = self.client.post("/api/create-draft", json={
            "items": items,
            "customer_name": "Cliente Nuevo",
            "sale_date": "2026-09-14",
            "receipt_id": None
        })
        self.assertEqual(res_draft.status_code, 200)
        draft_data = res_draft.json()
        self.assertTrue(draft_data["success"])
        self.assertEqual(draft_data["proposal"]["total_amount"], 195000.0)

        # 2. Confirmar borrador
        res_conf = self.client.post("/api/confirm-proposal", json={
            "approved_by": "William Vergara"
        })
        self.assertEqual(res_conf.status_code, 200)
        conf_data = res_conf.json()
        self.assertTrue(conf_data["success"])
        new_sale_id = conf_data["sale_id"]

        # 3. Verificar en lista de ventas
        res_sales = self.client.get("/api/sales")
        new_sale = next(s for s in res_sales.json() if s["id"] == new_sale_id)
        self.assertEqual(new_sale["total_amount"], 195000.0)
        self.assertEqual(len(new_sale["items"]), 2)

    def test_06_audit_events_endpoint(self):
        res = self.client.get("/api/audit-events")
        self.assertEqual(res.status_code, 200)
        events = res.json()
        self.assertGreaterEqual(len(events), 1)
        event_types = [e["event_type"] for e in events]
        self.assertTrue(any("COMMIT_SALE_CREATED" in et or "LINK_RECEIPT_TO_SALE" in et for et in event_types))

    def test_07_reset_database_endpoint(self):
        res = self.client.post("/api/reset-db")
        self.assertEqual(res.status_code, 200)
        data = res.json()
        self.assertTrue(data["success"])

if __name__ == "__main__":
    unittest.main(verbosity=2)
