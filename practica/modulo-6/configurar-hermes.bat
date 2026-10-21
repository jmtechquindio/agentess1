@echo off
setlocal enabledelayedexpansion
echo.
echo =============================
echo  Configuración automática de Hermes
echo =============================
echo.
set "HERMES_HOME=C:\Users\Carlos\AppData\Local\hermes"
set "HERMES_EXE=%HERMES_HOME%\hermes-agent\.hermes\bin\hermes.exe"
set "CRED_FILE=%HERMES_HOME%\.credentials"
set "ENV_FILE=%HERMES_HOME%\.env"
set "SESSIONS_FILE=%HERMES_HOME%\sessions\sessions.json"
:: --- Verificar que el binario de Hermes existe ---
if not exist "%HERMES_EXE%" (
    echo No encontré %HERMES_EXE%
    echo Revisa la ruta o ajusta la variable HERMES_HOME en el script.
    pause
    exit /b 1
)
:: ------------------------------------------------------------------
:: 1) Credenciales
:: ------------------------------------------------------------------
if not exist "%CRED_FILE%" (
    set /p EMAIL_PASSWORD=*** password de Gmail: "
    set /p TELEGRAM_BOT_TOKEN="Token del bot de Telegram: "
    set /p GOOGLE_API_KEY=*** de Google API (opcional, Enter para omitir): "
    echo EMAIL_PASSWORD=*** "%CRED_FILE%"
    echo TELEGRAM_BOT_TOKEN=%TELEGRAM_BOT_TOKEN%>> "%CRED_FILE%"
    echo GOOGLE_API_KEY=%GOOGL...Y%>> "%CRED_FILE%"
) else (
    for /f "tokens=2 delims==" %%a in ('findstr "^EMAIL_PASSWORD=*** "%CRED_FILE%"') do set EMAIL_PASSWORD=***
    for /f "tokens=2 delims==" %%a in ('findstr "^TELEGRAM_BOT_TOKEN=" "%CRED_FILE%"') do set TELEGRAM_BOT_TOKEN=%%a
    for /f "tokens=2 delims==" %%a in ('findstr "^GOOGLE_API_KEY=*** "%CRED_FILE%"') do set GOOGLE_API_KEY=***
)
echo Credenciales listas.
:: ------------------------------------------------------------------
:: 2) Cerrar sesiones
:: ------------------------------------------------------------------
if exist "%SESSIONS_FILE%" (
    copy "%SESSIONS_FILE%" "%SESSIONS_FILE%.bak" >nul 2>&1
    del "%SESSIONS_FILE%" >nul 2>&1
)
:: ------------------------------------------------------------------
:: 3) Escribir .env
:: ------------------------------------------------------------------
echo EMAIL_ADDRESS=your_email@gmail.com> "%ENV_FILE%"
echo EMAIL_PASSWORD=%EMAIL...D%>> "%ENV_FILE%"
echo EMAIL_IMAP_HOST=imap.gmail.com>> "%ENV_FILE%"
echo EMAIL_SMTP_HOST=smtp.gmail.com>> "%ENV_FILE%"
echo EMAIL_IMAP_PORT=993>> "%ENV_FILE%"
echo EMAIL_SMTP_PORT=587>> "%ENV_FILE%"
echo EMAIL_ALLOWED_USERS=your_email@gmail.com>> "%ENV_FILE%"
echo TELEGRAM_BOT_TOKEN=%TELEGRAM_BOT_TOKEN%>> "%ENV_FILE%"
echo TELEGRAM_HOME_CHANNEL=your_telegram_chat_id_here>> "%ENV_FILE%"
echo TELEGRAM_HOME_CHANNEL_THREAD_ID=>> "%ENV_FILE%"
echo GOOGLE_API_KEY=%GOOGL...Y%>> "%ENV_FILE%"
:: ------------------------------------------------------------------
:: 4) Configurar el modelo: Ollama (llama3.2:3b)
:: ------------------------------------------------------------------
%HERMES_EXE% config set model.provider custom
%HERMES_EXE% config set model.base_url http://localhost:11434/v1
%HERMES_EXE% config set model.default llama3.2:3b
:: ------------------------------------------------------------------
:: 5) Reiniciar el gateway
:: ------------------------------------------------------------------
%HERMES_EXE% gateway restart
echo.
echo ✅ Configuración aplicada. El modelo ahora usa Ollama local y el gateway se reinició.
echo Puedes mandar un mensaje a @jorarimobot_bot para probar.
pause