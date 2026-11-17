import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  toast,
} from '@/components/ui';
import { PageContent, PageHeader, wizardStepSegmentClassName } from '@/components/patterns';
import { sampleOrders } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const STEPS = ['Select order', 'Reason', 'Review'] as const;

export default function ReturnsPage() {
  const [step, setStep] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [reason, setReason] = useState('damaged');

  function next() {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else {
      toast.success('Return request RMA-8821 submitted (demo)');
      setStep(0);
      setOrderId('');
    }
  }

  return (
    <PageContent width="narrow" className="space-y-6">
      <PageHeader
        title="Returns & refunds"
        description="Start a return request (RMA). Connect to your OMS in production."
      />

      <div className="flex gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className={`flex-1 ${wizardStepSegmentClassName(i, step)}`}>
            {i + 1}. {label}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{STEPS[step]}</CardTitle>
          <CardDescription>
            Step {step + 1} of {STEPS.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 0 ? (
            <>
              <div className="space-y-2">
                <Label>Order</Label>
                <Select value={orderId} onValueChange={setOrderId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an order" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleOrders.map((o) => (
                      <SelectItem key={o.id} value={o.id}>
                        {o.id} — ${o.total}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          ) : null}
          {step === 1 ? (
            <RadioGroup value={reason} onValueChange={setReason}>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="damaged" id="r-damaged" />
                <Label htmlFor="r-damaged">Item arrived damaged</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="wrong" id="r-wrong" />
                <Label htmlFor="r-wrong">Wrong item shipped</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="size" id="r-size" />
                <Label htmlFor="r-size">Size / fit issue</Label>
              </div>
              <div className="space-y-2 pt-2">
                <Label>Notes</Label>
                <Textarea placeholder="Optional details for support…" rows={3} />
              </div>
            </RadioGroup>
          ) : null}
          {step === 2 ? (
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Order</dt>
                <dd className="font-mono">{orderId || '—'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Reason</dt>
                <dd className="capitalize">{reason}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Refund method</dt>
                <dd>Original payment</dd>
              </div>
            </dl>
          ) : null}

          <div className="flex justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={step === 0}
              onClick={() => setStep((s) => s - 1)}
            >
              Back
            </Button>
            <Button type="button" onClick={next} disabled={step === 0 && !orderId}>
              {step === STEPS.length - 1 ? 'Submit request' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button asChild variant="link" className="px-0">
        <Link to={urls.app.pages.ecommerce.orders}>View all orders</Link>
      </Button>
    </PageContent>
  );
}
