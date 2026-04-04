import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { repoRoot, readFile } from "./common.mjs";

const lane = process.argv[2];
const rawSlug = process.argv[3];

if (!lane || !rawSlug || !["mobile", "web"].includes(lane)) {
  console.error("Usage: node ./scripts/new-spec.mjs <mobile|web> <slug>");
  process.exit(1);
}

const slug = rawSlug
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

if (!slug) {
  console.error("Spec slug must contain at least one letter or number.");
  process.exit(1);
}

const templatePath = `docs/specs/${lane}/_template.md`;
const targetRelative = `docs/specs/${lane}/${slug}.md`;
const targetAbsolute = path.join(repoRoot, targetRelative);

if (fs.existsSync(targetAbsolute)) {
  console.error(`Spec already exists: ${targetRelative}`);
  process.exit(1);
}

const template = readFile(templatePath);
const date = new Date().toISOString().slice(0, 10);
const preamble = `# ${slug}\n\nCreated: ${date}\nLane: ${lane}\nStatus: Draft\n\n`;

fs.writeFileSync(targetAbsolute, `${preamble}${template}`, "utf8");
console.log(`Created ${targetRelative}`);

