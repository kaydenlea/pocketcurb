import process from "node:process";
import { runCommand } from "./common.mjs";

try {
  runCommand(process.execPath, ["./scripts/check-ai-review-readiness.mjs"]);
  console.log("Codex review itself is expected at pull-request stage.");
  console.log("Use this command as a local preflight before opening a PR.");
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
