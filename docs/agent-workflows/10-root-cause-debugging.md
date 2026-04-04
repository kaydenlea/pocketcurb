# Root-Cause Debugging

Bug fixing should default to root-cause debugging, not patch stacking.

## Default Debugging Flow

1. define the failure clearly
2. reproduce it or define why reproduction is currently indirect
3. inspect logs, test output, and nearby code paths
4. narrow the root cause
5. fix the smallest layer that truly removes the failure
6. verify the result and check for nearby regressions

## Root-Cause Questions

- what exact assumption failed?
- what boundary allowed the failure?
- is the symptom masking a deeper contract problem?
- what would prevent recurrence, not only this instance?

## Debugging Quality Bar

- no workaround chains
- no broad refactors without evidence
- no speculative fixes presented as verified
- no marking complete without proof
