import { GripVertical, Plus } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const BACKLOG = [
  { id: 'b-1', title: 'Fix sidebar scroll on mobile', points: 3 },
  { id: 'b-2', title: 'Add CSV export to reports', points: 5 },
  { id: 'b-3', title: 'Improve empty states copy', points: 2 },
];

const SPRINT = [
  { id: 's-1', title: 'Wire social routes', points: 5 },
  { id: 's-2', title: 'Finance cards page', points: 3 },
];

export default function SprintPlanningPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Sprint planning"
        description="Drag cards from backlog into the active sprint (static demo)."
        actions={
          <Button>
            <Plus className="h-4 w-4" /> Add item
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-lg bg-muted/50 p-4">
          <h2 className="mb-3 text-sm font-semibold">Backlog</h2>
          <div className="space-y-2">
            {BACKLOG.map((item) => (
              <Card key={item.id} className="cursor-grab active:cursor-grabbing">
                <CardHeader className="flex flex-row items-center gap-2 space-y-0 p-3">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="flex-1 text-sm">{item.title}</CardTitle>
                  <Badge variant="outline">{item.points} pts</Badge>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-4">
          <h2 className="mb-3 text-sm font-semibold">Sprint 24 · 32 pts</h2>
          <div className="space-y-2">
            {SPRINT.map((item) => (
              <Card key={item.id} className="cursor-grab border-primary/20 active:cursor-grabbing">
                <CardContent className="flex items-center gap-2 p-3">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1 text-sm font-medium">{item.title}</span>
                  <Badge>{item.points} pts</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
