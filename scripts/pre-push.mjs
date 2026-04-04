import process from "node:process";
import { spawnSync } from "node:child_process";
import { commandExists, repoRoot } from "./common.mjs";
import { getChangedFilesFromBase, getComparisonBase, getCurrentBranch, isProtectedBranch, writePocketcurbArtifact } from "./git-helpers.mjs";

if (process.env.POCKETCURB_BYPASS_LOCAL_GATES === "1") {
  console.warn("PocketCurb local gates bypassed via POCKETCURB_BYPASS_LOCAL_GATES=1");
  process.exit(0);
}

const branch = getCurrentBranch();
if (isProtectedBranch(branch) && process.env.POCKETCURB_ALLOW_PROTECTED_PUSH !== "1") {
  console.error(`Direct pushes to protected branch '${branch}' are blocked. Push a feature branch and open a PR.`);
  process.exit(1);
}

console.log("Running PocketCurb pre-push verification...");
const verifyResult = spawnSync(process.execPath, ["./scripts/verify.mjs"], {
  cwd: repoRoot,
  stdio: "inherit"
});

if ((verifyResult.status ?? 1) !== 0) {
  process.exit(verifyResult.status ?? 1);
}

const baseRef = getComparisonBase();
const changedFiles = getChangedFilesFromBase(baseRef);
const changedFilesPayload = changedFiles.join("\n");
const aiRequired = process.env.POCKETCURB_DISABLE_AI_REVIEW !== "1";

let codexReviewStatus = "skipped";
let codexReviewMessage = "Codex review disabled via POCKETCURB_DISABLE_AI_REVIEW=1";

if (aiRequired) {
  if (!commandExists("codex")) {
    console.error(
      "Codex CLI is not installed or not on PATH. Install Codex CLI or use POCKETCURB_DISABLE_AI_REVIEW=1 only when an explicit bypass is justified.",
    );
    process.exit(1);
  }

  const argsForReview = baseRef === "HEAD" ? ["review", "--commit", "HEAD"] : ["review", "--base", baseRef];
  const codexResult = spawnSync("codex", argsForReview, {
    cwd: repoRoot,
    encoding: "utf8",
    timeout: 45000
  });

  const stdout = codexResult.stdout?.trim() ?? "";
  const stderr = codexResult.stderr?.trim() ?? "";
  writePocketcurbArtifact("codex-review.txt", [stdout, stderr].filter(Boolean).join("\n\n---\n\n"));

  if (codexResult.status === 0) {
    codexReviewStatus = "passed";
    codexReviewMessage = "Codex review completed successfully";
  } else {
    codexReviewStatus = "failed";
    codexReviewMessage = stderr || stdout || "Codex review failed or timed out";
    console.error(codexReviewMessage);
    process.exit(1);
  }
}

console.log("Running PocketCurb local review gate...");
const reviewResult = spawnSync(process.execPath, ["./scripts/local-review.mjs"], {
  cwd: repoRoot,
  stdio: "inherit",
  env: {
    ...process.env,
    POCKETCURB_BRANCH: branch,
    POCKETCURB_BASE_REF: baseRef,
    POCKETCURB_CHANGED_FILES: changedFilesPayload,
    POCKETCURB_CODEX_REVIEW_STATUS: codexReviewStatus,
    POCKETCURB_CODEX_REVIEW_MESSAGE: codexReviewMessage
  }
});

process.exit(reviewResult.status ?? 1);
