# Domain Boundaries

## Shared Domain Responsibilities

Place the following in shared packages:

- financial decision rules
- Safe-to-Spend calculation interfaces
- Daily Spending Meter logic
- reimbursement and split rules
- event-detection contracts and confidence scoring interfaces
- shared schemas, validation, and API contracts

## Mobile-Only Responsibilities

- mobile navigation
- mobile input ergonomics
- native secure storage and device session behavior
- mobile-specific rendering patterns and list performance

## Web-Only Responsibilities

- landing page information architecture
- waitlist flows
- SEO metadata, structured content, and acquisition-specific analytics
- browser-only privacy and disclosure flows

## Anti-Pattern

Do not move product-lane-specific UX decisions into shared packages merely to reduce duplication. Share business logic, not platform assumptions.

