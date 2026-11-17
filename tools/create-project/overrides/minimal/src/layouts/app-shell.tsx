import * as React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { APP_TITLE } from '@/config';
import { Menu, Palette } from 'lucide-react';
import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui';
import { AppLogo, ThemeCustomizer, ThemeMenu } from '@/components/patterns';
import { AppHeaderProvider } from '@/contexts/app-header-context';
import { flattenNavLeaves, TOP_TREE, PAGES_TREE, type NavNode } from '@/navigation/app-nav-tree';
import { urls } from '@/routes/urls';
import { cn } from '@/lib/cn';

function leavesFrom(tree: NavNode[]) {
  return flattenNavLeaves(tree);
}

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useTranslation();
  const location = useLocation();
  const items = React.useMemo(() => [...leavesFrom(TOP_TREE), ...leavesFrom(PAGES_TREE)], []);

  return (
    <SidebarMenu>
      {items.map((item) => {
        const active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
        return (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild isActive={active}>
              <NavLink to={item.to} onClick={onNavigate}>
                {item.icon ? <item.icon className="h-4 w-4" /> : null}
                <span>{t(item.labelKey, item.fallback)}</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

function Brand() {
  return (
    <NavLink to={urls.app.starter.home} className="flex items-center gap-2 px-2 py-1.5">
      <AppLogo />
      <span className="truncate text-sm font-semibold">{APP_TITLE}</span>
    </NavLink>
  );
}

export default function AppShell() {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <AppHeaderProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <Brand />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>{t('nav.groups.overview', 'Overview')}</SidebarGroupLabel>
              <NavItems />
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset>
          <header className="flex h-14 items-center gap-2 border-b border-border px-4">
            <SidebarTrigger className="hidden md:inline-flex" />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[18rem] p-0">
                <SheetHeader className="border-b px-4 py-3 text-left">
                  <SheetTitle>{APP_TITLE}</SheetTitle>
                </SheetHeader>
                <div className="p-3">
                  <NavItems onNavigate={() => setMobileOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
            <div className="min-w-0 flex-1 truncate text-sm font-medium">{APP_TITLE}</div>
            <ThemeMenu />
            <ThemeCustomizer
              trigger={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  aria-label="Customize theme"
                >
                  <Palette className="h-4 w-4" />
                </Button>
              }
            />
          </header>
          <main className={cn('flex-1 overflow-auto')}>
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AppHeaderProvider>
  );
}
