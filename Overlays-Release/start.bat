@echo off
cd /d "%~dp0"

setlocal

echo ================================
echo      madsies' Broadcast Tool
echo ================================
echo.

where node >nul 2>&1

if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed.
    echo Installing Node.js...
    echo.

    winget install OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements

    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo Failed to install Node.js.
        pause
        exit /b 1
    )

    set "PATH=%PATH%;%ProgramFiles%\nodejs"
)

echo Node.js:
node --version
echo.

if not exist "node_modules\express" (
    echo Installing required dependencies...
    echo.

    call npm install express ws

    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo Failed to install dependencies.
        pause
        exit /b 1
    )
)

echo Starting Broadcast Tool...
echo.

start "" "http://localhost:4815/"

node server.js

pause