---
name: release-checklist
description: Evaluate release readiness, map the correct release gate, and confirm rollback, monitoring, and disclosure readiness. Use when preparing a feature, sensitive change, deployment, or launch for merge or release.
---

# Release Checklist

1. Read `docs/agent-workflows/release-standard.md` and `docs/runbooks/release-gates.md`.
2. Map the change to Gate A, B, C, or D.
3. Confirm verification, review, monitoring, rollback, and documentation readiness for the selected gate.
4. Apply the deployment, incident, and access-review runbooks when the change requires them.
5. Escalate if release readiness depends on unresolved security, disclosure, or operational gaps.
6. Do not mark work release-ready without explicit proof.
