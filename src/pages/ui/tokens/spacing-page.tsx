import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';

const SPACING_STEPS = [0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32];

const SPACING_REM_BY_STEP: Record<number, string> = {
  0: '0px',
  0.5: '0.125rem / 2px',
  1: '0.25rem / 4px',
  1.5: '0.375rem / 6px',
  2: '0.5rem / 8px',
  3: '0.75rem / 12px',
  4: '1rem / 16px',
  5: '1.25rem / 20px',
  6: '1.5rem / 24px',
  8: '2rem / 32px',
  10: '2.5rem / 40px',
  12: '3rem / 48px',
  16: '4rem / 64px',
  20: '5rem / 80px',
  24: '6rem / 96px',
  32: '8rem / 128px',
};

/**
 * Tailwind's JIT scans class strings statically, so `gap-${step}` templates
 * never get emitted. Keep gap utilities as a literal whitelist.
 */
const GAP_DEMOS: Array<{ step: number; className: string }> = [
  { step: 1, className: 'gap-1' },
  { step: 2, className: 'gap-2' },
  { step: 3, className: 'gap-3' },
  { step: 4, className: 'gap-4' },
  { step: 6, className: 'gap-6' },
  { step: 8, className: 'gap-8' },
];

const SPACING_WIDTH_BY_STEP: Record<number, string> = {
  0: 'w-0',
  0.5: 'w-0.5',
  1: 'w-1',
  1.5: 'w-1.5',
  2: 'w-2',
  3: 'w-3',
  4: 'w-4',
  5: 'w-5',
  6: 'w-6',
  8: 'w-8',
  10: 'w-10',
  12: 'w-12',
  16: 'w-16',
  20: 'w-20',
  24: 'w-24',
  32: 'w-32',
};

export default function SpacingPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <PageHeader
        title={t('tokens.spacing.title', 'Spacing')}
        description={t(
          'tokens.spacing.subtitle',
          'Tailwind spacing scale on a 4-pt rhythm. Use the same step for paddings, gaps, and margins to keep visual cadence.',
        )}
      />

      <ShowcaseSection
        title="Scale"
        description="Each step represents 0.25rem (4px). Numbered halves (.5, 1.5) bridge dense layouts."
      >
        <div className="w-full space-y-2">
          {SPACING_STEPS.map((step) => (
            <div key={step} className="flex items-center gap-3">
              <code className="min-w-[3rem] text-xs text-muted-foreground">{step}</code>
              <code className="min-w-[10rem] text-xs text-muted-foreground">
                {SPACING_REM_BY_STEP[step]}
              </code>
              <div
                className={`h-3 ${SPACING_WIDTH_BY_STEP[step]} rounded-sm bg-primary`}
                aria-hidden
              />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Gap utilities"
        description="`gap-N` between flex/grid children mirrors the same scale."
      >
        <div className="w-full grid gap-3 sm:grid-cols-2">
          {GAP_DEMOS.map(({ step, className }) => (
            <div key={step} className="space-y-1">
              <code className="text-xs text-muted-foreground">gap-{step}</code>
              <div
                className={`flex flex-wrap rounded-md border border-dashed border-border p-2 ${className}`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="h-6 w-6 rounded bg-primary/80" aria-hidden />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Padding rhythm"
        description="Recommended padding for common surfaces — keeps consistent breathing room."
      >
        <div className="w-full grid gap-3 sm:grid-cols-3">
          <div className="space-y-1">
            <code className="text-xs text-muted-foreground">p-3 — table cell, list row</code>
            <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">Compact</div>
          </div>
          <div className="space-y-1">
            <code className="text-xs text-muted-foreground">p-4 — card body, dialog</code>
            <div className="rounded-md border border-border bg-muted/30 p-4 text-sm">Default</div>
          </div>
          <div className="space-y-1">
            <code className="text-xs text-muted-foreground">p-6 — section, hero block</code>
            <div className="rounded-md border border-border bg-muted/30 p-6 text-sm">Spacious</div>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
