# Security Standard

Security is a release-blocking concern from day one. Product speed does not justify weak boundaries.

## Default Rules

- deny by default for data access
- validate all input paths
- sanitize untrusted input before it reaches privileged boundaries
- minimize stored data
- separate user-scoped access from privileged operations
- log sensitive actions
- keep secrets out of clients and out of source control
- design for alerting, rollback, and incident response
- rate limit sensitive endpoints and recovery flows
- return user-safe errors that do not leak policy details or internal state

## Supabase Boundary Rules

- Use direct client to Supabase access only for safe user-scoped reads and writes under strict RLS.
- Use Edge Functions for privileged mutations, integration calls, secret-backed operations, rate-limited actions, and server-authoritative decisions.
- Treat service-role secrets as server-only.
- Review indexes on RLS-relevant and frequently queried fields as part of schema design.

## Mobile-Specific Rules

- Store sensitive values in SecureStore.
- Treat device compromise, lost devices, rooted or jailbroken environments, and token theft as expected threat scenarios.
- Plan for device integrity controls such as App Attest and Play Integrity on sensitive flows.

## Review Triggers

Require explicit security review when work touches auth, RLS, personal pots, privacy toggles, reimbursements, household visibility, exports, billing, or deletion.
