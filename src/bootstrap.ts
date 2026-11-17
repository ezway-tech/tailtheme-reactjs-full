import { isDemoModeEnabled, persistDemoModeFromUrl } from '@/lib/demo-mode';

/**
 * App bootstrap — starts MSW when demo mode is active.
 */
export async function bootstrap(): Promise<void> {
  persistDemoModeFromUrl();
  if (!isDemoModeEnabled()) return;

  const { demoWorker } = await import('@/mocks/browser');
  await demoWorker.start({
    onUnhandledRequest: 'bypass',
    quiet: import.meta.env.PROD,
  });

  if (import.meta.env.DEV) {
    console.info('[TailTheme] Demo mode active — API mocked (?mock=1)');
  }
}
