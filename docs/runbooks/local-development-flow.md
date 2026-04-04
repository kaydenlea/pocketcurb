# Local Development Flow

## Default Flow

0. Run `pnpm bootstrap:local` once on a fresh clone.
   If global Corepack or pnpm is unreliable on the machine, run `node ./scripts/bootstrap-local.mjs` instead.
   The bootstrap installs dependencies, installs hooks, verifies the repo, and checks Codex readiness. If Codex is not ready yet, bootstrap warns but still completes.
1. Create or update the correct document for the stage of work: product brief, PRD, feature spec, implementation plan, or bugfix spec.
   Prefer the reusable generators such as `pnpm new:product-brief`, `pnpm new:prd`, `pnpm new:feature-spec`, `pnpm new:implementation-plan`, and `pnpm new:bugfix-spec`.
2. Implement in small slices.
3. Let `pre-commit` run local verification before each commit.
4. Push a feature branch, not `main`.
5. Let `pre-push` run the local gate and block unsafe pushes.
6. Run `pnpm review:ready` when you want the full local proof and review gate before PR.
7. Open a pull request.
8. Let CI run, then use CodeRabbit if installed, then complete human review.
9. If the work maps to Gate B, Gate C, or Gate D, complete `docs/runbooks/security-release-checklist.md` before merge.

## If CodeRabbit Is Installed

- open or update the PR
- let CodeRabbit review automatically
- fix findings
- repeat until CI and review are green

## If CodeRabbit Is Not Installed

- rely on local hooks and CI for deterministic checks
- let the default pre-push Codex review run locally
- use human review before merge

Contributors may still use Claude for day-to-day authoring because workflow docs and skills are mirrored, but the current automatic local push-time AI review uses Codex CLI.

## Important Boundary

Local automation can catch structural mistakes, policy violations, missing docs alignment, and some risky patterns. It cannot guarantee the absence of logic bugs, race conditions, or nuanced security flaws. Human review remains mandatory for substantive work.
