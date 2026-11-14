# STRICT — Security config, proxy & secrets

Covers: `lib/security/**`, `proxy.ts`, `next.config.ts`, `.env*`, and `tests/strict/**`.

## Why this is strict

This is what stands between a mistake and the public internet: which routes are reachable (`SITE_MODE`), what scripts may run on the donation page (CSP), and where secrets live. A loosened header or a leaked key affects every donor. Failures here are silent until exploited.

## Invariants

1. `SITE_MODE` fails closed: only the exact string `live` exposes the full site. Everything else serves the holding page (`site-mode.ts`, tested in `tests/strict/site-mode.test.ts`).
2. In `holding` mode, `/admin`, `/donate`, `/api/*` (except the subscribe endpoint) and every non-holding page return the holding page or 404. A test asserts this for every route.
3. No secret is committed or prefixed `NEXT_PUBLIC_`. Secrets are read only via `getEnv()` in `env.ts`.
4. CSP is split by route (plan D1): strict nonce-based CSP on `/donate`, `/admin/*`, `/api/webhooks/*`; origin-allowlist CSP from `next.config.ts` on public pages. Stripe directives per PRD §9.2.
5. HSTS, `frame-ancestors`, `X-Content-Type-Options` and `Referrer-Policy` are set on every response.
6. Rate limiting is Postgres-backed (plan D5) and applies to login, reset, donation intent creation, public forms and subscribe.
7. Error output never contains secret or personal values. Env validation reports variable names only.
8. Admin and Stripe secrets are absent from the production environment until launch week.

## Forbidden

- Weakening a header or directive, adding `'unsafe-eval'` outside dev, adding `'unsafe-inline'` to a nonce route.
- Reading `process.env` directly outside `env.ts` and `site-mode.ts`.
- Making `SITE_MODE` default to `live`, or accepting case-insensitive or trimmed matches.
- Deleting or loosening a test in `tests/strict/` to make a change pass.
- Adding a third-party script without recording what it can see and why.

## Change protocol

Propose → show the diff and the exact effect on what is reachable or allowed → user approves → `pnpm test:strict` and `pnpm typecheck` → add a changelog line below. An invariant change also needs a short ADR in `docs/decisions/`.

## Required checks

`pnpm test:strict` · `pnpm typecheck` · `pnpm lint`. For header or CSP changes, build and inspect real responses (do not assume), then run a CSP report-only soak on a preview before enforcing.

## Test coverage that guards this

- `tests/strict/site-mode.test.ts` (fail-closed parsing)
- Holding-gate route test (Phase 0)
- Security headers test (Phase 0 onwards)

## Changelog

- 2026-11-14 — Created in Phase F. `SITE_MODE` fail-closed helper and env validation.
