import * as React from 'react';
import { cn } from '@/lib/cn';

export interface SelectableCardProps extends Omit<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  'title'
> {
  name: string;
  value: string;
  type?: 'radio' | 'checkbox';
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  price?: React.ReactNode;
  badge?: React.ReactNode;
}

/**
 * Selectable pricing / plan card — hides the native input and styles the whole surface.
 */
export function SelectableCard({
  name,
  value,
  type = 'radio',
  checked,
  defaultChecked,
  onCheckedChange,
  title,
  description,
  price,
  badge,
  className,
  children,
  ...props
}: SelectableCardProps) {
  const [internal, setInternal] = React.useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const isSelected = isControlled ? checked : internal;

  return (
    <label
      className={cn(
        'relative flex cursor-pointer flex-col gap-2 rounded-xl border-2 border-border bg-card p-4 transition-all',
        'hover:border-primary/40 hover:shadow-md',
        'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2',
        isSelected && 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/20',
        className,
      )}
      {...props}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={isControlled ? checked : undefined}
        defaultChecked={isControlled ? undefined : defaultChecked}
        className="sr-only"
        onChange={(e) => {
          const next = e.target.checked;
          if (!isControlled) setInternal(next);
          onCheckedChange?.(next);
        }}
      />
      {badge ? <div className="absolute right-3 top-3">{badge}</div> : null}
      <div className="space-y-1 pr-8">
        {price ? <div className="text-2xl font-bold text-foreground">{price}</div> : null}
        <div className="font-semibold text-foreground">{title}</div>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </label>
  );
}
