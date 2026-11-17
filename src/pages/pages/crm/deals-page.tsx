import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import {
  Badge,
  Button,
  Input,
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
import { PIPELINE_STAGES, crmDeals, formatDealAmount, type DealStage } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const stageStyle: Record<
  DealStage,
  { variant: 'default' | 'secondary' | 'outline' | 'danger'; label: string }
> = {
  lead: { variant: 'outline', label: 'Lead' },
  qualified: { variant: 'secondary', label: 'Qualified' },
  proposal: { variant: 'secondary', label: 'Proposal' },
  negotiation: { variant: 'default', label: 'Negotiation' },
  won: { variant: 'default', label: 'Closed won' },
  lost: { variant: 'danger', label: 'Closed lost' },
};

export default function DealsPage() {
  const [q, setQ] = useState('');
  const [stage, setStage] = useState<string>('all');

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return crmDeals.filter((d) => {
      const matchesSearch =
        !needle ||
        d.title.toLowerCase().includes(needle) ||
        d.companyName.toLowerCase().includes(needle) ||
        d.contactName.toLowerCase().includes(needle) ||
        d.owner.toLowerCase().includes(needle);
      const matchesStage = stage === 'all' || d.stage === stage;
      return matchesSearch && matchesStage;
    });
  }, [q, stage]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Deals"
        description={`${crmDeals.length} opportunities across all stages.`}
        actions={
          <Button>
            <Plus className="h-4 w-4" /> New deal
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="Search deals, companies, owners…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <Select value={stage} onValueChange={setStage}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stages</SelectItem>
            {PIPELINE_STAGES.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Deal</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Probability</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Close date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((d) => {
            const s = stageStyle[d.stage];
            return (
              <TableRow key={d.id}>
                <TableCell>
                  <Link
                    to={urls.app.pages.crm.dealDetail(d.id)}
                    className="font-medium hover:text-primary"
                  >
                    {d.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">{d.contactName}</p>
                </TableCell>
                <TableCell>{d.companyName}</TableCell>
                <TableCell>
                  <Badge variant={s.variant}>{s.label}</Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums font-medium">
                  {formatDealAmount(d.amount)}
                </TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">
                  {d.probability}%
                </TableCell>
                <TableCell>{d.owner}</TableCell>
                <TableCell className="text-muted-foreground">{d.closeDate}</TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="ghost" size="sm">
                    <Link to={urls.app.pages.crm.dealDetail(d.id)}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
