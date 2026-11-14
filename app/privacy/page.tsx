import type { Metadata } from "next";
import Link from "next/link";
import { charity } from "@/lib/site/charity";

// Minimal privacy notice for Phase 0, covering only what the holding page actually does. The full policy
// (donations, Gift Aid, enquiries, analytics, cookies) is a Phase 2 deliverable.
// DRAFT: wording and the retention period need the charity's approval before the holding page goes live.
// It states only things that are true of the current build. Re-check it whenever the page's behaviour changes.

export const metadata: Metadata = {
  title: "Privacy notice",
  description: `How ${charity.name} uses the email address you give us when you ask to hear about ${charity.hospitalName}.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-14 sm:py-20">
      <p className="mb-10 text-sm">
        <Link href="/" className="underline underline-offset-4 hover:no-underline">
          ← Back to {charity.name}
        </Link>
      </p>

      <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Privacy notice</h1>
      <p className="mt-4 text-lg">
        This explains what {charity.name} does with the email address you give us on this page.
      </p>

      <Section title="Who we are">
        <p>
          {charity.name} is a {charity.registration.toLowerCase()}, number{" "}
          {charity.registeredCharityNumber}. We are the controller of the information described
          here.
          {charity.registeredAddress
            ? ` Our registered address is ${charity.registeredAddress}.`
            : null}
        </p>
      </Section>

      <Section title="What we collect, and why">
        <p>
          If you ask to hear from us, we keep your <strong>email address</strong>, the wording you
          agreed to, and the date and time you agreed. We use it only to tell you about{" "}
          {charity.hospitalName}: its progress, and the launch of this website.
        </p>
        <p>
          Our legal basis is <strong>your consent</strong>. You can withdraw it at any time and we
          will remove your address.
        </p>
      </Section>

      <Section title="Protecting the form from spam">
        <p>
          The sign-up form uses Cloudflare Turnstile to check that a person is using it. This means
          your browser exchanges some technical information with Cloudflare. To stop abuse we also
          count attempts from each internet connection; we store a scrambled one-way code for this,
          never the address itself, and only as a temporary record that is cleared out regularly.
        </p>
      </Section>

      <Section title="Where it is kept, and who sees it">
        <p>
          Your address is stored in a database in London (Neon) and the site is hosted by Vercel.
          Only named people at the charity can see it. We do not sell it or share it with anyone
          else, and we do not use it for anything other than the purpose above.
        </p>
      </Section>

      <Section title="How long we keep it">
        <p>We keep your address until you ask us to remove it.</p>
      </Section>

      <Section title="Your rights">
        <p>
          You can ask to see what we hold about you, to correct it, or to have it deleted, and you
          can object to or withdraw your consent to our emailing you.
          {charity.contactEmail ? (
            <>
              {" "}
              Write to{" "}
              <a className="underline underline-offset-4" href={`mailto:${charity.contactEmail}`}>
                {charity.contactEmail}
              </a>
              .
            </>
          ) : null}{" "}
          If you are unhappy with how we have handled your information you can complain to the
          Information Commissioner&rsquo;s Office at{" "}
          <a className="underline underline-offset-4" href="https://ico.org.uk">
            ico.org.uk
          </a>
          .
        </p>
      </Section>

      <Section title="Cookies">
        <p>This page does not use analytics or advertising cookies.</p>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 space-y-3 leading-relaxed">
      <h2 className="font-serif text-2xl">{title}</h2>
      {children}
    </section>
  );
}
