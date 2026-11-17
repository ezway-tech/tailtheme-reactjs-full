import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { Button } from '@/components/ui/button';
import {
  PAGE_TRANSITION_PRESETS,
  PAGE_TRANSITION_STYLE_OPTIONS,
  type PageTransitionPresetId,
} from '@/lib/motion/page-transition-presets';

/** In-app preview ids (same preset names as `handle.pageTransition`). */
type DemoPanelId = Exclude<PageTransitionPresetId, 'none'>;

const FAKE_SCREEN_COPY: Record<
  DemoPanelId,
  { title: string; tagline: string; footer: string; stats: { label: string; value: string }[] }
> = {
  fadeVertical: {
    title: 'Dashboard overview',
    tagline: 'Revenue and sign-ups for the last 7 days, aligned to your team’s timezone.',
    footer: 'Preset: fade + vertical offset — common for dense admin layouts.',
    stats: [
      { label: 'MRR', value: '$48.2k' },
      { label: 'Active', value: '1,240' },
      { label: 'Churn', value: '0.8%' },
    ],
  },
  fadeScale: {
    title: 'Study session',
    tagline: 'Pick up where you left off — cards easing in keeps focus on the content, not chrome.',
    footer: 'Preset: fade + scale — product and “study” style reference screens.',
    stats: [
      { label: 'Streak', value: '12d' },
      { label: 'Due', value: '28' },
      { label: 'Time', value: '24m' },
    ],
  },
  slideHorizontal: {
    title: 'Player lobby',
    tagline: 'Swipe-style motion suggests directional flow between game or media steps.',
    footer: 'Preset: horizontal slide — pairs well with lateral navigation metaphors.',
    stats: [
      { label: 'Queue', value: '3' },
      { label: 'Ping', value: '22ms' },
      { label: 'Party', value: '4/4' },
    ],
  },
  fade: {
    title: 'Settings',
    tagline: 'Subtle opacity crossfade when you want motion without spatial distraction.',
    footer: 'Preset: opacity only — manage and restrained landing transitions.',
    stats: [
      { label: 'Plan', value: 'Pro' },
      { label: 'Seats', value: '8' },
      { label: 'Sync', value: 'On' },
    ],
  },
};

/**
 * Example components + local `AnimatePresence` demo (pattern from `.references/animations`):
 * each panel uses its own enter/exit tween. For production, set `handle.pageTransition`
 * on routes and keep `PageOutletTransition` in the shell (see `AppRouteHandle`).
 */
export default function PageTransitionsShowcasePage() {
  const [panel, setPanel] = React.useState<DemoPanelId>('fadeVertical');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Page transitions"
        description="Declare `handle.pageTransition` on route objects (`AppRouteHandle`). The shell resolves the deepest match and animates the outlet via `PageOutletTransition`. Tune defaults in `config` (`APP_PAGE_DEFAULT_TRANSITION`, `APP_PAGE_TRANSITIONS_ENABLED`)."
      />

      <ShowcaseSection
        title="Declarative routing (production)"
        description="Add `pageTransition` next to `breadcrumb` in `route-objects.tsx`. Example: SaaS Analytics uses `fadeScale`."
      >
        <pre className="max-h-64 overflow-auto rounded-md border border-border bg-muted/40 p-4 text-xs leading-relaxed">
          <code>{`handle: {
  breadcrumb: 'Analytics',
  pageTransition: 'fadeScale',
} satisfies AppRouteHandle`}</code>
        </pre>
      </ShowcaseSection>

      <ShowcaseSection
        title="Local preview (reference-style)"
        description="Keyed `motion.div` screens with shared chrome so it reads like a real page. Swap presets with the controls below — same tweens as production `PAGE_TRANSITION_PRESETS`."
      >
        <div className="flex flex-wrap gap-2 pb-4">
          {PAGE_TRANSITION_STYLE_OPTIONS.map((id) => (
            <Button
              key={id}
              type="button"
              size="sm"
              variant={panel === id ? 'default' : 'outline'}
              onClick={() => setPanel(id)}
            >
              {id}
            </Button>
          ))}
        </div>
        <div className="rounded-xl border border-border bg-muted/20 p-3 sm:p-4">
          <AnimatePresence mode="wait" initial={false}>
            <FakeAppScreen key={panel} presetId={panel} />
          </AnimatePresence>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Optional manual wrap"
        description="`PageAnimated` wraps a route `element` for a mount-time preset when you cannot use `handle` (rare). Prefer `handle.pageTransition` + `PageOutletTransition` to avoid double animations."
      >
        <p className="text-sm text-muted-foreground">
          Import from <code className="rounded bg-muted px-1">@/components/motion</code>.
        </p>
      </ShowcaseSection>
    </div>
  );
}

function panelProps(id: DemoPanelId) {
  const def = PAGE_TRANSITION_PRESETS[id];
  return {
    initial: def.initial,
    animate: def.animate,
    exit: def.exit,
  };
}

function FakeAppScreen({ presetId }: { presetId: DemoPanelId }) {
  const p = panelProps(presetId);
  const copy = FAKE_SCREEN_COPY[presetId];

  return (
    <motion.div {...p} className="w-full max-w-xl origin-top">
      <div className="flex min-h-[320px] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-md ring-1 ring-black/5 dark:ring-white/10">
        <header className="flex items-center justify-between border-b border-border bg-gradient-to-r from-muted/70 to-muted/30 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
            <span className="text-xs font-medium text-muted-foreground">Acme Console</span>
          </div>
          <span className="rounded-full bg-background/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
            {presetId}
          </span>
        </header>

        <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Screen
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-foreground">
              {copy.title}
            </h2>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
              {copy.tagline}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {copy.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-border bg-muted/25 px-3 py-3 sm:px-4"
              >
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-foreground">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto rounded-lg border border-dashed border-border/80 bg-muted/15 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
            {copy.footer}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
