import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui';
import { PageContent, PageHeader } from '@/components/patterns';
import { urls } from '@/routes/urls';

const TIERS = [
  { id: 'basic', label: 'Basic', price: 12, description: 'Liability up to $50k · $500 deductible' },
  {
    id: 'standard',
    label: 'Standard',
    price: 22,
    description: 'Collision + theft · $250 deductible',
  },
  { id: 'premium', label: 'Premium', price: 35, description: 'Full coverage · $0 deductible' },
] as const;

export default function InsuranceAddonPage() {
  const [tier, setTier] = useState<string>('standard');
  const selected = TIERS.find((t) => t.id === tier) ?? TIERS[1];

  return (
    <PageContent width="narrow" className="space-y-6">
      <PageHeader
        title="Trip protection"
        description="Choose coverage before completing your booking."
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-5 w-5" aria-hidden />
            Coverage tier
          </CardTitle>
          <CardDescription>Per-day add-on · charged with reservation.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={tier} onValueChange={setTier} className="space-y-3">
            {TIERS.map((t) => (
              <Label
                key={t.id}
                htmlFor={t.id}
                className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-4 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
              >
                <RadioGroupItem value={t.id} id={t.id} className="mt-1" />
                <section className="flex-1">
                  <span className="font-medium">
                    {t.label} · ${t.price}/day
                  </span>
                  <p className="text-sm text-muted-foreground">{t.description}</p>
                </section>
              </Label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        Selected: <strong>{selected.label}</strong> at ${selected.price}/day
      </p>

      <Button asChild className="w-full">
        <Link to={urls.app.pages.vehicle.booking}>Continue to booking</Link>
      </Button>
    </PageContent>
  );
}
