@echo off
chcp 65001 >nul
title 盐碱水体智能在线调控系统 - 启动器
cls

echo.
echo ════════════════════════════════════════════════════════
echo  🚀 盐碱水体智能在线调控系统 - 启动器
echo ════════════════════════════════════════════════════════
echo.

setlocal enabledelayedexpansion

set PROJECT_PATH=d:\Objection_detection\saline-water-dashboard
set BACKEND_PATH=!PROJECT_PATH!\backend
set FRONTEND_PATH=!PROJECT_PATH!\frontend

echo 📁 检查路径...
if exist "!BACKEND_PATH!" (echo ✅ 后端目录正确) else (echo ❌ 后端目录不存在 && pause && exit /b 1)
if exist "!FRONTEND_PATH!" (echo ✅ 前端目录正确) else (echo ❌ 前端目录不存在 && pause && exit /b 1)

echo.
echo 🔍 检查 Node.js...
node --version >nul 2>&1
if !ERRORLEVEL! EQU 0 (
  echo ✅ Node.js 已安装
  node --version
) else (
  echo ❌ 未检测到 Node.js，请先安装
  echo 下载：https://nodejs.org/
  pause
  exit /b 1
)

echo.
echo 👉 选择启动方式：
echo.
echo    1. 同时启动后端+前端（推荐）
echo    2. 仅启动后端
echo    3. 仅启动前端
echo    4. 退出
echo.

set /p choice="请输入 (1/2/3/4): "

if "!choice!"=="1" (
  echo.
  echo 🚀 启动后端...
  cd /d "!BACKEND_PATH!"
  start "Backend" cmd /k npm run dev
  
  timeout /t 4 /nobreak
  
  echo 🚀 启动前端...
  cd /d "!FRONTEND_PATH!"
  start "Frontend" cmd /k npm run dev
  
  echo.
  echo ✅ 应用已启动！
  echo.
  echo 📱 请打开浏览器访问：http://localhost:5173
  timeout /t 3
  
) else if "!choice!"=="2" (
  echo.
  echo 🚀 启动后端...
  cd /d "!BACKEND_PATH!"
  npm run dev
  
) else if "!choice!"=="3" (
  echo.
  echo 🚀 启动前端...
  cd /d "!FRONTEND_PATH!"
  npm run dev
  
) else if "!choice!"=="4" (
  echo 👋 退出
  exit /b 0
  
) else (
  echo.
  echo ❌ 无效选择！
  timeout /t 2
  goto :end
)

:end
pause
exit /b 0
