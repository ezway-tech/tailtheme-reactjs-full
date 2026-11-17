import { Download, FileBarChart, PieChart, TrendingUp } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  toast,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const REPORTS = [
  {
    id: 'r-1',
    title: 'Income statement',
    description: 'Monthly revenue, expenses, and net income.',
    icon: TrendingUp,
  },
  {
    id: 'r-2',
    title: 'Spending breakdown',
    description: 'Category totals and month-over-month trends.',
    icon: PieChart,
  },
  {
    id: 'r-3',
    title: 'Cash flow',
    description: 'Inflows, outflows, and ending balance.',
    icon: FileBarChart,
  },
];

export default function FinancialReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Financial reports"
        description="Generate and export account summaries."
        actions={
          <Button variant="outline" onClick={() => toast.success('CSV exported (demo)')}>
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        {REPORTS.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.id}>
              <CardHeader>
                <Icon className="h-8 w-8 text-primary" />
                <CardTitle className="text-base">{report.title}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="outline" className="w-full">
                  Generate report
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
