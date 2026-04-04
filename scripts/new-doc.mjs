import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { repoRoot, readFile } from "./common.mjs";

function usage() {
  console.error("Usage:");
  console.error("  node ./scripts/new-doc.mjs product-brief <slug>");
  console.error("  node ./scripts/new-doc.mjs prd <mobile|web|shared> <slug>");
  console.error("  node ./scripts/new-doc.mjs feature-spec <mobile|web> <slug>");
  console.error("  node ./scripts/new-doc.mjs implementation-plan <mobile|web|shared> <slug>");
  console.error("  node ./scripts/new-doc.mjs bugfix-spec <slug>");
  process.exit(1);
}

function toSlug(raw) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ensureValidSlug(raw) {
  const slug = toSlug(raw);
  if (!slug) {
    throw new Error("Slug must contain at least one letter or number.");
  }
  return slug;
}

function createFile(targetRelative, title, templatePath, extraMeta = []) {
  const targetAbsolute = path.join(repoRoot, targetRelative);

  if (fs.existsSync(targetAbsolute)) {
    throw new Error(`File already exists: ${targetRelative}`);
  }

  fs.mkdirSync(path.dirname(targetAbsolute), { recursive: true });
  const template = readFile(templatePath);
  const date = new Date().toISOString().slice(0, 10);
  const metaLines = [`Created: ${date}`, ...extraMeta].filter(Boolean);
  const preamble = `# ${title}\n\n${metaLines.join("\n")}\n\n`;
  fs.writeFileSync(targetAbsolute, `${preamble}${template}`, "utf8");
  console.log(`Created ${targetRelative}`);
}

try {
  const kind = process.argv[2];

  if (!kind) {
    usage();
  }

  if (kind === "product-brief") {
    const slug = ensureValidSlug(process.argv[3] ?? "");
    createFile(
      `docs/product/shared/briefs/${slug}.md`,
      slug,
      "docs/templates/product-brief-template.md",
      ["Document Type: Product Brief", "Status: Draft", "Lane: shared"],
    );
    process.exit(0);
  }

  if (kind === "prd") {
    const lane = process.argv[3];
    const slug = ensureValidSlug(process.argv[4] ?? "");

    if (!lane || !["mobile", "web", "shared"].includes(lane)) {
      usage();
    }

    createFile(
      `docs/product/${lane}/${slug}.md`,
      slug,
      "docs/templates/prd-template.md",
      ["Document Type: PRD", "Status: Draft", `Lane: ${lane}`],
    );
    process.exit(0);
  }

  if (kind === "feature-spec") {
    const lane = process.argv[3];
    const slug = ensureValidSlug(process.argv[4] ?? "");

    if (!lane || !["mobile", "web"].includes(lane)) {
      usage();
    }

    createFile(
      `docs/specs/${lane}/${slug}.md`,
      slug,
      "docs/templates/feature-spec-template.md",
      ["Document Type: Feature Spec", "Status: Draft", `Lane: ${lane}`],
    );
    process.exit(0);
  }

  if (kind === "implementation-plan") {
    const lane = process.argv[3];
    const slug = ensureValidSlug(process.argv[4] ?? "");

    if (!lane || !["mobile", "web", "shared"].includes(lane)) {
      usage();
    }

    createFile(
      `docs/specs/${lane}/plans/${slug}.md`,
      slug,
      "docs/templates/implementation-plan-template.md",
      ["Document Type: Implementation Plan", "Status: Draft", `Lane: ${lane}`],
    );
    process.exit(0);
  }

  if (kind === "bugfix-spec") {
    const slug = ensureValidSlug(process.argv[3] ?? "");
    createFile(
      `docs/specs/shared/bugfixes/${slug}.md`,
      slug,
      "docs/templates/bugfix-spec-template.md",
      ["Document Type: Bugfix Spec", "Status: Draft", "Lane: shared"],
    );
    process.exit(0);
  }

  usage();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
