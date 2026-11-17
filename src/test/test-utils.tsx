import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { AppProviders } from '@/providers/app-providers';

function Wrapper({ children }: { children: ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}

/**
 * Render a component wrapped in the full provider tree (theme, i18n, tooltip).
 * Prefer this over raw `render` for any component that may read context.
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult {
  return render(ui, { wrapper: Wrapper, ...options });
}

export * from '@testing-library/react';
