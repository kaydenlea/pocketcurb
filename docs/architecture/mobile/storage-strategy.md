# Mobile Storage Strategy

## Default Storage Decisions

- use Expo SecureStore for tokens, secrets, and other sensitive local values
- use MMKV for fast non-sensitive preferences and UI cache state
- prefer repository storage helpers over raw storage APIs so sensitivity boundaries remain consistent
- do not make SQLite the default local data path

## Why SQLite Is Deferred

SQLite may become useful later for deeper offline workflows, imports, or local-first variants, but it should be introduced only when the benefits outweigh the complexity, sync risk, and migration burden.

## Open Decision

Current recommendation: keep canonical transaction and budgeting data server-backed in v1 while designing local caches intentionally.

Rationale: this preserves security, simplifies sync semantics, and avoids premature local database complexity.

What would change the decision: a proven need for robust offline-first creation and reconciliation beyond what cached queries plus queued writes can support.
