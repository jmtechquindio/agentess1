"""
Esquemas Pydantic y modelos de datos para el Módulo 8.
Garantiza fidelidad al esquema JSON acordado y validación tipada.
"""

from typing import List, Optional, Literal
from pydantic import BaseModel, Field

SupportType = Literal[
    "transfer_voucher",
    "pos_receipt",
    "sistecredito_credit",
    "addi_credit",
    "expense_invoice",
    "other"
]

ReferenceType = Literal[
    "approval_code",
    "transaction_id",
    "invoice_number",
    "card_last_digits",
    "claim_number",
    "reference"
]

AmountBasis = Literal[
    "transferred_value",
    "financed_value",
    "total_visible",
    "missing"
]

class ReferenceItem(BaseModel):
    type: ReferenceType = Field(description="Tipo de referencia visible")
    value: str = Field(description="Valor de la referencia")
    confidence: Optional[float] = Field(default=1.0, description="Confianza estimada en la lectura de la referencia")

class ExtractedReceiptSchema(BaseModel):
    support_type: SupportType = Field(description="Tipo de soporte identificado")
    amount: Optional[float] = Field(default=None, description="Monto numérico sin puntos ni símbolos")
    amount_basis: AmountBasis = Field(description="Base o justificación del monto tomado")
    date: Optional[str] = Field(default=None, description="Fecha normalizada AAAA-MM-DD")
    references: List[ReferenceItem] = Field(default_factory=list, description="Lista de referencias visibles")
    sender: Optional[str] = Field(default=None, description="Persona o cuenta origen")
    beneficiary: Optional[str] = Field(default=None, description="Persona o comercio destino visible")
    entity: Optional[str] = Field(default=None, description="Entidad bancaria o plataforma (ej. Bancolombia, Nequi, Sistecrédito)")
    payment_method: Optional[str] = Field(default=None, description="Medio de pago informado")
    warnings: List[str] = Field(default_factory=list, description="Advertencias, dudas o campos ausentes/ilegibles")

# Modelos para las herramientas del agente

class SaleItemDraft(BaseModel):
    product_code: str
    product_name: str
    quantity: int
    unit_price: float

class SaleDraftProposal(BaseModel):
    proposal_version: int
    sale_id: str
    sale_date: str
    customer_name: Optional[str]
    items: List[SaleItemDraft]
    total_amount: float
    receipt_id: Optional[int] = None
