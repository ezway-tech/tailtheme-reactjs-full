import { Clock } from 'lucide-react';
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { waitingRoomQueue, type WaitingStatus } from '@/mocks/fixtures';

const statusMeta: Record<
  WaitingStatus,
  { label: string; variant: 'default' | 'secondary' | 'outline' }
> = {
  'checked-in': { label: 'Checked in', variant: 'secondary' },
  'in-room': { label: 'In room', variant: 'outline' },
  called: { label: 'Called', variant: 'default' },
};

export default function WaitingRoomPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Waiting room"
        description="Live queue with position, ETA, and check-in status."
      />

      <ul className="space-y-3">
        {waitingRoomQueue.map((entry) => {
          const meta = statusMeta[entry.status];
          return (
            <li key={entry.id}>
              <Card>
                <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
                  <div>
                    <CardTitle className="text-base">{entry.patient}</CardTitle>
                    <CardDescription>{entry.reason}</CardDescription>
                  </div>
                  <Badge variant={meta.variant}>{meta.label}</Badge>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <span>Position #{entry.position}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" aria-hidden />
                    ETA ~{entry.etaMinutes} min
                  </span>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
