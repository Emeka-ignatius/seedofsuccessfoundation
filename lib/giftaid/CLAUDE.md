# STRICT — Gift Aid & donor PII

Covers: `lib/giftaid/**`. **Seed rules from Phase F; refine in Phase 3 when this is built.**

## Why this is strict

Gift Aid records are the most sensitive data on the site: name, home address and giving history, kept for six years. They are also a tax claim made on a donor's behalf. A wrong declaration means over-claiming from HMRC; a leak means exposing donors' homes.

## Invariants

1. The declaration text shown to the donor is stored **verbatim**, with the timestamp it was shown. It is never rebuilt later from the current template.
2. Captured per declaration: charity name shown, donor full name, donor **home address**, scope (this donation only, or past/present/future), the donor's affirmative tick, the exact tax-liability statement, and the date shown.
3. Name and address are encrypted at application level (AES-256-GCM, key from env, key version stored per row) before reaching the database.
4. Retention is six years from the end of the relevant accounting period, then purged by a documented job. Retention periods are in `prisma/DATA_INVENTORY.md`.
5. Admin access to Gift Aid data is limited to named individuals and every view and export writes an audit-log row.
6. Gift Aid fields never appear in logs, Sentry events, analytics or error messages.
7. The Gift Aid checkbox is never pre-ticked and the declaration is never implied by another action.
8. v1 export is a CSV with the fields HMRC requires. Automated submission to HMRC is out of scope.

## Forbidden

- Pre-ticking the box, hiding the declaration, or paraphrasing the approved wording.
- Joining a stored declaration back to the live donor record to "refresh" it.
- Shipping declaration wording the charity has not approved in writing.
- Exporting Gift Aid data without an audit entry.
- Returning decrypted address data to the client, or to any admin screen that does not need it.

## Open questions (client / treasurer, TBD, do not block development)

- Approved declaration wording (HMRC model wording; the charity must approve).
- Whether a donor-covered processing fee is Gift Aid-eligible, and on what basis. **Do not guess.** Build behind a documented assumption; this blocks go-live, not development.
- HMRC Gift Aid registration and Charities Online activation (client action, postal code).

## Change protocol

Propose → diff → user approves → `pnpm test:strict` → changelog line. A change to an invariant needs an ADR and, for declaration wording, the charity's written approval.

## Required checks

`pnpm test:strict` · `pnpm typecheck`. Includes the verbatim-text test, encryption round-trip with key rotation, retention purge dry run, and CSV field check against HMRC's requirements.

## Test coverage that guards this

Built in Phase 3 (`tests/strict/giftaid.*.test.ts`).

## Changelog

- 2026-11-14 — Seed rules created in Phase F.
