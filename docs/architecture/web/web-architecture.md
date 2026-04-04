# Web Architecture

## Current Baseline

The current web lane scaffold uses Next.js with the App Router, React, and TypeScript. This fits the repo's website responsibilities without leaking SEO or landing-page assumptions into the mobile product lane.

## Responsibilities

- landing and waitlist surfaces
- trust and disclosure content
- structured metadata and search visibility
- web-specific analytics and experimentation under privacy rules

## Separation Rules

- do not import mobile navigation or mobile design assumptions into the website
- keep marketing copy faithful to the product docs
- share contracts and validation through packages, not UI components by default
- treat external website or SEO-generation tools as ideation inputs, not the source of truth
