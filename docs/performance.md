# Performance & accessibility

## Lazy charts (Recharts)

Dashboard charts can import Recharts through `LazyFunnelChart` / `LazyChartBoundary` in `src/components/charts/` so the library lands in a separate async chunk.

Example: CRM dashboard pipeline chart.

## Bundle analysis

```bash
npm run build:analyze
```

Opens `dist/stats.html` (Rollup visualizer). Largest shared dependency is typically **recharts** on dashboard/chart pages — routes are already lazy-loaded; consider dynamic import per chart page if you trim bundle size further.

## Manual Lighthouse (optional)

1. `npm run build`
2. `npm run preview -- --host 127.0.0.1 --port 4173`
3. Run Lighthouse in Chrome DevTools against `http://127.0.0.1:4173`

Suggested desktop targets: **Performance ≥ 85**, **Accessibility ≥ 95**, **Best Practices ≥ 95**, **SEO ≥ 90**.

## Development accessibility

**@axe-core/react** runs in dev (`src/main.tsx`) and logs violations to the browser console.

## Reduced motion

Marketing marquee (`TestimonialsMarquee`) and landing hero animations respect `useReducedMotion` / `prefers-reduced-motion`. Global overrides live in `src/styles/globals.css`.

## Contrast

Use **UI → Colors** showcase and `--color-text-brand` for link text on light surfaces. Dark mode: avoid `text-muted-foreground` on `bg-muted` for small labels without checking contrast.
