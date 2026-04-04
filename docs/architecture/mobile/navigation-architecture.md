# Navigation Architecture

Expo Router is the routing layer for the mobile app.

## Recommended Route Groups

- onboarding and auth
- main app shell
- modal or sheet flows for quick add and simulation
- detail routes for transactions, events, and settings

## Navigation Rules

- keep the home route optimized for daily clarity
- avoid deep hierarchy for frequent tasks such as transaction add, split, edit, and simulation
- use route groups to separate onboarding from the authenticated app
- keep sensitive account and privacy management discoverable but not dominant

