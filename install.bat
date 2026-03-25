@echo off
REM Install audit-my-app skill for Claude Code
REM Usage: curl -sL https://raw.githubusercontent.com/brainit-consulting/DreamForgeSoftwareAgentSkills/main/install.bat -o install.bat && install.bat

set REPO=brainit-consulting/DreamForgeSoftwareAgentSkills
set SKILL=audit-my-app
set DIR=.claude\skills\%SKILL%

echo Installing %SKILL%...

if not exist "%DIR%" mkdir "%DIR%"

curl -sL "https://raw.githubusercontent.com/%REPO%/main/skills/%SKILL%/SKILL.md" -o "%DIR%\SKILL.md"
curl -sL "https://raw.githubusercontent.com/%REPO%/main/skills/%SKILL%/AGENTS.md" -o "%DIR%\AGENTS.md"

REM Verify downloads
if not exist "%DIR%\SKILL.md" (
  echo Error: SKILL.md download failed
  exit /b 1
)

if not exist "%DIR%\AGENTS.md" (
  echo Error: AGENTS.md download failed
  exit /b 1
)

echo.
echo audit-my-app installed successfully!
echo.
echo Next steps:
echo   1. Restart Claude Code (type /clear)
echo   2. Run /audit-my-app
echo.

REM Clean up this installer
del "%~f0"
