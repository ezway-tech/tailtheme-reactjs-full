import { Send } from 'lucide-react';
import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { crmQuotes, formatDealAmount, type QuoteStatus } from '@/mocks/fixtures';

const statusStyle: Record<
  QuoteStatus,
  { variant: 'default' | 'secondary' | 'outline' | 'danger'; label: string }
> = {
  draft: { variant: 'outline', label: 'Draft' },
  sent: { variant: 'secondary', label: 'Sent' },
  accepted: { variant: 'default', label: 'Accepted' },
  expired: { variant: 'danger', label: 'Expired' },
};

export default function QuotesPage() {
  const handleSend = (number: string) => {
    toast.success(`Quote ${number} sent (demo)`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quotes"
        description={`${crmQuotes.length} proposals · track status and validity.`}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quote #</TableHead>
            <TableHead>Deal</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Valid until</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {crmQuotes.map((q) => {
            const s = statusStyle[q.status];
            const canSend = q.status === 'draft';
            return (
              <TableRow key={q.id}>
                <TableCell className="font-mono text-xs">{q.number}</TableCell>
                <TableCell className="max-w-[200px] truncate font-medium">{q.dealTitle}</TableCell>
                <TableCell>{q.companyName}</TableCell>
                <TableCell className="text-right tabular-nums font-medium">
                  {formatDealAmount(q.amount)}
                </TableCell>
                <TableCell>
                  <Badge variant={s.variant}>{s.label}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{q.validUntil}</TableCell>
                <TableCell>{q.owner}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant={canSend ? 'default' : 'outline'}
                    disabled={!canSend}
                    onClick={() => handleSend(q.number)}
                    aria-label={
                      canSend ? `Send quote ${q.number}` : `Quote ${q.number} already sent`
                    }
                  >
                    <Send className="h-4 w-4" />
                    {canSend ? 'Send' : 'Sent'}
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
