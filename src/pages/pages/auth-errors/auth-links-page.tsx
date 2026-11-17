import { Link } from 'react-router-dom';
import {
  Clock,
  ExternalLink,
  KeyRound,
  LayoutTemplate,
  Link2,
  Lock,
  LogIn,
  Mail,
  Shield,
  UserPlus,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { urls } from '@/routes/urls';

interface AuthLink {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  cta: string;
}

const LINKS: AuthLink[] = [
  {
    icon: LogIn,
    title: 'Sign in',
    description: 'Standard email + password flow, OAuth ready, with forgot-password entry point.',
    href: urls.auth.login,
    cta: 'Open sign-in',
  },
  {
    icon: UserPlus,
    title: 'Register',
    description: 'Create a new account. Includes field validation and terms acceptance.',
    href: urls.auth.register,
    cta: 'Open register',
  },
  {
    icon: KeyRound,
    title: 'Forgot password',
    description: 'Email-based reset flow.',
    href: urls.auth.forgot,
    cta: 'Open reset',
  },
  {
    icon: KeyRound,
    title: 'Set new password',
    description: 'Token-based password reset with strength meter.',
    href: `${urls.auth.resetPassword}?token=demo`,
    cta: 'Open reset form',
  },
  {
    icon: Mail,
    title: 'Verify email',
    description: 'OTP verification with resend timer.',
    href: urls.auth.verifyEmail,
    cta: 'Open verify',
  },
  {
    icon: Shield,
    title: 'SSO provider picker',
    description: 'Choose Google, Microsoft, or Apple for enterprise sign-in.',
    href: urls.auth.sso,
    cta: 'Open SSO',
  },
  {
    icon: Clock,
    title: 'Session expired',
    description: 'Re-authenticate after idle timeout or revoked token.',
    href: urls.auth.sessionExpired,
    cta: 'Open session expired',
  },
  {
    icon: Shield,
    title: 'Two-factor challenge',
    description: 'TOTP or backup code at sign-in.',
    href: urls.auth.twoFactor,
    cta: 'Open 2FA',
  },
  {
    icon: UserPlus,
    title: 'Accept invite',
    description: 'Join a workspace from an email invite.',
    href: `${urls.auth.acceptInvite}?workspace=Acme`,
    cta: 'Open invite',
  },
  {
    icon: Lock,
    title: 'Account locked',
    description: 'Too many failed attempts.',
    href: urls.auth.accountLocked,
    cta: 'Open locked',
  },
  {
    icon: Link2,
    title: 'Magic link sent',
    description: 'Passwordless sign-in confirmation.',
    href: urls.auth.magicLinkSent,
    cta: 'Open magic link',
  },
  {
    icon: LayoutTemplate,
    title: 'Login split',
    description: 'Wide visual column plus focused form column.',
    href: urls.auth.loginSplit,
    cta: 'Open split login',
  },
  {
    icon: UserPlus,
    title: 'Register split',
    description: 'Split-screen registration with OAuth buttons.',
    href: urls.auth.registerSplit,
    cta: 'Open split register',
  },
];

export default function AuthLinksPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Authentication"
        description="All auth screens for the template. Boxed flows use AuthLayout; split variants are full-page."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {LINKS.map(({ icon: Icon, title, description, href, cta }) => (
          <Card key={title} className="flex flex-col">
            <CardHeader>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button asChild variant="outline" className="w-full">
                <Link to={href} target="_blank" rel="noreferrer">
                  {cta} <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
