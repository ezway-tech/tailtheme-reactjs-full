import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';

export interface CtaSectionProps {
  title: string;
  description?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
}

/**
 * Full-width CTA band for landing and pricing pages.
 */
export function CtaSection({
  title,
  description,
  primaryCta,
  secondaryCta,
  className,
}: CtaSectionProps) {
  return (
    <section
      className={cn(
        'mx-6 mb-16 rounded-2xl border border-border bg-primary px-6 py-12 text-center text-primary-foreground md:py-16',
        className,
      )}
    >
      <h2 className="text-h2 text-balance">{title}</h2>
      {description ? (
        <p className="mx-auto mt-3 max-w-xl text-body opacity-90">{description}</p>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg" variant="secondary">
          <Link to={primaryCta.href}>{primaryCta.label}</Link>
        </Button>
        {secondaryCta ? (
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Link to={secondaryCta.href}>{secondaryCta.label}</Link>
          </Button>
        ) : null}
      </div>
    </section>
  );
}
