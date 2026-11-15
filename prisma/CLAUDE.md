# STRICT — Database schema & migrations

Covers: `prisma/**` (schema, migrations, seed). Prisma and the Neon connection arrive in Phase 0; this file applies from the first migration.

## Why this is strict

The database holds donor names, home addresses and giving history, kept six years. A bad migration can destroy donation records or expose personal data, and it cannot be un-run once it reaches production.

## Invariants

1. Money columns are integer pence plus an explicit `currency`. Never `Float`/`Decimal` for amounts we compute with.
2. Every table that holds personal data is listed in the data inventory (`prisma/DATA_INVENTORY.md`) with its purpose, lawful basis and retention period.
3. Gift Aid declaration rows are a point-in-time snapshot: declaration text, donor name and address as shown, timestamp. They are never joined back to the live `Donor` row to rebuild what the donor saw.
4. Gift Aid name and address columns hold ciphertext (application-level AES-256-GCM, key version stored per row). Plaintext never reaches the database.
5. Webhook processing is idempotent: `WebhookEvent` has a unique constraint on the Stripe event id.
6. Migrations are forward-only and reviewed by the user. No edits to an applied migration.
7. Production is migrated only by the deployment pipeline, never from a laptop against the production URL.

## Forbidden

- `prisma migrate reset`, `db push --force-reset` or any command that drops data, against anything but a throwaway local or Neon branch database.
- Running a migration against production from a developer machine.
- Destructive changes (drop column/table, type narrowing) without an ADR and a tested backup.
- Storing card data, full PAN, CVC or any Stripe secret.
- Adding a personal-data column without updating the inventory in the same change.
- Seeding real donor data into any non-production database.

## Change protocol

Propose the schema diff and the generated SQL → user approves → apply to a scratch Neon branch and check the data inventory → `pnpm test:strict` → changelog line. Destructive changes: ADR in `docs/decisions/` plus a verified restore point first.

## Required checks

`pnpm typecheck` · `pnpm test:strict` · migration applied cleanly to a fresh branch database.

## Test coverage that guards this

Idempotent webhook insert; Gift Aid snapshot immutability; encryption round-trip with key rotation (all Phase 3).

## Changelog

- 2026-11-14 — Created in Phase F, before the first migration.
- 2026-11-14 — Draft schema proposed: `subscribers`, `rate_limit_buckets` (Phase 0). `prisma.config.ts` added to this area. Awaiting approval; not applied to any database.
