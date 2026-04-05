## Summary

Describe the change and the user or operational outcome.

## Planning Artifacts

- Product brief:
- PRD:
- Feature spec or bugfix spec:
- Implementation plan:

If any artifact was not required, explain why.

## Release Gate

State the gate and plain-language meaning:

- Gate A: routine feature, maintenance, or docs work without sensitive security or release posture change
- Gate B: sensitive auth, privacy, secrets, billing, deletion, RLS, or other trust-critical change
- Gate C: release, deployment, CI/release infrastructure, or production-like shipping change
- Gate D: public launch, app-store submission, legal/disclosure, or compliance-sensitive change

Example: `Gate A - routine product and tooling work`

See `docs/runbooks/release-gates.md` for the full definitions.
If this is Gate B, Gate C, or Gate D, link the completed `docs/runbooks/security-release-checklist.md` evidence.

## Verification

- [ ] lint
- [ ] typecheck
- [ ] unit
- [ ] integration
- [ ] end-to-end
- [ ] visual verification if UI changed
- [ ] security review if sensitive

## Docs and Ops

- [ ] docs reconciled
- [ ] rollback path reviewed
- [ ] monitoring or alerting impact reviewed

## Review

- [ ] human review required
- [ ] every touched file reviewed against the active spec or plan
- [ ] independent review completed using a second tool or a fresh review-only context when only one tool was available
- [ ] Codex PR review requested or completed where configured
- [ ] CodeRabbit review completed if installed
- [ ] local review artifact checked if CodeRabbit is unavailable
