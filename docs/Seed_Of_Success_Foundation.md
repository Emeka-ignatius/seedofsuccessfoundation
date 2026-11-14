# Product Requirements Document
## Seed of Success Foundation — St Perpetua Hospital

**Domain:** seedofsuccessfoundation.com
**Charity:** Seed of Success Foundation, registered charity in England and Wales, no. **1219306**
**Version:** Draft v2 (supersedes v1 of 7 Nov 2026)
**Date:** 13 November 2026
**Prepared by:** Ignatius Emeka Joshua (Fusco)

---

## 0. What Changed Since v1

Client documents received: project history, trustee biography, and full copy deck. Three of the five blocking questions are now answered.

| ID | Question | Status |
|---|---|---|
| B1 | UK or Canada? | **RESOLVED — UK.** Registered charity in England and Wales. Gift Aid is in scope and is a v1 feature |
| B2 | Charity registration number | **RESOLVED — 1219306.** Verified on the Charity Commission register |
| B4 | Primary currency | **RESOLVED — GBP.** See §9.4 for the Nigerian donor question, which is still open |
| B3 | Stripe account opened and verified? | **STILL OPEN.** Client action, takes several working days |
| B5 | Donation notification recipient | **STILL OPEN** |
| **B6** | **New:** Are Events and News/Blog in scope? | **OPEN.** Both appear in client copy but were out of scope in the quotation. See §12 |
| **B7** | **New:** How should Nigerian donors give? | **OPEN.** See §9.4 |
| **B8** | **New:** Is the charity registered with HMRC for Gift Aid? | **OPEN.** Registration with the Charity Commission does not automatically enrol a charity for Gift Aid |

Brand colours and logo still outstanding; logo is with their designer. Photography and video are in a shared Drive folder.

---

## 1. The Core Idea

**This site must not read as "wealthy West rescues poor Africa."**

That framing is the default for charity websites and it is both inaccurate here and the fastest route to a generic result. What the client's own documents describe is something rarer:

> Since 2006, priests from the Diocese of Orlu have served Catholic parishes across England — Plymouth, Hallam, Brentwood, Southwark, Hexham & Newcastle, Shrewsbury, Arundel & Brighton. A UK church short of vocations has been sustained by Nigerian clergy for twenty years. Now those same UK communities are helping build a hospital in Orlu, a province of one million people with almost no accessible hospital care.

Two communities, each giving the other something it lacks. The client's own brief asks for About Us to be built "like a see-saw balancing Orlu and Plymouth" and to "show it as a two-way process in which we can/should help each other."

**This reciprocity is the spine of the site, not a paragraph inside it.** It is the one thing no template provides, no competitor can copy, and no AI-generated charity site would ever produce on its own.

### 1.1 Three supporting assets that are also genuinely distinctive

**A building in progress, with dates and names.** Vision formed April 2024. Land acquired. Foundation stone laid December 2025 / January 2026. Construction began **29 January 2026**, by named local professionals: architect Ifeanyi Achugasim and engineer Emeka Ngwangwa, supervised by local engineers and builders. Most charities ask for money against a promise. This one can show a hospital coming out of the ground, dated, with photographs. That is a living, returnable story and the strongest trust signal available.

**Prayer before money.** The client's brief says plainly: *"Before we ask for money we ask for your prayers."* No donation-optimised template would ever suggest that. Honouring it is both true to the client and immediately distinguishing.

**An explicit ethical boundary on sponsorship.** *"We do not accept any sponsorship that endorses products or values which contravene Catholic values."* Stating a limit on what money the charity will take is unusual and builds trust rather than costing it.

### 1.2 Design consequences

- Photography must show **Orlu people as agents**: clinicians, builders, the architect, the engineer, trustees. Not rows of passive recipients. This is both ethically right and the visual difference between this site and every other hospital appeal.
- Tone: dignified, warm, Catholic, plain-spoken. Not corporate-NGO, not startup, not pity-driven.
- The two-community idea needs a designed centrepiece on the homepage, not a text block.

