import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from './button';

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

/**
 * Syntax-highlighted code block (Shiki, lazy-loaded). Falls back to plain `<pre>` while loading.
 */
export function CodeBlock({
  code,
  language = 'tsx',
  showLineNumbers = false,
  className,
  ...props
}: CodeBlockProps) {
  const [html, setHtml] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const { codeToHtml } = await import('shiki');
        const out = await codeToHtml(code, {
          lang: language,
          theme: 'github-dark',
        });
        if (!cancelled) setHtml(out);
      } catch {
        if (!cancelled) setHtml(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-border/60 px-3 py-1.5">
        <span className="font-mono text-xs text-muted-foreground">{language}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-foreground"
          aria-label={copied ? 'Copied' : 'Copy code'}
          onClick={() => void handleCopy()}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>
      {html ? (
        <div
          className={cn(
            '[&_pre]:m-0 [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:text-sm',
            showLineNumbers && '[&_pre]:pl-12',
            className,
          )}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre
          className={cn(
            'overflow-x-auto p-4 font-mono text-sm text-foreground/90',
            showLineNumbers && 'pl-12',
            className,
          )}
          {...props}
        >
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
CodeBlock.displayName = 'CodeBlock';
