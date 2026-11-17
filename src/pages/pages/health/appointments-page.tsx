import { Calendar, Clock, MapPin, Plus, Video } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';

interface Appointment {
  id: string;
  patient: string;
  reason: string;
  date: string;
  time: string;
  kind: 'in-person' | 'telehealth';
  location: string;
  status: 'confirmed' | 'waiting' | 'completed' | 'cancelled';
}

const APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    patient: 'Nora Kim',
    reason: 'Follow-up · Cardio',
    date: 'Today',
    time: '09:30',
    kind: 'in-person',
    location: 'Clinic 2B',
    status: 'confirmed',
  },
  {
    id: 'apt-2',
    patient: 'Jorge Pérez',
    reason: 'Initial consult',
    date: 'Today',
    time: '10:15',
    kind: 'telehealth',
    location: 'Zoom',
    status: 'waiting',
  },
  {
    id: 'apt-3',
    patient: 'Chen Wei',
    reason: 'Annual physical',
    date: 'Today',
    time: '11:00',
    kind: 'in-person',
    location: 'Clinic 1A',
    status: 'confirmed',
  },
  {
    id: 'apt-4',
    patient: 'Priya Patel',
    reason: 'Lab review',
    date: 'Today',
    time: '13:30',
    kind: 'telehealth',
    location: 'Zoom',
    status: 'confirmed',
  },
  {
    id: 'apt-5',
    patient: 'Alex Nguyen',
    reason: 'Follow-up · Derm',
    date: 'Today',
    time: '15:00',
    kind: 'in-person',
    location: 'Clinic 3C',
    status: 'cancelled',
  },
];

const statusStyle: Record<
  Appointment['status'],
  { variant: 'default' | 'secondary' | 'outline' | 'danger'; label: string }
> = {
  confirmed: { variant: 'default', label: 'Confirmed' },
  waiting: { variant: 'secondary', label: 'Waiting room' },
  completed: { variant: 'outline', label: 'Completed' },
  cancelled: { variant: 'danger', label: 'Cancelled' },
};

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments"
        description="Today's schedule for Dr. Lee — neurology"
        actions={
          <Button>
            <Plus className="h-4 w-4" /> Add appointment
          </Button>
        }
      />

      <Tabs defaultValue="today">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This week</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-3">
          {APPOINTMENTS.map((a) => {
            const s = statusStyle[a.status];
            return (
              <Card key={a.id}>
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {a.patient
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{a.patient}</CardTitle>
                        <CardDescription>{a.reason}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={s.variant}>{s.label}</Badge>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm text-muted-foreground">
                  <div className="flex flex-wrap gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> {a.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {a.time}
                    </span>
                    <span className="flex items-center gap-1">
                      {a.kind === 'telehealth' ? (
                        <Video className="h-4 w-4" />
                      ) : (
                        <MapPin className="h-4 w-4" />
                      )}
                      {a.location}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button size="sm" disabled={a.status === 'cancelled'}>
                      {a.kind === 'telehealth' ? 'Join call' : 'Check in'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="week" className="text-sm text-muted-foreground">
          Weekly view placeholder — sample page.
        </TabsContent>
        <TabsContent value="upcoming" className="text-sm text-muted-foreground">
          Upcoming appointments will appear here.
        </TabsContent>
      </Tabs>
    </div>
  );
}
