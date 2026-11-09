@echo off
rem Starts the dedicated Flow Brave (own profile) with remote debugging on 9333, if not already up.
curl -s --max-time 2 http://127.0.0.1:9333/json/version >nul 2>&1 && exit /b 0
start "" "C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe" --user-data-dir="C:\Users\Mahmoud\.google-flow-mcp\brave-flow" --remote-debugging-port=9333 --no-first-run https://labs.google/fx/tools/flow
ping -n 7 127.0.0.1 >nul
