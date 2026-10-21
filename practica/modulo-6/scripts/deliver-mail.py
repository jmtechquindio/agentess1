"""Wrapper: ejecuta fetch-mail.py y entrega el brief UTF-8 por Telegram.

Este script se usa como job --no-agent. Como Hermes captura stdout con la
codificacion local de Windows (cp1252) y corrompe acentos, en lugar de imprimir
el brief, lo envia directamente a Telegram leyendo el archivo UTF-8.
"""

import os
import subprocess
import sys

BASE = os.environ.get("LOCALAPPDATA", os.path.expanduser("~"))
PY = os.environ.get("HERMES_PYTHON", "python")
FETCH = os.path.join(BASE, "hermes", "scripts", "fetch-mail.py")
BRIEF = os.path.join(BASE, "hermes", "cron", "newsdata", "brief-correo.md")
HERMES = os.environ.get("HERMES_BIN", "hermes")


def _load_env():
    path = os.path.join(BASE, "hermes", ".env")
    vals = {}
    try:
        with open(path, encoding="utf-8-sig", errors="ignore") as f:
            for line in f:
                line = line.strip()
                if "=" in line and not line.startswith("#"):
                    k, v = line.split("=", 1)
                    vals[k.strip()] = v.strip()
    except Exception:
        pass
    return vals


_env = _load_env()
CHAT = os.environ.get("TELEGRAM_HOME_CHANNEL") or _env.get("TELEGRAM_HOME_CHANNEL", "")
TARGET = f"telegram:{CHAT}" if CHAT else "telegram"

env = dict(os.environ)
env["PYTHONIOENCODING"] = "utf-8"

proc = subprocess.run(
    [PY, FETCH], capture_output=True, text=True, encoding="utf-8", errors="replace"
)
if proc.stdout:
    sys.stdout.write(proc.stdout.encode("ascii", "replace").decode("ascii"))
if proc.stderr:
    sys.stderr.write(proc.stderr.encode("ascii", "replace").decode("ascii"))

if not os.path.exists(BRIEF):
    print("[SILENT]")
    sys.exit(0)

with open(BRIEF, "r", encoding="utf-8") as f:
    content = f.read().strip()

if not content or content == "[SILENT]":
    print("[SILENT]")
    sys.exit(0)

res = subprocess.run(
    [HERMES, "send", "-t", TARGET, "-f", BRIEF],
    capture_output=True,
    text=True,
    encoding="utf-8",
    errors="replace",
)
print("ENTREGA:", (res.stdout or "").strip()[:200] or (res.stderr or "").strip()[:200])
print("[SILENT]")
