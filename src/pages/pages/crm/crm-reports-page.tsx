import { useMemo } from 'react';
import {
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
  crmDeals,
  dealsByStage,
  formatDealAmount,
  type DealStage,
} from '@/mocks/fixtures';
import { cn } from '@/lib/cn';

const OPEN_STAGES: DealStage[] = ['lead', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];

export default function CrmReportsPage() {
  const funnel = useMemo(
    () =>
      OPEN_STAGES.map((stageId) => {
        const deals = dealsByStage(stageId);
        const label = PIPELINE_STAGES.find((s) => s.id === stageId)!.label;
        const total = deals.reduce((sum, d) => sum + d.amount, 0);
        return { stageId, label, count: deals.length, total };
      }),
    [],
  );

  const maxCount = Math.max(...funnel.map((f) => f.count), 1);

  const leaderboard = useMemo(() => {
    const map = new Map<
      string,
      { deals: number; won: number; pipeline: number; weighted: number }
    >();
    for (const d of crmDeals) {
      const cur = map.get(d.owner) ?? { deals: 0, won: 0, pipeline: 0, weighted: 0 };
      cur.deals += 1;
      if (d.stage === 'won') {
        cur.won += d.amount;
      } else if (d.stage !== 'lost') {
        cur.pipeline += d.amount;
        cur.weighted += d.amount * (d.probability / 100);
      }
      map.set(d.owner, cur);
    }
    return [...map.entries()]
      .map(([rep, stats]) => ({ rep, ...stats }))
      .sort((a, b) => b.weighted - a.weighted);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="CRM reports" description="Funnel by stage and rep performance." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pipeline funnel</CardTitle>
            <CardDescription>Deal count and total value by stage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {funnel.map((f) => (
              <div key={f.stageId}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">{f.label}</span>
                  <span className="tabular-nums text-muted-foreground">
                    {f.count} deals · {formatDealAmount(f.total)}
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      'h-full rounded-full bg-gradient-to-r from-primary/90 to-accent/90',
                      'transition-[width] duration-500',
                    )}
                    style={{ width: `${(f.count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rep leaderboard</CardTitle>
            <CardDescription>Weighted pipeline and closed-won revenue.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table framed={false}>
              <TableHeader>
                <TableRow>
                  <TableHead>Rep</TableHead>
                  <TableHead className="text-right">Deals</TableHead>
                  <TableHead className="text-right">Weighted</TableHead>
                  <TableHead className="text-right">Open pipeline</TableHead>
                  <TableHead className="text-right">Won</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((row, i) => (
                  <TableRow key={row.rep}>
                    <TableCell className="font-medium">
                      <span className="mr-2 text-muted-foreground">#{i + 1}</span>
                      {row.rep}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{row.deals}</TableCell>
                    <TableCell className="text-right tabular-nums font-medium">
                      {formatDealAmount(row.weighted)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums text-muted-foreground">
                      {formatDealAmount(row.pipeline)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums text-muted-foreground">
                      {formatDealAmount(row.won)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
