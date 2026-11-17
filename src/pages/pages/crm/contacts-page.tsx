import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { crmContacts, type ContactLifecycle } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const lifecycleStyle: Record<
  ContactLifecycle,
  { variant: 'default' | 'secondary' | 'outline'; label: string }
> = {
  lead: { variant: 'outline', label: 'Lead' },
  customer: { variant: 'default', label: 'Customer' },
  champion: { variant: 'secondary', label: 'Champion' },
};

function contactInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function ContactsPage() {
  const [q, setQ] = useState('');
  const [lifecycle, setLifecycle] = useState<string>('all');

  const rows = useMemo(
    () =>
      crmContacts.filter((c) => {
        const needle = q.trim().toLowerCase();
        const matchesSearch =
          !needle ||
          c.name.toLowerCase().includes(needle) ||
          c.email.toLowerCase().includes(needle) ||
          c.companyName.toLowerCase().includes(needle);
        const matchesLifecycle = lifecycle === 'all' || c.lifecycle === lifecycle;
        return matchesSearch && matchesLifecycle;
      }),
    [q, lifecycle],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contacts"
        description="People across accounts · lifecycle and ownership."
        actions={
          <Button>
            <Plus className="h-4 w-4" /> Add contact
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="Search by name, email, or company…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <Select value={lifecycle} onValueChange={setLifecycle}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Lifecycle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All lifecycles</SelectItem>
            <SelectItem value="lead">Lead</SelectItem>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="champion">Champion</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contact</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Lifecycle</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Last touch</TableHead>
            <TableHead className="w-12" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((c) => {
            const s = lifecycleStyle[c.lifecycle];
            return (
              <TableRow key={c.id}>
                <TableCell>
                  <Link
                    to={urls.app.pages.crm.contactDetail(c.id)}
                    className="flex items-center gap-3 hover:text-primary"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">{contactInitials(c.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.email}</p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>{c.title}</TableCell>
                <TableCell>{c.companyName}</TableCell>
                <TableCell>
                  <Badge variant={s.variant}>{s.label}</Badge>
                </TableCell>
                <TableCell>{c.owner}</TableCell>
                <TableCell className="text-muted-foreground">{c.lastTouch}</TableCell>
                <TableCell>
                  <Button asChild variant="ghost" size="sm">
                    <Link to={urls.app.pages.crm.contactDetail(c.id)}>Open</Link>
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
