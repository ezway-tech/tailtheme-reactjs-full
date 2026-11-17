import { Link } from 'react-router-dom';
import { AppLogo } from '@/components/patterns/app-logo';
import { cn } from '@/lib/cn';
import { urls } from '@/routes/urls';

export interface FooterMarketingProps {
  className?: string;
}

const LINK_GROUPS = [
  {
    title: 'Product',
    links: [
      { label: 'Pricing', to: urls.app.pages.marketing.pricing },
      { label: 'Changelog', to: urls.app.pages.marketing.changelog },
      { label: 'FAQ', to: urls.app.pages.marketing.faq },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: urls.app.pages.marketing.about },
      { label: 'Blog', to: urls.app.pages.marketing.blog },
      { label: 'Contact', to: urls.app.pages.marketing.contact },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms', to: urls.app.pages.marketing.terms },
      { label: 'Privacy', to: urls.app.pages.marketing.privacy },
    ],
  },
] as const;

/**
 * Four-column marketing footer with newsletter placeholder.
 */
export function FooterMarketing({ className }: FooterMarketingProps) {
  return (
    <footer className={cn('border-t border-border bg-muted/20 px-6 py-12', className)}>
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <AppLogo />
            <span className="font-semibold">TailTheme</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Production-ready React template with tokens, patterns, and vertical demos.
          </p>
        </div>
        {LINK_GROUPS.map((group) => (
          <div key={group.title}>
            <h3 className="text-label font-semibold text-foreground">{group.title}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {group.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground transition-colors hover:text-text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-center text-caption text-muted-foreground">
        © {new Date().getFullYear()} TailTheme. Demo template — not affiliated with any brand shown.
      </p>
    </footer>
  );
}
