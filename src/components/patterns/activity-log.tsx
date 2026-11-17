import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/cn';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface ActivityLogEntry {
  id: string;
  actorName: string;
  actorAvatar?: string;
  verb: string;
  target?: string;
  timestamp: Date;
}

export interface ActivityLogProps {
  entries: ActivityLogEntry[];
  className?: string;
  emptyMessage?: string;
}

function initials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Audit / activity feed — avatar, actor, verb, target, relative time.
 */
export function ActivityLog({
  entries,
  className,
  emptyMessage = 'No activity yet.',
}: ActivityLogProps) {
  if (entries.length === 0) {
    return (
      <p
        className={cn(
          'rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground',
          className,
        )}
      >
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className={cn('divide-y divide-border rounded-lg border border-border bg-card', className)}>
      {entries.map((entry) => (
        <li key={entry.id} className="flex gap-3 p-4">
          <Avatar size="sm">
            {entry.actorAvatar ? <AvatarImage src={entry.actorAvatar} alt="" /> : null}
            <AvatarFallback>{initials(entry.actorName)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm">
              <span className="font-medium text-foreground">{entry.actorName}</span>{' '}
              <span className="text-muted-foreground">{entry.verb}</span>
              {entry.target ? (
                <>
                  {' '}
                  <span className="font-medium text-foreground">{entry.target}</span>
                </>
              ) : null}
            </p>
            <time
              className="text-caption text-muted-foreground"
              dateTime={entry.timestamp.toISOString()}
            >
              {formatDistanceToNow(entry.timestamp, { addSuffix: true })}
            </time>
          </div>
        </li>
      ))}
    </ul>
  );
}
