import { useState } from 'react';
import {
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
  toast,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const SUBSCRIPTIONS = [
  { id: 'sub-1', name: 'Netflix', amount: 15.99, cycle: 'Monthly', next: 'Jun 1' },
  { id: 'sub-2', name: 'Spotify', amount: 10.99, cycle: 'Monthly', next: 'May 28' },
  { id: 'sub-3', name: 'GitHub Pro', amount: 4, cycle: 'Monthly', next: 'Jun 12' },
  { id: 'sub-4', name: 'Figma', amount: 15, cycle: 'Monthly', next: 'Jun 5' },
];

export default function RecurringPaymentsPage() {
  const [active, setActive] = useState(SUBSCRIPTIONS);

  function cancel(id: string, name: string) {
    setActive((prev) => prev.filter((s) => s.id !== id));
    toast.success(`${name} cancelled (demo)`);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Recurring payments" description="Manage subscriptions and auto-pay." />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Active subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table framed={false}>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Cycle</TableHead>
                <TableHead>Next charge</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {active.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell className="font-medium">{sub.name}</TableCell>
                  <TableCell className="text-right">${sub.amount}</TableCell>
                  <TableCell>{sub.cycle}</TableCell>
                  <TableCell className="text-muted-foreground">{sub.next}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" onClick={() => cancel(sub.id, sub.name)}>
                      Cancel
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
