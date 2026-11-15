import Image from "next/image";
import Link from "next/link";
import { charity } from "@/lib/site/charity";
import { hospitalServices, outreachServices } from "@/lib/site/content";
import { PageHead } from "./page-head";
import { SiteShell } from "./shell";

/** Our Work index (PRD §3): the charity has two programmes, not a catalogue of causes. */
export function OurWorkPage() {
  return (
    <SiteShell>
      <PageHead
        eyebrow="Our work"
        title={
          <>
            One hospital, and the <em>outreach</em> beside it.
          </>
        }
        lead={charity.mission}
      />

      <section className="sx-section sx-alt" aria-label="The two programmes">
        <div className="sx-wrap">
          <article className="sx-feature" aria-labelledby="ow-hospital">
            <figure className="sx-plate">
              <div className="sx-plate-frame">
                <Image
                  src="/media/grove-3.jpg"
                  alt="St Perpetua Hospital under construction at Abajah. The main block stands wrapped in bamboo scaffolding, with builders working on the roof."
                  fill
                  sizes="(max-width: 900px) 92vw, 46vw"
                  className="sx-cover"
                />
              </div>
              <figcaption>Under construction at Abajah.</figcaption>
            </figure>
            <div>
              <p className="sx-row-no" aria-hidden="true">
                01
              </p>
              <h2 id="ow-hospital" className="sx-h2">
                St Perpetua Hospital
              </h2>
              <p className="sx-lead">
                A hospital for Abajah and the wider Orlu Province, providing accessible, quality
                medical care to children, young people, older adults and vulnerable members of
                society.
              </p>
              <ul className="sx-ticks">
                {hospitalServices.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <Link href="/our-work/st-perpetua-hospital" className="sx-link">
                The hospital and its build
              </Link>
            </div>
          </article>

          <article className="sx-feature sx-feature-flip" aria-labelledby="ow-outreach">
            <div>
              <p className="sx-row-no" aria-hidden="true">
                02
              </p>
              <h2 id="ow-outreach" className="sx-h2">
                Medical Outreach Programme
              </h2>
              <p className="sx-lead">
                Free consultations and health checks, taken out to the community.
              </p>
              <ul className="sx-ticks">
                {outreachServices.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <Link href="/our-work/medical-outreach" className="sx-link">
                The outreach programme
              </Link>
            </div>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
