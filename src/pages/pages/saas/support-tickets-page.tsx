import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { MessageSquare, Plus } from 'lucide-react';
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

type TicketStatus = 'open' | 'pending' | 'resolved';

interface Ticket {
  id: string;
  subject: string;
  requester: string;
  status: TicketStatus;
  priority: 'low' | 'normal' | 'high';
  updated: string;
}

const TICKETS: Ticket[] = [
  {
    id: 'TCK-441',
    subject: 'Cannot connect Slack integration',
    requester: 'maria@tailtheme.dev',
    status: 'open',
    priority: 'high',
    updated: '10m ago',
  },
  {
    id: 'TCK-438',
    subject: 'Invoice PDF missing line items',
    requester: 'alex@tailtheme.dev',
    status: 'pending',
    priority: 'normal',
    updated: '2h ago',
  },
  {
    id: 'TCK-430',
    subject: 'Request SAML metadata',
    requester: 'enterprise@acme.co',
    status: 'open',
    priority: 'normal',
    updated: '1d ago',
  },
  {
    id: 'TCK-421',
    subject: 'API rate limit clarification',
    requester: 'hiro@tailtheme.dev',
    status: 'resolved',
    priority: 'low',
    updated: '3d ago',
  },
];

const STATUS_VARIANT: Record<TicketStatus, 'default' | 'warning' | 'success'> = {
  open: 'default',
  pending: 'warning',
  resolved: 'success',
};

export default function SupportTicketsPage() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | TicketStatus>('all');

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return TICKETS.filter((t) => {
      if (status !== 'all' && t.status !== status) return false;
      if (needle && !`${t.id} ${t.subject} ${t.requester}`.toLowerCase().includes(needle))
        return false;
      return true;
    });
  }, [q, status]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Support tickets"
        description="Help desk queue for your workspace (demo)."
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4" /> New ticket
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2">
        <Input
          className="max-w-sm"
          placeholder="Search tickets…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Requester</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((t) => (
            <TableRow key={t.id}>
              <TableCell className="font-mono text-xs">
                <Link to="#" className="hover:text-text-brand">
                  {t.id}
                </Link>
              </TableCell>
              <TableCell>{t.subject}</TableCell>
              <TableCell className="text-muted-foreground">{t.requester}</TableCell>
              <TableCell className="capitalize">{t.priority}</TableCell>
              <TableCell>
                <Badge variant={STATUS_VARIANT[t.status]} className="capitalize">
                  {t.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{t.updated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {rows.length === 0 ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <MessageSquare className="h-4 w-4" /> No tickets match your filters.
        </p>
      ) : null}
    </div>
  );
}
