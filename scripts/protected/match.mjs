// Shared by the Claude Code hook, the commit-msg / CI check and the CODEOWNERS generator.
// Plain ESM with no dependencies, so it runs before `pnpm install` and on Windows.
import { readFileSync } from "node:fs";
import { dirname, resolve, relative, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(here, "..", "..");
export const REGISTRY_PATH = resolve(ROOT, ".claude", "protected-paths.json");

export function loadRegistry() {
  const registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf8"));
  if (!Array.isArray(registry.areas)) {
    throw new Error("protected-paths.json has no `areas` array");
  }
  return registry;
}

/** Normalise any path (absolute or relative, either slash) to a repo-relative POSIX path. */
export function toRepoPath(p, root = ROOT) {
  let out = String(p)
    .trim()
    .replace(/^["']|["']$/g, "");
  if (isAbsolute(out) || /^[A-Za-z]:[\\/]/.test(out)) {
    out = relative(root, resolve(out));
  }
  out = out.replace(/\\/g, "/").replace(/^\.\//, "");
  return out;
}

/** Glob → RegExp. Supports `**` (any depth), `*` (within a segment), literal everything else. */
export function globToRegExp(glob) {
  let re = "";
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === "*") {
      if (glob[i + 1] === "*") {
        re += ".*";
        i++;
        if (glob[i + 1] === "/") i++;
      } else {
        re += "[^/]*";
      }
    } else {
      re += c.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
    }
  }
  return new RegExp(`^${re}$`, "i");
}

/** Returns the registry areas whose globs match the given repo-relative path. */
export function matchAreas(repoPath, registry = loadRegistry()) {
  const path = toRepoPath(repoPath);
  return registry.areas.filter((area) => area.globs.some((g) => globToRegExp(g).test(path)));
}
