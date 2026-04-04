# How To Add A Feature

Use this runbook when the request is something like "add this feature", "build this screen", "support shared budgets", or "add the landing page".

## Default Flow

1. Read [AGENTS.md](../../AGENTS.md).
2. Read [docs/agent-workflows/00-operating-model.md](../agent-workflows/00-operating-model.md) and [docs/agent-workflows/02-feature-lifecycle.md](../agent-workflows/02-feature-lifecycle.md).
3. If the product framing is still fuzzy, create or refine:
   [docs/templates/product-brief-template.md](../templates/product-brief-template.md)
   and
   [docs/templates/prd-template.md](../templates/prd-template.md)
4. For non-trivial delivery work, create:
   [docs/templates/feature-spec-template.md](../templates/feature-spec-template.md)
   and
   [docs/templates/implementation-plan-template.md](../templates/implementation-plan-template.md)
5. Ask clarifying questions before planning if the answer materially changes architecture, privacy, security, release risk, or user behavior.
6. Make sure the implementation plan includes exact files, interfaces, design choices, edge cases, rollback considerations, verification steps, review checkpoints, and documentation reconciliation.
7. Review the plan when the task is large, risky, or cross-cutting.
8. Implement in small slices.
9. Run verification after each slice using [docs/agent-workflows/05-verification-loops.md](../agent-workflows/05-verification-loops.md).
10. Update the spec and any affected docs during implementation.
11. Run post-implementation review:
   [docs/agent-workflows/06-cross-model-review.md](../agent-workflows/06-cross-model-review.md),
   PR AI review where configured,
   and human review.
12. Reconcile docs with `pnpm docs:reconcile`.
13. Apply the correct release gate from [docs/runbooks/release-gates.md](./release-gates.md) and merge only after the gate is satisfied.

## Useful Commands

- `pnpm new:product-brief -- <slug>`
- `pnpm new:prd -- <mobile|web|shared> <slug>`
- `pnpm new:feature-spec -- <mobile|web> <slug>`
- `pnpm new:implementation-plan -- <mobile|web|shared> <slug>`
- `pnpm review:ready`
- `pnpm verify`
- `pnpm docs:reconcile`

## Relevant Skills

- `product-brief-writer`
- `prd-writer`
- `spec-planner`
- `implementation-slicer`
- `verification-runner`
- `docs-updater`
- `cross-model-reviewer`
- `pr-reviewer`
- `release-checklist`
