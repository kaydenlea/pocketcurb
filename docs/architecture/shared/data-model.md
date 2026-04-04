# Data Model

The data model must support short-term clarity, reimbursement correctness, shared spending with private autonomy, and forward-looking cash flow.

## Core Entities

- `user_profile`: identity, preferences, locale, notification posture, analytics consent, privacy posture.
- `household`: optional shared context grouping users while preserving private autonomy.
- `household_membership`: membership role, visibility rules, invitation state.
- `account`: linked or manual financial account with balance posture and visibility scope.
- `transaction`: amount, date, merchant, note, source, status, account, owner, visibility scope, and classification confidence.
- `transaction_split`: allocation of a transaction across user, household, business, or event contexts.
- `reimbursement_item`: expected payback amount, payer, payee, status, due state, and linked transaction references.
- `event`: trip, occasion, or narrative grouping with budget, dates, confidence score, and user-editable assignment.
- `budget_policy`: daily budget target, rollover settings, exceptions, and effective date range.
- `recurring_obligation`: bills, subscriptions, debt, or scheduled obligations with due cadence.
- `cash_flow_item`: normalized future inflow or outflow used by the forward-looking calendar and Safe-to-Spend logic.
- `safe_to_spend_snapshot`: computed near-term available spend, assumptions, time window, and explanation payload.
- `crisis_cushion_snapshot`: resilience summary and stress indicators.
- `privacy_preference`: personal pots, shared visibility toggles, and disclosure settings.
- `audit_log`: security-relevant and user-sensitive actions.

## Key Relationships

- users may belong to zero or one shared household in v1, with room for later expansion
- transactions belong to a user and can optionally link to a household, event, split, and reimbursement
- recurring obligations and forecast items feed the forward-looking cash-flow engine
- Safe-to-Spend and Crisis Cushion are derived views, not source-of-truth records

## Indexing Guidance

Create indexes early on frequently queried and RLS-relevant fields such as `user_id`, `household_id`, `account_id`, `transaction_date`, `event_id`, `status`, and forecast date ranges.

