# Design brief: Seed of Success Foundation

Phase 1. Status: **second pass built**: a redesign of the first slice (the owner found it "regular"), plus the About page. Not yet approved by Fusco or the client. Source: PRD §1, §4, §5, §11. Palette is **provisional** until the logo arrives.

## What the design has to do

Tell the real story: two communities helping each other. Nigerian priests have served seven English dioceses since 2006, and those parishes now help build a hospital in Orlu. Reciprocity is the spine, so the Two Communities section is designed first and is the centrepiece of Home. Prayer comes before money. Orlu people appear as agents (builders, the architect, the engineer, clinicians, trustees), never as passive recipients. Dignified, warm, plain-spoken. Not corporate-NGO, not startup, not pity-driven. No stock imagery. British English.

## The direction: a parish newsletter set by a good printer

The first pass used the default "modern website" kit (soft cards, rounded corners, an even grid of sections) and read as generic. The second pass takes its identity from print and from the building:

- **Section numbers in Roman numerals** with a hairline running to the margin, so the page reads as an edition, not a stack of blocks.
- **A newspaper dateline** under the masthead (where, and the charity number), instead of a floating eyebrow.
- **Cards are gone.** Our Work and Get Involved are numbered editorial rows (01, 02, 03) separated by rules.
- **Italic emphasis in red earth** inside serif headings ("Bringing _Hope_", "_being built_"), big italic numerals ("One million").
- **Three grounds, each with a job:** warm cream paper; **dark forest green** for Two Communities and prayer (the "seed"); near-black for the closing call and footer. Gold appears only on the dark grounds.
- **The hospital's own line drawing** is the one recurring illustration: it opens the holding page, and now closes the Home and About pages with the building standing on the footer line.
- **A chapel window** (double-ruled arch with a keystone) frames the hero photograph; the newsletter is a framed clipping; corners are sharp, like print.
- **A faint paper grain** (4%) over the page. Decorative only.

## What is built (preview with `pnpm dev:live`)

