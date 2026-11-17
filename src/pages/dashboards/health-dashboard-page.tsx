import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ClipboardList, Download, HeartPulse, Stethoscope, Timer, UserCheck } from 'lucide-react';
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

const WEEK_APPTS = [
  { day: 'Mon', count: 42 },
  { day: 'Tue', count: 38 },
  { day: 'Wed', count: 55 },
  { day: 'Thu', count: 48 },
  { day: 'Fri', count: 36 },
];

const CONDITIONS = [
  { name: 'Hypertension', val: 32 },
  { name: 'Diabetes II', val: 18 },
  { name: 'Wellness visit', val: 28 },
  { name: 'Respiratory', val: 22 },
];

const SCHEDULE_TODAY = [
  {
    patient: 'Liam Chen',
    time: '09:30',
    dept: 'Cardio',
    provider: 'Dr. Rao',
    rail: 'emerald' as const,
  },
  {
    patient: 'Maya Patel',
    time: '10:45',
    dept: 'Peds',
    provider: 'Dr. Kim',
    rail: 'primary' as const,
  },
  { patient: 'Noah Reyes', time: '15:15', dept: 'Lab', provider: '—', rail: 'info' as const },
];

const RAIL_CLASSES: Record<string, string> = {
  emerald: 'border-l-emerald-500/70',
  primary: 'border-l-primary',
  info: 'border-l-sky-500/80',
};

const DEPT_LOAD = [
  { dept: 'Cardiology', pct: 86 },
  { dept: 'Primary care', pct: 64 },
  { dept: 'Imaging', pct: 42 },
];

const RECORDS_ROWS = [
  { id: 'MR-9821', note: 'Lipids review', status: 'signed' },
  { id: 'MR-9820', note: 'Vaccinations', status: 'pending' },
];

const PIE_COL = [
  'hsl(var(--color-primary-hsl, 205 70% 37%))',
  'hsl(var(--color-accent-hsl, 16 86% 54%))',
  'hsl(var(--color-success-hsl, 150 55% 42%))',
  'hsl(var(--color-info-hsl, 200 95% 46%))',
];

const KPI_STRIP = [
  { label: "Today's appts", value: '48', sub: '11 tele', icon: ClipboardList },
  { label: 'Active patients', value: '12.4k', sub: '+3.1% 180d', icon: UserCheck },
  { label: 'Median wait', value: '12m', sub: '−2 vs target', icon: Timer },
  { label: 'Satisfaction', value: '4.8★', sub: '90d CSAT', icon: HeartPulse },
];

export default function HealthDashboardPage() {
  const { t } = useTranslation();

  return (
    <div data-dash="health" className="flex flex-col gap-10">
      <PageHeader
        title={t('pages.dashboards.health.title', 'Healthcare')}
        description={t('pages.dashboards.health.subtitle', 'Visit volume & care mix.')}
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
              <Download className="mr-2 h-4 w-4" /> Export PHI-safe
            </Button>
          </div>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {KPI_STRIP.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="rounded-2xl border border-border/80 bg-muted/20 px-5 py-4 shadow-none transition-colors hover:bg-muted/30"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {k.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight">
                    {k.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{k.sub}</p>
                </div>
                <Icon className="mt-1 h-8 w-8 shrink-0 text-muted-foreground/80" aria-hidden />
              </div>
            </div>
          );
        })}
      </div>

      {/* Time rail: today’s corridor */}
      <div className="grid gap-8 xl:grid-cols-12">
        <Card className="border-border/70 shadow-none xl:col-span-7">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle>{t('healthDash.today', 'Today’s corridor')}</CardTitle>
            <CardDescription>{t('healthDash.railSub', 'Time rail · demo slots')}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="relative space-y-0 pl-2">
              <div className="absolute bottom-4 left-[19px] top-4 w-px bg-border" aria-hidden />
              {SCHEDULE_TODAY.map((r) => (
                <div
                  key={`${r.patient}-${r.time}`}
                  className={cn('relative flex gap-6 pb-10 last:pb-3')}
                >
                  <div className="relative z-[1] w-14 shrink-0 pt-0.5 text-right font-mono text-sm tabular-nums text-muted-foreground">
                    {r.time}
                  </div>
                  <div
                    className={cn(
                      'min-w-0 flex-1 rounded-xl border border-border/60 bg-card/70 px-4 py-4 pl-6',
                      'border-l-4 shadow-sm',
                      RAIL_CLASSES[r.rail] ?? 'border-l-border',
                    )}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-medium">{r.patient}</span>
                      <Badge variant="outline" className="font-normal">
                        {r.dept}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t('healthDash.railProvider', 'Provider')} ·{' '}
                      <span className="font-medium text-foreground">{r.provider}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-8 xl:col-span-5">
          <Card className="flex-1 border-border/70 shadow-none">
            <CardHeader>
              <CardTitle>{t('healthDash.volume', 'Appointments — by weekday')}</CardTitle>
            </CardHeader>
            <CardContent className="h-56 px-2 pb-2 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WEEK_APPTS} margin={{ top: 10, left: -10, right: 8, bottom: 0 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--color-border-hsl, 220 13% 91%))"
                  />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="currentColor" />
                  <YAxis tick={{ fontSize: 11 }} stroke="currentColor" />
                  <Tooltip contentStyle={tooltipStyle()} />
                  <Bar
                    dataKey="count"
                    fill="var(--color-primary)"
                    name="Scheduled"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="flex-1 border-border/70 shadow-none">
            <CardHeader className="pb-2">
              <CardTitle>{t('healthDash.conditions', 'Visit reasons')}</CardTitle>
            </CardHeader>
            <CardContent className="h-52 pb-4 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CONDITIONS}
                    dataKey="val"
                    nameKey="name"
                    innerRadius={40}
                    outerRadius={68}
                  >
                    {CONDITIONS.map((_, i) => (
                      <Cell key={CONDITIONS[i]?.name} fill={PIE_COL[i % PIE_COL.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle()} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="border-border/70 shadow-none">
          <CardHeader>
            <CardTitle>{t('healthDash.departments', 'Department load')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 py-6">
            {DEPT_LOAD.map((d) => (
              <div key={d.dept} className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{d.dept}</span>
                  <span className="text-muted-foreground">{d.pct}% of target</span>
                </div>
                <Progress value={d.pct} className="h-3" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-none">
          <CardHeader>
            <CardTitle>{t('healthDash.records', 'Recent charts')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table framed={false}>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECORDS_ROWS.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs">{r.id}</TableCell>
                    <TableCell>{r.note}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{r.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-dashed p-4 shadow-none">
          <ClipboardList className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Appointments</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.health.appointments}>Desk</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4 shadow-none">
          <UserCheck className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Patients</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.health.patients}>Directory</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4 shadow-none">
          <Stethoscope className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Records</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.health.records}>EHR browse</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4 shadow-none">
          <HeartPulse className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Patient</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.health.patientDetail('u-3')}>Sample profile</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
