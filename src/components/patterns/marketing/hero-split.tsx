import * as React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface HeroSplitProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  primaryCta?: { label: React.ReactNode; href: string };
  secondaryCta?: { label: React.ReactNode; href: string };
  media?: React.ReactNode;
}

/**
 * Split hero — copy left, media right (stacks on mobile).
 */
export function HeroSplit({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  media,
  className,
  ...props
}: HeroSplitProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden border-b border-border bg-background px-6 py-16 md:py-24',
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--color-primary-hsl,205_70%_37%)/0.12),transparent_55%)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          {eyebrow ? (
            <Badge variant="secondary" className="w-fit">
              {eyebrow}
            </Badge>
          ) : null}
          <h1 className="text-display text-balance text-foreground">{title}</h1>
          <p className="max-w-xl text-body text-muted-foreground">{description}</p>
          <div className="flex flex-wrap gap-3">
            {primaryCta ? (
              <Button asChild size="lg">
                <Link to={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button asChild variant="outline" size="lg">
                <Link to={secondaryCta.href}>{secondaryCta.label}</Link>
              </Button>
            ) : null}
          </div>
        </div>
        {media ? <div className="relative">{media}</div> : null}
      </div>
    </section>
  );
}
