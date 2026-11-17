import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Shield } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  PinInput,
  Switch,
  toast,
} from '@/components/ui';
import { PageContent, PageHeader } from '@/components/patterns';
import { urls } from '@/routes/urls';

const RECOVERY_CODES = ['8f2a-91bc', '44de-7a01', 'c910-55ef', 'aa33-12dd'];

export default function Security2faPage() {
  const [enabled, setEnabled] = useState(false);
  const [code, setCode] = useState('');

  return (
    <PageContent width="narrow" className="space-y-6">
      <PageHeader
        title="Two-factor authentication"
        description="Add an extra layer of security with an authenticator app."
        actions={
          <Button asChild variant="outline" size="sm">
            <Link to={urls.app.pages.saas.settings}>Back to settings</Link>
          </Button>
        }
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" /> Authenticator app
            </CardTitle>
            <CardDescription>Use Google Authenticator, 1Password, or similar.</CardDescription>
          </div>
          <Switch checked={enabled} onCheckedChange={setEnabled} aria-label="Enable 2FA" />
        </CardHeader>
        {enabled ? (
          <CardContent className="space-y-6">
            <div className="rounded-lg border border-border bg-muted/40 p-4 text-center font-mono text-lg tracking-widest">
              JBSW Y3DP EHPK 3PXP
            </div>
            <div className="space-y-2">
              <Label>Verify code</Label>
              <PinInput length={6} value={code} onChange={setCode} />
            </div>
            <Button onClick={() => toast.success('2FA enabled (demo)')} disabled={code.length < 6}>
              Confirm setup
            </Button>
            <div className="space-y-2">
              <Label>Recovery codes</Label>
              <p className="text-xs text-muted-foreground">Store these in a safe place.</p>
              <ul className="grid grid-cols-2 gap-2 font-mono text-sm">
                {RECOVERY_CODES.map((c) => (
                  <li key={c} className="rounded border border-border px-2 py-1">
                    {c}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast.message('Recovery codes copied (demo)')}
              >
                <Copy className="mr-1 h-4 w-4" /> Copy all
              </Button>
            </div>
          </CardContent>
        ) : null}
      </Card>
    </PageContent>
  );
}
