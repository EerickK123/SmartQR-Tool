@echo off
title SmartQR Tool Launcher

echo Iniciando Backend...
start cmd /k "cd /d C:\Users\usuario\Documents\SmartQR-Tool\backend && npm run dev"

echo Iniciando Frontend...
start cmd /k "cd /d C:\Users\usuario\Documents\SmartQR-Tool\frontend && npm run dev"

echo Backend y Frontend iniciados.
