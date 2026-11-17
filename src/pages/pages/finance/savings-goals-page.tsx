import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const GOALS = [
  { id: 'g-1', name: 'Vacation fund', target: 3000, saved: 1850, emoji: '🏖️' },
  { id: 'g-2', name: 'Emergency fund', target: 10000, saved: 6200, emoji: '🛡️' },
];

export default function SavingsGoalsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Savings goals" description="Track progress toward your targets." />

      <div className="grid gap-6 md:grid-cols-2">
        {GOALS.map((goal) => {
          const pct = Math.round((goal.saved / goal.target) * 100);
          return (
            <Card key={goal.id}>
              <CardHeader className="items-center text-center">
                <span className="text-4xl" aria-hidden>
                  {goal.emoji}
                </span>
                <CardTitle className="text-base">{goal.name}</CardTitle>
                <CardDescription>
                  ${goal.saved.toLocaleString()} of ${goal.target.toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <div
                  className="relative flex h-28 w-28 items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(hsl(var(--primary)) ${pct}%, hsl(var(--muted)) ${pct}%)`,
                  }}
                >
                  <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full bg-card text-sm font-semibold">
                    {pct}%
                  </div>
                </div>
                <Progress value={pct} className="w-full" />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
