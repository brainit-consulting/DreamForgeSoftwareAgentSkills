---
name: audit-my-app
description: Comprehensive application auditor that reads project context, asks what to audit, runs parallel audit agents, and produces a timestamped markdown report with severity ratings and fix estimates.
argument-hint: "[all | quick | security | performance]"
disable-model-invocation: true
---

# Audit My App

Comprehensive application auditor for AI coding agents. Reads your project, asks what to audit, runs parallel agents, and produces a professional report.

## When to Apply

Use this skill when:
- You want a full code quality, security, or performance audit
- You need to find workflow gaps and incomplete implementations
- You want to verify help docs match actual features
- You're preparing for production deployment
- You want a structured mitigation plan with effort estimates

## Invocation

- `/audit-my-app` — full guided audit
- `/audit-my-app all` — audit everything, skip interview
- `/audit-my-app quick` — code quality + security only
- `/audit-my-app security` — security audit only
- `/audit-my-app performance` — performance audit only

## Project Context (auto-injected)

- **Working directory:** !`pwd`
- **Project name:** !`node -e "try{console.log(require('./package.json').name)}catch{console.log('unknown')}"`
- **Node version:** !`node --version`
- **Package manager:** !`node -e "const f=require('fs').existsSync;console.log(f('bun.lockb')?'bun':f('pnpm-lock.yaml')?'pnpm':f('yarn.lock')?'yarn':f('package-lock.json')?'npm':'unknown')"`
- **Framework:** !`node -e "try{const d={...require('./package.json').dependencies,...require('./package.json').devDependencies};console.log(d.next?'Next.js '+d.next:d.react?'React '+d.react:'unknown')}catch{console.log('unknown')}"`
- **Git branch:** !`git branch --show-current`
- **Git recent:** !`git log --oneline -3`
- **Installed skills:** !`ls .claude/skills/`
