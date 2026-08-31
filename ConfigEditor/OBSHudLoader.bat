@echo off
cd /d "%~dp0"

setlocal

echo ================================
echo      madsies' OBS HUD Loader
echo ================================
echo.

where node >nul 2>&1

if %ERRORLEVEL% NEQ 0 (
    echo Node.js is not installed.
    echo Installing Node.js...

    winget install OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements

    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo Failed to install Node.js.
        echo Please install Node.js manually.
        pause
        exit /b 1
    )

    echo.
    echo Node.js installed.
    echo Please restart this launcher so Windows refreshes PATH.
    pause
    exit /b 0
)
echo Node.js found:
node --version
echo.
echo Loading Config...
echo.


node OBSHudLoader.js

pause