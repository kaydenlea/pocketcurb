# Feature Lifecycle

Use this lifecycle for non-trivial product, infrastructure, or shared-package work.

## Sequence

1. Confirm product context from the relevant product docs.
2. Clarify important unknowns before planning if they materially change product behavior, architecture, privacy, or release risk.
3. Create or refine the product brief or PRD if the work is still ambiguous at the product-definition level.
4. Create or refine the feature spec.
5. Write the implementation plan.
6. Review the plan before coding when the task is complex, risky, or cross-cutting.
7. Implement in small slices.
8. Verify after each slice.
9. Re-plan if the current design is no longer correct.
10. Update docs and specs while the work is in progress.
11. Run independent review, PR AI review where configured, and human review.
12. Reconcile docs and apply the correct release gate before merge.

## What The Feature Spec Must Contain

- linked product context from the brief and PRD
- product or user problem statement
- explicit scope and non-goals
- UX and behavior expectations
- acceptance criteria
- exact files to create or modify
- interfaces and data structures
- design choices and boundaries
- edge cases and negative paths
- security and privacy implications
- future extensibility notes when the design intentionally leaves room for later work
- failure modes and rollback considerations
- verification criteria for each step

## What The Implementation Plan Must Contain

- exact files touched per slice
- interfaces and data structures touched per slice
- design choices for each slice
- edge cases and failure modes for each slice
- per-step verification criteria
- review checkpoints before coding or before risky scope changes
- failure and rollback considerations
- documentation reconciliation checkpoints

## Feature Workflow Rules

- do not start coding large non-trivial work without a spec and plan
- keep mobile and web concerns separated
- do not prematurely centralize platform-specific UI
- push privileged or rate-limited backend work behind Edge Functions
- stop and re-plan when implementation broadens file scope materially
