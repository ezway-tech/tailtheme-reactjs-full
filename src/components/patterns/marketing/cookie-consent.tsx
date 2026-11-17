import * as React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { usePageContentReady } from '@/hooks/use-page-content-ready';
import { urls } from '@/routes/urls';

const STORAGE_KEY = 'tailtheme-cookies';

type CookieChoice = 'accepted' | 'declined';

function readChoice(): CookieChoice | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw === 'accepted' || raw === 'declined' ? raw : null;
}

function writeChoice(choice: CookieChoice) {
  window.localStorage.setItem(STORAGE_KEY, choice);
}

/**
 * EU-style cookie consent banner. No third-party scripts load until Accept (demo only).
 */
export function CookieConsent() {
  const [choice, setChoice] = React.useState<CookieChoice | null>(() => readChoice());
  const [manageOpen, setManageOpen] = React.useState(false);
  const pageReady = usePageContentReady();

  if (choice || !pageReady) return null;

  const commit = (next: CookieChoice) => {
    writeChoice(next);
    setChoice(next);
    setManageOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className={cn(
        'fixed inset-x-0 bottom-0 z-[var(--z-banner,1400)] border-t border-border bg-card/95 p-4 shadow-lg backdrop-blur-md',
        'supports-[backdrop-filter]:bg-card/80',
      )}
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1 space-y-1">
          <p id="cookie-title" className="text-sm font-semibold">
            We use cookies
          </p>
          <p id="cookie-desc" className="text-sm text-muted-foreground">
            Analytics and personalization are disabled until you accept. Read our{' '}
            <Link
              to={urls.app.pages.marketing.privacy}
              className="text-text-brand underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
          {manageOpen ? (
            <p className="text-xs text-muted-foreground">
              Essential cookies always run for security. Marketing cookies stay off if you decline.
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2 sm:shrink-0">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setManageOpen((o) => !o)}
          >
            Manage
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={() => commit('declined')}>
            Decline
          </Button>
          <Button type="button" size="sm" onClick={() => commit('accepted')}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
