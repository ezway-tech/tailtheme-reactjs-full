import { cn } from '@/lib/cn';

export type WizardStepSegmentDensity = 'default' | 'compact';

/**
image.png * Shared horizontal wizard step “pill” styles.
 * Upcoming steps must not use `bg-card` on light layouts — it matches elevated surfaces and
 * blends into the page; use `bg-muted` + `border-input` + shadow instead. Completed steps get a
 * subtle primary tint so they read as “done” vs neutral upcoming.
 */
export function wizardStepSegmentClassName(
  index: number,
  currentStep: number,
  options?: { density?: WizardStepSegmentDensity },
): string {
  const density = options?.density ?? 'default';
  return cn(
    'rounded-md border text-center text-xs font-medium shadow-sm transition-colors',
    density === 'compact' ? 'px-2 py-2' : 'px-3 py-2',
    index < currentStep && 'border-input bg-primary/10 text-foreground ring-1 ring-primary/15',
    index === currentStep && 'border-primary bg-primary/10 text-primary ring-1 ring-primary/20',
    index > currentStep && 'border-input bg-muted text-foreground',
  );
}
