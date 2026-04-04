# Security-Sensitive Rule

If work touches auth, authorization, RLS, secrets, secure storage, privacy toggles, shared visibility, reimbursements, exports, deletion, billing, or analytics disclosures, treat it as security-sensitive.

Especially sensitive paths include:

- `apps/mobile/src/lib/storage/**`
- `apps/mobile/src/lib/supabase/**`
- `apps/mobile/src/lib/api/**`
- `supabase/**`
- `docs/security/**`
- `docs/runbooks/release-gates.md`
- `docs/runbooks/security-release-checklist.md`
- `.github/workflows/**`

## Required Actions

- apply Gate B from `docs/runbooks/release-gates.md`
- complete `docs/runbooks/security-release-checklist.md` when Gate B, Gate C, or Gate D applies
- review `docs/security/*`
- update runbooks or disclosures when posture changes
- verify logging, alerting, and rollback readiness
