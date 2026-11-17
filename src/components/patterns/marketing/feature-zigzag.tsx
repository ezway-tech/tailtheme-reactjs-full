import type * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface ZigzagFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: React.ReactNode;
}

export interface FeatureZigzagProps {
  items: ZigzagFeature[];
  className?: string;
}

/**
 * Alternating image + copy rows for feature storytelling.
 */
export function FeatureZigzag({ items, className }: FeatureZigzagProps) {
  return (
    <section className={cn('space-y-16 px-6 py-16 md:py-20', className)}>
      {items.map((item, index) => {
        const Icon = item.icon;
        const reversed = index % 2 === 1;
        return (
          <div
            key={item.title}
            className={cn(
              'mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-12',
              reversed && 'lg:[&>div:first-child]:order-2',
            )}
          >
            <div className="flex aspect-video items-center justify-center rounded-xl border border-border bg-muted/50">
              {item.image ?? <Icon className="h-12 w-12 text-primary/60" aria-hidden />}
            </div>
            <div>
              <h3 className="text-h3">{item.title}</h3>
              <p className="mt-3 text-body text-muted-foreground">{item.description}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