| Piece                             | Where                                                             | Notes                                                                                                                                                                                                          |
| --------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tokens                            | `app/globals.css`                                                 | Provisional palette, 8px spacing scale, one radius, one shadow. Swappable in one file.                                                                                                                         |
| Contrast gate                     | `tests/unit/design-contrast.test.ts`                              | Reads the tokens and fails if any pairing drops below WCAG 2.2 AA.                                                                                                                                             |
| About Us (PRD §4.2)               | `components/site/about.tsx`, `app/about/page.tsx`                 | The see-saw built properly: Orlu gives England / England gives Orlu, mission and vision, the five objectives, trustees and advisers, governance. Trustee photos and biographies are awaited and marked.        |
| Shell                             | `components/site/shell.tsx`, `site-header.tsx`, `site-footer.tsx` | Sticky header with Donate always reachable; `<details>` menu below 900px (no JavaScript needed); skip link.                                                                                                    |
| Home, all 10 sections of PRD §4.1 | `components/site/`                                                | Hero, The need, **Two Communities**, The hospital is being built, Our work, Voices, Get involved (prayer first), Trust row, Newsletter, Final call to action.                                                  |
| Two Communities                   | `two-communities.tsx`, `balance.tsx`                              | A see-saw (the client's own image) with a cross on the Orlu end and the hospital on the England end. It rocks and settles level as it scrolls into view; reduced motion and unsupported browsers see it level. |
| Content model                     | `lib/site/content.ts`                                             | Every sentence from the PRD; gaps are `null`/empty and render a visible "Awaiting from the charity" marker.                                                                                                    |

Not built yet (links point at them and 404 in a live preview): Our Work (hospital page with full timeline, outreach), Get Involved, Donate flow (3 steps), Thank-you, Contact, Terms, admin shell. These are the next Phase 1 slices; building them as pages is Phase 2.

## Tokens (provisional)

| Token                                     | Value                           | Use                                                               |
| ----------------------------------------- | ------------------------------- | ----------------------------------------------------------------- |
| `--paper` / `--paper-2`                   | `#f7f1e5` / `#efe5d2`           | Page ground (deep cream, not white) / alternate sections          |
| `--ink` / `--ink-2`                       | `#241a11` / `#554639`           | Text / secondary text                                             |
| `--earth` / `--earth-hover`               | `#a03d0e` / `#7e2f0b`           | Links, primary buttons, big numerals, italic emphasis (red earth) |
| `--forest`                                | `#1b3a2c`                       | The green ground: Two Communities, prayer                         |
| `--palm`                                  | `#2d4a3a`                       | Green as text on light grounds (the success line, list markers)   |
| `--night`, `--night-ink`, `--night-ink-2` | `#1d130b`, `#f6ecda`, `#d3c4aa` | Dark sections and footer, and the text on them and on forest      |
| `--gold`                                  | `#d19a3f`                       | Accent on dark grounds ONLY (fails AA on paper; a test pins this) |
| `--rule`                                  | `#d8c9ae`                       | Hairlines. Decorative only                                        |

Contrast checked (all 20 pairings pass, including night text and gold on both dark grounds): ink on paper at least 7:1; secondary text at least 4.5:1; links and green text at least 4.5:1 on both paper grounds; white on earth at least 4.5:1; light text on night and forest at least 7:1; gold on night and forest at least 4.5:1. The tokens are hex (not oklch) because the test parses them. **When the logo's colours arrive**, change the values in `app/globals.css`; the test says whether the new pairings pass, and the contrast of anything that fails is fixed there, not in components.

## Type and space

Newsreader (serif) for headings, quotations and numerals: gravitas and a pastoral, institutional feel. Geist for body. Body never below 16px, line height 1.5. Fluid heading scale (`clamp`). Spacing on the 8px scale. Touch targets at least 44px. Brand fonts are outstanding from the client; Newsreader and Geist stand in.

## Photography rules

Orlu people as agents. No stock. No pity imagery. The building itself is the strongest trust signal: the hero is the hospital under scaffolding, framed as a chapel window, with the day count beneath it. Photographs of identifiable people appear only where the site owner has accepted the permission risk (see `components/holding/CLAUDE.md`). Originals live in `originals/` (gitignored); only resized, metadata-stripped derivatives are served from `public/media/`.

## Content model: where each piece lives

| Content                                                          | Source                                                                         | Status                        |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------------------- |
| Hero headline, mission, location                                 | Hard-coded from the PRD (`charity.ts`)                                         | Done                          |
| The need: "One million", three qualitative statements            | Hard-coded from client documents                                               | Done. **Sources outstanding** |
| Two Communities text, seven dioceses                             | Hard-coded from the PRD (`content.ts`)                                         | Done                          |
| Build timeline                                                   | Hard-coded now; **admin-editable in Phase 2** (milestones, revalidated by tag) | Done as content               |
| Day counter                                                      | Computed (`constructionDay`)                                                   | Done                          |
| Our Work, services lists                                         | Hard-coded from the PRD                                                        | Done                          |
| Testimonials (one Orlu, one English parish)                      | Admin-editable                                                                 | **Pending from client**       |
| Dated "this month" progress photograph                           | Admin-editable (Phase 2)                                                       | **Pending from client**       |
| Registered address, phone, contact email, social handles         | `charity.ts`                                                                   | **Pending from client**       |
| Gift Aid mark                                                    | Shown only once HMRC registration (B8) is confirmed                            | Omitted until then            |
| Impact labels, sponsorship tiers, funding goal and amount raised | Admin-editable (Phase 3)                                                       | **Pending from client**       |

## Information architecture

`/`, `/about`, `/our-work`, `/our-work/st-perpetua-hospital`, `/our-work/medical-outreach`, `/get-involved`, `/donate`, `/donate/thank-you`, `/contact`, `/privacy`, `/terms`, `/admin/*`. Room is left for News & Updates (B6, assumed option 3: IA now, build later) without building it. Events are posts with a date, if ever.

## Decisions to confirm

1. **Palette** is provisional; the second pass moved from a flat brown-and-orange to cream, red earth, forest green and gold. Should the client's designer's logo colours differ (the volunteers' shirts show violet with green), the tokens swap with no component changes; the look will change a lot.
2. **Heading for Two Communities** is "Two communities, helping each other." (the client's own phrase), not the PRD's "each giving the other something it lacks", which is a claim about the English church the client has not made.
3. **About copy.** Two sentences come from the PRD narrative and need the charity's confirmation before launch: "A church short of vocations has been sustained by Nigerian clergy for twenty years" (PRD §1) and "Bishop Mark O'Toole visited Bishop Augustine" (PRD §4.2, no date or place given).
4. **Hospital pages and the donation flow** are the next design slices.

## Approval

Gate (PRD §14): Fusco approves the design, then the client approves in writing, before Phase 2 starts. The client reviews a Vercel Preview deployment with `SITE_MODE=live` (Preview environment only; Production stays `holding`). Vercel deployment protection is on, so the client needs a Vercel shared link or an account.
