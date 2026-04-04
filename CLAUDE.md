Import and follow [AGENTS.md](./AGENTS.md) first. It is the canonical source of truth for workflow, security, review, and documentation standards.

# Claude Overlay

Use the same workflow and responsibilities as Codex. This file only adds Claude-specific defaults:

- Default to planning mode for non-trivial work.
- Treat terse user prompts as workflow entry points. Do not interpret a short prompt as permission to skip the built-in brief, PRD, spec, plan, verification, review, and release process.
- Re-plan whenever implementation drift, unexpected constraints, or conflicting review feedback appear.
- For ordinary bugs, act autonomously after confirming the likely root cause and the verification path.
- Prefer the simplest correct solution with balanced elegance. Reject brittle cleverness and reject speculative overengineering.
- Keep spec discipline high: update the active task spec during implementation, not only at the end.
- Convert repeated stable lessons into shared rules or docs. Keep one-off task detail inside the relevant spec.
- Escalate when ambiguity affects architecture, security boundaries, irreversible data changes, release risk, or product scope.
- Preserve Claude and Codex parity. Do not invent separate Claude-only operating norms.
