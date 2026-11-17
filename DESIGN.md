# TailTheme ReactJS Design Contract

## Product Intent

Comprehensive web app shell and component system for SaaS, ecommerce, and content-heavy products.

## Visual Direction

- Dense but readable information design.
- Strong semantic hierarchy for navigation, actions, and feedback.
- Balanced motion and contrast for enterprise-style dashboards.

## Tokens And Foundations

- Source of truth: `src/styles/globals.css`.
- Token model documented in `docs/tokens-overview.md`.
- Customization entrypoint documented in `docs/customization.md`.

## Component And Pattern Rules

- Reuse existing `src/components/ui` primitives before introducing new variants.
- Preserve consistency across chips, tables, timeline blocks, wizards, split panes, and messaging panes.
- Keep primary vs secondary vs destructive action hierarchy unambiguous.

## Figma Alignment

- Use `docs/figma-tailtheme-web.md` for the buyer Figma kit link.
- Maintainer canvas / MCP workflow: `docs/figma-kit-maintainers.md`.
- Keep semantic token naming aligned between code and Figma variables.
- Prefer updating tokens and documented patterns before introducing one-off styles.

## Accessibility

- Maintain WCAG AA contrast for text and controls.
- Preserve visible focus states and keyboard path continuity.
- Avoid relying on color alone for state or severity.

## Performance And Responsiveness

- Keep layout resilient from mobile to wide desktop shells.
- Avoid heavy visual additions that degrade startup or interaction latency.
- Follow `docs/performance.md` during UI-heavy feature changes.
