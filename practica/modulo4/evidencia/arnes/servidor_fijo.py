import http.server, ssl, sys, os

from http.server import SimpleHTTPRequestHandler

HTML = "/mnt/c/practica/modulo4/entregable-modulo-04/evidencia/ferricentro-herramienta-manual-observado.html"
BASE = SimpleHTTPRequestHandler

PORT = int(sys.argv[1])


class H(BASE):
    def do_GET(self):
        if self.path.rstrip("/") in ("/productos/herramienta-manual", ""):
            with open(HTML, "rb") as f:
                body = f.read()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            sys.stderr.write("servido: /productos/herramienta-manual (%d bytes)\n" % len(body))
            sys.stderr.flush()
            return
        self.send_response(404)
        self.end_headers()

    def log_message(self, *a):
        pass


ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ctx.load_cert_chain("/mnt/c/tmp/mod4-prueba/cert.pem", "/mnt/c/tmp/mod4-prueba/key.pem")
srv = http.server.HTTPServer(("0.0.0.0", PORT), H)
srv.socket = ctx.wrap_socket(srv.socket, server_side=True)
sys.stderr.write("HTTPS en 0.0.0.0:%d\n" % PORT)
sys.stderr.flush()
srv.serve_forever()