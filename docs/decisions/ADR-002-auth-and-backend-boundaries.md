# ADR-002: Auth and Backend Boundaries

## Status

Accepted.

## Context

The product needs fast delivery, strong user-scoped authorization, secure handling of secrets, and a clear server-authoritative path for sensitive logic.

## Decision

Use Supabase Auth and Supabase as the v1 backend platform. Allow direct client to Supabase access only for safe user-scoped operations under strict RLS. Route privileged, secret-backed, integration-backed, rate-limited, or server-authoritative work through Supabase Edge Functions.

## Consequences

- a separate dedicated backend is not required for v1
- service-role credentials remain server-side only
- authorization logic must be reviewed at both schema and function boundaries
- Edge Functions become the privileged policy layer
- password recovery follow-up flows, export or deletion workflows, and cost-sensitive or abuse-sensitive actions should default toward Edge Functions rather than direct client access
