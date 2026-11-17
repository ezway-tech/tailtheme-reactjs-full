import { Download, FileText, Plus, Send } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
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

interface Invoice {
  id: string;
  client: string;
  issued: string;
  due: string;
  amount: number;
  status: 'paid' | 'open' | 'overdue' | 'draft';
}

const INVOICES: Invoice[] = [
  {
    id: 'INV-2026-0012',
    client: 'ACME Corp.',
    issued: '2026-04-02',
    due: '2026-04-16',
    amount: 2400,
    status: 'paid',
  },
  {
    id: 'INV-2026-0013',
    client: 'Globex Inc.',
    issued: '2026-04-05',
    due: '2026-04-19',
    amount: 1750,
    status: 'open',
  },
  {
    id: 'INV-2026-0014',
    client: 'Soylent Co.',
    issued: '2026-03-21',
    due: '2026-04-04',
    amount: 980,
    status: 'overdue',
  },
  {
    id: 'INV-2026-0015',
    client: 'Initech',
    issued: '2026-04-12',
    due: '2026-04-26',
    amount: 4200,
    status: 'draft',
  },
];

const statusStyle: Record<
  Invoice['status'],
  { variant: 'default' | 'secondary' | 'danger' | 'outline'; label: string }
> = {
  paid: { variant: 'default', label: 'Paid' },
  open: { variant: 'secondary', label: 'Open' },
  overdue: { variant: 'danger', label: 'Overdue' },
  draft: { variant: 'outline', label: 'Draft' },
};

const totals = {
  paid: INVOICES.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0),
  open: INVOICES.filter((i) => i.status === 'open').reduce((s, i) => s + i.amount, 0),
  overdue: INVOICES.filter((i) => i.status === 'overdue').reduce((s, i) => s + i.amount, 0),
};

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="Manage billing and outstanding amounts."
        actions={
          <Button>
            <Plus className="h-4 w-4" /> New invoice
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Paid</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-green-600">
            ${totals.paid.toLocaleString()}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Outstanding</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            ${totals.open.toLocaleString()}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-red-600">
            ${totals.overdue.toLocaleString()}
          </CardContent>
        </Card>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Issued</TableHead>
            <TableHead>Due</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {INVOICES.map((inv) => {
            const style = statusStyle[inv.status];
            return (
              <TableRow key={inv.id}>
                <TableCell className="font-medium">
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" /> {inv.id}
                  </span>
                </TableCell>
                <TableCell>{inv.client}</TableCell>
                <TableCell className="font-mono text-xs">{inv.issued}</TableCell>
                <TableCell className="font-mono text-xs">{inv.due}</TableCell>
                <TableCell>
                  <Badge variant={style.variant}>{style.label}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${inv.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" aria-label="Send">
                    <Send className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" aria-label="Download">
                    <Download className="h-4 w-4" />
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
