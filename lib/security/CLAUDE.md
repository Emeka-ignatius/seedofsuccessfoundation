# STRICT — Security config, proxy & secrets

Covers: `lib/security/**`, `proxy.ts`, `next.config.ts`, `.env*`, and `tests/strict/**`.

## Why this is strict

This is what stands between a mistake and the public internet: which routes are reachable (`SITE_MODE`), what scripts may run on the donation page (CSP), and where secrets live. A loosened header or a leaked key affects every donor. Failures here are silent until exploited.

## Invariants

1. `SITE_MODE` fails closed: only the exact string `live` exposes the full site. Everything else serves the holding page (`site-mode.ts`, tested in `tests/strict/site-mode.test.ts`).
2. In `holding` mode only the allow-list in `gate.ts` is reachable: `/`, `/privacy`, the share image, `robots.txt`, `favicon.ico` and `/media/*`. Everything else is deny-by-default: page requests redirect to `/`, anything else gets 404. The client's raw photo originals under `/public/images` are never served. `tests/strict/holding-gate.test.ts` derives every route from `app/` and fails if a route is reachable that should not be.
3. No secret is committed or prefixed `NEXT_PUBLIC_`. Secrets are read only via `getEnv()` in `env.ts`. Non-secret platform flags (`NODE_ENV`, `VERCEL_ENV`) may be read in `next.config.ts` and `robots.ts`, which cannot import the server-only env module.
4. CSP is split by route (plan D1): strict nonce-based CSP on `/donate`, `/admin/*`, `/api/webhooks/*`; origin-allowlist CSP from `next.config.ts` on public pages. Stripe directives per PRD §9.2.
5. HSTS, `frame-ancestors`, `X-Content-Type-Options` and `Referrer-Policy` are set on every response.
6. Rate limiting is Postgres-backed (plan D5) and applies to login, reset, donation intent creation, public forms and subscribe.
7. Error output never contains secret or personal values. Env validation reports variable names only.
8. Admin and Stripe secrets are absent from the production environment until launch week.
9. Bot protection fails closed: a missing Turnstile secret, a network error or a timeout means "not verified" and the form refuses. Public forms run `honeypot -> rate limit -> Turnstile -> validation -> write`, in that order, and never log the address, the token or the client IP.
10. The rate limiter stores only `HMAC(secret, action:address)`, never a raw IP, and the counter update is one atomic statement (tested under concurrency).
11. Anything a person could be misled by stays true: the privacy notice may only state what the code actually does (it once claimed deletion "within a day" for a purge that is probabilistic; corrected).

## Forbidden

- Weakening a header or directive, adding `'unsafe-eval'` outside dev, adding `'unsafe-inline'` to a nonce route.
- Reading secrets from `process.env` anywhere but `env.ts` (and `SITE_MODE` anywhere but `site-mode.ts`).
- Making `SITE_MODE` default to `live`, or accepting case-insensitive or trimmed matches.
- Deleting or loosening a test in `tests/strict/` to make a change pass.
- Adding a third-party script without recording what it can see and why.

## Change protocol

Propose → show the diff and the exact effect on what is reachable or allowed → user approves → `pnpm test:strict` and `pnpm typecheck` → add a changelog line below. An invariant change also needs a short ADR in `docs/decisions/`.

## Required checks

`pnpm test:strict` · `pnpm typecheck` · `pnpm lint`. For header or CSP changes, build and inspect real responses (do not assume), then run a CSP report-only soak on a preview before enforcing.

## Test coverage that guards this

- `tests/strict/site-mode.test.ts` (fail-closed parsing)
- `tests/strict/holding-gate.test.ts` (route-leak walk plus 30+ hostile paths, GET and POST)
- `tests/strict/headers.test.ts` (CSP and baseline headers)
- `tests/strict/rate-limit.test.ts` (pure key tests; real-database tests via `pnpm test:db`)

## Changelog

- 2026-11-14 — Created in Phase F. `SITE_MODE` fail-closed helper and env validation.
- 2026-11-14 — Phase 0 (approved by Fusco as described in the plan): `proxy.ts` holding gate (deny-by-default), public CSP and security headers in `next.config.ts`, Postgres rate limiter, Turnstile verification, env schema for the new secrets. Verified over real HTTP in holding, unset, `LIVE` and `live ` modes. Nonce CSP for /donate and /admin is still to come (Phase 2/3).
