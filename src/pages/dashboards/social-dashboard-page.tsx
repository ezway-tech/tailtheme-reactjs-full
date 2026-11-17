import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Hash, Heart, Mail, MessageCircle, Rss, Send, UserPlus, Users } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Avatar,
  AvatarFallback,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { urls } from '@/routes/urls';
import { sampleNotifications, sampleUsers } from '@/mocks/fixtures';
import { formatRelative } from '@/mocks/fixtures/notifications';

function tooltipStyle(): React.CSSProperties {
  return {
    background: 'hsl(var(--color-card-hsl, 0 0% 100%))',
    border: '1px solid hsl(var(--color-border-hsl, 220 13% 91%))',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
  };
}

const ENGAGEMENT = Array.from({ length: 14 }, (_, i) => ({
  day: `D${i + 1}`,
  score: 40 + Math.sin(i / 2) * 22 + i * 1.8,
}));

const TOP_POSTS = [
  { title: 'Ship dark mode tweaks', replies: '128 replies', reactions: '2.4k' },
  { title: 'Roadmap AMA — TailTheme Q2', replies: '86 replies', reactions: '1.1k' },
  { title: 'Retro: motion perf', replies: '44 replies', reactions: '640' },
];

const TRENDING = ['#design-systems', '#accessibility', '#release-notes', '#motion', '#tokens'];

const THREADS = [
  {
    peer: sampleUsers[0]?.name ?? 'Alex Nguyen',
    excerpt: 'Can we gate P2 behind feature flag?',
    at: Date.now() - 120_000,
  },
  {
    peer: sampleUsers[1]?.name ?? 'Maria Garcia',
    excerpt: 'Pushed screenshots to Figma',
    at: Date.now() - 3_600_000,
  },
];

const KPI_COMPACT = [
  { label: 'Followers', value: '18.9k', hint: '+4.2%', icon: Users },
  { label: 'Engagement', value: '6.8%', hint: '+1.8pp', icon: Heart },
  { label: 'Posts today', value: '24', hint: '+18%', icon: Send },
  { label: 'Unread DMs', value: '12', hint: '−3', icon: Mail },
];

export default function SocialDashboardPage() {
  const { t } = useTranslation();

  return (
    <div data-dash="social" className="flex flex-col gap-8">
      <PageHeader
        title={t('pages.dashboards.social.title', 'Social')}
        description={t(
          'pages.dashboards.social.subtitle',
          'Community vitality & inbound attention.',
        )}
        actions={
          <div className="flex flex-wrap gap-2">
            <Select defaultValue="30">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button type="button" variant="outline">
              <UserPlus className="mr-2 h-4 w-4" /> Invite
            </Button>
          </div>
        }
      />

      {/* Compact KPI strip */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {KPI_COMPACT.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3 shadow-sm"
            >
              <Icon className="h-10 w-10 shrink-0 text-muted-foreground" aria-hidden />
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  {k.label}
                </p>
                <p className="text-xl font-semibold tabular-nums">{k.value}</p>
                <p className="text-xs text-muted-foreground">{k.hint}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        {/* Feed stack — 8 cols */}
        <div className="space-y-5 xl:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>{t('socDash.hotThreads', 'Hot discussions')}</CardTitle>
              <CardDescription>
                {t('socDash.feedLead', 'Stacked cards · sparklines synthetic')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {TOP_POSTS.map((p, idx) => (
                <article
                  key={p.title}
                  className="rounded-2xl border border-border bg-muted/20 p-5 shadow-inner transition-colors hover:bg-muted/30"
                >
                  <h3 className="text-base font-semibold leading-snug">{p.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span>{p.replies}</span>
                    <span>{p.reactions} reactions</span>
                  </div>
                  <Progress value={[72, 55, 38][idx] ?? 40} className="mt-4 h-1.5" />
                </article>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link to={urls.app.pages.social.feed}>Open feed</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('socDash.notifs', 'Notifications inbox')}</CardTitle>
              <CardDescription>Demo feed pulled from mocks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {sampleNotifications.slice(0, 3).map((n) => (
                <div
                  key={n.id}
                  className="flex gap-4 border-b border-dashed border-border/80 pb-5 last:border-0 last:pb-0"
                >
                  <Rss className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{n.title}</div>
                    <p className="text-sm text-muted-foreground">{n.description}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {formatRelative(n.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="outline" asChild>
                <Link to={urls.app.pages.social.notifications}>
                  {t('socDash.notificationCenter', 'Notification center')}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Rail: chart + trending + threaded DMs */}
        <div className="flex flex-col gap-6 xl:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('socDash.engCurve', 'Engagement pulse')}</CardTitle>
              <CardDescription>Synthetic cohort index</CardDescription>
            </CardHeader>
            <CardContent className="h-56 px-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ENGAGEMENT}>
                  <defs>
                    <linearGradient id="socEng" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--color-border-hsl, 220 13% 91%))"
                  />
                  <XAxis dataKey="day" fontSize={11} stroke="currentColor" />
                  <YAxis fontSize={11} stroke="currentColor" />
                  <Tooltip contentStyle={tooltipStyle()} />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="var(--color-primary)"
                    fill="url(#socEng)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('socDash.trends', 'Trending topics')}</CardTitle>
              <CardDescription>{t('socDash.trendPills', 'Pill cloud')}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {TRENDING.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
                >
                  <Hash className="h-3.5 w-3.5 opacity-70" aria-hidden />
                  {tag.replace('#', '')}
                </span>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('socDash.messaging', 'Direct threads')}</CardTitle>
              <CardDescription>
                {t('socDash.dmThreadHint', 'Left rail · condensed')}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative pl-6">
              <div className="absolute bottom-8 left-[11px] top-8 w-px bg-border" aria-hidden />
              {THREADS.map((m) => (
                <div key={m.peer} className="relative flex gap-3 pb-6 last:pb-0">
                  <div className="absolute -left-1 top-2 z-[1] h-2.5 w-2.5 rounded-full bg-primary shadow ring-2 ring-background" />
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback>
                      {(m.peer[0] ?? '?') + (m.peer.split(' ')[1]?.[0] ?? '')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1 rounded-2xl border border-border bg-muted/30 px-3 py-2">
                    <div className="flex flex-wrap justify-between gap-2">
                      <span className="text-sm font-medium">{m.peer}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatRelative(new Date(m.at).toISOString())}
                      </span>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">{m.excerpt}</p>
                  </div>
                </div>
              ))}
              <Button className="mt-2 w-full" variant="outline" asChild>
                <Link to={urls.app.pages.social.messages}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Open inbox
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-dashed p-4">
          <Rss className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Feed</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.social.feed}>Follow</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4">
          <MessageCircle className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Messages</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.social.messages}>Inbox</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4">
          <Heart className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Notifications</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.social.notifications}>Open</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4">
          <Users className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Profile</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.social.profile}>View</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
