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

### Option 1: Claude Code Plugin (Recommended)

Add the DreamForge marketplace and install the plugin:

```bash
/plugin marketplace add brainit-consulting/DreamForgeSoftwareAgentSkills
/plugin install dreamforge-audit
```

The skill will be available as `/dreamforge-audit:audit-my-app`.

> **Want wider reach?** You can also submit plugins to the [official Anthropic marketplace](https://claude.ai/settings/plugins/submit).

### Option 2: Manual Install (Claude Code)

Download the skill files directly into your project:

**macOS / Linux / Git Bash:**

```bash
mkdir -p .claude/skills/audit-my-app
curl -sL https://raw.githubusercontent.com/brainit-consulting/DreamForgeSoftwareAgentSkills/main/skills/audit-my-app/SKILL.md -o .claude/skills/audit-my-app/SKILL.md
curl -sL https://raw.githubusercontent.com/brainit-consulting/DreamForgeSoftwareAgentSkills/main/skills/audit-my-app/AGENTS.md -o .claude/skills/audit-my-app/AGENTS.md
```

**Windows (CMD / PowerShell):**

```cmd
mkdir .claude\skills\audit-my-app
curl -sL https://raw.githubusercontent.com/brainit-consulting/DreamForgeSoftwareAgentSkills/main/skills/audit-my-app/SKILL.md -o .claude\skills\audit-my-app\SKILL.md
curl -sL https://raw.githubusercontent.com/brainit-consulting/DreamForgeSoftwareAgentSkills/main/skills/audit-my-app/AGENTS.md -o .claude\skills\audit-my-app\AGENTS.md
```

Restart Claude Code — the skill will appear as `/audit-my-app`.

### Option 3: Skills.sh (Cursor, Codex, OpenCode, and more)

```bash
npx skills add brainit-consulting/DreamForgeSoftwareAgentSkills --skill audit-my-app
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
| Security | [OWASP Top 10](https://owasp.org/www-project-top-ten/), auth, authorization, XSS, CSRF, data leaks |
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

## Demo App — Try the Skill

This repo includes a **Next.js demo app** (`demo-app/`) — a newsletter signup page for [DreamForge Academy](https://dreamforge-academy.vercel.app/) that doubles as a test fixture for the audit skill.

```bash
cd demo-app
npm install
npm run dev
```

Then run `/audit-my-app all` against it to see the skill in action. The app intentionally has auditable gaps (file-based storage, no rate limiting, no email confirmation) so the skill produces meaningful findings.

**Tech stack:** Next.js 16.2.1, Tailwind CSS 4, shadcn/ui, Zod 4, next-themes

See [demo-app/README.md](demo-app/README.md) for full details and instructions to upgrade it into a production newsletter with Resend or ConvertKit.

### Want to evaluate the skill?

Install the official [skill-creator](https://github.com/anthropics/skills) to run automated evals, benchmarks, and variance analysis against the skill:

```bash
npx skills add https://github.com/anthropics/skills --skill skill-creator
```

Then run `/skill-creator` and point it at `skills/audit-my-app/` with evals in `evals/evals.json`. It will run the test cases, grade assertions, produce a benchmark report, and launch an interactive viewer for qualitative review.

## Development

### Evals

This skill includes 6 test cases in `skills/audit-my-app/evals/evals.json` compatible with the skill-creator. They cover all invocation modes (`all`, `quick`, `security`, `performance`, natural language trigger) and verify report structure, category coverage, severity ratings, and attribution.

### Distribution Formats

| Format | Install method | Best for |
| ------ | -------------- | -------- |
| **Plugin Marketplace** | `/plugin marketplace add` + `/plugin install` | Claude Code (official) |
| **Manual Install** | `curl` to `.claude/skills/<name>/` | Claude Code (quick setup) |
| **Skills.sh** | `npx skills add ...` | Cursor, Codex, OpenCode |

## Author

**Emile du Toit**
[DreamForge Software](https://dreamforgesoftware.vercel.app/)

## License

MIT
