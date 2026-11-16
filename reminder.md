# Reminder: questions and decisions, page by page

Written overnight, 2026-11-15, while you slept. Nothing here is committed or deployed. Work through it in order: section 1 is yours, section 2 is the client's (copy it into a message), section 3 is what I decided without you so you can veto it.

**To preview everything:** `pnpm dev:live` then open http://localhost:2017. (Your `.env` currently has `SITE_MODE=live`, so a plain `pnpm dev` also shows the full site on your machine. Production on Vercel is a separate setting and stays on `holding`.)

---

## 1. For you (Fusco)

### Approvals I need before I can go further

These are strict areas. I did **not** touch them.

1. **The `Enquiry` table (schema, strict).** The Contact form, the prayer-pledge form and the volunteer form all write to it. Do you want me to propose the schema diff and the generated SQL (with the data inventory entry) for your approval? Fields I would propose: type (contact, prayer, volunteer, partnership), name, email, message, consent text and time, source page, status. Retention period needed (see client question G3).
2. **`/donate` (strict).** The header, hero and footer already link to it, and it 404s in a preview. Do you want me to design the three-step flow as a clickable prototype outside `app/donate` first (amount, details with Gift Aid, payment), so the client can approve it before any strict code exists? I recommend yes.
3. **Terms page.** Stripe requires one. I should not write legal text. Who drafts it: the charity's solicitor, or a template for the solicitor to review?

### Decisions

4. **Palette and logo.** Still provisional (cream, red earth, forest green, gold). If the logo's real colours differ (the shirts show violet and green), the tokens change in one file. Have you asked the designer for the logo files?
5. **Photographs, accepted risk.** On the live pages you chose people photos (clergy, sisters, UK guests, builders, dancers, the embrace). Permissions and the Kay Images licence are still open. I used **no** outreach photos with patients or children anywhere. Confirm that stays the rule.
6. **Videos.** Put them in `originals/video/` (not `public/`, not git). When they arrive: which single clip goes on the Hospital page, and do you want a silent autoplay loop or a play button with a poster frame? I recommend the play button.
7. **Fr Anthony's portrait.** The one in his biography file is about 118x148 px. Ask for a proper portrait. Drop it in `originals/trustees/`.
8. **Git history.** The 85 MB of raw photos are still in earlier commits. Is the GitHub repo private? If it could ever be public, I should walk you through a history purge (force-push).
9. **Vercel previews.** Add `SITE_MODE=live` for the **Preview** environment only, push a branch, and share a Vercel link with the client. Production stays `holding`. Not done yet.
10. **Launch checks.** `pnpm launch:check` should currently fail on 4 things (contact email, registered address, testimonials, health statistics sources). More will be added as pages gain markers.

### Housekeeping

- `components/site/CLAUDE.md` and `docs/DESIGN_BRIEF.md` describe the design language and the photo-to-section mapping. Read them if you edit pages.
- Commit when you are happy. No protected paths changed in this batch, so no `Approved-by` trailer is needed:
  `git add -A && git commit -m "feat: our work, hospital, outreach, get involved and contact pages"`

---

## 2. For the client (grouped by page)

Anything marked **needed** blocks launch. Each page also shows a dashed "Awaiting from the charity" box where the answer goes.

### Global

- G1. **Logo, brand colours and fonts** from the designer. (needed for the final look)
- G2. **Registered address, telephone, contact email, social media handles.** (needed: legally required)
- G3. **How long may we keep subscriber and enquiry emails?** (needed: UK GDPR) I proposed "until they unsubscribe".
- G4. **Approve the consent wording and the privacy notice** (drafts exist in `lib/subscribers/consent.ts` and `/privacy`). (needed)
- G5. **Photo permission** for every identifiable person we show, and **the Kay Images licence and credit line**. Frames in use: priests with bishop, sisters at Mass, UK guests, aerial of the land, blessing of the stone, dancers, five builders, the embrace. (needed)
- G6. **News & Updates** (B6): the client's copy asks for events and a blog. We assumed "plan the layout now, build later". Confirm in writing.
- G7. **Email domain:** can we verify SPF, DKIM and DMARC for sending from the charity's domain (Resend)?

### Home

