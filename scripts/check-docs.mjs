import {
  ensureContains,
  ensureHeadingsInOrder,
  fileExists,
  listFiles,
  parseJson,
  readFile,
  runCheck,
  assert
} from "./common.mjs";
import { mirroredSkills, requiredFiles, requiredHeadings } from "./repo-contract.mjs";

runCheck("required-files-present", () => {
  for (const file of requiredFiles) {
    assert(fileExists(file), `Missing required file: ${file}`);
  }
});

runCheck("markdown-files-have-content", () => {
  const markdownFiles = listFiles(".", (file) => file.endsWith(".md"));
  for (const file of markdownFiles) {
    const content = readFile(file).trim();
    assert(content.length >= 120, `${file} is too short to be a meaningful operating document`);
  }
});

for (const [file, headings] of Object.entries(requiredHeadings)) {
  runCheck(`headings:${file}`, () => {
    ensureHeadingsInOrder(file, headings);
  });
}

runCheck("claude-imports-agents", () => {
  ensureContains("CLAUDE.md", ["AGENTS.md", "canonical source of truth"]);
});

runCheck("mirrored-skill-folders-exist", () => {
  for (const skill of mirroredSkills) {
    assert(fileExists(`.claude/skills/${skill}/SKILL.md`), `Missing Claude skill: ${skill}`);
    assert(fileExists(`.codex/skills/${skill}/SKILL.md`), `Missing Codex skill: ${skill}`);
  }
});

runCheck("mirrored-skills-have-identical-content", () => {
  for (const skill of mirroredSkills) {
    const claudeSkill = readFile(`.claude/skills/${skill}/SKILL.md`);
    const codexSkill = readFile(`.codex/skills/${skill}/SKILL.md`);
    assert(claudeSkill === codexSkill, `Claude and Codex skill differ: ${skill}`);
  }
});

runCheck("skills-inventory-lists-mirrored-skills", () => {
  const inventory = readFile("docs/agent-workflows/skills-inventory.md");
  for (const skill of mirroredSkills) {
    assert(inventory.includes(skill), `skills inventory missing: ${skill}`);
  }
});

runCheck("ci-workflow-and-coderabbit-exist", () => {
  assert(fileExists(".github/workflows/ci.yml"), "Missing CI workflow");
  assert(fileExists(".coderabbit.yaml"), "Missing CodeRabbit configuration");
});

runCheck("verify-script-contract", () => {
  const pkg = parseJson("package.json");
  assert(pkg.scripts.verify.includes("node ./scripts/verify.mjs"), "verify script must call repository verifier");
});
