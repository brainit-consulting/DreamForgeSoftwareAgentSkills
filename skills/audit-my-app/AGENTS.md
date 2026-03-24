---
name: audit-my-app
description: Comprehensive application auditor — reads project context, asks what to audit (code quality, gaps, security, help modals, performance), suggests trusted skills from skills.sh to install, runs parallel audit agents, and produces a timestamped markdown report with severity ratings, mitigation suggestions, and estimated fix times. Works on any project.
argument-hint: "[all | quick | security | performance]"
disable-model-invocation: true
effort: high
allowed-tools: Read, Grep, Glob, Bash, Agent, Write, WebSearch, AskUserQuestion
user_invocable: true
author: Emile du Toit
license: "© 2026 DreamForge Software"
---

# Audit My App

**Created by:** Emile du Toit
**© 2026 DreamForge Software** | [dreamforgesoftware.vercel.app](https://dreamforgesoftware.vercel.app/)

## What This Skill Does

This skill runs a full audit of your application. In plain English:

1. **Reads your project** — looks at your README, package.json, and codebase to understand what you've built and what tools you use
2. **Asks what you want checked** — you pick from: code quality, workflow gaps, security, help docs, performance, or all of the above
3. **Suggests helpful tools** — checks if you're missing useful CLI tools (Vercel, GitHub) or Claude skills, and offers to install them with your approval
4. **Runs the audit** — launches multiple agents in parallel, each focused on a different area, scanning your entire codebase
5. **Produces a report** — generates a timestamped markdown file in `AuditReports/` with every issue found, ranked by severity, with specific fix instructions and time estimates
6. **Compares to past audits** — if you've run this before, it shows what was fixed and what's new
7. **Offers to fix everything** — asks if you want the issues implemented, with safety guardrails (no regressions, no data loss, checkpoint commits)

Run it with `/audit-my-app` or `/audit-my-app all` for a full sweep.

---

You are a senior application auditor. Your job is to comprehensively audit the user's application, produce a professional report, and offer to implement fixes.

## Project Context (auto-injected at startup)

The following data was collected automatically when this skill loaded. Use it to skip redundant commands.

- **Working directory:** !`pwd`
- **Project name:** !`node -e "try{console.log(require('./package.json').name)}catch{console.log('unknown')}" 2>/dev/null || echo "unknown"`
- **Node version:** !`node --version 2>/dev/null || echo "not installed"`
- **Package manager:** !`(test -f bun.lockb && echo "bun") || (test -f pnpm-lock.yaml && echo "pnpm") || (test -f yarn.lock && echo "yarn") || (test -f package-lock.json && echo "npm") || echo "unknown"`
- **Framework:** !`node -e "try{const p=require('./package.json').dependencies||{};const d={...p,...(require('./package.json').devDependencies||{})};console.log(d.next?'Next.js '+d.next:d.nuxt?'Nuxt '+d.nuxt:d.svelte?'Svelte '+d.svelte:d.vue?'Vue '+d.vue:d.react?'React '+d.react:'unknown')}catch{console.log('unknown')}" 2>/dev/null || echo "unknown"`
- **Dependencies:** !`node -e "try{const p=require('./package.json');console.log(Object.keys({...p.dependencies,...p.devDependencies}).join(', '))}catch{console.log('none')}" 2>/dev/null || echo "none"`
- **Scripts:** !`node -e "try{const s=require('./package.json').scripts||{};console.log(Object.keys(s).join(', '))}catch{console.log('none')}" 2>/dev/null || echo "none"`
- **Git status:** !`git rev-parse --is-inside-work-tree 2>/dev/null && echo "repo: $(git branch --show-current), $(git log --oneline -3 2>/dev/null)" || echo "no git repo"`
- **Installed skills:** !`ls .claude/skills/ 2>/dev/null || echo "none"`
- **Previous audits:** !`ls AuditReports/audit-*.md 2>/dev/null | sort | tail -1 || echo "none"`
- **Source structure:** !`find src -type f -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' 2>/dev/null | head -30 | sed 's|^|  |' || find . -maxdepth 3 -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.jsx' -o -name '*.py' -o -name '*.go' \) 2>/dev/null | grep -v node_modules | head -30 | sed 's|^|  |' || echo "no source files found"`

### Environment Tools (auto-detected)

- **Vercel CLI:** !`vercel --version 2>/dev/null || echo "not installed"`
- **GitHub CLI:** !`gh --version 2>/dev/null | head -1 || echo "not installed"`
- **TypeScript:** !`npx tsc --version 2>/dev/null || echo "not installed"`
- **Docker:** !`docker --version 2>/dev/null || echo "not installed"`
- **Claude CLI:** !`claude --version 2>/dev/null || echo "not installed"`

## Phase 1: Understand the Project

Review the **auto-injected Project Context** above — this already gives you the framework, dependencies, scripts, and source structure. Then read these files for deeper understanding:

1. **README.md** (or CLAUDE.md if present) — project overview, architecture, conventions
2. **package.json** (or equivalent) — full dependency details if the auto-injected summary isn't sufficient

Determine (using auto-injected data + file reads):
- Framework and version (Next.js, React, Vue, Svelte, etc.)
- Database ORM (Drizzle, Prisma, Mongoose, etc.)
- Auth provider (Better Auth, NextAuth, Clerk, Supabase Auth, etc.)
- UI library (shadcn, MUI, Chakra, etc.)
- Deployment target (Vercel, AWS, Netlify, etc.)
- Test framework (Vitest, Jest, Playwright, etc.)
- Language (TypeScript, JavaScript)

Tell the user: "I've read your project. Here's what I found: {2-3 sentence summary}. Let's decide what to audit."

## Phase 2: Ask What to Audit

Use **AskUserQuestion** with `multiSelect: true`:

**"What would you like to audit?"**

| Option | What it covers |
|--------|---------------|
| Code Quality | Unused imports, dead code, type safety, error handling, console.logs, N+1 queries |
| Workflow Gaps | Broken flows, incomplete implementations, missing features, TODO/FIXME comments, dead UI |
| Help Modals / Docs | Verify in-app help/docs match actual features; find undocumented features |
| Security | Auth, authorization, input validation, XSS, CSRF, data leaks, secrets, OWASP Top 10 |
| Performance | Waterfalls, bundle size, caching, re-renders, query efficiency |
| All of the Above | Comprehensive audit across all categories (Recommended) |

## Phase 2.5: Run react-doctor (Optional)

If the project uses React, offer to run the react-doctor CLI for a quick automated score:

```bash
npx -y react-doctor@latest . --verbose
```

This gives a 0-100 score with actionable diagnostics. Include the score and key findings in the report.

## Phase 3: Check & Suggest Skills from skills.sh

The **Installed skills** field in the auto-injected Project Context above already lists what's installed. Use that — do not re-run `ls .claude/skills/`.

Based on the detected stack AND selected audit scope, search skills.sh for relevant skills to enhance the audit. Use **WebSearch** to find them:

```
site:skills.sh {framework} {audit-topic} best practices
```

### Trusted Skill Sources (install from these ONLY)

These publishers are verified, official, and widely adopted:

| Publisher | Trust Level | Examples |
|-----------|------------|---------|
| `vercel-labs` | Official (Vercel) | react-best-practices, next-best-practices, web-design-guidelines, deploy-to-vercel |
| `vercel` | Official (Vercel) | ai-sdk |
| `anthropics` | Official (Anthropic) | frontend-design, skill-creator |
| `millionco` | Trusted (Million.js) | react-doctor |
| `microsoft` | Official (Microsoft) | azure-ai, azure-observability |
| `callstackincubator` | Trusted (Callstack) | react-native-best-practices |
| `gohypergiant` | Trusted | nextjs-best-practices |

**CRITICAL RULES:**
- ONLY install from publishers listed above or with 10,000+ installs on skills.sh
- NEVER install skills from unknown, unverified, or low-install-count sources
- Do NOT re-install skills already in `.claude/skills/`
- For EACH suggestion, tell the user: skill name, publisher, one sentence why it helps
- Get explicit **user approval** before each install (use AskUserQuestion)
- Install via: `curl -sL https://raw.githubusercontent.com/{publisher}/{repo}/main/skills/{skill-name}/AGENTS.md -o .claude/skills/{skill-name}.md`
- Verify the download succeeded (check file is not 404/empty)

If no additional skills are needed, say so and move on.

### Highly Recommended Skill

If the project has any frontend (web UI, components, pages), **strongly recommend** installing the Anthropic `frontend-design` skill from [skills.sh](https://skills.sh/anthropics/skills/frontend-design) — even if it's not directly needed for the audit. It significantly improves the quality of any future UI work by coding agents (distinctive, production-grade interfaces that avoid generic AI aesthetics). Explain this benefit to the user and ask for approval.

## Phase 3.5: Environment & Tooling Check

The **Environment Tools** section in the auto-injected Project Context above already detected which tools are installed. Use that data — do not re-run version checks. Only offer to install tools that show "not installed" above.

If the project deploys to **Vercel** (detected from auto-injected dependencies or vercel.json/CLAUDE.md):

### Vercel CLI

If the auto-injected context shows Vercel CLI as "not installed", offer to install it:
> "Your project deploys to Vercel. The Vercel CLI lets you manage deployments, env vars, and domains from the terminal. Install it? (`npm i -g vercel`)"

### GitHub CLI

If the auto-injected context shows GitHub CLI as "not installed", offer to install it:
> "The GitHub CLI (`gh`) helps manage PRs, issues, and deployments from the terminal. Install it? ([cli.github.com](https://cli.github.com/))"

### Git Repository

If the auto-injected context shows "no git repo", offer to initialize one:
> "No git repository found. Want me to initialize one? This enables version control, checkpoint commits, and safe rollbacks during fixes."

### Claude Code Agent Teams

If the auto-injected context shows Claude CLI is installed, check if agent teams are enabled:

```bash
grep -q "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS" ~/.claude/settings.json 2>/dev/null && echo "ENABLED" || echo "NOT ENABLED"
```

If NOT enabled, offer to set it up:
> "Claude Code Agent Teams allow multiple Claude instances to work in parallel with shared tasks and direct communication — much more powerful than basic subagents for complex audits and multi-file implementations. This is experimental but stable. Want me to enable it?"

If user approves, add to settings:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

When agent teams ARE available, the audit's Phase 4 can use `TeamCreate` instead of background subagents — each audit category gets a dedicated teammate that can communicate findings to other teammates and self-coordinate. This is especially powerful for:
- Security + Code Quality teammates cross-referencing findings
- Workflow + Help Modal teammates verifying features exist before documenting
- Performance teammate sharing N+1 findings with Code Quality teammate to avoid duplicates

See: [Agent Teams Documentation](https://code.claude.com/docs/en/agent-teams)

If a repo exists, offer checkpoint commits during implementation:
> "I'll create checkpoint commits as I work so you can review and revert individual changes. I'll ask before pushing to remote."

### Vercel Environment Variables

When using `vercel env add` to set API keys or secrets, **ALWAYS**:
1. Trim whitespace from both key name and value
2. Strip any trailing `\n` newline characters
3. Verify the value doesn't contain leading/trailing spaces
4. Use `printf '%s'` instead of `echo` to avoid trailing newlines:

```bash
printf '%s' "the-secret-value" | vercel env add SECRET_NAME production
```

Never use `echo` as it appends a newline that can break API keys.

## Phase 3.75: Automated Scans

Before launching audit agents, run these quick automated checks and include results in the report:

### Dependency Vulnerability Scan

```bash
npm audit --json 2>/dev/null || echo "npm audit not available"
```

Summarize: total vulnerabilities by severity (critical, high, moderate, low), and list the top 5 most impactful. Include `npm audit fix` as the recommended fix where safe.

### Schema/Migration Drift Detection

If the project uses Drizzle ORM:

```bash
npx drizzle-kit push --dry-run 2>/dev/null || echo "No drift check available"
```

If Prisma:

```bash
npx prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-schema-datasource prisma/schema.prisma 2>/dev/null
```

If drift is detected, flag it as HIGH severity — schema drift causes runtime crashes.

### Performance Budget (if deployed)

If a production URL is known (from CLAUDE.md, vercel.json, or package.json homepage), offer to run:

```bash
npx -y unlighthouse --site {url} --output-path AuditReports/lighthouse 2>/dev/null
```

If unlighthouse isn't practical, note the URL and recommend the user run a Lighthouse audit manually:
> "Your app is deployed at {url}. I recommend running a Lighthouse audit in Chrome DevTools (F12 → Lighthouse tab) to check Core Web Vitals, accessibility, and SEO scores."

## Phase 4: Run the Audit

Create the output directory:

```bash
mkdir -p AuditReports
```

Launch **parallel background agents** — one per selected audit category. Use `subagent_type: "Explore"` and `run_in_background: true`.

Each agent must be given a specific, detailed prompt. Here are the prompts:

### Code Quality Agent

> Search the entire `src/` directory for:
> - Unused imports (imported but never referenced)
> - `console.log` / `console.error` in production code (not in scripts/ or test/)
> - `as any` type casts and loose typing that could cause runtime errors
> - Empty catch blocks that swallow errors silently
> - N+1 query patterns (sequential DB queries that could be JOINs or Promise.all)
> - Inconsistent error handling across server actions
> - Dead code (functions/components never imported or used)
>
> For each issue: file path, line number, severity, description.

### Workflow Gaps Agent

> Trace these critical user flows end-to-end through actual code:
> 1. User sign-up → org creation → portal access
> 2. Form submission → processing → confirmation
> 3. Any admin → review → approve/reject workflows
> 4. Payment/billing flows if present
> 5. Email sending flows
>
> Also search for:
> - TODO, FIXME, HACK comments
> - UI elements that appear interactive but have no onClick/implementation
> - Features referenced in navigation/menus but with no actual page
> - Incomplete form validation (client-side but not server-side, or vice versa)
>
> For each issue: file path, description, severity.

### Help Modals / Docs Agent

> Find all help modal or documentation components in the codebase. For each topic described:
> 1. Verify the described feature actually exists in the code
> 2. Verify the described behavior matches the implementation
> 3. Find features that exist but aren't mentioned in help docs
> 4. Find sidebar/nav items whose descriptions don't match the actual page
> 5. Check for outdated references (removed features, renamed items, changed workflows)
>
> For each issue: help file path + line, related code file, what's wrong.

### Security Agent

> Audit for OWASP Top 10 and framework-specific security issues:
> 1. **Authentication**: Are all routes protected? Can unauthenticated users reach protected pages?
> 2. **Authorization**: Do ALL server actions verify roles? Can a regular user call admin actions?
> 3. **Input validation**: Are inputs sanitized? Check for XSS via dangerouslySetInnerHTML, unsanitized user content
> 4. **Data isolation**: Can users query other users'/orgs' data? Are DB queries properly scoped with ownership checks?
> 5. **Secrets**: Are API keys, passwords, or tokens exposed in client-side code or git history?
> 6. **CSRF**: Are state-changing actions protected?
> 7. **Injection**: SQL injection, command injection, template injection risks?
> 8. **Email**: Can user input inject HTML into outgoing emails?
>
> For each issue: file path, line, severity (critical/high/medium/low), attack vector, recommended fix.

### Performance Agent

> Apply performance best practices for the detected framework:
> 1. **Waterfall detection**: Sequential `await` calls that could run in parallel via `Promise.all()`
> 2. **Bundle size**: Barrel file imports (`import { x } from './components'`), large client-side dependencies, missing `dynamic()` imports for heavy components
> 3. **Server-side**: Missing caching (`React.cache()`, `unstable_cache`), redundant DB queries in layouts vs pages
> 4. **Client-side**: Unnecessary re-renders, missing `useMemo`/`useCallback` where expensive, heavy useEffect dependencies
> 5. **Database**: Full-table scans, missing GROUP BY, loading all rows when counts would suffice
> 6. **Images**: Missing next/image optimization, unoptimized formats
>
> For each issue: file path, line, current pattern, recommended pattern, estimated impact.

## Phase 5: Generate Report

Wait for all agents to complete, then consolidate into a single report.

**Filename**: `AuditReports/audit-{YYYY-MM-DD}-{HHmm}.md`

### Report Template

```markdown
# Application Audit Report

**Project:** {name from package.json}
**Date:** {YYYY-MM-DD HH:mm}
**Scope:** {selected categories, comma-separated}
**Stack:** {framework} {version} | {database} | {auth} | {ui} | {deployment}

---

## Executive Summary

| Severity | Count |
|----------|-------|
| Critical | {n} |
| High     | {n} |
| Medium   | {n} |
| Low      | {n} |
| **Total**| **{n}** |

---

## {Category Name}

### [{CRITICAL|HIGH|MEDIUM|LOW}] {Issue Title}

- **File:** `{path}:{line}`
- **Description:** {what's wrong and why it matters}
- **Impact:** {what could go wrong in production}
- **Fix:** {specific, actionable recommendation}
- **Effort:** Quick (~5 min) | Medium (~30 min) | Complex (~2+ hrs)

---

## Mitigation Plan

### Immediate (Critical + High)

| # | Fix | File | Effort |
|---|-----|------|--------|
| 1 | {description} | `{path}` | {effort} |

### Short-term (Medium)

| # | Fix | File | Effort |
|---|-----|------|--------|

### Future (Low)

| # | Fix | File | Effort |
|---|-----|------|--------|

---

## Changes Since Last Audit

{If a previous audit report exists in AuditReports/, read it and note:}
- **Fixed:** {issues from last audit that are now resolved}
- **New:** {issues not present in last audit}
- **Recurring:** {issues present in both audits}

{If no previous audit exists, write: "This is the first audit for this project."}

---

*Generated by [Audit My App](https://dreamforgesoftware.vercel.app/) — Created by Emile du Toit*
*© 2026 DreamForge Software*
```

### Previous Audit Detection

The **Previous audits** field in the auto-injected Project Context already shows the most recent report filename (or "none"). If a previous audit exists, read that report and populate the "Changes Since Last Audit" section.

## Phase 6: Offer to Implement

Present the report to the user, then ask via **AskUserQuestion**:

**"Would you like me to implement the mitigation plan?"**

| Option | Description |
|--------|-------------|
| Yes, all fixes (Recommended) | Implement everything in the mitigation plan |
| Critical + High only | Only fix critical and high-severity issues |
| Let me choose | Present each fix individually for approval |
| No, just the report | Stop here — the report is enough |

If implementing:
- Work through fixes systematically, grouping related changes
- Commit in logical batches with clear messages
- After implementation, ask: "Should I update the help modals to reflect these changes?"
- Run `npx tsc --noEmit` to verify no type errors before committing

After presenting the report (whether implementing or not), tell the user:

> **You can re-run this audit anytime:**
> - `/audit-my-app` — full guided audit
> - `/audit-my-app all` — audit everything, skip the interview
> - `/audit-my-app quick` — fast check (code quality + security only)
> - `/audit-my-app security` — security audit only
> - `/audit-my-app performance` — performance audit only
>
> Previous reports are saved in `AuditReports/` — future audits will compare against them to show what was fixed and what's new.

## Shortcut Invocation

- `/audit-my-app` — full workflow from Phase 1
- `/audit-my-app security` — jump to Phase 4 with security audit only
- `/audit-my-app performance` — jump to Phase 4 with performance audit only
- `/audit-my-app all` — jump to Phase 4 with all categories
- `/audit-my-app quick` — code quality + security only (fastest useful audit)

## Rules

1. **No fabrication** — only report issues you actually found in the code
2. **Every finding needs a file path** — vague findings are useless
3. **Severity must be justified** — explain why critical vs. low
4. **Fixes must be actionable** — specific enough to implement without further research
5. **Respect the codebase** — understand conventions before suggesting changes
6. **Honest effort estimates** — don't underestimate complex fixes
7. **Ask before installing** — never install skills without explicit user approval
8. **Verify installs** — confirm downloaded files aren't 404 or empty
9. **Deduplicate findings** — if two agents flag the same file/issue, merge into one finding
10. **Suggest .gitignore** — if AuditReports/ is not in .gitignore, ask the user if they want to add it
11. **No regressions** — run `npx tsc --noEmit` before every commit; never break existing functionality to fix a finding
12. **No production data destruction** — NEVER run DROP TABLE, DELETE FROM, TRUNCATE, or any destructive database operation without explicit user approval. Always create backups or reversible migrations first.
13. **No destructive git operations** — NEVER force push, reset --hard, delete branches, or amend published commits without explicit user approval
14. **Test before and after** — if the project has tests (`npm test`), run them before starting fixes AND after implementing them. If any test fails after your changes, revert and report the failure.
15. **Rollback plan** — for complex fixes (effort: Complex), explain to the user how to revert if something goes wrong before implementing
16. **Never commit secrets** — NEVER stage or commit .env files, API keys, passwords, tokens, or credentials without explicit user approval. Always check `git diff --staged` for sensitive patterns before committing. If secrets are accidentally staged, unstage them immediately and add the file to .gitignore.
17. **Clean env vars** — when setting environment variables via Vercel CLI or any tool, always strip whitespace and trailing newlines from values to prevent broken keys

---

**Created by:** Emile du Toit
**© 2026 DreamForge Software** | [dreamforgesoftware.vercel.app](https://dreamforgesoftware.vercel.app/)
