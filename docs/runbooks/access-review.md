# Access Review

## Objective

Ensure that production, Supabase, analytics, error monitoring, repository, and deployment access match current operational need.

## Review Cadence

- before launch
- after major staffing or ownership changes
- after significant incidents
- at a regular periodic cadence suitable for the product stage

## Review Scope

- repository admin and branch protection permissions
- Supabase project access
- secret-store access
- analytics and monitoring access
- release and store account access

## Actions

- remove stale access
- reduce broad permissions where possible
- confirm MFA on sensitive accounts
- minimize service-role, deployment-secret, and secret-store access to the smallest practical owner set
- record review date, reviewer, and material changes
