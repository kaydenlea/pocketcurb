import process from "node:process";
import { commandExists, spawnCommand } from "./common.mjs";

function runCheck(label, command, args, timeout = 15000) {
  const result = spawnCommand(command, args, {
    encoding: "utf8",
    timeout
  });

  const stdout = result.stdout?.trim() ?? "";
  const stderr = result.stderr?.trim() ?? "";

  if (stdout) {
    console.log(stdout);
  }

  if (stderr) {
    console.error(stderr);
  }

  if (result.error) {
    throw new Error(`${label} failed: ${result.error.message}`);
  }

  if ((result.status ?? 1) !== 0) {
    throw new Error(`${label} failed with exit code ${result.status ?? "unknown"}`);
  }
}

try {
  console.log("==> Checking Codex CLI availability");
  if (!commandExists("codex")) {
    throw new Error("Codex CLI is not installed or not on PATH.");
  }

  runCheck("codex --version", "codex", ["--version"]);

  console.log("\n==> Checking Codex authentication state");
  runCheck("codex login status", "codex", ["login", "status"]);

  console.log("\nCodex local prerequisites look healthy.");
  console.log(
    "This confirms local installation and authentication. It does not fully prove that `codex review` can reach its backend from the current network.",
  );
} catch (error) {
  console.error(`\nAI review readiness failed: ${error instanceof Error ? error.message : String(error)}`);
  console.error("Fix Codex CLI installation or authentication before relying on Codex review at pull-request stage.");
  process.exit(1);
}
