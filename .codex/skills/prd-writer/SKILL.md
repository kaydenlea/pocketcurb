---
name: prd-writer
description: Create or refine a PRD so product requirements, non-goals, trust constraints, and success metrics are explicit before implementation planning. Use when a feature or product slice needs requirements quality, not only engineering planning.
---

# PRD Writer

1. Read `AGENTS.md`, `docs/agent-workflows/01-product-doc-lifecycle.md`, `docs/agent-workflows/11-prd-vs-spec-vs-plan.md`, and `docs/templates/prd-template.md`.
2. Translate the product brief and product thesis into requirements, non-goals, UX and behavior expectations, trust constraints, and measurable success criteria.
3. Preserve the finance-product context: reimbursements, shared visibility, privacy, Safe-to-Spend trust, forward-looking cash flow, and calm non-guilt-driven UX.
4. Record release and operational constraints early when they will shape implementation.
5. Suggest `pnpm new:prd -- <mobile|web|shared> <slug>` when a reusable PRD file should be created.
6. Keep the PRD at the product-requirements layer. Do not let it collapse into file-level implementation planning.
7. Hand off to feature-spec planning only when the PRD is concrete enough that the implementation team is not guessing at scope.
