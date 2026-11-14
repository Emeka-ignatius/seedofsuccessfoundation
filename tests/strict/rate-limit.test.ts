import { afterAll, describe, expect, it } from "vitest";

// Runs against a REAL database, so it is opt-in: `pnpm test:db`. It only touches its own uniquely named keys
// and deletes them afterwards. Never point DATABASE_URL at production when running it.
for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {
    /* absent */
  }
}
const enabled = process.env.RUN_DB_TESTS === "1" && !!process.env.DATABASE_URL;

describe("rateLimitKey (pure)", () => {
  it("is deterministic, keyed, and never contains the input", async () => {
    const { rateLimitKey } = await import("@/lib/security/rate-limit");
    const a = rateLimitKey("secret-secret-secret-secret-secret-1", "subscribe", "203.0.113.7");
    expect(a).toBe(
      rateLimitKey("secret-secret-secret-secret-secret-1", "subscribe", "203.0.113.7"),
    );
    expect(a).not.toBe(
      rateLimitKey("secret-secret-secret-secret-secret-2", "subscribe", "203.0.113.7"),
    );
    expect(a).not.toBe(
      rateLimitKey("secret-secret-secret-secret-secret-1", "other", "203.0.113.7"),
    );
    expect(a).toMatch(/^[0-9a-f]{64}$/);
    expect(a).not.toContain("203");
  });

  it("reads the client address from the first x-forwarded-for entry", async () => {
    const { clientAddress } = await import("@/lib/security/rate-limit");
    expect(clientAddress(new Headers({ "x-forwarded-for": "198.51.100.4, 10.0.0.1" }))).toBe(
      "198.51.100.4",
    );
    expect(clientAddress(new Headers({ "x-real-ip": "198.51.100.9" }))).toBe("198.51.100.9");
    expect(clientAddress(new Headers())).toBe("unknown");
  });
});

describe.skipIf(!enabled)("checkRateLimit (real database)", () => {
  const run = `test-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const usedKeys: string[] = [];

  afterAll(async () => {
    const { db } = await import("@/lib/db");
    await db.rateLimitBucket.deleteMany({ where: { key: { in: usedKeys } } });
    await db.$disconnect();
  });

  async function hit(subject: string, limit: number, windowSeconds: number) {
    const { checkRateLimit, rateLimitKey } = await import("@/lib/security/rate-limit");
    const key = rateLimitKey(process.env.RATE_LIMIT_SECRET!, run, subject);
    if (!usedKeys.includes(key)) usedKeys.push(key);
    return checkRateLimit({ action: run, subject, limit, windowSeconds });
  }

  it("allows up to the limit, then blocks", async () => {
    const results = [];
    for (let i = 0; i < 5; i++) results.push((await hit("a", 3, 60)).ok);
    expect(results).toEqual([true, true, true, false, false]);
  });

  it("keeps different subjects apart", async () => {
    await hit("b1", 1, 60);
    expect((await hit("b1", 1, 60)).ok).toBe(false);
    expect((await hit("b2", 1, 60)).ok).toBe(true);
  });

  it("counts correctly under concurrency (the upsert is atomic)", async () => {
    const results = await Promise.all(Array.from({ length: 12 }, () => hit("c", 5, 60)));
    expect(results.filter((r) => r.ok)).toHaveLength(5);
    expect(results.filter((r) => !r.ok)).toHaveLength(7);
  });

  it("starts a fresh window once the old one has passed", async () => {
    expect((await hit("d", 1, 1)).ok).toBe(true);
    expect((await hit("d", 1, 1)).ok).toBe(false);
    await new Promise((r) => setTimeout(r, 1300));
    expect((await hit("d", 1, 1)).ok).toBe(true);
  });

  it("reports a sensible retry-after", async () => {
    await hit("e", 1, 30);
    const blocked = await hit("e", 1, 30);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
    expect(blocked.retryAfterSeconds).toBeLessThanOrEqual(30);
  });
});
