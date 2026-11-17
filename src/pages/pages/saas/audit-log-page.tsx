import { useMemo, useState } from 'react';
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { ActivityLog, type ActivityLogEntry, PageHeader } from '@/components/patterns';

const ALL_ENTRIES: ActivityLogEntry[] = [
  {
    id: '1',
    actorName: 'Alex Nguyen',
    actorAvatar: 'https://i.pravatar.cc/64?img=1',
    verb: 'invited',
    target: 'maria@acme.test',
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
  },
  {
    id: '2',
    actorName: 'Maria Garcia',
    actorAvatar: 'https://i.pravatar.cc/64?img=5',
    verb: 'revoked API key',
    target: 'Staging webhook',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: '3',
    actorName: 'Alex Nguyen',
    verb: 'changed plan to',
    target: 'Pro (annual)',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26),
  },
  {
    id: '4',
    actorName: 'System',
    verb: 'exported audit log',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
];

export default function AuditLogPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const entries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_ENTRIES.filter((e) => {
      if (filter === 'members' && e.actorName === 'System') return false;
      if (filter === 'billing' && !e.target?.toLowerCase().includes('plan')) return false;
      if (!q) return true;
      const hay = `${e.actorName} ${e.verb} ${e.target ?? ''}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query, filter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Audit log"
        description="Immutable record of security-sensitive actions in your workspace."
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search activity…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All events</SelectItem>
            <SelectItem value="members">Members</SelectItem>
            <SelectItem value="billing">Billing</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ActivityLog entries={entries} />
    </div>
  );
}
