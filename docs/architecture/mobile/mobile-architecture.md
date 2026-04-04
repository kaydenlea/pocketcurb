# Mobile Architecture

## Stack Direction

- Expo
- EAS
- Expo Router
- React Native with TypeScript
- Gluestack UI
- NativeWind
- React Native Reanimated
- React Native Gesture Handler
- FlashList
- Zustand
- TanStack Query
- React Hook Form
- Zod
- Expo SecureStore for sensitive local values
- MMKV for fast non-sensitive persistence
- SQLite only when explicitly justified later
- RevenueCat, PostHog, and Sentry for monetization, analytics, and monitoring
- Jest with `jest-expo` plus React Native Testing Library for the mobile test baseline

## App Composition

- route-level screens in `apps/mobile`
- shared domain logic in `packages/core-domain` and `packages/schemas`
- mobile-only UI in `packages/ui-mobile`
- API clients and Supabase types in shared packages

## Experience Priorities

- fast capture
- trustworthy daily guidance
- low-friction edits
- clear offline and sync feedback
- smooth list performance and gesture handling
