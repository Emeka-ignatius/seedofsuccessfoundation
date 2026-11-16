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
    "Since 2006, priests of the Diocese of Orlu have ministered to Catholics in Plymouth and other English dioceses, and sisters too. It began with the initiative of (then) Bishop Mark O'Toole of Plymouth, who visited Bishop Augustine and his people.",
  englandGivesOrlu:
    "In April 2024 Deborah Van Kroonenburg visited Orlu with Fr Anthony Onuoha, as a guest of Bishop Augustine. They were distressed to learn that, despite the skill and dedication of those working there, health care was inadequate. There and then a vision formed of a new 50-bed hospital in Abajah, with diagnostic and outreach facilities. Land was acquired, and the foundation stone was laid on 29 December 2025.",
} as const;

/** Build timeline (PRD §4.3). Admin-editable in Phase 2; hard-coded here for the design. */
/** A photograph with the words that describe it. Captions state only what the frame shows. */
export type Plate = { src: string; alt: string; caption: string };

export type Milestone = {
  when: string;
  what: string;
  current?: boolean;
  plates?: readonly Plate[];
};

export const milestones: readonly Milestone[] = [
  {
    when: "April 2024",
    what: "Deborah Van Kroonenburg visits Orlu with Fr Anthony Onuoha, as a guest of Bishop Augustine. A vision forms: a new 50-bed hospital in Abajah.",
  },
  {
    when: "2024 to 2025",
    what: "People in the UK and in Orlu respond to the need. Land is acquired and the building planned, with the support of Bishop Augustine and others.",
  },
  {
    when: "December 2025 to January 2026",
    what: "A group from the UK is welcomed to the Diocese of Orlu. The foundation stone is laid on 29 December 2025.",
    plates: [
      {
        src: "/media/about-land.jpg",
        alt: "The cleared red-earth site at Abajah seen from above, palms at its edge and people gathered across it.",
        caption: "The land at Abajah.",
      },
      {
        src: "/media/about-stone.jpg",
        alt: "The bishop at the blessing of the foundation stone, surrounded by clergy and visitors.",
        caption: "The foundation stone is blessed.",
      },
      {
        src: "/media/about-welcome.jpg",
        alt: "Dancers in red and white leading the welcome at the Abajah site.",
        caption: "The welcome at the site.",
      },
    ],
  },
  {
    when: "29 January 2026",
    what: "Building begins, thanks to architect Ifeanyi Achugasim and engineer Emeka Ngwangwa, supervised by local engineers and builders with the advice of hospital managers and clinicians.",
    plates: [
      {
        src: "/media/builders.jpg",
        alt: "Five builders in hard hats and high-visibility vests, standing together on the cleared site at Abajah.",
        caption: "The builders at the Abajah site.",
      },
    ],
  },
  {
    when: "Ongoing",
    what: "The building rises. Dated progress photographs follow.",
    current: true,
    plates: [
      {
        src: "/media/grove-4.jpg",
        alt: "Builders at work on the roof of St Perpetua Hospital, with bamboo scaffolding along the walls below.",
        caption: "Builders at work on the roof.",
      },
    ],
  },
];

