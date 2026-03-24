---
name: audit-my-app
description: Comprehensive application auditor — reads project context, asks what to audit (code quality, gaps, security, help modals, performance), suggests trusted skills from skills.sh to install, runs parallel audit agents, and produces a timestamped markdown report with severity ratings, mitigation suggestions, and estimated fix times. Works on any project.
argument-hint: "[all | quick | security | performance]"
disable-model-invocation: true
license: MIT
metadata:
  author: Emile du Toit
  organization: DreamForge Software
  version: "1.0.1"
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
- **Project name:** !`node -e "try{console.log(require('./package.json').name)}catch{console.log('unknown')}" 2>/dev/null || echo "unknown"`
- **Node version:** !`node --version 2>/dev/null || echo "not installed"`
- **Package manager:** !`(test -f bun.lockb && echo "bun") || (test -f pnpm-lock.yaml && echo "pnpm") || (test -f yarn.lock && echo "yarn") || (test -f package-lock.json && echo "npm") || echo "unknown"`
- **Framework:** !`node -e "try{const p=require('./package.json').dependencies||{};const d={...p,...(require('./package.json').devDependencies||{})};console.log(d.next?'Next.js '+d.next:d.nuxt?'Nuxt '+d.nuxt:d.svelte?'Svelte '+d.svelte:d.vue?'Vue '+d.vue:d.react?'React '+d.react:'unknown')}catch{console.log('unknown')}" 2>/dev/null || echo "unknown"`
- **Git status:** !`git rev-parse --is-inside-work-tree 2>/dev/null && echo "repo: $(git branch --show-current)" || echo "no git repo"`
- **Installed skills:** !`ls .claude/skills/ 2>/dev/null || echo "none"`
- **Previous audits:** !`ls AuditReports/audit-*.md 2>/dev/null | sort | tail -1 || echo "none"`

## Environment Tools (auto-detected)

- **Vercel CLI:** !`vercel --version 2>/dev/null || echo "not installed"`
- **GitHub CLI:** !`gh --version 2>/dev/null | head -1 || echo "not installed"`
- **TypeScript:** !`npx tsc --version 2>/dev/null || echo "not installed"`
- **Docker:** !`docker --version 2>/dev/null || echo "not installed"`
