import * as React from 'react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useDateRangePresets, type DateRangePresetId } from '@/hooks/use-date-range-presets';
import { Button } from './button';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface DateRangePickerProps {
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  formatStr?: string;
  numberOfMonths?: number;
  showPresets?: boolean;
}

function formatRangeLabel(range: DateRange | undefined, formatStr: string): string {
  if (!range?.from) return '';
  if (!range.to) return format(range.from, formatStr);
  return `${format(range.from, formatStr)} – ${format(range.to, formatStr)}`;
}

/**
 * Date range picker with optional preset rail (Today, Last 7 days, …).
 */
export function DateRangePicker({
  value,
  defaultValue,
  onChange,
  placeholder = 'Pick a date range',
  disabled,
  className,
  formatStr = 'MMM d, yyyy',
  numberOfMonths = 2,
  showPresets = true,
}: DateRangePickerProps) {
  const { presets, getRange } = useDateRangePresets();
  const [internal, setInternal] = React.useState<DateRange | undefined>(defaultValue);
  const [activePreset, setActivePreset] = React.useState<DateRangePresetId>('custom');
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const handleSelect = (next: DateRange | undefined) => {
    setActivePreset('custom');
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const handlePreset = (id: DateRangePresetId) => {
    if (id === 'custom') {
      setActivePreset('custom');
      return;
    }
    const next = getRange(id);
    setActivePreset(id);
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const label = formatRangeLabel(current, formatStr);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            'min-w-[260px] justify-start text-left font-normal',
            !label && 'text-muted-foreground',
            className,
          )}
        >
          <CalendarIcon className="h-4 w-4" />
          {label || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {showPresets ? (
          <PresetRail>
            {presets.map((preset) => (
              <Button
                key={preset.id}
                type="button"
                size="sm"
                variant={activePreset === preset.id ? 'default' : 'ghost'}
                className="h-8 shrink-0 rounded-full px-3 text-xs"
                onClick={() => handlePreset(preset.id)}
              >
                {preset.label}
              </Button>
            ))}
          </PresetRail>
        ) : null}
        <Calendar
          mode="range"
          selected={current}
          onSelect={handleSelect}
          numberOfMonths={numberOfMonths}
          defaultMonth={current?.from}
        />
      </PopoverContent>
    </Popover>
  );
}
DateRangePicker.displayName = 'DateRangePicker';

function PresetRail({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-1 border-b border-border p-2">{children}</div>;
}
