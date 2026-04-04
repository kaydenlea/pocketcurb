import { ensureDependenciesInstalled, runCheck, runPnpm } from "./common.mjs";

runCheck("web-lint", () => {
  ensureDependenciesInstalled();
  runPnpm(["exec", "eslint", "apps/web", "packages/ui-web", "--max-warnings=0"]);
});

runCheck("web-typecheck", () => {
  ensureDependenciesInstalled();
  runPnpm(["exec", "tsc", "-p", "packages/ui-web/tsconfig.json", "--noEmit"]);
  runPnpm(["exec", "tsc", "-p", "apps/web/tsconfig.json", "--noEmit"]);
});

runCheck("web-test", () => {
  ensureDependenciesInstalled();
  runPnpm([
    "exec",
    "jest",
    "--config",
    "jest.config.cjs",
    "--runInBand",
    "--runTestsByPath",
    "apps/web/src/content/site-copy.e2e.test.ts"
  ]);
});
