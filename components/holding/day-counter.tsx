import { cacheLife } from "next/cache";
import { charity } from "@/lib/site/charity";
import { constructionDay } from "@/lib/site/construction";

const started = new Date(
  Date.UTC(
    charity.constructionStart.year,
    charity.constructionStart.month - 1,
    charity.constructionStart.day,
  ),
);
const startedLabel = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
}).format(started);

/**
 * "Day N of construction": the true, moving fact.
 *
 * Cached for minutes rather than rendered per request. That puts the number in the page's own HTML, so it shows
 * with JavaScript off, needs no loading state, and the page stays cacheable at the edge. (A request-time value
 * would stream in behind a Suspense boundary and be swapped in by a script, so it would never appear without JS.)
 * The count can lag by a few minutes after London midnight, which is fine for a day counter.
 */
export async function DayCounter() {
  "use cache";
  cacheLife("minutes");

  const day = constructionDay();
  return (
    <div className="day-counter">
      <p className="day-line">
        <span className="day-word">Day</span>
        <span className="day-number">{day}</span>
        <span className="day-word">of construction</span>
      </p>
      <p className="day-since">
        Building began on <time dateTime="2026-01-29">{startedLabel}</time>.
      </p>
    </div>
  );
}
