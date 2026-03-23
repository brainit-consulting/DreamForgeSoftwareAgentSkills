---
name: audit-my-app
description: Comprehensive application auditor — reads project context, asks what to audit (code quality, gaps, security, help modals, performance), suggests trusted skills from skills.sh to install, runs parallel audit agents, and produces a timestamped markdown report with severity ratings, mitigation suggestions, and estimated fix times. Works on any project.
license: MIT
metadata:
  author: Emile du Toit
  organization: DreamForge Software
  version: "1.0.0"
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
