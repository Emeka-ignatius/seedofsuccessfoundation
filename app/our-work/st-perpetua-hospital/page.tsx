import type { Metadata } from "next";
import { Hospital } from "@/components/site/hospital";
import { charity } from "@/lib/site/charity";

// Reachable only when SITE_MODE is exactly "live"; in holding mode the gate redirects it (lib/security/gate.ts).
const title = charity.hospitalName;
const description = `${charity.need} ${charity.hospitalName} has been under construction since 29 January 2026.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/our-work/st-perpetua-hospital" },
  openGraph: { title, description, url: "/our-work/st-perpetua-hospital" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <Hospital />;
}
