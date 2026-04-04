import { ensureDependenciesInstalled, listFiles, runCheck, runPnpm } from "./common.mjs";

runCheck("jest-e2e-smoke", () => {
  ensureDependenciesInstalled();
  const tests = listFiles(".", (file) => /\.e2e\.test\.(ts|tsx)$/.test(file));
  if (tests.length === 0) {
    return;
  }

  runPnpm(["exec", "jest", "--config", "jest.config.cjs", "--runInBand", "--runTestsByPath", ...tests]);
});
