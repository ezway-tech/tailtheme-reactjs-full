import { useState } from 'react';
import { Flag } from 'lucide-react';
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';

interface FeatureFlag {
  key: string;
  description: string;
  enabled: boolean;
  environment: 'production' | 'staging' | 'all';
}

const INITIAL: FeatureFlag[] = [
  {
    key: 'new_dashboard_charts',
    description: 'Recharts v3 area charts on analytics',
    enabled: true,
    environment: 'staging',
  },
  {
    key: 'ai_copilot',
    description: 'Inline assistant in command palette',
    enabled: false,
    environment: 'all',
  },
  {
    key: 'sso_saml',
    description: 'Enterprise SAML SSO',
    enabled: true,
    environment: 'production',
  },
  {
    key: 'webhook_retries',
    description: 'Exponential backoff for failed deliveries',
    enabled: true,
    environment: 'all',
  },
];

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState(INITIAL);
  const [filter, setFilter] = useState('');

  const visible = flags.filter(
    (f) =>
      !filter.trim() ||
      `${f.key} ${f.description}`.toLowerCase().includes(filter.trim().toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Feature flags"
        description="Toggle features per environment without redeploying."
      />

      <Input
        className="max-w-sm"
        placeholder="Filter flags…"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Flag className="h-5 w-5" aria-hidden />
            Flags
          </CardTitle>
          <CardDescription>
            {visible.length} of {flags.length} shown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table framed={false}>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead className="text-right">Enabled</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((f) => (
                <TableRow key={f.key}>
                  <TableCell className="font-mono text-xs">{f.key}</TableCell>
                  <TableCell className="text-muted-foreground">{f.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {f.environment}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Switch
                      checked={f.enabled}
                      onCheckedChange={(checked) =>
                        setFlags((prev) =>
                          prev.map((x) => (x.key === f.key ? { ...x, enabled: checked } : x)),
                        )
                      }
                    />
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
