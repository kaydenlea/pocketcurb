# Threat Model

## Primary Assets

- user financial records
- balances, budgets, and Safe-to-Spend outputs
- household visibility settings and private pots
- reimbursement and split information
- auth tokens and session state
- analytics identifiers and disclosure state
- privileged secrets used by Edge Functions or admin processes

## Threat Scenarios

- unauthorized cross-user data access
- broken or incomplete RLS
- leaked service-role or integration secrets
- device loss or compromise exposing sensitive local state
- replayed or duplicated write actions after unstable connectivity
- malicious or malformed input targeting Edge Functions or app flows
- over-collection or accidental disclosure through analytics
- insecure password reset or account recovery flows
- privileged export or deletion misuse

## Key Mitigations

- strict RLS plus authorization review
- Edge Function boundary for privileged actions
- secure token storage
- short-lived reset links with safe invalidation behavior
- rate limiting on sensitive endpoints
- audit logging and alerting on sensitive actions
- restore and rollback readiness
- recurring security review and periodic pentesting

## Audit-Log Baseline

Capture and review security-relevant events such as:

- password reset completion, account recovery completion, and session revocation events
- account deletion, export generation, and other high-impact privacy actions
- household membership, privacy-toggle, and shared-visibility changes
- repeated authentication failures, rate-limit spikes, and suspicious function abuse patterns
