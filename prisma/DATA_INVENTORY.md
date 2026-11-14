# Data inventory

Every table that holds personal data, why we hold it, our lawful basis and how long we keep it. Updated in the **same change** as any schema change that adds personal data. Feeds the privacy policy (`/privacy`).

| Table                | Personal data                                                | Purpose                                                   | Lawful basis (UK GDPR / PECR)                               | Retention                                                                                                                                                                                       | Access            |
| -------------------- | ------------------------------------------------------------ | --------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `subscribers`        | Email address; consent wording and timestamp; source         | Tell people when the site launches, later news and appeal | Consent (recorded verbatim). Withdrawal honoured on request | **TBD with client.** Proposed: until unsubscribed, or 24 months after last confirmed contact                                                                                                    | Named admins only |
| `rate_limit_buckets` | None directly. Key is an HMAC of IP + action, not the raw IP | Abuse and brute-force protection                          | Legitimate interests (security)                             | Temporary. Stale rows (older than 24h) are purged opportunistically on later requests, so on a quiet site a row can outlive that. Add a scheduled purge before launch if a firm limit is wanted | Application only  |

## To add in Phase 2 and 3 (not yet created)

`donors`, `donations`, `gift_aid_declarations` (name and home address encrypted at application level, six-year retention), `enquiries`, `trustees`, `admin_users`, `sessions`, `audit_log`, `webhook_events`, `password_resets`.

## Rules

- A new personal-data column is added here in the same change, with purpose, basis and retention.
- Retention "TBD" blocks go-live, not development. Raise it with the client before launch.
