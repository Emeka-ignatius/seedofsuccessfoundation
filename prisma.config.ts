import { defineConfig, env } from "prisma/config";

// Prisma 7 does not load .env itself. Load the same files Next.js does, without adding a dependency.
// Missing files are fine (CI and Vercel inject real environment variables).
for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile(file);
  } catch {
    /* file absent */
  }
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  // Migrations use the DIRECT (non-pooled) Neon URL. The app's runtime connection is configured in lib/db.
  // Only `migrate` and introspection need a URL; `generate` (CI, Vercel build) must work without one.
  // With it absent, a migrate command fails loudly instead of guessing a database.
  ...(process.env.DATABASE_URL ? { datasource: { url: env("DATABASE_URL") } } : {}),
});
