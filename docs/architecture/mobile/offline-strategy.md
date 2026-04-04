# Offline Strategy

## v1 Strategy

Support graceful degradation rather than full local-first authority:

- cached read access where safe
- queued or retried writes for low-risk actions where semantics are clear
- visible sync state and error recovery
- explicit handling for stale Safe-to-Spend or forecast views

## Trust Rules

- never imply fresh financial certainty when data is stale
- surface when guidance is based on cached information
- prevent duplicate writes and repeated submissions after reconnect

## Future Direction

If a later local-first mode is introduced, it must come with explicit conflict handling, privacy posture updates, and new release-gate scrutiny.

