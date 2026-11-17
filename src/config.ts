/**
 * App-wide static configuration (white-label / fork).
 * Edit values here per customer build — not read from `.env`.
 *
 * Theme runtime (dark/light) is stored under `COLOR_MODE_STORAGE_KEY`.
 * Layout, colors, and UI preferences under `PREFERENCES_STORAGE_KEY`.
 */

import type { Theme } from '@/hooks/use-theme';
import type { PageTransitionPresetId } from '@/lib/motion/page-transition-presets';
import heroRegisterImage from '@/assets/image/hero-team-collab.jpg';
import heroLoginImage from '@/assets/image/hero-workspace.jpg';

/** Product name: shell, auth, splash, landing footer, and `document.title` (not localized). */
export const APP_TITLE = 'TailTheme';

/**
 * Wide hero images for split auth (right column). Use paths under `public/` (e.g. `/brand/hero-login.webp`)
 * or absolute URLs. Defaults are demo-friendly workspace photos.
 */
export const AUTH_SPLIT_HERO_LOGIN_SRC = heroLoginImage;

export const AUTH_SPLIT_HERO_REGISTER_SRC = heroRegisterImage;

/** localStorage key for `PreferencesProvider` (layout, tokens, motion, …). */
export const PREFERENCES_STORAGE_KEY = 'tailtheme-prefs';

/** localStorage key for light / dark / system (see `ThemeProvider`). */
export const COLOR_MODE_STORAGE_KEY = 'tailtheme-theme';

/** localStorage key for command palette recent destinations (ordered ids from `app-nav-tree`). */
export const COMMAND_PALETTE_RECENTS_STORAGE_KEY = 'tailtheme-cmdk-recents';

/** Initial color mode before reading localStorage. */
export const DEFAULT_COLOR_MODE: Theme = 'system';

/**
 * Killswitch for shell page enter/exit animations (`PageOutletTransition`).
 * When false, navigation is instant regardless of `handle.pageTransition`.
 */
export const APP_PAGE_TRANSITIONS_ENABLED = true;

/**
 * Preset when no matched route sets `handle.pageTransition`.
 * Stays `'none'` for opt-in transitions per route only; not driven by user preferences.
 * Set e.g. `'fade'` here only if you want a build-wide default soft fade for unnamed routes.
 */
export const APP_PAGE_DEFAULT_TRANSITION: PageTransitionPresetId = 'none';

/**
 * Default UI preferences applied on first visit and after “Reset to defaults”.
 * Re-exported as `DEFAULT_PREFERENCES` from `@/hooks/use-preferences` (typed there).
 *
 * The eight HSL channels (`primaryHsl`, `accentHsl`, `successHsl`, `warningHsl`,
 * `infoHsl`, `sidebarPrimaryHsl`, `chart1Hsl`, `chart2Hsl`) are written to the
 * `<html>` element by `PreferencesProvider.applyToRoot` and consumed via the
 * matching `--color-*` CSS custom properties.
 */
export const DEFAULT_PREFERENCES_VALUES = {
  layout: 'sidebar',
  radius: 0.75,
  fontFamily: 'inter',
  uiScale: 100,
  primaryHsl: '205 70% 37%',
  accentHsl: '16 86% 54%',
  successHsl: '142 70% 38%',
  warningHsl: '38 92% 50%',
  infoHsl: '200 84% 50%',
  sidebarPrimaryHsl: '205 70% 37%',
  chart1Hsl: '205 70% 37%',
  chart2Hsl: '173 70% 45%',
  rtl: false,
  sidebarState: 'expanded',
} as const;

/** UI scale steps exposed in the Theme Customizer. */
export const UI_SCALE_STEPS: { value: number; label: string }[] = [
  { value: 90, label: 'S' },
  { value: 100, label: 'M' },
  { value: 110, label: 'L' },
  { value: 125, label: 'XL' },
];

/**
 * Curated theme presets. Each preset tints the eight semantic HSL channels at
 * once, so switching presets re-tints buttons, status badges, alerts, charts
 * and the sidebar in a single click.
 *
 * IDs are stable across builds. New presets append to the end so older
 * `localStorage` snapshots keep matching their saved id.
 */
export interface PresetPalette {
  id: string;
  name: string;
  primaryHsl: string;
  accentHsl: string;
  successHsl: string;
  warningHsl: string;
  infoHsl: string;
  sidebarPrimaryHsl: string;
  chart1Hsl: string;
  chart2Hsl: string;
}

