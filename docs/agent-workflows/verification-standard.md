# Verification Standard

Verification is mandatory after each meaningful slice and again before declaring work done. The repository standard is proof, not confidence.

Tests are first-class. As the codebase grows, increase automated coverage until the system is test-heavy enough to preserve confidence over time.

## Baseline Verification

Every substantive change should identify which of these apply:

- lint
- typecheck
- unit tests
- integration tests
- end-to-end tests
- local pre-commit and pre-push gates
- visual verification for UI changes
- manual scenario checks for security, privacy, or release flows
- migration or rollback rehearsal for schema or release changes

## Verification Rules

- Verify against the spec, architecture, and release gate, not only against the diff.
- Compare before and after behavior for regressions when possible.
- Record what was run and what still requires follow-up.
- For bug fixes, reproduce or describe the failure mode before verifying the fix.
- For UI work, use screenshots or emulator/device verification when tooling is available.

## Sensitive Change Additions

When work touches auth, authorization, secrets, storage, billing, privacy toggles, reimbursements, data deletion, or shared household visibility, add:

- security review
- negative-path testing
- alerting and logging confirmation
- rollback readiness review
