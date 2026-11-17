# TailTheme React Full — Agent Guide

## Scope

Independent open-source repository: Vite + React + Tailwind CSS v4 admin template
(MIT). Canonical source for shared components. Lite is generated via
`npm run sync:lite`.

## Instruction Sources

1. This file
2. `DESIGN.md`
3. `docs/create-project.md`
4. `docs/figma-tailtheme-web.md`

## Working Rules

- Keep semantic tokens in `src/styles/globals.css` stable.
- Prefer existing UI primitives in `src/components/ui`.
- Documentation and comments in English.
- Do not reintroduce TailTheme purchase CTAs, `TEMPLATE_TIER`, or commercial packaging scripts.
- Shared changes land here; refresh Lite with `npm run sync:lite`.

## Commands

1. `npm run typecheck`
2. `npm run lint`
3. `npm run test:run`
4. `npm run test:create-project`
5. `npm run format:check`
6. `npm run build`

## Export

- `npm run create:project -- --list`
- `npm run create:project -- --preset minimal --out <empty-dir>`
- `npm run sync:lite`
