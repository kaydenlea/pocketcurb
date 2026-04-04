# Supabase Rule

Use the Supabase-first v1 model defined in the architecture and security docs.

## Required Reads

- `docs/architecture/shared/supabase-boundaries.md`
- `docs/architecture/shared/api-boundaries.md`
- `docs/security/auth-and-authorization.md`
- `docs/security/security-model.md`

## Guardrails

- direct client access only for safe user-scoped operations under strict RLS
- privileged or secret-backed operations belong in Edge Functions
- service-role credentials never belong in clients
- migrations require rollback awareness and review

