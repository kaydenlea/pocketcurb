# Data Retention and Deletion

## Retention Philosophy

Retain only what is needed for product function, legal obligations, fraud prevention, security operations, and user support.

## Baseline Rules

- define retention classes for financial records, audit logs, analytics events, waitlist data, and support artifacts
- define explicit retention windows before launch for each retained class; do not ship with only generic retention intent
- support user-requested deletion flows where legally and operationally appropriate
- preserve security-relevant audit evidence according to documented retention windows
- ensure backups and restore plans document deletion lag expectations

## Deletion Expectations

- deletion flows must be authorized and auditable
- user-facing deletion messaging must be accurate about what is removed immediately and what may remain in backups temporarily
- shared household data requires careful handling to avoid deleting records still needed by another user's lawful access scope
