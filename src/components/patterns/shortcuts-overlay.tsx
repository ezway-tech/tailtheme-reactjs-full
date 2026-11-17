import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui';

interface Shortcut {
  labelKey: string;
  fallback: string;
  keys: string[];
}

const SHORTCUTS: Shortcut[] = [
  { labelKey: 'shortcuts.openPalette', fallback: 'Open command palette', keys: ['⌘', 'K'] },
  { labelKey: 'shortcuts.toggleSidebar', fallback: 'Toggle sidebar', keys: ['⌘', 'B'] },
  { labelKey: 'shortcuts.showShortcuts', fallback: 'Show shortcuts', keys: ['?'] },
  { labelKey: 'shortcuts.close', fallback: 'Close dialog / drawer', keys: ['Esc'] },
  { labelKey: 'shortcuts.nextItem', fallback: 'Next item', keys: ['↓'] },
  { labelKey: 'shortcuts.prevItem', fallback: 'Previous item', keys: ['↑'] },
  { labelKey: 'shortcuts.submit', fallback: 'Submit form', keys: ['⌘', 'Enter'] },
];

/**
 * Global keyboard shortcuts overlay. Opens with the `?` key anywhere outside
 * of an input. Include once near the root of your layout.
 */
export function ShortcutsOverlay() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '?' || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
      setOpen((v) => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t('shortcuts.title', 'Keyboard shortcuts')}</DialogTitle>
          <DialogDescription>
            {t('shortcuts.description', 'Navigate the app faster with these shortcuts.')}
          </DialogDescription>
        </DialogHeader>
        <ul className="divide-y divide-border">
          {SHORTCUTS.map((sc) => (
            <li key={sc.labelKey} className="flex items-center justify-between gap-4 py-2 text-sm">
              <span>{t(sc.labelKey, sc.fallback)}</span>
              <span className="flex gap-1">
                {sc.keys.map((k, idx) => (
                  <kbd
                    key={`${sc.labelKey}-${idx}`}
                    className="rounded-md border border-border bg-muted px-2 py-0.5 font-mono text-xs shadow-sm"
                  >
                    {k}
                  </kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
