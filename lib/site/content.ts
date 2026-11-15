// Content for the public pages. Same rule as charity.ts: every sentence here comes from the PRD or the client's own
// documents. Anything the client has not supplied is `null` or empty, pages show a visible "awaiting" marker for it,
// and `pnpm launch:check` fails until it is filled. Nothing is made up to fill a gap.
// Where each piece lives long-term (hard-coded, admin-editable, or pending) is in docs/DESIGN_BRIEF.md.

/** The seven English dioceses Orlu priests have served since 2006 (PRD §1). */
export const dioceses = [
  "Plymouth",
  "Hallam",
  "Brentwood",
  "Southwark",
  "Hexham & Newcastle",
  "Shrewsbury",
  "Arundel & Brighton",
] as const;

export const reciprocity = {
  sinceYear: 2006,
  /** PRD §4.1 section 3, verbatim. */
  lead: "Since 2006, priests from Orlu have served parishes across seven English dioceses. Today those communities are helping build a hospital in Orlu.",
  orluGivesEngland:
    "Priests of the Diocese of Orlu have served Catholic parishes across England since 2006, and sisters too.",
  englandGivesOrlu:
    "In April 2024 Dr Deborah Van Kroonenburg visited Orlu with Fr Anthony, and the vision of a hospital formed. Land was acquired, funds were raised in the UK and in Orlu, and the foundation stone was laid.",
} as const;

/** Build timeline (PRD §4.3). Admin-editable in Phase 2; hard-coded here for the design. */
export type Milestone = { when: string; what: string; current?: boolean };

export const milestones: readonly Milestone[] = [
  {
    when: "April 2024",
    what: "Dr Deborah Van Kroonenburg visits Orlu with Fr Anthony. The vision forms.",
  },
  {
    when: "2024 to 2025",
    what: "Land acquired, the building planned, funds raised in the UK and in Orlu.",
  },
  {
    when: "December 2025 to January 2026",
    what: "A UK group is welcomed to Orlu and the foundation stone is laid.",
  },
  {
    when: "29 January 2026",
    what: "Construction begins, led by architect Ifeanyi Achugasim and engineer Emeka Ngwangwa.",
  },
  {
    when: "Ongoing",
    what: "The building rises. Dated progress photographs follow.",
    current: true,
  },
];

/** What the hospital will provide (PRD §4.3). */
export const hospitalServices = [
  "Primary care",
  "Maternal and child health",
  "Outpatient clinics",
  "Diagnostics",
  "Health education",
  "Community initiatives",
  "Preventive care",
  "Emergency care",
] as const;

/** Medical Outreach Programme (PRD §4.4). */
export const outreachServices = [
  "Free consultations",
  "Blood pressure screening",
  "Diabetes screening",
  "Health education",
  "Preventive advice",
  "Maternal health support",
  "Children's health checks",
  "Referrals",
] as const;

/** The need, in the client's own words (PRD §2). No figures: none have been supplied with a citable source. */
export const need = {
  people: "One million",
  peopleLine: "people in Orlu Province have limited access to hospital care.",
  statements: [
    "Infant and maternal mortality are very high.",
    "Many treatable acute medical and surgical conditions go untreated.",
    "Young people qualify in clinical sciences but work in private hospitals affordable only to the very rich.",
  ],
  /** Citations for the above. PRD §16: "Health statistics with citable sources", outstanding. */
  sources: null as string | null,
} as const;

/** Ordered as the client asked: prayer first (PRD §4.5). */
export const involvement = [
  {
    id: "pray",
    title: "Pray",
    body: "Before we ask for money, we ask for your prayers.",
    note: "Open to everyone, including the housebound, the sick, the elderly and schoolchildren across both dioceses.",
    href: "/get-involved#pray",
    cta: "Join in prayer",
  },
  {
    id: "give",
    title: "Give",
    body: "Help the building rise.",
    href: "/donate",
    cta: "Make a donation",
  },
  {
    id: "fundraise",
    title: "Fundraise",
    body: "Marathons, parish and school activities, or a JustGiving page.",
    href: "/get-involved#fundraise",
    cta: "Start fundraising",
  },
  {
    id: "volunteer",
    title: "Volunteer",
    body: "Offer your time and skills.",
    href: "/get-involved#volunteer",
    cta: "Offer your help",
  },
] as const;

/** Testimonials (PRD §4.1 section 6). Outstanding from the client: one from Orlu, one from a UK parish. */
export const testimonials: ReadonlyArray<{
  quote: string;
  name: string;
  role: string;
  place: "Orlu" | "England";
}> = [];

/** "All that has been raised so far has gone straight into the project." (PRD §4.2) */
export const stewardship = "All that has been raised so far has gone straight into the project.";

/**
 * About Us (PRD §2 and §4.2). Trustee photographs and biographies are outstanding from the client; nothing here
 * is invented, so the page shows a visible "awaiting" marker for them.
 */
export const aboutPage = {
  vision:
    "A healthy and thriving Orlu Province where every individual has access to affordable, high-quality healthcare, and where St Perpetua Hospital serves as a beacon of hope, healing and compassionate care.",
  objectives: [
    "Build St Perpetua Hospital.",
    "Improve access to healthcare.",
    "Reduce maternal, infant and child mortality.",
    "Support healthcare professionals.",
    "Provide health education and community outreach.",
  ],
  orluToEngland: [
    "Since 2006, priests of the Diocese of Orlu have served Catholic parishes across England — and sisters too.",
    "A church short of vocations has been sustained by Nigerian clergy for twenty years.",
  ],
  englandToOrlu: [
    "Bishop Mark O'Toole visited Bishop Augustine.",
    "In April 2024, Dr Deborah Van Kroonenburg visited Orlu with Fr Anthony. The vision of the hospital formed on that visit.",
    "Land was acquired, the building was planned, and funds were raised in the UK and in Orlu.",
    "In December 2025 and January 2026, a UK group was welcomed to Orlu, and the foundation stone was laid. Construction began on 29 January 2026.",
  ],
  trustees: [
    { name: "Dr Deborah Van Kroonenburg", role: "Chair of Trustees" },
    { name: "Very Revd Dr Canon Anthony C. Onuoha", role: "Trustee" },
    { name: "Fr Evangelist Ohaejesi", role: "Trustee" },
  ],
  advisers: ["Chris Kemp", "Brian Bargent", "Fr George Nwadike"],
} as const;

export const navigation = [
  { href: "/about", label: "About" },
  { href: "/our-work", label: "Our work" },
  { href: "/get-involved", label: "Get involved" },
  { href: "/contact", label: "Contact" },
] as const;
