---
name: security-reviewer
description: Review auth, authorization, RLS, secrets, storage, privacy, logging, deletion, rate limiting, and release risk boundaries. Use when work touches security-sensitive areas or needs a Gate B style review before merge or release.
---

# Security Reviewer

1. Read `docs/agent-workflows/security-standard.md` and the relevant files under `docs/security`.
2. Identify whether the change touches auth, RLS, secrets, secure storage, privacy toggles, reimbursements, exports, deletion, password recovery, or analytics disclosures.
3. Check least privilege, data minimization, validation, sanitization, rate limiting, audit logging, alerting, safe error handling, index coverage, and rollback readiness.
4. Confirm clients do not gain privileged secrets or unauthorized data paths.
5. Confirm device-integrity planning remains intact for sensitive mobile flows.
6. Require Gate B handling when the risk class matches the security-sensitive rule.
7. Report findings, residual risk, and required follow-up clearly.

