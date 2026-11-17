import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
import { AuthFormBrand } from '@/components/auth/auth-form-brand';
import { urls } from '@/routes/urls';

export default function AcceptInvitePage() {
  const [params] = useSearchParams();
  const workspace = params.get('workspace') ?? 'Acme Labs';
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <AuthFormBrand className="pb-2" />
        <CardTitle className="text-2xl">Join {workspace}</CardTitle>
        <CardDescription>
          You were invited as a teammate. Create your account to accept.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="invite-name">Full name</Label>
          <Input id="invite-name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="invite-pw">Password</Label>
          <Input
            id="invite-pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          className="w-full"
          onClick={() => {
            toast.success('Invite accepted (demo)');
            window.location.href = urls.onboarding.root;
          }}
        >
          Accept invite
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to={urls.auth.login} className="text-text-brand hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
