#!/usr/bin/env node
// Cross-platform "set env vars then run a command": `node scripts/run-with-env.mjs KEY=VALUE [KEY=VALUE] -- cmd args`.
// Exists because `KEY=1 cmd` is a syntax error in PowerShell and cmd.exe.
import { spawn } from "node:child_process";

const argv = process.argv.slice(2);
const split = argv.indexOf("--");
const pairs = split === -1 ? [] : argv.slice(0, split);
const command = split === -1 ? argv : argv.slice(split + 1);

const env = { ...process.env };
for (const pair of pairs) {
  const i = pair.indexOf("=");
  if (i < 1) {
    console.error(`Bad env assignment: ${pair}`);
    process.exit(2);
  }
  env[pair.slice(0, i)] = pair.slice(i + 1);
}

if (command.length === 0) {
  console.error("usage: run-with-env.mjs KEY=VALUE -- command args");
  process.exit(2);
}

const child = spawn(command[0], command.slice(1), { stdio: "inherit", env, shell: true });
child.on("exit", (code) => process.exit(code ?? 1));
