import * as React from 'react';
import { cn } from '@/lib/cn';
import { inputVariants } from './input';

export interface InputFloatingProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'placeholder' | 'size'
> {
  label: string;
  variant?: 'default' | 'error';
  inputSize?: 'sm' | 'default' | 'lg';
  wrapperClassName?: string;
}

/**
 * Text input with a floating label that animates above the field on focus / when filled.
 */
export const InputFloating = React.forwardRef<HTMLInputElement, InputFloatingProps>(
  (
    {
      label,
      className,
      wrapperClassName,
      id,
      value,
      defaultValue,
      onChange,
      variant,
      inputSize,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const [internal, setInternal] = React.useState(
      defaultValue !== undefined ? String(defaultValue) : '',
    );
    const isControlled = value !== undefined;
    const current = isControlled ? String(value ?? '') : internal;
    const filled = current.length > 0;

    return (
      <div className={cn('relative', wrapperClassName)}>
        <input
          ref={ref}
          id={inputId}
          value={isControlled ? value : undefined}
          defaultValue={isControlled ? undefined : defaultValue}
          placeholder=" "
          className={cn(inputVariants({ variant, size: inputSize }), 'peer pt-5 pb-1.5', className)}
          onChange={(e) => {
            if (!isControlled) setInternal(e.target.value);
            onChange?.(e);
          }}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            'pointer-events-none absolute left-3 origin-left text-muted-foreground transition-all duration-200',
            'peer-focus:top-1.5 peer-focus:scale-[0.85] peer-focus:text-primary',
            filled ? 'top-1.5 scale-[0.85]' : 'top-1/2 -translate-y-1/2 text-sm',
          )}
        >
          {label}
        </label>
      </div>
    );
  },
);
InputFloating.displayName = 'InputFloating';
