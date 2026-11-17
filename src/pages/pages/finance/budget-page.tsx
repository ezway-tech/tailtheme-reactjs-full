import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';

interface Budget {
  id: string;
  category: string;
  spent: number;
  limit: number;
  emoji: string;
}

const BUDGETS: Budget[] = [
  { id: 'b-1', category: 'Groceries', spent: 312, limit: 500, emoji: '🛒' },
  { id: 'b-2', category: 'Dining', spent: 188, limit: 250, emoji: '🍽️' },
  { id: 'b-3', category: 'Transport', spent: 92, limit: 150, emoji: '🚗' },
  { id: 'b-4', category: 'Entertainment', spent: 120, limit: 120, emoji: '🎬' },
  { id: 'b-5', category: 'Utilities', spent: 210, limit: 300, emoji: '💡' },
  { id: 'b-6', category: 'Savings goal', spent: 450, limit: 1000, emoji: '🏖️' },
];

export default function BudgetPage() {
  const totalSpent = BUDGETS.reduce((s, b) => s + b.spent, 0);
  const totalLimit = BUDGETS.reduce((s, b) => s + b.limit, 0);
  const percent = Math.round((totalSpent / totalLimit) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Budget"
        description="Plan, track, and stay on top of monthly spending."
        actions={<Button>New budget</Button>}
      />

      <Card>
        <CardHeader>
          <CardTitle>Monthly overview</CardTitle>
          <CardDescription>
            ${totalSpent.toLocaleString()} of ${totalLimit.toLocaleString()} · {percent}% used
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={percent} />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {BUDGETS.map((b) => {
          const pct = Math.round((b.spent / b.limit) * 100);
          const remaining = Math.max(b.limit - b.spent, 0);
          const over = b.spent > b.limit;
          return (
            <Card key={b.id}>
              <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <span className="text-2xl" aria-hidden>
                  {b.emoji}
                </span>
                <div className="flex-1">
                  <CardTitle className="text-base">{b.category}</CardTitle>
                  <CardDescription>
                    ${b.spent} / ${b.limit}
                  </CardDescription>
                </div>
                <span
                  className={over ? 'text-sm font-semibold text-red-600' : 'text-sm font-semibold'}
                >
                  {pct}%
                </span>
              </CardHeader>
              <CardContent className="space-y-2">
                <Progress value={Math.min(pct, 100)} />
                <p className="text-xs text-muted-foreground">
                  {over ? `Over budget by $${b.spent - b.limit}` : `$${remaining} remaining`}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
