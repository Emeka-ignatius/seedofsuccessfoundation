import Image from "next/image";
import Link from "next/link";
import { involvePage } from "@/lib/site/content";
import { PageHead } from "./page-head";
import { Pending } from "./pending";
import { SiteShell } from "./shell";

/**
 * Get Involved (PRD §4.5), in the order the client asked: prayer first, then give, fundraise, volunteer, sponsor and
 * partner. The prayer-pledge and volunteer forms need the enquiries table (a strict-area schema change awaiting
 * approval), so they are marked rather than faked.
 */
export function GetInvolvedPage() {
  return (
    <SiteShell>
      <PageHead
        eyebrow="Get involved"
        title={
          <>
            Pray, give, fundraise, volunteer, <em>sponsor</em>, partner.
          </>
        }
        lead="There is a place for everyone in this work. We begin with prayer."
      />

      <section className="sx-section sx-forest sx-gi-pray" id="pray" aria-labelledby="gi-pray">
        <div className="sx-wrap sx-gi-grid">
          <div>
            <p className="sx-eyebrow">
              <span className="sx-no" aria-hidden="true">
                01
              </span>
              <span>Pray</span>
            </p>
            <h2 id="gi-pray" className="sx-pray-quote sx-pray-left">
              {involvePage.pray.quote}
            </h2>
            <p className="sx-lead">{involvePage.pray.body}</p>
            <Pending>
              the optional prayer-pledge form (needs the enquiries database, which is awaiting
              approval).
            </Pending>
          </div>
          <figure className="sx-plate">
            <div className="sx-plate-frame">
              <Image
                src="/media/pray-embrace.jpg"
                alt="A religious sister in a white habit and a visitor from England embracing warmly."
                fill
                sizes="(max-width: 900px) 92vw, 42vw"
                className="sx-cover"
              />
            </div>
            <figcaption>Two communities, one prayer.</figcaption>
          </figure>
        </div>
      </section>

      <GiSection id="give" no="02" title="Give" lead={involvePage.give}>
        <div className="sx-actions">
          <Link href="/donate" className="sx-btn sx-btn-primary">
            Make a donation
          </Link>
        </div>
      </GiSection>

      <GiSection id="fundraise" no="03" title="Fundraise" lead={involvePage.fundraise} alt>
        <Pending>fundraising ideas and a JustGiving link, if the charity has one.</Pending>
      </GiSection>

      <GiSection id="volunteer" no="04" title="Volunteer" lead={involvePage.volunteer}>
        <Pending>
          the current volunteer needs, and the volunteer form (needs the enquiries database).
        </Pending>
      </GiSection>

      <GiSection id="sponsor" no="05" title="Sponsor" lead={involvePage.sponsor} alt>
        <Pending>sponsorship tiers and amounts, set by the charity.</Pending>
      </GiSection>

      <GiSection
        id="partner"
        no="06"
        title="Corporate partnership"
        lead="Partnerships are welcome from organisations whose values match the foundation's."
      >
        <blockquote className="sx-ethic">{involvePage.ethics}</blockquote>
      </GiSection>
    </SiteShell>
  );
}

function GiSection({
  id,
  no,
  title,
  lead,
  alt,
  children,
}: {
  id: string;
  no: string;
  title: string;
  lead: string;
  alt?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={alt ? "sx-section sx-alt" : "sx-section"}
      id={id}
      aria-labelledby={`gi-${id}`}
    >
      <div className="sx-wrap sx-gi-row">
        <p className="sx-row-no" aria-hidden="true">
          {no}
        </p>
        <div>
          <h2 id={`gi-${id}`} className="sx-h2">
            {title}
          </h2>
          <p className="sx-lead">{lead}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