---

## 2. Organisation Facts (from client documents)

**Mission.** To transform healthcare in Abajah and the wider Orlu Province of Imo State, Nigeria by establishing and supporting St Perpetua Hospital, providing accessible, quality medical care to children, young people, older adults and vulnerable members of society.

**Vision.** A healthy and thriving Orlu Province where every individual has access to affordable, high-quality healthcare, and where St Perpetua Hospital serves as a beacon of hope, healing and compassionate care.

**Objectives.** (1) Build St Perpetua Hospital. (2) Improve access to healthcare. (3) Reduce maternal, infant and child mortality. (4) Support healthcare professionals. (5) Health education and community outreach.

**The need.** One million inhabitants of Orlu zone have limited access to hospital care. Infant and maternal mortality are very high. Many treatable acute medical and surgical conditions go untreated. Young people qualify in clinical sciences but work in private hospitals affordable only to the very rich.

**Trustees.** Dr Deborah Van Kroonenburg (Chair); Very Revd Dr Canon Anthony C. Onuoha; Fr Evangelist Ohaejesi.
**Advisers.** Chris Kemp; Brian Bargent; Fr George Nwadike.

**Still needed:** registered address, contact phone, social media handles, current health statistics with citable sources, impact figures to date, testimonials from Orlu, testimonials from UK parishes.

---

## 3. Site Map

```
/                           Home
/about                      About Us  (incl. the two-communities story, trustees, governance)
/our-work                   Our Work (index)
/our-work/st-perpetua-hospital   The Hospital  (incl. build progress timeline)
/our-work/medical-outreach       Medical Outreach Programme
/get-involved               Pray, Volunteer, Fundraise, Sponsor, Partner
/donate                     Donation form
/donate/thank-you           Confirmation
/contact                    Contact
/privacy                    Privacy policy        (legally required)
/terms                      Terms of use          (required by Stripe)
/admin/*                    Admin dashboard
```

**Deliberate departures from the client's suggested structure:**

- **"Our Causes" becomes "Our Work."** The charity has two programmes, not a catalogue of causes. "Causes" is template language and undersells a single flagship hospital.
- **The hospital gets its own full page**, not a card in a grid. It is the entire reason the charity exists.
- **Events and Blog are not in this map.** Both appear in the client copy but were outside the quoted scope. See §12 before committing.

---

## 3A. Phase 0 — Holding Page (ships first)

Ships before the main build, on the live domain, while development runs on a Vercel preview URL the client can review.

### Principle

**The page does not announce that the website is under construction. It announces that the hospital is.**

That is factually true: construction began 29 January 2026 and is ongoing. Inverting it turns an apology for an unfinished site into a statement of progress, and starts the charity's public story before a single donation page exists.

### Content

| Element | Detail |
|---|---|
| Background | Dimmed photograph or slow-looping video of the actual Abajah build site, from the client's Drive folder |
| Headline | "St Perpetua Hospital is rising in Orlu." |
| Sub-headline | The need, in one line: one million people in Orlu Province with limited access to hospital care |
| **Live counter** | "Day N of construction" counting from 29 January 2026. True, moving, and costs nothing |
| One-line mission | From the approved copy deck |
| Email capture | Single field. "Be the first to know when we launch." Writes to the same table the live site will use, so nothing is lost at launch |
| Trust footer | Seed of Success Foundation, Registered Charity in England and Wales no. 1219306 |
| Contact | Email address, once the mailboxes are live |

### The animation

An **SVG line drawing of the hospital elevation that draws itself** over roughly 2.5 to 3 seconds on load, via `stroke-dasharray` / `stroke-dashoffset`, settling into a finished outline over the photographic background.

