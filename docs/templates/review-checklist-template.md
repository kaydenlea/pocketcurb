# Review Checklist

## Context

- link the PRD, spec, or bugfix doc
- link the release gate

## Product and Architecture

- does the change align with the product thesis and lane ownership?
- is the design the simplest correct solution?
- does it introduce architecture drift or unnecessary complexity?

## Security and Privacy

- are auth, authorization, RLS, secrets, storage, and disclosure rules still correct?
- are validation, sanitization, rate limiting, safe errors, and logging adequate?

## Verification

- was the right proof set run?
- are there missing negative-path or regression checks?

## Docs and Operations

- are specs, runbooks, ADRs, and release notes reconciled?
- is rollback and monitoring readiness clear?

## Outcome

- findings
- required changes
- residual risks
