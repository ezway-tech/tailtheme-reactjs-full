import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { COMMAND_PALETTE_RECENTS_STORAGE_KEY } from '@/config';
import { renderWithProviders } from '@/test/test-utils';
import { CommandPaletteProvider, useCommandPalette } from '../command-palette';

function Inner() {
  const { open } = useCommandPalette();
  return <span data-testid="open-state">{String(open)}</span>;
}

function Harness() {
  return (
    <MemoryRouter>
      <CommandPaletteProvider>
        <Inner />
      </CommandPaletteProvider>
    </MemoryRouter>
  );
}

describe('CommandPalette', () => {
  beforeEach(() => {
    window.localStorage.removeItem(COMMAND_PALETTE_RECENTS_STORAGE_KEY);
  });

  it('starts closed and opens on Cmd/Ctrl+K', () => {
    renderWithProviders(<Harness />);
    expect(screen.getByTestId('open-state').textContent).toBe('false');
    fireEvent.keyDown(window, { key: 'k', metaKey: true });
    expect(screen.getByTestId('open-state').textContent).toBe('true');
  });

  it('toggles closed when Cmd+K pressed again', () => {
    renderWithProviders(<Harness />);
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(screen.getByTestId('open-state').textContent).toBe('true');
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(screen.getByTestId('open-state').textContent).toBe('false');
  });

  it('shows navigation entries from the shared app nav tree when open', () => {
    renderWithProviders(<Harness />);
    fireEvent.keyDown(window, { key: 'k', metaKey: true });
    expect(screen.getByText('Courses')).toBeInTheDocument();
    expect(screen.getByText('Storefront')).toBeInTheDocument();
    expect(screen.getByText('Typography')).toBeInTheDocument();
  });

  it('does not offer light/dark/system theme mode shortcuts (use header theme control)', () => {
    renderWithProviders(<Harness />);
    fireEvent.keyDown(window, { key: 'k', metaKey: true });
    expect(screen.queryByRole('option', { name: 'Light' })).not.toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Dark' })).not.toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'System' })).not.toBeInTheDocument();
  });

  it('shows a Recent group after selecting a destination from the palette', () => {
    renderWithProviders(<Harness />);
    fireEvent.keyDown(window, { key: 'k', metaKey: true });
    fireEvent.click(screen.getByRole('option', { name: /^courses$/i }));
    expect(
      JSON.parse(window.localStorage.getItem(COMMAND_PALETTE_RECENTS_STORAGE_KEY) ?? '[]'),
    ).toEqual(['edu.courses']);
    fireEvent.keyDown(window, { key: 'k', metaKey: true });
    expect(screen.getByText('Recent')).toBeInTheDocument();
  });
});