- H1. **Health statistics with citable sources** to sit under "One million people..." (needed).
- H2. **Two testimonials:** one from Orlu on the need for the hospital, one from an English parish about their Nigerian priest. (needed)
- H3. **A photograph dated this month** showing the build, and how often they can send one.
- H4. **Confirm the headline** "Bringing Hope Through Healthcare." and the mission line under it.
- H5. **Gift Aid mark:** is the charity registered with HMRC for Gift Aid (B8)? We show the mark only once yes.

### About

- A1. **Answered by the charity's own text (2026-11-16):** Bishop Mark O'Toole was then Bishop of Plymouth, and his initiative (visiting Bishop Augustine) is why Orlu priests have ministered in the UK since 2006. The stone names the bishop as Most Rev Dr Augustine Tochukwu Ukwuoma. The site now says all this. Still to confirm: whether to name Bishop Augustine in full on the site, and the date and place of Bishop O'Toole's visit.
- A2. **Dr or Mrs Van Kroonenburg?** The supporter text says "Mrs Deborah van Kroonenburg"; the PRD's trustee list says "Dr"; the foundation stone gives no title. The story now uses no title; the trustee row says "Dr". Also: "van" or "Van"? Confirm her title and spelling.
- A3. **Biographies and portraits** for Dr Deborah Van Kroonenburg and Fr Evangelist Ohaejesi (Canon Anthony's biography is in). Each: portrait, 2 to 3 sentences, written permission.
- A4. **Advisers** (Chris Kemp, Brian Bargent, Fr George Nwadike): roles, short biographies, photographs if they want them shown.
- A5. **Governance and accountability:** is there an annual report or accounts we can link? The page says "all that has been raised so far has gone straight into the project": is that still true, and can they stand behind it?
- A6. **Who are the people in each photograph?** We caption only what the frame shows. If they want names under pictures, send names with permission.
- A7. **Resolved: Fr Anthony is Fr Anthony Onuoha** (the supporter text says so, and the site now says it). **New question:** the foundation stone is inscribed "Deborah Van Kroonenburg & **Anthony Akinpello**". Is that an error on the stone, or a different person? Worth knowing before the stone photograph is used widely, since it names him.

### Our Work (index)

- W1. Confirm the two-programme framing ("One hospital, and the outreach beside it") is how they describe their work.

### The Hospital

- P1. **Expected impact:** what the hospital is expected to achieve, with figures they can stand behind (needed).
- P2. **Funding goal and amount raised to date**, so we can show a progress line. Also: how often is it updated, and who updates it?
- P3. **Build milestones:** confirm each date and wording, and **the real dates of the ceremony photographs** (we avoid dating them).
- P4. **The five builders in hard hats:** names and roles, with their permission, so the page can name Orlu people as the people building it. Also: **the hospital managers and clinicians** who advise on the build (the supporter text credits them): names and roles, if they are willing to be named.
- P5. **Names of the "local engineers and builders"** who supervise the site. Also: the supporter text spells the architect "Ifeeanyi"; the PRD says "Ifeanyi". Which is right?
- P6. **Expected opening date or phases** (foundation, structure, fit-out), if they are willing to publish one.
- P7. **The architect's elevation drawing** from Ifeanyi Achugasim (we show a stand-in line drawing).

- P8. **Is it a 50-bed hospital?** The supporter text says "a new 50 bed hospital in Abajah with diagnostic and outreach facilities". The site now says so. Confirm the number, and whether the first phase is smaller.
- P9. **"Orlu Province" or "Orlu zone"?** The mission statement says "the 1 million inhabitants of Orlu zone in SE Nigeria"; the PRD's mission says "Orlu Province of Imo State". The site says "Province". Which is the charity's term?
- P10. **Land:** the mission statement says "the community have provided land"; the supporter text says "land was acquired". The site says "acquired". Was it given by the community, bought, or both?
- P11. **"Sisters too":** the site says sisters have served in England as well as priests, from the PRD. The supporter text only mentions priests. Confirm.

### Medical Outreach

- O1. **Results to date:** the brief mentions incubators and outreach medicines as early wins. Numbers, dates, who benefited? (needed)
- O2. **How often and where** does outreach happen, and who delivers it (clinician names, with permission)?
- O3. **Which services are free?** The page says "free consultations" only. Are all eight free?
- O4. **Photographs with written permission** from the people shown, patients and children especially. Until then the page has no photos.
- O5. **Referrals:** where are patients referred while the hospital is being built?

### Get Involved

- I1. **Prayer pledge:** what should happen when someone pledges? A public counter, a list of names, a monthly intention emailed back? How long are pledges kept?
- I2. **Volunteer needs:** what roles are open now, in the UK and in Orlu, and who answers volunteers?
- I3. **Fundraising:** a JustGiving link, and suggested activities (marathons, parish and school events). A fundraising pack?
- I4. **Sponsorship tiers and amounts** (name a ward, a piece of equipment): what exactly, and what recognition does a sponsor receive?
- I5. **Corporate partnership:** a contact person, and the full ethical policy. We show the sentence "We do not accept any sponsorship that endorses products or values which contravene Catholic values."

### Contact

- C1. **Who receives contact-form messages** (B5), and what response time do we promise (for example "within three working days")?
- C2. Address, telephone, email, social handles (see G2).

### Donate flow (not built yet)

- D1. **Fee cover versus Gift Aid:** if a donor covers the fees, how does the charity treat it in the Gift Aid claim? Needs the treasurer. (needed before Phase 3)
- D2. **Preset amounts and what each funds** ("£X funds...").
- D3. **Stripe account** opened and verified (B3), and **HMRC Gift Aid registration** plus Charities Online (B8). The postal code can take a week: start now.
- D4. **Nigerian donors** (B7): bank-transfer details and the wording for that block.
- D5. **Who gets the donation notification emails** (B5)?
- D6. **Receipt wording** and **Gift Aid declaration wording** for the charity to approve.
- D7. **Thank-you page:** what do they want to say, and do they want to invite a monthly gift?

### Privacy and Terms

- T1. Who drafts the Terms (see section 1, question 3)?
- T2. **Analytics:** do they want Google Analytics 4? It needs a cookie consent banner. (PRD §15 assumes yes.)

---

## 3. What I decided on my own (veto any of these)

1. **I removed a claim I had invented.** "The outreach that comes first" was my wording, not the PRD's. It now says "One hospital, and the outreach beside it" on Home and Our Work. I also removed "free of charge" from the outreach list (only consultations are described as free) and "while the hospital is being built".
2. **No forms.** Contact, prayer pledge and volunteer show an "Awaiting" marker, not a fake form.
3. **No outreach photographs anywhere,** because every outreach frame shows patients or children.
4. **No `/donate`, no `/terms`.** Links to both exist (header, hero, footer, calls to action) and 404 in a live preview. They are hidden in holding mode.
5. **Photo placement.** The "embrace" photo opens prayer on Get Involved. The ceremony photos sit under the December 2025 to January 2026 entry of the build chronicle, captioned only with what they show (not dated). The builders sit under 29 January 2026 without claiming the photo's date.
6. **Copy I wrote lightly:** "Every gift helps the building rise" (Give), "We would like to hear from you" (Contact), "There is a place for everyone in this work. We begin with prayer." (Get Involved). Everything else is the PRD's or the client's own words. Change any you dislike.
7. **Outreach page leads with the eight services, set large,** since there are no photos. When permitted photos arrive, they slot in below the lead.

8. **2026-11-16: aligned the copy with the charity's own text.** Removed "a church short of vocations... twenty years" (not in their text). Added: the 50-bed hospital with diagnostic and outreach facilities; guests of Bishop Augustine; the clinicians' and hospital managers' advice on the build; the Church as a portal; "people of other faiths and none"; the remit; the credit to the Holy Spirit. Moved Bishop O'Toole into the Orlu-to-England story (it is why the priests came). Used no title for Deborah Van Kroonenburg in the story until A2 is answered. The stone date (29 December 2025) is now in the timeline. The building start date is unchanged: 29 January 2026, which the charity's text confirms.

## 4. Known rough edges

- The site's design CSS (about 19 KB) is bundled into the holding page even though it is not used there. Small; can be split later.
- One strict timing test (`rate-limit … is deterministic`) failed once under machine load and passed on three re-runs. If it fails again, tell me and I will look at the timeout.
- The photo credit ("Kay Images" watermark) appears on several frames. Decide how to credit once the licence terms are known.
- The "Awaiting from the charity" markers are for review only. `pnpm launch:check` blocks launch until they are all filled.

## 5. Where I would go next (after you answer)

1. Approve the `Enquiry` table, then I build the three forms (Turnstile, rate limit, server validation, data inventory).
2. Approve the donate prototype, then wireframe the three-step flow for client sign-off.
3. When the logo arrives: swap tokens, re-run the contrast test, re-check every page.
4. When videos arrive: pick the Hospital clip and build the player.
