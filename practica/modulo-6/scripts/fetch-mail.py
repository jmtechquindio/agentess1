"""Pre-run script: lee los correos importantes de Gmail (SOLO LECTURA).

Reglas ESTRICTAS:
- Solo usa IMAP en modo lectura (select readonly=True, PEEK).
- NUNCA envia, borra, mueve a papelera, marca spam ni modifica flags.
- NUNCA imprime la contrasena.

Salida: lista de correos no leidos recientes con remitente, asunto y fecha.
"""

import email
import imaplib
import json
import os
import re
import sys
from email.header import decode_header, make_header
from email.utils import parsedate_to_datetime

try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

IMAP_HOST = "imap.gmail.com"
IMAP_PORT = 993


def load_env():
    base = os.environ.get("LOCALAPPDATA") or os.path.join(
        os.environ.get("USERPROFILE", os.path.expanduser("~")), "AppData", "Local"
    )
    path = os.path.join(base, "hermes", ".env")
    env = {}
    if not os.path.exists(path):
        return env
    with open(path, "r", encoding="utf-8-sig", errors="ignore") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    return env


def dec(value):
    if not value:
        return ""
    try:
        return str(make_header(decode_header(value)))
    except Exception:
        return value


def clean(text):
    return " ".join((text or "").split())


# Patrones de remitentes/asuntos que NO son importantes (spam, ads, ruido)
EXCLUDE_FROM = (
    "chaturbate",
    "no-reply@e.udemymail.com",
    "email.claro.com.co",
    "welcome.tripleten.com",
    "push.infojobs.net",
    "jobalert.indeed.com",
    "empleos_co@computrabajo.com",
    "codigofacilito.com",
    "taskade.com",
)

IMPORTANT_HINTS = (
    "alerta de seguridad",
    "security alert",
    "verificacion",
    "verificación",
    "factura",
    "pago",
    "banco",
    "vencimiento",
    "suspension",
    "suspensión",
    "importante",
    "urgente",
    "recordatorio de pago",
)

# Emojis y simbolos no-ASCII que ensucian el texto para el modelo
EMOJI_RE = re.compile(
    "[\U0001F000-\U0001FAFF\U00002600-\U000027BF\U0001F1E6-\U0001F1FF\uFE0F\u21AF]+"
)


def strip_noise(text):
    text = EMOJI_RE.sub("", text or "")
    return " ".join(text.split()).strip()


def ascii_safe(text):
    import unicodedata

    text = (text or "").replace("¡", "").replace("¿", "")
    norm = unicodedata.normalize("NFKD", text)
    return norm.encode("ascii", "ignore").decode("ascii")


def is_important(remitente, asunto):
    rl = (remitente or "").lower()
    al = (asunto or "").lower()
    if any(bad in rl for bad in EXCLUDE_FROM):
        return False
    return any(h in al for h in IMPORTANT_HINTS) or any(
        k in rl
        for k in ("banco", "bank", "google <no-reply@accounts", "paypal", "facturacion")
    )


def main():
    env = load_env()
    user = env.get("EMAIL_ADDRESS", "")
    pw = (env.get("EMAIL_PASSWORD", "") or "").replace(" ", "")
    if not user or not pw:
        print("CONFIG ERROR: faltan EMAIL_ADDRESS o EMAIL_PASSWORD en .env")
        return

    try:
        m = imaplib.IMAP4_SSL(IMAP_HOST, IMAP_PORT)
    except Exception as e:
        print(f"CONEXION ERROR: {e}")
        return

    try:
        m.login(user, pw)
    except Exception as e:
        print(f"LOGIN ERROR: {str(e)[:150]}")
        try:
            m.logout()
        except Exception:
            pass
        return

    try:
        m.select("INBOX", readonly=True)
        typ, data = m.search(None, "UNSEEN")
        ids = data[0].split() if data and data[0] else []
        recent = ids[-40:][::-1]
        correos = []
        vistos = set()
        for i in recent:
            typ, msg_data = m.fetch(i, "(BODY.PEEK[HEADER.FIELDS (FROM SUBJECT DATE)])")
            if not msg_data or not msg_data[0]:
                continue
            raw = msg_data[0][1]
            msg = email.message_from_bytes(raw)
            fecha = clean(dec(msg.get("Date")))
            try:
                fecha = parsedate_to_datetime(msg.get("Date")).strftime("%d/%m/%Y %H:%M")
            except Exception:
                pass
            de = clean(dec(msg.get("From")))
            asunto = strip_noise(clean(dec(msg.get("Subject"))))
            if not is_important(de, asunto):
                continue
            clave = (de, asunto)
            if clave in vistos:
                continue
            vistos.add(clave)
            correos.append({"de": de, "asunto": asunto, "fecha": fecha})

        # Brief base con datos EXACTOS (el agente solo mejora la linea de relevancia)
        from datetime import datetime

        hoy = datetime.now().strftime("%d/%m/%Y")
        lineas = [f"# Resumen de correos importantes - {hoy}", ""]
        if not correos:
            lineas.append("Sin correos importantes nuevos.")
        for n, c in enumerate(correos, 1):
            lineas.append(f"{n}. {c['asunto']}")
            lineas.append(f"   - De: {c['de']}")
            lineas.append(f"   - Fecha: {c['fecha']}")
            lineas.append(f"   - Relevancia: revisar")
            lineas.append("")
        brief = "\n".join(lineas).strip()
        brief_path = os.path.join(
            os.environ.get("LOCALAPPDATA", os.path.expanduser("~")),
            "hermes",
            "cron",
            "newsdata",
            "brief-correo.md",
        )
        with open(brief_path, "w", encoding="utf-8") as f:
            f.write(brief)
        print(f"CORREOS IMPORTANTES (no leidos): {len(correos)}")
        print("Cuenta:", user)
        print()
        print("Brief base (NO cambies asuntos, remitentes ni fechas):")
        print()
        print(ascii_safe(brief))
        out = os.path.join(
            os.environ.get("LOCALAPPDATA", os.path.expanduser("~")),
            "hermes",
            "cron",
            "newsdata",
            "correos-importantes.json",
        )
        os.makedirs(os.path.dirname(out), exist_ok=True)
        with open(out, "w", encoding="utf-8") as f:
            json.dump(correos, f, ensure_ascii=False, indent=2)
    finally:
        try:
            m.logout()
        except Exception:
            pass


if __name__ == "__main__":
    main()
