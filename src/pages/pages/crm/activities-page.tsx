import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { CrmActivityTimeline, PageContent, PageHeader } from '@/components/patterns';
import { crmActivities, type ActivityType } from '@/mocks/fixtures';

const TYPE_OPTIONS: Array<{ value: ActivityType | 'all'; label: string }> = [
  { value: 'all', label: 'All types' },
  { value: 'call', label: 'Calls' },
  { value: 'email', label: 'Emails' },
  { value: 'meeting', label: 'Meetings' },
  { value: 'note', label: 'Notes' },
];

export default function ActivitiesPage() {
  const [type, setType] = useState<string>('all');

  const rows = useMemo(() => {
    if (type === 'all') return crmActivities;
    return crmActivities.filter((a) => a.type === type);
  }, [type]);

  return (
    <PageContent width="feed" className="space-y-6">
      <PageHeader
        title="Activities"
        description="Calls, emails, meetings, and notes across your pipeline."
        actions={
          <Button>
            <Plus className="h-4 w-4" /> Log activity
          </Button>
        }
      />

      <Select value={type} onValueChange={setType}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Activity type" />
        </SelectTrigger>
        <SelectContent>
          {TYPE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <CrmActivityTimeline activities={rows} />
    </PageContent>
  );
}
