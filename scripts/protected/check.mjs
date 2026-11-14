#!/usr/bin/env node
// Backstop for the Claude hook. Fails when a commit touches a protected path without an `Approved-by:` trailer.
//
//   node scripts/protected/check.mjs --commit-msg <message-file>   (used by .githooks/commit-msg, checks staged files)
//   node scripts/protected/check.mjs --range <base>..<head>        (used by CI, checks every non-merge commit)
//
// The trailer is self-asserted by a human. It records that you saw the change; it is not a signature.
// Trailers naming Claude, Anthropic or a bot are rejected, so an agent cannot approve its own edit.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { loadRegistry, matchAreas, ROOT } from "./match.mjs";

const git = (...args) => execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim();

const APPROVAL = /^Approved-by:[ \t]*(.+)$/im;
const AGENT_NAME = /claude|anthropic|\bbot\b|copilot|gpt/i;

function problems(files, message, label) {
  const registry = loadRegistry();
  const touched = new Map();
  for (const f of files.filter(Boolean)) {
    for (const a of matchAreas(f, registry)) {
      touched.set(a.id, [...(touched.get(a.id) ?? []), f]);
    }
  }
  if (touched.size === 0) return [];

  const m = APPROVAL.exec(message);
  if (m && !AGENT_NAME.test(m[1])) return [];

  const why = m
    ? `Approved-by names an agent ("${m[1].trim()}"); a human must approve.`
    : "missing `Approved-by: <your name>` trailer.";
  return [...touched].map(
    ([id, fs]) =>
      `${label}: strict area "${id}" changed (${fs.slice(0, 3).join(", ")}${fs.length > 3 ? ", ..." : ""}); ${why}`,
  );
}

const [mode, arg] = process.argv.slice(2);
let errors = [];

if (mode === "--commit-msg" && arg) {
  const message = readFileSync(arg, "utf8");
  const files = git("diff", "--cached", "--name-only").split("\n");
  errors = problems(files, message, "staged changes");
} else if (mode === "--range" && arg) {
  const shas = git("rev-list", "--no-merges", arg).split("\n").filter(Boolean);
  for (const sha of shas) {
    const files = git("diff-tree", "--no-commit-id", "--name-only", "-r", "--root", sha).split(
      "\n",
    );
    const message = git("log", "-1", "--format=%B", sha);
    errors.push(...problems(files, message, `commit ${sha.slice(0, 7)}`));
  }
} else {
  console.error("usage: check.mjs --commit-msg <file> | --range <base>..<head>");
  process.exit(2);
}

if (errors.length) {
  console.error("\nProtected-path check failed:\n  " + errors.join("\n  ") + "\n");
  console.error(
    "Strict areas need a human sign-off. Add a trailer to the commit message, e.g.\n  Approved-by: Fusco\n",
  );
  process.exit(1);
}
