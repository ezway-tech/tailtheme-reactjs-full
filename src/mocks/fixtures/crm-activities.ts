export type ActivityType = 'call' | 'email' | 'meeting' | 'note';

export interface CrmActivity {
  id: string;
  type: ActivityType;
  subject: string;
  dealId?: string;
  dealTitle?: string;
  contactName: string;
  owner: string;
  occurredAt: string;
  duration?: string;
}

export const crmActivities: CrmActivity[] = [
  {
    id: 'ac-1',
    type: 'call',
    subject: 'Discovery call — platform requirements',
    dealId: 'dl-1',
    dealTitle: 'Northwind — annual platform',
    contactName: 'Elena Vasquez',
    owner: 'Alex Nguyen',
    occurredAt: 'Today · 10:30',
    duration: '32 min',
  },
  {
    id: 'ac-2',
    type: 'email',
    subject: 'Sent security questionnaire',
    dealId: 'dl-2',
    dealTitle: 'Globex — robotics telemetry',
    contactName: 'James Okonkwo',
    owner: 'Maria Garcia',
    occurredAt: 'Today · 09:15',
  },
  {
    id: 'ac-3',
    type: 'meeting',
    subject: 'Executive alignment — Litware SSO',
    dealId: 'dl-7',
    dealTitle: 'Litware — enterprise SSO',
    contactName: 'Rachel Stein',
    owner: 'Hiro Tanaka',
    occurredAt: 'Yesterday · 14:00',
    duration: '45 min',
  },
  {
    id: 'ac-4',
    type: 'note',
    subject: 'Champion confirmed budget for Q2',
    dealId: 'dl-6',
    dealTitle: 'Adventure Works — booking API',
    contactName: 'Omar Hassan',
    owner: 'Maria Garcia',
    occurredAt: 'Yesterday',
  },
  {
    id: 'ac-5',
    type: 'call',
    subject: 'Follow-up on lost import dashboard',
    dealId: 'dl-8',
    dealTitle: 'WWI — import dashboard',
    contactName: 'Tom Bradley',
    owner: 'Priya Patel',
    occurredAt: '3d ago',
    duration: '12 min',
  },
  {
    id: 'ac-6',
    type: 'email',
    subject: 'Shared HIPAA BAA draft',
    dealId: 'dl-3',
    dealTitle: 'Contoso — HIPAA workspace',
    contactName: 'Dr. Sarah Lin',
    owner: 'Hiro Tanaka',
    occurredAt: '3d ago',
  },
  {
    id: 'ac-7',
    type: 'meeting',
    subject: 'Demo — fleet analytics dashboards',
    dealId: 'dl-4',
    dealTitle: 'Fabrikam — fleet analytics',
    contactName: 'Marcus Bell',
    owner: 'Alex Nguyen',
    occurredAt: '4d ago',
    duration: '60 min',
  },
  {
    id: 'ac-8',
    type: 'call',
    subject: 'Pricing review with procurement',
    dealId: 'dl-9',
    dealTitle: 'Globex — spare parts portal',
    contactName: 'Yuki Tanaka',
    owner: 'Maria Garcia',
    occurredAt: '5d ago',
    duration: '28 min',
  },
  {
    id: 'ac-9',
    type: 'email',
    subject: 'Quote accepted — creative seats',
    dealId: 'dl-11',
    dealTitle: 'Northwind — creative seats',
    contactName: 'Elena Vasquez',
    owner: 'Alex Nguyen',
    occurredAt: '1w ago',
  },
  {
    id: 'ac-10',
    type: 'meeting',
    subject: 'Product analytics workshop',
    dealId: 'dl-10',
    dealTitle: 'Litware — product analytics add-on',
    contactName: 'Zoe Martins',
    owner: 'Hiro Tanaka',
    occurredAt: '1w ago',
    duration: '50 min',
  },
  {
    id: 'ac-11',
    type: 'note',
    subject: 'POS pilot delayed until fall season',
    dealId: 'dl-5',
    dealTitle: 'Tailwind Outfitters — POS pilot',
    contactName: 'Nina Kowalski',
    owner: 'Priya Patel',
    occurredAt: '1w ago',
  },
  {
    id: 'ac-12',
    type: 'call',
    subject: 'Renewal check-in',
    contactName: 'Omar Hassan',
    owner: 'Maria Garcia',
    occurredAt: '2w ago',
    duration: '18 min',
  },
];

export function activitiesForDeal(dealId: string): CrmActivity[] {
  return crmActivities.filter((a) => a.dealId === dealId);
}
