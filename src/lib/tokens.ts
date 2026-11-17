/**
 * Typed design-token surface for programmatic use (charts, canvas, emails).
 * Runtime values still come from CSS variables in `src/styles/globals.css`.
 */

/** Reference a theme variable for inline styles or third-party libs. */
export function cssVar(name: string): string {
  return `var(--${name})`;
}

export const tokens = {
  color: {
    brand: {
      DEFAULT: cssVar('color-brand'),
      foreground: cssVar('color-brand-foreground'),
      hover: cssVar('color-brand-hover'),
      muted: cssVar('color-brand-muted'),
    },
    text: {
      brand: cssVar('color-text-brand'),
      strong: cssVar('color-text-strong'),
      default: cssVar('color-text-default'),
      muted: cssVar('color-text-muted'),
      subtle: cssVar('color-text-subtle'),
    },
    surface: {
      DEFAULT: cssVar('color-surface'),
      muted: cssVar('color-surface-muted'),
      soft: cssVar('color-surface-soft'),
    },
    background: cssVar('color-background'),
    foreground: cssVar('color-foreground'),
    card: cssVar('color-card'),
    border: cssVar('color-border'),
    primary: cssVar('color-primary'),
    primaryForeground: cssVar('color-primary-foreground'),
    muted: cssVar('color-muted'),
    mutedForeground: cssVar('color-muted-foreground'),
    accent: cssVar('color-accent'),
    destructive: cssVar('color-destructive'),
    success: cssVar('color-success'),
    warning: cssVar('color-warning'),
    info: cssVar('color-info'),
  },
  radius: {
    DEFAULT: cssVar('radius'),
    sm: cssVar('radius-sm'),
    md: cssVar('radius-md'),
    lg: cssVar('radius-lg'),
    xl: cssVar('radius-xl'),
    button: cssVar('radius-button'),
    card: cssVar('radius-card'),
    input: cssVar('radius-input'),
  },
  shadow: {
    sm: cssVar('shadow-sm'),
    md: cssVar('shadow-md'),
    lg: cssVar('shadow-lg'),
  },
  z: {
    dropdown: cssVar('z-dropdown'),
    sticky: cssVar('z-sticky'),
    overlay: cssVar('z-overlay'),
    modal: cssVar('z-modal'),
    toast: cssVar('z-toast'),
  },
  duration: {
    fast: cssVar('duration-fast'),
    base: cssVar('duration-base'),
    slow: cssVar('duration-slow'),
  },
  font: {
    sans: cssVar('font-sans'),
    display: cssVar('font-display'),
  },
} as const;

export type Tokens = typeof tokens;
