#!/bin/bash
# Install audit-my-app skill for Claude Code
# Usage: curl -sL https://raw.githubusercontent.com/brainit-consulting/DreamForgeSoftwareAgentSkills/main/install.sh | bash

set -e

REPO="brainit-consulting/DreamForgeSoftwareAgentSkills"
SKILL="audit-my-app"
DIR=".claude/skills/$SKILL"

echo "Installing $SKILL..."

mkdir -p "$DIR"

curl -sL "https://raw.githubusercontent.com/$REPO/main/skills/$SKILL/SKILL.md" -o "$DIR/SKILL.md"
curl -sL "https://raw.githubusercontent.com/$REPO/main/skills/$SKILL/AGENTS.md" -o "$DIR/AGENTS.md"

# Verify downloads
if [ ! -s "$DIR/SKILL.md" ]; then
  echo "Error: SKILL.md download failed or is empty"
  exit 1
fi

if [ ! -s "$DIR/AGENTS.md" ]; then
  echo "Error: AGENTS.md download failed or is empty"
  exit 1
fi

echo ""
echo "audit-my-app installed successfully!"
echo ""
echo "Next steps:"
echo "  1. Restart Claude Code (type /clear)"
echo "  2. Run /audit-my-app"
echo ""