Rationale: it reads as "being built" without a single construction cliché, it nods to the project's real architect, it is a few kilobytes rather than a 3D library, it renders on any phone, and it degrades to a static outline where motion is unavailable.

Rejected alternatives: 3D construction scenes, animated cranes, hard-hat iconography, progress bars. All heavy, all generic, all the opposite of what this project is.

Must respect `prefers-reduced-motion`: the outline appears complete, without animating.

### Constraints

- **Half a day of build, maximum.** It is a holding page, not a project
- Single self-contained page, no CMS
- No donation functionality. Stripe is not verified yet, and soliciting before the real site is live creates avoidable compliance exposure
- Charity number displayed, as required on any public-facing charity material
- Real `<title>`, meta description and Open Graph image, since this page will be shared and indexed before the full site exists
- Loads in under 2 seconds on mobile. Compress the background media properly
- Email signups stored, not sent to an inbox that will later be abandoned

---

## 4. Page Specifications

### 4.1 Home

| Order | Section | Content |
|---|---|---|
| 1 | Hero | "Bringing Hope Through Healthcare." Mission line. Primary CTA Donate, secondary CTA The Hospital. Strong photograph of Orlu, its people or the build |
| 2 | **The need, in numbers** | One million people. Limited hospital access. High maternal and infant mortality. Short, stark, cited |
| 3 | **Two Communities** | **The centrepiece.** Visually balanced: Orlu on one side, England on the other, movement in both directions. "Since 2006, priests from Orlu have served parishes across seven English dioceses. Today those communities are helping build a hospital in Orlu." Named dioceses. Link to About |
| 4 | **The hospital is being built** | Live progress: current phase, photo dated this month, short timeline strip, link to the full timeline. Proof the money moves |
| 5 | Our Work | Two cards: St Perpetua Hospital, Medical Outreach |
| 6 | Voices | Testimonial from Orlu on the need; testimonial from a UK parish on their Nigerian priest. The reciprocity again, in people's own words |
| 7 | Get involved | Pray, Give, Fundraise, Volunteer. Prayer stated first |
| 8 | Trust row | Charity no. 1219306, Registered Charity in England and Wales, Gift Aid mark |
| 9 | Newsletter | Email only |
| 10 | Final CTA | Donate |

### 4.2 About Us
The see-saw, built properly. Two-column layout that holds both communities in balance:

- **Orlu → England.** The 2006 origin. Priests serving Plymouth, Hallam, Brentwood, Southwark, Hexham & Newcastle, Shrewsbury, Arundel & Brighton. Sisters too.
- **England → Orlu.** Bishop Mark O'Toole's visit to Bishop Augustine. Mrs Deborah van Kroonenburg's April 2024 visit with Fr Anthony. The vision formed on that visit. Land, funds, foundation stone.

Then: who we are, mission, vision, the five objectives, trustees with photos and biographies, advisers, governance and accountability, charity number and registered address, "all that has been raised so far has gone straight into the project."

### 4.3 St Perpetua Hospital
Hero image of the site. The need. What the hospital will provide (primary care, maternal and child health, outpatient clinics, diagnostics, health education, community initiatives, preventive care, emergency care). Expected impact.

**Build Progress Timeline.** Vertical, dated, photographic:

| Date | Milestone |
|---|---|
| April 2024 | Mrs Deborah van Kroonenburg visits Orlu with Fr Anthony. The vision forms |
| 2024–2025 | Land acquired, building planned, funds raised in the UK and Orlu |
| Dec 2025 – Jan 2026 | UK group welcomed to Orlu; foundation stone laid |
| **29 January 2026** | **Construction begins.** Architect Ifeanyi Achugasim, engineer Emeka Ngwangwa |
| Ongoing | Dated progress photographs |

Admin-manageable so new milestones can be added as the building rises. Names the Nigerian professionals doing the work. Funding progress toward goal.

