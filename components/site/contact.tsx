import { charity } from "@/lib/site/charity";
import { PageHead } from "./page-head";
import { Pending } from "./pending";
import { SiteShell } from "./shell";

/**
 * Contact (PRD §4.6). The contact form needs the enquiries table (a strict-area schema change awaiting approval),
 * and the address, email, phone and social links are outstanding from the charity, so those are marked, not faked.
 */
export function Contact() {
  return (
    <SiteShell>
      <PageHead
        title={
          <>
            We would like to <em>hear</em> from you.
          </>
        }
        lead="Questions about the hospital, the outreach, or how you can help."
      />

      <section className="sx-section sx-alt" aria-label="Contact details">
        <div className="sx-wrap sx-contact-grid">
          <div>
            <h2 className="sx-h3">Write to us</h2>
            <Pending>
              the contact form, with spam protection (needs the enquiries database, which is
              awaiting approval).
            </Pending>
            <Pending>
              the response-time expectation, for example &ldquo;within three working days&rdquo;.
            </Pending>
          </div>

          <div>
            <h2 className="sx-h3">Details</h2>
            <dl className="sx-details">
              <dt>Charity</dt>
              <dd>
                {charity.name}. {charity.registration}, no.{" "}
                <span className="sx-nowrap">{charity.registeredCharityNumber}</span>.
              </dd>
              <dt>Address</dt>
              <dd>{charity.registeredAddress ?? <Pending>the registered address.</Pending>}</dd>
              <dt>Email</dt>
              <dd>
                {charity.contactEmail ? (
                  <a className="sx-link" href={`mailto:${charity.contactEmail}`}>
                    {charity.contactEmail}
                  </a>
                ) : (
                  <Pending>a contact email.</Pending>
                )}
              </dd>
              <dt>Telephone</dt>
              <dd>{charity.phone ?? <Pending>a contact telephone number.</Pending>}</dd>
              <dt>Social media</dt>
              <dd>
                <Pending>social media handles.</Pending>
              </dd>
            </dl>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
