import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { socialGroups } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

export default function GroupsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Groups"
        description="Communities you can join or manage."
        actions={<Button>Create group</Button>}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {socialGroups.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base">{group.name}</CardTitle>
                <Badge variant={group.visibility === 'public' ? 'secondary' : 'outline'}>
                  {group.visibility}
                </Badge>
              </div>
              <CardDescription>{group.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                {group.members.toLocaleString()} members
              </span>
              <Button asChild size="sm" variant="outline">
                <Link to={urls.app.pages.social.groupDetail(group.id)}>View</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