### 4.4 Medical Outreach Programme
Free consultations, blood pressure screening, diabetes screening, health education, preventive advice, maternal health support, children's health checks, referrals. Outreach photographs. Results to date (incubators, outreach medicines are mentioned in the client brief as early wins).

### 4.5 Get Involved
Ordered as the client asked, prayer first:

1. **Pray.** "Before we ask for money, we ask for your prayers." Optional prayer-pledge form, open to housebound, sick, elderly, schoolchildren across both dioceses
2. **Give.** Link to Donate
3. **Fundraise.** Marathons, parish and school activities, JustGiving
4. **Volunteer.** Current needs, form
5. **Sponsor.** Name a ward or a piece of equipment. Tiered amounts
6. **Corporate partnership.** With the ethical statement published plainly: no sponsorship that endorses products or values contrary to Catholic values

### 4.6 Contact
Form with spam protection, registered address, email, phone, social links, response-time expectation.

---

## 5. Design Direction

Final once brand assets arrive. Working principles:

- **Dignified and warm.** Think a serious institution with a pastoral heart, not a tech startup and not a corporate NGO.
- **Photography-led, and specific about what the photographs show.** Orlu people as clinicians, builders, professionals and leaders. Never anonymous suffering. Never stock imagery.
- **Serif for headings** (gravitas, Catholic institutional feel), clean sans for body. Minimum 16px body, 1.5 line height.
- **Restrained palette** built from the logo once it arrives. Earth and warmth over clinical blue.
- One primary action per screen. Donate always reachable via a sticky header.
- Accessible contrast designed in from the start, not retrofitted.
- 8px spacing scale, consistent radii, restrained shadows.

**Outstanding:** logo (with designer), brand colours, brand fonts. Photography and video received via Drive.

---

## 6. Donation Flow

Commercial heart of the site. Checkout stays on our own domain via Stripe Payment Element, never a redirect.

### 6.1 Steps

**Step 1 — Amount**
- Toggle **One-time | Monthly**, monthly visually encouraged
- Four presets plus Other, each labelled with concrete impact. **Impact labels must come from the client** — "£25 funds an outreach clinic for one patient" converts far better than a bare "£25"
- Optional designation: Hospital build / Medical outreach / Where most needed
- Optional: cover processing fees

**Step 2 — Details**
- Full name, email
- **Gift Aid checkbox** with the full HMRC declaration and **home address** fields, revealed only when ticked
- Optional message or dedication
- Optional anonymous giving

**Step 3 — Payment**
- Stripe Payment Element: card plus **Apple Pay and Google Pay**
- 3D Secure / SCA handled (mandatory in the UK)
- Clear total, explicit recurring language
- Trust row: charity number, secure payment

**Confirmation:** on-page thank you, what happens next, share prompt, invitation for one-time donors to convert to monthly.

### 6.2 Gift Aid

Worth 25p on every £1 from an eligible UK taxpayer, at no cost to the donor. On a £100,000 appeal that is £25,000. It is the highest-value feature on the site.

Must capture and store per declaration: charity name shown, donor full name, donor **home address**, scope (this donation only, or past/present/future), the donor's affirmative tick, the tax-liability statement **exactly as worded to the donor**, and the date shown.

Retention: six years from the end of the relevant accounting period. Stored encrypted at rest, since it is name plus home address plus giving history.

Export in HMRC Charities Online schedule format (up to 1,000 donations per claim) is a strong v1.1 addition; v1 provides a CSV the treasurer can work from.

**Flag to client:** Charity Commission registration does not enrol them for Gift Aid. They must separately register with HMRC and activate Charities Online, and the activation code arrives by post and can take a week. Start now.

### 6.3 Sponsorship tiers
Name a ward or equipment. Fixed amounts set by the client. Published ethical screen on what sponsorship is accepted.

### 6.4 Nigerian donors — open question

