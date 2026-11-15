import type { Metadata } from "next";
import { About } from "@/components/site/about";
import { reciprocity } from "@/lib/site/content";

// Reachable only when SITE_MODE is exactly "live" (previews, and production at launch). In holding mode the gate
// redirects this route to the holding page; see lib/security/gate.ts.

const title = "About us";
const description = reciprocity.lead;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title, description, url: "/about" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <About />;
}
