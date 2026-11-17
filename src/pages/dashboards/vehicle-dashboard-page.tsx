import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Car, Cpu, Gauge, MapPin, Wrench } from 'lucide-react';
import {
  Bar,
  BarChart,
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
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { cn } from '@/lib/cn';
import { urls } from '@/routes/urls';

function tooltipStyle(): React.CSSProperties {
  return {
    background: 'hsl(var(--color-card-hsl, 0 0% 100%))',
    border: '1px solid hsl(var(--color-border-hsl, 220 13% 91%))',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
  };
}

const BOOKINGS_30 = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  trips: Math.max(40, Math.round(60 + Math.sin(i / 3) * 12 + randomish(i))),
}));

function randomish(i: number) {
  return ((i * 17) % 13) + ((i * 31) % 7);
}

const FLEET_STATUS = [
  { name: 'Available', val: 34 },
  { name: 'Rented', val: 48 },
  { name: 'Maintenance', val: 12 },
  { name: 'Cleaning', val: 6 },
];

const TOP_VEH = [
  { id: 'V-104', plate: '7XKQ82', hrs: '182h mo', occupancy: 91 },
  { id: 'V-089', plate: '3PMD19', hrs: '168h mo', occupancy: 82 },
  { id: 'V-067', plate: '9ZLQ54', hrs: '140h mo', occupancy: 70 },
];

const MAINT = [
  { unit: 'V-020', note: '12k-mile service · brakes', eta: 'May 06', q: 1 },
  { unit: 'V-089', note: 'Tire rotation · EV health', eta: 'May 09', q: 2 },
];

const BOOKING_ROWS = [
  { rider: 'Camila Ruiz', window: 'May 03 → May 08', tier: 'SUV XL', amt: '$420' },
  { rider: 'Ethan Zhou', window: 'May 04 · day trip', tier: 'Standard', amt: '$89' },
];

const COL = [
  'hsl(var(--color-primary-hsl, 205 70% 37%))',
  'hsl(var(--color-accent-hsl, 16 86% 54%))',
  'hsl(var(--color-warning-hsl, 38 95% 50%))',
  'hsl(var(--color-info-hsl, 200 95% 46%))',
];

const GAUGES = [
  { label: 'Fleet utilization', value: '84%', sub: '+5 QoQ avg', pct: 84, icon: Gauge },
  { label: 'Bookings today', value: '56', sub: '+12 pickups', pct: 78, icon: Car },
  { label: 'Revenue pace', value: '$192k', sub: '+9.8% QoQ', pct: 92, icon: MapPin },
  { label: 'Active rentals', value: '78', sub: '+6 net off‑lot', pct: 65, icon: Cpu },
];

