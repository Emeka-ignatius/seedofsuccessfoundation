import Link from "next/link";
import { dioceses, reciprocity } from "@/lib/site/content";
import { Balance } from "./balance";

/**
 * Two Communities (PRD §4.1 section 3): the centrepiece, on the forest-green ground (the "seed"). Orlu on one side,
 * England on the other, each giving the other something it lacks. Every claim is from the PRD. The drawing is
 * decorative; this text is the content.
 */
export function TwoCommunities() {
  return (
    <section className="sx-section sx-forest sx-tc" aria-labelledby="tc-title">
      <div className="sx-wrap">
        <header className="sx-tc-head">
          <p className="sx-eyebrow">
            <span className="sx-no" aria-hidden="true">
              II
            </span>
            <span>Orlu and England</span>
          </p>
          <h2 id="tc-title" className="sx-h2">
            Two communities, helping each other.
          </h2>
          <p className="sx-lead">{reciprocity.lead}</p>
        </header>

        <div className="sx-balance-wrap">
          <Balance />
        </div>

        <div className="sx-tc-grid">
          <article className="sx-tc-panel" aria-labelledby="tc-orlu">
            <h3 id="tc-orlu" className="sx-h3">
              Orlu gives England
            </h3>
            <p>{reciprocity.orluGivesEngland}</p>
            <ul className="sx-dioceses" aria-label="The seven English dioceses served">
              {dioceses.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </article>

          <article className="sx-tc-panel" aria-labelledby="tc-england">
            <h3 id="tc-england" className="sx-h3">
              England gives Orlu
            </h3>
            <p>{reciprocity.englandGivesOrlu}</p>
            <p>
              <Link href="/our-work/st-perpetua-hospital" className="sx-link">
                See how the hospital is being built
              </Link>
            </p>
          </article>
        </div>

        <p className="sx-tc-more">
          <Link href="/about" className="sx-link">
            The full story of the two communities
          </Link>
        </p>
      </div>
    </section>
  );
}
