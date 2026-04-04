import process from "node:process";
import { spawnSync } from "node:child_process";
import { repoRoot } from "./common.mjs";
import { getChangedFilesFromBase, getComparisonBase, getCurrentBranch, isProtectedBranch } from "./git-helpers.mjs";

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

console.log("Running PocketCurb local review gate...");
const reviewResult = spawnSync(process.execPath, ["./scripts/local-review.mjs", "--require-workflow-evidence"], {
  cwd: repoRoot,
  stdio: "inherit",
  env: {
    ...process.env,
    POCKETCURB_BRANCH: branch,
    POCKETCURB_BASE_REF: baseRef,
    POCKETCURB_CHANGED_FILES: changedFilesPayload,
    POCKETCURB_CODEX_REVIEW_STATUS: "deferred",
    POCKETCURB_CODEX_REVIEW_MESSAGE: "Codex review is required at pull-request stage, not during local pre-push."
  }
});

process.exit(reviewResult.status ?? 1);
