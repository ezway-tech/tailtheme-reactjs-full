import * as React from 'react';
import { Check, Minus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/cn';

/** Billing cadence selected by the toggle at the top of the block. */
export type PricingCadence = 'monthly' | 'annual';

/**
 * Single feature row inside a pricing tier. Use `included: false` to render
 * the row in muted color with a minus icon — useful for clearly showing
 * which tier omits a perk that's part of a higher tier.
 */
export interface PricingFeature {
  /** Feature label. */
  label: React.ReactNode;
  /** Whether the feature is part of this tier. Default `true`. */
  included?: boolean;
  /** Optional helper note that appears under the label. */
  note?: React.ReactNode;
}

export interface PricingTier {
  /** Stable identifier used for keys and CTA callbacks. */
  id: string;
  /** Tier title (e.g. "Pro"). */
  name: React.ReactNode;
  /** One-sentence sales pitch. */
  description?: React.ReactNode;
  /** Monthly price in your store currency. Pass `0` for "Free". */
  monthlyPrice: number;
  /** Annual price (per month) — usually 16–20% off `monthlyPrice`. */
  annualPrice: number;
  /** Currency formatter prefix. Default `'$'`. */
  currency?: string;
  /** Feature list shown under the price. */
  features: PricingFeature[];
  /** CTA label. */
  cta?: React.ReactNode;
  /** Variant for the CTA. Defaults to `'default'` for highlighted tier, `'outline'` otherwise. */
  ctaVariant?: ButtonProps['variant'];
  /** Highlight this tier as the recommended option. */
  highlighted?: boolean;
  /** Custom badge text shown when the tier is highlighted. Default `'Most popular'`. */
  badge?: React.ReactNode;
}

export interface PricingBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Tiers to render. Most pricing pages use 3–4. */
  tiers: PricingTier[];
  /** Default cadence for the toggle. */
  defaultCadence?: PricingCadence;
  /** Controlled cadence value. */
  cadence?: PricingCadence;
  /** Fires when the user flips the cadence toggle. */
  onCadenceChange?: (cadence: PricingCadence) => void;
  /** Discount label shown next to the annual toggle (e.g. "Save 20%"). */
  annualSavingsLabel?: React.ReactNode;
  /** Fires when a tier CTA is clicked. */
  onSelectTier?: (tier: PricingTier, cadence: PricingCadence) => void;
  /** Hide the cadence toggle (useful when cadence is fixed elsewhere). */
  showCadenceToggle?: boolean;
}

/**
 * Marketing-grade pricing block: cadence toggle, 3–4 tier cards with
 * feature checklists and per-tier CTAs. Keeps everything keyboard
 * accessible (Switch is a Radix primitive) and theme-token driven.
 */
export const PricingBlock = React.forwardRef<HTMLDivElement, PricingBlockProps>(
  (
    {
      tiers,
      defaultCadence = 'monthly',
      cadence,
      onCadenceChange,
      annualSavingsLabel = 'Save 20%',
      onSelectTier,
      showCadenceToggle = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const isControlled = cadence !== undefined;
    const [internal, setInternal] = React.useState<PricingCadence>(defaultCadence);
    const current = isControlled ? cadence : internal;

    const handleCadence = (next: PricingCadence) => {
      if (!isControlled) setInternal(next);
      onCadenceChange?.(next);
    };

    return (
      <div ref={ref} className={cn('space-y-6', className)} {...rest}>
        {showCadenceToggle ? (
          <div className="flex items-center justify-center gap-3">
            <Label
              htmlFor="pricing-cadence"
              className={cn(
                'text-sm font-medium',
                current === 'monthly' ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              Monthly
            </Label>
            <Switch
              id="pricing-cadence"
              checked={current === 'annual'}
              onCheckedChange={(checked) => handleCadence(checked ? 'annual' : 'monthly')}
              aria-label="Toggle annual billing"
            />
            <div className="flex items-center gap-2">
              <Label
                htmlFor="pricing-cadence"
                className={cn(
                  'text-sm font-medium',
                  current === 'annual' ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                Annual
              </Label>
              {annualSavingsLabel ? (
                <Badge variant="success" className="text-[10px]">
                  {annualSavingsLabel}
                </Badge>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className={cn('grid gap-4', gridForTiers(tiers.length))}>
          {tiers.map((tier) => (
            <PricingTierCard key={tier.id} tier={tier} cadence={current} onSelect={onSelectTier} />
          ))}
        </div>
      </div>
    );
  },
);
PricingBlock.displayName = 'PricingBlock';

interface PricingTierCardProps {
  tier: PricingTier;
  cadence: PricingCadence;
  onSelect?: (tier: PricingTier, cadence: PricingCadence) => void;
}

function PricingTierCard({ tier, cadence, onSelect }: PricingTierCardProps) {
  const price = cadence === 'monthly' ? tier.monthlyPrice : tier.annualPrice;
  const currency = tier.currency ?? '$';
  const ctaVariant = tier.ctaVariant ?? (tier.highlighted ? 'default' : 'outline');

  return (
    <div
      className={cn(
        'relative flex flex-col gap-4 rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-colors',
        tier.highlighted ? 'border-primary ring-1 ring-primary' : 'border-border',
      )}
    >
      {tier.highlighted ? (
        <Badge className="absolute -top-2 right-6 bg-primary text-primary-foreground">
          {tier.badge ?? 'Most popular'}
        </Badge>
      ) : null}

      <div className="space-y-1">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">{tier.name}</h3>
        {tier.description ? (
          <p className="text-sm text-muted-foreground">{tier.description}</p>
        ) : null}
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-semibold tracking-tight text-foreground">
            {price === 0 ? 'Free' : `${currency}${formatPrice(price)}`}
          </span>
          {price > 0 ? <span className="text-sm text-muted-foreground">/mo</span> : null}
        </div>
        {price > 0 ? (
          <p className="text-xs text-muted-foreground">
            {cadence === 'annual'
              ? `Billed annually · ${currency}${formatPrice(price * 12)}/yr`
              : 'Billed monthly · cancel anytime'}
          </p>
        ) : null}
      </div>

      <Button variant={ctaVariant} className="w-full" onClick={() => onSelect?.(tier, cadence)}>
        {tier.cta ?? 'Get started'}
      </Button>

      <ul className="space-y-2 border-t border-border pt-4 text-sm">
        {tier.features.map((feature, idx) => {
          const included = feature.included ?? true;
          const Icon = included ? Check : Minus;
          return (
            <li key={idx} className="flex items-start gap-2">
              <Icon
                className={cn(
                  'mt-0.5 h-4 w-4 shrink-0',
                  included ? 'text-success-text' : 'text-muted-foreground',
                )}
                aria-hidden
              />
              <div className={cn('min-w-0', !included && 'text-muted-foreground line-through')}>
                <span>{feature.label}</span>
                {feature.note ? (
                  <p className="mt-0.5 text-xs text-muted-foreground">{feature.note}</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function formatPrice(value: number): string {
  if (Number.isInteger(value)) return String(value);
  return value.toFixed(2);
}

function gridForTiers(count: number): string {
  if (count <= 1) return 'grid-cols-1';
  if (count === 2) return 'grid-cols-1 md:grid-cols-2';
  if (count === 3) return 'grid-cols-1 md:grid-cols-3';
  return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
}
