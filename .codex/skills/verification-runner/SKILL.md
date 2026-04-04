---
name: verification-runner
description: Select and run the correct proof set for a change. Use when a task needs verification planning or execution across lint, typecheck, tests, visual checks, regression comparison, security checks, or release-gate evidence.
---

# Verification Runner

1. Read `AGENTS.md` and `docs/agent-workflows/verification-standard.md`.
2. Map the current slice to the required checks: lint, typecheck, unit, integration, end-to-end, visual, migration, manual scenario, and security review as applicable.
3. Verify against the spec, implementation plan, and architecture, not only the diff.
4. For regressions and bugfixes, compare before and after behavior when possible.
5. For UI work, prefer visual verification when tooling is available.
6. Record what was verified per slice and what residual risk remains.
7. Require final proof before the task is marked complete.
