import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { urls } from '@/routes/urls';
import { cn } from '@/lib/cn';

const THEME_LINKS = [
  { label: 'E-commerce', href: urls.app.pages.ecommerce.storefront },
  { label: 'SaaS / Admin', href: urls.app.pages.saas.analytics },
  { label: 'Edu', href: urls.app.pages.edu.courses },
  { label: 'CRM', href: urls.app.pages.crm.pipeline },
  { label: 'Finance', href: urls.app.pages.finance.wallet },
  { label: 'Marketing', href: urls.app.pages.marketing.landing },
] as const;

/** Compact mega-menu for themed sample pages (AppShell top bar). */
export function PagesMegaMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Pages</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-4 md:grid-cols-2">
              {THEME_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={href}
                      className={cn(
                        'block rounded-md p-3 text-sm font-medium leading-none hover:bg-accent hover:text-accent-foreground',
                      )}
                    >
                      {label}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to={urls.app.dashboard}>Dashboard</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
