import { Link, useParams } from 'react-router-dom';
import { Building2, Mail, Phone } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import {
  crmActivities,
  dealsByContact,
  formatDealAmount,
  getCrmContact,
  type ContactLifecycle,
  type DealStage,
} from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const lifecycleStyle: Record<
  ContactLifecycle,
  { variant: 'default' | 'secondary' | 'outline'; label: string }
> = {
  lead: { variant: 'outline', label: 'Lead' },
  customer: { variant: 'default', label: 'Customer' },
  champion: { variant: 'secondary', label: 'Champion' },
};

const stageLabel: Record<DealStage, string> = {
  lead: 'Lead',
  qualified: 'Qualified',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  won: 'Won',
  lost: 'Lost',
};

function contactInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function ContactDetailPage() {
  const { id = 'ct-1' } = useParams<{ id: string }>();
  const contact = getCrmContact(id) ?? getCrmContact('ct-1')!;
  const deals = dealsByContact(contact.id);
  const recentActivities = crmActivities.filter((a) => a.contactName === contact.name).slice(0, 6);
  const lifecycle = lifecycleStyle[contact.lifecycle];

  return (
    <div className="space-y-6">
      <PageHeader
        title={contact.name}
        description={`${contact.title} at ${contact.companyName}`}
        actions={<Badge variant={lifecycle.variant}>{lifecycle.label}</Badge>}
      />

      <div className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center">
        <Avatar className="h-16 w-16">
          <AvatarFallback className="text-lg">{contactInitials(contact.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1 text-sm">
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a href={`mailto:${contact.email}`} className="hover:text-primary">
              {contact.email}
            </a>
          </p>
          <p className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" />
            {contact.phone}
          </p>
          <p className="text-muted-foreground">
            Owner · {contact.owner} · Last touch {contact.lastTouch}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to={urls.app.pages.crm.companyDetail(contact.companyId)}>
              <Building2 className="h-4 w-4" /> Company
            </Link>
          </Button>
          <Button size="sm">Log activity</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Related deals</CardTitle>
            <CardDescription>{deals.length} open or historical opportunities.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {deals.length === 0 ? (
              <p className="text-sm text-muted-foreground">No deals linked.</p>
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

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Touchpoints with {contact.name}.</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivities.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent activity.</p>
            ) : (
              <ul className="space-y-4">
                {recentActivities.map((a) => (
                  <li key={a.id} className="border-b border-border pb-3 last:border-0 last:pb-0">
                    <p className="text-sm font-medium">{a.subject}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {a.type} · {a.occurredAt}
                      {a.duration ? ` · ${a.duration}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
