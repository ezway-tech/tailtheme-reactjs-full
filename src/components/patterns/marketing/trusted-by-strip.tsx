import { cn } from '@/lib/cn';

const DEFAULT_LOGOS = ['Acme', 'Northwind', 'Globex', 'Initech', 'Umbrella', 'Stark'];

export interface TrustedByStripProps {
  title?: string;
  logos?: string[];
  className?: string;
}

/**
 * Greyscale logo strip for social proof below the hero.
 */
export function TrustedByStrip({
  title = 'Trusted by teams shipping with TailTheme',
  logos = DEFAULT_LOGOS,
  className,
}: TrustedByStripProps) {
  return (
    <section className={cn('border-b border-border bg-muted/30 px-6 py-10', className)}>
      <p className="mb-6 text-center text-caption uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <ul className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {logos.map((name) => (
          <li
            key={name}
            className="text-lg font-semibold text-muted-foreground/60 grayscale select-none"
          >
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
