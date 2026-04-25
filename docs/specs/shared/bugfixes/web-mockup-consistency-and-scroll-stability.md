# Bugfix Spec

## Overview

Fix web-lane mockup inconsistencies across the mobile preview surfaces and address the shared rendering instability causing sections to disappear or partially paint while scrolling.

## Failure Context

Observed behavior:
- The lower sheet/background color is inconsistent across the Accounts, Bills, Cash Flow, and Overview mockup surfaces.
- The top-nav center pill is visually inconsistent across those same surfaces, with Accounts and Cash Flow inheriting incorrect letter spacing and Overview rendering wider than its text.
- The browser tab title can render page titles without `Gama` leading the title.
- Multiple website visuals intermittently disappear, partially paint, or reload while scrolling, including the Place Context card and hero waitlist input text.
- Event Details quick-action icons render slightly too large.

Expected behavior:
- The lower sheet color should consistently match the Accounts reference surface.
- The top-nav center pill should match the Bills reference surface.
- Browser tab titles should begin with `Gama`.
- Signature visuals, walkthrough previews, and hero waitlist content should stay visibly rendered during scroll.
- Event Details quick-action icons should be slightly smaller.

## Reproduction

Direct browser reproduction was not run before editing in this pass. The bug report came from user observation, and static inspection identified concrete style mismatches plus shared rendering-risk patterns in the web lane.

## Evidence

- `apps/web/src/content/mockups/accounts.html` uses the intended lower-sheet background `#f2f5f7`.
- `apps/web/src/content/mockups/bills.html` and `apps/web/src/content/mockups/cash-flow.html` use `#d7e4ed` for the lower sheet instead.
- `apps/web/src/content/mockups/accounts.html` and `apps/web/src/content/mockups/cash-flow.html` both include broad `.text-[10px].font-extrabold` overrides that force negative letter spacing on the nav title.
- `apps/web/src/lib/site-metadata.ts` uses the root title template `%s | Gama`, which puts `Gama` last in browser tab titles.
- `apps/web/app/globals.css` contains a `contain: paint` mask around walkthrough iframes and several continuous animated, filtered, or composited hero/signature layers that increase scroll-time paint risk.

## Root-Cause Statement

This regression is a combination of local style drift in the mockup HTML sources and shared rendering fragility in the marketing page. The mockup drift comes from divergent hard-coded background values and broad text overrides. The scroll instability is likely driven by aggressive compositing and animation choices across walkthrough masks, animated signature visuals, and the hero waitlist shell, which makes multiple unrelated sections susceptible to partial repaint or disappearance during scroll.

## File Plan

- `docs/specs/shared/bugfixes/web-mockup-consistency-and-scroll-stability.md`
- `apps/web/src/content/mockup-previews.ts`
- `apps/web/src/content/mockups/accounts.html`
- `apps/web/src/content/mockups/bills.html`
- `apps/web/src/content/mockups/cash-flow.html`
- `apps/web/src/content/mockups/overview-screen.html`
- `apps/web/src/content/mockups/event-details.html`
- `apps/web/app/globals.css`
- `apps/web/src/lib/site-metadata.ts`
- `apps/web/src/lib/site-metadata.unit.test.ts`

## Minimal Fix Plan

- Align mockup lower-sheet colors with the Accounts reference value.
- Align nav center pills with the Bills reference pill and explicitly restore correct header letter spacing where broad rules were overriding it.
- Tighten the Overview pill width so it hugs its content.
- Make the browser title template lead with `Gama`.
- Reduce rendering-risk on the website by removing the walkthrough paint containment, calming the heaviest continuous signature/hero animations, and forcing a stable visible state for the Place Context card.
- Reduce the Event Details quick-action icon size slightly.

## Edge Cases

- Preview surfaces must still crop and scale correctly inside the `/preview/[slug]` route after background changes.
- Reduced-motion behavior must continue to show visible content, not reintroduce hidden states.
- Stabilizing the Place Context card should not collapse its layout or hide its action text.
- The title change must not break canonical or Open Graph metadata expectations.

## Verification Plan

- Run targeted metadata tests for the title template.
- Run a targeted web typecheck or test command if available in the workspace.
- Manually inspect the changed mockup files for consistent lower-sheet colors, nav pill sizing, and icon scale.
- Compare the Place Context, hero waitlist, and walkthrough rendering code before and after to ensure the new defaults favor stable visibility over animation-heavy states.

## Review Notes

- Applied the mockup fixes at the HTML source level instead of relying only on preview-route normalization so the source-of-truth files now match the intended visual system.
- Reduced the heaviest scroll-time rendering risk by removing walkthrough paint containment and freezing the Place Context card into a stable visible state rather than cycling animated popup states.
- Added a focused metadata unit assertion so the browser-title fix is covered by an automated check.
- Residual risk: no browser screenshot or live scroll recording was captured in this pass, so the rendering-stability fix is proven by code-path reduction plus targeted automated checks rather than visual automation.

## Final Reconciliation

- Actual root cause:
  - Bills and Cash Flow drifted to a different lower-sheet surface color than Accounts.
  - Accounts and Cash Flow both had broad `text-[10px] font-extrabold` rules that overrode intended nav-title tracking.
  - Overview carried a custom pill width that let the title container render wider than its content.
  - The browser title template placed `Gama` second.
  - Shared website rendering instability came from aggressive compositing choices such as walkthrough paint containment plus multiple continuous signature-layer animations.
- Fix shipped:
  - Normalized Bills and Cash Flow lower-sheet backgrounds to the Accounts reference color and aligned the Bills Upcoming container with the Cash Flow Income Flow container treatment.
  - Restored the intended nav-title tracking for Accounts and Cash Flow and tightened the Overview title pill to content width.
  - Reduced Event Details quick-action icon size.
  - Changed the root metadata title template to `Gama | %s`.
  - Removed `contain: paint` from the walkthrough preview mask, stabilized the hero email input paint path, and converted the Place Context signature visual into a stable always-visible state.
- Verification completed:
  - `pnpm.cmd --filter @gama/web test -- --runInBand apps/web/src/lib/site-metadata.unit.test.ts`
  - `pnpm.cmd --filter @gama/web typecheck`
- Stable lesson:
  - Avoid broad typography override selectors in mockup HTML when the top-nav title depends on explicit tracking values, and prefer stable visible states over decorative continuous animation on critical landing-page proof surfaces.
