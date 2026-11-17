import { TrendingUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  StatCard,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const HOLDINGS = [
  { symbol: 'VTI', name: 'Total Stock Market', shares: 42, value: 9840, change: '+2.1%' },
  { symbol: 'VXUS', name: 'International Stock', shares: 28, value: 4120, change: '+0.8%' },
  { symbol: 'BND', name: 'Total Bond Market', shares: 65, value: 5280, change: '-0.2%' },
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 15, value: 2895, change: '+4.3%' },
];

const TOTAL = HOLDINGS.reduce((sum, h) => sum + h.value, 0);

export default function InvestmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Investments" description="Portfolio overview and holdings." />

      <StatCard
        label="Total portfolio value"
        value={`$${TOTAL.toLocaleString()}`}
        delta="+2.4%"
        trend="up"
        caption="vs last month"
        icon={TrendingUp}
        className="max-w-sm"
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table framed={false}>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Shares</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {HOLDINGS.map((h) => (
                <TableRow key={h.symbol}>
                  <TableCell className="font-mono font-medium">{h.symbol}</TableCell>
                  <TableCell>{h.name}</TableCell>
                  <TableCell className="text-right">{h.shares}</TableCell>
                  <TableCell className="text-right">${h.value.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-green-600">{h.change}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
