// Facts about the charity, taken from the PRD and the client's documents. Nothing here is invented:
// anything the client has not yet supplied is `null` and must be filled before launch (see the dependency
// tracker in docs/IMPLEMENTATION_PLAN.md). Pages render a missing value as absent, never as a placeholder.
export const charity = {
  name: "Seed of Success Foundation",
  shortName: "Seed of Success",
  registeredCharityNumber: "1219306",
  registration: "Registered Charity in England and Wales",
  hospitalName: "St Perpetua Hospital",
  location: "Abajah, Orlu Province, Imo State, Nigeria",
  /** Foundation stone laid Dec 2025 / Jan 2026; construction began on this date. Day 1 = this date. */
  constructionStart: { year: 2026, month: 1, day: 29 },
  mission:
    "To transform healthcare in Abajah and the wider Orlu Province of Imo State, Nigeria, by establishing and supporting St Perpetua Hospital.",
  need: "One million people in Orlu Province have limited access to hospital care.",
  siteUrl: "https://seedofsuccessfoundation.com",
  // Outstanding from the client (PRD §16). Blocking for launch, not for development.
  contactEmail: null as string | null,
  registeredAddress: null as string | null,
  phone: null as string | null,
} as const;
