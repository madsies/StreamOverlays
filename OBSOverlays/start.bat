@echo off
cd /d "%~dp0"

start "" http://localhost:4815/

node ./server/server.ts

pause