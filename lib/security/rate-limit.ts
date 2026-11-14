import "server-only";
import { createHmac } from "node:crypto";
import { db } from "@/lib/db";
import { getEnv } from "./env";

// Postgres-backed fixed-window rate limiter (plan D5). Keys are HMAC(secret, "action:ip"), so the table never
// holds a raw IP address. The upsert is a single atomic statement, so concurrent requests cannot both slip
// under the limit.

export interface RateLimitInput {
  /** What is being protected, e.g. "subscribe". Different actions never share a bucket. */
  action: string;
  /** Client address, or any stable identifier. Hashed before it touches the database. */
  subject: string;
  /** Maximum attempts allowed in the window. */
  limit: number;
  windowSeconds: number;
}

export interface RateLimitResult {
  ok: boolean;
  /** Attempts used in the current window, including this one. */
  count: number;
  retryAfterSeconds: number;
}

/** Exported for tests. Throws if the secret is missing: the limiter must never silently run un-keyed. */
export function rateLimitKey(secret: string, action: string, subject: string): string {
  return createHmac("sha256", secret).update(`${action}:${subject}`).digest("hex");
}

/** Best-effort client address from the proxy chain. Vercel sets x-forwarded-for; the first entry is the client. */
export function clientAddress(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip")?.trim() || "unknown";
}

export async function checkRateLimit(input: RateLimitInput): Promise<RateLimitResult> {
  const secret = getEnv().RATE_LIMIT_SECRET;
  if (!secret) throw new Error("RATE_LIMIT_SECRET is not set");

  const key = rateLimitKey(secret, input.action, input.subject);
  const now = new Date();
  const cutoff = new Date(now.getTime() - input.windowSeconds * 1000);

  const rows = await db.$queryRaw<{ count: number; windowStart: Date }[]>`
    INSERT INTO "rate_limit_buckets" ("key", "count", "windowStart")
    VALUES (${key}, 1, ${now})
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE WHEN "rate_limit_buckets"."windowStart" <= ${cutoff}
                     THEN 1 ELSE "rate_limit_buckets"."count" + 1 END,
      "windowStart" = CASE WHEN "rate_limit_buckets"."windowStart" <= ${cutoff}
                           THEN ${now} ELSE "rate_limit_buckets"."windowStart" END
    RETURNING "count", "windowStart"`;

  const { count, windowStart } = rows[0];
  const windowEnds = windowStart.getTime() + input.windowSeconds * 1000;
  const retryAfterSeconds = Math.max(0, Math.ceil((windowEnds - now.getTime()) / 1000));

  // Housekeeping: rows are disposable once their window has passed. Occasional purge keeps the table tiny.
  if (Math.random() < 0.02) {
    const stale = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    void db.rateLimitBucket.deleteMany({ where: { windowStart: { lt: stale } } }).catch(() => {});
  }

  return { ok: Number(count) <= input.limit, count: Number(count), retryAfterSeconds };
}
