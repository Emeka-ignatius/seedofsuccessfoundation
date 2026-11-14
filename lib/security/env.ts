import "server-only";
import { z } from "zod";

// Validated server environment. Secrets are read here and nowhere else.
// Add a variable to the schema, to .env.example, and to the data inventory if it unlocks personal data.
// Never prefix a secret with NEXT_PUBLIC_. That ships it to every browser.
const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  // Free text on purpose: lib/security/site-mode.ts decides what it means, and fails closed.
  SITE_MODE: z.string().optional(),
  // Neon Postgres. Migrations use the direct URL; Vercel runtime should use the pooled one.
  DATABASE_URL: z.url().optional(),
  // Keys the HMAC that turns a client address into a rate-limit key, so no raw IP is stored. 32+ chars, random.
  RATE_LIMIT_SECRET: z.string().min(32).optional(),
  // Cloudflare Turnstile. The site key is public by design (it is embedded in the page); the secret key is not.
  // Features that need these fail CLOSED when they are absent: sign-up is disabled, never un-protected.
  TURNSTILE_SITE_KEY: z.string().min(1).optional(),
  TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
});

export type ServerEnv = z.infer<typeof schema>;

let cached: ServerEnv | undefined;

/** Parses once, on first use (not at import, so `next build` does not need production secrets). */
export function getEnv(source: NodeJS.ProcessEnv = process.env): ServerEnv {
  if (source === process.env && cached) return cached;
  const result = schema.safeParse(source);
  if (!result.success) {
    // Report variable names only, never values.
    const names = result.error.issues.map((i) => i.path.join(".")).join(", ");
    throw new Error(`Invalid environment configuration: ${names}`);
  }
  if (source === process.env) cached = result.data;
  return result.data;
}
