# Deployment Checklists

## Standard Deployment Checklist

- correct release gate identified
- spec reconciled
- verification complete
- local review artifact checked for the branch being merged when applicable
- review complete
- monitoring plan confirmed
- rollback steps written down
- secrets and environment configuration reviewed

## Sensitive Deployment Additions

- security review complete
- security release checklist completed when Gate B, Gate C, or Gate D applies
- dependency audit reviewed; critical findings block automatically and high findings are triaged explicitly
- RLS or auth changes tested
- secret rotation or new secret handling verified
- audit logging confirmed
- privacy and disclosure implications reviewed

## Post-Deployment Checks

- critical user flows work
- alerts remain quiet or expected
- analytics and logging are healthy
- post-deployment analytics are reviewed for unexpected regressions or broken instrumentation
- no unexpected permission failures
