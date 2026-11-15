# Implementation Plan

## Seed of Success Foundation — St Perpetua Hospital

**Implements:** `docs/Seed_Of_Success_Foundation.md` (PRD Draft v2, 13 Nov 2026)
**Plan version:** Draft v1 · 13 November 2026
**Stack as found in the repo:** Next.js 16.4.6, React 19.3, Tailwind 4.3, pnpm 11, TypeScript. `cacheComponents` and `partialPrefetching` are already enabled in `next.config.ts`.

> This repo's Next.js differs from older versions. Before writing code in any area, read the matching guide in `node_modules/next/dist/docs/` (see AGENTS.md). Two differences already shape this plan: **`middleware` is now `proxy`** (`proxy.ts`), and **nonce-based CSP forces dynamic rendering and is incompatible with partial prerendering** (see §3, decision D1).

---

## 1. Decisions locked in this session

| #   | Decision                                                                                                                                                                                   | Source                    |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| L1  | Strict areas: **admin auth & sessions; donations, Stripe & webhooks (incl. fees); Gift Aid & donor PII; security config & DB schema**                                                      | You                       |
| L2  | Enforcement: **strict CLAUDE.md + Claude Code hook + CODEOWNERS**                                                                                                                          | You                       |
| L3  | Hook behaviour: edits to protected paths **always prompt you (ask)**, never silent, never auto-allowed                                                                                     | You                       |
| L4  | Auth: **custom email/password** (argon2, httpOnly session cookies, own rate limiting), as the PRD says. Auth0 not used                                                                     | You                       |
| L5  | Phase 0 holding page lives **in this app on a temporary route**, sharing the Prisma/Neon subscriber table with the real site                                                               | You                       |
| L6  | Hospital elevation SVG: **I draw a faithful stand-in**; swap for the architect's real elevation when it arrives                                                                            | You                       |
| L7  | Working assumptions for open blockers: **B6 → option 3** (IA ready for News, nothing built). **B7 → option 1** (Nigerian bank-transfer details published on `/donate`, reconciled by hand) | You (PRD recommendations) |
| L8  | Email provider: **Resend**                                                                                                                                                                 | You                       |
| L9  | GitHub repo will be created by you; CODEOWNERS written once I have the handle                                                                                                              | You                       |
| L10 | This plan lives in the repo as Markdown                                                                                                                                                    | You                       |
| L11 | **CSP split by route** (D1 below)                                                                                                                                                          | You                       |
| L12 | "Registration" is not a code area. The PRD has no public sign-up, so it is ignored. Client-side registrations (Stripe, HMRC) are tracked as launch gates                                   | You                       |

---

## 2. The CLAUDE.md system

### 2.1 Two tiers

**Tier 1: Organisational `CLAUDE.md`.** One global file at the repo root, plus one short file per feature directory. They describe _what this area is, its conventions, and where things live_. Edit freely; keep each under ~60 lines.

**Tier 2: Strict `CLAUDE.md`.** Lives in a protected directory. Begins with a `STRICT` banner and the fixed template below. Claude may **propose** a change to a strict area but may not apply it without your approval at the hook prompt. Strict files are themselves protected paths.

Nested CLAUDE.md files load into context when Claude works in that directory, so the rules arrive exactly when they matter.

### 2.2 Strict template (every strict CLAUDE.md uses these headings)

```
# STRICT — <area>
## Why this is strict        one paragraph: what breaks, and for whom, if this goes wrong
## Invariants                numbered, testable statements that must always hold
## Forbidden                 things that must never be done here, even if asked casually
## Change protocol           propose → show diff → user approves → tests → changelog line
## Required checks           exact commands that must pass (pnpm test:strict <area>, etc.)
## Test coverage that guards this   named test files; a change that lowers coverage is rejected
## Changelog                 dated, one line per approved change
```

### 2.3 Protected-path registry (single source of truth)

`.claude/protected-paths.json` lists every strict glob and its area. Three things read it so they cannot drift apart: the Claude Code hook, the pre-commit check, and the CODEOWNERS generator script.

### 2.4 Three layers of enforcement

