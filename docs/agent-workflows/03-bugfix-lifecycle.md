# Bugfix Lifecycle

Bugfixes should still follow a disciplined workflow. The default is reproduce, inspect, find the root cause, fix with minimal impact, and verify.

## Sequence

1. Capture the bug context and expected behavior.
2. Reproduce the bug or document why direct reproduction is not available.
3. Inspect logs, tests, traces, and surrounding code until the likely root cause is understood.
4. Gather evidence from logs, failing tests, traces, user reports, or reproduction output.
5. Write a focused bugfix spec when the issue is non-trivial, risky, cross-cutting, or security-sensitive.
6. Fix the root cause, not only the symptom.
7. Verify before and after behavior where relevant, and rerun the proof set after the fix.
8. Reconcile docs or runbooks if the bug revealed stale guidance or a stable lesson.
9. Apply the correct release gate when the bug touches sensitive flows.
10. Promote repeated lessons into shared docs, rules, or skills when the lesson is stable.

## Bugfix Rules

- prefer the smallest correct change that removes the real failure mode
- avoid speculative refactors unless the spec explicitly calls for them
- compare before and after behavior when relevant
- if the fix gets ugly, question whether the real root cause has been identified
- use Gate B when the bug touches auth, RLS, secrets, storage, privacy, deletion, or other trust-critical flows