Client documents state donors come from both Nigeria and the UK. A UK Stripe account can present other currencies, but Nigerian cards frequently fail on international gateways, so a GBP-only Stripe checkout will quietly lose Nigerian givers.

Options, for the client to choose:
1. Publish Nigerian bank transfer details on the Donate page, manually reconciled (v1, no build cost)
2. Add a Nigerian gateway such as Paystack or Flutterwave as a second rail (phase 2, additional scope)
3. UK-only online giving, Nigerian support gathered through the diocese

**Recommendation: option 1 for v1.** Zero build cost, no lost donors, decide on option 2 once there is volume.

### 6.5 Receipts and edge cases
Donor receipt and admin notification on success; receipt on each recurring payment; dunning email and admin alert on failure; admin notification on cancellation. Email via Resend or SendGrid on an authenticated domain with **SPF, DKIM and DMARC** configured, otherwise receipts land in spam, which for a charity reads as fraud.

Edge cases: payment failure with retry that preserves entered data; duplicate submission prevention; SCA challenge; refunds via Stripe dashboard reconciled by webhook; card expiry on recurring gifts.

---

## 7. Admin Dashboard

| Area | Capability |
|---|---|
| Dashboard | Total raised, this month, active monthly donors, recent donations, totals by designation |
| **Build timeline** | Add and edit progress milestones with dated photographs. Keeps the hospital story alive without developer involvement |
| Programmes | Edit the two programme pages, upload images, set funding goals |
| Donations | Searchable table: date, donor, amount, designation, one-time or recurring, status, **Gift Aid status** |
| **Gift Aid export** | CSV of eligible declarations with the fields HMRC requires |
| Export | Donation CSV, date-range filtered |
| Enquiries | Contact, volunteer, prayer and partnership submissions |
| Settings | Preset amounts, impact labels, notification recipients |

Auth: email and password with argon2 or bcrypt, httpOnly/secure/sameSite session cookies, rate-limited login, password reset. Two-factor recommended, as the dashboard exposes donor names, home addresses and giving histories.

---

## 8. Technical Architecture

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Payments | Stripe: Payment Element, Subscriptions, Webhooks |
| Email | Resend or SendGrid |
| Media | Object storage + Next/Image |
| Hosting | Vercel |
| Analytics | GA4 + Search Console |
| Errors | Sentry |

### 8.1 Data model (outline)

```
Programme     id, slug, title, summary, description, image_url,
              goal_amount, raised_amount, status, sort_order

Milestone     id, date, title, description, image_url,
              is_current, sort_order          -- build timeline

Donor         id, name, email, address_line1, address_line2,
              city, postcode, country, is_anonymous, created_at

Donation      id, donor_id, designation, amount, currency,
              type (one_time|recurring), stripe_payment_intent_id,
              stripe_subscription_id, status, fee_covered,
              message, created_at

GiftAid       id, donation_id, donor_name, donor_address,
              declaration_text, declaration_shown_at, scope,
              claimed_at

Enquiry       id, type (contact|volunteer|prayer|partnership),
              name, email, phone, message, created_at, handled

Trustee       id, name, role, bio, photo_url, sort_order

AdminUser     id, email, password_hash, role, last_login
```

---

## 9. Security

### 9.1 Payments
- **No card data touches our servers.** Stripe Payment Element tokenises in the browser, keeping PCI scope at **SAQ A**
- TLS 1.2+ on every page, all assets over HTTPS, no mixed content
- **Webhook signature verification on every webhook** plus Stripe IP allowlisting. An unverified endpoint accepts forged "payment succeeded" events
- Webhook idempotency, so repeated events never double-record a donation
- Stripe secrets server-side only, never committed
- Annual PCI attestation is the charity's obligation via their Stripe dashboard; I will point them to it

