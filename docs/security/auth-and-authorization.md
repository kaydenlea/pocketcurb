# Auth and Authorization

## Authentication

Use Supabase Auth for v1. Better Auth and Clerk are not default choices for v1.

## Authorization Model

- all user data access is deny-by-default
- direct data access requires strict RLS
- shared household access must be explicit and scoped
- privileged actions route through Edge Functions
- each table must be classified as user-owned, shared-household, or Edge-function-only before migration work begins

## Session and Recovery Rules

- store sensitive session material in SecureStore on mobile
- treat password reset and recovery flows as security-sensitive
- password reset links or recovery links must expire and invalidate safely
- recovery links should be single-use where the provider supports it, and session revocation or token invalidation must be part of incident assessment for recovery abuse
- expose user-safe errors without leaking policy internals

## Authorization Review Expectations

- every new table must declare whether access is user-owned, shared-household, or Edge-function-only before schema work starts
- every new table with direct client access must have RLS predicates reviewed before merge
- shared visibility, household membership, private-pot visibility, or reimbursement-access changes are Gate B changes by default
- flows that are server-authoritative, cost-sensitive, abuse-sensitive, or recovery-sensitive should move behind Edge Functions even if direct access seems possible

## MFA Planning

Support or plan MFA for sensitive flows, admin access, and any future actions that materially increase account risk.
