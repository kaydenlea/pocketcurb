# Supabase Boundaries

## Supabase Role in v1

Supabase provides database, auth, storage where needed, SQL migrations, and Edge Functions. It is the backend platform, not just a database.

## Access Rules

- authenticate with Supabase Auth
- enforce row ownership and visibility through RLS
- use Edge Functions as the privileged server-side layer
- keep service-role credentials and integration secrets server-side only
- default cost-sensitive, rate-limited, export, deletion, and recovery-sensitive flows to Edge Functions even if direct database access would technically work

## Table Boundary Classes

Classify each future table before creating it:

- user-owned table with direct client access under strict RLS
- shared-household table with membership-driven RLS
- Edge-function-only table with no broad client access

The classification must be recorded in the active spec and reflected in the migration design.

## Migration Discipline

- migrations must be reviewable, reversible, and tied to specs
- security-relevant schema changes require release-gate review
- index fields that are queried often or used in RLS predicates

## Browser Note

CORS matters on browser surfaces. It is necessary for the web lane but is not a primary mobile security control.
