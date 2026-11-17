# Customization guide

Steps to rebrand and trim TailTheme in under 30 minutes.

## 1. Product identity

| Item                 | Location                                       |
| -------------------- | ---------------------------------------------- |
| App title            | `src/config.ts` → `APP_TITLE`                  |
| HTML title / meta    | `index.html`                                   |
| Marketplace metadata | `metadata.json`                                |
| Favicon              | `public/favicon.ico` (replace asset)           |
| OG image             | `public/og.svg` (export to PNG for production) |

## 2. Brand colors & typography

Edit semantic tokens in `src/styles/globals.css` under `@theme`:

- `--color-primary-hsl` — buttons, links, focus rings
- `--color-text-brand` — inline links (WCAG-safe on light backgrounds)
- `--font-sans` / `--font-display` — body vs headings

Use **Appearance** in Settings (`/app/settings`) or the in-shell theme customizer for runtime presets without editing CSS.

See also [`tokens-overview.md`](./tokens-overview.md).

## 3. Navigation & routes

1. **Sidebar tree** — `src/navigation/app-nav-tree.ts` (`PAGES_TREE`, `UI_TREE`, dashboards).
2. **URLs** — `src/routes/urls.ts` (single registry).
3. **Route components** — `src/routes/route-objects.tsx` (lazy imports).

Remove themes you do not ship: delete the `src/pages/pages/<theme>/` folder, nav children, and route block.

## 4. Mock data → API

| Layer        | Path                                              |
| ------------ | ------------------------------------------------- |
| Fixtures     | `src/mocks/fixtures/`                             |
| MSW handlers | `src/mocks/` (when enabled)                       |
| Env          | `.env` → `VITE_API_BASE_URL`, `VITE_USE_API_MOCK` |

Replace fixture imports in pages with your data hooks; keep the same table/card layouts.

## 5. Auth & billing integration points

Auth routes live under `/auth/*` (`src/pages/auth/`). Wire your provider in `LoginPage` / `RegisterPage` and remove demo toasts.

Billing UI stubs:

- `src/pages/pages/saas/billing-page.tsx` — plan, usage, invoices
- Settings → Billing tab links here

Search for `TODO: connect to your billing provider` in the repo.

## 6. Layout variants

`PreferencesProvider` controls shell layout (sidebar, compact, top-nav). Mega-menu for themed pages appears in **top-nav** layout via `PagesMegaMenu`.

Marketing landing uses `LandingMarketingHeader` (scroll-aware blur) on `/landing`.

## 7. i18n

Locales: `src/i18n/locales/en.json`, `vi.json`. Add keys for new nav entries (`nav.*`).

## 8. Demo mode (MSW)

Offline API mocking for demos and screencasts:

- Add `?mock=1` to any URL (persisted in `localStorage`)
- Or set `VITE_USE_API_MOCK=true` in `.env`

Stub endpoints: `/api/health`, `/api/members`, `/api/courses`, `/api/products`, `/api/me`.

Handlers: `src/mocks/handlers-demo.ts`.

## 9. Typed tokens in TypeScript

```ts
import { tokens, cssVar } from '@/lib/tokens';

const stroke = tokens.color.primary;
const radius = tokens.radius.card;
```

## 10. French locale

Third locale (`fr`) ships with French UI chrome; missing keys fall back to `en`. Add strings in `src/i18n/locales/fr.json`.

## 11. Quality checks before release

```bash
npm run check
npm run test:run
npm run build:analyze    # bundle report → dist/stats.html
```

## 12. Documentation map

| Doc                           | Purpose                     |
| ----------------------------- | --------------------------- |
| `README.md`                   | Quick start                 |
| `docs/customization.md`       | This file                   |
| `docs/components.md`          | UI primitive index          |
| `docs/changelog.md`           | Version history             |
| `docs/tokens-overview.md`     | CSS design tokens           |
| `docs/performance.md`         | Bundle analysis & a11y      |
| `docs/figma-tailtheme-web.md` | Figma UI kit link           |
| `docs/code-connect.md`        | Optional Figma Code Connect |

Naming: all paths under `docs/` use **kebab-case**.
