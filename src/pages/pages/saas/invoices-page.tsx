import { Download } from 'lucide-react';
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
import { urls } from '@/routes/urls';
import { Link } from 'react-router-dom';

const INVOICES = [
  { id: 'INV-1042', date: 'Apr 1, 2026', amount: '$29.00', status: 'Paid', plan: 'Pro' },
  { id: 'INV-1031', date: 'Mar 1, 2026', amount: '$29.00', status: 'Paid', plan: 'Pro' },
  { id: 'INV-1020', date: 'Feb 1, 2026', amount: '$29.00', status: 'Paid', plan: 'Pro' },
  { id: 'INV-1012', date: 'Jan 1, 2026', amount: '$0.00', status: 'Paid', plan: 'Trial' },
  { id: 'INV-1001', date: 'Dec 1, 2025', amount: '$29.00', status: 'Void', plan: 'Pro' },
];

export default function SaasInvoicesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Invoices"
        description="Workspace billing history. Manage payment methods on the billing page."
        actions={
          <Button asChild variant="outline" size="sm">
            <Link to={urls.app.pages.saas.billing}>Billing settings</Link>
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All invoices</CardTitle>
          <CardDescription>Download PDF receipts for accounting.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table framed={false}>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono text-sm">{inv.id}</TableCell>
                  <TableCell>{inv.date}</TableCell>
                  <TableCell>{inv.plan}</TableCell>
                  <TableCell>{inv.amount}</TableCell>
                  <TableCell>
                    <Badge variant={inv.status === 'Void' ? 'secondary' : 'success'}>
                      {inv.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" /> PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
