import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

/**
 * Visual sizing for each pin cell. Mirrors the `Input` size scale so
 * the component blends in with surrounding form fields.
 */
export const pinInputCellVariants = cva(
  'flex items-center justify-center rounded-md border bg-card text-center font-mono font-medium tabular-nums text-foreground shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-input focus:ring-ring',
        error: 'border-danger-border bg-danger-bg text-danger-text focus:ring-danger',
      },
      size: {
        sm: 'h-9 w-9 text-sm',
        default: 'h-11 w-11 text-base',
        lg: 'h-14 w-12 text-lg',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

type PinAllowed = 'numeric' | 'alphanumeric' | 'alphabetic';

const ALLOWED_REGEX: Record<PinAllowed, RegExp> = {
  numeric: /^\d$/,
  alphanumeric: /^[\dA-Za-z]$/,
  alphabetic: /^[A-Za-z]$/,
};

export interface PinInputProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>,
    VariantProps<typeof pinInputCellVariants> {
  /** Number of cells. Common: 4 (PIN), 6 (OTP). */
  length?: number;
  /** Controlled value — joined string, e.g. `"1234"`. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Fires every keystroke with the current joined string. */
  onChange?: (value: string) => void;
  /** Fires when every cell is filled with a valid character. */
  onComplete?: (value: string) => void;
  /** Restrict the alphabet of allowed characters. Default: `'numeric'`. */
  type?: PinAllowed;
  /** Mask each cell with `•` (useful for PIN entry). */
  mask?: boolean;
  /** Disable the entire group. */
  disabled?: boolean;
  /** Mark the group as invalid (visual only). */
  error?: boolean;
  /** Auto-focus the first cell on mount. */
  autoFocus?: boolean;
  /** Forwarded to each native `<input>` element. */
  name?: string;
  /** Forwarded to each native `<input>`'s `aria-label`. */
  'aria-label'?: string;
  /** Optional separator node inserted between cells. */
  separator?: React.ReactNode;
}

/**
 * Multi-cell numeric / alphanumeric input for OTPs, MFA codes and PINs.
 * Auto-advances on input, supports backspace, arrow keys and clipboard
 * paste of the full code.
 */
export const PinInput = React.forwardRef<HTMLDivElement, PinInputProps>(
  (
    {
      length = 6,
      value: valueProp,
      defaultValue,
      onChange,
      onComplete,
      type = 'numeric',
      mask = false,
      disabled,
      error,
      autoFocus,
      name,
      'aria-label': ariaLabel,
      separator,
      size,
      variant,
      className,
      ...rest
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined;
    const initial = React.useMemo(
      () => normalizeValue(valueProp ?? defaultValue ?? '', length),
      [valueProp, defaultValue, length],
    );
    const [internal, setInternal] = React.useState<string[]>(initial);
    const inputs = React.useRef<Array<HTMLInputElement | null>>([]);
    const allowedRegex = ALLOWED_REGEX[type];
    const resolvedVariant = error ? 'error' : variant;

    const cells = isControlled ? normalizeValue(valueProp ?? '', length) : internal;

    const updateCells = React.useCallback(
      (next: string[]) => {
        if (!isControlled) setInternal(next);
        const joined = next.join('');
        onChange?.(joined);
        if (joined.length === length && next.every((c) => c.length === 1)) {
          onComplete?.(joined);
        }
      },
      [isControlled, length, onChange, onComplete],
    );

    const focusCell = (index: number) => {
      const target = inputs.current[Math.max(0, Math.min(length - 1, index))];
      target?.focus();
      target?.select();
    };

    const handleChange = (index: number, raw: string) => {
      if (raw.length === 0) {
        const next = [...cells];
        next[index] = '';
        updateCells(next);
        return;
      }
      const chars = raw.split('').filter((c) => allowedRegex.test(c));
      if (chars.length === 0) return;
      const next = [...cells];
      let cursor = index;
      for (const c of chars) {
        if (cursor >= length) break;
        next[cursor] = c;
        cursor += 1;
      }
      updateCells(next);
      focusCell(cursor);
    };

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
      const key = event.key;
      if (key === 'Backspace') {
        if (cells[index]) {
          const next = [...cells];
          next[index] = '';
          updateCells(next);
          return;
        }
        if (index > 0) {
          event.preventDefault();
          const next = [...cells];
          next[index - 1] = '';
          updateCells(next);
          focusCell(index - 1);
        }
        return;
      }
      if (key === 'ArrowLeft') {
        event.preventDefault();
        focusCell(index - 1);
        return;
      }
      if (key === 'ArrowRight') {
        event.preventDefault();
        focusCell(index + 1);
        return;
      }
      if (key === 'Home') {
        event.preventDefault();
        focusCell(0);
        return;
      }
      if (key === 'End') {
        event.preventDefault();
        focusCell(length - 1);
      }
    };

    const handlePaste = (index: number, event: React.ClipboardEvent<HTMLInputElement>) => {
      const pasted = event.clipboardData.getData('text');
      if (!pasted) return;
      event.preventDefault();
      handleChange(index, pasted);
    };

    React.useEffect(() => {
      if (autoFocus) focusCell(0);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel ?? 'One-time code'}
        className={cn('inline-flex items-center gap-2', className)}
        {...rest}
      >
        {Array.from({ length }, (_, i) => (
          <React.Fragment key={i}>
            {i > 0 && separator ? (
              <span className="text-muted-foreground" aria-hidden>
                {separator}
              </span>
            ) : null}
            <input
              ref={(el) => {
                inputs.current[i] = el;
              }}
              type={mask ? 'password' : 'text'}
              inputMode={type === 'numeric' ? 'numeric' : 'text'}
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              pattern={type === 'numeric' ? '[0-9]*' : undefined}
              maxLength={1}
              value={cells[i] ?? ''}
              disabled={disabled}
              name={name ? `${name}-${i}` : undefined}
              aria-label={`${ariaLabel ?? 'Digit'} ${i + 1}`}
              className={cn(pinInputCellVariants({ variant: resolvedVariant, size }))}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={(e) => handlePaste(i, e)}
              onFocus={(e) => e.target.select()}
            />
          </React.Fragment>
        ))}
      </div>
    );
  },
);
PinInput.displayName = 'PinInput';

function normalizeValue(value: string, length: number): string[] {
  const next = Array.from({ length }, () => '');
  for (let i = 0; i < Math.min(value.length, length); i += 1) {
    next[i] = value[i] ?? '';
  }
  return next;
}
