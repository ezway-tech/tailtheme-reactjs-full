import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Compass,
  Download,
  Mail,
  Megaphone,
  MousePointerClick,
  Newspaper,
  Target,
  UsersRound,
} from 'lucide-react';
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
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { GradientText } from '@/components/motion/gradient-text';
import { cn } from '@/lib/cn';
import { blogPosts } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

function tooltipStyle(): React.CSSProperties {
  return {
    background: 'hsl(var(--color-card-hsl, 0 0% 100%))',
    border: '1px solid hsl(var(--color-border-hsl, 220 13% 91%))',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
  };
}

const TRAFFIC = [
  { w: 'W1', visitors: 12000 },
  { w: 'W2', visitors: 13200 },
  { w: 'W3', visitors: 12800 },
  { w: 'W4', visitors: 14500 },
  { w: 'W5', visitors: 15200 },
  { w: 'W6', visitors: 16800 },
];

const CHANNELS = [
  { source: 'Organic search', share: 38 },
  { source: 'Paid ads', share: 24 },
  { source: 'Referral', share: 16 },
  { source: 'Email', share: 14 },
];

const CHANNELS_RANKED = [...CHANNELS].sort((a, b) => b.share - a.share);
const CHANNEL_MAX = Math.max(...CHANNELS_RANKED.map((c) => c.share), 1);

const FUNNEL = [
  { step: 'Visit', pct: 100 },
  { step: 'Lead', pct: 22 },
  { step: 'Qualified', pct: 8 },
  { step: 'Won', pct: 2.4 },
];

const CAMPAIGNS = [
  { id: 'CP-901', channel: 'Meta', ctr: '2.9%', pipeline: '$42k', status: 'live' },
  { id: 'CP-894', channel: 'Search', ctr: '4.1%', pipeline: '$18k', status: 'optimizing' },
];

const INLINE_KPIS = [
  { label: 'Visitors', value: '16.8k', sub: 'Unique / week', icon: UsersRound },
  { label: 'Leads captured', value: '892', sub: 'Out + inbound', icon: Megaphone },
  { label: 'Subscribers', value: '3.92k', sub: 'Double opt‑in', icon: Mail },
];

