# Overview

State the change in one or two paragraphs with the user-visible goal and the intended product impact.

# User or Problem Context

Describe the user problem, why it matters now, and how it connects to the mobile product thesis. Include whether the work affects Safe-to-Spend, the Daily Spending Meter, reimbursements, shared spending, privacy toggles, event intelligence, or forward-looking clarity.

# Requirements

List functional, non-functional, security, and observability requirements. Distinguish must-have behavior from explicit non-goals.

# Clarifying Questions

Record the questions that must be answered before implementation. If none remain, say so explicitly and explain why the design is stable enough to proceed.

# File Plan

List the files to create or modify and the purpose of each one. Include docs, tests, migrations, monitoring changes, and rollback assets where relevant.

# Interfaces and Types

Describe the data structures, contracts, events, stores, navigation params, Supabase schemas, and function boundaries that will be introduced or changed.

# Edge Cases

Document ambiguous transactions, reimbursement distortion, shared visibility, offline behavior, partial failure, auth expiry, duplicate submission, and any other scenario that could break user trust.

# Verification Plan

List the checks required for this work: lint, typecheck, unit, integration, end-to-end, visual verification, migration rehearsal, security review, and manual scenario checks as applicable.

# Checklist

- planning complete
- clarifying questions resolved or recorded as open decisions
- implementation sliced
- verification run for each slice
- docs reconciled
- review complete
- release gate identified

# Design Decisions

Record the chosen design, the current recommendation, rejected alternatives if relevant, and what evidence or constraints drove the choice.

# Review Notes

Capture findings from self-review, independent AI review, and human review. Note disagreements and how they were resolved.

# Final Reconciliation

Summarize what shipped, what changed from the original plan, what verification was completed, what docs were updated, and any remaining explicit open decisions.

