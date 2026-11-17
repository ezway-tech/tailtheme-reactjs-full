import { Calendar, FileText, Mail, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { ActivityType, CrmActivity } from '@/mocks/fixtures';

const activityMeta: Record<ActivityType, { icon: LucideIcon; label: string; className: string }> = {
  call: { icon: Phone, label: 'Call', className: 'bg-primary/10 text-primary' },
  email: { icon: Mail, label: 'Email', className: 'bg-secondary text-secondary-foreground' },
  meeting: { icon: Calendar, label: 'Meeting', className: 'bg-accent/15 text-accent-foreground' },
  note: { icon: FileText, label: 'Note', className: 'bg-muted text-muted-foreground' },
};

export interface CrmActivityTimelineProps {
  activities: CrmActivity[];
  className?: string;
  emptyMessage?: string;
}

/**
 * Vertical CRM activity feed with a stable rail, icon markers, and card rows.
 */
export function CrmActivityTimeline({
  activities,
  className,
  emptyMessage = 'No activities logged yet.',
}: CrmActivityTimelineProps) {
  if (activities.length === 0) {
    return (
      <p
        className={cn(
          'rounded-lg border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground',
          className,
        )}
      >
        {emptyMessage}
      </p>
    );
  }

  return (
    <div
      className={cn('overflow-hidden rounded-lg border border-border bg-card shadow-sm', className)}
    >
      <div className="relative p-4 sm:p-6">
        <div className="absolute bottom-6 left-[2.25rem] top-6 w-px bg-border" aria-hidden />
        <ol className="space-y-0">
          {activities.map((activity, index) => {
            const meta = activityMeta[activity.type];
            const Icon = meta.icon;

            return (
              <li
                key={activity.id}
                className={cn('relative flex gap-4', index < activities.length - 1 && 'pb-8')}
              >
                <span
                  className={cn(
                    'relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-2 ring-card',
                    meta.className,
                  )}
                  aria-hidden
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1 rounded-lg border border-border bg-background p-4 shadow-sm">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {meta.label}
                      </p>
                      <p className="font-medium">{activity.subject}</p>
                    </div>
                    <p className="shrink-0 text-xs text-muted-foreground">{activity.occurredAt}</p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {activity.contactName} · {activity.owner}
                    {activity.duration ? ` · ${activity.duration}` : ''}
                  </p>
                  {activity.dealTitle ? (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Deal · {activity.dealTitle}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
