// Security headers for PUBLIC pages (plan D1). Pages that handle money or admin access (/donate, /admin/*,
// /api/webhooks/*) get a stricter nonce-based CSP from proxy.ts in Phase 2/3; this file does not weaken that plan.
//
// Public pages keep static/cached rendering, which a per-request nonce would prevent (see the Next.js CSP guide).
// The cost is `'unsafe-inline'` for scripts, because Next.js inlines its bootstrap script. That is acceptable on
// pages that render no secrets and accept no payments; it is NOT acceptable on /donate or /admin.

export interface HeaderEntry {
  key: string;
  value: string;
}

export interface HeaderOptions {
  /** `next dev`: React Refresh needs eval and a websocket. Never true in production. */
  dev: boolean;
  /** A Vercel preview deployment: must not be indexed. */
  preview: boolean;
}

const TURNSTILE = "https://challenges.cloudflare.com";

export function publicCsp({ dev }: Pick<HeaderOptions, "dev">): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": ["'self'", "'unsafe-inline'", TURNSTILE, ...(dev ? ["'unsafe-eval'"] : [])],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:"],
    "font-src": ["'self'"],
    "connect-src": ["'self'", ...(dev ? ["ws:", "wss:"] : [])],
    "frame-src": [TURNSTILE],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
  };
  const parts = Object.entries(directives).map(([name, values]) => `${name} ${values.join(" ")}`);
  if (!dev) parts.push("upgrade-insecure-requests");
  return parts.join("; ");
}

export function securityHeaders(options: HeaderOptions): HeaderEntry[] {
  const headers: HeaderEntry[] = [
    { key: "Content-Security-Policy", value: publicCsp(options) },
    // Two years. No `preload` yet: that is a commitment that is hard to undo; decide it at launch.
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    // Legacy equivalent of frame-ancestors for old browsers.
    { key: "X-Frame-Options", value: "DENY" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  ];
  if (options.preview) {
    headers.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
  }
  return headers;
}
