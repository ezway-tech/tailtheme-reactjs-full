import { Outlet } from 'react-router-dom';
import {
  CommandPaletteProvider,
  CookieConsent,
  DemoModeBanner,
  SkipLink,
} from '@/components/patterns';
import { ConfirmProvider } from '@/components/patterns/confirm-dialog';
import { useSyncDocumentAppRoute } from '@/hooks/use-sync-document-app-route';

/**
 * Router-aware root layout for minimal / Lite exports.
 */
export default function RootLayout() {
  useSyncDocumentAppRoute();

  return (
    <CommandPaletteProvider>
      <ConfirmProvider>
        <SkipLink />
        <Outlet />
        <CookieConsent />
        <DemoModeBanner />
      </ConfirmProvider>
    </CommandPaletteProvider>
  );
}
