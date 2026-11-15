import type { Metadata } from "next";
import { OurWorkPage } from "@/components/site/our-work";
import { charity } from "@/lib/site/charity";

// Reachable only when SITE_MODE is exactly "live"; in holding mode the gate redirects it (lib/security/gate.ts).
const title = "Our work";
const description = charity.mission;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/our-work" },
  openGraph: { title, description, url: "/our-work" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <OurWorkPage />;
}
