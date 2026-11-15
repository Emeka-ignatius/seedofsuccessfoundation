// SITE_MODE decides what the production domain serves. See docs/IMPLEMENTATION_PLAN.md D2.
//
// FAIL CLOSED: the full site is exposed only when the value is exactly "live".
// Missing, empty, misspelled, differently-cased or padded values all resolve to "holding".
// A configuration mistake can therefore hide the site; it can never expose it.
export type SiteMode = "holding" | "live";

export function getSiteMode(raw: string | undefined = process.env.SITE_MODE): SiteMode {
  return raw === "live" ? "live" : "holding";
}
