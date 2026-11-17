import { Github, Slack, Zap } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Switch,
  toast,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const INTEGRATIONS = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Post alerts to #engineering when builds fail.',
    icon: Slack,
    connected: true,
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Link repositories for deploy previews and PR comments.',
    icon: Github,
    connected: true,
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Trigger zaps when invoices are paid or users sign up.',
    icon: Zap,
    connected: false,
  },
] as const;

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Integrations"
        description="Connect third-party tools. OAuth stubs — replace with your app credentials."
      />
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {INTEGRATIONS.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <Card>
                <CardHeader className="flex flex-row items-start gap-3 space-y-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{item.name}</CardTitle>
                    <CardDescription className="mt-1">{item.description}</CardDescription>
                  </div>
                  <Badge variant={item.connected ? 'success' : 'outline'}>
                    {item.connected ? 'Connected' : 'Available'}
                  </Badge>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <Switch
                    defaultChecked={item.connected}
                    aria-label={`Toggle ${item.name}`}
                    onCheckedChange={(on) =>
                      toast.message(
                        on ? `Connected ${item.name} (demo)` : `Disconnected ${item.name}`,
                      )
                    }
                  />
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
