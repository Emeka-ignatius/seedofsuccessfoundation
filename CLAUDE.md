@AGENTS.md

# Seed of Success Foundation — St Perpetua Hospital

Charity website for a registered charity in England and Wales (no. **1219306**). Donations, Gift Aid, admin dashboard.
Source of truth: `docs/Seed_Of_Success_Foundation.md` (PRD) and `docs/IMPLEMENTATION_PLAN.md` (phases, decisions, gaps). Read the plan before starting a phase.

## The story this site tells

Two communities giving each other something they lack: Nigerian priests have served seven English dioceses since 2006, and those parishes now help build a hospital in Orlu. Reciprocity is the spine, not a paragraph. Orlu people appear as agents (clinicians, builders, trustees), never as passive recipients. Prayer comes before money. Tone: dignified, warm, plain-spoken. Not corporate-NGO, not startup, not pity-driven. No stock imagery. British English.

## Stack

Next.js 16 (App Router, `cacheComponents` on), React 19, TypeScript, Tailwind 4, pnpm. Planned: Prisma + Neon, Stripe, Resend, Sentry, Vercel.
**This Next.js differs from older versions** (`middleware` is now `proxy.ts`; see AGENTS.md). Read the relevant guide in `node_modules/next/dist/docs/` before writing code.

## Commands

`pnpm dev` · `pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm test:strict` · `pnpm e2e` · `pnpm format`
`pnpm codeowners:gen` regenerates `.github/CODEOWNERS` from the registry.

## Two tiers of CLAUDE.md

- **Organisational** (this file, and short files in feature directories): what the area is and how we work in it. Edit freely.
- **STRICT** (banner `# STRICT — <area>`): the area can lose money, leak donor data or break trust. **Read the file before touching anything in that directory.** Never edit a strict area, or its CLAUDE.md, without the user's explicit approval for that specific change.

Strict areas, registered in `.claude/protected-paths.json`: auth (`lib/auth`, `app/admin/(auth)`), payments (`lib/payments`, `app/donate`, `app/api/webhooks`), Gift Aid (`lib/giftaid`), security (`lib/security`, `proxy.ts`, `next.config.ts`, `.env*`), schema (`prisma`), strict tests (`tests/strict`), governance (`.claude`, `.githooks`, `.github`, `scripts/protected`).

Enforcement, in layers: a Claude Code hook prompts the user on every edit to a protected path; a `commit-msg` hook and CI require an `Approved-by: <human name>` trailer on any commit touching one. **Never write that trailer yourself.** Do not try to route around the hook with shell commands, `--no-verify` or by editing the registry.

## Always

- Money is integer pence, currency GBP. Never floats.
- Personal data (names, addresses, emails, giving history) never goes into logs, Sentry, analytics or error messages.
- Server-side validation on every form. Client validation is a courtesy.
- Secrets only through `lib/security/env.ts`. Nothing secret is prefixed `NEXT_PUBLIC_`.
- Accessibility is built in: keyboard, visible focus, 4.5:1 contrast, labelled inputs, `prefers-reduced-motion`.
- A new personal-data field is added to the data inventory next to the schema.
- Don't commit unless asked. Don't invent facts about the charity: missing content is flagged, never made up.
