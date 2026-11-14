# STRICT — Donations, Stripe, webhooks & fees

Covers: `lib/payments/**`, `app/donate/**`, `app/api/webhooks/**`. **Seed rules from Phase F; refine in Phase 3 when this is built.**

## Why this is strict

This is real money from real donors. A forged "payment succeeded", a double-recorded gift, a wrong fee calculation or a card-data leak each damages the charity directly and may carry regulatory consequences.

## Invariants

1. Amounts are integer pence, currency GBP. Never floats.
2. **The browser never decides a payment succeeded.** A donation becomes `succeeded` only from a signature-verified Stripe webhook.
3. The webhook handler verifies the signature against the **raw** request body before parsing, and rejects (and logs) anything unverified.
4. Webhook handling is idempotent on the Stripe event id (stored in `WebhookEvent`). A replayed event never creates a second donation.
5. No card data touches our servers. Stripe Payment Element tokenises in the browser (PCI SAQ A).
6. Stripe secret keys and the webhook secret are server-only, read through `lib/security/env.ts`, never committed, never in client bundles.
7. The amount, currency, recurrence and fee-cover figure are **re-derived on the server** from validated input. Client-sent totals are never trusted.
8. Fee-cover is computed server-side from the client's actual Stripe pricing held in config, not hardcoded from memory, with a written rounding rule and property tests.
9. Duplicate submissions are prevented with idempotency keys. A failed payment preserves entered data for retry.
10. Refunds, cancellations, failures and disputes reconcile via webhook and alert the admin.
11. Donation creation is rate-limited and bot-protected (Turnstile + honeypot).

## Forbidden

- Trusting a redirect, return URL or client callback as proof of payment.
- Parsing the webhook body before verifying its signature.
- Logging card details, secrets, full webhook payloads containing personal data, or donor addresses.
- Hardcoding Stripe fee rates, price ids or keys.
- Marking a donation successful, or issuing a receipt, from anywhere but the verified webhook path.
- Going live (live keys) before the end-to-end gate in the plan (Phase 3) has passed.

## Open question that blocks go-live

How a covered processing fee interacts with Gift Aid eligibility is **unanswered** (needs the client's treasurer). Build behind a documented assumption; do not ship to live until answered. See `lib/giftaid/CLAUDE.md`.

## Change protocol

Propose → diff → user approves → `pnpm test:strict` plus the Stripe CLI scenarios → changelog line. An invariant change needs an ADR.

## Required checks

`pnpm test:strict` · `pnpm typecheck` · Stripe CLI end-to-end in test mode: one-time, monthly, failed card, SCA card, refund, cancelled subscription, replayed webhook, forged-signature webhook.

## Test coverage that guards this

Built in Phase 3 (`tests/strict/payments.*.test.ts`): fee property tests, webhook signature and idempotency, server-side amount derivation.

## Changelog

- 2026-11-14 — Seed rules created in Phase F.
