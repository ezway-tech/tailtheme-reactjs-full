import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { cn } from '@/lib/cn';

interface Breakpoint {
  utility: string;
  minWidth: number;
  px: string;
  hint: string;
}

const BREAKPOINTS: Breakpoint[] = [
  { utility: 'sm', minWidth: 640, px: '640px', hint: 'Phones in landscape, small tablets' },
  { utility: 'md', minWidth: 768, px: '768px', hint: 'Tablets and split-view laptops' },
  { utility: 'lg', minWidth: 1024, px: '1024px', hint: 'Desktops, default sidebar layout' },
  { utility: 'xl', minWidth: 1280, px: '1280px', hint: 'Wide desktops, content-rich admin' },
  { utility: '2xl', minWidth: 1536, px: '1536px', hint: 'Ultra-wide / 4K' },
];

function useViewportWidth(): number | null {
  const [width, setWidth] = useState<number | null>(() =>
    typeof window === 'undefined' ? null : window.innerWidth,
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

function activeBreakpoint(width: number | null): string {
  if (width == null) return 'unknown';
  let active = 'base';
  for (const bp of BREAKPOINTS) {
    if (width >= bp.minWidth) active = bp.utility;
  }
  return active;
}

export default function BreakpointsPage() {
  const { t } = useTranslation();
  const width = useViewportWidth();
  const active = activeBreakpoint(width);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('tokens.breakpoints.title', 'Breakpoints')}
        description={t(
          'tokens.breakpoints.subtitle',
          'Mobile-first responsive scale. Utilities apply at the listed min-width — design narrowest first, then add `sm:`, `md:`, … prefixes.',
        )}
      />

      <ShowcaseSection
        title="Current viewport"
        description="Resize the browser to see the active breakpoint update live."
      >
        <div className="w-full space-y-2">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold tabular-nums text-foreground">
              {width != null ? `${width}px` : '—'}
            </span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {active}
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1 text-center">
            {BREAKPOINTS.map((bp) => (
              <div
                key={bp.utility}
                className={cn(
                  'rounded-md border px-2 py-1.5 text-xs',
                  active === bp.utility
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-muted/30 text-muted-foreground',
                )}
              >
                {bp.utility}
                <div className="text-[10px]">{bp.px}</div>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Scale"
        description="Default Tailwind breakpoints. Use these prefixes inline (`md:flex`, `lg:grid-cols-3`)."
      >
        <div className="w-full space-y-2">
          {BREAKPOINTS.map((bp) => (
            <div
              key={bp.utility}
              className="flex items-center gap-3 border-b border-dashed border-border pb-2 last:border-b-0"
            >
              <code className="min-w-[3rem] text-xs text-muted-foreground">{bp.utility}:</code>
              <code className="min-w-[5rem] text-xs text-muted-foreground">≥ {bp.px}</code>
              <span className="text-sm text-foreground">{bp.hint}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Container demo"
        description="Same grid renders 1 column on mobile, 2 from `md`, 3 from `lg`."
      >
        <div className="w-full grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="rounded-md border border-border bg-muted/30 p-4 text-sm text-muted-foreground"
            >
              Card #{i + 1}
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </div>
  );
}
