export type VehicleBookingStatus = 'confirmed' | 'completed' | 'cancelled';

export interface VehicleBooking {
  id: string;
  vehicleId: string;
  vehicleLabel: string;
  startDate: string;
  endDate: string;
  status: VehicleBookingStatus;
}

export const vehicleBookings: VehicleBooking[] = [
  {
    id: 'bk-1',
    vehicleId: 'v-1',
    vehicleLabel: '2025 Tesla Model Y',
    startDate: '2026-05-22',
    endDate: '2026-05-25',
    status: 'confirmed',
  },
  {
    id: 'bk-2',
    vehicleId: 'v-2',
    vehicleLabel: '2024 Toyota RAV4',
    startDate: '2026-05-10',
    endDate: '2026-05-12',
    status: 'completed',
  },
  {
    id: 'bk-3',
    vehicleId: 'v-3',
    vehicleLabel: '2023 BMW 3 Series',
    startDate: '2026-06-01',
    endDate: '2026-06-03',
    status: 'confirmed',
  },
];

export const hostUpcomingBookings: VehicleBooking[] = vehicleBookings.filter(
  (b) => b.status === 'confirmed',
);
