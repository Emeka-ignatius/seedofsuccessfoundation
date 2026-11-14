import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";
import { decideGate } from "@/lib/security/gate";

// What a visitor may reach while SITE_MODE is not exactly "live". Changing this list is a deliberate, reviewed act.
const PUBLIC_IN_HOLDING = [
  "/",
  "/favicon.ico",
  "/opengraph-image",
  "/privacy",
  "/robots.txt",
].sort();

const ROOT = process.cwd();
const APP = join(ROOT, "app");

/** Derives every URL the app can serve from the filesystem, so a new route cannot be forgotten by this test. */
function discoverRoutes(): string[] {
  const routes = new Set<string>();
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) {
        walk(full);
        continue;
      }
      const rel = relative(APP, dir).split(sep).filter(Boolean);
      // Route groups `(x)` do not appear in URLs. Dynamic segments become a concrete sample value.
      const segments = rel
        .filter((s) => !/^\(.*\)$/.test(s))
        .filter((s) => !s.startsWith("_"))
        .map((s) => (/^\[.*\]$/.test(s) ? "sample" : s));
      const base = "/" + segments.join("/");
      const stem = name.replace(/\.[^.]+$/, "");
      const join_ = (leaf: string) => (base === "/" ? `/${leaf}` : `${base}/${leaf}`);

      if (/^page\.(t|j)sx?$/.test(name)) routes.add(base);
      else if (/^route\.(t|j)s$/.test(name)) routes.add(base);
      else if (stem === "robots") routes.add(join_("robots.txt"));
      else if (stem === "sitemap") routes.add(join_("sitemap.xml"));
      else if (stem === "opengraph-image" || stem === "twitter-image") routes.add(join_(stem));
      else if (name === "favicon.ico") routes.add(join_("favicon.ico"));
    }
  };
  walk(APP);
  return [...routes];
}

describe("holding gate: what is reachable", () => {
  const routes = discoverRoutes();

  it("discovers the app's routes (guards against a broken walker passing vacuously)", () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
    expect(routes).toContain("/");
  });

  it("allows exactly the intended routes in holding mode, and blocks every other route in the app", () => {
    const reachable = routes.filter((r) => decideGate("holding", "GET", r) === "allow").sort();
    expect(reachable).toEqual(PUBLIC_IN_HOLDING.filter((p) => routes.includes(p)));
    for (const r of routes) {
      if (!PUBLIC_IN_HOLDING.includes(r)) {
        expect(decideGate("holding", "GET", r), r).not.toBe("allow");
      }
    }
  });

  it("allows everything in live mode", () => {
    for (const r of routes) expect(decideGate("live", "GET", r), r).toBe("allow");
  });
});

describe("holding gate: hostile and awkward requests", () => {
  const blocked = [
    "/admin",
    "/admin/",
    "/admin/login",
    "/admin/donations",
    "/donate",
    "/donate/thank-you",
    "/api",
    "/api/webhooks/stripe",
    "/api/anything",
    "/about",
    "/our-work/st-perpetua-hospital",
    "/get-involved",
    "/contact",
    "/terms",
    "/_next/data/build/index.json",
    "/images/day_1/camera/KAY_5463.JPG", // the client's raw originals must never be served
    "/images",
    "/media", // prefix alone is not a file
    "/media/",
    "/PRIVACY",
    "/privacy/",
    "/privacy/extra",
    "//admin",
    "/media/../admin",
    "/media/../../etc/passwd",
    "/%61dmin", // percent-encoded 'a'
    "/privacy%2f..%2fadmin",
    "/media/%2e%2e/admin",
    "/admin;/privacy",
    "/\\admin",
    "/privacy\u0000",
    "/privacy?x=/admin", // a query string is not part of pathname, but a literal "?" in one is still blocked
    "",
    "admin",
  ];

  it.each(blocked)("blocks %j for a page request", (path) => {
    expect(decideGate("holding", "GET", path)).not.toBe("allow");
  });

  it.each(blocked)("blocks %j for a POST", (path) => {
    expect(decideGate("holding", "POST", path)).toBe("not-found");
  });

  it("sends people following links to the holding page, and non-page requests to 404", () => {
    expect(decideGate("holding", "GET", "/donate")).toBe("redirect-home");
    expect(decideGate("holding", "HEAD", "/donate")).toBe("redirect-home");
    expect(decideGate("holding", "POST", "/api/webhooks/stripe")).toBe("not-found");
    expect(decideGate("holding", "PUT", "/admin")).toBe("not-found");
    expect(decideGate("holding", "DELETE", "/admin")).toBe("not-found");
    expect(decideGate("holding", "get", "/donate")).toBe("redirect-home");
  });

  it("allows the holding page to receive its own form post", () => {
    expect(decideGate("holding", "POST", "/")).toBe("allow");
  });

  it("serves deliberately shipped media only", () => {
    expect(decideGate("holding", "GET", "/media/holding-bg.jpg")).toBe("allow");
  });
});
