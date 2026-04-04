# Staff Review Standard

The implicit bar is: would a careful staff engineer approve this for a security-first finance product?

## Focus Areas

- architecture drift
- unnecessary complexity
- weak abstractions or workaround chains
- auth and authorization correctness
- release and rollback safety
- data-boundary mistakes
- missing tests or weak verification
- stale docs or misleading specs

## Review Questions

- is this the simplest correct design?
- does it solve the root cause?
- does it preserve lane ownership and boundaries?
- would a future engineer understand why this was done?
- can it be rolled back safely?
- does it increase long-term maintenance burden without enough payoff?

## Review Output

Record:

- major findings
- required changes before merge
- residual risks
- any follow-up work that should not be hidden inside the merge
