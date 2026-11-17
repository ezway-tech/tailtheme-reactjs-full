import * as React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, DollarSign, Download, FileText, PiggyBank } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { Reveal } from '@/components/motion';
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

const CASHFLOW = [
  { week: 'W1', income: 18.2, expense: 11.4 },
  { week: 'W2', income: 19.0, expense: 10.8 },
  { week: 'W3', income: 21.2, expense: 12.9 },
  { week: 'W4', income: 20.4, expense: 11.2 },
];

const BUDGET_ROWS = [
  { label: 'Product & eng', spent: 42000, budget: 54000 },
  { label: 'GTM', spent: 22400, budget: 26000 },
  { label: 'Infra', spent: 11800, budget: 13200 },
];

const TRANSACTIONS = [
  { id: 'TRX-9821', from: 'Customer credit', amt: '+$840', ts: 'Today' },
  { id: 'TRX-9814', from: 'Payroll ACH', amt: '−$12.8k', ts: 'Yesterday' },
  { id: 'TRX-9802', from: 'AWS', amt: '−$2.9k', ts: '3d ago' },
];

const UPCOMING_INVOICES = [
  { client: 'Studio Northwind', amt: '$3,420', due: 'May 05' },
  { client: 'Globex Robotics', amt: '$1,090', due: 'May 12' },
];

const ALLOCATION = [
  { name: 'Runway reserve', val: 40 },
  { name: 'Tax escrow', val: 18 },
  { name: 'Ops float', val: 22 },
  { name: 'Credit line', val: 20 },
];

const COLORS_PIE = [
  'hsl(var(--color-primary-hsl, 205 70% 37%))',
  'hsl(var(--color-accent-hsl, 16 86% 54%))',
  'hsl(var(--color-success-hsl, 150 55% 42%))',
  'hsl(var(--color-info-hsl, 200 95% 46%))',
];

const LEDGER_MINI = [
  { label: 'Income MTD', value: '$78.4k', dir: 'up' as const },
  { label: 'Expenses MTD', value: '$46.1k', dir: 'down' as const },
  { label: 'Net (MTD)', value: '+$32.3k', dir: 'up' as const },
];

