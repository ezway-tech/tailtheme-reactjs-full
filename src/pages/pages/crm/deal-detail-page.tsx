import { Link, useParams } from 'react-router-dom';
import { Building2, Calendar, DollarSign, Percent, User } from 'lucide-react';
import {
  Badge,
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
  activitiesForDeal,
  formatDealAmount,
  getCrmDeal,
  quotesForDeal,
  type DealStage,
  type QuoteStatus,
} from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const stageLabel: Record<DealStage, string> = {
  lead: 'Lead',
  qualified: 'Qualified',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  won: 'Closed won',
  lost: 'Closed lost',
};

const quoteStatusStyle: Record<
  QuoteStatus,
  { variant: 'default' | 'secondary' | 'outline' | 'danger'; label: string }
> = {
  draft: { variant: 'outline', label: 'Draft' },
  sent: { variant: 'secondary', label: 'Sent' },
  accepted: { variant: 'default', label: 'Accepted' },
  expired: { variant: 'danger', label: 'Expired' },
};

export default function DealDetailPage() {
  const { id = 'dl-1' } = useParams<{ id: string }>();
  const deal = getCrmDeal(id) ?? getCrmDeal('dl-1')!;
  const activities = activitiesForDeal(deal.id);
  const quotes = quotesForDeal(deal.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title={deal.title}
        description={`${deal.companyName} · ${deal.contactName} · ${deal.owner}`}
        actions={
          <Badge variant={deal.stage === 'lost' ? 'danger' : 'default'}>
            {stageLabel[deal.stage]}
          </Badge>
        }
      />

      <div className="flex flex-wrap gap-2">
        <Button asChild variant="outline" size="sm">
          <Link to={urls.app.pages.crm.contactDetail(deal.contactId)}>
            <User className="h-4 w-4" /> Contact
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link to={urls.app.pages.crm.companyDetail(deal.companyId)}>
            <Building2 className="h-4 w-4" /> Company
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link to={urls.app.pages.crm.activities}>All activities</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link to={urls.app.pages.crm.quotes}>Quotes</Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Deal value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">{formatDealAmount(deal.amount)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
            <Percent className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Win probability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">{deal.probability}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Expected close</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{deal.closeDate}</p>
            <p className="text-xs text-muted-foreground">Updated {deal.updatedAt}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity timeline</CardTitle>
          <CardDescription>Calls, emails, and meetings on this deal.</CardDescription>
        </CardHeader>
        <CardContent>
          {activities.length === 0 ? (
            <p className="text-sm text-muted-foreground">No activities logged yet.</p>
          ) : (
            <ol className="relative space-y-6 border-l border-border pl-6">
              {activities.map((a) => (
                <li key={a.id} className="relative">
                  <span className="absolute -left-[1.6rem] flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-[10px] font-medium uppercase text-muted-foreground">
                    {a.type.slice(0, 2)}
                  </span>
                  <p className="text-sm font-medium">{a.subject}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.contactName} · {a.owner}
                    {a.duration ? ` · ${a.duration}` : ''}
                  </p>
                  <p className="text-xs text-muted-foreground">{a.occurredAt}</p>
                </li>
              ))}
            </ol>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quotes</CardTitle>
          <CardDescription>Proposals linked to this opportunity.</CardDescription>
        </CardHeader>
        <CardContent>
          {quotes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No quotes yet.</p>
          ) : (
            <Table framed={false}>
              <TableHeader>
                <TableRow>
                  <TableHead>Quote #</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Valid until</TableHead>
                  <TableHead>Owner</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map((q) => {
                  const st = quoteStatusStyle[q.status];
                  return (
                    <TableRow key={q.id}>
                      <TableCell className="font-mono text-xs">{q.number}</TableCell>
                      <TableCell className="text-right tabular-nums font-medium">
                        {formatDealAmount(q.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={st.variant}>{st.label}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{q.validUntil}</TableCell>
                      <TableCell>{q.owner}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
