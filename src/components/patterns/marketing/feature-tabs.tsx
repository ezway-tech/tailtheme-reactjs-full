import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface FeatureTabItem {
  id: string;
  label: string;
  title: string;
  description: string;
  icon?: LucideIcon;
}

export interface FeatureTabsProps {
  title?: string;
  description?: string;
  items: FeatureTabItem[];
  className?: string;
}

/** Tabbed feature explorer for marketing pages. */
export function FeatureTabs({ title, description, items, className }: FeatureTabsProps) {
  const defaultId = items[0]?.id ?? 'tab-0';

  return (
    <section className={cn('px-6 py-16 md:py-20', className)}>
      <div className="mx-auto max-w-4xl">
        {title ? (
          <div className="mb-8 text-center">
            <h2 className="text-h2 text-foreground">{title}</h2>
            {description ? (
              <p className="mt-2 text-body text-muted-foreground">{description}</p>
            ) : null}
          </div>
        ) : null}
        <Tabs defaultValue={defaultId}>
          <TabsList className="mb-6 flex w-full flex-wrap justify-center">
            {items.map((item) => (
              <TabsTrigger key={item.id} value={item.id}>
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <TabsContent
                key={item.id}
                value={item.id}
                className="rounded-lg border border-border bg-card p-8"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  {Icon ? (
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" aria-hidden />
                    </span>
                  ) : null}
                  <div>
                    <h3 className="text-h4 font-semibold">{item.title}</h3>
                    <p className="mt-2 text-body text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
