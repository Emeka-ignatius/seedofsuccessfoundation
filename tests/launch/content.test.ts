import { describe, expect, it } from "vitest";
import { need, testimonials } from "@/lib/site/content";

// Launch gate, not a unit test: `pnpm launch:check`. Fails while the public pages still show an "awaiting from the
// charity" marker (components/site/pending.tsx). Skipped in normal runs so development is never blocked by content
// that has not arrived yet. Each failure names the PRD §16 item it is waiting for.
describe.skipIf(process.env.LAUNCH_CHECK !== "1")(
  "content the charity must supply before the full site launches",
  () => {
    it("has a testimonial from Orlu and one from an English parish (Voices, PRD §4.1)", () => {
      expect(
        testimonials.filter((t) => t.place === "Orlu").length,
        "Orlu testimonial",
      ).toBeGreaterThan(0);
      expect(
        testimonials.filter((t) => t.place === "England").length,
        "English parish testimonial",
      ).toBeGreaterThan(0);
    });

    it("has citable sources for the health statements (The need, PRD §16)", () => {
      expect(need.sources, "lib/site/content.ts need.sources").toBeTruthy();
    });
  },
);
