import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Check } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Switch,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { cn } from '@/lib/cn';
import { urls } from '@/routes/urls';

const STEPS = [
  { id: 1, label: 'Dates & location' },
  { id: 2, label: 'Extras' },
  { id: 3, label: 'Confirm' },
];

export default function VehicleBookingPage() {
  const [step, setStep] = useState(1);
  const [insurance, setInsurance] = useState<'basic' | 'premium'>('basic');
  const [extras, setExtras] = useState({ childSeat: false, gps: true, driver: false });

  const daily = 145;
  const days = 5;
  const insuranceAdd = insurance === 'premium' ? 25 : 10;
  const extrasAdd = (extras.childSeat ? 8 : 0) + (extras.gps ? 5 : 0) + (extras.driver ? 75 : 0);
  const subtotal = daily * days;
  const total = subtotal + (insuranceAdd + extrasAdd) * days;

  return (
    <div className="space-y-6">
      <PageHeader title="Book your ride" description="Tesla Model Y (2025) · Long Range" />

      <ol className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <li key={s.id} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                'flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold',
                step >= s.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground',
              )}
            >
              {step > s.id ? <Check className="h-4 w-4" /> : s.id}
            </span>
            <span className={cn('text-sm', step >= s.id ? 'font-medium' : 'text-muted-foreground')}>
              {s.label}
            </span>
            {i < STEPS.length - 1 ? <span className="mx-2 h-px flex-1 bg-border" /> : null}
          </li>
        ))}
      </ol>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          {step === 1 ? (
            <>
              <CardHeader>
                <CardTitle>When and where?</CardTitle>
                <CardDescription>Pick-up and drop-off details</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="pickup">Pick-up location</Label>
                  <Select defaultValue="sfo">
                    <SelectTrigger id="pickup">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sfo">SFO — San Francisco</SelectItem>
                      <SelectItem value="lax">LAX — Los Angeles</SelectItem>
                      <SelectItem value="jfk">JFK — New York</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="dropoff">Drop-off location</Label>
                  <Select defaultValue="sfo">
                    <SelectTrigger id="dropoff">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sfo">SFO — San Francisco</SelectItem>
                      <SelectItem value="lax">LAX — Los Angeles</SelectItem>
                      <SelectItem value="jfk">JFK — New York</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pickup-date">Pick-up date</Label>
                  <Input id="pickup-date" type="date" defaultValue="2026-05-03" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="dropoff-date">Drop-off date</Label>
                  <Input id="dropoff-date" type="date" defaultValue="2026-05-08" />
                </div>
              </CardContent>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <CardHeader>
                <CardTitle>Protection & extras</CardTitle>
                <CardDescription>Tailor the trip to your needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <Label className="mb-0">Insurance</Label>
                    <Button asChild variant="link" size="sm" className="h-auto px-0">
                      <Link to={urls.app.pages.vehicle.insurance}>Coverage details</Link>
                    </Button>
                  </div>
                  <RadioGroup
                    value={insurance}
                    onValueChange={(v) => setInsurance(v as 'basic' | 'premium')}
                    className="grid gap-2 sm:grid-cols-2"
                  >
                    <Label
                      htmlFor="basic"
                      className="flex cursor-pointer items-start gap-3 rounded-md border border-border p-3 has-[:checked]:border-primary"
                    >
                      <RadioGroupItem id="basic" value="basic" />
                      <div>
                        <p className="text-sm font-medium">Basic · $10/day</p>
                        <p className="text-xs text-muted-foreground">
                          Third-party liability + $500 deductible.
                        </p>
                      </div>
                    </Label>
                    <Label
                      htmlFor="premium"
                      className="flex cursor-pointer items-start gap-3 rounded-md border border-border p-3 has-[:checked]:border-primary"
                    >
                      <RadioGroupItem id="premium" value="premium" />
                      <div>
                        <p className="text-sm font-medium">Premium · $25/day</p>
                        <p className="text-xs text-muted-foreground">
                          Zero deductible + roadside + rental coverage.
                        </p>
                      </div>
                    </Label>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label className="mb-1 block">Add-ons</Label>
                  {[
                    { id: 'gps', label: 'GPS navigation ($5/day)', key: 'gps' as const },
                    { id: 'childSeat', label: 'Child seat ($8/day)', key: 'childSeat' as const },
                    { id: 'driver', label: 'Additional driver ($75/day)', key: 'driver' as const },
                  ].map((o) => (
                    <div key={o.id} className="flex items-center justify-between">
                      <Label htmlFor={o.id} className="cursor-pointer">
                        {o.label}
                      </Label>
                      <Switch
                        id={o.id}
                        checked={extras[o.key]}
                        onCheckedChange={(v) => setExtras({ ...extras, [o.key]: Boolean(v) })}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <CardHeader>
                <CardTitle>Confirm your booking</CardTitle>
                <CardDescription>Review the details before you pay</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="h-4 w-4" /> May 3 → May 8 (5 days) · SFO → SFO
                </div>
                <div className="flex flex-wrap gap-1 pt-2">
                  <Badge variant="outline" className="capitalize">
                    {insurance} insurance
                  </Badge>
                  {extras.gps ? <Badge variant="outline">GPS</Badge> : null}
                  {extras.childSeat ? <Badge variant="outline">Child seat</Badge> : null}
                  {extras.driver ? <Badge variant="outline">Additional driver</Badge> : null}
                </div>
              </CardContent>
            </>
          ) : null}
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                ${daily} × {days} days
              </span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Insurance</span>
              <span>${insuranceAdd * days}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Add-ons</span>
              <span>${extrasAdd * days}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                disabled={step === 1}
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
              {step < 3 ? (
                <Button className="flex-1" onClick={() => setStep(step + 1)}>
                  Continue
                </Button>
              ) : (
                <Button className="flex-1">Pay now</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
