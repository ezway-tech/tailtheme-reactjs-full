import { Link, useParams } from 'react-router-dom';
import { Globe, Users } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import {
  contactsByCompany,
  dealsByCompany,
  formatDealAmount,
  getCrmCompany,
  type CompanyTier,
  type DealStage,
} from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const tierStyle: Record<
  CompanyTier,
  { variant: 'default' | 'secondary' | 'outline'; label: string }
> = {
  enterprise: { variant: 'default', label: 'Enterprise' },
  growth: { variant: 'secondary', label: 'Growth' },
  starter: { variant: 'outline', label: 'Starter' },
};

const stageLabel: Record<DealStage, string> = {
  lead: 'Lead',
  qualified: 'Qualified',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  won: 'Won',
  lost: 'Lost',
};

export default function CompanyDetailPage() {
  const { id = 'co-1' } = useParams<{ id: string }>();
  const company = getCrmCompany(id) ?? getCrmCompany('co-1')!;
  const contacts = contactsByCompany(company.id);
  const deals = dealsByCompany(company.id);
  const tier = tierStyle[company.tier];

  return (
    <div className="space-y-6">
      <PageHeader
        title={company.name}
        description={`${company.industry} · ${company.city}`}
        actions={<Badge variant={tier.variant}>{tier.label}</Badge>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">ARR</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">{formatDealAmount(company.arr)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">
              {company.employees.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Domain</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="flex items-center gap-2 text-sm font-medium">
              <Globe className="h-4 w-4 text-muted-foreground" />
              {company.domain}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Account owner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{company.owner}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Contacts
          </CardTitle>
          <CardDescription>{contacts.length} people at this account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table framed={false}>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.title}</TableCell>
                  <TableCell className="text-muted-foreground">{c.email}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link to={urls.app.pages.crm.contactDetail(c.id)}>Open</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Deals</CardTitle>
          <CardDescription>Pipeline tied to {company.name}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {deals.length === 0 ? (
            <p className="text-sm text-muted-foreground">No deals for this company.</p>
          ) : (
            deals.map((d) => (
              <Link
                key={d.id}
                to={urls.app.pages.crm.dealDetail(d.id)}
                className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm transition-colors hover:bg-muted/50"
              >
                <div>
                  <p className="font-medium">{d.title}</p>
                  <p className="text-xs text-muted-foreground">{stageLabel[d.stage]}</p>
                </div>
                <span className="tabular-nums font-medium">{formatDealAmount(d.amount)}</span>
              </Link>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
