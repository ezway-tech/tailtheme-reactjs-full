import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  toast,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { vehicleBookings, type VehicleBookingStatus } from '@/mocks/fixtures';

const statusVariant: Record<VehicleBookingStatus, 'default' | 'secondary' | 'outline' | 'danger'> =
  {
    confirmed: 'default',
    completed: 'secondary',
    cancelled: 'danger',
  };

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState(vehicleBookings);

  function cancel(id: string) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' as const } : b)),
    );
    toast.success('Reservation cancelled (demo)');
  }

  return (
    <section className="space-y-6">
      <PageHeader title="My bookings" description="Your vehicle reservations and trip history." />

      <ul className="space-y-3">
        {bookings.map((b) => (
          <li key={b.id}>
            <Card>
              <CardHeader className="flex flex-row items-start justify-between gap-3 pb-2">
                <div>
                  <CardTitle className="text-base">{b.vehicleLabel}</CardTitle>
                  <CardDescription>
                    {b.startDate} → {b.endDate}
                  </CardDescription>
                </div>
                <Badge variant={statusVariant[b.status]} className="capitalize">
                  {b.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={b.status !== 'confirmed'}
                  onClick={() => cancel(b.id)}
                >
                  Cancel reservation
                </Button>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
