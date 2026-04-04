import process from "node:process";
import { runCommand } from "./common.mjs";

try {
  runCommand(process.execPath, ["./scripts/verify.mjs"]);
  runCommand(process.execPath, ["./scripts/local-review.mjs"]);
  console.log("Review-ready checks completed successfully.");
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
