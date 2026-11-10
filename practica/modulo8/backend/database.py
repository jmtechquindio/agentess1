"""
Gestión de base de datos SQLite para Comercial La Esquina.
Tablas según la especificación del Módulo 8:
- receipts
- sales
- sale_items
- payments
- sale_payments
- audit_events
"""

import sqlite3
import json
import os
from datetime import datetime

DEFAULT_DB_PATH = os.environ.get("DATABASE_PATH", "comercial_la_esquina.db")

def get_connection(db_path: str = None) -> sqlite3.Connection:
    path = db_path or DEFAULT_DB_PATH
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn

def init_db(db_path: str = None):
    conn = get_connection(db_path)
    cursor = conn.cursor()

    # 1. Tabla receipts
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS receipts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        file_path TEXT NOT NULL,
        file_hash TEXT NOT NULL UNIQUE,
        support_type TEXT NOT NULL,
        amount REAL,
        amount_basis TEXT,
        receipt_date TEXT,
        reference TEXT,
        entity TEXT,
        sender TEXT,
        beneficiary TEXT,
        extracted_data TEXT NOT NULL,
        warnings TEXT,
        status TEXT NOT NULL DEFAULT 'pending_review',
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
    );
    """)

    # 2. Tabla sales
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sales (
        id TEXT PRIMARY KEY,
        sale_date TEXT NOT NULL,
        customer_name TEXT,
        status TEXT NOT NULL DEFAULT 'confirmed', -- draft, confirmed, cancelled
        total_amount REAL NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
    );
    """)

    # 3. Tabla sale_items
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sale_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sale_id TEXT NOT NULL,
        product_code TEXT NOT NULL,
        product_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        unit_price REAL NOT NULL,
        subtotal REAL NOT NULL,
        FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE
    );
    """)

    # 4. Tabla payments
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        receipt_id INTEGER NOT NULL,
        payment_method TEXT NOT NULL,
        amount REAL NOT NULL,
        payment_date TEXT NOT NULL,
        reference TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY (receipt_id) REFERENCES receipts(id)
    );
    """)

    # 5. Tabla sale_payments
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sale_payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sale_id TEXT NOT NULL,
        payment_id INTEGER NOT NULL,
        applied_amount REAL NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (sale_id) REFERENCES sales(id),
        FOREIGN KEY (payment_id) REFERENCES payments(id)
    );
    """)

    # 6. Tabla audit_events
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS audit_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_type TEXT NOT NULL,
        approved_by TEXT NOT NULL,
        tool_name TEXT NOT NULL,
        proposal_version INTEGER,
        details TEXT NOT NULL,
        created_at TEXT NOT NULL
    );
    """)

    # Catálogo de productos para ventas
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS products (
        code TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        price REAL NOT NULL
    );
    """)

    conn.commit()
    conn.close()

def seed_data(db_path: str = None):
    """Inserta datos ficticios de Comercial La Esquina según el caso de negocio."""
    conn = get_connection(db_path)
    cursor = conn.cursor()

    # Limpiar y resembrar catálogo y ventas si no existen
    cursor.execute("SELECT COUNT(*) as count FROM products")
    if cursor.fetchone()["count"] == 0:
        products = [
            ("PROD-001", "Camisa lino", 60000.0),
            ("PROD-002", "Jean", 88000.0),
            ("PROD-003", "Vestido fiesta", 148000.0),
            ("PROD-004", "Blusa seda", 45000.0),
            ("PROD-005", "Pantalón gabardina", 75000.0),
        ]
        cursor.executemany("INSERT INTO products (code, name, price) VALUES (?, ?, ?)", products)

    cursor.execute("SELECT COUNT(*) as count FROM sales")
    if cursor.fetchone()["count"] == 0:
        now = datetime.now().isoformat()
        
        # Venta V-041: Camisa lino + jean = $148.000 (Camilo R.)
        cursor.execute("""
        INSERT INTO sales (id, sale_date, customer_name, status, total_amount, created_at, updated_at)
        VALUES ('V-041', '2026-09-10', 'Camilo R.', 'confirmed', 148000.0, ?, ?)
        """, (now, now))
        cursor.execute("""
        INSERT INTO sale_items (sale_id, product_code, product_name, quantity, unit_price, subtotal)
        VALUES ('V-041', 'PROD-001', 'Camisa lino', 1, 60000.0, 60000.0),
               ('V-041', 'PROD-002', 'Jean', 1, 88000.0, 88000.0)
        """)

        # Venta V-043: Vestido fiesta = $148.000 (Cliente no registrado)
        cursor.execute("""
        INSERT INTO sales (id, sale_date, customer_name, status, total_amount, created_at, updated_at)
        VALUES ('V-043', '2026-09-11', 'Cliente no registrado', 'confirmed', 148000.0, ?, ?)
        """, (now, now))
        cursor.execute("""
        INSERT INTO sale_items (sale_id, product_code, product_name, quantity, unit_price, subtotal)
        VALUES ('V-043', 'PROD-003', 'Vestido fiesta', 1, 148000.0, 148000.0)
        """)

        # Venta V-045: Blusa seda + pantalón = $120.000 (Mariana T.)
        cursor.execute("""
        INSERT INTO sales (id, sale_date, customer_name, status, total_amount, created_at, updated_at)
        VALUES ('V-045', '2026-09-12', 'Mariana T.', 'confirmed', 120000.0, ?, ?)
        """, (now, now))
        cursor.execute("""
        INSERT INTO sale_items (sale_id, product_code, product_name, quantity, unit_price, subtotal)
        VALUES ('V-045', 'PROD-004', 'Blusa seda', 1, 45000.0, 45000.0),
               ('V-045', 'PROD-005', 'Pantalón gabardina', 1, 75000.0, 75000.0)
        """)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    seed_data()
    print("Base de datos inicializada y sembrada con éxito.")
