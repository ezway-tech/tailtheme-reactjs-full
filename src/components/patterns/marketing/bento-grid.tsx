import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface BentoMetric {
  label: string;
  value: string;
}

export interface BentoItem {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  /** When set on the first cell, renders compact stat chips under the copy (no stretched side column). */
  metrics?: BentoMetric[];
}

export interface BentoGridProps {
  title?: string;
  items: BentoItem[];
  className?: string;
}

/**
 * Bento-style feature grid with varied cell spans.
 */
export function BentoGrid({ title, items, className }: BentoGridProps) {
  return (
    <section className={cn('px-6 py-16 md:py-20', className)}>
      <div className="mx-auto max-w-6xl">
        {title ? <h2 className="text-h2 mb-8 text-center">{title}</h2> : null}
        <ul className="grid auto-rows-[minmax(0,auto)] gap-6 md:grid-cols-3">
          {items.map((item, index) => {
            const Icon = item.icon;
            const span =
              index === 0 ? 'md:col-span-2 md:row-span-2' : index === 3 ? 'md:col-span-2' : '';
            const isHero = index === 0 && Boolean(item.metrics?.length);

            return (
              <li
                key={item.title}
                className={cn(
                  'rounded-xl border border-input bg-card shadow-sm',
                  isHero ? 'p-5 md:p-6' : 'p-6',
                  isHero ? 'flex flex-col gap-5' : 'flex flex-col gap-4',
                  span,
                  item.className,
                )}
              >
                {isHero ? (
                  <>
                    <div className="flex min-w-0 items-start gap-3">
                      <Icon className="h-8 w-8 shrink-0 text-primary" aria-hidden />
                      <div className="min-w-0 space-y-2">
                        <h3 className="font-semibold leading-snug text-foreground">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <ul className="flex min-w-0 flex-wrap gap-2.5">
                      {item.metrics!.map((m) => (
                        <li
                          key={m.label}
                          className="min-w-[7.5rem] flex-1 rounded-lg border border-input bg-muted/50 px-3 py-2.5 shadow-sm sm:flex-none sm:min-w-[8.25rem]"
                        >
                          <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                            {m.label}
                          </p>
                          <p className="mt-0.5 text-xl font-semibold tabular-nums leading-none text-foreground">
                            {m.value}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <Icon className="h-8 w-8 shrink-0 text-primary" aria-hidden />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
