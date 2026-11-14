# STRICT — Admin auth & sessions

Covers: `lib/auth/**`, `app/admin/(auth)/**`. **Seed rules from Phase F; refine in Phase 2 when this is built.**

## Why this is strict

The admin dashboard exposes donor names, home addresses and giving histories. One weak check is a data breach for a charity that depends on donor trust.

## Invariants

1. Passwords are hashed with argon2id. Never logged, never returned, never emailed.
2. Session cookie: `httpOnly`, `secure`, `sameSite`. Sessions are server-verified on every request.
3. `proxy.ts` is an optimistic redirect only. **Every** admin page, server action and route handler re-checks the session in the data-access layer (see `node_modules/next/dist/docs/01-app/02-guides/authentication.md`).
4. Login, password reset and invite are rate-limited (Postgres, plan D5) and return uniform error messages that do not reveal whether an email exists.
5. Admin accounts are created by invite only. No public sign-up. No shared logins.
6. Roles are enforced server-side. The client never decides what a user may do.
7. TOTP two-factor is available and encouraged for every admin.
8. Viewing or exporting Gift Aid data writes an audit-log row (who, what, when).
9. Reset and invite tokens are single-use, short-lived, stored hashed.

## Forbidden

- Rolling custom crypto. Use vetted libraries.
- Storing or logging a password, session token or reset token in plaintext.
- Skipping the DAL check because "the proxy already covers it".
- Long-lived sessions without re-authentication for sensitive actions.
- Debug backdoors, default credentials, or an env flag that disables auth.

## Change protocol

Propose → diff → user approves → `pnpm test:strict` → changelog line. A change to an invariant needs an ADR.

## Required checks

`pnpm test:strict` · `pnpm typecheck`. Auth suite must include: logged-out request to every admin route and action, brute-force lockout, session fixation, role escalation attempt, expired and reused reset token.

## Test coverage that guards this

Built in Phase 2 (`tests/strict/auth.*.test.ts`).

## Changelog

- 2026-11-14 — Seed rules created in Phase F.
