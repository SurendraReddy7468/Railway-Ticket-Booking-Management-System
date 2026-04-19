@echo off
echo Starting RailBook...

start cmd /k "cd /d D:\Project\railway-project\railway-backend && .\.venv\Scripts\activate.bat && uvicorn main:app --reload"

timeout /t 3

start cmd /k "cd /d D:\Project\railway-project\railway-frontend && npm run dev"

timeout /t 4

start "" "http://localhost:5173"

echo RailBook is running!