| Layer                                                                                                                                                                                                                                    | Stops                                                                    | Does not stop                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| **1. Claude Code `PreToolUse` hook** (`.claude/settings.json` → `node .claude/hooks/guard.mjs`) on Edit/Write/NotebookEdit. Returns `permissionDecision: "ask"` with the area's rules in the reason. Node script, so it works on Windows | Claude editing protected files without you seeing it                     | A shell command that writes a file (e.g. `sed -i`, redirects). Layers 2 and 3 cover this |
| **2. Git pre-commit check** (Husky or a plain `core.hooksPath`) fails if staged files match a protected glob and the commit lacks an `Approved-by:` trailer                                                                              | Protected changes entering history unreviewed, however they were written | `--no-verify` (you can bypass; CI catches it)                                            |
| **3. CODEOWNERS + branch protection** with _Require review from Code Owners_                                                                                                                                                             | Anything merging to `main` without you                                   | Nothing, once configured. See caveat below                                               |

**CODEOWNERS caveat (solo owner).** GitHub does not let a PR author approve their own PR. If you are the only code owner, the rule will block your own merges unless you add a second reviewer, or allow admin bypass for yourself. Decide this when the repo is created (§9, Q3).

### 2.5 Where the files go

```
CLAUDE.md                              global: stack, conventions, commands, "read Next docs first"
.claude/
  settings.json                        registers the hook
  protected-paths.json                 strict registry
  hooks/guard.mjs                      the PreToolUse guard
.github/CODEOWNERS                     generated from the registry
app/
  (site)/CLAUDE.md                     public pages: copy rules, tone, a11y, no stock imagery
  (site)/holding/                      Phase 0 page
  donate/CLAUDE.md                     STRICT   donation UI + server actions
  admin/CLAUDE.md                      admin UI conventions (organisational)
  admin/(auth)/CLAUDE.md               STRICT   login, reset, 2FA, roles
  api/webhooks/stripe/CLAUDE.md        STRICT   webhook receiver
lib/
  auth/CLAUDE.md                       STRICT   password hashing, sessions, rate limit, DAL guard
  payments/CLAUDE.md                   STRICT   Stripe client, intents, subscriptions, fee calc, webhook handlers
  giftaid/CLAUDE.md                    STRICT   declaration text, capture, encryption, retention, export
  security/CLAUDE.md                   STRICT   headers/CSP builders, field encryption, secrets, env validation
  email/CLAUDE.md                      organisational: templates, Resend, SPF/DKIM/DMARC notes
prisma/CLAUDE.md                       STRICT   schema + migrations
proxy.ts                               STRICT   (listed in registry; rules in lib/security/CLAUDE.md)
next.config.ts                         STRICT   (headers/CSP; rules in lib/security/CLAUDE.md)
docs/decisions/                        short ADRs for anything that changes a strict invariant
```

Exact folders can adjust once the code exists; the registry is what matters.

### 2.6 Seed invariants for each strict area (to be refined at its phase)

**Auth & sessions.** Passwords hashed with argon2id, never logged, never returned. Session cookie is `httpOnly`, `secure`, `sameSite`. Every admin route and server action re-checks the session in the data-access layer; `proxy.ts` is an optimistic check only. Login, reset and invite are rate-limited and give uniform error messages. No shared logins. Admin creation is invite-only. Roles enforced server-side.

**Donations, Stripe & webhooks.** Amounts are integer pence, currency GBP. **The browser never decides that a payment succeeded**: a donation becomes `succeeded` only from a signature-verified webhook. Webhook handler verifies the signature on the raw body before parsing, and is idempotent on Stripe's event id (stored). No card data touches our servers. Stripe secret keys server-only. Fee-cover amount is computed server-side, never trusted from the client. Refunds reconcile via webhook.

**Gift Aid & donor PII.** The declaration text shown to the donor is stored **verbatim with the timestamp**, never reconstructed from the current template. Home address and name encrypted at application level before storage. Records retained six years from the end of the accounting period, then purged by a documented job. Admin access to this data is logged. Exports are logged. No Gift Aid fields in logs, Sentry events or analytics.

**Security config & DB schema.** No secret in the repo or in client bundles. Env vars validated at boot. Fail-closed defaults. Every migration reviewed by you; destructive migrations need an ADR. Every table that holds personal data is listed in a data inventory kept next to the schema.