/** What the hospital is, in the charity's words: a new 50-bed hospital in Abajah, with diagnostic and outreach facilities. */
export const hospitalFacts = {
  beds: 50,
  summary:
    "A new 50-bed hospital in Abajah, with diagnostic and outreach facilities, providing accessible, quality medical care to children, young people, older adults and vulnerable members of society.",
  /** Who builds it: Orlu people as agents. */
  builtBy:
    "Thanks to the work of architect Ifeanyi Achugasim and engineer Emeka Ngwangwa in Orlu, the building is supervised by local engineers and builders, with the advice and guidance of hospital managers and clinicians.",
} as const;

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
  /** The charity's own words (supporter text, 2026-11-16). */
  credit: "We credit the St Perpetua Hospital project to the inspiration of the Holy Spirit.",
  faith:
    "Our shared faith is the bond which enables us to help each other, and also inspires us to work for the benefit of people of other faiths and none.",
  portal:
    "The Church provides low-cost health care in Orlu for those who cannot afford the expensive private care available only to the rich. She acts like a portal between the two communities, for the benefit of both.",
  remit:
    "To fund the construction and equipment of the new hospital and support its development as an efficient clinical facility.",
  objectives: [
    "Build St Perpetua Hospital.",
    "Improve access to healthcare.",
    "Reduce maternal, infant and child mortality.",
    "Support healthcare professionals.",
    "Provide health education and community outreach.",
  ],
  orluToEngland: [
    "Thanks to the initiative of (then) Bishop Mark O'Toole of Plymouth, who visited Bishop Augustine and his people in Nigeria, priests from the Diocese of Orlu have ministered to Catholics in Plymouth and other dioceses in the UK since 2006.",
    "Sisters have served too.",
  ],
  englandToOrlu: [
    "In April 2024, Deborah Van Kroonenburg visited the Diocese of Orlu with Fr Anthony Onuoha, as a guest of Bishop Augustine. They were distressed to learn that, despite the skill and dedication of those working in this area, health care provision was inadequate.",
    "There and then a vision formed, which became a plan for a new 50-bed hospital in Abajah, with diagnostic and outreach facilities.",
    "The project began in prayer, and soon people in the UK and in Orlu responded to the need. Land was acquired and a building planned, thanks to the support of Bishop Augustine and others.",
    "In December 2025 and January 2026 a group from the UK was welcomed to the Diocese of Orlu, and the foundation stone was laid on 29 December 2025. Building began on 29 January 2026.",
  ],
  trustees: [
    { name: "Dr Deborah Van Kroonenburg", role: "Chair of Trustees" },
    {
      name: "Very Revd Dr Canon Anthony C. Onuoha",
      role: "Trustee",
      // Supplied by the charity (his biography document). Only a stray comma in the first sentence was corrected.
      bio: [
        "Very Revd Dr Canon Anthony C. Onuoha is a Catholic priest and charity leader with extensive experience in leadership, governance, and community development. He holds degrees in Philosophy, Theology, Religious Studies, International Relations and Globalization, and a PhD from Cardiff Metropolitan University.",
        "Ordained to the priesthood in 2000, he has served in leadership roles in both Nigeria and the United Kingdom. Since 2017, he has been the Managing Chaplain at HMP Channings Wood. In 2024, he was appointed National Catholic Chaplain for Prisons in England and Wales and Roman Catholic Faith and Belief Adviser to the Ministry of Justice.",
        "As a Trustee of Seed of Success Foundation, Fr Anthony is passionate about improving healthcare access and helping deliver the vision of St. Perpetua Hospital and community medical outreach programmes for underserved communities in Orlu Province, Nigeria.",
      ],
    },
    { name: "Fr Evangelist Ohaejesi", role: "Trustee" },
  ] as readonly Trustee[],
  advisers: ["Chris Kemp", "Brian Bargent", "Fr George Nwadike"],
} as const;

export type Trustee = { name: string; role: string; bio?: readonly string[] };

/** Get Involved (PRD §4.5), in the order the client asked: prayer first. Amounts and current needs are outstanding. */
export const involvePage = {
  pray: {
    quote: "Before we ask for money, we ask for your prayers.",
    body: "Prayer is open to everyone, including the housebound, the sick, the elderly and schoolchildren across both dioceses.",
  },
  give: "Every gift helps the building rise. All that has been raised so far has gone straight into the project.",
  fundraise: "Marathons, parish and school activities, or a JustGiving page.",
  volunteer: "Offer your time and skills to the work of the foundation.",
  sponsor: "Name a ward or a piece of equipment in St Perpetua Hospital.",
  /** Verbatim from the client's brief (PRD §1.1). */
  ethics:
    "We do not accept any sponsorship that endorses products or values which contravene Catholic values.",
} as const;

export const navigation = [
  { href: "/about", label: "About" },
  { href: "/our-work", label: "Our work" },
  { href: "/get-involved", label: "Get involved" },
  { href: "/contact", label: "Contact" },
] as const;
