import * as React from 'react';
import { HeroSplit, type HeroSplitProps } from './hero-split';

export interface HeroScreenshotProps extends HeroSplitProps {
  screenshotLabel?: string;
}

/** Split hero with a framed product screenshot placeholder. */
export function HeroScreenshot({
  screenshotLabel = 'Dashboard preview',
  media,
  ...props
}: HeroScreenshotProps) {
  const frame = media ?? (
    <div
      className="overflow-hidden rounded-xl border border-border bg-card shadow-lg"
      role="img"
      aria-label={screenshotLabel}
    >
      <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/80" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-warning/80" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-success/80" aria-hidden />
        <span className="ml-2 text-caption text-muted-foreground">{screenshotLabel}</span>
      </div>
      <div className="aspect-video bg-gradient-to-br from-primary/10 via-muted to-accent/10" />
    </div>
  );

  return <HeroSplit media={frame} {...props} />;
}