---

## 3. Architecture decisions

### D1. CSP strategy: split by route (decided)

- **`/donate`, `/admin/*`, `/api/webhooks/*`:** strict nonce-based CSP set in `proxy.ts`. These routes render dynamically regardless.
- **Public marketing pages:** origin-allowlist CSP from `next.config.ts` `headers()`, so they keep static/cached rendering and hit the Core Web Vitals targets.
- Stripe directives from PRD §9.2 go in both. The nonce policy is the stricter of the two.
- **Verify at implementation:** that `cacheComponents` and nonce routes coexist as the docs describe, by building and inspecting. Do not assume.

### D2. Phase 0 vs the full site in one app (proposal for you to veto)

One deployment serves production and previews. A `SITE_MODE` env var controls what production exposes:

- Production: `SITE_MODE=holding`. `proxy.ts` rewrites every path except the holding page, its signup endpoint and static assets to the holding page. **Fail-closed**: if the variable is missing or unrecognised, behave as `holding`.
- Preview: `SITE_MODE=live`. You and the client see the real site.
- Launch day = flipping one env var and redeploying.

Risk: half-built code is deployed to the production domain, just unreachable. Mitigation: the holding gate is a strict-registry file with a test asserting that `/admin`, `/donate` and every API route return the holding page or 404 in holding mode. Alternative if you dislike this: long-lived `develop` branch, with only holding-page code on `main` until launch. That costs a painful merge at launch.

### D3. Rendering and caching

Public pages: Server Components with `use cache` and tag-based revalidation. When an admin edits a milestone, `revalidateTag` refreshes the page. Admin and donation pages read the session at request time and stream behind `<Suspense>`. Follow `authentication-with-cache-components.md`.

### D4. Data layer

Prisma on Neon, UK/EU region (London if Neon offers it for the project). Verify the current Prisma + Neon adapter requirement for serverless at install time. All DB access goes through a data-access layer in `lib/`; components never import Prisma directly.

### D5. Rate limiting

Postgres counter table, no new vendor. Volume for a charity this size does not justify Redis. Veto if you would rather use Upstash. Applies to login, reset, donation intent creation, contact/volunteer/prayer forms, subscribe.

### D6. Field encryption

AES-256-GCM at application level for Gift Aid name and address fields, key from env, key version stored per row so rotation is possible. Neon already encrypts storage; this additionally protects against a DB dump or an over-broad admin query.

### D7. Testing

Vitest for units (fee calc, Gift Aid text capture, webhook idempotency, auth guards). Playwright for the donation and admin flows. Stripe CLI to forward webhooks locally. `@axe-core/playwright` in CI. `pnpm test:strict` runs only the tests guarding strict areas and gates merges.

### D8. Design direction

Follows PRD §5 (dignified, warm, serif headings, earth tones, photography of Orlu people as agents). It is **not** the SaaS/glass/cinematic aesthetic. Tokens and a short design brief are written in Phase 1 once the logo arrives.

---

## 4. Gaps found in the PRD (to resolve in the relevant phase)

