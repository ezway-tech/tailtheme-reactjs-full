import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  BadgePercent,
  Download,
  LineChartIcon,
  Package,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Store,
  TruckIcon,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
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
  StatCard,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { GradientText, StaggerGrid } from '@/components/motion';
import { sampleOrders, sampleProducts } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

function tooltipStyle(): React.CSSProperties {
  return {
    background: 'hsl(var(--color-card-hsl, 0 0% 100%))',
    border: '1px solid hsl(var(--color-border-hsl, 220 13% 91%))',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
  };
}

const REVENUE_30 = [
  { day: '1', amt: 8.4 },
  { day: '5', amt: 9.2 },
  { day: '10', amt: 8.9 },
  { day: '15', amt: 10.8 },
  { day: '20', amt: 11.2 },
  { day: '25', amt: 10.9 },
  { day: '30', amt: 12.1 },
];

const CATEGORY_SHARE = sampleProducts.reduce<Record<string, number>>((acc, p) => {
  acc[p.category] = (acc[p.category] ?? 0) + 1;
  return acc;
}, {});
const PIE_COLORS = [
  'hsl(var(--color-primary-hsl, 205 70% 37%))',
  'hsl(var(--color-accent-hsl, 16 86% 54%))',
  'hsl(var(--color-info-hsl, 200 95% 46%))',
  'hsl(var(--color-success-hsl, 150 55% 42%))',
  'hsl(var(--color-warning-hsl, 38 95% 50%))',
];
const CATEGORY_PIE = Object.entries(CATEGORY_SHARE).map(([category, value]) => ({
  category,
  value,
}));

/** Horizontal funnel demo — percentages of top step */
const FUNNEL_ROW = [
  { stepKey: 'ec.funnel.visits', labelFallback: 'Storefront', pct: 100 },
  { stepKey: 'ec.funnel.cart', labelFallback: 'Add to cart', pct: 38 },
  { stepKey: 'ec.funnel.checkout', labelFallback: 'Checkout', pct: 24 },
  { stepKey: 'ec.funnel.paid', labelFallback: 'Paid', pct: 18 },
];

