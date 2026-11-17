import * as React from 'react';
import { HexColorPicker } from 'react-colorful';
import { cn } from '@/lib/cn';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const RECENT_KEY = 'tailtheme-color-picker-recents';
const MAX_RECENTS = 8;

function readRecents(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function pushRecent(hex: string): string[] {
  const normalized = hex.toLowerCase();
  const next = [normalized, ...readRecents().filter((c) => c !== normalized)].slice(0, MAX_RECENTS);
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  }
  return next;
}

export interface ColorPickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (hex: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Lightweight HEX color picker (react-colorful) with recent swatches.
 */
export function ColorPicker({
  value,
  defaultValue = '#1b6ca1',
  onChange,
  label = 'Color',
  disabled,
  className,
}: ColorPickerProps) {
  const [internal, setInternal] = React.useState(defaultValue);
  const [recents, setRecents] = React.useState<string[]>(() => readRecents());
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;

  const commit = (hex: string) => {
    if (!isControlled) setInternal(hex);
    onChange?.(hex);
    setRecents(pushRecent(hex));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn('w-full justify-start gap-2 font-normal', className)}
          aria-label={label}
        >
          <span
            className="h-5 w-5 shrink-0 rounded-md border border-border"
            style={{ backgroundColor: current }}
            aria-hidden
          />
          <span className="font-mono text-sm">{current}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 space-y-3 p-3" align="start">
        <HexColorPicker color={current} onChange={commit} className="!w-full" />
        <Field>
          <Label htmlFor="color-picker-hex" className="text-xs">
            HEX
          </Label>
          <Input
            id="color-picker-hex"
            value={current}
            onChange={(e) => {
              const next = e.target.value;
              if (/^#[0-9A-Fa-f]{0,6}$/.test(next)) commit(next);
            }}
            className="font-mono"
          />
        </Field>
        {recents.length > 0 ? (
          <Field>
            <p className="text-xs font-medium text-muted-foreground">Recent</p>
            <SwatchRow>
              {recents.map((hex) => (
                <button
                  key={hex}
                  type="button"
                  className="h-6 w-6 rounded-md border border-border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={{ backgroundColor: hex }}
                  aria-label={`Use ${hex}`}
                  onClick={() => commit(hex)}
                />
              ))}
            </SwatchRow>
          </Field>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}
ColorPicker.displayName = 'ColorPicker';

function Field({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1.5">{children}</div>;
}

function SwatchRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-1.5">{children}</div>;
}
