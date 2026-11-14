#!/usr/bin/env node
// PreToolUse guard. Any edit to a protected path forces a permission prompt (never silent, never auto-allowed).
// Registry: .claude/protected-paths.json. Rules for each area live in that area's strict CLAUDE.md.
//
// Limits, stated plainly: this guards Claude's Edit/Write tools and shell commands that look like writes.
// A sufficiently indirect shell command can still slip past. The commit-msg hook and the CI check
// (scripts/protected/check.mjs) are the backstop for anything that does.
import { readFileSync } from "node:fs";
import { matchAreas, toRepoPath, loadRegistry, ROOT } from "../../scripts/protected/match.mjs";

const FILE_TOOLS = new Set(["Edit", "Write", "MultiEdit", "NotebookEdit"]);

// Commands that change files. Deliberately broad: a false prompt is cheap, a silent edit is not.
const WRITE_HINT =
  /(?:^|[\s;&|(])(?:sed\s+-[a-z]*i|perl\s+-[a-z]*i|tee|mv|cp|rm|rmdir|del|erase|ren|move|copy|truncate|dd|install|ln|chmod|git\s+(?:checkout|restore|reset|clean|stash|apply|rm|mv|revert|cherry-pick|merge|rebase|pull)|prisma\s+(?:migrate|db\s+push|db\s+execute)|pnpm\s+(?:add|remove|update|dlx)|Out-File|Set-Content|Add-Content|Clear-Content|Remove-Item|Move-Item|Copy-Item|New-Item|Rename-Item)\b|>>?\s*\S/i;

function readStdin() {
  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

function ask(reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "ask",
        permissionDecisionReason: reason,
      },
    }),
  );
  process.exit(0);
}

function describe(areas) {
  const lines = areas.map((a) => `• ${a.name}: read ${a.rules} first`);
  return [
    "STRICT AREA. This edit needs your explicit approval.",
    ...lines,
    "Protocol: propose, show the diff, you approve, run the area's tests, add a changelog line. A commit touching this area also needs an `Approved-by:` trailer.",
  ].join("\n");
}

function candidatePathsFromBash(command) {
  if (!WRITE_HINT.test(command)) return [];
  return command
    .split(/[\s;&|()<>]+/)
    .map((w) => w.replace(/^["'`]+|["'`]+$/g, ""))
    .filter((w) => w.length > 1 && /[./\\]/.test(w));
}

try {
  const raw = readStdin();
  const input = raw ? JSON.parse(raw) : {};
  const tool = input.tool_name;
  const ti = input.tool_input ?? {};
  const registry = loadRegistry();
  const root = process.env.CLAUDE_PROJECT_DIR || ROOT;
  const hit = new Map();

  const consider = (p) => {
    if (!p) return;
    const repoPath = toRepoPath(p, root);
    if (repoPath.startsWith("..")) return; // outside the repo
    const asDir = repoPath.replace(/\/?$/, "/_");
    for (const a of [...matchAreas(repoPath, registry), ...matchAreas(asDir, registry)]) {
      hit.set(a.id, a);
    }
  };

  if (FILE_TOOLS.has(tool)) {
    consider(ti.file_path ?? ti.notebook_path);
  } else if (tool === "Bash" || tool === "PowerShell") {
    candidatePathsFromBash(String(ti.command ?? "")).forEach(consider);
  }

  if (hit.size > 0) ask(describe([...hit.values()]));
  process.exit(0); // no opinion: normal permission flow
} catch (err) {
  // Fail closed: if the guard cannot read its own registry or input, make a human look.
  ask(
    `Guard could not evaluate this edit (${err instanceof Error ? err.message : String(err)}). Treating as protected until fixed.`,
  );
}
