import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PinInput } from '@/components/ui/pin-input';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { ComponentApi } from '@/components/showcase/component-api';

export default function PinInputPage() {
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="PinInput / OTP"
        description="Multi-cell input for one-time codes, MFA challenges and short PINs. Supports paste, auto-advance, masking and error states."
      />

      <ComponentApi
        description='Source: src/components/ui/pin-input.tsx. Renders N single-character inputs grouped under a `role="group"` wrapper. Pasting the full code is forwarded to the right cells automatically.'
        importCode={`import { PinInput } from '@/components/ui';`}
        props={[
          {
            name: 'length',
            type: 'number',
            default: '6',
            description: 'Number of cells (4 for PIN, 6 for OTP).',
          },
          {
            name: 'value',
            type: 'string',
            description: 'Controlled joined value, e.g. `&quot;1234&quot;`.',
          },
          { name: 'defaultValue', type: 'string', description: 'Uncontrolled starting value.' },
          {
            name: 'onChange',
            type: '(value: string) =&gt; void',
            description: 'Fires on every keystroke.',
          },
          {
            name: 'onComplete',
            type: '(value: string) =&gt; void',
            description: 'Fires once when every cell is filled.',
          },
          {
            name: 'type',
            type: `'numeric' | 'alphanumeric' | 'alphabetic'`,
            default: `'numeric'`,
            description: 'Allowed alphabet — invalid keystrokes are silently dropped.',
          },
          {
            name: 'mask',
            type: 'boolean',
            default: 'false',
            description: 'Render cells as `<input type=&quot;password&quot;>` for PIN entry.',
          },
          {
            name: 'size',
            type: `'sm' | 'default' | 'lg'`,
            default: `'default'`,
            description: 'Cell sizing — matches the Input scale.',
          },
          {
            name: 'error',
            type: 'boolean',
            description: 'Apply destructive ring/border for invalid codes.',
          },
          {
            name: 'separator',
            type: 'React.ReactNode',
            description: 'Optional node inserted between cells (e.g. `&quot;-&quot;`).',
          },
          { name: 'autoFocus', type: 'boolean', description: 'Focus the first cell on mount.' },
        ]}
        tokens={[
          { name: '--ring', description: 'Focus ring color for the active cell.' },
          { name: '--input', description: 'Default cell border color.' },
          {
            name: '--danger-border / --danger-bg / --danger-text',
            description: 'Used when `error` or `variant=&quot;error&quot;`.',
          },
          {
            name: 'autoComplete=&quot;one-time-code&quot;',
            description: 'iOS / Android SMS autofill on the first cell.',
          },
        ]}
      />

      <ShowcaseSection
        title="6-digit OTP (controlled)"
        description="Most common shape. Shows the live value and fires `onComplete` once filled."
        code={`const [otp, setOtp] = useState('');

<PinInput
  length={6}
  value={otp}
  onChange={setOtp}
  onComplete={(v) => console.log('verify', v)}
/>`}
      >
        <div className="space-y-3">
          <Label>Verification code</Label>
          <PinInput
            length={6}
            value={otp}
            onChange={setOtp}
            onComplete={(value) => setSubmitted(value)}
          />
          <p className="text-xs text-muted-foreground">
            Current value: <span className="font-mono">{otp || '—'}</span>
            {submitted ? (
              <>
                {' '}
                · last completed: <span className="font-mono">{submitted}</span>
              </>
            ) : null}
          </p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="4-digit PIN (masked)"
        description="Use `mask` to hide characters as the user types — best for security PINs."
        code={`<PinInput length={4} mask onChange={setPin} />`}
      >
        <div className="space-y-3">
          <Label>PIN</Label>
          <PinInput length={4} mask value={pin} onChange={setPin} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="With separator"
        description="Group cells visually for license keys or formatted codes."
        code={`<PinInput
  length={6}
  type="alphanumeric"
  separator={<span className="px-1">·</span>}
/>`}
      >
        <PinInput length={6} type="alphanumeric" separator={<span className="px-1">·</span>} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Sizes"
        description="`sm`, `default`, `lg` — pick based on visual hierarchy."
        code={`<PinInput size="sm" length={4} />
<PinInput size="default" length={4} />
<PinInput size="lg" length={4} />`}
      >
        <div className="flex flex-wrap items-end gap-6">
          <PinInput size="sm" length={4} defaultValue="12" />
          <PinInput size="default" length={4} defaultValue="34" />
          <PinInput size="lg" length={4} defaultValue="56" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Error state"
        description="Set `error` to highlight an invalid code returned from the server."
        code={`<PinInput length={6} error defaultValue="123" />`}
      >
        <PinInput length={6} error defaultValue="1 2 3" />
      </ShowcaseSection>

      <ShowcaseSection
        title="In a form"
        description="Combine with `Label` + a submit `Button`. The PinInput's `onComplete` callback is a great place to auto-submit short codes."
      >
        <form
          className="w-full max-w-sm space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(otp);
          }}
        >
          <Label htmlFor="form-otp">Two-factor code</Label>
          <PinInput length={6} value={otp} onChange={setOtp} aria-label="Digit" />
          <Button type="submit" className="w-full" disabled={otp.length < 6}>
            Verify
          </Button>
        </form>
      </ShowcaseSection>
    </div>
  );
}
