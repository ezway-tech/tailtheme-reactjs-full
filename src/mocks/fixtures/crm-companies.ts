export type CompanyTier = 'enterprise' | 'growth' | 'starter';

export interface CrmCompany {
  id: string;
  name: string;
  domain: string;
  industry: string;
  tier: CompanyTier;
  arr: number;
  employees: number;
  owner: string;
  city: string;
}

export const crmCompanies: CrmCompany[] = [
  {
    id: 'co-1',
    name: 'Northwind Studio',
    domain: 'northwind.studio',
    industry: 'Creative agency',
    tier: 'growth',
    arr: 84000,
    employees: 42,
    owner: 'Alex Nguyen',
    city: 'Seattle',
  },
  {
    id: 'co-2',
    name: 'Globex Robotics',
    domain: 'globex.io',
    industry: 'Manufacturing',
    tier: 'enterprise',
    arr: 420000,
    employees: 890,
    owner: 'Maria Garcia',
    city: 'Austin',
  },
  {
    id: 'co-3',
    name: 'Contoso Health',
    domain: 'contoso.health',
    industry: 'Healthcare',
    tier: 'enterprise',
    arr: 310000,
    employees: 1200,
    owner: 'Hiro Tanaka',
    city: 'Boston',
  },
  {
    id: 'co-4',
    name: 'Fabrikam Logistics',
    domain: 'fabrikam.co',
    industry: 'Logistics',
    tier: 'growth',
    arr: 156000,
    employees: 210,
    owner: 'Alex Nguyen',
    city: 'Chicago',
  },
  {
    id: 'co-5',
    name: 'Tailwind Outfitters',
    domain: 'tailwindoutfitters.com',
    industry: 'Retail',
    tier: 'starter',
    arr: 28000,
    employees: 18,
    owner: 'Priya Patel',
    city: 'Denver',
  },
  {
    id: 'co-6',
    name: 'Adventure Works',
    domain: 'adventure.works',
    industry: 'Travel',
    tier: 'growth',
    arr: 92000,
    employees: 64,
    owner: 'Maria Garcia',
    city: 'Portland',
  },
  {
    id: 'co-7',
    name: 'Litware Inc',
    domain: 'litware.com',
    industry: 'SaaS',
    tier: 'enterprise',
    arr: 520000,
    employees: 340,
    owner: 'Hiro Tanaka',
    city: 'San Francisco',
  },
  {
    id: 'co-8',
    name: 'Wide World Importers',
    domain: 'wwi.example',
    industry: 'Import / export',
    tier: 'starter',
    arr: 44000,
    employees: 26,
    owner: 'Priya Patel',
    city: 'Miami',
  },
];

export function getCrmCompany(id: string): CrmCompany | undefined {
  return crmCompanies.find((c) => c.id === id);
}
