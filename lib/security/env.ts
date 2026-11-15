import "server-only";
import { z } from "zod";

// Validated server environment. Secrets are read here and nowhere else.
// Add a variable to the schema, to .env.example, and to the data inventory if it unlocks personal data.
// Never prefix a secret with NEXT_PUBLIC_. That ships it to every browser.
const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  // Free text on purpose: lib/security/site-mode.ts decides what it means, and fails closed.
  SITE_MODE: z.string().optional(),
  // Required from Phase 0 onwards, once Prisma and Neon are connected.
  DATABASE_URL: z.string().url().optional(),
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
