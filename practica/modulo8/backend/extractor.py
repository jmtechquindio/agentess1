"""
Módulo Extractor para Comercial La Esquina.
Usa la API de OpenAI con modelo gpt-5.6-luna y Structured Outputs.
Incluye fallback de mocks declarados para pruebas deterministas sin consumir API.
"""

import os
import json
import base64
from typing import Tuple, Dict, Any
from .schema import ExtractedReceiptSchema

EXTRACTOR_SYSTEM_PROMPT = """Eres un extractor de comprobantes de pago y documentos comerciales para Comercial La Esquina.
Tu tarea es leer una imagen o archivo de soporte y devolver exclusivamente un objeto JSON válido con los datos visibles y verificables.

Reglas que debes cumplir:
1. No inventes datos. Si un campo no es visible o resulta ilegible, usa null y agrega una advertencia en "warnings".
2. Distingue el tipo de soporte: "transfer_voucher", "pos_receipt", "sistecredito_credit", "addi_credit", "expense_invoice" u "other".
3. Conserva los importes numéricos sin puntos de miles ni símbolos de moneda en "amount".
4. Si el documento muestra varios importes, identifica el monto de la operación y explica en "amount_basis" cuál tomaste (por ejemplo: "transferred_value", "financed_value", "total_visible", "missing").
5. Normaliza las fechas al formato AAAA-MM-DD cuando el orden de día y mes sea claro. Si hay ambigüedad, consérvala en "warnings".
6. Extrae todas las referencias visibles con su tipo: "approval_code", "transaction_id", "invoice_number", "card_last_digits", "claim_number" o "reference".
7. Identifica partes involucradas: origen, destino, entidad y persona o comercio visible, sin asumir que el receptor es la tienda si el nombre no coincide.
8. La salida debe ajustarse exactamente al esquema JSON acordado, sin texto adicional antes ni después del objeto."""

def encode_image(image_path: str) -> str:
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

def extract_receipt(file_path: str, force_mock: bool = False, mock_type: str = None) -> Tuple[ExtractedReceiptSchema, Dict[str, Any]]:
    """
    Extrae la información de un comprobante.
    Retorna una tupla (ExtractedReceiptSchema, metadata) donde metadata indica si fue 'real_api' o 'mock'.
    """
    api_key = os.environ.get("OPENAI_API_KEY")
    ocr_model = os.environ.get("OPENAI_OCR_MODEL", "gpt-5.6-luna")

    # Si se fuerza mock o no hay API key válida, usar mock identificado
    if force_mock or not api_key or api_key.startswith("tu_clave"):
        mock_data, mock_desc = get_mock_extraction(file_path, mock_type)
        return ExtractedReceiptSchema(**mock_data), {
            "source": "mock_extractor",
            "model": "mock_rule_engine",
            "note": mock_desc,
            "is_real_api": False
        }

    try:
        from openai import OpenAI
        client = OpenAI(api_key=api_key)
        
        base64_image = encode_image(file_path)
        # Determinar mime type
        ext = os.path.splitext(file_path)[1].lower()
        mime_type = "image/png" if ext == ".png" else "image/jpeg"

        response = client.beta.chat.completions.parse(
            model=ocr_model,
            messages=[
                {"role": "system", "content": EXTRACTOR_SYSTEM_PROMPT},
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Extrae los datos de este comprobante respetando estrictamente las reglas."},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{mime_type};base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            response_format=ExtractedReceiptSchema,
        )
        parsed_result = response.choices[0].message.parsed
        return parsed_result, {
            "source": "openai_api",
            "model": ocr_model,
            "note": "Extracción real mediante llamada a OpenAI API",
            "is_real_api": True
        }
    except Exception as e:
        # En caso de fallo de red o cuota, capturar y reportar claramente sin crashear
        return None, {
            "source": "error",
            "model": ocr_model,
            "error": str(e),
            "is_real_api": True
        }

def get_mock_extraction(file_path: str, mock_type: str = None) -> Tuple[dict, str]:
    """
    Genera extracciones simuladas declaradas para los casos del caso de estudio y pruebas.
    """
    filename = os.path.basename(file_path).lower() if file_path else ""
    
    # 1. Comprobante de crédito Sistecrédito
    if mock_type == "credit" or "sistecredito" in filename or "credito" in filename:
        return {
            "support_type": "sistecredito_credit",
            "amount": 300000.0,
            "amount_basis": "financed_value",
            "date": "2026-09-15",
            "references": [
                {"type": "reference", "value": "CRED-994812", "confidence": 0.98}
            ],
            "sender": "Sistecrédito Financiación",
            "beneficiary": "Comercial La Esquina",
            "entity": "Sistecrédito",
            "payment_method": "Crédito financiado",
            "warnings": [
                "El monto corresponde al valor financiado, no a un pago recibido en efectivo o caja.",
                "Cuotas quincenales pactadas; requiere liquidación separada."
            ]
        }, "Mock: Soporte de crédito Sistecrédito ($300.000 valor financiado, amount_basis=financed_value)."

    # 2. Factura de gasto (transporte/servicios)
    if mock_type == "expense" or "gasto" in filename or "transporte" in filename or "factura_gasto" in filename:
        return {
            "support_type": "expense_invoice",
            "amount": 55000.0,
            "amount_basis": "total_visible",
            "date": "2026-09-14",
            "references": [
                {"type": "invoice_number", "value": "FAC-TR-8812", "confidence": 0.99}
            ],
            "sender": "Transportes Rápidos S.A.S.",
            "beneficiary": "Comercial La Esquina",
            "entity": "Transportes Rápidos S.A.S.",
            "payment_method": "Factura de compra / servicio",
            "warnings": [
                "Es una compra de servicio/gasto operativo de la tienda, no genera venta ni ingreso."
            ]
        }, "Mock: Factura de gasto (Transportes Rápidos FAC-TR-8812 por $55.000)."

    # 3. Comprobante con monto recortado / ausente
    if mock_type == "cropped" or "recortado" in filename or "sin_monto" in filename:
        return {
            "support_type": "transfer_voucher",
            "amount": None,
            "amount_basis": "missing",
            "date": "2026-09-11",
            "references": [
                {"type": "transaction_id", "value": "TRX-77123", "confidence": 0.85}
            ],
            "sender": None,
            "beneficiary": "Lina María Gómez H.",
            "entity": "Bancolombia",
            "payment_method": "Transferencia",
            "warnings": [
                "Monto ausente o ilegible por corte en la imagen.",
                "No se asume compra neta ni flete; se requiere soporte legible."
            ]
        }, "Mock: Comprobante recortado (amount=None, amount_basis=missing)."

    # 4. Caso estándar del comprobante de ejemplo ($148.000 del 11 de septiembre de 2026)
    return {
        "support_type": "transfer_voucher",
        "amount": 148000.0,
        "amount_basis": "transferred_value",
        "date": "2026-09-11",
        "references": [
            {"type": "reference", "value": "0184283", "confidence": 0.99}
        ],
        "sender": None,
        "beneficiary": "Lina María Gómez H.",
        "entity": "Bancolombia",
        "payment_method": "Transferencia bancaria",
        "warnings": [
            "Mensaje no visible (null).",
            "Código de aprobación no visible (null).",
            "El receptor visible es 'Lina María Gómez H.'; no sustituye el comercio Comercial La Esquina."
        ]
    }, "Mock: Comprobante ejemplo clase ($148.000, 2026-09-11, ref 0184283)."
