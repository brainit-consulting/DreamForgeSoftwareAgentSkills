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

## Project Context

When invoked, start by reading `package.json` and `README.md` to determine the project name, framework, dependencies, scripts, and build system. Check for previous audit reports in `AuditReports/`.
