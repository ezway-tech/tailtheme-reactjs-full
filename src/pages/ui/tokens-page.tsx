import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Layers, Maximize2, Palette, Ruler, Shapes, Sun, Type } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { urls } from '@/routes/urls';
import { cn } from '@/lib/cn';

interface TokenSection {
  to: string;
  titleKey: string;
  titleFallback: string;
  descriptionKey: string;
  descriptionFallback: string;
  icon: LucideIcon;
  preview: React.ReactNode;
}

const SECTIONS: TokenSection[] = [
  {
    to: urls.app.ui.tokens.colors,
    titleKey: 'tokens.colors.title',
    titleFallback: 'Colors',
    descriptionKey: 'tokens.colors.summary',
    descriptionFallback: 'Brand, semantic and neutral palette.',
    icon: Palette,
    preview: (
      <div className="flex gap-1.5">
        {(
          [
            'bg-brand',
            'bg-primary',
            'bg-accent',
            'bg-muted border border-border',
            'bg-destructive',
          ] as const
        ).map((cls) => (
          <span key={cls} className={cn('h-6 w-6 rounded', cls)} aria-hidden />
        ))}
      </div>
    ),
  },
  {
    to: urls.app.ui.tokens.presets,
    titleKey: 'tokens.presets.title',
    titleFallback: 'Theme presets',
    descriptionKey: 'tokens.presets.summary',
    descriptionFallback: '16 named presets retinting brand, status and chart channels.',
    icon: Layers,
    preview: (
      <div className="grid grid-cols-4 gap-0.5">
        {[
          'hsl(205 70% 37%)',
          'hsl(199 89% 48%)',
          'hsl(262 72% 52%)',
          'hsl(160 72% 36%)',
          'hsl(350 82% 55%)',
          'hsl(22 92% 53%)',
          'hsl(36 100% 45%)',
          'hsl(0 0% 12%)',
        ].map((c) => (
          <span key={c} className="h-2 w-2 rounded-sm" style={{ backgroundColor: c }} />
        ))}
      </div>
    ),
  },
  {
    to: urls.app.ui.tokens.typography,
    titleKey: 'tokens.typography.title',
    titleFallback: 'Typography',
    descriptionKey: 'tokens.typography.summary',
    descriptionFallback: 'Font scale, weights, italics, decoration and headings.',
    icon: Type,
    preview: (
      <div className="space-y-0.5">
        <p className="text-base font-semibold text-foreground">Aa</p>
        <p className="text-xs text-muted-foreground">12 → 60px</p>
      </div>
    ),
  },
  {
    to: urls.app.ui.tokens.spacing,
    titleKey: 'tokens.spacing.title',
    titleFallback: 'Spacing',
    descriptionKey: 'tokens.spacing.summary',
    descriptionFallback: '4-pt rhythm scale (0 → 32).',
    icon: Ruler,
    preview: (
      <div className="flex items-end gap-1">
        {[1, 2, 3, 4, 6].map((step) => (
          <span key={step} className="w-1 rounded-sm bg-primary" style={{ height: step * 4 }} />
        ))}
      </div>
    ),
  },
  {
    to: urls.app.ui.tokens.radius,
    titleKey: 'tokens.radius.title',
    titleFallback: 'Radius',
    descriptionKey: 'tokens.radius.summary',
    descriptionFallback: 'Border-radius scale & guidelines.',
    icon: Shapes,
    preview: (
      <div className="flex gap-1.5">
        <span className="h-6 w-6 rounded-sm bg-primary" />
        <span className="h-6 w-6 rounded-md bg-primary" />
        <span className="h-6 w-6 rounded-lg bg-primary" />
        <span className="h-6 w-6 rounded-full bg-primary" />
      </div>
    ),
  },
  {
    to: urls.app.ui.tokens.shadow,
    titleKey: 'tokens.shadow.title',
    titleFallback: 'Shadow / Elevation',
    descriptionKey: 'tokens.shadow.summary',
    descriptionFallback: 'Elevation scale for layering surfaces.',
    icon: Sun,
    preview: (
      <div className="flex gap-2 rounded-md bg-muted/40 p-2">
        <span className="h-5 w-5 rounded-sm bg-card shadow-sm" />
        <span className="h-5 w-5 rounded-sm bg-card shadow-md" />
        <span className="h-5 w-5 rounded-sm bg-card shadow-lg" />
      </div>
    ),
  },
  {
    to: urls.app.ui.tokens.breakpoints,
    titleKey: 'tokens.breakpoints.title',
    titleFallback: 'Breakpoints',
    descriptionKey: 'tokens.breakpoints.summary',
    descriptionFallback: 'Responsive scale (sm / md / lg / xl / 2xl).',
    icon: Maximize2,
    preview: (
      <div className="flex items-end gap-0.5">
        {[3, 5, 7, 9, 11].map((h) => (
          <span key={h} className="w-1.5 rounded-sm bg-primary" style={{ height: h * 2 }} />
        ))}
      </div>
    ),
  },
];

export default function TokensPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      <PageHeader
        title={t('tokens.title', 'Design tokens')}
        description={t(
          'tokens.subtitle',
          'CSS variables drive every theme. Pick a category below to inspect, copy and customize each token family.',
        )}
      />

      <ShowcaseSection
        title="Token families"
        description="Each card links to a dedicated reference page with previews and copyable utility names."
      >
        <div className="w-full grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            const title = t(section.titleKey, section.titleFallback);
            const description = t(section.descriptionKey, section.descriptionFallback);
            return (
              <Link
                key={section.to}
                to={section.to}
                className="group flex flex-col gap-3 rounded-md border border-border bg-background p-4 transition-colors hover:border-primary hover:bg-muted/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <ArrowRight
                    className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                    aria-hidden
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <div>{section.preview}</div>
              </Link>
            );
          })}
        </div>
      </ShowcaseSection>
    </div>
  );
}