export const PRESET_PALETTES: PresetPalette[] = [
  {
    id: 'tailtheme',
    name: 'TailTheme Blue',
    primaryHsl: '205 70% 37%',
    accentHsl: '16 86% 54%',
    successHsl: '142 70% 38%',
    warningHsl: '38 92% 50%',
    infoHsl: '200 84% 50%',
    sidebarPrimaryHsl: '205 70% 37%',
    chart1Hsl: '205 70% 37%',
    chart2Hsl: '173 70% 45%',
  },
  {
    id: 'sky',
    name: 'Sky',
    primaryHsl: '199 89% 48%',
    accentHsl: '262 72% 52%',
    successHsl: '160 72% 38%',
    warningHsl: '36 95% 55%',
    infoHsl: '199 89% 48%',
    sidebarPrimaryHsl: '199 89% 48%',
    chart1Hsl: '199 89% 48%',
    chart2Hsl: '262 72% 52%',
  },
  {
    id: 'indigo',
    name: 'Indigo',
    primaryHsl: '239 68% 56%',
    accentHsl: '262 72% 60%',
    successHsl: '160 72% 36%',
    warningHsl: '36 95% 55%',
    infoHsl: '212 90% 58%',
    sidebarPrimaryHsl: '239 68% 56%',
    chart1Hsl: '239 68% 56%',
    chart2Hsl: '199 89% 48%',
  },
  {
    id: 'emerald',
    name: 'Emerald',
    primaryHsl: '160 72% 36%',
    accentHsl: '260 80% 55%',
    successHsl: '160 72% 38%',
    warningHsl: '36 95% 55%',
    infoHsl: '200 84% 50%',
    sidebarPrimaryHsl: '160 72% 36%',
    chart1Hsl: '160 72% 36%',
    chart2Hsl: '212 90% 58%',
  },
  {
    id: 'teal',
    name: 'Teal',
    primaryHsl: '173 80% 36%',
    accentHsl: '36 95% 55%',
    successHsl: '160 72% 38%',
    warningHsl: '36 95% 55%',
    infoHsl: '199 89% 48%',
    sidebarPrimaryHsl: '173 80% 36%',
    chart1Hsl: '173 80% 36%',
    chart2Hsl: '199 89% 48%',
  },
  {
    id: 'violet',
    name: 'Violet',
    primaryHsl: '262 72% 52%',
    accentHsl: '330 85% 60%',
    successHsl: '142 70% 38%',
    warningHsl: '36 95% 55%',
    infoHsl: '212 90% 58%',
    sidebarPrimaryHsl: '262 72% 52%',
    chart1Hsl: '262 72% 52%',
    chart2Hsl: '330 85% 60%',
  },
  {
    id: 'fuchsia',
    name: 'Fuchsia',
    primaryHsl: '292 84% 50%',
    accentHsl: '199 89% 48%',
    successHsl: '142 70% 38%',
    warningHsl: '36 95% 55%',
    infoHsl: '199 89% 48%',
    sidebarPrimaryHsl: '292 84% 50%',
    chart1Hsl: '292 84% 50%',
    chart2Hsl: '262 72% 52%',
  },
  {
    id: 'rose',
    name: 'Rose',
    primaryHsl: '350 82% 55%',
    accentHsl: '20 90% 55%',
    successHsl: '142 70% 38%',
    warningHsl: '36 95% 55%',
    infoHsl: '212 90% 58%',
    sidebarPrimaryHsl: '350 82% 55%',
    chart1Hsl: '350 82% 55%',
    chart2Hsl: '20 90% 55%',
  },
  {
    id: 'orange',
    name: 'Orange',
    primaryHsl: '22 92% 53%',
    accentHsl: '200 90% 50%',
    successHsl: '142 70% 38%',
    warningHsl: '36 95% 55%',
    infoHsl: '200 90% 50%',
    sidebarPrimaryHsl: '22 92% 53%',
    chart1Hsl: '22 92% 53%',
    chart2Hsl: '200 90% 50%',
  },
  {
    id: 'amber',
    name: 'Amber',
    primaryHsl: '36 100% 45%',
    accentHsl: '262 72% 52%',
    successHsl: '142 70% 38%',
    warningHsl: '36 100% 50%',
    infoHsl: '199 89% 48%',
    sidebarPrimaryHsl: '36 100% 45%',
    chart1Hsl: '36 100% 45%',
    chart2Hsl: '22 92% 53%',
  },
  {
    id: 'slate-pro',
    name: 'Slate Pro',
    primaryHsl: '215 25% 27%',
    accentHsl: '199 89% 48%',
    successHsl: '160 72% 36%',
    warningHsl: '36 95% 55%',
    infoHsl: '199 89% 48%',
    sidebarPrimaryHsl: '215 25% 27%',
    chart1Hsl: '215 25% 27%',
    chart2Hsl: '199 89% 48%',
  },
  {
    id: 'midnight',
    name: 'Midnight',
    primaryHsl: '224 76% 48%',
    accentHsl: '199 89% 60%',
    successHsl: '160 72% 40%',
    warningHsl: '36 95% 55%',
    infoHsl: '199 89% 60%',
    sidebarPrimaryHsl: '224 76% 36%',
    chart1Hsl: '224 76% 48%',
    chart2Hsl: '262 72% 60%',
  },
  {
    id: 'sunset',
    name: 'Sunset',
    primaryHsl: '14 90% 56%',
    accentHsl: '330 85% 60%',
    successHsl: '142 70% 38%',
    warningHsl: '36 95% 55%',
    infoHsl: '20 90% 55%',
    sidebarPrimaryHsl: '14 90% 56%',
    chart1Hsl: '14 90% 56%',
    chart2Hsl: '330 85% 60%',
  },
  {
    id: 'forest',
    name: 'Forest',
    primaryHsl: '146 64% 28%',
    accentHsl: '36 95% 55%',
    successHsl: '146 64% 32%',
    warningHsl: '36 95% 55%',
    infoHsl: '199 89% 48%',
    sidebarPrimaryHsl: '146 64% 28%',
    chart1Hsl: '146 64% 28%',
    chart2Hsl: '85 56% 36%',
  },
  {
    id: 'ocean',
    name: 'Ocean',
    primaryHsl: '199 95% 32%',
    accentHsl: '173 80% 40%',
    successHsl: '160 72% 38%',
    warningHsl: '36 95% 55%',
    infoHsl: '199 95% 50%',
    sidebarPrimaryHsl: '199 95% 32%',
    chart1Hsl: '199 95% 32%',
    chart2Hsl: '173 80% 40%',
  },
  {
    id: 'mono',
    name: 'Mono',
    primaryHsl: '0 0% 12%',
    accentHsl: '0 0% 45%',
    successHsl: '142 70% 38%',
    warningHsl: '36 95% 55%',
    infoHsl: '212 90% 50%',
    sidebarPrimaryHsl: '0 0% 12%',
    chart1Hsl: '0 0% 12%',
    chart2Hsl: '0 0% 45%',
  },
];
