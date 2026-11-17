# Contributing

## Where to contribute

- **Shared UI, patterns, tokens, generator, docs** → this repository (`tailtheme-reactjs-full`).
- **Lite-only docs** that do not affect shared components may land in `tailtheme-reactjs-lite`, but prefer Full so `npm run sync:lite` can refresh Lite.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Checks before opening a PR

```bash
npm run typecheck
npm run lint
npm run test:run
npm run test:create-project
npm run format:check
npm run build
```

## Adding an export module

1. Add `tools/create-project/modules/<id>.json` with files, deps, routes, and `dependsOn`.
2. Register the module in docs (`docs/create-project.md`) only after it is tested.
3. Add/extend tests in `tools/create-project/create-project.test.mjs`.
4. Export and `npm install && npm run build` in a clean output folder.

## License

By contributing, you agree your changes are licensed under the MIT License
(`Copyright (c) 2026 Ezway Tech`). TailTheme is the product name.
