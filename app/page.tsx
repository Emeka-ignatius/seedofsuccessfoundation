import type { Metadata } from "next";
import { HoldingPage } from "@/components/holding/holding-page";
import { Home } from "@/components/site/home";
import { getSiteMode } from "@/lib/security/site-mode";
import { charity } from "@/lib/site/charity";

// `/` is the holding page unless SITE_MODE is exactly "live" (fail closed: see lib/security/site-mode.ts and plan D2).
// In live mode (previews, and production at launch) it is the full home page. The mode is fixed per deployment, so
// switching it needs a redeploy, and the page stays fully static either way.

const holdingTitle = `${charity.hospitalName} is rising in Orlu`;
const holdingDescription = `${charity.need} ${charity.hospitalName} has been under construction since 29 January 2026.`;

const homeTitle = "Bringing Hope Through Healthcare";
const homeDescription = `${charity.name} is building ${charity.hospitalName} in Orlu, Nigeria, with the help of the English parishes that Orlu priests have served since 2006.`;

export function generateMetadata(): Metadata {
  const live = getSiteMode() === "live";
  const title = live ? homeTitle : holdingTitle;
  const description = live ? homeDescription : holdingDescription;
  return {
    title: { absolute: `${title} | ${charity.name}` },
    description,
    alternates: { canonical: "/" },
    openGraph: { title, description, url: "/" },
    twitter: { card: "summary_large_image", title, description },
  };
}

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
      {getSiteMode() === "live" ? <Home /> : <HoldingPage />}
    </>
  );
}
