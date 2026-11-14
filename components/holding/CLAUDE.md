# Holding page (Phase 0)

The page at `/` until launch. It announces that the hospital is rising, not that a website is under construction. Organisational file: edit freely, but keep the content rules.

## Content rules

- Every sentence comes from the PRD (§3A) or the client's own mission statement. Facts about the charity live in `lib/site/charity.ts`. Never invent one; a missing fact is `null` and `pnpm launch:check` fails until the client supplies it.
- No donation functionality. Stripe is not verified, and soliciting before launch carries compliance risk.
- The charity number appears on the page.

## The three moving parts

- **Self-drawing building** (`elevation*.ts(x)`): a **stand-in** drawing, not the architect's elevation. Replace the paths in `elevation-geometry.ts` with a trace of Ifeanyi Achugasim's real drawing when it arrives; the OG image reuses the same geometry. Pure CSS, so it works without JavaScript; `prefers-reduced-motion` shows it complete. Each part is one `pathLength={1}` path; timing is `delay` and `duration` in the geometry file. Do not use `vector-effect: non-scaling-stroke` (it breaks dash maths in Chrome).
- **Day counter** (`day-counter.tsx`): `use cache` with `cacheLife("minutes")`, so the number is in the static HTML and shows without JavaScript. Do not turn it into a request-time value behind Suspense: that streams in through a script and never appears with JS off.
- **Sign-up** (`signup-form.tsx`, `lib/subscribers/actions.ts`): needs JavaScript (Turnstile). The server stores the consent wording from `lib/subscribers/consent.ts`, never what the browser posts. Signup is disabled, not weakened, if Turnstile or the rate limiter is not configured.

## Photography

The background is the palm grove cropped from KAY_5841, foliage only, made by `pnpm media:holding`. It deliberately contains no people. Do not put identifiable people behind text as wallpaper: the clergy, parishioners and patients in the client's photographs have not been asked. People appear on pages where they are the point (hospital builders, outreach, the two communities), after permission is confirmed.

## Colours and type

Temporary tokens in `holding.css`, drawn from the site's red earth and palm shade. Replace with the brand palette when the logo arrives. Newsreader (serif) for headings, Geist for body.

## Before changing layout

Check these in a real browser (Playwright is installed: `pnpm exec playwright install chromium` once): 1440x900 and 1920x1080 fit one screen; 1280x720 keeps the building visible; 1024 and below stack with the building under the header; 390x844 has no horizontal scroll.
