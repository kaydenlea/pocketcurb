import {
  listFiles,
  readFile,
  runCheck,
  assert,
  ensureDependenciesInstalled,
  runPnpm
} from "./common.mjs";

const bannedTokens = ["TODO", "TBD", "lorem ipsum"];

runCheck("no-banned-tokens", () => {
  const files = listFiles(".", (file) => {
    return file.endsWith(".md") || file.endsWith(".json") || file.endsWith(".yaml") || file.endsWith(".yml");
  });

  for (const file of files) {
    const content = readFile(file);
    for (const token of bannedTokens) {
      assert(!content.includes(token), `${file} contains banned token: ${token}`);
    }
  }
});

runCheck("no-tabs-in-markdown", () => {
  const markdownFiles = listFiles(".", (file) => file.endsWith(".md"));
  for (const file of markdownFiles) {
    const content = readFile(file);
    assert(!content.includes("\t"), `${file} contains tab characters`);
  }
});

runCheck("eslint", () => {
  ensureDependenciesInstalled();
  runPnpm(["exec", "eslint", ".", "--max-warnings=0"]);
});
