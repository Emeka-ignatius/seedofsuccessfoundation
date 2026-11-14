import type { Metadata } from "next";
import { HoldingPage } from "@/components/holding/holding-page";
import { charity } from "@/lib/site/charity";

// Phase 0: `/` is the holding page. Phase 2 replaces this file with the real home page; the holding page then
// stays available behind SITE_MODE (see lib/security/gate.ts) until launch.

const title = `${charity.hospitalName} is rising in Orlu`;
const description = `${charity.need} ${charity.hospitalName} has been under construction since 29 January 2026.`;

export const metadata: Metadata = {
  title: { absolute: `${title} | ${charity.name}` },
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/" },
  twitter: { card: "summary_large_image", title, description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: charity.name,
  url: charity.siteUrl,
  description: charity.mission,
  identifier: charity.registeredCharityNumber,
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // `<` is escaped so no value can ever close the script tag (see the Next.js JSON-LD guide).
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HoldingPage />
    </>
  );
}
