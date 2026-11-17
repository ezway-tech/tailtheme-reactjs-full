export interface SampleVehicle {
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
  mpg?: number;
  range?: number;
}

export const sampleVehicles: SampleVehicle[] = [
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
    range: 330,
  },
  {
    id: 'v-2',
    make: 'Toyota',
    model: 'RAV4',
    year: 2024,
    pricePerDay: 89,
    type: 'SUV',
    seats: 5,
    fuel: 'Hybrid',
    transmission: 'Automatic',
    thumbnail: '🚗',
    mpg: 40,
  },
  {
    id: 'v-3',
    make: 'BMW',
    model: '3 Series',
    year: 2023,
    pricePerDay: 120,
    type: 'Sedan',
    seats: 5,
    fuel: 'Gasoline',
    transmission: 'Automatic',
    thumbnail: '🏎️',
    mpg: 32,
  },
  {
    id: 'v-4',
    make: 'Ford',
    model: 'F-150',
    year: 2024,
    pricePerDay: 110,
    type: 'Truck',
    seats: 5,
    fuel: 'Gasoline',
    transmission: 'Automatic',
    thumbnail: '🛻',
    mpg: 24,
  },
  {
    id: 'v-5',
    make: 'Porsche',
    model: '911',
    year: 2022,
    pricePerDay: 299,
    type: 'Coupe',
    seats: 2,
    fuel: 'Gasoline',
    transmission: 'Manual',
    thumbnail: '🏁',
    mpg: 22,
  },
];

export function getSampleVehicle(id: string): SampleVehicle | undefined {
  return sampleVehicles.find((v) => v.id === id);
}
