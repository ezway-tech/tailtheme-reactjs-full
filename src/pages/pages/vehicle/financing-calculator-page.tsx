import { useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@/components/ui';
import { PageContent, PageHeader } from '@/components/patterns';

export default function FinancingCalculatorPage() {
  const [price, setPrice] = useState('32000');
  const [down, setDown] = useState('5000');
  const [termMonths, setTermMonths] = useState('48');
  const [apr, setApr] = useState('5.9');

  const monthly = useMemo(() => {
    const p = Number(price) || 0;
    const d = Number(down) || 0;
    const n = Math.max(1, Number(termMonths) || 1);
    const principal = Math.max(0, p - d);
    const r = (Number(apr) || 0) / 100 / 12;
    if (r === 0) return principal / n;
    return (principal * r * (1 + r) ** n) / ((1 + r) ** n - 1);
  }, [price, down, termMonths, apr]);

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(monthly);

  return (
    <PageContent width="narrow" className="space-y-6">
      <PageHeader
        title="Financing calculator"
        description="Estimate monthly payments from price, down payment, and term."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Loan details</CardTitle>
          <CardDescription>Sample rates for demo purposes only.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <section className="space-y-2">
            <Label htmlFor="price">Vehicle price (USD)</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </section>
          <section className="space-y-2">
            <Label htmlFor="down">Down payment</Label>
            <Input id="down" type="number" value={down} onChange={(e) => setDown(e.target.value)} />
          </section>
          <section className="space-y-2">
            <Label htmlFor="term">Term (months)</Label>
            <Input
              id="term"
              type="number"
              value={termMonths}
              onChange={(e) => setTermMonths(e.target.value)}
            />
          </section>
          <section className="space-y-2">
            <Label htmlFor="apr">APR (%)</Label>
            <Input
              id="apr"
              type="number"
              step="0.1"
              value={apr}
              onChange={(e) => setApr(e.target.value)}
            />
          </section>
        </CardContent>
      </Card>

      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardDescription>Estimated monthly payment</CardDescription>
          <CardTitle className="text-3xl">{formatted}</CardTitle>
        </CardHeader>
      </Card>
    </PageContent>
  );
}
