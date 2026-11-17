# TailTheme — Design tokens overview

Canonical source: [`src/styles/globals.css`](../src/styles/globals.css). Runtime overrides: `PreferencesProvider` (`applyToRoot`).

## Layer model

| Layer         | Purpose                   | Examples                                                        |
| ------------- | ------------------------- | --------------------------------------------------------------- |
| **Primitive** | Raw palette values        | `--color-brand-blue`, `--color-primary-500`, `--color-gray-200` |
| **Semantic**  | Intent-based, theme-aware | `--color-background`, `--color-primary`, `--color-border`       |
| **Component** | Scoped overrides          | `--radius-button`, `--radius-card`, `--radius-input`            |

## Color

- **Brand:** `--color-brand`, `--color-brand-hover`, `--color-text-brand` (darker, for links/body text)
- **Surfaces:** `--color-surface`, `--color-background`, `--color-card`, `--color-muted`
- **Text:** `--color-text-strong`, `--color-text-default`, `--color-text-muted`, `--color-text-subtle`
- **Status scales:** `--color-primary-*`, `--color-success-*`, `--color-warning-*`, `--color-danger-*`, `--color-info-*` (50–950)
- **shadcn aliases:** `--color-primary`, `--color-destructive`, `--color-ring`, `--color-sidebar-*`

Dark mode: `.dark` and `[data-theme='dark']` (dual selector).

## Typography

- **Families:** `--font-sans` (Inter), `--font-display` (Outfit)
- **Preset classes:** `.text-display`, `.text-h1` … `.text-h6`, `.text-body`, `.text-body-sm`, `.text-label`, `.text-caption`, `.text-overline`, `.text-code`
- **Leading / tracking:** `--leading-*`, `--tracking-*`

## Spacing & layout

- Tailwind default spacing scale (4pt base)
- **Breakpoints:** `--breakpoint-sm` … `--breakpoint-2xl`
- **Container:** `.container-main` (max-w-7xl + responsive padding)

## Radius

`--radius`, `--radius-sm` … `--radius-xl`, `--radius-button`, `--radius-card`, `--radius-input`

## Shadow

`--shadow-sm` through `--shadow-2xl` — darker opacity overrides in `.dark`

## Motion

- **Duration:** `--duration-fast` (100ms) … `--duration-slowest` (700ms)
- **Easing:** `--ease-out`, `--ease-in-out`, `--ease-spring`, `--ease-bounce`
- **Collapsible:** `--animate-tt-collapsible-down` / `up`

## Effects

- **Opacity:** `--opacity-disabled`, `--opacity-muted`, `--opacity-overlay`
- **Z-index:** `--z-dropdown` (1000) … `--z-tooltip` (1700)
- **Blur:** `--blur-sm` … `--blur-xl`, `--blur-glass`

## Customization entry points

1. Edit primitives/semantics in `globals.css`
2. Use **Theme customizer** (palette, radius, font, layout, scale)
3. Fork `PRESET_PALETTES` in `src/config.ts`

See also: [Configuration & theming](/app/docs/configuration-theming) in the app.
