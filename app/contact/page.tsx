import type { Metadata } from "next";
import { Contact } from "@/components/site/contact";

// Reachable only when SITE_MODE is exactly "live"; in holding mode the gate redirects it (lib/security/gate.ts).
const title = "Contact";
const description = "Questions about the hospital, the outreach, or how you can help.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title, description, url: "/contact" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <Contact />;
}
