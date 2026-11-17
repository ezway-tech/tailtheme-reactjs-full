import * as React from 'react';
import { cn } from '@/lib/cn';

export interface TocEntry {
  id: string;
  label: string;
}

export interface TocStickyProps {
  entries: TocEntry[];
  className?: string;
}

/**
 * Sticky table of contents for long legal / docs prose pages.
 */
export function TocSticky({ entries, className }: TocStickyProps) {
  const [active, setActive] = React.useState(entries[0]?.id ?? '');

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    entries.forEach((entry) => {
      const el = document.getElementById(entry.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([hit]) => {
          if (hit?.isIntersecting) setActive(entry.id);
        },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [entries]);

  return (
    <nav aria-label="On this page" className={cn('sticky top-24 hidden lg:block', className)}>
      <p className="text-label font-semibold text-foreground">On this page</p>
      <ul className="mt-4 space-y-0.5 text-sm">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              className={cn(
                'block rounded-md border-l-[3px] py-2.5 pl-5 pr-2 leading-relaxed transition-colors',
                active === entry.id
                  ? 'border-primary bg-primary/10 font-medium text-text-brand'
                  : 'border-transparent text-foreground/80 hover:border-border hover:bg-muted/50',
              )}
            >
              {entry.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
