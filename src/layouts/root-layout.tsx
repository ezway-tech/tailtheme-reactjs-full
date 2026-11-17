import { Outlet } from 'react-router-dom';
import {
  CommandPaletteProvider,
  CookieConsent,
  DemoModeBanner,
  ShortcutsOverlay,
  SkipLink,
} from '@/components/patterns';
import { ConfirmProvider } from '@/components/patterns/confirm-dialog';
import { useSyncDocumentAppRoute } from '@/hooks/use-sync-document-app-route';

/**
 * Router-aware root layout. Providers that depend on `useNavigate` /
 * `useMatches` (command palette, confirm provider) live here — not in
 * `AppProviders`, which is mounted above `<RouterProvider>`.
 *
 * Also mounts the global `SkipLink` (focus-visible only) and the
 * keyboard `ShortcutsOverlay` so accessibility helpers are available
 * on every route.
 */
export default function RootLayout() {
  useSyncDocumentAppRoute();

  return (
    <CommandPaletteProvider>
      <ConfirmProvider>
        <SkipLink />
        <Outlet />
        <ShortcutsOverlay />
        <CookieConsent />
        <DemoModeBanner />
      </ConfirmProvider>
    </CommandPaletteProvider>
  );
}
