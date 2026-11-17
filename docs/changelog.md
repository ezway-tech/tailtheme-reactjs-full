# Changelog

All notable changes to the TailTheme React template are documented here.

## [Unreleased]

### Changed

- Buyer documentation cleanup — Figma overview for customers; removed internal packaging notes from shipped docs.

## [0.3.1] — 2026-05-21

### Changed

- **Naming hygiene** — renamed 4 layout files to kebab-case (`AppShell.tsx` → `app-shell.tsx`, etc.). Component exports unchanged.
- **Table showcase** — `_shared.ts` → `table-shared.ts` under `src/pages/ui/components/table/`.

### Added

- **ESLint `eslint-plugin-check-file`** — enforces kebab-case filenames and folders under `src/layouts`, `src/pages`, `src/components`, `src/routes`, `src/providers`, `src/lib`, `src/mocks`, and `src/i18n`.

## [0.3.0] — 2026-05-21

### Added

- **Phase 7** — `tokens.ts`, MSW demo mode (`?mock=1`), French locale, `LazyFunnelChart`, Figma Code Connect stubs.
- `docs/code-connect.md`, `public/mockServiceWorker.js`.

## [0.2.0] — 2026-05-19

### Added

- **CRM vertical** — pipeline, deals, contacts, companies, activities, quotes, reports, segments, dashboard.
- **Marketing blocks** — hero centered/screenshot/email, feature tabs, testimonials marquee/featured.
- **Layout polish** — `LandingMarketingHeader`, `ThreeColumnLayout`, `SaveBar`, `PagesMegaMenu`.
- **Quality** — `@axe-core/react` in dev, `npm run build:analyze`.
- **Docs** — customization guide, components catalogue, `docs/performance.md`.

### Changed

- Landing page uses scroll-aware header, feature tabs, and testimonial marquee.
- Settings profile tab demonstrates sticky `SaveBar` when dirty.

### Themed pages waves (W0–W5)

- W0: Auth, settings, legal, onboarding.
- W1–W4: Depth across e-commerce, SaaS, edu, marketing, social, project, finance, health, vehicle.
- W5: CRM + accessibility improvements.

## [0.1.0] — 2026-05

### Added

- Initial TailTheme React release: Vite 6, React 19, Tailwind v4, 9 dashboards, 10+ verticals, UI showcase, runtime theming, en/vi i18n.
