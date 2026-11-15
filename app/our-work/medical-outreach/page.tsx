import type { Metadata } from "next";
import { Outreach } from "@/components/site/outreach";

// Reachable only when SITE_MODE is exactly "live"; in holding mode the gate redirects it (lib/security/gate.ts).
const title = "Medical Outreach Programme";
const description =
  "Free consultations, blood pressure and diabetes screening, health education and more, taken out to the community.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/our-work/medical-outreach" },
  openGraph: { title, description, url: "/our-work/medical-outreach" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <Outreach />;
}