export default function VehicleDashboardPage() {
  const { t } = useTranslation();

  return (
    <div data-dash="vehicle" className="flex flex-col gap-8">
      <PageHeader
        title={t('pages.dashboards.vehicle.title', 'Vehicle')}
        description={t('pages.dashboards.vehicle.subtitle', 'Fleet uptime and revenue pacing.')}
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
              Export KPIs
            </Button>
          </div>
        }
      />

      {/* Utilization gauge row */}
      <section aria-labelledby="veh-gauge-heading">
        <h2
          id="veh-gauge-heading"
          className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
        >
          {t('vehDash.gaugeRow', 'Live utilization')}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {GAUGES.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.label}
                className="rounded-2xl border border-border bg-card p-5 shadow-inner"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                      <Icon className="h-4 w-4 shrink-0" aria-hidden /> {g.label}
                    </p>
                    <p className="mt-3 font-mono text-2xl font-semibold tabular-nums">{g.value}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{g.sub}</p>
                  </div>
                </div>
                <Progress
                  value={g.pct}
                  className="mt-5 h-3 [&>div]:rounded-full [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent"
                />
                <p className="mt-2 text-right font-mono text-[10px] tabular-nums text-muted-foreground">
                  {g.pct}% cap
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>{t('vehDash.tripsVolume', 'Trips initiated — 30d')}</CardTitle>
          <CardDescription>{t('vehDash.tripsBleed', 'Full width · pickups trend')}</CardDescription>
        </CardHeader>
        <CardContent className="-mx-1 h-72 px-2 pb-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={BOOKINGS_30.slice(0, 14)}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--color-border-hsl, 220 13% 91%))"
              />
              <XAxis dataKey="day" fontSize={10} stroke="currentColor" interval={3} />
              <YAxis fontSize={12} stroke="currentColor" />
              <Tooltip contentStyle={tooltipStyle()} />
              <Bar
                dataKey="trips"
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
                name="Starts"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="space-y-4 xl:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>{t('vehDash.usage', 'Fleet cards — plate badge')}</CardTitle>
              <CardDescription>{t('vehDash.usageSub', 'Top vehicles by uptime')}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {TOP_VEH.map((v) => (
                <div
                  key={v.id}
                  className="flex flex-col rounded-2xl border border-border bg-muted/20 p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {v.id}
                    </span>
                    <span className="rounded-md border border-dashed border-primary/45 bg-background px-2 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-primary">
                      {v.plate}
                    </span>
                  </div>
                  <p className="mt-6 font-mono text-sm text-muted-foreground">{v.hrs}</p>
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        {t('vehDash.ocLabel', 'Occupancy')}
                      </span>
                      <span className="font-mono tabular-nums">{v.occupancy}%</span>
                    </div>
                    <Progress value={v.occupancy} className="h-2.5" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('vehDash.recent', 'Recent bookings')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table framed={false}>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rider</TableHead>
                    <TableHead>Window</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead className="text-right">Est.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {BOOKING_ROWS.map((row) => (
                    <TableRow key={row.rider}>
                      <TableCell className="font-medium">{row.rider}</TableCell>
                      <TableCell className="text-muted-foreground">{row.window}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{row.tier}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono tabular-nums">{row.amt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card className="xl:col-span-4">
          <CardHeader>
            <CardTitle>{t('vehDash.fleetPie', 'Fleet status')}</CardTitle>
          </CardHeader>
          <CardContent className="min-h-[240px]">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={FLEET_STATUS}
                  dataKey="val"
                  nameKey="name"
                  innerRadius={44}
                  outerRadius={78}
                >
                  {FLEET_STATUS.map((_, i) => (
                    <Cell key={FLEET_STATUS[i]?.name} fill={COL[i % COL.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle()} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-warning-200 bg-warning/[0.04] dark:border-warning-900 dark:bg-warning/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-sans">
            <Wrench className="h-5 w-5 text-warning-800 dark:text-warning-500" aria-hidden />
            {t('vehDash.maintenance', 'Maintenance queue')}
          </CardTitle>
          <CardDescription>{t('vehDash.queueHint', 'Next two bays · FIFO')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-0">
            {MAINT.map((m, idx) => (
              <li
                key={m.unit}
                className={cn(
                  'relative flex gap-4 border-warning-900/15 py-5 pl-10 dark:border-warning-950/60',
                  idx < MAINT.length - 1 && 'border-b',
                )}
              >
                <span className="absolute left-3 top-5 flex h-7 w-7 items-center justify-center rounded-full border border-warning/40 bg-background font-mono text-xs font-semibold tabular-nums">
                  #{m.q}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <Badge variant="warning">{m.unit}</Badge>
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      {m.eta}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{m.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-dashed p-4">
          <MapPin className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Listing</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.vehicle.listing}>Browse fleet</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4">
          <Car className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Detail</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.vehicle.detail}>Sample VIN page</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4">
          <Gauge className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Booking flow</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.vehicle.booking}>Reserve</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4">
          <Wrench className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Service</CardTitle>
          <Button variant="outline" className="w-full" disabled>
            Fleet ops hub
          </Button>
        </Card>
      </div>
    </div>
  );
}
