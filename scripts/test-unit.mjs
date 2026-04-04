import { ensureDependenciesInstalled, listFiles, runCheck, runPnpm } from "./common.mjs";

runCheck("jest-unit", () => {
  ensureDependenciesInstalled();
  const tests = listFiles(".", (file) => /\.unit\.test\.(ts|tsx)$/.test(file));
  if (tests.length === 0) {
    return;
  }

  runPnpm(["exec", "jest", "--config", "jest.config.cjs", "--runInBand", "--runTestsByPath", ...tests]);
});
