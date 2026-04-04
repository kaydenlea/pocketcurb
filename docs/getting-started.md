# Getting Started

This document is the fastest way to understand how to use the PocketCurb repo day to day.

## First Run

Run this once on a fresh clone or new machine:

```bash
pnpm bootstrap:local
```

If your machine has flaky global Corepack or pnpm behavior, run the repo-owned bootstrap directly instead:

```bash
node ./scripts/bootstrap-local.mjs
```

That command:

- installs workspace dependencies
- installs the repo Git hooks
- runs repository verification
- checks whether `codex` is available and logged in
- warns instead of failing if `codex` is not ready yet on the machine

The current automatic local AI review hook uses Codex CLI. Claude users still get the same workflow guidance and mirrored skills, but the strict local push gate currently depends on Codex being available.

## Day-to-Day Flow

1. Prompt Codex or Claude normally.
2. For new product or scope-shaping work, start with a product brief or PRD first.
   Use `pnpm new:product-brief -- <slug>` or `pnpm new:prd -- <mobile|web|shared> <slug>` when helpful.
3. For non-trivial delivery work, the agent should create a feature spec and implementation plan before coding.
   If you want to create them explicitly, run `pnpm new:spec:mobile -- <slug>`, `pnpm new:spec:web -- <slug>`, `pnpm new:feature-spec -- <mobile|web> <slug>`, or `pnpm new:implementation-plan -- <mobile|web|shared> <slug>`.
   For meaningful defects, use `pnpm new:bugfix-spec -- <slug>`.
   For backend schema work, classify the table boundary first and use the Supabase migration templates.
4. Make changes in a feature branch.
5. Commit normally.
   The `pre-commit` hook runs repo verification.
6. Push normally.
   The `pre-push` hook:
   - blocks direct pushes to protected branches
   - reruns verification
   - runs strict Codex review by default
   - writes review artifacts under `.git/pocketcurb/`
7. Open a pull request.
8. Let CI run.
9. If CodeRabbit is installed, let it review too.
10. Complete human review before merge.

## What Is Automatic

- repo contract verification
- workspace install through the local bootstrap
- local pre-commit verification
- local pre-push verification
- direct-push blocking on protected branches
- strict local Codex review on push by default
- lightweight static policy checks during verification
- Supabase migration security checks during verification
- CI on push and PR
- CodeRabbit review if the GitHub app is installed

## What Is Not Fully Automatic

- Git hook installation before the first bootstrap
- human review
- CodeRabbit installation on GitHub
- perfect agent behavior for every possible prompt

The repo is strongly guided, not magic. The docs, rules, skills, hooks, and CI make the default path much safer, but they do not guarantee correctness against every ambiguous or low-quality prompt.

## How Prompting Works

You can usually prompt freely. The repo is designed so Codex and Claude can infer the workflow from:

- `AGENTS.md`
- `docs/agent-workflows/*`
- `docs/product/*`
- `docs/architecture/*`
- `docs/security/*`
- `docs/security/supabase-schema-security.md`
- mirrored skills under `.codex/skills/*` and `.claude/skills/*`

In practice, this means the agent should usually know to:

- plan first for non-trivial work
- use the relevant spec template
- update docs and ADRs when reality changes
- apply the security and release-gate rules
- run verification before claiming the task is done
- avoid client secret exposure and other banned patterns that the policy checks catch quickly

## Important Limits

The setup is robust, but not absolute.

- If `codex` is unavailable or not logged in, strict local AI review will block pushes.
- Claude contributors still benefit from the same docs and mirrored skills, but the current local automatic AI push review is Codex-specific.
- If someone bypasses the hooks explicitly, the local gates can be skipped.
- If work is done outside Git or outside this repo, the hooks do not help.
- Human judgment is still required for architecture, security nuance, and release risk.

## Emergency Overrides

Use these only deliberately:

- `POCKETCURB_BYPASS_LOCAL_GATES=1`
- `POCKETCURB_ALLOW_PROTECTED_PUSH=1`
- `POCKETCURB_DISABLE_AI_REVIEW=1`

## Recommended Mental Model

Use the README as the entry page, this file as the practical operating guide, and `AGENTS.md` plus `docs/agent-workflows/*` as the canonical workflow rules.
