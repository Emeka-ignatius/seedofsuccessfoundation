import Image from "next/image";
import Link from "next/link";
import { charity } from "@/lib/site/charity";
import { aboutPage, dioceses, reciprocity, stewardship } from "@/lib/site/content";
import { Balance } from "./balance";
import { ElevationFlat } from "./elevation-flat";
import { Pending } from "./pending";
import { SiteShell } from "./shell";

/**
 * About Us (PRD §4.2): the see-saw, built properly. The two communities in balance, then who we are (mission,
 * vision, the five objectives), the trustees and advisers, and governance. Every sentence is from the PRD or the
 * client's own documents; photographs and biographies are awaited, and marked as such.
 */
export function About() {
  return (
    <SiteShell>
      <section className="sx-section sx-page-head" aria-labelledby="about-title">
        <div className="sx-wrap">
          <h1 id="about-title" className="sx-h1">
            Two communities, <em>one hospital</em>.
          </h1>
          <p className="sx-lead">{reciprocity.lead}</p>
        </div>
      </section>

      <section className="sx-section sx-alt" aria-labelledby="story-title">
        <div className="sx-wrap">
          <p className="sx-eyebrow">
            <span className="sx-no" aria-hidden="true">
              I
            </span>
            <span>The story</span>
          </p>
          <h2 id="story-title" className="sx-h2">
            A see-saw, kept in <em>balance</em>.
          </h2>
          <p className="sx-lead">{aboutPage.credit}</p>
          <figure className="sx-plate sx-plate-wide">
            <div className="sx-plate-frame">
              <Image
                src="/media/about-priests.jpg"
                alt="Two priests in white vestments walking side by side outside the church in Orlu, their bishop behind them."
                fill
                sizes="(max-width: 900px) 92vw, 56rem"
                className="sx-cover"
              />
            </div>
            <figcaption>During the UK group&apos;s visit to Orlu.</figcaption>
          </figure>
          <div className="sx-balance-wrap sx-balance-light">
            <Balance />
          </div>
          <div className="sx-story-grid">
            <article aria-labelledby="story-orlu">
              <figure className="sx-plate">
                <div className="sx-plate-frame">
                  <Image
                    src="/media/about-sisters.jpg"
                    alt="Religious sisters in white and blue habits in the pews at Mass in Orlu."
                    fill
                    sizes="(max-width: 768px) 92vw, 44vw"
                    className="sx-cover"
                  />
                </div>
                <figcaption>And sisters too.</figcaption>
              </figure>
              <h3 id="story-orlu" className="sx-h3">
                Orlu gives England
              </h3>
              {aboutPage.orluToEngland.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <ul className="sx-dioceses" aria-label="The seven English dioceses served">
                {dioceses.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </article>
            <article aria-labelledby="story-england">
              <figure className="sx-plate">
                <div className="sx-plate-frame">
                  <Image
                    src="/media/about-guests.jpg"
                    alt="Visitors from England, dressed in Nigerian fabrics, seated in the congregation at Mass in Orlu."
                    fill
                    sizes="(max-width: 768px) 92vw, 44vw"
                    className="sx-cover"
                  />
                </div>
                <figcaption>Welcomed into the congregation.</figcaption>
              </figure>
              <h3 id="story-england" className="sx-h3">
                England gives Orlu
              </h3>
              {aboutPage.englandToOrlu.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>
                <Link href="/our-work/st-perpetua-hospital" className="sx-link">
                  Follow the build
                </Link>
              </p>
            </article>
          </div>

          <div className="sx-plates">
            <figure className="sx-plate">
              <div className="sx-plate-frame">
                <Image
                  src="/media/about-land.jpg"
                  alt="The cleared red-earth site at Abajah seen from above, palms at its edge and people gathered across it."
                  fill
                  sizes="(max-width: 900px) 92vw, 30vw"
                  className="sx-cover"
                />
              </div>
              <figcaption>The land at Abajah.</figcaption>
            </figure>
            <figure className="sx-plate">
              <div className="sx-plate-frame">
                <Image
                  src="/media/about-stone.jpg"
                  alt="The bishop at the blessing of the foundation stone, surrounded by clergy and visitors."
                  fill
                  sizes="(max-width: 900px) 92vw, 30vw"
                  className="sx-cover"
                />
              </div>
              <figcaption>The foundation stone is blessed.</figcaption>
            </figure>
            <figure className="sx-plate">
              <div className="sx-plate-frame">
                <Image
                  src="/media/about-welcome.jpg"
                  alt="Dancers in red and white leading the welcome at the Abajah site."
                  fill
                  sizes="(max-width: 900px) 92vw, 30vw"
                  className="sx-cover"
                />
              </div>
              <figcaption>The welcome at the site.</figcaption>
            </figure>
          </div>
          <blockquote className="sx-ethic sx-faith">{aboutPage.faith}</blockquote>
        </div>
      </section>

      <section className="sx-section" aria-labelledby="who-title">
        <div className="sx-wrap">
          <p className="sx-eyebrow">
            <span className="sx-no" aria-hidden="true">
              II
            </span>
            <span>Who we are</span>
          </p>
          <h2 id="who-title" className="sx-h2">
            A mission with five objectives.
          </h2>
          <div className="sx-mv">
            <div>
              <h3 className="sx-h3">Mission</h3>
              <p>{charity.mission}</p>
            </div>
            <div>
              <h3 className="sx-h3">Vision</h3>
              <p>{aboutPage.vision}</p>
            </div>
            <div>
              <h3 className="sx-h3">Remit</h3>
              <p>{aboutPage.remit}</p>
            </div>
          </div>
          <ol className="sx-objectives">
            {aboutPage.objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sx-section sx-alt" aria-labelledby="people-title">
        <div className="sx-wrap">
          <p className="sx-eyebrow">
            <span className="sx-no" aria-hidden="true">
              III
            </span>
            <span>Trustees and advisers</span>
          </p>
          <h2 id="people-title" className="sx-h2">
            The people responsible.
          </h2>
          <ul className="sx-people">
            {aboutPage.trustees.map((t) => (
              <li key={t.name} className="sx-person">
                <div>
                  <p className="sx-person-name">{t.name}</p>
                  <p className="sx-person-role">{t.role}</p>
                </div>
                <div className="sx-person-bio">
                  {t.bio ? (
                    t.bio.map((p) => <p key={p}>{p}</p>)
                  ) : (
                    <Pending>a biography, in their own words.</Pending>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <Pending>trustee photographs.</Pending>
          <div className="sx-advisers">
            <p className="sx-row-label">Advisers</p>
            <p className="sx-advisers-names">{aboutPage.advisers.join("  ·  ")}</p>
          </div>
        </div>
      </section>

      <section className="sx-section sx-night sx-final" aria-labelledby="gov-title">
        <div className="sx-wrap">
          <p className="sx-eyebrow">
            <span className="sx-no" aria-hidden="true">
              IV
            </span>
            <span>Governance</span>
          </p>
          <h2 id="gov-title" className="sx-h2">
            Accountable for every gift.
          </h2>
          <p className="sx-lead">{stewardship}</p>
          <p>{aboutPage.portal}</p>
          <p>
            {charity.name} is a {charity.registration}, no.{" "}
            <span className="sx-nowrap">{charity.registeredCharityNumber}</span>.
          </p>
          {charity.registeredAddress ? (
            <p>{charity.registeredAddress}</p>
          ) : (
            <Pending>the registered address, which must appear here.</Pending>
          )}
        </div>
        <div className="sx-final-art" aria-hidden="true">
          <ElevationFlat />
        </div>
      </section>
    </SiteShell>
  );
}
