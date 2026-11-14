import { charity } from "./charity";

const TIME_ZONE = "Europe/London";

/** Calendar date (year, month, day) of an instant as seen in London, so "Day N" turns over at London midnight. */
function londonDate(now: Date): { y: number; m: number; d: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return { y: get("year"), m: get("month"), d: get("day") };
}

/**
 * Day N of construction. Construction began on 29 January 2026, which is Day 1.
 * Dates are compared as pure calendar dates (UTC midnights), so daylight-saving changes cannot skew the count.
 * Before the start date this returns 0.
 */
export function constructionDay(now: Date = new Date()): number {
  const start = charity.constructionStart;
  const today = londonDate(now);
  const msPerDay = 86_400_000;
  const diff =
    (Date.UTC(today.y, today.m - 1, today.d) - Date.UTC(start.year, start.month - 1, start.day)) /
    msPerDay;
  return diff < 0 ? 0 : diff + 1;
}
