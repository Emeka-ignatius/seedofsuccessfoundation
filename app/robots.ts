import type { MetadataRoute } from "next";
import { charity } from "@/lib/site/charity";

// Previews must never be indexed (they also send `X-Robots-Tag: noindex`, see lib/security/headers.ts).
export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === "preview") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    host: charity.siteUrl,
  };
}
