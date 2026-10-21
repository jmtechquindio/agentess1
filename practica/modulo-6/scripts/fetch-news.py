"""Pre-run script: fetches real news from Google News RSS.

Writes the raw items to a JSON file and prints them so the cron agent
has REAL data (title, date, source, link) to format. The agent must not
invent anything: everything it needs is in this output.
"""

import json
import os
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}

QUERIES = {
    "Inteligencia artificial": "inteligencia+artificial+when:2d",
    "Avances tecnologicos": "tecnologia+avances+when:2d",
    "IA para productividad": "herramientas+IA+productividad+when:2d",
}

OUT_DIR = os.path.join(
    os.path.expanduser("~"), "AppData", "Local", "hermes", "cron", "newsdata"
)
os.makedirs(OUT_DIR, exist_ok=True)


def fetch(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "ignore")


def clean(text):
    if not text:
        return ""
    return " ".join(text.split())


def ascii_safe(text):
    import unicodedata

    text = (text or "").replace("¡", "").replace("¿", "")
    norm = unicodedata.normalize("NFKD", text)
    return norm.encode("ascii", "ignore").decode("ascii")


def main():
    all_items = []
    for tema, q in QUERIES.items():
        url = (
            "https://news.google.com/rss/search?q="
            + q
            + "&hl=es-419&gl=ES&ceid=ES:es-419"
        )
        try:
            root = ET.fromstring(fetch(url))
        except Exception as e:
            print(f"[aviso] fallo feed '{tema}': {e}")
            continue
        for it in root.findall(".//item")[:6]:
            title = clean(it.findtext("title"))
            link = clean(it.findtext("link"))
            pub = clean(it.findtext("pubDate"))
            source = clean(it.findtext("source"))
            if not title or not link:
                continue
            all_items.append(
                {
                    "tema": tema,
                    "titulo": title,
                    "fuente": source or "Google News",
                    "fecha": pub,
                    "enlace": link,
                }
            )

    path = os.path.join(OUT_DIR, "noticias-hoy.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(all_items, f, ensure_ascii=False, indent=2)

    # Brief base con datos EXACTOS (el agente solo agrega "Por que te interesa")
    from email.utils import parsedate_to_datetime

    hoy = datetime.now().strftime("%d/%m/%Y")
    seleccion = all_items[:5]
    lineas = [f"# Brief de noticias - {hoy}", ""]
    if not seleccion:
        lineas.append("Sin noticias nuevas en este momento.")
    for i, n in enumerate(seleccion, 1):
        try:
            fecha = parsedate_to_datetime(n["fecha"]).strftime("%d/%m/%Y")
        except Exception:
            fecha = n["fecha"]
        lineas.append(f"{i}. {n['titulo']}")
        lineas.append(f"   - Fecha: {fecha}")
        lineas.append(f"   - Fuente: {n['fuente']}")
        lineas.append(f"   - Enlace: {n['enlace']}")
        lineas.append(f"   - Por que te interesa: {n['tema']}")
        lineas.append("")
    brief = "\n".join(lineas).strip()
    brief_path = os.path.join(OUT_DIR, "brief-noticias.md")
    with open(brief_path, "w", encoding="utf-8") as f:
        f.write(brief)

    print(f"NOTICIAS REALES OBTENIDAS: {len(all_items)}")
    print("Archivo de datos:", path)
    print()
    print("Brief base (NO cambies titulos, fechas, fuentes ni enlaces):")
    print()
    print(ascii_safe(brief))


if __name__ == "__main__":
    main()