export default function FinanceDashboardPage() {
  const { t } = useTranslation();

  return (
    <div data-dash="finance" className="flex flex-col gap-8 font-mono text-sm">
      <PageHeader
        title={t('pages.dashboards.finance.title', 'Finance')}
        description={
          <span className="font-sans text-muted-foreground">
            {t('pages.dashboards.finance.subtitle', 'Liquidity & burn profile.')}
          </span>
        }
        actions={
          <div className="flex flex-wrap gap-2 font-sans">
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

      {/* Ledger hero: dominant balance column + cashflow */}
      <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
        <section
          className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-4"
          aria-labelledby="fi-balance-heading"
        >
          <h2
            id="fi-balance-heading"
            className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          >
            {t('fiDash.balanceLabel', 'Combined balance')}
          </h2>
          <p className="mt-4 text-5xl font-semibold tabular-nums tracking-tighter text-foreground md:text-[3.25rem]">
            $428,000
          </p>
          <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <ArrowUpRight
              className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
              aria-hidden
            />
            <span className="tabular-nums text-emerald-600 dark:text-emerald-400">+2.8%</span>
            <span className="font-sans">{t('fiDash.balanceCaption', 'all accounts · MTD')}</span>
          </p>
          <div className="mt-8 space-y-0 border-y border-border font-sans text-xs">
            {LEDGER_MINI.map((row, i) => (
              <Reveal key={row.label} delay={i * 0.04}>
                <div
                  className={cn(
                    'flex items-center justify-between py-3',
                    i < LEDGER_MINI.length - 1 && 'border-b border-dashed border-border/80',
                  )}
                >
                  <span className="text-muted-foreground">{row.label}</span>
                  <span
                    className={cn(
                      'tabular-nums font-semibold tracking-tight',
                      row.dir === 'up' && 'text-emerald-700 dark:text-emerald-400',
                      row.dir === 'down' && 'text-foreground',
                    )}
                  >
                    {row.value}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Link
            to={urls.app.pages.finance.wallet}
            className="mt-6 inline-flex font-sans text-xs font-medium text-primary underline-offset-4 hover:underline"
          >
            {t('fiDash.openWallet', 'Statement →')}
          </Link>
        </section>

        <Card className="overflow-hidden lg:col-span-8">
          <CardHeader className="font-sans">
            <CardTitle>{t('fiDash.cashflow', 'Cash flow (weekly)')}</CardTitle>
            <CardDescription>{t('fiDash.cashflowSub', 'k$ · consolidated')}</CardDescription>
          </CardHeader>
          <CardContent className="-mx-1 h-72 px-4 pb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CASHFLOW}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--color-border-hsl, 220 13% 91%))"
                />
                <XAxis dataKey="week" fontSize={11} stroke="currentColor" />
                <YAxis fontSize={11} stroke="currentColor" />
                <Tooltip contentStyle={tooltipStyle()} />
                <Legend wrapperStyle={{ fontFamily: 'inherit' }} />
                <Line
                  type="monotone"
                  dataKey="income"
                  name="Income"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  name="Expense"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Statement-style budget rows */}
      <Card className="font-sans">
        <CardHeader>
          <CardTitle>{t('fiDash.budgetStatement', 'Budget ledger')}</CardTitle>
          <CardDescription>
            {t('fiDash.budgetStatementSub', 'Actual vs envelope — monospace amounts')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-0 px-0">
          {BUDGET_ROWS.map((b, idx) => {
            const pct = (b.spent / b.budget) * 100;
            return (
              <div
                key={b.label}
                className={cn(
                  'grid gap-2 border-border px-6 py-4 sm:grid-cols-[1fr_auto] sm:items-center',
                  idx > 0 && 'border-t border-dashed',
                )}
              >
                <div>
                  <p className="text-sm font-medium">{b.label}</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-[width]"
                      style={{ width: `${Math.min(100, pct)}%` }}
                    />
                  </div>
                </div>
                <div className="text-right font-mono text-xs tabular-nums text-muted-foreground sm:text-sm">
                  ${(b.spent / 1000).toFixed(1)}k<span className="text-border"> · </span>$
                  {(b.budget / 1000).toFixed(1)}k
                </div>
              </div>
            );
          })}
          <div className="border-t border-border px-6 py-4">
            <Button variant="outline" asChild>
              <Link to={urls.app.pages.finance.budget}>
                {t('fiDash.budgetPage', 'Open budget')}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="font-sans">
            <CardTitle>{t('fiDash.tx', 'Transactions')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table framed={false}>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[120px] font-mono text-xs uppercase">ID</TableHead>
                  <TableHead className="font-sans">Memo</TableHead>
                  <TableHead className="text-right font-mono text-xs uppercase">Amt</TableHead>
                  <TableHead className="w-[100px] font-sans">When</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TRANSACTIONS.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs text-primary">{r.id}</TableCell>
                    <TableCell className="font-sans">{r.from}</TableCell>
                    <TableCell
                      className={cn(
                        'text-right font-mono tabular-nums',
                        r.amt.startsWith('+')
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : 'text-foreground',
                      )}
                    >
                      {r.amt}
                    </TableCell>
                    <TableCell className="font-sans text-muted-foreground">{r.ts}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="font-sans">
            <CardTitle>{t('fiDash.allocation', 'Allocation')}</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ALLOCATION}
                  dataKey="val"
                  nameKey="name"
                  innerRadius={36}
                  outerRadius={72}
                >
                  {ALLOCATION.map((_, i) => (
                    <Cell key={ALLOCATION[i]?.name} fill={COLORS_PIE[i % COLORS_PIE.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle()} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="font-sans">
            <CardTitle>{t('fiDash.upcomingInv', 'Upcoming invoices')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {UPCOMING_INVOICES.map((inv, i) => (
              <div
                key={inv.client}
                className={cn(
                  'flex flex-wrap items-baseline justify-between gap-2 py-3 font-mono text-sm',
                  i > 0 && 'border-t border-dashed border-border',
                )}
              >
                <span className="min-w-0 flex-1 truncate font-sans font-medium">{inv.client}</span>
                <span className="tabular-nums">{inv.amt}</span>
                <span className="font-sans text-xs text-muted-foreground">{inv.due}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="font-sans">
            <CardTitle>{t('fiDash.weekBars', 'Cash by week — compare')}</CardTitle>
          </CardHeader>
          <CardContent className="h-56 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CASHFLOW} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--color-border-hsl, 220 13% 91%))"
                />
                <XAxis dataKey="week" fontSize={11} stroke="currentColor" />
                <YAxis fontSize={11} stroke="currentColor" />
                <Tooltip contentStyle={tooltipStyle()} />
                <Bar
                  dataKey="income"
                  name="Income"
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expense"
                  name="Expense"
                  fill="var(--color-accent)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-dashed p-4 font-sans">
          <PiggyBank className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Wallet</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.finance.wallet}>Balances</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4 font-sans">
          <ArrowUpRight className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Transactions</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.finance.transactions}>Ledger</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4 font-sans">
          <FileText className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Invoices</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.finance.invoices}>AR/AP</Link>
          </Button>
        </Card>
        <Card className="border-dashed p-4 font-sans">
          <DollarSign className="mb-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="mb-3 text-base font-normal">Budget</CardTitle>
          <Button variant="outline" className="w-full" asChild>
            <Link to={urls.app.pages.finance.budget}>Targets</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
