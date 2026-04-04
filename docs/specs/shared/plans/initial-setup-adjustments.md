# Implementation Plan

## Linked Context

- feature spec: [docs/specs/mobile/initial-setup-adjustments.md](../../mobile/initial-setup-adjustments.md)
- PRD or bugfix doc: [docs/product/mobile/prd.md](../../../product/mobile/prd.md)
- likely release gate: Gate A

## Scope

Finish the repo setup-adjustment pass so that:

- the current feature branch can be pushed without bypassing workflow evidence
- local review stays strict without requiring live Codex connectivity
- the mobile lane is aligned with the intended Expo baseline
- the web lane remains stable and verified

## Preconditions

- current branch contains the `setup adjustments` commit
- repo verification is available locally
- no product-scope changes are required beyond workflow and scaffold correction

## File-Level Plan

- `docs/specs/mobile/initial-setup-adjustments.md`: document the infrastructure-facing feature scope
- `docs/specs/shared/plans/initial-setup-adjustments.md`: record the execution slices
- `scripts/pre-push.mjs`: remove push-time Codex review and enforce deterministic local review
- `scripts/local-review.mjs`: require workflow evidence when asked and keep artifact generation stable
- `scripts/review-ready.mjs`: require local proof plus docs reconciliation before work is considered ready
- `scripts/review-ai.mjs`, `scripts/check-ai-review-readiness.mjs`: keep Codex readiness as preflight rather than push blocker
- `apps/mobile/*`: Expo config, Babel config, Tailwind config, typed env, package versions
- `apps/web/*`: stable Tailwind 3 baseline, layout consistency
- top-level docs: align the repo narrative with the new local-vs-PR review split

## Interfaces and Data Structures

- local review artifact:
  - branch
  - baseRef
  - changedFiles
  - tags
  - recommendedGate
  - workflowEvidence
  - findings
  - codexReview
- API client payload boundary:
  - `EdgePayload = Record<string, unknown>`
  - `EdgeInvoker<TResponse>(name, payload)`

## Design Choices

- use PR-stage Codex review instead of local push-time review
- keep local review deterministic and fail closed on missing workflow evidence
- align Expo-managed packages to Expo-compatible version ranges rather than broad caret ranges
- avoid a web Tailwind 4 upgrade until it can happen without undermining workspace stability

## Edge Cases and Failure Modes

- Node-to-Git subprocess restrictions in some environments may reduce standalone local-review coverage
- partial workspace installs can leave shared packages unavailable for lane typechecks
- framework re-baselining can surface pre-existing workspace type contract issues, which must be fixed rather than bypassed

## Slice Plan

- Slice 1: Fix the branch-publish blocker
  - files: local review docs/spec artifacts
  - interfaces: workflow-evidence contract
  - design: satisfy the repo’s own proof model instead of bypassing it
  - edge cases: infrastructure work that touches multiple lanes but is not a product feature
  - verification: local review passes without workflow-evidence failure

- Slice 2: Move Codex review to PR stage cleanly
  - files: pre-push, review-ready, review-ai, workflow docs
  - interfaces: local review artifact Codex status becomes deferred locally
  - design: keep local proof strict but deterministic
  - edge cases: contributors without local Codex still need a usable branch-publish path
  - verification: `review:ready` passes and docs no longer claim push-time Codex review

- Slice 3: Re-baseline mobile to the official Expo path
  - files: mobile package/config files
  - interfaces: Expo env typing, API invoke payload typing
  - design: follow Expo Router + NativeWind conventions for an existing Expo project
  - edge cases: Expo-managed version compatibility and NativeWind setup drift
  - verification: `verify-mobile` passes

- Slice 4: Reconcile the web lane
  - files: web package/config files
  - interfaces: none beyond Tailwind/PostCSS config
  - design: keep stable Tailwind 3 baseline because it remains workspace-compatible
  - edge cases: avoid introducing Tailwind 4 conflicts into the monorepo
  - verification: `verify-web` passes

- Slice 5: Final proof and publication
  - files: none or any last doc reconciliation
  - interfaces: remote branch state
  - design: push the feature branch cleanly, then create `origin/main`
  - edge cases: GitHub remote currently has no `main`
  - verification: `verify`, branch push, remote `main` creation

## Plan Review

- independent review or cross-model review needed: no separate model required for this bounded infrastructure correction
- review findings before implementation:
  - full workspace installs were too expensive and error-prone
  - targeted workspace installs are the safer approach
  - push-time AI review was too brittle for branch publication

## Failure and Rollback Considerations

- if the mobile re-baseline caused instability, the rollback path would be to revert only the mobile config changes while keeping the workflow fixes
- if the web Tailwind changes caused workspace conflicts, revert to the stable Tailwind 3 baseline
- if branch publication still fails, inspect the next concrete blocker rather than bypassing the full gate set

## Re-Planning Triggers

- Expo verification fails in a way that points to a larger template mismatch
- the web lane requires a breaking Tailwind upgrade for framework correctness
- GitHub branch/default-branch behavior differs from the current remote inspection

## Completion Evidence

- `node ./scripts/verify.mjs`
- `node ./scripts/verify-mobile.mjs`
- `node ./scripts/verify-web.mjs`
- `node ./scripts/review-ready.mjs`
- successful push of `chore/initial-setup`
- successful creation of `origin/main`

## Documentation Reconciliation

- `README.md`
- `docs/getting-started.md`
- `docs/runbooks/local-development-flow.md`
- `docs/agent-workflows/local-automation-standard.md`
- `docs/agent-workflows/review-standard.md`
- `AGENTS.md`
