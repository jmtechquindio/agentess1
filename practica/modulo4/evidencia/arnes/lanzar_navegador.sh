#!/bin/bash
# Lanzar navegador con perfil DESECHABLE.
# La extension se carga despues por CDP (Extensions.loadUnpacked):
# Chrome 137+ ignora --load-extension salvo con --disable-extensions-except,
# y el perfil no persiste extensions.settings hasta cerrar.
# No toca el perfil real del usuario.
set -u

NAV="$1"          # chrome | edge
WSLIP=$(cat /tmp/opencode/wslip.txt)

case "$NAV" in
  chrome)
    EXE="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"
    PERFIL='C:\tmp\mod4-prueba\perfil-chrome'
    PUERTO=9222
    ;;
  edge)
    EXE="/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
    PERFIL='C:\tmp\mod4-prueba\perfil-edge'
    PUERTO=9333
    ;;
  *)
    echo "navegador no valido: $NAV"; exit 2
    ;;
esac

RESOLVER="MAP ferricentro.com ${WSLIP}:8765, MAP www.ferricentro.com ${WSLIP}:8765, MAP sitio-ajeno-de-prueba.test ${WSLIP}:8765"

nohup "$EXE" \
  "--user-data-dir=$PERFIL" \
  "--remote-debugging-port=$PUERTO" \
  "--remote-debugging-address=0.0.0.0" \
  "--remote-allow-origins=http://127.0.0.1:$PUERTO" \
  "--host-resolver-rules=$RESOLVER" \
  "--ignore-certificate-errors" \
  "--no-first-run" \
  "--no-default-browser-check" \
  "--disable-features=Translate,OptimizationHints" \
  "--headless=new" \
  "about:blank" > "/mnt/c/tmp/mod4-prueba/${NAV}.log" 2>&1 &

echo "lanzado $NAV en puerto $PUERTO (perfil desechable: $PERFIL)"