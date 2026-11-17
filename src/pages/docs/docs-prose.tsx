import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion';
import { cn } from '@/lib/cn';

/**
 * Minimal "prose" helpers for docs pages. We deliberately avoid installing
 * `@tailwindcss/typography` to stay on the existing dep list — instead we
 * compose small typed primitives.
 */

export function DocsTitle({ children }: { children: ReactNode }) {
  return <h1 className="mb-2 text-balance text-3xl font-semibold leading-tight">{children}</h1>;
}

export function DocsSubtitle({ children }: { children: ReactNode }) {
  return <p className="mb-10 text-muted-foreground">{children}</p>;
}

export function DocsH2({ children }: { children: ReactNode }) {
  return (
    <Reveal className="mb-3 mt-10" distance={8} margin="-5%">
      <h2 className="text-xl font-semibold tracking-tight">{children}</h2>
    </Reveal>
  );
}

export function DocsSection({ children }: { children: ReactNode }) {
  return <Reveal margin="-5%">{children}</Reveal>;
}

export function DocsH3({ children }: { children: ReactNode }) {
  return <h3 className="mb-2 mt-6 text-base font-semibold">{children}</h3>;
}

export function DocsP({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-sm leading-6 text-foreground">{children}</p>;
}

export function DocsList({ ordered, children }: { ordered?: boolean; children: ReactNode }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag
      className={cn(
        'mb-4 space-y-1.5 text-sm text-foreground',
        ordered ? 'list-decimal pl-5' : 'list-disc pl-5',
      )}
    >
      {children}
    </Tag>
  );
}

export function DocsCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  );
}

export function DocsBlock({ children }: { children: ReactNode }) {
  return (
    <pre className="mb-4 overflow-x-auto rounded-md border border-border bg-muted/50 p-4 text-xs leading-relaxed text-foreground">
      <code>{children}</code>
    </pre>
  );
}

export function DocsCallout({
  tone = 'info',
  title,
  children,
}: {
  tone?: 'info' | 'warning' | 'success';
  title?: ReactNode;
  children: ReactNode;
}) {
  const toneClass =
    tone === 'warning'
      ? 'border-warning-border bg-warning-bg text-warning-text'
      : tone === 'success'
        ? 'border-success-border bg-success-bg text-success-text'
        : 'border-info-border bg-info-bg text-info-text';
  return (
    <aside className={cn('mb-4 rounded-md border px-4 py-3 text-sm', toneClass)}>
      {title ? <div className="mb-1 font-semibold">{title}</div> : null}
      {children}
    </aside>
  );
}

export function DocsFooter({
  prev,
  next,
}: {
  prev?: { to: string; label: string };
  next?: { to: string; label: string };
}) {
  return (
    <div className="mt-16 flex items-center justify-between border-t border-border pt-6 text-sm">
      {prev ? (
        <Link to={prev.to} className="text-primary hover:underline">
          ← {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link to={next.to} className="text-primary hover:underline">
          {next.label} →
        </Link>
      ) : null}
    </div>
  );
}