1. **No table for the Phase 0 email capture.** PRD says it "writes to the same table the live site will use", but §8.1 has no such table. Add `Subscriber` (email, consent_text, consented_at, source, confirmed_at, created_at).
2. **Holding page collects personal data but has no privacy notice.** UK GDPR requires one at the point of collection. A minimal `/privacy` and a consent line next to the field must ship in Phase 0, even though the full policy is a Phase 2 page.
3. **Missing tables:** `WebhookEvent` (idempotency), `Session`, `AuditLog` (who viewed or exported Gift Aid data), `Setting` (preset amounts, impact labels, recipients), `PasswordReset`, `LoginAttempt`/rate-limit counters.
4. **`GiftAid` stores `donor_address` separately from `Donor`.** Intentional for point-in-time accuracy, and correct, but must be explicit in the schema notes: the declaration snapshot is never joined back to the live donor row.
5. **`Programme.raised_amount` is a stored number.** Decide: derive from `Donation` rows, or store with a reconciliation job. Recommend deriving, plus a manual "raised before the website" offset set in admin, since the client has already raised funds offline.
6. **Fee cover and Gift Aid.** If a donor adds a fee-cover amount, which part is Gift Aid-eligible? I do not know. This needs the client's treasurer or HMRC guidance before Phase 3, and the answer goes into `lib/giftaid/CLAUDE.md`. Do not guess.
7. **Stripe fee rates.** The fee-cover calculation must use the client's actual Stripe pricing (which may include a non-profit rate), read from config, not hardcoded from memory.
8. **Stripe IP allowlisting (PRD §9.1).** Signature verification is the real control. IP allowlisting on Vercel is brittle behind proxies; treat it as optional defence-in-depth, not a blocker.
9. **Marketing consent.** Subscriber sign-up and later Resend broadcasts need recorded consent. PRD §13 puts "email marketing platform integration" out of scope, so v1 only stores signups; sending needs a decision.
10. **Timeline.** PRD Week 3 holds Stripe, Gift Aid and the whole admin. Stripe **test mode works before the account is verified**; only live keys need verification. So schema, auth and the admin skeleton move into Week 2 alongside the frontend build, to de-risk Week 3.

---

## 5. Phases

Each phase lists what it **creates**, **CLAUDE.md files it adds**, and its **exit gate**. A phase is not done until its gate passes.

### Phase F — Foundation (before Phase 0; ~half a day)

- You create the GitHub repo. Rename local branch `master` → `main` (the PRD and PR base use `main`).
- Global `CLAUDE.md`. `.claude/settings.json`, `protected-paths.json`, `guard.mjs`. Pre-commit check. CODEOWNERS (needs your handle).
- Tooling: ESLint (exists), Prettier, Vitest, Playwright skeleton, env validation (`lib/security/env`), CI workflow (lint, typecheck, test, `pnpm audit`).
- Prisma + Neon connected; migration pipeline works. First strict CLAUDE.md files created: `prisma/`, `lib/security/`.
- Vercel project linked; preview environment variables set.

**Gate:** editing `prisma/schema.prisma` from Claude triggers the prompt with the area's rules. A deliberate protected change without an approval trailer fails the pre-commit check. CI is green on an empty change.

**Status (14 Nov 2026): mostly done, uncommitted.**
Done and tested locally: branch renamed to `main`; root `CLAUDE.md`; strict CLAUDE.md for `prisma/`, `lib/security/`, plus seeded `lib/auth/`, `lib/payments/`, `lib/giftaid/`; registry, guard hook (verified against 11 inputs including Windows paths, shell writes and fail-closed on bad input), `commit-msg` hook (verified in a scratch repo), CI workflow, CODEOWNERS generator; Prettier, Vitest (12 strict tests), Playwright skeleton, zod env validation, fail-closed `SITE_MODE` helper.
**Outstanding:**

- GitHub repo and handle (Fusco). `owners` in `.claude/protected-paths.json` is `@REPLACE_WITH_GITHUB_HANDLE`; then run `pnpm codeowners:gen`.
- Neon project (UK/EU) and `DATABASE_URL`, then Prisma install and first migration (Phase 0).
- Vercel project link and preview env vars (Fusco).
- First commit needs `Approved-by: <name>` because it touches governance and strict paths.
- CI has not run yet (no remote). The `pnpm audit` step may need tuning on first run.
- The Claude Code hook loads when a session starts: restart the session, then confirm the prompt fires on a protected edit.

### Phase 0 — Holding page (Week 0; the PRD's half-day budget applies to the page itself)

Creates: `components/holding/` rendered at `/`, `Subscriber` + `RateLimitBucket` tables and migration, signup server action, `SITE_MODE` gate in `proxy.ts` (`lib/security/gate.ts`), minimal `/privacy`, generated OG image, robots. Favicon is still the Next.js default until the logo arrives.

Content per PRD §3A: dimmed Abajah build photo (compressed), "St Perpetua Hospital is rising in Orlu.", the one-line need, **Day N of construction** counter from 29 January 2026, mission line, email field with consent line, charity footer no. 1219306, contact once mailboxes exist.

