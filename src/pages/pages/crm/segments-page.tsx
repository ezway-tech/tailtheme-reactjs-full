import { Plus, Users } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { crmSegments } from '@/mocks/fixtures';

export default function SegmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Segments"
        description="Saved audiences for outreach and pipeline focus."
        actions={
          <Button>
            <Plus className="h-4 w-4" /> New segment
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {crmSegments.map((segment) => (
          <Card key={segment.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <Users className="h-5 w-5 text-primary" />
                <Badge variant="outline">{segment.updatedAt}</Badge>
              </div>
              <CardTitle className="text-base">{segment.name}</CardTitle>
              <CardDescription>{segment.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-6 text-sm">
              <div>
                <p className="text-2xl font-semibold tabular-nums">{segment.contactCount}</p>
                <p className="text-xs text-muted-foreground">Contacts</p>
              </div>
              <div>
                <p className="text-2xl font-semibold tabular-nums">{segment.dealCount}</p>
                <p className="text-xs text-muted-foreground">Deals</p>
              </div>
            </CardContent>
            <CardFooter className="mt-auto flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs text-muted-foreground">Owner · {segment.owner}</span>
              <Button size="sm" variant="outline">
                View
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
