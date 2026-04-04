# Spec Maintenance

Specs are living implementation documents, not static pre-work.

## Rules

- keep the active spec current during implementation
- record design corrections as they happen
- update the file plan if scope changes
- record review findings and how they were addressed
- reconcile the final shipped behavior at the end

## When A Spec Is Stale

A spec is stale when:

- the implementation changed shape but the file plan was not updated
- design decisions were made in code review but never written down
- edge cases emerged during implementation and were not recorded
- verification differs from what the spec claims

## Final Reconciliation

Close the spec with:

- what actually shipped
- what changed from the original plan
- what verification was run
- what follow-up work remains
