import * as React from 'react';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/badge';
import { NewsletterForm } from './newsletter-form';

export interface HeroEmailCaptureProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}

/** Centered hero with inline newsletter capture (RHF + zod). */
export function HeroEmailCapture({
  eyebrow,
  title,
  description,
  className,
  ...props
}: HeroEmailCaptureProps) {
  return (
    <section className={cn('border-b border-border px-6 py-20 md:py-28', className)} {...props}>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        {eyebrow ? <Badge variant="secondary">{eyebrow}</Badge> : null}
        <h1 className="text-display text-balance">{title}</h1>
        <p className="text-body text-muted-foreground">{description}</p>
        <NewsletterForm className="w-full max-w-md" />
        <p className="text-caption text-muted-foreground">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
