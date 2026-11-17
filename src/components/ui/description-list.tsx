import * as React from 'react';
import { cn } from '@/lib/cn';

export interface DescriptionListItem {
  term: React.ReactNode;
  description: React.ReactNode;
}

export interface DescriptionListProps extends React.HTMLAttributes<HTMLDListElement> {
  items: DescriptionListItem[];
  /** Stack term above description on narrow viewports. Default `responsive`. */
  layout?: 'stacked' | 'inline' | 'responsive';
}

const rowLayout: Record<NonNullable<DescriptionListProps['layout']>, string> = {
  stacked: 'flex flex-col gap-1',
  inline: 'grid grid-cols-[minmax(8rem,30%)_1fr] items-baseline gap-4',
  responsive:
    'flex flex-col gap-1 sm:grid sm:grid-cols-[minmax(8rem,30%)_1fr] sm:items-baseline sm:gap-4',
};

/**
 * Key–value list for detail panels (profile, order summary, settings).
 */
export function DescriptionList({
  items,
  layout = 'responsive',
  className,
  ...props
}: DescriptionListProps) {
  return (
    <dl
      className={cn('divide-y divide-border rounded-lg border border-border bg-card', className)}
      {...props}
    >
      {items.map((item, index) => (
        <DescriptionRow key={index} layout={layout}>
          <dt className="text-sm font-medium text-muted-foreground">{item.term}</dt>
          <dd className="text-sm text-foreground">{item.description}</dd>
        </DescriptionRow>
      ))}
    </dl>
  );
}

function DescriptionRow({
  layout,
  children,
}: {
  layout: NonNullable<DescriptionListProps['layout']>;
  children: React.ReactNode;
}) {
  return <div className={cn('px-4 py-3', rowLayout[layout])}>{children}</div>;
}