### 9.2 Application
- CSP with Stripe's directives: `script-src https://*.js.stripe.com https://js.stripe.com`, `frame-src https://*.js.stripe.com https://js.stripe.com https://hooks.stripe.com`, `connect-src https://api.stripe.com`, `img-src https://*.stripe.com`
- HSTS, frame-ancestors, X-Content-Type-Options, Referrer-Policy
- Parameterised queries throughout
- Server-side validation on every form
- Rate limiting on donations, login and public forms
- Bot protection: honeypot plus Cloudflare Turnstile (preferred over reCAPTCHA on accessibility grounds)
- Minimal third-party JavaScript
- Dependency scanning in CI

### 9.3 Data protection (UK GDPR)
- Gift Aid records are the most sensitive data on the site: name, home address, giving history, retained six years. Encrypted at rest, admin access restricted to named individuals, no shared logins
- Data minimisation; documented retention periods
- Privacy policy covering lawful basis, retention and data subject rights
- Cookie consent, analytics loading only after consent
- Database backups enabled, restore tested before launch
- Donor data sits in UK or EU regions where the hosting provider allows

---

## 10. SEO

### 10.1 Technical
Server-side rendered. Unique hand-written title and meta description per page. Canonicals. robots.txt and XML sitemap submitted to Google Search Console and Bing. Clean URLs. One h1 per page. Descriptive alt text. Open Graph and Twitter Cards, which matter here because parish sharing is a primary acquisition channel. HTTPS throughout, no broken links.

### 10.2 Structured data (JSON-LD)
`Organization` / `NGO` site-wide with charity number, logo and social profiles. `WebSite` with `SearchAction`. `BreadcrumbList`. `Article` on updates. `Person` on trustee biographies. `FAQPage` if an FAQ is added.

### 10.3 Core Web Vitals
LCP < 2.5s, INP < 200ms, CLS < 0.1. Via Next/Image in modern formats, font subsetting with `font-display: swap`, code splitting, minimal third-party scripts, explicit media dimensions.

### 10.4 Discovery
Target terms around Orlu, Imo State, Nigerian healthcare charity, Catholic hospital appeal, and the named dioceses. The seven English dioceses are a real and underused search and link opportunity: parish newsletters and diocesan sites linking in are high-quality, relevant backlinks that no competitor charity has.

**Google Ad Grants:** eligible registered charities can receive up to $10,000 per month in free Google Search advertising. For a charity this size that is likely worth more than the website in year one. Confirm eligibility and process directly with Google for Nonprofits.

---

## 11. Accessibility

Target **WCAG 2.2 Level AA**. A donation form a screen reader cannot complete is a donation that does not happen, and UK charities carry Equality Act exposure.

Full keyboard navigation with visible focus. Semantic HTML, ARIA only where needed. Programmatic labels on every input. Errors announced to assistive technology and never signalled by colour alone. Contrast 4.5:1 body, 3:1 large text and UI. Touch targets ≥ 44×44px. `prefers-reduced-motion` respected. Alt text on meaningful images, decorative images marked. Skip link. **Screen reader tested on the donation flow before launch** — automated scanners catch roughly a third of real issues.

Given the audience includes elderly and housebound supporters in UK parishes, this is a practical requirement, not a compliance box.

---

## 12. Scope Decision Required

The client copy asks for an **Events** section and a **Blog**. Neither was in the quoted scope; the blog was explicitly listed as a phase 2 item.

**My view:** a single lightweight **News & Updates** section is worth adding, because the build-progress story needs somewhere to live between milestones, and it is the main engine of organic search growth. Separate Events and Blog sections are not justified at this stage; events can be posts with a date.

Three ways forward:
1. Hold to the quoted six pages. Build progress lives on the hospital page only
2. Add a simple News & Updates listing with admin posting, as additional scope
3. Defer to phase 2 with the information architecture built to accommodate it now

**Recommendation: 3**, unless the client wants to pay for 2. Either way the decision is theirs, in writing, before week 2.

---

## 13. Out of Scope (v1)

