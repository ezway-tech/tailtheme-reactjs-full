import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { crmCompanies, formatDealAmount, type CompanyTier } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const tierStyle: Record<
  CompanyTier,
  { variant: 'default' | 'secondary' | 'outline'; label: string }
> = {
  enterprise: { variant: 'default', label: 'Enterprise' },
  growth: { variant: 'secondary', label: 'Growth' },
  starter: { variant: 'outline', label: 'Starter' },
};

function formatArr(amount: number): string {
  return formatDealAmount(amount);
}

export default function CompaniesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Companies"
        description={`${crmCompanies.length} accounts · tier and ARR overview.`}
        actions={
          <Button>
            <Plus className="h-4 w-4" /> Add company
          </Button>
        }
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead className="text-right">ARR</TableHead>
            <TableHead className="text-right">Employees</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>City</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {crmCompanies.map((co) => {
            const t = tierStyle[co.tier];
            return (
              <TableRow key={co.id}>
                <TableCell>
                  <Link
                    to={urls.app.pages.crm.companyDetail(co.id)}
                    className="font-medium hover:text-primary"
                  >
                    {co.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{co.domain}</p>
                </TableCell>
                <TableCell>{co.industry}</TableCell>
                <TableCell>
                  <Badge variant={t.variant}>{t.label}</Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums font-medium">
                  {formatArr(co.arr)}
                </TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">
                  {co.employees.toLocaleString()}
                </TableCell>
                <TableCell>{co.owner}</TableCell>
                <TableCell className="text-muted-foreground">{co.city}</TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="ghost" size="sm">
                    <Link to={urls.app.pages.crm.companyDetail(co.id)}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
