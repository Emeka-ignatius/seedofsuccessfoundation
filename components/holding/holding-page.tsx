import Image from "next/image";
import Link from "next/link";
import { getEnv } from "@/lib/security/env";
import { charity } from "@/lib/site/charity";
import { CONSENT_TEXT } from "@/lib/subscribers/consent";
import { DayCounter } from "./day-counter";
import { Elevation } from "./elevation";
import { SignupForm } from "./signup-form";
import "./holding.css";

/**
 * Phase 0 holding page. It does not announce that a website is under construction; it announces that a hospital is.
 * Every sentence here comes from the PRD (§3A) or the client's own mission statement. No donation functionality.
 */
export function HoldingPage() {
  const turnstileSiteKey = getEnv().TURNSTILE_SITE_KEY;

  return (
    <div className="holding">
      {/* The palm grove at the Abajah site (KAY_5841, client photography, foliage only), dimmed to a texture. */}
      <Image
        // src="/media/holding-bg.jpg"
        src="/media/holding-bg-1.jpg"
        alt=""
        fill
        priority
        sizes="250vw"
        className="holding-photo"
      />
      <div className="holding-scrim" aria-hidden="true" />

      <a href="#signup-email" className="skip-link">
        Skip to sign-up
      </a>

      <div className="holding-layout">
        <header className="holding-header reveal" style={{ "--d": "0s" } as React.CSSProperties}>
          <p className="wordmark">{charity.name}</p>
        </header>

        <div className="holding-stage">
          <Elevation />
          <main id="main" className="holding-main">
            <p className="eyebrow reveal" style={{ "--d": "0.1s" } as React.CSSProperties}>
              {charity.location}
            </p>
            <h1 className="headline reveal" style={{ "--d": "0.2s" } as React.CSSProperties}>
              {charity.hospitalName} is rising in&nbsp;Orlu.
            </h1>
            <p className="lead reveal" style={{ "--d": "0.35s" } as React.CSSProperties}>
              {charity.need}
            </p>

            <div className="reveal" style={{ "--d": "0.5s" } as React.CSSProperties}>
              <DayCounter />
            </div>

            <p className="mission reveal" style={{ "--d": "0.65s" } as React.CSSProperties}>
              {charity.mission}
            </p>

            <div id="signup" className="reveal" style={{ "--d": "0.8s" } as React.CSSProperties}>
              <SignupForm turnstileSiteKey={turnstileSiteKey} consentText={CONSENT_TEXT} />
            </div>
          </main>
        </div>
        <footer className="holding-footer">
          <p>
            {charity.name}. {charity.registration}, no.{" "}
            <span className="nowrap">{charity.registeredCharityNumber}</span>.
          </p>
          <p>
            {charity.contactEmail ? (
              <>
                <a className="text-link" href={`mailto:${charity.contactEmail}`}>
                  {charity.contactEmail}
                </a>
                {" · "}
              </>
            ) : null}
            <Link className="text-link" href="/privacy">
              Privacy
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
