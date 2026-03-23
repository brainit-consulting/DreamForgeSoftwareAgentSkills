# DreamForge Software Agent Skills

A collection of AI agent skills by [DreamForge Software](https://dreamforgesoftware.vercel.app/). These skills extend Claude Code, OpenCode, Codex, Cursor, and other AI coding agents with specialized capabilities.

## Available Skills

### audit-my-app

Comprehensive application auditor that reads your project context, asks what to audit (code quality, gaps, security, help modals, performance), suggests trusted skills to install, runs parallel audit agents, and produces a timestamped markdown report with severity ratings, mitigation suggestions, and estimated fix times.

**Works on any project** — detects your framework, database, auth, and deployment automatically.

**Features:**
- Multi-category audit: code quality, workflow gaps, security (OWASP), help docs, performance
- Parallel agent execution for speed
- Timestamped reports with executive summary
- Previous audit comparison (shows what was fixed, what's new)
- Mitigation plan with effort estimates
- Safety guardrails (no regressions, no data destruction)
- Dependency vulnerability scanning (`npm audit`)
- Schema drift detection (Drizzle/Prisma)
- Lighthouse performance budget checks
- Claude Code Agent Teams support for enhanced parallel auditing
- Vercel CLI, GitHub CLI, and git repo setup assistance

## Install

```bash
npx skills add brainit-consulting/DreamForgeSoftwareAgentSkills
```

Or install a specific skill:

```bash
npx skills add brainit-consulting/DreamForgeSoftwareAgentSkills --skill audit-my-app
```

## Usage

After installation, invoke the skill:

```
/audit-my-app          # Full guided audit
/audit-my-app all      # Audit everything, skip interview
/audit-my-app quick    # Code quality + security only
/audit-my-app security # Security audit only
```

## Author

**Emile du Toit**
[DreamForge Software](https://dreamforgesoftware.vercel.app/)

## License

MIT
