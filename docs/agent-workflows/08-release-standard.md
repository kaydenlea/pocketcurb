# Release Standard

Every change must reach the correct release gate before merge or deployment.

## Required Release Inputs

- reconciled spec or explicit fast-path rationale
- verification evidence
- review evidence
- rollback readiness
- monitoring and alerting readiness
- updated docs and runbooks

## Release Rules

- Gate A is for standard feature work
- Gate B is for sensitive changes
- Gate C is for releases and deployments
- Gate D is for launch and compliance posture

Use `docs/runbooks/release-gates.md`, `docs/runbooks/deployment-checklists.md`, and `docs/runbooks/security-release-checklist.md` together. A release is not ready if it cannot be explained clearly, monitored meaningfully, and rolled back safely.
