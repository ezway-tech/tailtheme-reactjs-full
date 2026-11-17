import * as React from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Badge } from './badge';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | undefined) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
  clearable?: boolean;
}

/**
 * Single-select combobox: filterable list in a popover (cmdk + Radix Popover).
 */
export function Combobox({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select option…',
  searchPlaceholder = 'Search…',
  emptyText = 'No results.',
  disabled,
  className,
  clearable = true,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState<string | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const selected = options.find((o) => o.value === current);

  const commit = (next: string | undefined) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn('w-full justify-between font-normal', className)}
        >
          <span className={cn('truncate', !selected && 'text-muted-foreground')}>
            {selected?.label ?? placeholder}
          </span>
          <span className="flex shrink-0 items-center gap-1">
            {clearable && current ? (
              <span
                role="button"
                tabIndex={0}
                aria-label="Clear selection"
                className="rounded-sm p-0.5 hover:bg-muted"
                onClick={(e) => {
                  e.stopPropagation();
                  commit(undefined);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    commit(undefined);
                  }
                }}
              >
                <X className="h-3.5 w-3.5" />
              </span>
            ) : null}
            <ChevronsUpDown className="h-4 w-4 opacity-50" aria-hidden />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  disabled={option.disabled}
                  onSelect={() => {
                    commit(option.value === current ? undefined : option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      current === option.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
Combobox.displayName = 'Combobox';

export interface MultiComboboxProps {
  options: ComboboxOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Multi-select combobox with dismissable chips.
 */
export function MultiCombobox({
  options,
  value,
  defaultValue = [],
  onValueChange,
  placeholder = 'Select options…',
  searchPlaceholder = 'Search…',
  emptyText = 'No results.',
  disabled,
  className,
}: MultiComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState<string[]>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const toggle = (id: string) => {
    const next = current.includes(id) ? current.filter((v) => v !== id) : [...current, id];
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  const remove = (id: string) => {
    const next = current.filter((v) => v !== id);
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn('h-auto min-h-9 w-full justify-between py-1.5 font-normal', className)}
        >
          <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1">
            {current.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              current.map((id) => {
                const opt = options.find((o) => o.value === id);
                return (
                  <Badge key={id} variant="secondary" className="gap-1 pr-1">
                    {opt?.label ?? id}
                    <button
                      type="button"
                      className="rounded-full hover:bg-muted"
                      aria-label={`Remove ${opt?.label ?? id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        remove(id);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })
            )}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  disabled={option.disabled}
                  onSelect={() => toggle(option.value)}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      current.includes(option.value) ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
MultiCombobox.displayName = 'MultiCombobox';
