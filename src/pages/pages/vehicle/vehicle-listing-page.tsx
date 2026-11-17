import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Fuel, Gauge, Search, Settings2, Users } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { MotionCard, StaggerGrid } from '@/components/motion';
import { urls } from '@/routes/urls';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  type: 'Sedan' | 'SUV' | 'EV' | 'Coupe' | 'Truck';
  seats: number;
  fuel: string;
  transmission: 'Automatic' | 'Manual';
  thumbnail: string;
}

const VEHICLES: Vehicle[] = [
  {
    id: 'v-1',
    make: 'Tesla',
    model: 'Model Y',
    year: 2025,
    pricePerDay: 145,
    type: 'EV',
    seats: 5,
    fuel: 'Electric',
    transmission: 'Automatic',
    thumbnail: '🚙',
  },
  {
    id: 'v-2',
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    pricePerDay: 72,
    type: 'Sedan',
    seats: 5,
    fuel: 'Hybrid',
    transmission: 'Automatic',
    thumbnail: '🚗',
  },
  {
    id: 'v-3',
    make: 'Ford',
    model: 'F-150',
    year: 2023,
    pricePerDay: 120,
    type: 'Truck',
    seats: 5,
    fuel: 'Petrol',
    transmission: 'Automatic',
    thumbnail: '🛻',
  },
  {
    id: 'v-4',
    make: 'BMW',
    model: '4 Series',
    year: 2024,
    pricePerDay: 165,
    type: 'Coupe',
    seats: 4,
    fuel: 'Petrol',
    transmission: 'Automatic',
    thumbnail: '🚘',
  },
  {
    id: 'v-5',
    make: 'Jeep',
    model: 'Wrangler',
    year: 2023,
    pricePerDay: 110,
    type: 'SUV',
    seats: 4,
    fuel: 'Petrol',
    transmission: 'Manual',
    thumbnail: '🚙',
  },
  {
    id: 'v-6',
    make: 'Hyundai',
    model: 'Ioniq 6',
    year: 2025,
    pricePerDay: 95,
    type: 'EV',
    seats: 5,
    fuel: 'Electric',
    transmission: 'Automatic',
    thumbnail: '🚗',
  },
];

const TYPES = ['all', 'Sedan', 'SUV', 'EV', 'Coupe', 'Truck'] as const;

export default function VehicleListingPage() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<string>('all');

  const rows = useMemo(
    () =>
      VEHICLES.filter((v) => {
        const label = `${v.make} ${v.model}`.toLowerCase();
        const matchesSearch = !search || label.includes(search.toLowerCase());
        const matchesType = type === 'all' || v.type === type;
        return matchesSearch && matchesType;
      }),
    [search, type],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Find your ride"
        description="Rent or reserve from our fleet of modern vehicles."
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="Make or model…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Body type" />
          </SelectTrigger>
          <SelectContent>
            {TYPES.map((t) => (
              <SelectItem key={t} value={t} className="capitalize">
                {t === 'all' ? 'All body types' : t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <StaggerGrid
        key={`${search}|${type}`}
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        stagger="normal"
      >
        {rows.map((v) => (
          <MotionCard key={v.id} className="h-full">
            <Card className="flex h-full flex-col">
              <CardHeader>
                <div className="flex aspect-video items-center justify-center rounded-md bg-muted text-6xl">
                  <span aria-hidden>{v.thumbnail}</span>
                </div>
                <div className="mt-3 flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {v.make} {v.model}
                    </CardTitle>
                    <CardDescription>
                      {v.year} · {v.type}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{v.transmission}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-2 text-sm text-muted-foreground">
                <div className="flex flex-wrap gap-3">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> {v.seats} seats
                  </span>
                  <span className="flex items-center gap-1">
                    <Fuel className="h-4 w-4" /> {v.fuel}
                  </span>
                  <span className="flex items-center gap-1">
                    <Gauge className="h-4 w-4" /> Unlimited miles
                  </span>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <p className="text-base font-semibold">
                  ${v.pricePerDay}
                  <span className="text-xs font-normal text-muted-foreground">/day</span>
                </p>
                <Button asChild>
                  <Link to={urls.app.pages.vehicle.detail}>
                    <Settings2 className="h-4 w-4" /> View
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </MotionCard>
        ))}
      </StaggerGrid>
    </div>
  );
}
