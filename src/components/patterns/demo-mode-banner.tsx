import { FlaskConical, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isDemoModeEnabled, setDemoModeEnabled } from '@/lib/demo-mode';

/**
 * Fixed banner shown when MSW demo mode is on (`?mock=1`).
 */
export function DemoModeBanner() {
  if (!isDemoModeEnabled()) return null;

  function disable() {
    setDemoModeEnabled(false);
    const url = new URL(window.location.href);
    url.searchParams.set('mock', '0');
    window.location.href = url.toString();
  }

  return (
    <div
      role="status"
      className="fixed bottom-4 left-1/2 z-toast flex w-[min(100%,28rem)] -translate-x-1/2 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm shadow-lg"
    >
      <FlaskConical className="h-4 w-4 shrink-0 text-primary" aria-hidden />
      <span className="flex-1 text-muted-foreground">Demo mode — API responses are mocked.</span>
      <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={disable}>
        <X className="h-4 w-4" />
        <span className="sr-only">Disable demo mode</span>
      </Button>
    </div>
  );
}