Copywriting and content creation. Professional photography. Logo and brand identity (with their designer). Donor CRM beyond the admin dashboard. Email marketing platform integration. Multi-language. Peer-to-peer fundraising pages. Event ticketing. Automated Gift Aid submission to HMRC (export only). Nigerian payment gateway integration (see §6.4). Ongoing content updates after launch.

---

## 14. Timeline

| Week | Work | Client input needed |
|---|---|---|
| **0** | Email mailboxes live. **Holding page shipped to the live domain** (§3A). Preview URL shared with client | Build-site photography (received), confirmation of the headline copy |
| **1** | Discovery, IA, visual design | Logo, brand colours, remaining content, §0 answers. **Begin Stripe registration and HMRC Gift Aid registration now** |
| **2** | Frontend build, all pages, responsive | Design approval before this week starts |
| **3** | Stripe integration, Gift Aid capture, admin dashboard | Stripe account verified |
| **4** | QA, accessibility audit, performance, SEO, client review, launch | Written sign-off before deployment |

Feedback within three business days at each stage; later feedback shifts the timeline by the equivalent period.

---

## 15. Launch Checklist

- [ ] All §0 items resolved
- [ ] Charity number 1219306 displayed in the footer and on receipts
- [ ] Stripe live keys configured; test transaction completed and refunded
- [ ] Webhook endpoint live, signature verification confirmed
- [ ] Gift Aid declaration wording approved by the charity and stored verbatim
- [ ] Gift Aid CSV export verified against HMRC's required fields
- [ ] Receipt emails verified in Gmail, Outlook and Apple Mail
- [ ] SPF, DKIM, DMARC passing
- [ ] Privacy policy and terms published
- [ ] Cookie consent live
- [ ] SSL valid, SSL Labs grade A
- [ ] Security headers verified
- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- [ ] Screen reader pass on the donation flow
- [ ] Sitemap submitted to Search Console
- [ ] GA4 conversion tracking firing
- [ ] Database backups enabled, restore tested
- [ ] Admin credentials handed over securely
- [ ] 404 and error pages styled
- [ ] Cross-browser: Chrome, Safari, Firefox, Edge; iOS and Android
- [ ] Written client sign-off received

---

## 16. Content Still Needed From Client

| Item | Needed for | Priority |
|---|---|---|
| Logo and brand colours | Design, week 1 | **Blocking** |
| Registered address, phone | Footer, contact, legally required | **Blocking** |
| Donation impact labels ("£X funds...") | Donation form conversion | High |
| Sponsorship tiers and amounts | Get Involved | High |
| Health statistics with citable sources | Home, hospital page | High |
| Testimonials from Orlu | Voices section | High |
| Testimonials from UK parishes | Voices section — carries the reciprocity | High |
| Trustee photographs | About | Medium |
| Social media handles | Footer | Medium |
| Annual report, if any | About, trust | Medium |
| Funding goal and amount raised to date | Progress indicators | Medium |

---

## Sources

- [Seed of Success Foundation, charity 1219306 — Charity Commission register](https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/5278098/accounts-and-annual-returns?_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_organisationNumber=5278098)
- [Gift Aid on Online Donations: A UK Charity Guide — Nebula Design](https://nebula.design/charities/gift-aid-online-donations/)
- [Claim tax back on donations using Charities Online — GOV.UK](https://gov.uk/claim-tax-back-on-donations-using-charities-online)
- [Integration security guide — Stripe Docs](https://docs.stripe.com/security/guide)
- [Optimizing donation landing pages — Fundraise Up](https://fundraiseup.com/blog/Optimizing-Donation-Landing-Pages/)
- [SEO for Nonprofits: Complete 2026 Guide — PageGuard](https://pageguard.org/guides/seo-for-nonprofits-guide)
- [How to Make Your Nonprofit Website WCAG 2.2 Compliant — Foundation Group](https://www.501c3.org/wcag-compliant-nonprofit-website/)
