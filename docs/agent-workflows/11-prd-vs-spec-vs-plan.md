# PRD vs Spec vs Plan

These documents serve different purposes and should not be collapsed into one vague artifact.

## Product Brief

Use a product brief to capture opportunity, user problem, strategic framing, and why the work matters.
It answers: why should this exist at all?

## PRD

Use a PRD to define requirements, non-goals, UX direction, trust boundaries, scope, and success measures.
It answers: what must be true for this to count as the right product outcome?

## Feature Spec

Use a feature spec to define product behavior, file scope, interfaces, data structures, edge cases, and verification expectations for implementation.
It answers: how should this feature behave and what concrete acceptance bar must the implementation meet?

## Implementation Plan

Use an implementation plan to break the feature spec into small slices with verification criteria, review checkpoints, and rollback awareness.
It answers: in what order should this be built and verified?

## Bugfix Spec

Use a bugfix spec when a defect is risky, subtle, cross-cutting, or security-sensitive and needs explicit reproduction, root-cause, and verification tracking.
It answers: what failed, why did it fail, and how will we prove the smallest correct fix?

## Rule Of Thumb

- if you are deciding what to build: product brief or PRD
- if you are deciding how a feature will work: feature spec
- if you are deciding the execution order: implementation plan
- if you are fixing a meaningful defect: bugfix spec
