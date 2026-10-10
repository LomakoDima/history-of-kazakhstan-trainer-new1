@echo off
title History of Kazakhstan Trainer v5
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Install Node.js 20 or newer, then run this file again.
  pause
  exit /b 1
)
if not exist "node_modules\@anthropic-ai\sdk" (
  echo Installing dependencies...
  call npm install --no-audit --no-fund
  if errorlevel 1 (
    echo npm install failed.
    pause
    exit /b 1
  )
)
if exist ".env" (
  echo Loading settings from .env...
  node --env-file-if-exists=.env server.mjs
  pause
  exit /b %errorlevel%
)

if "%ANTHROPIC_API_KEY%"=="" (
  echo Enter your Anthropic API key. It will only remain in this terminal session.
  set /p ANTHROPIC_API_KEY=Anthropic API key:
)
if "%ANTHROPIC_API_KEY%"=="" (
  echo No API key was entered. The trainer will start without AI review.
)
node server.mjs
pause
