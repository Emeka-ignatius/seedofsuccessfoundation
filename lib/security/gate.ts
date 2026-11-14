import type { SiteMode } from "./site-mode";

// The holding gate (plan D2). In `holding` mode the production domain exposes ONLY what is on the allow-list
// below. Everything else is blocked. It is deny-by-default: a new route is unreachable until someone adds it here,
// and tests/strict/holding-gate.test.ts fails if a route is reachable that should not be.
//
// `live` mode is the only mode that allows everything, and SITE_MODE only resolves to `live` for the exact
// string "live" (site-mode.ts), so a misconfiguration hides the site instead of exposing it.

export type GateDecision = "allow" | "redirect-home" | "not-found";

/** Exact paths served in holding mode. The holding page is `/` (Phase 2 swaps in the real home). */
const ALLOWED_EXACT: ReadonlySet<string> = new Set([
  "/",
  "/privacy",
  "/opengraph-image",
  "/twitter-image",
  "/robots.txt",
  "/sitemap.xml",
  "/favicon.ico",
]);

/** Static assets we ship deliberately. Everything else under /public (e.g. the client's raw photo originals) stays blocked. */
const ALLOWED_PREFIXES: readonly string[] = ["/media/"];

/** Only plain URL path characters are ever considered. Anything exotic (encodings, backslashes, `..`) is blocked. */
const SAFE_PATH = /^\/[A-Za-z0-9._\-/]*$/;

function isAllowedInHolding(pathname: string): boolean {
  if (!SAFE_PATH.test(pathname)) return false;
  if (pathname.includes("//")) return false;
  if (pathname.split("/").some((segment) => segment === "..")) return false;
  if (ALLOWED_EXACT.has(pathname)) return true;
  return ALLOWED_PREFIXES.some(
    (prefix) => pathname.startsWith(prefix) && pathname.length > prefix.length,
  );
}

export function decideGate(mode: SiteMode, method: string, pathname: string): GateDecision {
  if (mode === "live") return "allow";
  if (isAllowedInHolding(pathname)) return "allow";
  // A person following a link gets the holding page; anything else (API calls, webhooks, form posts) gets a 404.
  const m = method.toUpperCase();
  return m === "GET" || m === "HEAD" ? "redirect-home" : "not-found";
}
