# Rollback Strategy

## Principle

Every risky change needs a rollback story before release. Shipping without a rollback path is an avoidable operational failure.

## Rollback Types

- client rollback through app release controls or phased rollout response
- Edge Function rollback through version re-deploy or feature-flag reversal
- schema rollback through reversible migrations or compensating migrations
- configuration rollback through secret, environment, or feature-flag reset

## Requirements

- identify what state changes are reversible
- identify what data changes require forward-fix rather than rollback
- confirm monitoring exists to detect whether rollback is needed
- document the operator actions required

