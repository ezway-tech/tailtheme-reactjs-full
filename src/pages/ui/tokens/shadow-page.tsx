import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { cn } from '@/lib/cn';

interface ShadowRow {
  className: string;
  utility: string;
  hint: string;
}

const SHADOWS: ShadowRow[] = [
  { className: 'shadow-none', utility: 'shadow-none', hint: 'Flat surfaces inside cards' },
  { className: 'shadow-sm', utility: 'shadow-sm', hint: 'Buttons, badges, hover boost' },
  { className: 'shadow', utility: 'shadow', hint: 'Cards on neutral background' },
  { className: 'shadow-md', utility: 'shadow-md', hint: 'Dropdowns, popovers' },
  { className: 'shadow-lg', utility: 'shadow-lg', hint: 'Dialog frames, sticky toolbars' },
  { className: 'shadow-xl', utility: 'shadow-xl', hint: 'Hero overlays, marketing peaks' },
  { className: 'shadow-2xl', utility: 'shadow-2xl', hint: 'Modals, focused popouts' },
  { className: 'shadow-inner', utility: 'shadow-inner', hint: 'Pressed/inset surfaces' },
];

export default function ShadowPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <PageHeader
        title={t('tokens.shadow.title', 'Shadow / Elevation')}
        description={t(
          'tokens.shadow.subtitle',
          'Elevation hints depth. Use sparingly — pair with `bg-card` or `bg-popover`. Dark mode reduces shadow opacity automatically.',
        )}
      />

      <ShowcaseSection title="Scale" description="Same swatch under each elevation step.">
        <div className="w-full grid grid-cols-2 gap-6 bg-muted/20 p-6 sm:grid-cols-4">
          {SHADOWS.map((row) => (
            <div key={row.utility} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  'h-16 w-16 rounded-md border border-border bg-background',
                  row.className,
                )}
                aria-hidden
              />
              <code className="text-xs text-foreground">{row.utility}</code>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="When to elevate"
        description="Map elevation to UI hierarchy — overlapping surfaces should cast bigger shadows."
      >
        <div className="w-full space-y-2">
          {SHADOWS.map((row) => (
            <div
              key={row.utility}
              className="flex items-center gap-3 border-b border-dashed border-border pb-2 last:border-b-0"
            >
              <code className="min-w-[8rem] text-xs text-muted-foreground">{row.utility}</code>
              <span className="text-sm text-foreground">{row.hint}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Light vs dark mode"
        description="On dark themes, shadows should feel like ambient glow rather than hard cast."
      >
        <div className="w-full grid gap-4 sm:grid-cols-2">
          <div className="rounded-md border border-border bg-background p-6">
            <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
              On `bg-background`
            </p>
            <div className="grid grid-cols-3 gap-3">
              {(['shadow-sm', 'shadow-md', 'shadow-lg'] as const).map((cls) => (
                <div
                  key={cls}
                  className={cn('h-12 w-12 rounded-md border border-border bg-card', cls)}
                  aria-hidden
                />
              ))}
            </div>
          </div>
          <div className="rounded-md border border-border bg-muted p-6">
            <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
              On `bg-muted`
            </p>
            <div className="grid grid-cols-3 gap-3">
              {(['shadow-sm', 'shadow-md', 'shadow-lg'] as const).map((cls) => (
                <div
                  key={cls}
                  className={cn('h-12 w-12 rounded-md border border-border bg-card', cls)}
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
