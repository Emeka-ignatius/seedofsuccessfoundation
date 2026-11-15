import Link from "next/link";
import { SignupForm } from "@/components/holding/signup-form";
import { getEnv } from "@/lib/security/env";
import { charity } from "@/lib/site/charity";
import {
  hospitalServices,
  involvement,
  need,
  outreachServices,
  stewardship,
  testimonials,
} from "@/lib/site/content";
import { CONSENT_TEXT } from "@/lib/subscribers/consent";
import { ElevationFlat } from "./elevation-flat";
import { Pending } from "./pending";

/** The need, in numbers (PRD §4.1 section 2): short, stark, cited. Citations are outstanding, so none are invented. */
export function Need() {
  return (
    <section className="sx-section sx-alt" aria-labelledby="need-title">
      <div className="sx-wrap">
        <p className="sx-eyebrow">
          <span className="sx-no" aria-hidden="true">
            I
          </span>
          <span>The need</span>
        </p>
        <div className="sx-need-grid">
          <h2 id="need-title" className="sx-need-head">
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
          <Pending>health statistics with citable sources, to sit under these statements.</Pending>
        )}
      </div>
    </section>
  );
}

/** Our Work (PRD §4.1 section 5): an index of two programmes, not a catalogue of causes. */
export function OurWork() {
  return (
    <section className="sx-section sx-alt" aria-labelledby="work-title">
      <div className="sx-wrap">
        <p className="sx-eyebrow">
          <span className="sx-no" aria-hidden="true">
            IV
          </span>
          <span>Our work</span>
        </p>
        <h2 id="work-title" className="sx-h2">
          One hospital, and the outreach beside it.
        </h2>
        <div className="sx-rows">
          <article className="sx-row" aria-labelledby="work-hospital">
            <p className="sx-row-no" aria-hidden="true">
              01
            </p>
            <div className="sx-row-main">
              <h3 id="work-hospital" className="sx-h3">
                St Perpetua Hospital
              </h3>
              <p>
                A hospital for Abajah and the wider Orlu Province, providing accessible, quality
                medical care to children, young people, older adults and vulnerable members of
                society.
              </p>
              <Link href="/our-work/st-perpetua-hospital" className="sx-link">
                About the hospital
              </Link>
            </div>
            <div>
              <p className="sx-row-label">What it will provide</p>
              <ul className="sx-ticks">
                {hospitalServices.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </article>

          <article className="sx-row" aria-labelledby="work-outreach">
            <p className="sx-row-no" aria-hidden="true">
              02
            </p>
            <div className="sx-row-main">
              <h3 id="work-outreach" className="sx-h3">
                Medical Outreach Programme
              </h3>
              <p>Free consultations and health checks, taken out to the community.</p>
              <Link href="/our-work/medical-outreach" className="sx-link">
                About the outreach
              </Link>
            </div>
            <div>
              <p className="sx-row-label">What it offers</p>
              <ul className="sx-ticks">
                {outreachServices.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/** Voices (PRD §4.1 section 6): Orlu on the need, a UK parish on their Nigerian priest. Both are outstanding. */
export function Voices() {
  return (
    <section className="sx-section" aria-labelledby="voices-title">
      <div className="sx-wrap">
        <p className="sx-eyebrow">
          <span className="sx-no" aria-hidden="true">
            V
          </span>
          <span>Voices</span>
        </p>
        <h2 id="voices-title" className="sx-h2">
          In their own words.
        </h2>
        <div className="sx-voices">
          {testimonials.length > 0 ? (
            testimonials.map((t) => (
              <figure key={t.name} className="sx-quote">
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  {t.name}, {t.role}
                </figcaption>
              </figure>
            ))
          ) : (
            <>
              <Pending>a testimonial from Orlu, on the need for the hospital.</Pending>
              <Pending>a testimonial from an English parish, about their Nigerian priest.</Pending>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/** Get involved (PRD §4.1 section 7 and §4.5): prayer stated first, in the client's words, set apart. */
export function GetInvolved() {
  const [pray, ...others] = involvement;
  return (
    <section className="sx-section sx-alt" aria-labelledby="involved-title">
      <div className="sx-wrap">
        <p className="sx-eyebrow">
          <span className="sx-no" aria-hidden="true">
            VI
          </span>
          <span>Get involved</span>
        </p>
        <h2 id="involved-title" className="sx-h2">
          Pray, give, fundraise, volunteer.
        </h2>

        <article className="sx-pray" id="pray" aria-labelledby="pray-title">
          <svg className="sx-pray-cross" viewBox="0 0 14 20" aria-hidden="true" focusable="false">
            <path
              d="M7 1v18M2 6h10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          <p id="pray-title" className="sx-pray-kicker">
            01 · {pray.title}
          </p>
          <p className="sx-pray-quote">{pray.body}</p>
          <p>{"note" in pray ? pray.note : null}</p>
          <Link href={pray.href} className="sx-link">
            {pray.cta}
          </Link>
        </article>

        <div className="sx-rows">
          {others.map((item, i) => (
            <article key={item.id} className="sx-row sx-row-single">
              <p className="sx-row-no" aria-hidden="true">
                {String(i + 2).padStart(2, "0")}
              </p>
              <div className="sx-row-main">
                <h3 className="sx-h3">{item.title}</h3>
                <p>{item.body}</p>
                <Link href={item.href} className="sx-link">
                  {item.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Trust row (PRD §4.1 section 8). The Gift Aid mark is left out until HMRC registration (B8) is confirmed. */
export function TrustRow() {
  return (
    <aside className="sx-trust" aria-label="Charity registration">
      <div className="sx-wrap sx-trust-inner">
        <p>
          <strong>{charity.name}</strong>
        </p>
        <p>
          {charity.registration}, no.{" "}
          <span className="sx-nowrap">{charity.registeredCharityNumber}</span>
        </p>
        {charity.registeredAddress ? <p>{charity.registeredAddress}</p> : null}
      </div>
    </aside>
  );
}

/** Newsletter (PRD §4.1 section 9): email only, framed like a clipping. Same form, server action, spam check and
 * consent text as the holding page. */
export function Newsletter() {
  return (
    <section className="sx-section sx-newsletter" aria-labelledby="news-title">
      <div className="sx-wrap">
        <div className="sx-frame sx-newsletter-inner">
          <h2 id="news-title" className="sx-h2">
            Follow the <em>building</em> of the hospital.
          </h2>
          <SignupForm
            turnstileSiteKey={getEnv().TURNSTILE_SITE_KEY}
            consentText={CONSENT_TEXT}
            label="Get updates by email"
            theme="light"
          />
        </div>
      </div>
    </section>
  );
}

/** Final call to action (PRD §4.1 section 10), with the building's line drawing at its foot. */
export function FinalCta() {
  return (
    <section className="sx-section sx-night sx-final" aria-labelledby="final-title">
      <div className="sx-wrap">
        <h2 id="final-title" className="sx-h2">
          Help St Perpetua Hospital rise.
        </h2>
        <p className="sx-lead">{stewardship}</p>
        <div className="sx-actions">
          <Link href="/donate" className="sx-btn sx-btn-primary">
            Donate
          </Link>
        </div>
      </div>
      <div className="sx-final-art" aria-hidden="true">
        <ElevationFlat />
      </div>
    </section>
  );
}
