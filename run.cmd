@echo off
echo Starting ScalesAPIAsinc...
echo Activating venv...
call %~dp0\venv\Scripts\activate.bat
echo Venv activated successfully
cd %~dp0\api
call uvicorn main:app --host localhost --port 8080
pause