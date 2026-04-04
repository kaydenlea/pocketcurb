# Review Standard

Review must measure the change against the product intent, architecture, security model, and current spec. Diff-only review is insufficient.

Human judgment remains mandatory for cold-start architecture, scale risks, subtle race conditions, performance cliffs, and release-risk tradeoffs that agents can miss.

## Required Review Layers

- author self-review against the active spec
- independent AI review or cross-model review where useful, including CodeRabbit on pull requests where configured
- human review before merge or release
- local deterministic review gates before push where configured

## Review Focus

Reviewers must check:

- correctness and user impact
- architecture and product-lane alignment
- security boundaries and authorization logic
- rollback safety and operational readiness
- documentation alignment and ADR impact
- test adequacy and missing verification

## Handling Disagreement

Disagreement between reviewers is valuable. Resolve it before merging by reconciling the spec, design intent, and verification evidence.

## If CodeRabbit Is Unavailable

Use the local gates, local AI review when available, and human review. CodeRabbit is additive; its absence must not create a no-review workflow.

## Review Output

Capture:

- material findings
- unresolved risks
- required follow-up before release
- changes made in response to review
