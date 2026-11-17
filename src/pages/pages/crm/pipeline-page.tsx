import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardHeader } from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { PIPELINE_STAGES, dealsByStage, formatDealAmount, type DealStage } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';
import { cn } from '@/lib/cn';

const ACTIVE_STAGES: DealStage[] = ['lead', 'qualified', 'proposal', 'negotiation'];
const CLOSED_STAGES: DealStage[] = ['won', 'lost'];

function probabilityVariant(probability: number): 'default' | 'secondary' | 'outline' {
  if (probability >= 75) return 'default';
  if (probability >= 40) return 'secondary';
  return 'outline';
}

export default function PipelinePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Pipeline"
        description="Open opportunities by stage · weighted by probability."
        actions={
          <Button>
            <Plus className="h-4 w-4" /> New deal
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {ACTIVE_STAGES.map((stageId) => {
          const stage = PIPELINE_STAGES.find((s) => s.id === stageId)!;
          const deals = dealsByStage(stageId);
          const columnTotal = deals.reduce((sum, d) => sum + d.amount, 0);

          return (
            <section key={stageId} className="rounded-lg bg-muted/50 p-3">
              <header className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold">{stage.label}</h2>
                  <p className="text-xs text-muted-foreground">
                    {deals.length} deals · {formatDealAmount(columnTotal)}
                  </p>
                </div>
                <Button size="icon" variant="ghost" aria-label={`Add deal to ${stage.label}`}>
                  <Plus className="h-4 w-4" />
                </Button>
              </header>
              <div className="space-y-2">
                {deals.map((deal) => (
                  <Link
                    key={deal.id}
                    to={urls.app.pages.crm.dealDetail(deal.id)}
                    className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Card className="transition-shadow hover:shadow-md">
                      <CardHeader className="space-y-1 pb-2">
                        <p className="text-sm font-medium leading-snug">{deal.title}</p>
                        <p className="text-xs text-muted-foreground">{deal.companyName}</p>
                      </CardHeader>
                      <CardContent className="flex items-center justify-between pt-0">
                        <span className="text-sm font-semibold tabular-nums">
                          {formatDealAmount(deal.amount)}
                        </span>
                        <Badge variant={probabilityVariant(deal.probability)}>
                          {deal.probability}%
                        </Badge>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                {deals.length === 0 ? (
                  <p className="py-6 text-center text-xs text-muted-foreground">No deals</p>
                ) : null}
              </div>
            </section>
          );
        })}
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Closed</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {CLOSED_STAGES.map((stageId) => {
            const stage = PIPELINE_STAGES.find((s) => s.id === stageId)!;
            const deals = dealsByStage(stageId);

            return (
              <section
                key={stageId}
                className={cn(
                  'rounded-lg border border-border p-3',
                  stageId === 'won' ? 'bg-primary/5' : 'bg-destructive/5',
                )}
              >
                <header className="mb-3">
                  <h3 className="text-sm font-semibold">{stage.label}</h3>
                  <p className="text-xs text-muted-foreground">{deals.length} deals</p>
                </header>
                <div className="space-y-2">
                  {deals.map((deal) => (
                    <Link
                      key={deal.id}
                      to={urls.app.pages.crm.dealDetail(deal.id)}
                      className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-sm transition-colors hover:bg-muted/50"
                    >
                      <span className="font-medium">{deal.title}</span>
                      <span className="tabular-nums text-muted-foreground">
                        {formatDealAmount(deal.amount)}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
