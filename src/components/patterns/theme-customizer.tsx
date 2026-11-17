import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Laptop, Moon, Palette, RotateCcw, Sun } from 'lucide-react';
import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Slider,
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui';
import {
  DEFAULT_PREFERENCES,
  PRESET_PALETTES,
  UI_SCALE_STEPS,
  usePreferences,
  type FontFamily,
  type LayoutVariant,
} from '@/hooks/use-preferences';
import { useTheme, type Theme } from '@/hooks/use-theme';
import { applyPresetToPreferences } from '@/lib/theme-presets';
import { cn } from '@/lib/cn';

interface ThemeCustomizerProps {
  trigger?: React.ReactNode;
  /** Render the controls inline without sheet wrapper (e.g. inside Settings page). */
  inline?: boolean;
}

function CustomizerControls() {
  const { t } = useTranslation();
  const { preferences, setPreferences, resetPreferences } = usePreferences();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const activePreset = PRESET_PALETTES.find(
    (preset) =>
      preset.primaryHsl === preferences.primaryHsl &&
      preset.accentHsl === preferences.accentHsl &&
      preset.successHsl === preferences.successHsl,
  );

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <Label>{t('customizer.colorMode', 'Color mode')}</Label>
          <span className="text-xs text-muted-foreground">
            {theme === 'system'
              ? t('customizer.resolvesToSystem', 'Resolves to {{mode}}', { mode: resolvedTheme })
              : null}
          </span>
        </div>
        <ToggleGroup
          type="single"
          value={theme}
          onValueChange={(v) => v && setTheme(v as Theme)}
          className="w-full"
        >
          <ToggleGroupItem value="light" className="flex-1">
            <span className="flex items-center justify-center gap-2">
              <Sun className="h-4 w-4" aria-hidden />
              {t('common:theme.light', 'Light')}
            </span>
          </ToggleGroupItem>
          <ToggleGroupItem value="dark" className="flex-1">
            <span className="flex items-center justify-center gap-2">
              <Moon className="h-4 w-4" aria-hidden />
              {t('common:theme.dark', 'Dark')}
            </span>
          </ToggleGroupItem>
          <ToggleGroupItem value="system" className="flex-1">
            <span className="flex items-center justify-center gap-2">
              <Laptop className="h-4 w-4" aria-hidden />
              {t('common:theme.system', 'System')}
            </span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <Label>{t('customizer.palette', 'Color palette')}</Label>
          <span className="text-xs text-muted-foreground">
            {t('customizer.paletteCount', '{{count}} presets', { count: PRESET_PALETTES.length })}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {PRESET_PALETTES.map((preset) => {
            const selected = activePreset?.id === preset.id;
            const tooltip = `${preset.name}\nprimary ${preset.primaryHsl}\naccent ${preset.accentHsl}\nsuccess ${preset.successHsl}\nwarning ${preset.warningHsl}`;
            return (
              <button
                key={preset.id}
                type="button"
                title={tooltip}
                onClick={() => setPreferences(applyPresetToPreferences(preset))}
                className={cn(
                  'group relative flex flex-col items-stretch gap-1.5 rounded-md border p-2 text-left transition-colors hover:border-primary/50',
                  selected ? 'border-primary bg-primary/5' : 'border-border',
                )}
              >
                <div className="grid grid-cols-4 gap-0.5">
                  <span
                    className="block h-3 rounded-sm"
                    style={{ background: `hsl(${preset.primaryHsl})` }}
                  />
                  <span
                    className="block h-3 rounded-sm"
                    style={{ background: `hsl(${preset.accentHsl})` }}
                  />
                  <span
                    className="block h-3 rounded-sm"
                    style={{ background: `hsl(${preset.successHsl})` }}
                  />
                  <span
                    className="block h-3 rounded-sm"
                    style={{ background: `hsl(${preset.warningHsl})` }}
                  />
                  <span
                    className="block h-3 rounded-sm"
                    style={{ background: `hsl(${preset.infoHsl})` }}
                  />
                  <span
                    className="block h-3 rounded-sm"
                    style={{ background: `hsl(${preset.sidebarPrimaryHsl})` }}
                  />
                  <span
                    className="block h-3 rounded-sm"
                    style={{ background: `hsl(${preset.chart1Hsl})` }}
                  />
                  <span
                    className="block h-3 rounded-sm"
                    style={{ background: `hsl(${preset.chart2Hsl})` }}
                  />
                </div>
                <span className="truncate text-[11px] font-medium">{preset.name}</span>
                {selected ? (
                  <Check className="absolute right-1 top-1 h-3 w-3 text-primary" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>{t('customizer.radius', 'Radius')}</Label>
          <span className="text-xs tabular-nums text-muted-foreground">
            {preferences.radius.toFixed(2)}rem
          </span>
        </div>
        <Slider
          min={0}
          max={1.5}
          step={0.25}
          value={[preferences.radius]}
          onValueChange={(v) => setPreferences({ radius: v[0] ?? 0.75 })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="font-family">{t('customizer.font', 'Font')}</Label>
        <Select
          value={preferences.fontFamily}
          onValueChange={(v: FontFamily) => setPreferences({ fontFamily: v })}
        >
          <SelectTrigger id="font-family">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inter">Inter</SelectItem>
            <SelectItem value="outfit">Outfit</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>{t('customizer.uiScale', 'UI scale')}</Label>
          <span className="text-xs tabular-nums text-muted-foreground">{preferences.uiScale}%</span>
        </div>
        <ToggleGroup
          type="single"
          value={String(preferences.uiScale)}
          onValueChange={(v) => v && setPreferences({ uiScale: Number(v) })}
          className="w-full"
        >
          {UI_SCALE_STEPS.map((step) => (
            <ToggleGroupItem key={step.value} value={String(step.value)} className="group flex-1">
              <span className="flex flex-col items-center leading-tight">
                <span className="text-sm font-semibold">{step.label}</span>
                <span className="text-[10px] text-muted-foreground group-data-[state=on]:text-accent-foreground">
                  {step.value}%
                </span>
              </span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="space-y-3">
        <Label>{t('customizer.layout', 'App layout')}</Label>
        <ToggleGroup
          type="single"
          value={preferences.layout}
          onValueChange={(v) => v && setPreferences({ layout: v as LayoutVariant })}
          className="w-full"
        >
          <ToggleGroupItem value="sidebar" className="flex-1 text-xs">
            Sidebar
          </ToggleGroupItem>
          <ToggleGroupItem value="top-nav" className="flex-1 text-xs">
            Top nav
          </ToggleGroupItem>
          <ToggleGroupItem value="compact" className="flex-1 text-xs">
            Compact
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Separator />

      <Button
        variant="outline"
        size="sm"
        onClick={resetPreferences}
        disabled={
          JSON.stringify(preferences) ===
          JSON.stringify({
            ...DEFAULT_PREFERENCES,
            sidebarState: preferences.sidebarState,
          })
        }
      >
        <RotateCcw className="h-3.5 w-3.5" />
        {t('customizer.reset', 'Reset to defaults')}
      </Button>
    </div>
  );
}

export function ThemeCustomizer({ trigger, inline }: ThemeCustomizerProps) {
  const { t } = useTranslation();

  if (inline) {
    return <CustomizerControls />;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger ?? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label={t('customizer.title', 'Customize theme')}
          >
            <Palette className="h-4 w-4" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t('customizer.title', 'Customize theme')}</SheetTitle>
          <SheetDescription>
            {t('customizer.description', 'Pick a palette, radius, font and layout.')}
          </SheetDescription>
        </SheetHeader>
        <CustomizerControls />
      </SheetContent>
    </Sheet>
  );
}
