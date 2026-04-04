import { spawnSync } from "node:child_process";
import { repoRoot } from "./common.mjs";

console.log("Running PocketCurb pre-commit verification...");
const result = spawnSync(process.execPath, ["./scripts/verify.mjs"], {
  cwd: repoRoot,
  stdio: "inherit"
});

process.exit(result.status ?? 1);
