import { Download } from 'lucide-react';
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

export default function ProjectReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Project reports"
        description="Sprint burndown and velocity metrics."
        actions={
          <Button variant="outline" onClick={() => toast.success('CSV exported (demo)')}>
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle>Sprint burndown</CardTitle>
          <CardDescription>Sprint 24 · 32 story points · 5 days remaining</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-48 items-end justify-between gap-2 rounded-md border border-dashed border-border bg-muted/30 p-4">
            {[32, 28, 24, 18, 14, 10, 8].map((value, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-sm bg-primary"
                  style={{ height: `${(value / 32) * 100}%` }}
                />
                <span className="text-[10px] text-muted-foreground">D{i + 1}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Chart placeholder — connect to your analytics provider for live data.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
