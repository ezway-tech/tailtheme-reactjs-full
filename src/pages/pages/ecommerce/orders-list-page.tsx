import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
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
import { sampleOrders, type SampleOrder } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const STATUS_VARIANT: Record<
  SampleOrder['status'],
  'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger'
> = {
  pending: 'warning',
  paid: 'outline',
  shipped: 'default',
  delivered: 'success',
  refunded: 'secondary',
};

export default function OrdersListPage() {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | SampleOrder['status']>('all');

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return sampleOrders.filter((o) => {
      if (status !== 'all' && o.status !== status) return false;
      if (needle && !`${o.id} ${o.customer} ${o.email}`.toLowerCase().includes(needle))
        return false;
      return true;
    });
  }, [q, status]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="All customer orders across every channel."
        actions={<Button size="sm">Export CSV</Button>}
      />
      <div className="flex flex-wrap items-center gap-2">
        <Input
          className="max-w-sm"
          placeholder="Search order / customer…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((o) => (
            <TableRow key={o.id}>
              <TableCell className="font-medium">
                <Link to={urls.app.pages.ecommerce.orderDetail(o.id)} className="hover:underline">
                  {o.id}
                </Link>
              </TableCell>
              <TableCell>
                <div className="font-medium">{o.customer}</div>
                <div className="text-xs text-muted-foreground">{o.email}</div>
              </TableCell>
              <TableCell>{o.placedAt}</TableCell>
              <TableCell>{o.items}</TableCell>
              <TableCell>
                <Badge variant={STATUS_VARIANT[o.status]}>{o.status}</Badge>
              </TableCell>
              <TableCell className="text-right tabular-nums">${o.total.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
