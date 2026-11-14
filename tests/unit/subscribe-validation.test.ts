import { describe, expect, it } from "vitest";
import { parseEmail } from "@/lib/subscribers/validation";

describe("parseEmail", () => {
  it("trims and lower-cases", () => {
    expect(parseEmail("  Ada@Example.COM ")).toEqual({ ok: true, email: "ada@example.com" });
  });

  it.each(["", "   ", "not-an-email", "a@b", "@example.com", "a b@example.com", "a@@example.com"])(
    "rejects %j",
    (value) => {
      expect(parseEmail(value).ok).toBe(false);
    },
  );

  it("rejects non-strings (a tampered form post)", () => {
    expect(parseEmail(null).ok).toBe(false);
    expect(parseEmail(undefined).ok).toBe(false);
    expect(parseEmail(42).ok).toBe(false);
    expect(parseEmail({ email: "a@example.com" }).ok).toBe(false);
  });

  it("rejects anything over 254 characters", () => {
    const long = `${"a".repeat(250)}@example.com`;
    expect(parseEmail(long).ok).toBe(false);
  });
});