export default function MarketingDashboardPage() {
  const { t } = useTranslation();

  return (
    <div data-dash="marketing" className="flex flex-col gap-10">
      <PageHeader
        title={t('pages.dashboards.marketing.title', 'Marketing')}
        description={t('pages.dashboards.marketing.subtitle', 'Acquisition and demand gen.')}
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
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>
        }
      />

      {/* Headline metric */}
      <section className="grid gap-8 rounded-3xl border border-border/80 bg-muted/25 px-6 py-8 sm:px-10 lg:grid-cols-12 lg:py-12">
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {t('mkDash.heroEyebrow', 'North star')}
          </p>
          <p className="mt-6 text-6xl font-semibold tracking-tighter tabular-nums sm:text-7xl">
            <GradientText>2.84%</GradientText>
          </p>
          <p className="mt-4 max-w-sm text-lg text-muted-foreground">
            {t('mkDash.heroMetric', 'Session → lead conversion (rolling 28d).')}
          </p>
          <p className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
            <Badge variant="secondary">+0.12pp</Badge>
            <span>{t('mkDash.heroHint', 'Compared to cohort benchmark')}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-6 lg:col-span-7 lg:justify-end">
          {INLINE_KPIS.map((k) => {
            const Icon = k.icon;
            return (
              <div
                key={k.label}
                className="min-w-[160px] flex-1 rounded-2xl border border-border bg-card px-6 py-5 shadow-sm"
              >
                <Icon className="mb-3 h-6 w-6 text-muted-foreground" aria-hidden />
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {k.label}
                </p>
                <p className="mt-1 text-2xl font-semibold tabular-nums">{k.value}</p>
                <p className="mt-2 text-xs text-muted-foreground">{k.sub}</p>
              </div>
            );
          })}
          <div className="min-w-[140px] flex-1 rounded-2xl border border-dashed border-primary/35 bg-background px-6 py-5">
            <MousePointerClick className="mb-3 h-6 w-6 text-muted-foreground" />
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {t('mkDash.heroConvLabel', 'Click → lead')}
            </p>
            <p className="mt-2 text-xl font-semibold">4.92%</p>
          </div>
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>{t('mkDash.visitorsTraffic', 'Site traffic trend')}</CardTitle>
          <CardDescription>
            {t('mkDash.visitorsTrafficSub', 'Uniques aggregated weekly · demo curve')}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={TRAFFIC}>
              <defs>
                <linearGradient id="mktVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--color-border-hsl, 220 13% 91%))"
              />
              <XAxis dataKey="w" fontSize={12} stroke="currentColor" />
              <YAxis fontSize={12} stroke="currentColor" />
              <Tooltip contentStyle={tooltipStyle()} />
              <Area
                type="monotone"
                dataKey="visitors"
                name="Visitors"
                stroke="var(--color-accent)"
                fill="url(#mktVisitors)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-8 xl:grid-cols-12">
        <Card className="xl:col-span-5">
          <CardHeader>
            <CardTitle>{t('mkDash.channelsBars', 'Channel ranking')}</CardTitle>
            <CardDescription>{t('mkDash.channelsBarsSub', 'Share of acquisition')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {CHANNELS_RANKED.map((c) => (
              <div key={c.source}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">{c.source}</span>
                  <span className="tabular-nums text-muted-foreground">{c.share}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      'h-full rounded-full bg-gradient-to-r from-primary/90 to-accent/90',
                      'transition-[width] duration-500',
                    )}
                    style={{ width: `${(c.share / CHANNEL_MAX) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="xl:col-span-7">
          <CardHeader>
            <CardTitle>{t('mkDash.blogMagazine', 'Editorial radar')}</CardTitle>
            <CardDescription>
              {t('mkDash.blogMagazineSub', 'Magazine grid · first story spans wider')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-12">
              {blogPosts.map((post, i) => (
                <Link
                  key={post.slug}
                  to={urls.app.pages.marketing.blogPost(post.slug)}
                  className={cn(
                    'group overflow-hidden rounded-2xl border border-border shadow-sm transition-shadow hover:shadow-md',
                    i === 0
                      ? 'sm:col-span-12 md:col-span-6 md:row-span-2 lg:col-span-7'
                      : 'sm:col-span-6 lg:col-span-5',
                  )}
                >
                  <div
                    className={cn(
                      'relative min-h-[120px] w-full px-6 py-8 text-white md:min-h-[140px]',
                      post.hero,
                      i === 0 && 'min-h-[200px] md:min-h-[260px]',
                    )}
                  >
                    <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/45" />
                    <div className="relative flex h-full flex-col justify-end gap-2">
                      <p className="text-xs uppercase tracking-[0.15em] text-white/85">
                        {post.publishedAt}
                      </p>
                      <h3
                        className={cn(
                          i === 0 ? 'text-2xl font-semibold lg:text-3xl' : 'text-lg font-semibold',
                        )}
                      >
                        {post.title}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-2 bg-card px-5 py-4">
                    <p
                      className={cn(
                        'line-clamp-2 text-sm text-muted-foreground',
                        i === 0 && 'line-clamp-3 md:text-base',
                      )}
                    >
                      {post.excerpt}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {post.author} · {post.readTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="funnel">
        <TabsList>
          <TabsTrigger value="funnel">{t('mkDash.funnel', 'Lead funnel')}</TabsTrigger>
          <TabsTrigger value="targeting">Targeting</TabsTrigger>
        </TabsList>
        <TabsContent value="funnel">
          <Card>
            <CardContent className="pt-8">
              <div className="space-y-5">
                {FUNNEL.map((f) => (
                  <div key={f.step} className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span>{f.step}</span>
                      <span className="text-muted-foreground">{f.pct}% of top</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-[width]"
                        style={{ width: `${f.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="targeting" className="text-sm text-muted-foreground">
          Persona placeholders — tie to your CRM IDs.
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>{t('mkDash.liveCampaigns', 'Live campaigns')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table framed={false}>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>CTR</TableHead>
                <TableHead>Pipeline</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CAMPAIGNS.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-mono text-xs">{row.id}</TableCell>
                  <TableCell>{row.channel}</TableCell>
                  <TableCell>{row.ctr}</TableCell>
                  <TableCell>{row.pipeline}</TableCell>
                  <TableCell>
                    <Badge variant={row.status === 'live' ? 'success' : 'warning'}>
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-dashed p-4">
          <Compass className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Landing</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.marketing.landing}>Marketing site</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4">
          <Megaphone className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Pricing</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.marketing.pricing}>Plans</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4">
          <Target className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Contact</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.marketing.contact}>Leads form</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4">
          <Newspaper className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Blog</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.marketing.blog}>Editorial</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
