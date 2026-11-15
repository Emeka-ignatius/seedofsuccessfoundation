# Full site components (Phase 1 design, built for real)

The public site's design system and home page. Organisational file: edit freely, but keep the rules below. Design decisions and the content model are in `docs/DESIGN_BRIEF.md`.

## How it is shown

`app/page.tsx` renders `<Home />` only when `SITE_MODE` is exactly `live` (read through `lib/security/site-mode.ts`, never `process.env` directly). Otherwise `/` is the holding page. Production stays on `holding` until launch; preview with `pnpm dev:live` locally, or a Preview deployment with `SITE_MODE=live`. Every other route is invisible in holding mode by the deny-by-default gate, so new pages here cannot leak.

## Design language (second pass)

A parish newsletter set by a good printer, not the default "modern website" kit. Keep it: Roman-numeral section numbers with a hairline (`sx-eyebrow` + `sx-no`), a dateline under the masthead, numbered editorial rows (`sx-row`) instead of cards, italic red-earth emphasis in serif headings, sharp print-like corners (`--radius`), three grounds each with a job (cream paper, **forest green** for Two Communities and prayer, near-black for the closing call and footer), **gold only on dark grounds**, and the hospital line drawing (`elevation-flat.tsx`) as the one recurring illustration. Do not add soft rounded cards, gradients, glass or glow. Full rationale in `docs/DESIGN_BRIEF.md`.

## Rules

- **Classes are prefixed `sx-`.** The holding page's CSS is global and ships in the same bundle; generic names (`.headline`, `.eyebrow`, `.reveal`) belong to it. Do not reuse them.
- **Colour comes from the tokens in `app/globals.css`**, never a hex in a component or in `site.css`. The palette is provisional (red earth, palm green); the logo's colours replace it in that one file. `tests/unit/design-contrast.test.ts` reads the file and fails if any text/background pairing drops below WCAG 2.2 AA, so a swap is checked automatically.
- **Content comes from `lib/site/content.ts` and `lib/site/charity.ts`**, which hold only what the PRD or the client supplied. Missing content is `null`/empty and rendered as `<Pending>`, a visible dashed marker. Never write copy that states a fact we do not have (a statistic, a quotation, a date, a Gift Aid claim). `pnpm launch:check` fails until every `Pending` is resolved.
- **No stock imagery, no pity imagery.** Orlu people are agents: builders, the architect, the engineer, clinicians. Photographs of identifiable people are used only where the owner has accepted the permission risk (see `components/holding/CLAUDE.md`); never as text wallpaper without that.
- **Donate stays reachable** (sticky header, hero, final call to action) but one primary action per screen.
- Accessibility is built in: skip link, visible focus, 44px targets, `prefers-reduced-motion`, no meaning carried by colour alone. Decorative SVG is `aria-hidden`; its meaning is in the text beside it.

## The Two Communities centrepiece

`two-communities.tsx` + `balance.tsx`: a see-saw (the client's own image) with a cross on the Orlu end and the hospital on the England end, over two text panels. The beam rocks and settles level as it scrolls into view via scroll-driven CSS animation (`animation-timeline: view()`), with the pans counter-rotating so they hang level. Browsers without support, and reduced-motion visitors, see it level. Keep the text as the content: the drawing is decoration.

## Pages

`shell.tsx` (`SiteShell`) wraps every page: skip link, sticky header, footer. Built: Home (`home.tsx`) and About (`about.tsx`, route `app/about/page.tsx`). Every route here is invisible in holding mode by the gate.

## Not built yet

Links to `/our-work/*`, `/get-involved`, `/donate`, `/contact`, `/terms` point at pages that arrive in Phase 2 and 3. In a live-mode preview they 404 for now.
