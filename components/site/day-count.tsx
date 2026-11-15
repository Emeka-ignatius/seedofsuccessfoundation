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

/** "Day N of construction" for the light site. Same cached, JS-free approach as the holding page's counter. */
export async function DayCount() {
  "use cache";
  cacheLife("minutes");

  const day = constructionDay();
  return (
    <div className="sx-day">
      <p className="sx-day-line">
        <span className="sx-day-word">Day</span>
        <span className="sx-day-number">{day}</span>
        <span className="sx-day-word">of construction</span>
      </p>
      <p className="sx-day-since">
        Building began on <time dateTime="2026-01-29">{startedLabel}</time>.
      </p>
    </div>
  );
}
