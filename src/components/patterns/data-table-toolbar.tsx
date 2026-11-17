import * as React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Input, type InputProps } from '@/components/ui/input';

export interface DataTableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Placeholder & value for the left-side search input. */
  search?: {
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    inputProps?: Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'placeholder'>;
  };
  /** Filter controls (e.g. Select, dropdowns). */
  filters?: React.ReactNode;
  /** Right-aligned view options (e.g. column toggles, exports). */
  viewOptions?: React.ReactNode;
}

export const DataTableToolbar = React.forwardRef<HTMLDivElement, DataTableToolbarProps>(
  ({ search, filters, viewOptions, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {search ? (
          <Input
            leftIcon={<Search className="h-4 w-4" />}
            placeholder={search.placeholder}
            value={search.value}
            defaultValue={search.defaultValue}
            onChange={(event) => search.onChange?.(event.target.value)}
            className="w-full sm:max-w-xs"
            clearable
            {...search.inputProps}
          />
        ) : null}
        {filters ? <div className="flex flex-wrap items-center gap-2">{filters}</div> : null}
      </div>
      {viewOptions ? (
        <div className="flex flex-shrink-0 items-center gap-2">{viewOptions}</div>
      ) : null}
    </div>
  ),
);
DataTableToolbar.displayName = 'DataTableToolbar';
