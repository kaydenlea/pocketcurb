# Data Classification

## Classification Levels

### Restricted

Highly sensitive financial or security data whose exposure would materially harm users or compromise the system.

Examples:

- auth tokens
- reset or magic-link tokens
- private transaction details
- household privacy settings
- reimbursement obligations
- security logs with user-linked sensitive action context
- privileged secrets

### Confidential

Sensitive operational or personal data that still requires controlled access but is less critical than Restricted data.

Examples:

- user profile preferences
- aggregated budget posture
- waitlist segmentation answers
- non-public roadmap or incident details

### Internal

Team-facing operating docs, release notes, and implementation details that are not public but do not directly expose user financial data.

### Public

Landing page copy, documentation intended for public release, public privacy policy, and store disclosures.

## Handling Rules

- Restricted data requires least privilege, auditability, and strong storage controls.
- Confidential data requires documented access control and retention review.
- Internal data stays in approved repository and operational systems.
- Public content must remain accurate and disclosure-safe.

