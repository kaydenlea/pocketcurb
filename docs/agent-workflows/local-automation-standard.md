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
- workflow-evidence signaling when implementation changes without a task spec update
- Codex CLI review by default during `pre-push`

The workflow-evidence layer is intentionally conservative. It prefers warnings over brittle hard failures when implementation changes land without the expected spec, plan, security-doc, or runbook updates. This is deliberate: trivial work still exists, and the automation should steer contributors back toward the documented workflow without turning normal development into noise.

## AI Review Boundary

Do not pretend local AI review is always available. Codex review depends on a working local `codex` CLI, authentication, and network access. In the automatic hook path, strict AI review is on by default and pushes fail closed if Codex review does not complete successfully. Claude and Codex still share the same workflow and mirrored skills, but the current local push-time AI review adapter is Codex-specific. Use the explicit emergency override only when that behavior must be bypassed deliberately.

## Deliberately Manual

The automation layer does not replace:

- clarifying questions when product, architecture, privacy, or release risk would change materially
- human review before merge for substantive work
- release sign-off for sensitive or launch-grade work
- GitHub-side configuration such as CodeRabbit installation or branch-protection rules

## Emergency Overrides

- `POCKETCURB_BYPASS_LOCAL_GATES=1`: bypass local hooks entirely. Use only for emergencies.
- `POCKETCURB_ALLOW_PROTECTED_PUSH=1`: allow a direct push to a protected branch. Use only for emergencies.
- `POCKETCURB_DISABLE_AI_REVIEW=1`: disable the default Codex review requirement. Use only for emergencies.
