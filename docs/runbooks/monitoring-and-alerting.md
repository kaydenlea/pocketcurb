# Monitoring and Alerting

## Required Observability Areas

- auth failures and suspicious access patterns
- password reset or recovery anomalies
- Edge Function failures and rate-limit events
- critical mobile crashes
- payment or subscription failures when monetization is introduced
- Safe-to-Spend or forecast computation failures
- elevated error rates after deployment
- export, deletion, and shared-visibility changes once those features exist

## Tool Direction

- Sentry for error and crash monitoring
- PostHog for product analytics within privacy guardrails, not as the security or incident system of record
- platform-native Supabase monitoring plus custom alerts for backend issues

## Alerting Rules

- alert on broken auth or data access patterns
- alert on sustained function failure or database issue
- alert on sustained rate-limit spikes or abuse patterns on sensitive functions
- alert on release regressions that impact trust-critical flows
- avoid noisy alerts that train operators to ignore risk
