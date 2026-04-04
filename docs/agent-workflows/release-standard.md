# Release Standard

Release discipline is stricter than feature completion. A merged change is not automatically release-ready.

## Release Expectations

- Every change maps to the correct release gate from `docs/runbooks/release-gates.md`.
- Sensitive changes require explicit sign-off on auth, privacy, observability, and rollback readiness.
- Deployment plans must include monitoring, rollback, and post-release validation.
- Launch-compliance work requires disclosure, policy, and app-store readiness checks.

## Required Release Inputs

- current spec reconciled with shipped behavior
- verification evidence
- review evidence
- rollback path
- monitoring and alerting expectations
- documentation updates for operators and future contributors

## Release Posture

Prefer boring releases. If the deployment cannot be explained clearly, rolled back safely, or monitored meaningfully, it is not ready.

