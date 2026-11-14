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

The background (`backdrop.tsx`) slowly crossfades between five palm-grove views, canopy strips cut from the outdoor frames and made by `pnpm media:holding` into `public/media/grove-1..5.jpg`. They deliberately contain no people. Do not put identifiable people behind text as wallpaper: the clergy, parishioners and patients in the client's photographs have not been asked. People appear on pages where they are the point (hospital builders, outreach, the two communities), after permission is confirmed.

- **Adding or changing a frame:** edit the `GROVE` list in `scripts/media/holding.mjs`, run the script, and look at the output. A head, cap or hard hat on the bottom edge fails it (this happened three times on the first attempt). Then edit `SLIDES` in `backdrop.tsx`.
- **Pure CSS, written for exactly five layers.** `@keyframes backdrop-cycle` uses percentages derived from 5 layers x 9s. For a different count, change `--slot` and the percentages together (fade-in = 1/N of the cycle's fade share, hold through the next layer's fade-in). Layers are raised while they fade in so the first can fade over the last at the wrap; the backdrop is its own stacking context so this cannot cover the content.
- **Reduced motion** shows the first photograph, still. No JavaScript is involved, so it cycles with JS off.
- `holding-bg.jpg` is the same view as `grove-1` and is read by the social-share image; leave it.

## Colours and type

Temporary tokens in `holding.css`, drawn from the site's red earth and palm shade. Replace with the brand palette when the logo arrives. Newsreader (serif) for headings, Geist for body.

## Before changing layout

Check these in a real browser (Playwright is installed: `pnpm exec playwright install chromium` once): 1440x900 and 1920x1080 fit one screen; 1280x720 keeps the building visible; 1024 and below stack with the building under the header; 390x844 has no horizontal scroll.
