# Audit My App

**Created by:** Emile du Toit
**© 2026 DreamForge Software** | [dreamforgesoftware.vercel.app](https://dreamforgesoftware.vercel.app/)

## What This Skill Does

This skill runs a full audit of your application. In plain English:

1. **Reads your project** — looks at your README, package.json, and codebase to understand what you've built
2. **Asks what you want checked** — code quality, workflow gaps, security, help docs, performance, or all
3. **Suggests helpful tools** — checks if you're missing useful CLI tools or Claude skills, offers to install them
4. **Runs automated scans** — `npm audit` for vulnerabilities, schema drift detection, Lighthouse checks
5. **Runs the audit** — launches multiple agents in parallel, each focused on a different area
6. **Produces a report** — timestamped markdown file with every issue, ranked by severity, with fix instructions and time estimates
7. **Compares to past audits** — shows what was fixed and what's new since last run
8. **Offers to fix everything** — with safety guardrails (no regressions, no data loss, checkpoint commits)

## Install

### Claude Code (recommended)

Copy the skill directly into your project's `.claude/skills/` directory:

```bash
mkdir -p .claude/skills/audit-my-app
curl -sL https://raw.githubusercontent.com/brainit-consulting/DreamForgeSoftwareAgentSkills/main/skills/audit-my-app/SKILL.md -o .claude/skills/audit-my-app/SKILL.md
curl -sL https://raw.githubusercontent.com/brainit-consulting/DreamForgeSoftwareAgentSkills/main/skills/audit-my-app/AGENTS.md -o .claude/skills/audit-my-app/AGENTS.md
```

Restart Claude Code — the skill will appear as `/audit-my-app`.

### Skills.sh (Cursor, Codex, OpenCode, and more)

```bash
npx skills add brainit-consulting/DreamForgeSoftwareAgentSkills --skill audit-my-app
```

> **Note for Claude Code users:** `npx skills add` installs to `.agents/skills/`, but Claude Code discovers skills from `.claude/skills/`. After installing, copy the skill:
>
> ```bash
> mkdir -p .claude/skills/audit-my-app
> cp .agents/skills/audit-my-app/* .claude/skills/audit-my-app/
> ```

## Usage

```
/audit-my-app          # Full guided audit
/audit-my-app all      # Audit everything, skip interview
/audit-my-app quick    # Code quality + security only (fastest)
/audit-my-app security # Security audit only
/audit-my-app performance # Performance audit only
```

## Audit Categories

| Category | What it checks |
|----------|---------------|
| Code Quality | Unused imports, dead code, type safety, error handling, N+1 queries |
| Workflow Gaps | Broken flows, incomplete features, TODO comments, dead UI elements |
| Help Modals | Verify docs match actual features, find undocumented features |
| Security | OWASP Top 10, auth, authorization, XSS, CSRF, data leaks |
| Performance | Waterfalls, bundle size, caching, re-renders, query efficiency |

## Report Output

Reports are saved to `AuditReports/audit-YYYY-MM-DD-HHmm.md` with:

- Executive summary (issue counts by severity)
- Detailed findings with file paths, line numbers, and fix instructions
- Effort estimates (Quick ~5min, Medium ~30min, Complex ~2+hrs)
- Mitigation plan (Immediate / Short-term / Future)
- Changes since last audit

## Safety Rules

- No regressions — TypeScript check before every commit
- No production data destruction without explicit approval
- No destructive git operations without approval
- Tests run before and after fixes
- Rollback plan for complex changes
- Never commits secrets without approval

## Requirements

- Works on any project (Node.js, Python, Go, etc.)
- Best with Next.js/React projects (leverages react-best-practices skill)
- Optional: Vercel CLI, GitHub CLI, Claude Code Agent Teams

## License

MIT
