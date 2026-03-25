# DreamForge Academy Newsletter — Demo App

A Next.js landing page for newsletter signups to [DreamForge Academy](https://dreamforge-academy.vercel.app/).

**This app serves two purposes:**

1. **Demo/prototype** — a working newsletter signup page you can deploy and extend
2. **Test fixture** — a real Next.js codebase for testing the [audit-my-app](https://github.com/brainit-consulting/DreamForgeSoftwareAgentSkills) skill

## Quick Start

```bash
cd demo-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- Next.js 16.2.1 (App Router, TypeScript)
- Tailwind CSS 4.2.2
- shadcn/ui
- next-themes (dark/light mode)
- Lucide React 1.0.1
- Zod 4.3.6

## What works now (demo mode)

- Newsletter signup form with email validation
- Honeypot anti-spam field
- Duplicate email detection
- Emails saved to `data/subscribers.json` (local file, gitignored)
- Dark/light theme toggle
- Responsive design

## What does NOT work (demo limitations)

- No real emails are sent
- No email confirmation flow
- No rate limiting on the API route
- No unsubscribe mechanism
- File-based storage is not production-safe (no concurrency handling)

## Make It Real — Production Setup

To turn this demo into a real newsletter system:

### 1. Choose an email service

| Service | Free tier | Best for |
|---------|-----------|----------|
| [Resend](https://resend.com) | 3,000 emails/month | Developers, API-first |
| [ConvertKit](https://convertkit.com) | 10,000 subscribers | Creators, automation |
| [Mailchimp](https://mailchimp.com) | 500 subscribers | Small businesses |
| [Buttondown](https://buttondown.email) | 100 subscribers | Simple newsletters |

### 2. Get a domain and verify it

Most email services require a verified sending domain. Add DNS records (SPF, DKIM, DMARC) as instructed by your chosen service.

### 3. Set environment variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

```
RESEND_API_KEY=re_xxxxx
RESEND_AUDIENCE_ID=aud_xxxxx
```

### 4. Update the API route

Open `src/app/api/subscribe/route.ts` — look for the `TODO` comments. Replace the file-based storage with your email service's API. Example with Resend:

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Replace the file write with:
await resend.contacts.create({
  email: normalizedEmail,
  audienceId: process.env.RESEND_AUDIENCE_ID!,
});
```

### 5. Add rate limiting

The current API route has no rate limiting. For production, add rate limiting middleware or use a service like Upstash Redis.

### 6. Deploy to Vercel

In Vercel, set Root Directory to `demo-app` and add your environment variables.

## Testing with audit-my-app

This app is designed to be audited by the `audit-my-app` skill:

**macOS / Linux / Git Bash:**

```bash
mkdir -p .claude/skills
curl -sL https://raw.githubusercontent.com/brainit-consulting/DreamForgeSoftwareAgentSkills/main/skills/audit-my-app/AGENTS.md -o .claude/skills/audit-my-app.md
```

**Windows (CMD / PowerShell):**

```cmd
mkdir .claude\skills
curl -sL https://raw.githubusercontent.com/brainit-consulting/DreamForgeSoftwareAgentSkills/main/skills/audit-my-app/AGENTS.md -o .claude\skills\audit-my-app.md
```

**Or via skills.sh (for Cursor, Codex, OpenCode):**

```bash
npx skills add brainit-consulting/DreamForgeSoftwareAgentSkills --skill audit-my-app
```

Then run the audit:

```bash
/audit-my-app all
```

The app intentionally has gaps for the audit to find (missing rate limiting, file-based storage, no email confirmation, etc.).

## Author

**Emile du Toit** | [DreamForge Software](https://dreamforgesoftware.vercel.app/)
