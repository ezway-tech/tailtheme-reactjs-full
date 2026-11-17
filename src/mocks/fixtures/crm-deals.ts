export type DealStage = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';

export interface CrmDeal {
  id: string;
  title: string;
  stage: DealStage;
  amount: number;
  probability: number;
  companyId: string;
  companyName: string;
  contactId: string;
  contactName: string;
  owner: string;
  closeDate: string;
  updatedAt: string;
}

export const PIPELINE_STAGES: { id: DealStage; label: string }[] = [
  { id: 'lead', label: 'Lead' },
  { id: 'qualified', label: 'Qualified' },
  { id: 'proposal', label: 'Proposal' },
  { id: 'negotiation', label: 'Negotiation' },
  { id: 'won', label: 'Closed won' },
  { id: 'lost', label: 'Closed lost' },
];

export const crmDeals: CrmDeal[] = [
  {
    id: 'dl-1',
    title: 'Northwind — annual platform',
    stage: 'negotiation',
    amount: 48000,
    probability: 75,
    companyId: 'co-1',
    companyName: 'Northwind Studio',
    contactId: 'ct-1',
    contactName: 'Elena Vasquez',
    owner: 'Alex Nguyen',
    closeDate: '2026-05-28',
    updatedAt: '2h ago',
  },
  {
    id: 'dl-2',
    title: 'Globex — robotics telemetry',
    stage: 'proposal',
    amount: 128000,
    probability: 55,
    companyId: 'co-2',
    companyName: 'Globex Robotics',
    contactId: 'ct-2',
    contactName: 'James Okonkwo',
    owner: 'Maria Garcia',
    closeDate: '2026-06-15',
    updatedAt: 'Today',
  },
  {
    id: 'dl-3',
    title: 'Contoso — HIPAA workspace',
    stage: 'qualified',
    amount: 96000,
    probability: 40,
    companyId: 'co-3',
    companyName: 'Contoso Health',
    contactId: 'ct-3',
    contactName: 'Dr. Sarah Lin',
    owner: 'Hiro Tanaka',
    closeDate: '2026-07-01',
    updatedAt: 'Yesterday',
  },
  {
    id: 'dl-4',
    title: 'Fabrikam — fleet analytics',
    stage: 'lead',
    amount: 32000,
    probability: 15,
    companyId: 'co-4',
    companyName: 'Fabrikam Logistics',
    contactId: 'ct-4',
    contactName: 'Marcus Bell',
    owner: 'Alex Nguyen',
    closeDate: '2026-08-10',
    updatedAt: '3d ago',
  },
  {
    id: 'dl-5',
    title: 'Tailwind Outfitters — POS pilot',
    stage: 'lead',
    amount: 12000,
    probability: 20,
    companyId: 'co-5',
    companyName: 'Tailwind Outfitters',
    contactId: 'ct-5',
    contactName: 'Nina Kowalski',
    owner: 'Priya Patel',
    closeDate: '2026-06-30',
    updatedAt: '1w ago',
  },
  {
    id: 'dl-6',
    title: 'Adventure Works — booking API',
    stage: 'won',
    amount: 54000,
    probability: 100,
    companyId: 'co-6',
    companyName: 'Adventure Works',
    contactId: 'ct-6',
    contactName: 'Omar Hassan',
    owner: 'Maria Garcia',
    closeDate: '2026-04-20',
    updatedAt: '4h ago',
  },
  {
    id: 'dl-7',
    title: 'Litware — enterprise SSO',
    stage: 'negotiation',
    amount: 210000,
    probability: 80,
    companyId: 'co-7',
    companyName: 'Litware Inc',
    contactId: 'ct-7',
    contactName: 'Rachel Stein',
    owner: 'Hiro Tanaka',
    closeDate: '2026-05-22',
    updatedAt: 'Today',
  },
  {
    id: 'dl-8',
    title: 'WWI — import dashboard',
    stage: 'lost',
    amount: 18000,
    probability: 0,
    companyId: 'co-8',
    companyName: 'Wide World Importers',
    contactId: 'ct-8',
    contactName: 'Tom Bradley',
    owner: 'Priya Patel',
    closeDate: '2026-04-01',
    updatedAt: '5d ago',
  },
  {
    id: 'dl-9',
    title: 'Globex — spare parts portal',
    stage: 'qualified',
    amount: 76000,
    probability: 45,
    companyId: 'co-2',
    companyName: 'Globex Robotics',
    contactId: 'ct-9',
    contactName: 'Yuki Tanaka',
    owner: 'Maria Garcia',
    closeDate: '2026-06-08',
    updatedAt: '2d ago',
  },
  {
    id: 'dl-10',
    title: 'Litware — product analytics add-on',
    stage: 'proposal',
    amount: 42000,
    probability: 50,
    companyId: 'co-7',
    companyName: 'Litware Inc',
    contactId: 'ct-10',
    contactName: 'Zoe Martins',
    owner: 'Hiro Tanaka',
    closeDate: '2026-06-20',
    updatedAt: '6h ago',
  },
  {
    id: 'dl-11',
    title: 'Northwind — creative seats',
    stage: 'won',
    amount: 22000,
    probability: 100,
    companyId: 'co-1',
    companyName: 'Northwind Studio',
    contactId: 'ct-1',
    contactName: 'Elena Vasquez',
    owner: 'Alex Nguyen',
    closeDate: '2026-03-15',
    updatedAt: '1w ago',
  },
  {
    id: 'dl-12',
    title: 'Contoso — patient portal',
    stage: 'proposal',
    amount: 88000,
    probability: 60,
    companyId: 'co-3',
    companyName: 'Contoso Health',
    contactId: 'ct-3',
    contactName: 'Dr. Sarah Lin',
    owner: 'Hiro Tanaka',
    closeDate: '2026-07-12',
    updatedAt: 'Yesterday',
  },
];

export function getCrmDeal(id: string): CrmDeal | undefined {
  return crmDeals.find((d) => d.id === id);
}

export function dealsByStage(stage: DealStage): CrmDeal[] {
  return crmDeals.filter((d) => d.stage === stage);
}

export function dealsByContact(contactId: string): CrmDeal[] {
  return crmDeals.filter((d) => d.contactId === contactId);
}

export function dealsByCompany(companyId: string): CrmDeal[] {
  return crmDeals.filter((d) => d.companyId === companyId);
}

export function formatDealAmount(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
