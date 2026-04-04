# State and Storage Model

## State Layers

- server source of truth: Supabase data under auth and RLS
- cached remote state: TanStack Query
- local app state: Zustand
- secure sensitive persistence: Expo SecureStore
- fast non-sensitive persistence: MMKV

## Rules

- keep canonical financial records server-backed unless an explicit local-first mode is introduced later
- avoid duplicating derived state across multiple stores without clear ownership
- persist only what materially improves responsiveness or resilience
- keep privacy-sensitive data out of logs and unnecessary caches

## Derived Views

Safe-to-Spend, the Daily Spending Meter, running balances, and Crisis Cushion views should have explicit derivation logic and confidence boundaries so users understand what changed and why.

