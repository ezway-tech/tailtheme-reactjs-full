# create:project — export a tailored app

`tools/create-project` copies selected modules from this Full repository into a
**new empty folder**. It does not delete files inside Full.

## Commands

```bash
npm run create:project -- --list
npm run create:project -- --preset minimal --out ../my-app
npm run create:project -- --modules project --out ../my-project-app
npm run create:project -- --modules project --out ../my-project-app --dry-run
npm run sync:lite
```

## Presets

| Preset    | Modules           | Notes                                                          |
| --------- | ----------------- | -------------------------------------------------------------- |
| `lite`    | `lite`            | Public TailTheme React Lite (Free-scope). Used by `sync:lite`. |
| `minimal` | `core`            | Export-only Home/Form starter — not the public Lite repo       |
| `project` | `core`, `project` | Starter + Project sample pages                                 |

## Modules (supported)

| Id        | Depends on | Description                                                        |
| --------- | ---------- | ------------------------------------------------------------------ |
| `lite`    | —          | Free-scope shell, dashboards, SaaS/Project samples, UI docs subset |
| `core`    | —          | Shell, tokens, basic UI, starter home/form, auth stubs, 404        |
| `project` | `core`     | Project dashboard + kanban/list/detail/calendar samples            |

## Safety

- Rejects output equal to / inside / parent of the Full source tree.
- Rejects non-empty output directories for normal create (use `--sync-lite` for Lite).
- `--dry-run` prints a plan and writes nothing.
- Skips `.git`, `.env`, `node_modules`, and `dist`.

## Adding a module

1. Create `tools/create-project/modules/<id>.json`.
2. Declare `files`, `dependsOn`, `packageDependencies`, `routes`, and `urls`.
3. Extend tests and run a clean `npm install && npm run build` on the export.
4. Document the module here only after it passes.
