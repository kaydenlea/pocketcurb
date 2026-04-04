# ADR-007: Security-First Release Gates

## Status

Accepted.

## Context

The product handles sensitive personal finance information, shared visibility controls, and trust-critical guidance. A loose release process would create avoidable risk.

## Decision

Adopt four release gates:

- Gate A for standard feature work
- Gate B for sensitive changes
- Gate C for release and deployment readiness
- Gate D for launch and compliance readiness

Treat security review, rollback planning, monitoring readiness, and human review as release-blocking where applicable.

## Consequences

- release decisions become explicit and auditable
- sensitive changes receive proportionate scrutiny
- operational readiness is checked before launch rather than after failure
- security-sensitive releases require checklist evidence, not only narrative approval
