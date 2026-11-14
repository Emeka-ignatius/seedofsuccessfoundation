import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { getEnv } from "@/lib/security/env";

// One client per server instance. In dev, Next.js hot reload re-evaluates modules, so cache on globalThis
// to avoid opening a new connection pool on every edit.
//
// Runtime connection: use Neon's POOLED URL on Vercel (host contains "-pooler"). Migrations use the direct URL
// via prisma.config.ts. The same variable serves both for now; split into DATABASE_URL / DIRECT_URL if needed.
const globalForDb = globalThis as unknown as { db?: PrismaClient };

function create(): PrismaClient {
  const url = getEnv().DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return new PrismaClient({ adapter: new PrismaPg({ connectionString: url }) });
}

export const db: PrismaClient = globalForDb.db ?? (globalForDb.db = create());
