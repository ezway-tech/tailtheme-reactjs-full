// TODO: connect to your billing provider (Stripe, Paddle, Lemon Squeezy).

import { CreditCard, Download } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader, PricingBlock, type PricingTier } from '@/components/patterns';
import { toast } from '@/components/ui/sonner';

const TIERS: PricingTier[] = [
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing teams',
    monthlyPrice: 29,
    annualPrice: 23,
    highlighted: true,
    cta: 'Current plan',
    features: [
      { label: 'Unlimited seats' },
      { label: 'Audit log 90 days' },
      { label: 'Priority support' },
    ],
  },
  {
    id: 'business',
    name: 'Business',
    description: 'SSO and advanced controls',
    monthlyPrice: 79,
    annualPrice: 64,
    cta: 'Upgrade',
    features: [{ label: 'Everything in Pro' }, { label: 'SAML SSO' }, { label: 'Dedicated CSM' }],
  },
];

const INVOICES = [
  { id: 'INV-1042', date: 'Apr 1, 2026', amount: '$29.00', status: 'Paid' },
  { id: 'INV-1031', date: 'Mar 1, 2026', amount: '$29.00', status: 'Paid' },
  { id: 'INV-1020', date: 'Feb 1, 2026', amount: '$29.00', status: 'Paid' },
];

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Billing"
        description="Manage subscription, payment method, and invoice history."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current plan</CardTitle>
            <CardDescription>Pro · renews May 1, 2026</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>API requests</span>
                <span className="text-muted-foreground">42k / 100k</span>
              </div>
              <Progress value={42} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage</span>
                <span className="text-muted-foreground">18 GB / 50 GB</span>
              </div>
              <Progress value={36} />
            </div>
            <Button variant="outline" onClick={() => toast.message('Cancel flow (demo)')}>
              Cancel subscription
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" /> Payment method
            </CardTitle>
            <CardDescription>Stripe Elements placeholder — wire your gateway here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border border-dashed border-border bg-muted/40 p-6 text-center text-sm text-muted-foreground">
              Card ending in 4242 · Exp 12/28
            </div>
            <Button variant="secondary" className="w-full">
              Update payment method
            </Button>
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="text-h4 mb-4">Change plan</h2>
        <PricingBlock tiers={TIERS} className="w-full" />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table framed={false}>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">PDF</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.id}</TableCell>
                  <TableCell>{inv.date}</TableCell>
                  <TableCell>{inv.amount}</TableCell>
                  <TableCell>
                    <Badge variant="success">{inv.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" aria-label={`Download ${inv.id}`}>
                      <Download className="h-4 w-4" />
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
