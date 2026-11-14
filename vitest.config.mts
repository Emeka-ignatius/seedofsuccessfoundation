import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@": r("./"),
      // `server-only` throws outside Next's server graph; tests run in plain Node.
      "server-only": r("./tests/stubs/server-only.ts"),
    },
  },
  test: {
    include: ["tests/**/*.test.ts", "lib/**/*.test.ts"],
    environment: "node",
  },
});
