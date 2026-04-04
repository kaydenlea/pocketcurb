# Supabase Migrations

This directory holds real schema migrations plus copy-safe security templates.

## Rules

- timestamped migration files are real migrations
- files starting with `_template.` are examples and must not be applied directly
- every client-accessible table in `public` must enable RLS and define explicit policies
- ownership and shared-visibility fields must be indexed when they drive RLS or primary query paths
- privileged or server-authoritative data paths belong in Edge Functions, not in broadly readable tables

## Workflow

1. classify the new table using `docs/security/supabase-schema-security.md`
2. copy the relevant template into a timestamped migration
3. replace example identifiers with real table and policy names
4. run `pnpm supabase:check-security`
5. update the spec and docs that explain the new boundary

