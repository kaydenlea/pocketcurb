import process from "node:process";
import { commandExists, runCommand, runPnpm } from "./common.mjs";

function runStep(label, command, args) {
  console.log(`\n==> ${label}`);
  runCommand(command, args);
}

try {
  runStep("Install local git hooks", process.execPath, ["./scripts/install-hooks.mjs"]);
  console.log("\n==> Install workspace dependencies");
  runPnpm(["install", "--ignore-scripts", "--config.confirmModulesPurge=false", "--reporter", "append-only"]);
  runStep("Verify repository contract", process.execPath, ["./scripts/verify.mjs"]);

  if (!commandExists("codex")) {
    console.warn("\nWarning: Codex CLI was not found on this machine.");
    console.warn("The repository is still set up and ready for local coding, but the default pre-push AI review gate will fail until Codex CLI is installed or intentionally bypassed.");
  } else {
    try {
      runStep("Check Codex availability", "codex", ["--version"]);
      runStep("Check Codex login status", "codex", ["login", "status"]);
    } catch {
      console.warn("\nWarning: Codex CLI is installed but not fully ready.");
      console.warn("The repository is still set up and ready for local coding, but the default pre-push AI review gate will fail until Codex CLI authentication is fixed or intentionally bypassed.");
    }
  }

  console.log("\nPocketCurb local bootstrap completed successfully.");
  console.log("Local commits and pushes will now use the repo hooks.");
} catch (error) {
  console.error(`\nBootstrap failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
