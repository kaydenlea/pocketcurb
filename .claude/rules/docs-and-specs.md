# Docs and Specs Rule

For non-trivial work, use the correct document type and keep it current as implementation evolves.

## Rules

- treat short feature-style prompts as workflow entry points, not permission to skip documentation
- start with product brief and PRD work when problem framing, scope, or user value is still changing
- create or update a feature spec and implementation plan before non-trivial implementation
- prefer the reusable generators in `package.json` when they fit the task
- use the templates under `docs/templates` and `docs/specs` instead of inventing ad hoc structures
- keep the active brief, PRD, spec, implementation plan, or bugfix doc current during implementation
- reconcile the spec after implementation
- update ADRs, workflow docs, runbooks, or product docs when stable knowledge changes
- do not leave important decisions undocumented
