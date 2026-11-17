import * as React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface HeroCenteredProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  primaryCta?: { label: React.ReactNode; href: string };
  secondaryCta?: { label: React.ReactNode; href: string };
}

/** Centered hero with optional gradient backdrop — default landing style. */
export function HeroCentered({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  className,
  ...props
}: HeroCenteredProps) {
  return (
    <section
      className={cn('relative overflow-hidden px-6 py-20 text-center md:py-32', className)}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,hsl(var(--color-primary-hsl,205_70%_37%)/0.15),transparent_60%)]"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
        {eyebrow ? (
          <Badge variant="secondary" className="w-fit">
            {eyebrow}
          </Badge>
        ) : null}
        <h1 className="text-display text-balance text-foreground">{title}</h1>
        <p className="max-w-xl text-pretty text-body text-muted-foreground">{description}</p>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
          {primaryCta ? (
            <Button asChild size="lg">
              <Link to={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
          ) : null}
          {secondaryCta ? (
            <Button asChild size="lg" variant="outline">
              <Link to={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
