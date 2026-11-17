import { Calendar, MapPin } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const EVENTS = [
  {
    id: 'e-1',
    date: 'May 24',
    title: 'Design Systems Meetup',
    location: 'San Francisco · Hybrid',
    tag: 'This week',
  },
  {
    id: 'e-2',
    date: 'Jun 02',
    title: 'React 19 Workshop',
    location: 'Online',
    tag: 'Workshop',
  },
  {
    id: 'e-3',
    date: 'Jun 18',
    title: 'Tailwind v4 Launch Party',
    location: 'Austin, TX',
    tag: 'Community',
  },
  {
    id: 'e-4',
    date: 'Jul 09',
    title: 'Accessibility Audit Clinic',
    location: 'Remote',
    tag: 'Free',
  },
];

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Events"
        description="Upcoming meetups, workshops, and community gatherings."
        actions={<Button>Host an event</Button>}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {EVENTS.map((event) => (
          <Card key={event.id}>
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-md bg-primary/10 text-primary">
                <Calendar className="h-4 w-4" />
                <span className="text-xs font-semibold">{event.date}</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base">{event.title}</CardTitle>
                  <Badge variant="secondary">{event.tag}</Badge>
                </div>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {event.location}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <Button size="sm" variant="outline">
                RSVP
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
