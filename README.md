<div align="center">

<img src="public/tailtheme.png" alt="TailTheme logo" width="72" height="72" />

# TailTheme React Full

Open-source React admin template with a full demo, design-system gallery, and local project exporter.

[Website](https://tailtheme.dev) · [Figma](https://www.figma.com/design/OjGoqhtHI9gzspszsDQ7Va/TailTheme-Web) · [Documentation](#documentation) · [Lite](../tailtheme-reactjs-lite)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

## Overview

**TailTheme React Full** is the canonical open-source template for TailTheme on the web: Vite, React 19, TypeScript, and Tailwind CSS v4.

Use it as a reference implementation, a starting point for admin UIs, or the source for smaller exports. Auth screens and sample data are **frontend demos** — there is no real TailTheme commerce API to configure for local viewing. Optional MSW demo mode: `?mock=1`.

## Lite or Full?

Both editions are **free**, **MIT**, and share the same design system. They differ only in how many pages and samples ship with the repo.

|               | **Lite**                                         | **Full** (this repo)                  |
| ------------- | ------------------------------------------------ | ------------------------------------- |
| Scope         | Dashboards, SaaS/Project samples, UI docs subset | Complete demo and component reference |
| Exporter      | —                                                | `npm run create:project`              |
| Shared UI PRs | Prefer Full                                      | Yes                                   |

Lite is refreshed from this repository with `npm run sync:lite` (preset `lite`). The separate `minimal` preset is a small Home/Form starter for `create:project` exports — not the public Lite edition.

## What's included

- App shell with sidebar, header utilities, theming, and i18n
- Sample dashboards and vertical pages (SaaS, Project, and more)
- UI component gallery and token documentation pages under `/app/ui`
- Auth, settings, profile, and marketing sample screens (UI only)
- Semantic design tokens in `src/styles/globals.css`
- Local project exporter (`tools/create-project`)

## Quick start

Requires **Node.js 18+** (Vite 6) and npm.

```bash
npm install
cp .env.example .env
npm run dev
```

Default app URL: [http://localhost:5173](http://localhost:5173) (override with `VITE_APP_PORT` in `.env`).

Useful checks:

```bash
npm run typecheck
npm run lint
npm run test:run
npm run build
```

## Customization

| Area                    | Location                                                           |
| ----------------------- | ------------------------------------------------------------------ |
| App name / storage keys | [`src/config.ts`](src/config.ts)                                   |
| Design tokens           | [`src/styles/globals.css`](src/styles/globals.css)                 |
| Navigation              | [`src/navigation/app-nav-tree.ts`](src/navigation/app-nav-tree.ts) |
| Routes / URLs           | [`src/routes/`](src/routes/)                                       |
| Sample fixtures         | [`src/mocks/fixtures/`](src/mocks/fixtures/)                       |

Longer walkthrough: [`docs/customization.md`](docs/customization.md).

## Documentation

| Doc                                                          | Description                 |
| ------------------------------------------------------------ | --------------------------- |
| [`docs/customization.md`](docs/customization.md)             | Branding, theme, navigation |
| [`docs/create-project.md`](docs/create-project.md)           | Project export / presets    |
| [`docs/figma-tailtheme-web.md`](docs/figma-tailtheme-web.md) | Figma file notes            |
| [`docs/components.md`](docs/components.md)                   | Component documentation     |
| [`docs/tokens-overview.md`](docs/tokens-overview.md)         | Token overview              |
| [`docs/code-connect.md`](docs/code-connect.md)               | Optional Figma Code Connect |
| [`DESIGN.md`](DESIGN.md)                                     | Design principles           |
| [`CONTRIBUTING.md`](CONTRIBUTING.md)                         | How to contribute           |

In-app UI gallery (after `npm run dev`): `/app/ui` — this is an app route, not a GitHub docs path.

## Figma

Design file: [TailTheme Web](https://www.figma.com/design/OjGoqhtHI9gzspszsDQ7Va/TailTheme-Web)

Covers foundations, theme variables, and reference components aligned with this template. Pixel-perfect parity with every screen is **not** claimed without a dedicated audit. Public view/duplicate access: confirm in Figma (not verified here). See [`docs/figma-tailtheme-web.md`](docs/figma-tailtheme-web.md).

## Scripts

| Script                            | Purpose                  |
| --------------------------------- | ------------------------ |
| `npm run dev`                     | Start Vite dev server    |
| `npm run build`                   | Production build         |
| `npm run preview`                 | Preview production build |
| `npm run typecheck`               | TypeScript check         |
| `npm run lint` / `lint:fix`       | ESLint                   |
| `npm run format` / `format:check` | Prettier                 |
| `npm run test:run`                | Unit tests               |
| `npm run test:create-project`     | Exporter tests           |
| `npm run create:project`          | Export a tailored app    |
| `npm run sync:lite`               | Regenerate the Lite repo |

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). Shared UI, tokens, generator, and docs belong in **this** repository so Lite can stay regeneratable.

## Support the project

TailTheme is free and open source. If it saves you time, consider supporting its maintenance. Starring the repository, reporting bugs, improving the docs, and sharing it also help.

<!-- Maintainer: add the donation URL here when available. -->

## License

MIT — Copyright (c) 2026 **Ezway Tech**. TailTheme is the product name.

See [`LICENSE`](LICENSE). Third-party notices: [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).
