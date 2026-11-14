import { describe, expect, it } from "vitest";
import { publicCsp, securityHeaders } from "@/lib/security/headers";

const prod = { dev: false, preview: false };

const directive = (csp: string, name: string) =>
  csp
    .split(";")
    .map((d) => d.trim())
    .find((d) => d.startsWith(`${name} `) || d === name);

describe("public CSP (production)", () => {
  const csp = publicCsp({ dev: false });

  it("never allows eval, or any wildcard source", () => {
    expect(csp).not.toContain("unsafe-eval");
    expect(csp).not.toMatch(/\s\*(\s|;|$)/);
    expect(csp).not.toContain("http:");
    expect(csp).not.toMatch(/\bws:|\bwss:/);
  });

  it("forbids framing, plugins and base-tag hijack, and pins form targets", () => {
    expect(directive(csp, "frame-ancestors")).toBe("frame-ancestors 'none'");
    expect(directive(csp, "object-src")).toBe("object-src 'none'");
    expect(directive(csp, "base-uri")).toBe("base-uri 'self'");
    expect(directive(csp, "form-action")).toBe("form-action 'self'");
  });

  it("upgrades insecure requests", () => {
    expect(csp).toContain("upgrade-insecure-requests");
  });

  it("allows Turnstile and only Turnstile as a third party", () => {
    expect(directive(csp, "script-src")).toContain("https://challenges.cloudflare.com");
    expect(directive(csp, "frame-src")).toBe("frame-src https://challenges.cloudflare.com");
    const origins = csp.match(/https?:\/\/[^\s;]+/g) ?? [];
    expect(new Set(origins)).toEqual(new Set(["https://challenges.cloudflare.com"]));
  });
});

describe("public CSP (development)", () => {
  it("loosens only what hot reload needs", () => {
    const csp = publicCsp({ dev: true });
    expect(directive(csp, "script-src")).toContain("'unsafe-eval'");
    expect(directive(csp, "connect-src")).toContain("ws:");
    expect(directive(csp, "frame-ancestors")).toBe("frame-ancestors 'none'");
  });
});

describe("security headers", () => {
  const map = (o: Parameters<typeof securityHeaders>[0]) =>
    Object.fromEntries(securityHeaders(o).map((h) => [h.key, h.value]));

  it("sets the baseline on every response", () => {
    const h = map(prod);
    expect(h["Strict-Transport-Security"]).toMatch(/max-age=\d{8,}/);
    expect(h["Strict-Transport-Security"]).toContain("includeSubDomains");
    expect(h["X-Content-Type-Options"]).toBe("nosniff");
    expect(h["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["X-Frame-Options"]).toBe("DENY");
    expect(h["Content-Security-Policy"]).toBeTruthy();
  });

  it("does not claim HSTS preload", () => {
    expect(map(prod)["Strict-Transport-Security"]).not.toContain("preload");
  });

  it("keeps previews out of search engines, and production indexable", () => {
    expect(map({ dev: false, preview: true })["X-Robots-Tag"]).toBe("noindex, nofollow");
    expect(map(prod)["X-Robots-Tag"]).toBeUndefined();
  });
});
