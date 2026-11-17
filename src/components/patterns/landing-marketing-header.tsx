import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AppLogo } from '@/components/patterns/app-logo';
import { useScrollPast } from '@/hooks/use-scroll-past';
import { APP_TITLE } from '@/config';
import { urls } from '@/routes/urls';
import { cn } from '@/lib/cn';

export interface LandingMarketingHeaderProps {
  className?: string;
}

/** Marketing header that gains backdrop blur after scroll. */
export function LandingMarketingHeader({ className }: LandingMarketingHeaderProps) {
  const headerRef = React.useRef<HTMLElement>(null);
  const scrolled = useScrollPast(20, headerRef);

  return (
    <header
      ref={headerRef}
      className={cn(
        'sticky top-0 z-banner flex items-center justify-between px-6 py-4 transition-[background-color,box-shadow,border-color] duration-200',
        scrolled
          ? 'border-b border-border/80 bg-background/80 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <AppLogo />
        <span className="min-w-0 truncate font-semibold">{APP_TITLE}</span>
      </div>
      <nav className="hidden gap-4 text-sm sm:flex" aria-label="Marketing">
        <Link to={urls.app.pricing} className="text-muted-foreground hover:text-foreground">
          Pricing
        </Link>
        <Link to={urls.docs.root} className="text-muted-foreground hover:text-foreground">
          Docs
        </Link>
        <Link to={urls.showcase.root} className="text-muted-foreground hover:text-foreground">
          Showcase
        </Link>
        <Link
          to={urls.app.pages.marketing.changelog}
          className="text-muted-foreground hover:text-foreground"
        >
          Changelog
        </Link>
      </nav>
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
          <Link to={urls.auth.login}>Sign in</Link>
        </Button>
        <Button asChild size="sm">
          <Link to={urls.auth.register}>Get started</Link>
        </Button>
      </div>
    </header>
  );
}