export default function EcommerceDashboardPage() {
  const { t } = useTranslation();
  const hero = sampleProducts[0];

  const kpis = [
    {
      label: 'Revenue (30d)',
      value: '$284k',
      caption: 'Gross merchandise',
      delta: '+14.6%',
      trend: 'up' as const,
      sparkline: [210, 230, 240, 252, 270, 284],
      icon: LineChartIcon,
    },
    {
      label: 'Orders',
      value: '912',
      caption: '+48 vs prior',
      delta: '+5.3%',
      trend: 'up' as const,
      sparkline: [820, 850, 880, 900, 905, 912],
      icon: ShoppingCart,
    },
    {
      label: 'Avg order',
      value: '$312',
      caption: '+2 after returns',
      delta: '−1.1%',
      trend: 'down' as const,
      sparkline: [318, 320, 315, 312, 310, 312],
      icon: Package,
    },
    {
      label: 'Checkout conv.',
      value: '3.8%',
      caption: 'Funnel blended',
      delta: '+0.4pp',
      trend: 'up' as const,
      sparkline: [3.2, 3.3, 3.4, 3.45, 3.65, 3.8],
      icon: BadgePercent,
    },
  ];

  return (
    <div data-dash="ecommerce" className="flex flex-col gap-8">
      <PageHeader
        title={t('pages.dashboards.ecommerce.title', 'E‑commerce')}
        description={
          <span className="inline-flex flex-wrap items-center gap-2">
            {t('pages.dashboards.ecommerce.subtitle', 'Store KPIs and order flow.')}{' '}
            <Sparkles className="h-4 w-4 text-accent" aria-hidden />
            <GradientText className="text-sm font-medium" staticOnly>
              {t('ecDash.visualMerch', 'Visual-first merchandising')}
            </GradientText>
          </span>
        }
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

      {/* Featured SKU hero */}
      {hero ? (
        <Card className="overflow-hidden border-0 shadow-lg ring-1 ring-orange-500/25">
          <div className="grid md:grid-cols-2 md:gap-0">
            <div className="relative aspect-[4/3] min-h-[220px] md:aspect-auto">
              <img
                src={hero.image}
                alt=""
                className="h-full w-full object-cover md:absolute md:inset-0 md:min-h-[280px]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent md:bg-gradient-to-r md:from-background/70 md:to-transparent" />
              <Badge className="absolute left-4 top-4 bg-background/90 text-foreground shadow">
                Featured
              </Badge>
            </div>
            <CardContent className="flex flex-col justify-center gap-4 p-6 md:p-8">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {hero.category}
              </p>
              <h2 className="text-balance font-serif text-2xl font-semibold tracking-tight md:text-3xl">
                {hero.name}
              </h2>
              <p className="line-clamp-3 text-sm text-muted-foreground">{hero.description}</p>
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-bold tabular-nums">${hero.price}</span>
                {hero.originalPrice ? (
                  <span className="text-sm text-muted-foreground line-through">
                    ${hero.originalPrice}
                  </span>
                ) : null}
                <Badge variant={hero.inStock ? 'secondary' : 'danger'}>
                  {hero.inStock
                    ? `${t('ecDash.inStock', 'In stock')}`
                    : `${t('ecDash.outStock', 'Out of stock')}`}
                </Badge>
              </div>
              <Button asChild className="w-fit gap-2">
                <Link to={urls.app.pages.ecommerce.storefront}>
                  {t('ecDash.heroCta', 'Open storefront')}{' '}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </CardContent>
          </div>
        </Card>
      ) : null}

      <StaggerGrid className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" stagger="normal">
        {kpis.map((k) => (
          <StatCard key={k.label} {...k} />
        ))}
      </StaggerGrid>

      {/* Horizontal conversion funnel */}
      <Card className="bg-accent/[0.04] py-5 dark:bg-accent/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">
            {t('ecDash.horizontalFunnel', 'Conversion strip')}
          </CardTitle>
          <CardDescription>
            {t('ecDash.horizontalFunnelDesc', 'Relative flow vs. visits')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-4">
            {FUNNEL_ROW.map((row) => (
              <div key={row.stepKey} className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                  <span>{t(row.stepKey, row.labelFallback)}</span>
                  <span>{row.pct}%</span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-muted shadow-inner">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent opacity-95"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-5">
        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle>{t('ecDash.rev', 'Revenue (30 days)')}</CardTitle>
            <CardDescription>k$ · storefront aggregate</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_30}>
                <defs>
                  <linearGradient id="gmvFillEc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.55} />
                    <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--color-border-hsl, 220 13% 91%))"
                />
                <XAxis dataKey="day" fontSize={11} stroke="currentColor" />
                <YAxis fontSize={12} stroke="currentColor" />
                <Tooltip contentStyle={tooltipStyle()} />
                <Area
                  type="monotone"
                  dataKey="amt"
                  name="GMV (k$/d)"
                  stroke="var(--color-accent)"
                  fill="url(#gmvFillEc)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>{t('ecDash.categories', 'Category mix')}</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_PIE}
                  dataKey="value"
                  nameKey="category"
                  innerRadius={40}
                  outerRadius={76}
                  paddingAngle={3}
                >
                  {CATEGORY_PIE.map((entry, idx) => (
                    <Cell key={entry.category} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle()} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t('ecDash.masonryTitle', 'Catalog highlights')}</h3>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {sampleProducts.slice(1).map((p) => (
            <article
              key={p.id}
              className="mb-4 break-inside-avoid rounded-xl border border-border bg-card shadow-sm ring-1 ring-border/60"
            >
              <img
                src={p.image}
                alt=""
                className="aspect-[4/3] w-full rounded-t-xl object-cover"
                loading="lazy"
              />
              <div className="space-y-2 p-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium leading-snug">{p.name}</span>
                  <Badge
                    variant={p.inStock ? 'outline' : 'danger'}
                    className="shrink-0 text-[10px]"
                  >
                    ${p.price}
                  </Badge>
                </div>
                <p className="line-clamp-2 text-xs text-muted-foreground">{p.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('ecDash.orders', 'Recent orders')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table framed={false}>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleOrders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-mono text-xs">{o.id}</TableCell>
                    <TableCell>{o.customer}</TableCell>
                    <TableCell className="text-right">${o.total}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{o.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4 border-t pt-6">
        <Button variant="outline" asChild>
          <Link to={urls.app.pages.ecommerce.storefront}>
            <Store className="mr-2 h-4 w-4" /> Storefront
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to={urls.app.pages.ecommerce.cart}>
            <ShoppingBag className="mr-2 h-4 w-4" /> Cart
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to={urls.app.pages.ecommerce.orders}>
            <TruckIcon className="mr-2 h-4 w-4" /> Orders
          </Link>
        </Button>
      </div>
    </div>
  );
}
