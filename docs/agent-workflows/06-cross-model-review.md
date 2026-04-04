# Cross-Model Review

Cross-model review is valuable when the task is complex, ambiguous, security-sensitive, or likely to drift architecturally.

## When To Use It

- large or risky feature work
- architecture or schema changes
- auth, RLS, privacy, storage, or release-risk changes
- subtle bugfixes where the root cause is not obvious
- moments where the current plan feels brittle or overcomplicated

## What To Review

- whether the plan is coherent and minimal
- whether interfaces and data boundaries are correct
- whether the release gate is correct
- whether the implementation matches the spec
- whether the verification plan is sufficient

## Handling Disagreement

Do not average the opinions mechanically. Resolve disagreement by returning to:

- product intent
- architecture and security boundaries
- verification evidence
- maintainability and rollback safety

Human review still remains mandatory after cross-model review.
