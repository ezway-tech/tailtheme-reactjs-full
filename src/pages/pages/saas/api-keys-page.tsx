import { useState } from 'react';
import { Copy, KeyRound, Plus, Trash2 } from 'lucide-react';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from '@/components/ui';
import { PageHeader, useConfirm } from '@/components/patterns';

interface ApiKeyRow {
  id: string;
  name: string;
  prefix: string;
  created: string;
  lastUsed: string;
}

const INITIAL_KEYS: ApiKeyRow[] = [
  {
    id: '1',
    name: 'Production',
    prefix: 'tt_live_••••7f3a',
    created: 'Jan 12, 2026',
    lastUsed: '2 hours ago',
  },
  {
    id: '2',
    name: 'CI deploy',
    prefix: 'tt_live_••••9c21',
    created: 'Feb 3, 2026',
    lastUsed: 'Yesterday',
  },
];

export default function ApiKeysPage() {
  const confirm = useConfirm();
  const [keys, setKeys] = useState(INITIAL_KEYS);
  const [name, setName] = useState('');

  const createKey = () => {
    if (!name.trim()) return;
    const row: ApiKeyRow = {
      id: String(Date.now()),
      name: name.trim(),
      prefix: 'tt_live_••••' + Math.random().toString(36).slice(2, 6),
      created: 'Just now',
      lastUsed: 'Never',
    };
    setKeys((k) => [row, ...k]);
    setName('');
    toast.success('API key created (demo) — copy it now; it will not be shown again.');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="API keys"
        description="Authenticate server-to-server requests. Revoke keys you no longer use."
        actions={
          <Button size="sm" onClick={createKey}>
            <Plus className="h-4 w-4" /> Generate key
          </Button>
        }
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" /> New key
          </CardTitle>
          <CardDescription>Keys are shown once at creation.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="key-name">Label</Label>
            <Input
              id="key-name"
              placeholder="e.g. Staging webhook"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Button type="button" onClick={createKey}>
            Generate
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Table framed={false}>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {keys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell>
                    <code className="text-xs">{key.prefix}</code>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{key.created}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{key.lastUsed}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Copy key prefix"
                      onClick={() => toast.message('Copied (demo)')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Revoke key"
                      onClick={async () => {
                        const ok = await confirm({
                          title: 'Revoke API key?',
                          description: 'Applications using this key will stop working immediately.',
                          confirmLabel: 'Revoke',
                          tone: 'danger',
                        });
                        if (ok) {
                          setKeys((rows) => rows.filter((r) => r.id !== key.id));
                          toast.success('Key revoked');
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
