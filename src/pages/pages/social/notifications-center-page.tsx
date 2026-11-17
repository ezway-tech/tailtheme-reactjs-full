import { useState } from 'react';
import { motion } from 'motion/react';
import { AtSign, Bell, Heart, MessageCircle, UserPlus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { MotionList, MotionListItem } from '@/components/motion';
import { DURATION, EASE } from '@/lib/motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/cn';

type NotifKind = 'mention' | 'follow' | 'like' | 'message' | 'system';

interface Notif {
  id: string;
  kind: NotifKind;
  from: string;
  text: string;
  time: string;
  read: boolean;
}

const NOTIFS: Notif[] = [
  {
    id: 'n-1',
    kind: 'mention',
    from: 'Maria Garcia',
    text: 'mentioned you in a comment on "Theming tokens"',
    time: '2m',
    read: false,
  },
  {
    id: 'n-2',
    kind: 'like',
    from: 'Hiro Tanaka',
    text: 'liked your post',
    time: '10m',
    read: false,
  },
  {
    id: 'n-3',
    kind: 'follow',
    from: 'Priya Patel',
    text: 'started following you',
    time: '1h',
    read: false,
  },
  {
    id: 'n-4',
    kind: 'message',
    from: 'Alex Nguyen',
    text: 'sent you a message',
    time: '3h',
    read: true,
  },
  {
    id: 'n-5',
    kind: 'system',
    from: 'TailTheme',
    text: 'Your weekly digest is ready.',
    time: '1d',
    read: true,
  },
];

const kindIcon: Record<NotifKind, LucideIcon> = {
  mention: AtSign,
  follow: UserPlus,
  like: Heart,
  message: MessageCircle,
  system: Bell,
};

export default function NotificationsCenterPage() {
  const reduced = useReducedMotion();
  const [items, setItems] = useState(NOTIFS);

  const markAll = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const markOne = (id: string) =>
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const unread = items.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description={`${unread} unread notifications`}
        actions={
          <Button variant="outline" onClick={markAll} disabled={unread === 0}>
            Mark all as read
          </Button>
        }
      />

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {(['all', 'mentions', 'system'] as const).map((tab) => {
          const rows =
            tab === 'all'
              ? items
              : tab === 'system'
                ? items.filter((n) => n.kind === 'system')
                : items.filter((n) => n.kind === 'mention');
          return (
            <TabsContent key={tab} value={tab}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base capitalize">{tab}</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="p-0">
                  <MotionList stagger="tight" className="divide-y divide-border">
                    {rows.map((n) => {
                      const Icon = kindIcon[n.kind];
                      return (
                        <MotionListItem key={n.id}>
                          <motion.button
                            type="button"
                            onClick={() => markOne(n.id)}
                            animate={
                              reduced
                                ? undefined
                                : {
                                    opacity: n.read ? 0.55 : 1,
                                    backgroundColor: n.read
                                      ? 'rgba(0,0,0,0)'
                                      : 'var(--bg-muted, rgba(0,0,0,0.04))',
                                  }
                            }
                            transition={{ duration: DURATION.md, ease: EASE.out }}
                            className={cn(
                              'flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/40',
                              !n.read && 'bg-muted/30',
                            )}
                          >
                            <Avatar>
                              <AvatarFallback>
                                {n.from
                                  .split(' ')
                                  .map((s) => s[0])
                                  .join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-sm">
                              <span className="font-medium">{n.from}</span>{' '}
                              <span className="text-muted-foreground">{n.text}</span>
                            </div>
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <span className="w-10 text-right text-xs text-muted-foreground">
                              {n.time}
                            </span>
                            {!n.read ? <Badge className="ml-1">new</Badge> : null}
                          </motion.button>
                        </MotionListItem>
                      );
                    })}
                    {rows.length === 0 ? (
                      <div className="p-8 text-center text-sm text-muted-foreground">
                        No notifications.
                      </div>
                    ) : null}
                  </MotionList>
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
