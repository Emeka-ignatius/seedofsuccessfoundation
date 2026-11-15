import Image from "next/image";
import Link from "next/link";
import { charity } from "@/lib/site/charity";
import { hospitalServices, milestones, need } from "@/lib/site/content";
import { DayCount } from "./day-count";
import { ElevationFlat } from "./elevation-flat";
import { PageHead } from "./page-head";
import { Pending } from "./pending";
import { SiteShell } from "./shell";

/**
 * The hospital (PRD §4.3): the whole reason the charity exists, so it gets a full page, not a card. The need, what it
 * will provide, the Nigerian professionals building it, and the dated, photographic build timeline. Expected impact
 * and funding progress are outstanding from the charity.
 */
export function Hospital() {
  return (
    <SiteShell>
      <PageHead
        eyebrow="Our work · St Perpetua Hospital"
        title={
          <>
            A hospital for Abajah, <em>rising</em> in Orlu.
          </>
        }
        lead="A hospital providing accessible, quality medical care to children, young people, older adults and vulnerable members of society."
      />

      <div className="sx-wrap">
        <figure className="sx-plate sx-plate-wide sx-plate-hero">
          <div className="sx-plate-frame">
            <Image
              src="/media/grove-3.jpg"
              alt="St Perpetua Hospital under construction at Abajah. The main block stands wrapped in bamboo scaffolding, with builders working on the roof."
              fill
              priority
              sizes="(max-width: 900px) 92vw, 72rem"
              className="sx-cover"
            />
          </div>
          <figcaption>
            <DayCount />
          </figcaption>
        </figure>
      </div>

      <section className="sx-section" aria-labelledby="h-need">
        <div className="sx-wrap">
          <p className="sx-eyebrow">
            <span className="sx-no" aria-hidden="true">
              I
            </span>
            <span>The need</span>
          </p>
          <div className="sx-need-grid">
            <h2 id="h-need" className="sx-need-head">
              <span className="sx-bignum">{need.people}</span>
              {need.peopleLine}
            </h2>
            <ul className="sx-need-list">
              {need.statements.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          {need.sources ? (
            <p className="sx-small">Sources: {need.sources}</p>
          ) : (
            <Pending>
              health statistics with citable sources, to sit under these statements.
            </Pending>
          )}
        </div>
      </section>

      <section className="sx-section sx-alt" aria-labelledby="h-provide">
        <div className="sx-wrap">
          <p className="sx-eyebrow">
            <span className="sx-no" aria-hidden="true">
              II
            </span>
            <span>What it will provide</span>
          </p>
          <h2 id="h-provide" className="sx-h2">
            Care for a whole province.
          </h2>
          <ol className="sx-services">
            {hospitalServices.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <Pending>
            expected impact: what the hospital is expected to achieve, with figures the charity can
            stand behind.
          </Pending>
        </div>
      </section>

      <section className="sx-section" aria-labelledby="h-build">
        <div className="sx-wrap">
          <p className="sx-eyebrow">
            <span className="sx-no" aria-hidden="true">
              III
            </span>
            <span>The build, dated</span>
          </p>
          <h2 id="h-build" className="sx-h2">
            From a vision to a <em>building</em>.
          </h2>
          <p className="sx-lead">
            Designed by architect Ifeanyi Achugasim and engineer Emeka Ngwangwa, and built under the
            supervision of local engineers and builders.
          </p>

          <ol className="sx-chron" aria-label="Build timeline">
            {milestones.map((m) => (
              <li key={m.when} className={m.current ? "sx-chron-current" : undefined}>
                <p className="sx-chron-when">{m.when}</p>
                <div className="sx-chron-body">
                  <p className="sx-chron-what">{m.what}</p>
                  {m.plates ? (
                    <div
                      className={m.plates.length > 1 ? "sx-chron-plates" : "sx-chron-plates one"}
                    >
                      {m.plates.map((p) => (
                        <figure key={p.src} className="sx-plate">
                          <div className="sx-plate-frame">
                            <Image
                              src={p.src}
                              alt={p.alt}
                              fill
                              sizes="(max-width: 900px) 92vw, 30vw"
                              className="sx-cover"
                            />
                          </div>
                          <figcaption>{p.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
          <Pending>
            a dated progress photograph each month, so visitors can see the building rise.
          </Pending>
        </div>
      </section>

      <section className="sx-section sx-alt" aria-labelledby="h-funding">
        <div className="sx-wrap">
          <p className="sx-eyebrow">
            <span className="sx-no" aria-hidden="true">
              IV
            </span>
            <span>Funding</span>
          </p>
          <h2 id="h-funding" className="sx-h2">
            Where the money goes.
          </h2>
          <p className="sx-lead">
            All that has been raised so far has gone straight into the project.
          </p>
          <Pending>
            the funding goal and the amount raised to date, for a progress indicator.
          </Pending>
        </div>
      </section>

      <section className="sx-section sx-night sx-final" aria-labelledby="h-cta">
        <div className="sx-wrap">
          <h2 id="h-cta" className="sx-h2">
            Help {charity.hospitalName} rise.
          </h2>
          <div className="sx-actions">
            <Link href="/donate" className="sx-btn sx-btn-primary">
              Donate
            </Link>
            <Link href="/get-involved#pray" className="sx-link">
              Or begin with a prayer
            </Link>
          </div>
        </div>
        <div className="sx-final-art" aria-hidden="true">
          <ElevationFlat />
        </div>
      </section>
    </SiteShell>
  );
}
