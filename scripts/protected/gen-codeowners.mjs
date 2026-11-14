#!/usr/bin/env node
// Generates .github/CODEOWNERS from .claude/protected-paths.json so the two cannot drift.
//   node scripts/protected/gen-codeowners.mjs          write the file
//   node scripts/protected/gen-codeowners.mjs --check  exit 1 if the committed file is stale (CI)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { loadRegistry, ROOT } from "./match.mjs";

const OUT = resolve(ROOT, ".github", "CODEOWNERS");

function pattern(glob) {
  const p = glob.endsWith("/**") ? glob.slice(0, -3) + "/" : glob;
  return "/" + p;
}

const { owners, areas } = loadRegistry();
const ownerList = owners.join(" ");

const lines = [
  "# GENERATED from .claude/protected-paths.json by scripts/protected/gen-codeowners.mjs. Do not edit by hand.",
  "# Note: 'Require review from Code Owners' is intentionally NOT enabled while there is a single owner",
  "# (GitHub does not let a PR author approve their own PR). Enable it when a second person joins.",
  "",
];
for (const area of areas) {
  lines.push(`# ${area.name}`);
  for (const g of area.globs) lines.push(`${pattern(g)} ${ownerList}`);
  lines.push("");
}
const next = lines.join("\n");

if (process.argv.includes("--check")) {
  const current = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
  if (current.replace(/\r\n/g, "\n") !== next) {
    console.error("CODEOWNERS is stale. Run: pnpm codeowners:gen");
    process.exit(1);
  }
} else {
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, next);
  console.log(`Wrote ${OUT}`);
}
