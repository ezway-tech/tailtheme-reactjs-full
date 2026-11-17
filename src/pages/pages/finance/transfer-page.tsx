import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  toast,
} from '@/components/ui';
import { PageContent, PageHeader, wizardStepSegmentClassName } from '@/components/patterns';

const STEPS = ['Amount & recipient', 'Review', 'Done'] as const;

export default function TransferPage() {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  function next() {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else {
      toast.success('Transfer complete (demo)');
      setStep(0);
      setAmount('');
      setRecipient('');
    }
  }

  return (
    <PageContent width="narrow" className="space-y-6">
      <PageHeader title="Transfer money" description="Send funds to another account." />

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
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Input
                  id="recipient"
                  placeholder="Email or account ID"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
            </>
          ) : null}
          {step === 1 ? (
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Amount</dt>
                <dd className="font-medium">${amount || '0.00'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">To</dt>
                <dd>{recipient || '—'}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Fee</dt>
                <dd>$0.00</dd>
              </div>
            </dl>
          ) : null}
          {step === 2 ? (
            <p className="text-sm text-muted-foreground">
              Your transfer of ${amount} to {recipient} has been scheduled.
            </p>
          ) : null}

          <div className="flex justify-between pt-2">
            <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
            <Button onClick={next} disabled={step === 0 && (!amount || !recipient)}>
              {step === STEPS.length - 1 ? 'Done' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageContent>
  );
}
