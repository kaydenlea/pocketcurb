import process from "node:process";
import { runCommand } from "./common.mjs";

try {
  runCommand(process.execPath, ["./scripts/check-docs.mjs"]);
  console.log("Docs contract passed.");
  console.log("Manual reconciliation reminder:");
  console.log("- confirm the active brief, PRD, spec, or bugfix doc matches reality");
  console.log("- confirm ADRs, runbooks, and product docs were updated when the change altered stable knowledge");
  console.log("- confirm review notes and release-gate evidence are captured");
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
