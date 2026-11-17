export interface HealthProvider {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  location: string;
  accepting: boolean;
}

export const healthProviders: HealthProvider[] = [
  {
    id: 'dr-lee',
    name: 'Dr. Sarah Lee',
    specialty: 'Internal medicine',
    rating: 4.9,
    location: 'Building A · Floor 2',
    accepting: true,
  },
  {
    id: 'dr-ortega',
    name: 'Dr. Miguel Ortega',
    specialty: 'Cardiology',
    rating: 4.8,
    location: 'Building B · Floor 4',
    accepting: true,
  },
  {
    id: 'dr-patel',
    name: 'Dr. Priya Patel',
    specialty: 'Endocrinology',
    rating: 4.7,
    location: 'Telehealth',
    accepting: false,
  },
  {
    id: 'dr-chen',
    name: 'Dr. Chen Wei',
    specialty: 'Pulmonology',
    rating: 4.6,
    location: 'Building A · Floor 3',
    accepting: true,
  },
];
