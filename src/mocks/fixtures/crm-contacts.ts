export type ContactLifecycle = 'lead' | 'customer' | 'champion';

export interface CrmContact {
  id: string;
  name: string;
  email: string;
  title: string;
  companyId: string;
  companyName: string;
  owner: string;
  lifecycle: ContactLifecycle;
  lastTouch: string;
  phone: string;
}

export const crmContacts: CrmContact[] = [
  {
    id: 'ct-1',
    name: 'Elena Vasquez',
    email: 'elena@northwind.studio',
    title: 'VP Operations',
    companyId: 'co-1',
    companyName: 'Northwind Studio',
    owner: 'Alex Nguyen',
    lifecycle: 'customer',
    lastTouch: '2h ago',
    phone: '+1 206 555 0101',
  },
  {
    id: 'ct-2',
    name: 'James Okonkwo',
    email: 'j.okonkwo@globex.io',
    title: 'CTO',
    companyId: 'co-2',
    companyName: 'Globex Robotics',
    owner: 'Maria Garcia',
    lifecycle: 'champion',
    lastTouch: 'Today',
    phone: '+1 512 555 0142',
  },
  {
    id: 'ct-3',
    name: 'Dr. Sarah Lin',
    email: 's.lin@contoso.health',
    title: 'Director of IT',
    companyId: 'co-3',
    companyName: 'Contoso Health',
    owner: 'Hiro Tanaka',
    lifecycle: 'lead',
    lastTouch: 'Yesterday',
    phone: '+1 617 555 0198',
  },
  {
    id: 'ct-4',
    name: 'Marcus Bell',
    email: 'marcus@fabrikam.co',
    title: 'Head of Procurement',
    companyId: 'co-4',
    companyName: 'Fabrikam Logistics',
    owner: 'Alex Nguyen',
    lifecycle: 'customer',
    lastTouch: '3d ago',
    phone: '+1 312 555 0116',
  },
  {
    id: 'ct-5',
    name: 'Nina Kowalski',
    email: 'nina@tailwindoutfitters.com',
    title: 'Founder',
    companyId: 'co-5',
    companyName: 'Tailwind Outfitters',
    owner: 'Priya Patel',
    lifecycle: 'lead',
    lastTouch: '1w ago',
    phone: '+1 303 555 0133',
  },
  {
    id: 'ct-6',
    name: 'Omar Hassan',
    email: 'omar@adventure.works',
    title: 'COO',
    companyId: 'co-6',
    companyName: 'Adventure Works',
    owner: 'Maria Garcia',
    lifecycle: 'customer',
    lastTouch: '4h ago',
    phone: '+1 503 555 0177',
  },
  {
    id: 'ct-7',
    name: 'Rachel Stein',
    email: 'rachel@litware.com',
    title: 'CFO',
    companyId: 'co-7',
    companyName: 'Litware Inc',
    owner: 'Hiro Tanaka',
    lifecycle: 'champion',
    lastTouch: 'Today',
    phone: '+1 415 555 0120',
  },
  {
    id: 'ct-8',
    name: 'Tom Bradley',
    email: 'tom@wwi.example',
    title: 'Operations Manager',
    companyId: 'co-8',
    companyName: 'Wide World Importers',
    owner: 'Priya Patel',
    lifecycle: 'lead',
    lastTouch: '5d ago',
    phone: '+1 305 555 0188',
  },
  {
    id: 'ct-9',
    name: 'Yuki Tanaka',
    email: 'yuki@globex.io',
    title: 'Procurement Lead',
    companyId: 'co-2',
    companyName: 'Globex Robotics',
    owner: 'Maria Garcia',
    lifecycle: 'customer',
    lastTouch: '2d ago',
    phone: '+1 512 555 0199',
  },
  {
    id: 'ct-10',
    name: 'Zoe Martins',
    email: 'zoe@litware.com',
    title: 'Head of Product',
    companyId: 'co-7',
    companyName: 'Litware Inc',
    owner: 'Hiro Tanaka',
    lifecycle: 'customer',
    lastTouch: '6h ago',
    phone: '+1 415 555 0144',
  },
];

export function getCrmContact(id: string): CrmContact | undefined {
  return crmContacts.find((c) => c.id === id);
}

export function contactsByCompany(companyId: string): CrmContact[] {
  return crmContacts.filter((c) => c.companyId === companyId);
}
