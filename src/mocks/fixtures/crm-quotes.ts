export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'expired';

export interface CrmQuote {
  id: string;
  number: string;
  dealId: string;
  dealTitle: string;
  companyName: string;
  amount: number;
  status: QuoteStatus;
  validUntil: string;
  owner: string;
}

export const crmQuotes: CrmQuote[] = [
  {
    id: 'qt-1',
    number: 'Q-2026-0142',
    dealId: 'dl-1',
    dealTitle: 'Northwind — annual platform',
    companyName: 'Northwind Studio',
    amount: 48000,
    status: 'sent',
    validUntil: '2026-06-01',
    owner: 'Alex Nguyen',
  },
  {
    id: 'qt-2',
    number: 'Q-2026-0138',
    dealId: 'dl-2',
    dealTitle: 'Globex — robotics telemetry',
    companyName: 'Globex Robotics',
    amount: 128000,
    status: 'draft',
    validUntil: '2026-06-20',
    owner: 'Maria Garcia',
  },
  {
    id: 'qt-3',
    number: 'Q-2026-0129',
    dealId: 'dl-7',
    dealTitle: 'Litware — enterprise SSO',
    companyName: 'Litware Inc',
    amount: 210000,
    status: 'sent',
    validUntil: '2026-05-30',
    owner: 'Hiro Tanaka',
  },
  {
    id: 'qt-4',
    number: 'Q-2026-0115',
    dealId: 'dl-6',
    dealTitle: 'Adventure Works — booking API',
    companyName: 'Adventure Works',
    amount: 54000,
    status: 'accepted',
    validUntil: '2026-04-30',
    owner: 'Maria Garcia',
  },
  {
    id: 'qt-5',
    number: 'Q-2026-0102',
    dealId: 'dl-12',
    dealTitle: 'Contoso — patient portal',
    companyName: 'Contoso Health',
    amount: 88000,
    status: 'sent',
    validUntil: '2026-07-15',
    owner: 'Hiro Tanaka',
  },
  {
    id: 'qt-6',
    number: 'Q-2026-0098',
    dealId: 'dl-10',
    dealTitle: 'Litware — product analytics add-on',
    companyName: 'Litware Inc',
    amount: 42000,
    status: 'draft',
    validUntil: '2026-06-25',
    owner: 'Hiro Tanaka',
  },
  {
    id: 'qt-7',
    number: 'Q-2026-0084',
    dealId: 'dl-8',
    dealTitle: 'WWI — import dashboard',
    companyName: 'Wide World Importers',
    amount: 18000,
    status: 'expired',
    validUntil: '2026-04-01',
    owner: 'Priya Patel',
  },
  {
    id: 'qt-8',
    number: 'Q-2026-0071',
    dealId: 'dl-11',
    dealTitle: 'Northwind — creative seats',
    companyName: 'Northwind Studio',
    amount: 22000,
    status: 'accepted',
    validUntil: '2026-03-20',
    owner: 'Alex Nguyen',
  },
];

export function quotesForDeal(dealId: string): CrmQuote[] {
  return crmQuotes.filter((q) => q.dealId === dealId);
}
