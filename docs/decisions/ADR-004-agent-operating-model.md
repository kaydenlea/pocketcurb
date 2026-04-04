# ADR-004: Agent Operating Model

## Status

Accepted.

## Context

This repository is intended for production-ready work assisted by coding agents. Unstructured autonomous execution creates architectural drift, weak verification, and documentation rot.

## Decision

Make plan-first execution the default for non-trivial work. Require file-specific plans, clarification before guessing, slice-based implementation, verification after each slice, spec reconciliation during implementation, independent review when possible, CodeRabbit on pull requests, and human review before merge.

## Consequences

- planning and verification become the bottleneck by design
- the repository stores durable workflow knowledge instead of relying on memory
- Claude and Codex must use the same workflow and skill inventory

