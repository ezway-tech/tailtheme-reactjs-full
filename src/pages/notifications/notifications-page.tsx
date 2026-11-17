import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Bell, CheckCircle2, Info, TriangleAlert } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import {
  formatRelative,
  sampleNotifications,
  type NotificationItem,
  type NotificationKind,
} from '@/mocks/fixtures/notifications';
import { cn } from '@/lib/cn';

const KIND_ICON: Record<NotificationKind, React.ComponentType<{ className?: string }>> = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  error: AlertCircle,
};

const KIND_CLASS: Record<NotificationKind, string> = {
  info: 'bg-info-bg text-info-text',
  success: 'bg-success-bg text-success-text',
  warning: 'bg-warning-bg text-warning-text',
  error: 'bg-danger-bg text-danger-text',
};

export default function NotificationsPage() {
  const { t } = useTranslation();
  const [items, setItems] = useState<NotificationItem[]>(sampleNotifications);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={t('pages.notifications.title', 'Notifications')}
        description={t('pages.notifications.subtitle', 'Your recent activity and system messages.')}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => setItems((list) => list.map((n) => ({ ...n, read: true })))}
          >
            Mark all read
          </Button>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4" /> Recent
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {items.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">No notifications.</div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((n) => {
                const Icon = KIND_ICON[n.kind];
                return (
                  <li
                    key={n.id}
                    className={cn(
                      'flex items-start gap-3 p-4 transition-colors',
                      !n.read && 'bg-muted/40',
                    )}
                  >
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                        KIND_CLASS[n.kind],
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={cn('text-sm', !n.read && 'font-semibold')}>{n.title}</span>
                        {!n.read ? (
                          <Badge variant="secondary" className="h-4 px-1 text-[10px]">
                            New
                          </Badge>
                        ) : null}
                      </div>
                      <p className="text-sm text-muted-foreground">{n.description}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatRelative(n.createdAt)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
