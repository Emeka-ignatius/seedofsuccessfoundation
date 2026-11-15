import Image from "next/image";
import Link from "next/link";
import { charity } from "@/lib/site/charity";
import { DayCount } from "./day-count";

/**
 * Hero (PRD §4.1 section 1). A newspaper dateline under the masthead (where, and under what registration), then the
 * PRD's headline with "Hope" set in italic red earth, and the building itself framed as a chapel window with the
 * day count beneath. One primary action: Donate.
 */
export function Hero() {
  return (
    <section className="sx-hero" aria-labelledby="hero-title">
      <div className="sx-dateline">
        <div className="sx-wrap sx-dateline-in">
          <span>{charity.location}</span>
          <span>
            {charity.registration}, no. {charity.registeredCharityNumber}
          </span>
        </div>
      </div>

      <div className="sx-wrap sx-hero-grid">
        <div className="sx-hero-copy">
          <h1
            id="hero-title"
            className="sx-h1 sx-rise"
            style={{ "--d": "0s" } as React.CSSProperties}
          >
            Bringing <em>Hope</em> Through Healthcare.
          </h1>
          <p className="sx-lead sx-rise" style={{ "--d": "0.12s" } as React.CSSProperties}>
            {charity.mission}
          </p>
          <div className="sx-actions sx-rise" style={{ "--d": "0.22s" } as React.CSSProperties}>
            <Link href="/donate" className="sx-btn sx-btn-primary">
              Donate
            </Link>
            <Link href="/our-work/st-perpetua-hospital" className="sx-btn sx-btn-ghost">
              The hospital
            </Link>
          </div>
        </div>

        <figure
          className="sx-arch-figure sx-rise"
          style={{ "--d": "0.18s" } as React.CSSProperties}
        >
          <div className="sx-arch">
            <div className="sx-arch-frame">
              <Image
                src="/media/grove-3.jpg"
                alt="St Perpetua Hospital under construction at Abajah. The main block stands wrapped in bamboo scaffolding, with builders working on the roof."
                fill
                priority
                sizes="(max-width: 900px) 90vw, 40vw"
                className="sx-arch-img"
              />
            </div>
          </div>
          <figcaption>
            <DayCount />
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
