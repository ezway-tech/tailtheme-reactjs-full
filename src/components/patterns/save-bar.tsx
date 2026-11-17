import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

export interface SaveBarProps {
  dirty?: boolean;
  saving?: boolean;
  onSave?: () => void;
  onDiscard?: () => void;
  className?: string;
}

/**
 * Sticky bottom bar for settings forms — visible when `dirty` is true.
 */
export function SaveBar({
  dirty = false,
  saving = false,
  onSave,
  onDiscard,
  className,
}: SaveBarProps) {
  if (!dirty) return null;

  return (
    <div
      role="region"
      aria-label="Unsaved changes"
      className={cn(
        'sticky bottom-0 z-sticky flex items-center justify-between gap-3 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md',
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">You have unsaved changes</p>
      <div className="flex gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onDiscard} disabled={saving}>
          Discard
        </Button>
        <Button type="button" size="sm" onClick={onSave} disabled={saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </Button>
      </div>
    </div>
  );
}
