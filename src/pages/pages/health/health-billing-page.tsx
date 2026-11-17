import {
  Badge,
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
import { healthBillingSummary, healthClaims, type ClaimStatus } from '@/mocks/fixtures';

const claimStatus: Record<
  ClaimStatus,
  { label: string; variant: 'default' | 'secondary' | 'danger' }
> = {
  paid: { label: 'Paid', variant: 'default' },
  pending: { label: 'Pending', variant: 'secondary' },
  denied: { label: 'Denied', variant: 'danger' },
};

function formatUsd(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export default function HealthBillingPage() {
  const summary = healthBillingSummary;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing & claims"
        description="Insurance claims, patient responsibility, and copay summary."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>YTD billed</CardDescription>
            <CardTitle className="text-2xl">{formatUsd(summary.ytdBilled)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Your responsibility</CardDescription>
            <CardTitle className="text-2xl">{formatUsd(summary.patientResponsibility)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending claims</CardDescription>
            <CardTitle className="text-2xl">{summary.pendingClaims}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent claims</CardTitle>
          <CardDescription>Services submitted to your insurer.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table framed={false}>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Billed</TableHead>
                <TableHead>You owe</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {healthClaims.map((c) => {
                const meta = claimStatus[c.status];
                return (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.service}</TableCell>
                    <TableCell className="text-muted-foreground">{c.date}</TableCell>
                    <TableCell>{formatUsd(c.amount)}</TableCell>
                    <TableCell>{formatUsd(c.patientOwes)}</TableCell>
                    <TableCell>
                      <Badge variant={meta.variant}>{meta.label}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
