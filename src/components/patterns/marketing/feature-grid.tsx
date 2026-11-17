import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export interface FeatureGridItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  title?: string;
  description?: string;
  items: FeatureGridItem[];
  className?: string;
}

/**
 * Three-column feature grid with icon cards.
 */
export function FeatureGrid({ title, description, items, className }: FeatureGridProps) {
  return (
    <section className={cn('px-6 py-16 md:py-20', className)}>
      <div className="mx-auto max-w-6xl">
        {(title || description) && (
          <div className="mx-auto mb-12 max-w-2xl text-center">
            {title ? <h2 className="text-h2 text-foreground">{title}</h2> : null}
            {description ? (
              <p className="mt-3 text-body text-muted-foreground">{description}</p>
            ) : null}
          </div>
        )}
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <Card className="h-full border-border/80 transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="sr-only">{item.description}</CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
