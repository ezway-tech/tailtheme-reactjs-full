import { useEffect, useState } from 'react';
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

export default function VerifyEmailPage() {
  const { t } = useTranslation();
  const [seconds, setSeconds] = useState(30);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (seconds <= 0) return;
    const id = window.setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearInterval(id);
  }, [seconds]);

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <AuthFormBrand className="pb-2" />
        <CardTitle className="text-2xl">{t('pages.verify.title', 'Verify your email')}</CardTitle>
        <CardDescription>
          {t('pages.verify.subtitle', 'Enter the 6-digit code we sent to alex@tailtheme.test')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <PinInput length={6} value={code} onChange={setCode} />
        <Button
          className="w-full"
          disabled={code.length < 6}
          onClick={() => {
            toast.success('Email verified (demo)');
            window.location.href = urls.onboarding.root;
          }}
        >
          Verify
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="w-full"
          disabled={seconds > 0}
          onClick={() => {
            setSeconds(30);
            toast.message('Code resent (demo)');
          }}
        >
          {seconds > 0 ? `Resend in ${seconds}s` : 'Resend code'}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          <Link to={urls.auth.login} className="text-text-brand hover:underline">
            Wrong email? Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
