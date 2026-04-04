# API Boundaries

## Contract Shape

Treat every external boundary as a contract:

- app to Supabase database under RLS
- app to Supabase Edge Functions
- web waitlist or lead capture to backend endpoint
- analytics events leaving the client

## Direct Client Access

Direct client to Supabase access is acceptable only for safe user-scoped reads and writes protected by strict RLS and validated schemas.

## Edge Function Boundary

Use Edge Functions for:

- privileged or secret-backed operations
- server-authoritative calculations or mutations
- third-party integrations
- rate-limited actions
- password-reset recovery follow-up handling or other recovery-sensitive flows that need server-side policy checks
- security-sensitive exports or deletion flows
- household invitation flows if they require server-controlled policy checks

## Error Handling

Return user-safe errors. Do not leak internal policy details, secrets, or raw database errors to clients.
