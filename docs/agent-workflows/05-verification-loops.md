# Verification Loops

Verification is not a single final step. It is a loop that runs at each meaningful checkpoint.

## Slice-Level Loop

For each slice:

1. state what changed
2. run the relevant proof set
3. inspect the output
4. decide whether to continue, fix, or re-plan

## Verification Types

- lint and formatting checks
- typecheck
- unit tests
- integration tests
- end-to-end or smoke checks
- mobile emulator or device verification
- web visual verification and build checks
- security-specific negative-path checks
- migration and rollback rehearsal where applicable

## Loop Rules

- verification should match the risk and layer of the change
- backend and system work should lean on scripts, tests, and integration checks
- UI work should include visual verification where available, not only automated tests
- no task is done without proof
