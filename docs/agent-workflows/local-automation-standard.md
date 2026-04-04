# Local Automation Standard

PocketCurb uses local automation to reduce the chance that weak changes are committed or pushed. The local gates are protection mechanisms, not a substitute for human judgment.

## Local Gates

- `pre-commit`: runs the repository verification suite before a commit is created
- `pre-push`: blocks direct pushes to protected branches, reruns verification, and executes the local review gate

The standard first-run path is `pnpm bootstrap:local`, which installs dependencies, installs hooks, verifies the repo, and checks local Codex CLI availability.

## Protected Branch Rule

Direct pushes to `main`, `master`, and `release/*` are blocked locally by default. Use a pull request unless an emergency override is explicitly justified.

## Local Review Gate

The local review gate includes:

- repository verification
- change classification and release-gate recommendation
- security-sensitive path detection
- lightweight policy scanning for high-risk patterns
- workflow-evidence enforcement when implementation changes land without the expected spec, plan, security-doc, or runbook evidence

The workflow-evidence layer is intentionally conservative, but `pre-push` and `review:ready` now require the expected workflow evidence before the change is treated as ready for publication. This keeps local review thorough even though Codex review itself has moved to pull-request stage.

## AI Review Boundary

Do not pretend AI review replaces the rest of the workflow. In PocketCurb, Codex review belongs at pull-request stage rather than in the local push hook. Local gates stay deterministic and fail closed on verification or workflow-evidence gaps, while PR-stage AI review adds another review layer before merge. Claude and Codex still share the same workflow and mirrored skills.

## Deliberately Manual

The automation layer does not replace:

- clarifying questions when product, architecture, privacy, or release risk would change materially
- human review before merge for substantive work
- release sign-off for sensitive or launch-grade work
- GitHub-side configuration such as CodeRabbit installation or branch-protection rules

## Emergency Overrides

- `POCKETCURB_BYPASS_LOCAL_GATES=1`: bypass local hooks entirely. Use only for emergencies.
- `POCKETCURB_ALLOW_PROTECTED_PUSH=1`: allow a direct push to a protected branch. Use only for emergencies.
