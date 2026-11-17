import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { cn } from '@/lib/cn';

interface RadiusRow {
  className: string;
  utility: string;
  px: string;
  hint: string;
}

const RADII: RadiusRow[] = [
  { className: 'rounded-none', utility: 'rounded-none', px: '0', hint: 'Sharp surfaces, badges' },
  { className: 'rounded-sm', utility: 'rounded-sm', px: '2px', hint: 'Inputs in dense forms' },
  { className: 'rounded', utility: 'rounded', px: '4px', hint: 'Default for inline tags' },
  { className: 'rounded-md', utility: 'rounded-md', px: '6px', hint: 'Buttons, alerts' },
  { className: 'rounded-lg', utility: 'rounded-lg', px: '8px', hint: 'Cards, dialogs' },
  { className: 'rounded-xl', utility: 'rounded-xl', px: '12px', hint: 'Hero sections, panels' },
  { className: 'rounded-2xl', utility: 'rounded-2xl', px: '16px', hint: 'Marketing blocks' },
  { className: 'rounded-3xl', utility: 'rounded-3xl', px: '24px', hint: 'Pill rows, avatars XL' },
  { className: 'rounded-full', utility: 'rounded-full', px: '∞', hint: 'Avatars, dot indicators' },
];

export default function RadiusPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <PageHeader
        title={t('tokens.radius.title', 'Radius')}
        description={t(
          'tokens.radius.subtitle',
          'Border-radius scale. Rounded primitives use `--radius` (resolved to `rounded-md` by default) — change globals.css to retheme.',
        )}
      />

      <ShowcaseSection title="Scale" description="Compare every step on the same fill swatch.">
        <div className="w-full grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
          {RADII.map((row) => (
            <div key={row.utility} className="flex flex-col items-center gap-2">
              <div className={cn('h-16 w-16 bg-primary shadow-sm', row.className)} aria-hidden />
              <code className="text-xs text-foreground">{row.utility}</code>
              <code className="text-[10px] text-muted-foreground">{row.px}</code>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Where to use which"
        description="Pick a radius based on the surface size. Bigger surfaces tolerate bigger curves."
      >
        <div className="w-full space-y-2">
          {RADII.map((row) => (
            <div
              key={row.utility}
              className="flex items-center gap-3 border-b border-dashed border-border pb-2 last:border-b-0"
            >
              <code className="min-w-[8rem] text-xs text-muted-foreground">{row.utility}</code>
              <code className="min-w-[3rem] text-xs text-muted-foreground">{row.px}</code>
              <span className="text-sm text-foreground">{row.hint}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="On real components">
        <div className="w-full grid gap-3 sm:grid-cols-3">
          <Button>Button (rounded-md)</Button>
          <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
            <p className="text-sm font-medium">Card (rounded-lg)</p>
            <p className="text-xs text-muted-foreground">Default elevation surface.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
            Pill / chip (rounded-full)
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
