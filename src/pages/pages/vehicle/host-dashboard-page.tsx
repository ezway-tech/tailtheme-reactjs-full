import { Calendar, Car, DollarSign } from 'lucide-react';
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  StatCard,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { hostUpcomingBookings } from '@/mocks/fixtures';

export default function HostDashboardPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        title="Host dashboard"
        description="Fleet performance and upcoming guest reservations."
      />

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Active listings" value="5" icon={Car} delta="+1" trend="up" />
        <StatCard label="Bookings (30d)" value="18" icon={Calendar} delta="+4" trend="up" />
        <StatCard label="Earnings (30d)" value="$4,280" icon={DollarSign} trend="neutral" />
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upcoming bookings</CardTitle>
          <CardDescription>Confirmed trips starting soon.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table framed={false}>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hostUpcomingBookings.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.vehicleLabel}</TableCell>
                  <TableCell>{b.startDate}</TableCell>
                  <TableCell>{b.endDate}</TableCell>
                  <TableCell>
                    <Badge variant="default" className="capitalize">
                      {b.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
