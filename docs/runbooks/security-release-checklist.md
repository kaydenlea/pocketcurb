# Security Release Checklist

Use this checklist for any Gate B, Gate C, or Gate D change.

## Boundary Review

- confirm whether the change touches auth, authorization, RLS, secrets, secure storage, shared visibility, exports, deletion, billing, monitoring, or disclosures
- confirm each affected table or endpoint still has the correct boundary class: user-owned, shared-household, or Edge-function-only
- confirm privileged or server-authoritative work is not exposed directly to clients

## Auth and Recovery Review

- confirm user-scoped access remains deny-by-default
- confirm password reset and account recovery behavior remains expiring, safe, and user-safe in error handling
- confirm session revocation or token invalidation impact is understood for the change

## Storage and Privacy Review

- confirm sensitive client values remain in SecureStore and non-sensitive cache remains in MMKV
- confirm new analytics, monitoring, or SDK data flows are reflected in disclosure planning
- confirm retention, deletion, and audit-log implications are documented when affected

## Abuse and Cost Control Review

- confirm validation exists at each trust boundary
- confirm rate limiting or quota controls exist for abuse-prone or cost-sensitive flows
- confirm alerting covers the failure or abuse modes introduced by the change

## Release Evidence

- attach verification results
- attach human review notes
- attach rollback notes
- attach audit triage if dependency findings remain open
- record any open decision that is intentionally deferred and what would trigger re-evaluation
