# Figma Code Connect

Optional mapping from React primitives to the **TailTheme Web** Figma file.

| Field    | Value                                                                              |
| -------- | ---------------------------------------------------------------------------------- |
| File     | [TailTheme Web](https://www.figma.com/design/OjGoqhtHI9gzspszsDQ7Va/TailTheme-Web) |
| File key | `OjGoqhtHI9gzspszsDQ7Va`                                                           |

## Mapped components

| Code     | Figma connect file                   |
| -------- | ------------------------------------ |
| `Button` | `src/components/ui/button.figma.tsx` |
| `Card`   | `src/components/ui/card.figma.tsx`   |
| `Input`  | `src/components/ui/input.figma.tsx`  |

## Optional publish

If you use [Figma Code Connect](https://www.figma.com/developers/code-connect):

```bash
npm install -D @figma/code-connect
npx figma connect publish
```

Requires a Figma personal access token with Code Connect scope.

Code Connect is optional. Component behaviour and tokens are documented in `/app/ui` and [`components.md`](./components.md).