- **SVG elevation:** stand-in drawn by me, self-drawing via `stroke-dasharray`/`stroke-dashoffset` over ~2.5–3 s, final outline persists. `prefers-reduced-motion` → fully drawn, no animation. Marked in code and in the changelog as a placeholder to swap.
- **Counter:** `use cache` with a minutes-long lifetime, computed from London calendar dates (Day 1 = 29 January 2026; Day 290 on 14 Nov 2026). **Changed from the original idea:** a request-time value behind Suspense streams in through a script and never appears with JavaScript off, so it is cached into the static HTML instead. It can lag a few minutes after London midnight.
- Signup protected by Turnstile + honeypot + the Postgres rate limiter; duplicate emails handled quietly. **Changed:** because Turnstile needs JavaScript, the form needs JavaScript. With JS off the page, building and day count still work, and a note explains the form. Skipping the check for no-JS visitors would defeat it.
- **Background photo:** the palm grove cropped from KAY_5841 (foliage only), produced by `pnpm media:holding`. See "Photography findings" below for why it is not a people shot.
- No donation functionality, no Stripe.

**Gate:** Lighthouse mobile LCP < 2 s on the preview; works with JS disabled (building, day count and text; the form needs JS); reduced-motion verified; a test asserts `/admin`, `/donate` and API routes are unreachable in `SITE_MODE=holding`; signup row appears in Neon; `title`, description, OG image render correctly in a link-preview check.

**Status (14 Nov 2026): built and verified locally, uncommitted.** Verified: `pnpm build` (`/` static, revalidating every minute); gate over real HTTP in `holding`, unset, `LIVE` and `live ` modes (all fail closed); security headers; Turnstile widget loads under the CSP; 16-check browser test of signup against the real London database (invalid, valid, duplicate, honeypot, rate limit; rows cleaned up); animation state sampled at six moments (settles by ~2.7 s); layouts at 390, 768, 1024, 1280x720, 1440x900 and 1920x1080 with no horizontal scroll; reduced-motion and no-JS renders; 112 unit/strict tests plus 7 against the real database. **Not yet done:** Lighthouse run on a Vercel preview, a screen-reader pass, the link-preview check, and Vercel deployment itself (needs the project link and env vars).

