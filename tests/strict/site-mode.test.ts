import { describe, expect, it } from "vitest";
import { getSiteMode } from "@/lib/security/site-mode";

describe("SITE_MODE fails closed", () => {
  it("exposes the full site only for exactly 'live'", () => {
    expect(getSiteMode("live")).toBe("live");
  });

  it.each([
    undefined,
    "",
    "holding",
    "LIVE",
    "Live",
    " live",
    "live ",
    "true",
    "1",
    "production",
    "lve",
  ])("serves the holding page for %j", (value) => {
    expect(getSiteMode(value)).toBe("holding");
  });
});
