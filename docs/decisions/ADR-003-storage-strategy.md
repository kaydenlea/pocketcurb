# ADR-003: Storage Strategy

## Status

Accepted.

## Context

The product needs secure local persistence for auth material, fast local caching for user experience, and a clear default that avoids overcommitting to complex offline databases too early.

## Decision

Use Expo SecureStore for sensitive values and MMKV for fast non-sensitive persistence. Do not make SQLite the default local data path in v1. Keep canonical financial records server-backed unless a later local-first mode is explicitly justified.

## Consequences

- secure storage posture is clear from the start
- common performance needs are covered without heavy local database complexity
- introducing SQLite later requires an explicit justification and architecture update

