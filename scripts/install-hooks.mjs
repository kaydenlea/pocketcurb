import fs from "node:fs";
import path from "node:path";
import { repoRoot } from "./common.mjs";

function resolveGitConfigPath() {
  const gitPath = path.join(repoRoot, ".git");

  const stats = fs.statSync(gitPath);
  if (stats.isDirectory()) {
    return path.join(gitPath, "config");
  }

  const pointer = fs.readFileSync(gitPath, "utf8");
  const match = pointer.match(/gitdir:\s*(.+)/i);
  if (!match) {
    throw new Error("Unable to resolve git directory from .git pointer");
  }

  return path.resolve(repoRoot, match[1].trim(), "config");
}

function setHooksPath(configContent) {
  const normalized = configContent.replaceAll("\r\n", "\n");

  if (/\n\s*hooksPath\s*=\s*\.githooks\s*(?:\n|$)/.test(`\n${normalized}`)) {
    return normalized;
  }

  if (/\[core\]/.test(normalized)) {
    return normalized.replace(/\[core\]\n/, "[core]\n\thooksPath = .githooks\n");
  }

  return `${normalized.trim()}\n\n[core]\n\thooksPath = .githooks\n`;
}

const configPath = resolveGitConfigPath();
const existing = fs.readFileSync(configPath, "utf8");
const updated = setHooksPath(existing);

if (updated === existing.replaceAll("\r\n", "\n")) {
  console.log("Git hooks path already configured to .githooks");
} else {
  fs.writeFileSync(configPath, updated, "utf8");
  console.log("Configured git hooks path to .githooks");
}
