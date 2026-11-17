import { Link } from 'react-router-dom';
import { ArrowUpRight, Briefcase, DollarSign, Mail, Phone, TrendingUp, Users } from 'lucide-react';
import { LazyFunnelChart } from '@/components/charts/lazy-chart';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import {
  PIPELINE_STAGES,
  crmActivities,
  crmDeals,
  dealsByStage,
  formatDealAmount,
} from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const OPEN_STAGES = ['lead', 'qualified', 'proposal', 'negotiation'] as const;

const funnelData = OPEN_STAGES.map((stage) => {
  const deals = dealsByStage(stage);
  return {
    stage: PIPELINE_STAGES.find((s) => s.id === stage)?.label ?? stage,
    value: deals.reduce((sum, d) => sum + d.amount, 0) / 1000,
    count: deals.length,
  };
});

const REP_ROWS = ['Alex Nguyen', 'Maria Garcia', 'Hiro Tanaka', 'Priya Patel'].map((owner) => {
  const owned = crmDeals.filter((d) => d.owner === owner && d.stage !== 'lost');
  const won = owned.filter((d) => d.stage === 'won');
  const open = owned.filter((d) => OPEN_STAGES.includes(d.stage as (typeof OPEN_STAGES)[number]));
  return {
    owner,
    open: open.length,
    won: won.length,
    pipeline: open.reduce((s, d) => s + d.amount, 0),
  };
});

const openPipeline = crmDeals
  .filter((d) => OPEN_STAGES.includes(d.stage as (typeof OPEN_STAGES)[number]))
  .reduce((s, d) => s + d.amount, 0);

const wonMtd = crmDeals.filter((d) => d.stage === 'won').reduce((s, d) => s + d.amount, 0);

export default function CrmDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="CRM dashboard"
        description="Pipeline health, rep performance, and recent customer touchpoints."
        actions={
          <Button asChild>
            <Link to={urls.app.pages.crm.pipeline}>
              Open pipeline <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open pipeline</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{formatDealAmount(openPipeline)}</p>
            <p className="text-xs text-muted-foreground">Across active stages</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed won (MTD)</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{formatDealAmount(wonMtd)}</p>
            <p className="text-xs text-muted-foreground">Demo period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active deals</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {crmDeals.filter((d) => d.stage !== 'won' && d.stage !== 'lost').length}
            </p>
            <p className="text-xs text-muted-foreground">Excludes closed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activities today</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              {crmActivities.filter((a) => a.occurredAt.startsWith('Today')).length}
            </p>
            <p className="text-xs text-muted-foreground">Calls, emails, meetings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pipeline funnel</CardTitle>
            <CardDescription>Total value (USD thousands) by stage</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <LazyFunnelChart data={funnelData} minHeight={256} className="h-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rep leaderboard</CardTitle>
            <CardDescription>Open pipeline by owner</CardDescription>
          </CardHeader>
          <CardContent>
            <Table framed={false}>
              <TableHeader>
                <TableRow>
                  <TableHead>Rep</TableHead>
                  <TableHead className="text-right">Open</TableHead>
                  <TableHead className="text-right">Won</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {REP_ROWS.map((r) => (
                  <TableRow key={r.owner}>
                    <TableCell className="font-medium">{r.owner}</TableCell>
                    <TableCell className="text-right">{formatDealAmount(r.pipeline)}</TableCell>
                    <TableCell className="text-right">{r.won}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Latest customer touchpoints</CardDescription>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link to={urls.app.pages.crm.activities}>View all</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {crmActivities.slice(0, 6).map((a) => {
            const Icon =
              a.type === 'call'
                ? Phone
                : a.type === 'email'
                  ? Mail
                  : a.type === 'meeting'
                    ? Users
                    : Briefcase;
            return (
              <div
                key={a.id}
                className="flex items-start gap-3 rounded-md border border-border p-3 text-sm"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{a.subject}</p>
                  <p className="text-muted-foreground">
                    {a.contactName} · {a.owner} · {a.occurredAt}
                  </p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline" size="sm">
          <Link to={urls.app.pages.crm.deals}>Deals</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link to={urls.app.pages.crm.contacts}>Contacts</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link to={urls.app.pages.crm.quotes}>Quotes</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link to={urls.app.pages.crm.reports}>Reports</Link>
        </Button>
      </div>
    </div>
  );
}
