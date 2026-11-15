import type { Metadata } from "next";
import { GetInvolvedPage } from "@/components/site/get-involved";

// Reachable only when SITE_MODE is exactly "live"; in holding mode the gate redirects it (lib/security/gate.ts).
const title = "Get involved";
const description =
  "Pray, give, fundraise, volunteer, sponsor or partner with the Seed of Success Foundation. Before we ask for money, we ask for your prayers.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/get-involved" },
  openGraph: { title, description, url: "/get-involved" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Page() {
  return <GetInvolvedPage />;
}
