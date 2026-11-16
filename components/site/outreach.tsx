import Link from "next/link";
import { outreachServices } from "@/lib/site/content";
import { ElevationFlat } from "./elevation-flat";
import { PageHead } from "./page-head";
import { Pending } from "./pending";
import { SiteShell } from "./shell";

/**
 * Medical Outreach Programme (PRD §4.4). Deliberately no photographs yet: every outreach frame we hold shows
 * patients or children, and those wait for the client's explicit permission. The page is set in type instead, and
 * says plainly what is awaited.
 */
export function Outreach() {
  return (
    <SiteShell>
      <PageHead
        title={
          <>
            Care taken out to the <em>community</em>.
          </>
        }
        lead="Free consultations and health checks, taken out to the community."
      />

      <section className="sx-section sx-alt" aria-labelledby="o-offer">
        <div className="sx-wrap">
          <p className="sx-eyebrow">
            <span className="sx-no" aria-hidden="true">
              I
            </span>
            <span>What it offers</span>
          </p>
          <h2 id="o-offer" className="sx-h2">
            Eight ways we reach the community.
          </h2>
          <ol className="sx-services sx-services-big">
            {outreachServices.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sx-section" aria-labelledby="o-why">
        <div className="sx-wrap">
          <p className="sx-eyebrow">
            <span className="sx-no" aria-hidden="true">
              II
            </span>
            <span>How it fits</span>
          </p>
          <h2 id="o-why" className="sx-h2">
            Part of the foundation&apos;s five objectives.
          </h2>
          <p className="sx-lead">
            Improving access to healthcare, and health education and community outreach, are two of
            the foundation&apos;s five objectives. The outreach programme is part of that work,
            alongside the hospital.
          </p>
          <p>
            <Link href="/our-work/st-perpetua-hospital" className="sx-link">
              See the hospital being built
            </Link>
          </p>
          <Pending>
            outreach photographs, only with the written permission of the people shown, patients and
            children especially.
          </Pending>
        </div>
      </section>

      <section className="sx-section sx-alt" aria-labelledby="o-results">
        <div className="sx-wrap">
          <p className="sx-eyebrow">
            <span className="sx-no" aria-hidden="true">
              III
            </span>
            <span>Results so far</span>
          </p>
          <h2 id="o-results" className="sx-h2">
            What has already been done.
          </h2>
          <Pending>
            results to date: the client&apos;s brief mentions incubators and outreach medicines as
            early wins, with numbers and dates still needed.
          </Pending>
        </div>
      </section>

      <section className="sx-section sx-night sx-final" aria-labelledby="o-cta">
        <div className="sx-wrap">
          <h2 id="o-cta" className="sx-h2">
            Help the outreach reach further.
          </h2>
          <div className="sx-actions">
            <Link href="/donate" className="sx-btn sx-btn-primary">
              Donate
            </Link>
            <Link href="/get-involved#volunteer" className="sx-link">
              Or volunteer
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
