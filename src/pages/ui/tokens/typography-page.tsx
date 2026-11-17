import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';

interface ScaleRow {
  utility: string;
  rem: string;
  className: string;
}

const TYPE_SCALE: ScaleRow[] = [
  { utility: 'text-xs', rem: '0.75rem / 12px', className: 'text-xs' },
  { utility: 'text-sm', rem: '0.875rem / 14px', className: 'text-sm' },
  { utility: 'text-base', rem: '1rem / 16px', className: 'text-base' },
  { utility: 'text-lg', rem: '1.125rem / 18px', className: 'text-lg' },
  { utility: 'text-xl', rem: '1.25rem / 20px', className: 'text-xl' },
  { utility: 'text-2xl', rem: '1.5rem / 24px', className: 'text-2xl' },
  { utility: 'text-3xl', rem: '1.875rem / 30px', className: 'text-3xl' },
  { utility: 'text-4xl', rem: '2.25rem / 36px', className: 'text-4xl' },
  { utility: 'text-5xl', rem: '3rem / 48px', className: 'text-5xl' },
  { utility: 'text-6xl', rem: '3.75rem / 60px', className: 'text-6xl' },
];

const WEIGHTS: ScaleRow[] = [
  { utility: 'font-light', rem: '300', className: 'font-light' },
  { utility: 'font-normal', rem: '400', className: 'font-normal' },
  { utility: 'font-medium', rem: '500', className: 'font-medium' },
  { utility: 'font-semibold', rem: '600', className: 'font-semibold' },
  { utility: 'font-bold', rem: '700', className: 'font-bold' },
];

interface StyleDecorationRow {
  utility: string;
  className: string;
  sample: string;
}

const STYLE_DECORATION: StyleDecorationRow[] = [
  {
    utility: 'italic',
    className: 'italic text-base',
    sample: 'Italic for emphasis, titles of works, or UI hints.',
  },
  {
    utility: 'not-italic',
    className: 'not-italic text-base font-medium',
    sample: 'Inside italic parent, this span resets to upright.',
  },
  {
    utility: 'underline',
    className: 'underline underline-offset-4 text-base',
    sample: 'Underline with comfortable offset (links).',
  },
  {
    utility: 'line-through',
    className: 'line-through text-base text-muted-foreground',
    sample: 'Strikethrough for deprecated or completed items.',
  },
  {
    utility: 'uppercase + tracking',
    className: 'text-xs font-semibold uppercase tracking-wider text-muted-foreground',
    sample: 'Eyebrow · section label',
  },
  {
    utility: 'capitalize',
    className: 'capitalize text-base',
    sample: 'title case for buttons and labels',
  },
  {
    utility: 'tabular-nums',
    className: 'tabular-nums text-base font-medium',
    sample: '01:08:42  ·  1,234.50',
  },
];

export default function TypographyPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <PageHeader
        title={t('tokens.typography.title', 'Typography')}
        description={t(
          'tokens.typography.subtitle',
          'Font scale, weights, italics, common decorations, line-heights and the default heading hierarchy.',
        )}
      />

      <ShowcaseSection
        title="Font scale"
        description="Each step doubles roughly every 4 sizes. Use semantic levels (Display / Heading / Body / Caption) instead of the raw utility when possible."
      >
        <div className="w-full space-y-3">
          {TYPE_SCALE.map((row) => (
            <div
              key={row.utility}
              className="flex flex-wrap items-baseline gap-3 border-b border-dashed border-border pb-2 last:border-b-0"
            >
              <code className="min-w-[5.5rem] text-xs text-muted-foreground">{row.utility}</code>
              <code className="min-w-[8rem] text-xs text-muted-foreground">{row.rem}</code>
              <span className={row.className}>The quick brown fox</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Heading hierarchy" description="Default sans-serif stack.">
        <div className="w-full space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">Heading 1 — Display</h1>
          <h2 className="text-3xl font-semibold tracking-tight">Heading 2 — Section</h2>
          <h3 className="text-2xl font-semibold">Heading 3 — Subsection</h3>
          <h4 className="text-xl font-medium">Heading 4 — Card title</h4>
          <h5 className="text-lg font-medium">Heading 5 — Group label</h5>
          <h6 className="text-base font-medium">Heading 6 — Inline header</h6>
          <p className="text-base text-foreground">
            Body / base — used for paragraphs and primary copy.
          </p>
          <p className="text-sm text-muted-foreground">
            Small muted / sm — descriptions, helpers, table cells.
          </p>
          <p className="text-xs text-muted-foreground">
            Caption / xs — timestamps, labels, microcopy.
          </p>
          <p className="font-mono text-sm text-foreground">
            Mono — `font-mono` for code, IDs, command snippets.
          </p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Weights">
        <div className="w-full grid gap-2 sm:grid-cols-2">
          {WEIGHTS.map((row) => (
            <div key={row.utility} className="flex items-baseline gap-3">
              <code className="min-w-[7rem] text-xs text-muted-foreground">{row.utility}</code>
              <code className="min-w-[3rem] text-xs text-muted-foreground">{row.rem}</code>
              <span className={`${row.className} text-base`}>Quick brown fox</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Italic, decoration & case"
        description="Inter italic is loaded with the UI stack. Combine utilities for links, labels, and dense numeric columns."
      >
        <div className="w-full space-y-4">
          <div className="w-full space-y-2">
            {STYLE_DECORATION.filter((row) => row.utility !== 'not-italic').map((row) => (
              <div
                key={row.utility}
                className="flex flex-wrap items-baseline gap-3 border-b border-dashed border-border pb-2 last:border-b-0"
              >
                <code className="min-w-[10rem] max-w-[12rem] shrink-0 text-xs text-muted-foreground">
                  {row.utility}
                </code>
                <code className="hidden min-w-[14rem] text-xs text-muted-foreground sm:inline">
                  {row.className}
                </code>
                <span className={row.className}>{row.sample}</span>
              </div>
            ))}
          </div>
          <div className="space-y-1 rounded-md border border-border bg-muted/30 px-3 py-2">
            <code className="text-xs text-muted-foreground">italic parent → not-italic child</code>
            <p className="italic text-base text-foreground">
              This paragraph is italic.{' '}
              <span className="not-italic font-medium text-foreground">
                {STYLE_DECORATION.find((r) => r.utility === 'not-italic')?.sample ??
                  'Inside italic parent, this span resets to upright.'}
              </span>
            </p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Line-height & tracking">
        <div className="w-full grid gap-3 lg:grid-cols-2">
          <div className="space-y-1">
            <code className="text-xs text-muted-foreground">leading-tight (1.25)</code>
            <p className="text-sm leading-tight">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="space-y-1">
            <code className="text-xs text-muted-foreground">leading-relaxed (1.625)</code>
            <p className="text-sm leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="space-y-1">
            <code className="text-xs text-muted-foreground">tracking-tight (-0.025em)</code>
            <p className="text-2xl font-semibold tracking-tight">Display heading</p>
          </div>
          <div className="space-y-1">
            <code className="text-xs text-muted-foreground">tracking-wider (0.05em)</code>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Group · Section · Caption
            </p>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
