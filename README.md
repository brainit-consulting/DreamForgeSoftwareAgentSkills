# DreamForge Software Agent Skills

A collection of AI agent skills by [DreamForge Software](https://dreamforgesoftware.vercel.app/). These skills extend Claude Code, OpenCode, Codex, Cursor, and other AI coding agents with specialized capabilities.

## Available Skills

### audit-my-app

Comprehensive application auditor that reads your project context, asks what to audit (code quality, gaps, security, help modals, performance), suggests trusted skills to install, runs parallel audit agents, and produces a timestamped markdown report with severity ratings, mitigation suggestions, and estimated fix times.

**Works on any project** — detects your framework, database, auth, and deployment automatically via dynamic context injection.

**Features:**
- Multi-category audit: code quality, workflow gaps, security (OWASP), help docs, performance
- Dynamic context injection — auto-detects project stack, tools, and environment at startup
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

### Option 1: Skills.sh (works with Claude Code, Cursor, Codex, OpenCode, and more)

```bash
npx skills add brainit-consulting/DreamForgeSoftwareAgentSkills
```

Or install a specific skill:

```bash
npx skills add brainit-consulting/DreamForgeSoftwareAgentSkills --skill audit-my-app
```

### Option 2: Claude Code Plugin (official marketplace)

```bash
claude --plugin-dir ./DreamForgeSoftwareAgentSkills
```

Or install from the official marketplace (once published):

```bash
claude plugin install dreamforge-audit@claude-plugins-official
```

The skill will be available as `/dreamforge-audit:audit-my-app`.

## Usage

After installation, invoke the skill:

```
/audit-my-app                # Full guided audit with interview
/audit-my-app all            # Audit everything, skip interview
/audit-my-app quick          # Code quality + security only (fastest)
/audit-my-app security       # Security audit only
/audit-my-app performance    # Performance audit only
```

### What each mode does

| Mode | Categories | Interview | Best for |
|------|-----------|-----------|----------|
| `/audit-my-app` | You choose | Yes | First-time audit, selective focus |
| `/audit-my-app all` | All 5 | Skipped | Comprehensive sweep |
| `/audit-my-app quick` | Code Quality + Security | Skipped | Fast pre-deploy check |
| `/audit-my-app security` | Security only | Skipped | OWASP/auth/XSS focused review |
| `/audit-my-app performance` | Performance only | Skipped | Bundle size, caching, waterfalls |

### Audit Categories

| Category | What it checks |
|----------|---------------|
| Code Quality | Unused imports, dead code, type safety, error handling, N+1 queries |
| Workflow Gaps | Broken flows, incomplete features, TODO comments, dead UI elements |
| Help Modals / Docs | Verify docs match actual features, find undocumented features |
| Security | OWASP Top 10, auth, authorization, XSS, CSRF, data leaks |
| Performance | Waterfalls, bundle size, caching, re-renders, query efficiency |

### Report Output

Reports are saved to `AuditReports/audit-YYYY-MM-DD-HHmm.md` with:

- Executive summary (issue counts by severity)
- Detailed findings with file paths, line numbers, and fix instructions
- Effort estimates (Quick ~5min, Medium ~30min, Complex ~2+hrs)
- Mitigation plan (Immediate / Short-term / Future)
- Changes since last audit (if a previous report exists)

### Safety Rules

- No regressions — TypeScript check before every commit
- No production data destruction without explicit approval
- No destructive git operations without approval
- Tests run before and after fixes
- Never commits secrets without approval

## Development

### Evals

This skill includes test cases in `skills/audit-my-app/evals/evals.json` compatible with the official [skill-creator](https://github.com/anthropics/skills) plugin. To run evals:

1. Install the skill-creator: `npx skills add https://github.com/anthropics/skills --skill skill-creator`
2. Run `/skill-creator` and point it at the existing skill and evals

### Dual-format Support

This repo supports both distribution formats:

| Format | Files used | Install method |
|--------|-----------|---------------|
| **Skills.sh** | `SKILL.md`, `AGENTS.md`, `metadata.json` | `npx skills add ...` |
| **Claude Code Plugin** | `.claude-plugin/plugin.json`, `skills/*/SKILL.md` | `claude plugin install ...` |

## Author

**Emile du Toit**
[DreamForge Software](https://dreamforgesoftware.vercel.app/)

## License

MIT
