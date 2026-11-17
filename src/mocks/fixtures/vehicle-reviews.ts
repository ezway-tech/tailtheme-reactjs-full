export interface VehicleReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
}

export const vehicleReviews: VehicleReview[] = [
  {
    id: 'rv-1',
    author: 'Alex N.',
    rating: 5,
    title: 'Smooth EV pickup',
    body: 'Model Y was spotless and charged to 90%. Host was responsive.',
    date: '2026-04-02',
  },
  {
    id: 'rv-2',
    author: 'Maria S.',
    rating: 4,
    title: 'Great for a weekend trip',
    body: 'RAV4 handled mountain roads well. Minor scratch noted at return.',
    date: '2026-03-18',
  },
  {
    id: 'rv-3',
    author: 'Jordan K.',
    rating: 5,
    title: 'Premium feel',
    body: 'BMW was exactly as listed. Fast check-in at the lot.',
    date: '2026-03-05',
  },
  {
    id: 'rv-4',
    author: 'Sam T.',
    rating: 3,
    title: 'Okay value',
    body: 'Truck was powerful but cabin smelled like smoke on day one.',
    date: '2026-02-20',
  },
];

export const vehicleRatingBreakdown = [
  { stars: 5, count: 42 },
  { stars: 4, count: 18 },
  { stars: 3, count: 6 },
  { stars: 2, count: 2 },
  { stars: 1, count: 1 },
];

export const vehicleAverageRating = 4.6;
