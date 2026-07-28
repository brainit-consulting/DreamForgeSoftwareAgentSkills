# DreamForge Software Agent Skills

A collection of AI agent skills by [DreamForge Software](https://dreamforgesoftware.vercel.app/). These skills extend Claude Code, OpenCode, Codex, Cursor, and other AI coding agents with specialized capabilities.

## Available Skills

### audit-my-app

Comprehensive application auditor that reads your project context, asks what to audit (code quality, gaps, security, help modals, performance), suggests trusted skills to install, runs parallel audit agents, and produces a timestamped markdown report with severity ratings, mitigation suggestions, and estimated fix times.

**Works on any project** — detects your framework, database, auth, and deployment automatically.

**Features:**
- Multi-category audit: code quality, workflow gaps, security (OWASP), help docs, performance
- Auto-detects project stack, tools, and environment at startup
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

### apple-hig-compliance

Evidence-driven responsive web UI and UX auditing, planning, implementation, and verification using Apple Human Interface Guidelines adapted for the web, WCAG accessibility, and browser-native behavior.

**Designed for web products** — covers compact navigation, touch targets, forms, dialogs, responsive tables, safe areas, zoom and reflow, mobile performance, accessibility trees, and real-device follow-up without imitating native iOS chrome.

### start-an-app

Interviews you properly about what you actually want to build, then scaffolds a working full-stack Next.js app around it — database, sign-in, uploads, payments, AI, a design system, a landing page and dashboard, and an in-app help guide. The interview is the valuable part; the result is meant to look like *your* app from the first commit, not a template.

**Built for people who don't code** — every question is asked in plain language, with a recommended default so "whatever you recommend" is a complete answer.

**Features:**
- Discovery interview that reads the data model back to you in plain words before anything is built
- Free hosted Postgres on Neon by default, with your own copy-on-write branch for local work so development never touches live data — or Docker, a local Postgres server, or offline PGlite if you'd rather
- Sign-in, file uploads, payments (Polar or Stripe) and AI features, each only if you need them
- Optional `DESIGN.md` extracted from a site you already have — palette, typefaces, radius and shape read off the real page, then enforced across every component
- An in-app help guide written from your own answers, so new staff can work the app out without asking you
- Migration discipline throughout: `generate` then `migrate`, never `push`
- Never creates accounts, spends money, or publishes anything without asking

A fork of [leonvanzyl/skills](https://github.com/leonvanzyl/skills), with the database, interview wording, design system, help guide and tooling rules extended. Design-system format adapted from [taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT).

### security-scanner

OWASP Top 10:2025 audit of any codebase, in any language — eleven reference files of CWEs and detection patterns, severity scoring, and a dated markdown report with file, line, evidence and a fix for every finding.

**Pairs with `start-an-app`**, which checks that what it built works but never that it's safe. Run it once the app is real — most of what A01 and A07 look for doesn't exist until sign-in works and there's data in the database.

By Leon van Zyl, from [agentic-coding-starter-kit](https://github.com/leonvanzyl/agentic-coding-starter-kit), included with his permission.

## Install

### Option 1: Claude Code Plugin (Recommended)

Add the DreamForge marketplace and install the plugin:

```bash
/plugin marketplace add brainit-consulting/DreamForgeSoftwareAgentSkills
/plugin install dreamforge-audit
```

The skill will be available as `/dreamforge-audit:audit-my-app`.

> **Want wider reach?** You can also submit plugins to the [official Anthropic marketplace](https://claude.ai/settings/plugins/submit).

### Option 2: One-Line Install (Claude Code)

**macOS / Linux / Git Bash:**

```bash
curl -sL https://raw.githubusercontent.com/brainit-consulting/DreamForgeSoftwareAgentSkills/main/install.sh | bash
```

**Windows (CMD):**

```cmd
curl -sL https://raw.githubusercontent.com/brainit-consulting/DreamForgeSoftwareAgentSkills/main/install.bat -o install.bat && install.bat
```

Restart Claude Code — the skill will appear as `/audit-my-app`.

### Option 3: Skills.sh (Cursor, Codex, OpenCode, and more)

```bash
npx skills add brainit-consulting/DreamForgeSoftwareAgentSkills --skill audit-my-app
```

```bash
npx skills add brainit-consulting/DreamForgeSoftwareAgentSkills --skill apple-hig-compliance
```

```bash
npx skills add brainit-consulting/DreamForgeSoftwareAgentSkills --skill start-an-app
```

```bash
npx skills add brainit-consulting/DreamForgeSoftwareAgentSkills --skill security-scanner
```

## Usage

After installation, invoke the skill. Plugin installs use the namespaced format, manual/skills.sh installs use the short form:

```
/dreamforge-audit:audit-my-app       # Plugin install
/audit-my-app                        # Manual or skills.sh install
```

```
/audit-my-app                # Full guided audit with interview
/audit-my-app all            # Audit everything, skip interview
/audit-my-app quick          # Code quality + security only (fastest)
/audit-my-app security       # Security audit only
/audit-my-app performance    # Performance audit only
```

### Using `start-an-app`

**Open the folder you want the app to live in, and make sure it's empty.** The app is created in the current working directory — the folder you open is the folder it lands in. There's no "where should this go?" question, because an agent can't reliably write outside where it started. If the folder already holds a project, the skill stops rather than scaffolding over it.

Then say what you want:

```
/start-an-app
```

or simply *"I want to build a booking system for my salon"* — it triggers on the intent.

**What it asks.** An open conversation about the idea first — including *"what are you doing about this today, a spreadsheet, a notebook, WhatsApp?"*, which usually hands over the data model. Then at most three gap-checks, then seven technical questions, each with a recommended default so **"whatever you recommend" is a complete answer**:

1. Who's it for — customers, staff, or just you?
2. Do people need their own login?
3. Will people upload anything?
4. Will customers pay you through this?
5. Should it do anything with AI?
6. What should a first-time visitor see?
7. Do you already have a website to match the look of?

It then reads the whole plan back — data model, what you can do, where the folder is, and an explicit *not in version one* list — and waits for a yes before running a single command.

**What you need first: nothing, to start.** Two things unlock more if you have them:

- **A Vercel account** (free) — hosted Postgres with your own copy-on-write branch for local work, so development never touches live data. Without one it falls back to Docker, a local Postgres server, or offline PGlite; you're never blocked.
- **An existing website** — paste the address and it matches your colours, typefaces and shape.

Anything needing a signup (Polar or Stripe for payments, Google sign-in, OpenRouter for AI) is only touched if you ask for that feature, and you're walked through it rather than it being done for you.

**What you get.** A running app on your machine, its schema in real migrations, a `DESIGN.md` it actually obeys, and — for apps used by customers or staff — a `?` in the corner opening a guide written from your own answers. Putting it on GitHub and deploying are **offered at the end, never done for you**.

### Using `security-scanner`

Run it in the repo you want audited, once the app is real — most of what A01 and A07 look for doesn't exist until sign-in works and there's data in the database.

```
/security-scanner
```

It sweeps all ten OWASP 2025 categories and writes a dated report with file, line, evidence and a fix for every finding. Worth knowing before you read it: **a finding is not a breach.** A fresh scaffold produces mostly Low and Info — missing headers, console-only logging. Look at the Critical and High counts first.

```
/start-an-app                # Interview, then scaffold
/security-scanner            # OWASP audit of whatever repo you're in
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

## Support

If this project helps you, you can support DreamForge Academy here: [Buy Me a Coffee](https://buymeacoffee.com/dreamforgeacademy).