**Photography findings (read before using the client's photos):**

- `public/images/day_1/camera/` holds 56 raw JPEGs (~85 MB) of three events: medical outreach (patients including a child), the UK group meeting hosts, and the foundation-stone ceremony at Abajah (clergy, builders, parishioners). They carry EXIF. They were committed and pushed to `origin/dev`.
- **Resolved 2026-11-14:** the production site was briefly set to `SITE_MODE=live` and served every original at a guessable URL (confirmed with a live request) until the mode was set back to `holding`. The originals have since been moved to `originals/` (gitignored, local only) and removed from the tree, so `public/` now holds only the derivatives in `public/media/`. **Still open:** they remain in git history, and in a clone of the repo. If the GitHub repo is, or could become, public, or before it is shared with anyone, purge history (a force-push; the owner's call). Also anyone who fetched the URLs while they were live has copies.
- Photographer credit "Kay Images" is watermarked on many frames. Confirm licence and credit terms with the client.
- Identifiable people (clergy, parishioners, patients, children) need confirmed permission before use on a public site. Until then the holding page uses foliage only. Best finds for later: KAY_5923 (five local builders in hard hats, "Orlu people as agents", for the hospital page), KAY_5854 to KAY_5877 (the stone blessing), KAY_5612 to KAY_5621 (the two communities together).
- A logo is visible on the volunteers' shirts (purple with green and teal). That likely drives the brand palette, which would **not** be the "earth and warmth" the PRD guessed. Confirm with the designer in Phase 1.

**Client inputs:** headline confirmation, mailbox once live, approved consent wording and privacy notice, retention period for subscriber emails, photo permissions (above).

**Client inputs:** headline confirmation, build-site photos (received), mailbox once live, approved consent/privacy wording.

### Phase 1 — Discovery, IA and visual design (Week 1)

**Status (2026-11-15): second pass.** The first slice was judged generic by the owner, so Home was redesigned (print-newsletter language, forest-green ground, numbered editorial rows, the hospital line drawing as the recurring illustration) and the **About** page was built. Details in `docs/DESIGN_BRIEF.md`. The earlier status follows.

**Status (2026-11-14): started; first slice built.** Chosen approach: design directly in the Next.js app (unlinked from production by the holding gate), with a **provisional** earth palette defined as swappable tokens. Done: design tokens plus a WCAG contrast test; shell (sticky header, footer); the full Home page, all ten sections, with the Two Communities see-saw as centrepiece; content model in `lib/site/content.ts` with visible "awaiting" markers and launch checks; axe, keyboard and responsive checks (360 to 1440px) clean; verified that production in `holding` mode is unchanged. Not yet: About, Hospital, Outreach, Get Involved, Donate flow wireframes, Contact, admin shell. See `docs/DESIGN_BRIEF.md`.

- Design brief and tokens (colour from the logo, serif/sans pairing, 8px scale, radii, shadow rules), contrast-checked against WCAG 2.2 AA before use.
- Wireframes then visual design for: Home (with the **Two Communities** centrepiece designed first, since it is the one thing nothing else provides), About (the see-saw), Hospital (build timeline), Medical Outreach, Get Involved, Donate flow (3 steps), Contact, admin shell.
- IA leaves room for News & Updates (L7) without building it.
- Photo selection and treatment guidelines from the Drive folder: Orlu people as agents, no stock, no passive-suffering shots. Image dimensions, crops, compression pipeline decided.
- Content model: every section mapped to a content source (hard-coded, admin-editable, or pending from client).

**Gate:** your approval of the design, then the client's written approval before Phase 2 starts (PRD §14).

**Client inputs:** logo, colours, fonts, remaining copy, answers to §0 and §9 below. **Start now, in parallel:** Stripe registration and HMRC Gift Aid / Charities Online registration (postal activation code, up to a week).

### Phase 2 — Frontend build and the non-financial backend (Week 2)

Frontend: design system components, all public pages, responsive, a11y built in (skip link, focus, labels, error announcement), metadata per page, JSON-LD (`NGO`/`Organization`, `WebSite`, `BreadcrumbList`, `Person`), sitemap, robots, 404/error pages, cookie consent with analytics gated on consent, contact/volunteer/prayer/partnership forms writing to `Enquiry` with Turnstile + rate limit.

Pulled forward from Week 3 (none of it needs a verified Stripe account):

- **Full schema** and migrations (strict review): Programme, Milestone, Donor, Donation, GiftAid, Enquiry, Trustee, AdminUser, plus the gap tables from §4.
- **Admin auth** (strict): argon2id, sessions, invite-only creation, reset, rate limiting, 2FA (TOTP), roles, audit log. Data-access layer guards. `proxy.ts` optimistic redirect only.
- **Admin skeleton and non-financial areas:** Build timeline (milestones + dated photos), Programmes, Trustees, Enquiries, Settings.
- Media: object storage upload with size/type validation and image processing.

CLAUDE.md added: `app/(site)/`, `app/admin/`, `app/admin/(auth)/` (strict), `lib/auth/` (strict), `lib/email/`.

**Gate:** all pages match the approved design at 360 / 768 / 1280 px; axe clean; auth test suite green (including: session fixation, brute-force lockout, direct hit of every admin route and action while logged out); a milestone added in admin appears on the public hospital page via tag revalidation.

### Phase 3 — Payments, Gift Aid and the financial admin (Week 3)

Built in **Stripe test mode**; live keys wait for verification.

1. **Fee calculation** (strict, `lib/payments/`): integer pence, server-side gross-up, rates from config, property tests across amount ranges, rounding rule written down.
2. **Donation flow:** Step 1 amount (one-time/monthly, presets with client impact labels, designation, fee cover), Step 2 details (name, email, Gift Aid with address revealed on tick, message, anonymous), Step 3 Payment Element (card, Apple Pay, Google Pay, SCA). Donation row created `pending`; PaymentIntent/Subscription created server-side; amount re-derived on the server from validated input. Duplicate-submission protection via idempotency keys. Failure → retry with data preserved.
3. **Webhook receiver** (strict): raw-body signature verification, `WebhookEvent` idempotency, handlers for payment success/failure, subscription lifecycle, invoice paid/failed, refunds, disputes (log + alert).
4. **Gift Aid** (strict): verbatim declaration capture with timestamp, encrypted address, scope, retention job, audit-logged admin access, CSV export with HMRC-required fields (HMRC schedule format stays v1.1 per PRD §6.2).
5. **Email** (Resend): receipt (with charity number), recurring receipt, failure/dunning, admin notification, cancellation. React Email templates. SPF, DKIM, DMARC verified.
6. **Financial admin:** dashboard totals, donations table with Gift Aid status, donation CSV, Gift Aid CSV, settings for presets/impact labels/recipients (B5 dependent).
7. **Thank-you page** with monthly-conversion invitation; **Nigerian bank-transfer details** block on `/donate` (L7), with copy approved by the client.
8. **Sponsorship tiers** on Get Involved, amounts from client.

CLAUDE.md added (all strict): `app/donate/`, `app/api/webhooks/stripe/`, `lib/payments/`, `lib/giftaid/`.

**Gate:** Stripe CLI end-to-end: one-time, monthly, failed card, SCA-required card, refund, cancelled subscription, replayed webhook (no double record), forged-signature webhook (rejected, logged). Gift Aid verbatim-text test. Fee-cover property tests. Donation flow completed with a screen reader (NVDA on Windows, VoiceOver on iOS) and keyboard only.

### Phase 4 — QA, hardening and launch (Week 4)

Run PRD §15 as the checklist, plus:

- Pen-test pass on strict areas (OWASP ASVS L1 as a reference), dependency audit, security headers check, SSL Labs A, CSP report-only soak on staging before enforcing.
- Backup restore **tested** into a scratch Neon branch, not just enabled.
- Gift Aid retention job dry run. Data inventory matches the privacy policy.
- Live Stripe keys, live test donation and refund, webhook live endpoint verified.
- Lighthouse (Perf ≥ 90, A11y ≥ 95, SEO ≥ 95) on mobile for every page; Core Web Vitals field-style check.
- Cross-browser and device matrix from PRD §15. Email rendering in Gmail, Outlook, Apple Mail.
- Admin handover: credentials delivered securely, a one-page "how to add a milestone / export Gift Aid" guide, 2FA enrolled.
- Flip `SITE_MODE=live`.

**Gate:** written client sign-off, then launch.

### After launch

Sentry and uptime watch for the first week, GA4 conversion check, Search Console sitemap, a post-launch review of the first real donations against Stripe.

---

## 6. Dependency tracker

| Dependency                                       | Blocks                                        | Owner              | Status                                                   |
| ------------------------------------------------ | --------------------------------------------- | ------------------ | -------------------------------------------------------- |
| B3 Stripe account opened and verified            | Live keys (Phase 4). Test mode is unaffected  | Client             | Open. **Start now**                                      |
| B8 HMRC Gift Aid registration + Charities Online | Real claims, and approved declaration wording | Client             | Open. **Start now**, postal code                         |
| B5 Donation notification recipient               | Admin notifications, settings                 | Client             | Open                                                     |
| B6 Events/News                                   | Nothing blocks. Working assumption L7         | Client             | Open, assumed option 3                                   |
| B7 Nigerian donor route                          | Nigerian bank details on `/donate`            | Client             | Open, assumed option 1                                   |
| Logo, colours, fonts                             | Phase 1 design                                | Client's designer  | Outstanding                                              |
| Registered address, phone                        | Footer, contact, legal                        | Client             | Outstanding                                              |
| Impact labels, sponsorship tiers                 | Donation Step 1, Get Involved                 | Client             | Outstanding                                              |
| Health statistics with sources                   | Home, hospital                                | Client             | Outstanding                                              |
| Testimonials (Orlu and UK parishes)              | Voices section                                | Client             | Outstanding                                              |
| Gift Aid declaration wording approval            | Phase 3                                       | Client             | Outstanding                                              |
| Fee-cover vs Gift Aid treatment                  | Phase 3                                       | Client treasurer   | Outstanding                                              |
| GitHub repo and handle                           | Phase F CODEOWNERS                            | You                | Repo exists; handle outstanding                          |
| Mailboxes live                                   | Phase 0 contact line, Resend domain           | Client / you       | Outstanding                                              |
| Contact email (privacy notice, footer)           | Holding page go-live, UK GDPR rights requests | Client             | Outstanding. `pnpm launch:check` fails until set         |
| Approval of consent wording and privacy notice   | Holding page go-live                          | Client             | Draft written (`lib/subscribers/consent.ts`, `/privacy`) |
| Subscriber email retention period                | Holding page go-live                          | Client             | Proposed: until unsubscribed. Needs a decision           |
| Permission to use identifiable people in photos  | About, Hospital, Outreach pages               | Client             | Outstanding                                              |
| Photo licence and credit terms (Kay Images)      | Every page using the photos                   | Client             | Outstanding                                              |
| Architect's elevation drawing                    | Replacing the stand-in building               | Client / architect | Outstanding. Stand-in ships meanwhile                    |
| Cloudflare Turnstile keys (client account)       | Production sign-up                            | You                | Test keys in use for development                         |

---

## 7. Risks

| Risk                                          | Impact                                                           | Mitigation                                                                                       |
| --------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Stripe verification slips                     | No live donations at launch                                      | Test-mode build; start registration this week; Nigerian transfer details as fallback             |
| HMRC activation code is posted and slow       | No Gift Aid claims at launch                                     | Gift Aid capture works regardless; claims can start once enrolled. Capture is what must be right |
| Phase 0 half-day budget is optimistic         | Delays Week 1                                                    | Phase F is separate; stand-in SVG; do not add features to the holding page                       |
| Nonce CSP and Cache Components interact badly | Broken scripts or lost caching                                   | Verify by building, per D1; CSP report-only soak in Phase 4                                      |
| Holding gate misconfigured                    | Unfinished donation or admin routes reachable on the live domain | Fail-closed default; test for every route; strict registry file                                  |
| Solo CODEOWNERS blocks your own merges        | Friction, or people disabling the rule                           | Decide the review setup when the repo is created                                                 |
| Gift Aid / fee-cover handled wrongly          | Over-claiming Gift Aid, regulatory exposure for the charity      | Open question to the treasurer; no code until answered                                           |
| Placeholder SVG shipped as final              | A fake building on a real charity's page                         | Tracked as a placeholder with an owner and a swap condition                                      |
| Content arrives late                          | Design built on lorem ipsum                                      | Content model in Phase 1 flags every section's source; PRD §14 shifts the timeline by the delay  |

---

## 8. Definition of done (every change)

1. Types, lint and tests pass. `pnpm test:strict` passes if any strict area was touched.
2. New or changed personal-data field is added to the data inventory.
3. Any change to a strict area: approved at the hook prompt, a changelog line added to that area's CLAUDE.md, an ADR if an invariant changed.
4. UI changes: keyboard and focus checked, 4.5:1 contrast, reduced motion respected.
5. No secret, donor data or Gift Aid field appears in logs, Sentry or analytics.

---

## 9. Still to confirm with you

1. ~~GitHub handle~~ **Resolved (14 Nov):** Fusco creates the repo and handles the owner setup.
2. ~~D2 `SITE_MODE` gate~~ **Resolved (14 Nov):** accepted. Fail-closed default, route-leak test in CI, no admin or Stripe secrets on the production environment until launch week.
3. ~~CODEOWNERS with a solo owner~~ **Resolved (14 Nov):** keep the CODEOWNERS file, do **not** enable "require code owner review" until a second person joins. Enforcement meanwhile = Claude hook + pre-commit check + CI protected-path check. Revisit when the team grows.
4. ~~D5 Postgres rate limiting~~ **Resolved (14 Nov):** accepted.
5. ~~Gift Aid / fee-cover contact~~ **Deferred (14 Nov):** TBD later, does not block development. Phase 3 builds Gift Aid capture and fee calc behind the documented assumption and does not go live until answered.
6. ~~Turnstile account~~ **Resolved (14 Nov):** the key lives in the **client's Cloudflare account**, created by Fusco under a dedicated client email, handed over when the client requests it. Keys go in Vercel env vars; record the account email in the handover notes, never in the repo.
