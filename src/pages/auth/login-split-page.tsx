import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthFormBrand } from '@/components/auth/auth-form-brand';
import { AuthSocialProviders } from '@/components/auth/auth-social-providers';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from '@/components/ui';
import { AppLogo } from '@/components/patterns';
import { APP_TITLE, AUTH_SPLIT_HERO_LOGIN_SRC } from '@/config';
import { cn } from '@/lib/utils';
import { urls } from '@/routes/urls';
import { setAuthSession } from '@/lib/auth-session';

function SplitBrandChip({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 rounded-2xl bg-white/95 px-3 py-2 shadow-lg ring-1 ring-black/10 dark:bg-slate-950/90 dark:ring-white/15',
        className,
      )}
    >
      <AppLogo className="h-9 w-9" alt={APP_TITLE} />
      <span className="text-sm font-semibold text-foreground">{APP_TITLE}</span>
    </span>
  );
}

export default function LoginSplitPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-muted/40 lg:grid lg:min-h-screen lg:grid-cols-[minmax(min(100%,18rem),9fr)_minmax(0,11fr)]">
      <div className="relative isolate min-h-[50vh] w-full shrink-0 overflow-hidden lg:hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={AUTH_SPLIT_HERO_LOGIN_SRC}
            alt=""
            className="h-full w-full object-cover"
            decoding="async"
            fetchPriority="low"
          />
          <div className="absolute inset-0 bg-primary/78 backdrop-blur-[2px]" />
        </div>
        <div className="relative z-[1] px-5 pb-24 pt-8">
          <SplitBrandChip />
          <h1 className="mt-5 max-w-md text-2xl font-semibold leading-tight text-primary-foreground drop-shadow-md">
            {t(
              'pages.auth.split.loginHeroShort',
              'Sign in fast — OAuth first, email when you need it.',
            )}
          </h1>
        </div>
      </div>

      <main
        className={cn(
          'relative z-10 -mt-24 flex flex-1 flex-col px-4 pb-10 pt-0 lg:col-auto lg:mt-0 lg:min-h-0',
          'lg:justify-center lg:bg-background lg:px-10 lg:py-10 lg:pt-10',
          'lg:border-r lg:border-border/60',
        )}
      >
        <Card className="mx-auto w-full max-w-md shadow-lg lg:shadow-sm">
          <CardHeader className="space-y-1">
            <AuthFormBrand className="pb-2" />
            <CardTitle>{t('pages.login.title', 'Welcome back')}</CardTitle>
            <CardDescription>{t('pages.login.subtitle', 'Sign in to continue.')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AuthSocialProviders intent="signin" stackProviders oauthFirst />
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  {t('pages.auth.dividerEmail', 'Or sign in with email')}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <Input type="email" placeholder="you@example.com" autoComplete="email" />
              <Input type="password" placeholder="Password" autoComplete="current-password" />
              <Button
                type="button"
                className="w-full"
                onClick={() => {
                  setAuthSession();
                  navigate(urls.app.dashboard);
                }}
              >
                {t('actions:submit', 'Sign in')}
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {t('pages.login.noAccount', "Don't have an account?")}{' '}
              <Link
                to={urls.auth.registerSplit}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                {t('pages.login.signUp', 'Sign up')}
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>

      <aside className="relative hidden min-h-0 overflow-hidden lg:block lg:min-h-screen">
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={AUTH_SPLIT_HERO_LOGIN_SRC}
            alt=""
            className="h-full w-full object-cover"
            decoding="async"
            fetchPriority="low"
          />
          <div className="absolute inset-0 bg-primary/70 backdrop-blur-[3px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-transparent" />
        </div>
        <div className="relative z-[1] flex min-h-screen flex-col justify-between p-10 text-primary-foreground">
          <div className="space-y-5">
            <SplitBrandChip />
            <h1 className="max-w-xl text-3xl font-semibold leading-tight text-white drop-shadow-sm lg:text-4xl">
              {t(
                'pages.auth.split.loginHero',
                'Built for teams that need speed and visual clarity.',
              )}
            </h1>
          </div>
          <p className="max-w-md text-sm text-primary-foreground/90 drop-shadow-sm">
            {t(
              'pages.auth.split.loginFootnote',
              'Secure access to your workspace. One account for dashboards, courses, and themed demos.',
            )}
          </p>
        </div>
      </aside>
    </div>
  );
}
