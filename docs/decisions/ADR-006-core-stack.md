# ADR-006: Core Stack

## Status

Accepted.

## Context

The product needs a stack aligned with a mobile-first experience, strong TypeScript ergonomics, fast iteration, managed deployment, and shared validation across clients and backend boundaries.

## Decision

Adopt:

- Expo, EAS, Expo Router, React Native, and TypeScript for mobile
- Gluestack UI, NativeWind, Reanimated, Gesture Handler, and FlashList for mobile UI
- Zustand and TanStack Query for app state and remote state
- Supabase, Supabase Auth, and Supabase Edge Functions for backend platform
- React Hook Form and Zod for forms and validation
- Expo SecureStore for sensitive local values and MMKV for fast non-sensitive persistence
- SQLite only when explicitly justified later for a specific offline or local-first need
- RevenueCat, PostHog, and Sentry for monetization, analytics, and monitoring
- pnpm with `pnpm audit` and `pnpm approve-builds`
- ESLint and Prettier for shared formatting and linting discipline
- Jest with `jest-expo` plus React Native Testing Library for the mobile test baseline
- CodeRabbit on pull requests where configured

Do not default to Better Auth or Clerk for v1. Do not treat Resend as part of the mobile core stack. Do not make SQLite automatic. Leave MCP out initially; adding it later requires an explicit ADR because it changes tool, workflow, and security surface area.

## Consequences

- stack complexity remains aligned with the actual v1 product
- auth and privileged logic stay consistent with the Supabase-first boundary model
- later additions require explicit ADR changes rather than silent drift
