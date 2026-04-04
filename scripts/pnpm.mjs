import process from "node:process";
import { runPnpm } from "./common.mjs";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("Usage: node ./scripts/pnpm.mjs <pnpm-args...>");
  process.exit(1);
}

runPnpm(args);
