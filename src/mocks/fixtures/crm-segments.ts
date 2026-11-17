export interface CrmSegment {
  id: string;
  name: string;
  description: string;
  contactCount: number;
  dealCount: number;
  owner: string;
  updatedAt: string;
}

export const crmSegments: CrmSegment[] = [
  {
    id: 'sg-1',
    name: 'Enterprise healthcare',
    description: 'Companies in healthcare with ARR > $250k',
    contactCount: 24,
    dealCount: 8,
    owner: 'Hiro Tanaka',
    updatedAt: 'Today',
  },
  {
    id: 'sg-2',
    name: 'At-risk renewals',
    description: 'Customers with no activity in 30+ days',
    contactCount: 12,
    dealCount: 4,
    owner: 'Maria Garcia',
    updatedAt: 'Yesterday',
  },
  {
    id: 'sg-3',
    name: 'High-intent inbound',
    description: 'Leads from pricing page last 14 days',
    contactCount: 38,
    dealCount: 11,
    owner: 'Alex Nguyen',
    updatedAt: '2d ago',
  },
  {
    id: 'sg-4',
    name: 'West coast growth',
    description: 'Growth tier accounts in PT timezone',
    contactCount: 19,
    dealCount: 6,
    owner: 'Priya Patel',
    updatedAt: '3d ago',
  },
  {
    id: 'sg-5',
    name: 'Closed-won champions',
    description: 'Contacts tagged champion with open expansion',
    contactCount: 9,
    dealCount: 5,
    owner: 'Maria Garcia',
    updatedAt: '1w ago',
  },
];
