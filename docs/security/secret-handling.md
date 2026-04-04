# Secret Handling

## Rules

- never commit secrets to the repository
- never place service-role credentials, signing material, or integration secrets in clients
- keep privileged secrets in approved deployment secret stores only
- scope secrets by environment and function
- rotate secrets on suspicion of exposure and during major operational changes

## Operational Expectations

- maintain an inventory of active secrets and their owners
- minimize the number of secrets with broad privileges
- log secret rotation and access reviews
- ensure local development uses non-production credentials
- document which Edge Functions depend on which secrets before enabling privileged integrations

## Secret Inventory Baseline

- Supabase anon keys are public configuration values and must still be environment-scoped and accurate
- Supabase service-role keys, signing material, provider API keys, webhook secrets, and admin credentials are privileged secrets and must never reach clients
- Sentry, PostHog, and RevenueCat credentials must be classified by whether they are public SDK configuration or privileged server-side credentials
- each secret needs an owner, environment scope, rotation expectation, and incident-response path
