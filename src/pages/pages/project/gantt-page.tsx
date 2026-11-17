import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const TASKS = [
  { id: 't-1', name: 'Design system tokens', start: 5, width: 28, color: 'bg-primary' },
  { id: 't-2', name: 'Auth refactor', start: 20, width: 35, color: 'bg-accent' },
  { id: 't-3', name: 'Mobile nav polish', start: 40, width: 22, color: 'bg-emerald-500' },
  { id: 't-4', name: 'Q2 release', start: 55, width: 40, color: 'bg-amber-500' },
];

export default function GanttPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Gantt timeline"
        description="Q2 roadmap — horizontal task bars across the quarter."
      />

      <Card>
        <CardHeader>
          <CardTitle>Q2 2026</CardTitle>
          <CardDescription>Apr · May · Jun</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
            <span>Apr W1</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
          {TASKS.map((task) => (
            <div key={task.id} className="space-y-1">
              <p className="text-sm font-medium">{task.name}</p>
              <div className="relative h-8 rounded-md bg-muted">
                <div
                  className={`absolute top-1 h-6 rounded-md ${task.color}`}
                  style={{ left: `${task.start}%`, width: `${task.width}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
