import Image from "next/image";
import Link from "next/link";
import { hospitalFacts, milestones } from "@/lib/site/content";
import { DayCount } from "./day-count";

/**
 * "The hospital is being built" (PRD §4.1 section 4): proof the money moves. Names the Nigerian professionals doing
 * the work. Timeline is the PRD's (§4.3); in Phase 2 it is edited in the admin and revalidated by tag.
 */
export function BuildProgress() {
  return (
    <section className="sx-section" aria-labelledby="build-title">
      <div className="sx-wrap">
        <p className="sx-eyebrow">
          <span className="sx-no" aria-hidden="true">
            III
          </span>
          <span>Under construction</span>
        </p>
        <div className="sx-build-grid">
          <div>
            <h2 id="build-title" className="sx-h2">
              The hospital is <em>being built</em>.
            </h2>
            <p className="sx-lead">{hospitalFacts.builtBy}</p>
            <DayCount />
            <p>
              <Link href="/our-work/st-perpetua-hospital" className="sx-link">
                The full timeline
              </Link>
            </p>
          </div>

          <figure className="sx-build-photo">
            <div className="sx-build-frame">
              <Image
                src="/media/foundation-stone.jpg"
                alt="The foundation stone of St Perpetua Hospital: a white plaque with gold lettering, reading Foundation Laying Ceremony of St Perpetua Hospital, Catholic Diocese of Orlu, on the 29th of December 2025."
                fill
                sizes="(max-width: 900px) 92vw, 46vw"
                className="sx-cover sx-cover-high"
              />
            </div>
            <figcaption>The foundation stone, laid on 29 December 2025.</figcaption>
          </figure>
        </div>

        <ol className="sx-timeline" aria-label="Build timeline">
          {milestones.map((m) => (
            <li key={m.when} className={m.current ? "sx-tl-current" : undefined}>
              <p className="sx-tl-when">{m.when}</p>
              <p className="sx-tl-what">{m.what}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
