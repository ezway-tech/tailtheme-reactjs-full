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
  Textarea,
  toast,
} from '@/components/ui';
import { PageContent, PageHeader, wizardStepSegmentClassName } from '@/components/patterns';

const STEPS = ['Demographics', 'Symptoms', 'Insurance', 'Review'] as const;

export default function IntakeWizardPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [memberId, setMemberId] = useState('');

  function next() {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else {
      toast.success('Intake submitted (demo)');
      setStep(0);
    }
  }

  return (
    <PageContent width="narrow" className="space-y-6">
      <PageHeader title="Patient intake" description="New visit registration — four-step wizard." />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {STEPS.map((label, i) => (
          <div key={label} className={wizardStepSegmentClassName(i, step, { density: 'compact' })}>
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
          {step === 0 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of birth</Label>
                <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
              </div>
            </>
          )}
          {step === 1 && (
            <div className="space-y-2">
              <Label htmlFor="symptoms">Chief complaint & symptoms</Label>
              <Textarea
                id="symptoms"
                rows={4}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describe symptoms, duration, severity…"
              />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-2">
              <Label htmlFor="member">Insurance member ID</Label>
              <Input
                id="member"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="ABC-123456"
              />
            </div>
          )}
          {step === 3 && (
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Name</dt>
                <dd className="font-medium">{name || '—'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">DOB</dt>
                <dd className="font-medium">{dob || '—'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Symptoms</dt>
                <dd className="max-w-xs text-right font-medium">{symptoms || '—'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Member ID</dt>
                <dd className="font-medium">{memberId || '—'}</dd>
              </div>
            </dl>
          )}

          <div className="flex justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={step === 0}
              onClick={() => setStep((s) => s - 1)}
            >
              Back
            </Button>
            <Button type="button" onClick={next}>
              {step === STEPS.length - 1 ? 'Submit intake' : 'Continue'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </PageContent>
  );
}
