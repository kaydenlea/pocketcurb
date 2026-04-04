---
name: supabase-workflow
description: Apply the repo's Supabase-first v1 backend model. Use when work involves Supabase auth, RLS, migrations, generated types, Edge Functions, or client-to-backend boundary decisions.
---

# Supabase Workflow

1. Read `docs/architecture/shared/supabase-boundaries.md`, `docs/architecture/shared/api-boundaries.md`, `docs/security/auth-and-authorization.md`, and `docs/security/supabase-schema-security.md`.
2. Classify each future table as user-owned, shared-household, or Edge-function-only before writing the migration.
3. Decide whether the operation is safe for direct client access under strict RLS or must move through an Edge Function.
4. Keep service-role credentials and other privileged secrets server-side only.
5. Make migrations reviewable, rollback-aware, and aligned with the active spec. Use the templates in `supabase/migrations/` when helpful.
6. Index frequently queried and RLS-relevant fields when schema design requires it.
7. Run `pnpm supabase:check-security` and keep generated types and shared contracts aligned with schema changes.
