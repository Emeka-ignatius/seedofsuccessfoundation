import { defineConfig, devices } from "@playwright/test";

// Skeleton. Browsers are installed on demand: `pnpm exec playwright install chromium`.
// Specs arrive with Phase 0 (holding gate) and Phase 3 (donation flow). The dev port is the project's own.
const PORT = Number(process.env.PORT ?? 2017);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: { baseURL: `http://localhost:${PORT}`, trace: "on-first-retry" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `pnpm build && pnpm start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
  },
});
