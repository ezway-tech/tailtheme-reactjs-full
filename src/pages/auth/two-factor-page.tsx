import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PinInput,
  toast,
} from '@/components/ui';
import { AuthFormBrand } from '@/components/auth/auth-form-brand';
import { urls } from '@/routes/urls';

export default function TwoFactorPage() {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [useBackup, setUseBackup] = useState(false);

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <AuthFormBrand className="pb-2" />
        <CardTitle className="text-2xl">
          {t('pages.twoFactor.title', 'Two-factor authentication')}
        </CardTitle>
        <CardDescription>
          {useBackup
            ? 'Enter one of your backup codes.'
            : 'Open your authenticator app and enter the 6-digit code.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <PinInput length={useBackup ? 8 : 6} value={code} onChange={setCode} />
        <Button
          className="w-full"
          onClick={() => {
            toast.success('2FA verified (demo)');
            window.location.href = urls.app.dashboard;
          }}
        >
          Continue
        </Button>
        <Button
          type="button"
          variant="link"
          className="w-full text-text-brand"
          onClick={() => {
            setUseBackup((b) => !b);
            setCode('');
          }}
        >
          {useBackup ? 'Use authenticator app' : 'Use a backup code'}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          <Link to={urls.auth.login} className="text-text-brand hover:underline">
            Back to sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
