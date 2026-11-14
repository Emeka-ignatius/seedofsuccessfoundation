import { describe, expect, it } from "vitest";
import { charity } from "@/lib/site/charity";

// Launch gate, not a unit test: `pnpm launch:check`. Fails while the client still owes us legally required details.
// Skipped in normal runs so development is never blocked by content that has not arrived yet.
describe.skipIf(process.env.LAUNCH_CHECK !== "1")(
  "details the client must supply before launch",
  () => {
    it("has a contact email (privacy notice, footer, UK GDPR rights requests)", () => {
      expect(charity.contactEmail, "lib/site/charity.ts contactEmail").toBeTruthy();
    });

    it("has a registered address (legally required on charity material)", () => {
      expect(charity.registeredAddress, "lib/site/charity.ts registeredAddress").toBeTruthy();
    });

    it("has the real charity number", () => {
      expect(charity.registeredCharityNumber).toBe("1219306");
    });
  },
);
