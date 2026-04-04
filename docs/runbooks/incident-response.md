# Incident Response

## Trigger

Use this runbook for security incidents, user-data exposure, auth failures, systemic downtime, corruption, or other events that threaten trust or safety.

## Response Steps

1. identify severity and affected systems
2. contain the issue and stop further harm
3. preserve evidence and logs
4. notify the responsible owner and any required stakeholders
5. assess user impact and disclosure obligations
6. remediate the issue
7. verify recovery
8. document timeline, root cause, and follow-up actions

## Expectations

- keep user communication factual and non-speculative
- do not destroy forensic evidence during containment
- record whether backups, rollback, credential rotation, or policy changes were needed
- assess whether session revocation, password reset invalidation, secret rotation, or provider-key rollover is required
- create follow-up ADR or workflow updates if the incident reveals a stable lesson
