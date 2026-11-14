import type { NextConfig } from "next";
// Relative import on purpose: the `@/` alias is not available when the config itself is loaded.
import { securityHeaders } from "./lib/security/headers";

// STRICT: see lib/security/CLAUDE.md. Header policy lives in lib/security/headers.ts so it can be tested.
const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders({
          dev: process.env.NODE_ENV === "development",
          preview: process.env.VERCEL_ENV === "preview",
        }),
      },
    ];
  },
};

export default nextConfig;
