# ADR-005: Mobile vs Web Separation

## Status

Accepted.

## Context

The mobile app is the primary product, while the website serves trust, waitlist, and later SEO needs. Premature sharing across these lanes would create distorted UX and unclear ownership.

## Decision

Keep mobile and web as separate product lanes with separate planning, docs, and UI packages. Share only business logic, validation, contracts, types, and engineering standards unless a later decision proves broader sharing is beneficial without coupling user experience assumptions.

## Consequences

- mobile product velocity stays focused on daily decision support
- web SEO and conversion needs do not leak into mobile design
- shared packages remain small and purposeful

