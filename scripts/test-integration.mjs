import { ensureDependenciesInstalled, listFiles, runCheck, runPnpm } from "./common.mjs";

runCheck("jest-integration", () => {
  ensureDependenciesInstalled();
  const tests = listFiles(".", (file) => /\.integration\.test\.(ts|tsx)$/.test(file));
  if (tests.length === 0) {
    return;
  }

  runPnpm(["exec", "jest", "--config", "jest.config.cjs", "--runInBand", "--runTestsByPath", ...tests]);
});
