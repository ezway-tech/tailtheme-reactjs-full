import { useState } from 'react';
import { Plus, RefreshCw, Trash2, Webhook } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from '@/components/ui';
import { PageHeader, useConfirm } from '@/components/patterns';

interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  enabled: boolean;
  lastDelivery: string;
  status: 'healthy' | 'failing';
}

const INITIAL: WebhookEndpoint[] = [
  {
    id: 'wh-1',
    url: 'https://api.acme.co/hooks/tailtheme',
    events: ['order.created', 'invoice.paid'],
    enabled: true,
    lastDelivery: '2m ago',
    status: 'healthy',
  },
  {
    id: 'wh-2',
    url: 'https://hooks.slack.com/services/T00/B00/xxx',
    events: ['member.invited'],
    enabled: false,
    lastDelivery: '3d ago',
    status: 'failing',
  },
];

export default function WebhooksPage() {
  const confirm = useConfirm();
  const [endpoints, setEndpoints] = useState(INITIAL);
  const [url, setUrl] = useState('');

  const addEndpoint = () => {
    if (!url.trim()) return;
    setEndpoints((prev) => [
      ...prev,
      {
        id: `wh-${Date.now()}`,
        url: url.trim(),
        events: ['*'],
        enabled: true,
        lastDelivery: 'Never',
        status: 'healthy',
      },
    ]);
    setUrl('');
    toast.success('Webhook endpoint created (demo)');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Webhooks"
        description="Subscribe to workspace events and inspect delivery logs."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Add endpoint</CardTitle>
          <CardDescription>HTTPS URLs only. Signing secret shown once on create.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <div className="min-w-[280px] flex-1 space-y-2">
            <Label htmlFor="wh-url">Endpoint URL</Label>
            <Input
              id="wh-url"
              placeholder="https://example.com/webhooks"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Button className="self-end" onClick={addEndpoint}>
            <Plus className="h-4 w-4" /> Add
          </Button>
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>URL</TableHead>
            <TableHead>Events</TableHead>
            <TableHead>Last delivery</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-24">Enabled</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {endpoints.map((ep) => (
            <TableRow key={ep.id}>
              <TableCell className="max-w-xs truncate font-mono text-xs">{ep.url}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {ep.events.map((e) => (
                    <Badge key={e} variant="secondary" className="text-xs">
                      {e}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{ep.lastDelivery}</TableCell>
              <TableCell>
                <Badge variant={ep.status === 'healthy' ? 'success' : 'danger'}>{ep.status}</Badge>
              </TableCell>
              <TableCell>
                <Switch
                  checked={ep.enabled}
                  onCheckedChange={(checked) =>
                    setEndpoints((prev) =>
                      prev.map((x) => (x.id === ep.id ? { ...x, enabled: checked } : x)),
                    )
                  }
                />
              </TableCell>
              <TableCell className="text-right">
                <Button size="icon" variant="ghost" aria-label="Replay">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Delete"
                  onClick={() => {
                    void (async () => {
                      if (
                        await confirm({
                          title: 'Delete webhook?',
                          description: 'This cannot be undone.',
                          tone: 'danger',
                        })
                      ) {
                        setEndpoints((prev) => prev.filter((x) => x.id !== ep.id));
                      }
                    })();
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {endpoints.length === 0 ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Webhook className="h-4 w-4" /> No endpoints configured.
        </p>
      ) : null}
    </div>
  );
}
