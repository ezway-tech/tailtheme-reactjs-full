import { useMemo, useState } from 'react';
import { Download, Search } from 'lucide-react';
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

interface Tx {
  id: string;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  status: 'cleared' | 'pending' | 'failed';
}

const TRANSACTIONS: Tx[] = [
  {
    id: 'tx-001',
    date: '2026-04-18',
    merchant: 'Whole Foods',
    category: 'Groceries',
    amount: -86.42,
    status: 'cleared',
  },
  {
    id: 'tx-002',
    date: '2026-04-18',
    merchant: 'Netflix',
    category: 'Entertainment',
    amount: -14.99,
    status: 'cleared',
  },
  {
    id: 'tx-003',
    date: '2026-04-17',
    merchant: 'Payroll TailTheme Inc.',
    category: 'Income',
    amount: 3450,
    status: 'cleared',
  },
  {
    id: 'tx-004',
    date: '2026-04-16',
    merchant: 'Uber',
    category: 'Transport',
    amount: -22.3,
    status: 'pending',
  },
  {
    id: 'tx-005',
    date: '2026-04-15',
    merchant: 'Amazon',
    category: 'Shopping',
    amount: -129.9,
    status: 'cleared',
  },
  {
    id: 'tx-006',
    date: '2026-04-14',
    merchant: 'Starbucks',
    category: 'Food & drink',
    amount: -5.75,
    status: 'cleared',
  },
  {
    id: 'tx-007',
    date: '2026-04-14',
    merchant: 'Refund — ACME',
    category: 'Refund',
    amount: 32.1,
    status: 'cleared',
  },
  {
    id: 'tx-008',
    date: '2026-04-13',
    merchant: 'Spotify',
    category: 'Entertainment',
    amount: -9.99,
    status: 'failed',
  },
];

const statusVariant: Record<Tx['status'], 'default' | 'secondary' | 'danger'> = {
  cleared: 'default',
  pending: 'secondary',
  failed: 'danger',
};

export default function TransactionsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('all');

  const rows = useMemo(
    () =>
      TRANSACTIONS.filter((t) => {
        const matchesSearch = !search || t.merchant.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = status === 'all' || t.status === status;
        return matchesSearch && matchesStatus;
      }),
    [search, status],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions"
        description="Every money movement across your accounts."
        actions={
          <Button variant="outline">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search merchant…"
            className="pl-8"
          />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="cleared">Cleared</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Merchant</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((t) => (
            <TableRow key={t.id}>
              <TableCell className="font-mono text-xs">{t.date}</TableCell>
              <TableCell className="font-medium">{t.merchant}</TableCell>
              <TableCell className="text-muted-foreground">{t.category}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[t.status]} className="capitalize">
                  {t.status}
                </Badge>
              </TableCell>
              <TableCell
                className={'text-right font-medium ' + (t.amount < 0 ? '' : 'text-green-600')}
              >
                {t.amount < 0 ? '-' : '+'}${Math.abs(t.amount).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                No transactions match your filters.
              </TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </div>
  );
}
