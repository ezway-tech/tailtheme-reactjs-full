import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Command as CommandIcon, LayoutDashboard, Search } from 'lucide-react';
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui';
import {
  flattenNavLeaves,
  PAGES_TREE,
  TOP_TREE,
  type FlatNavLeaf,
} from '@/navigation/app-nav-tree';

interface CommandPaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const CommandPaletteContext = React.createContext<CommandPaletteContextValue | null>(null);

export function useCommandPalette(): CommandPaletteContextValue {
  const ctx = React.useContext(CommandPaletteContext);
  if (!ctx) throw new Error('useCommandPalette must be used inside <CommandPaletteProvider>');
  return ctx;
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const leaves = React.useMemo(
    () => [...flattenNavLeaves(TOP_TREE), ...flattenNavLeaves(PAGES_TREE)],
    [],
  );

  const value = React.useMemo<CommandPaletteContextValue>(
    () => ({ open, setOpen, toggle: () => setOpen((v) => !v) }),
    [open],
  );

  const run = (leaf: FlatNavLeaf) => {
    setOpen(false);
    navigate(leaf.to);
  };

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t('command.placeholder', 'Search pages…')} />
        <CommandList>
          <CommandEmpty>{t('command.empty', 'No results')}</CommandEmpty>
          <CommandGroup heading={t('nav.groups.overview', 'Overview')}>
            {leaves.map((leaf) => {
              const Icon = leaf.icon ?? LayoutDashboard;
              return (
                <CommandItem
                  key={leaf.id}
                  value={`${leaf.id} ${leaf.fallback}`}
                  onSelect={() => run(leaf)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {t(leaf.labelKey, leaf.fallback)}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </CommandPaletteContext.Provider>
  );
}

export function CommandPaletteTrigger({ className }: { className?: string }) {
  const { toggle } = useCommandPalette();
  const { t } = useTranslation();
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={className}
      onClick={toggle}
      aria-label={t('command.open', 'Open command palette')}
    >
      <Search className="mr-2 h-4 w-4" />
      <span className="hidden sm:inline">Search</span>
      <CommandIcon className="ml-2 hidden h-3.5 w-3.5 opacity-60 sm:inline" />
    </Button>
  );
}
