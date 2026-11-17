import { useDeferredValue, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Input, Label, Slider, toast } from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ComponentApi } from '@/components/showcase/component-api';
import { SPRING } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type IconEntry = { name: string; Icon: LucideIcon };

const SKIP = new Set(['createLucideIcon', 'Icon', 'LucideIcon', 'default', 'icons', 'IconNode']);

function getIconEntries(): IconEntry[] {
  const entries: IconEntry[] = [];
  for (const [name, value] of Object.entries(Icons as Record<string, unknown>)) {
    if (SKIP.has(name)) continue;
    if (name.startsWith('Lucide')) continue;
    if (!/^[A-Z]/.test(name)) continue;
    if (typeof value !== 'object' && typeof value !== 'function') continue;
    entries.push({ name, Icon: value as LucideIcon });
  }
  const seen = new Set<string>();
  return entries
    .filter((e) => {
      const key = e.name.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

const ALL_ICONS = getIconEntries();

export default function IconsGalleryPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const deferred = useDeferredValue(query);
  const [size, setSize] = useState(20);
  const [stroke, setStroke] = useState(2);

  const filtered = useMemo(() => {
    const q = deferred.trim().toLowerCase();
    if (!q) return ALL_ICONS;
    return ALL_ICONS.filter((e) => e.name.toLowerCase().includes(q));
  }, [deferred]);

  const handleCopy = (name: string) => {
    void navigator.clipboard?.writeText(name);
    toast.success(t('pages.icons.copied', { name }));
  };

  const reduced = useReducedMotion();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={t('pages.icons.title', 'Icons')}
        description={t('pages.icons.subtitle', 'Lucide icons — click to copy the name.')}
      />
      <ComponentApi
        description="Source: lucide-react. Each icon is a React component that forwards SVG props. Default app convention is h-4 w-4 + currentColor, with stroke-2 weight."
        importCode={[
          `import { Search, Mail, ChevronRight } from 'lucide-react';`,
          `import type { LucideIcon } from 'lucide-react';`,
        ]}
        propsTitle="Common props"
        props={[
          {
            name: 'size',
            type: 'number | string',
            default: '24',
            description:
              'Pixel size of the rendered SVG. Prefer Tailwind size utilities (h-4 w-4 etc.) inside layouts; reserve the prop for dynamic sliders.',
          },
          {
            name: 'strokeWidth',
            type: 'number',
            default: '2',
            description: 'Line weight. Use 1.5 for delicate UIs, 2.5–3 for bold marketing.',
          },
          {
            name: 'absoluteStrokeWidth',
            type: 'boolean',
            default: 'false',
            description:
              'Keep the stroke constant regardless of size (handy for very large icons).',
          },
          {
            name: 'color',
            type: 'string',
            description:
              'CSS color. Defaults to currentColor — set the parent text color via Tailwind to inherit.',
          },
          {
            name: 'className',
            type: 'string',
            description:
              'Tailwind utilities. Recommended pattern: `<Search className="h-4 w-4 text-muted-foreground" />`.',
          },
          {
            name: 'aria-hidden / aria-label',
            type: 'string',
            description:
              'Decorative icons should set aria-hidden; meaningful icons need an aria-label or visually hidden text.',
          },
        ]}
        tokens={[
          {
            name: 'currentColor',
            description: 'All icons inherit color from text. Set foreground via Tailwind classes.',
          },
          { name: 'h-4 w-4', description: 'Default in-button size used across the app.' },
          { name: 'h-5 w-5 / h-6 w-6', description: 'Sidebar nav and section headers.' },
        ]}
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <Label htmlFor="icon-search">Search</Label>
          <Input
            id="icon-search"
            placeholder={t('pages.icons.search', 'Search icons…')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="sm:col-span-1">
          <div className="flex items-center justify-between">
            <Label>{t('pages.icons.size', 'Size')}</Label>
            <span className="text-xs tabular-nums text-muted-foreground">{size}px</span>
          </div>
          <Slider
            min={12}
            max={48}
            step={2}
            value={[size]}
            onValueChange={(v) => setSize(v[0] ?? 20)}
          />
        </div>
        <div className="sm:col-span-1">
          <div className="flex items-center justify-between">
            <Label>{t('pages.icons.stroke', 'Stroke')}</Label>
            <span className="text-xs tabular-nums text-muted-foreground">{stroke}</span>
          </div>
          <Slider
            min={1}
            max={3}
            step={0.25}
            value={[stroke]}
            onValueChange={(v) => setStroke(v[0] ?? 2)}
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{filtered.length} icons</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
        {filtered.map(({ name, Icon }) => {
          const button = (
            <button
              key={name}
              type="button"
              onClick={() => handleCopy(name)}
              className="group flex w-full flex-col items-center gap-1.5 rounded-md border border-border bg-card p-3 text-center transition-colors hover:border-primary hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              title={name}
            >
              <Icon size={size} strokeWidth={stroke} className="text-foreground" />
              <span className="w-full truncate text-[10px] text-muted-foreground">{name}</span>
            </button>
          );
          if (reduced) return button;
          return (
            <motion.div
              key={name}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING.press}
            >
              {button}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
