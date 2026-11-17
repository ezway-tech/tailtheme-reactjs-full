import { Link } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { sampleEduClasses } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const STATUS_VARIANT = {
  live: 'success',
  upcoming: 'outline',
  archived: 'secondary',
} as const;

export default function ClassesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Classes"
        description="Live classes you're enrolled in or teaching."
        actions={<Button size="sm">Join next class</Button>}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleEduClasses.map((c) => (
          <Card key={c.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-base">{c.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1.5">
                    <Avatar size="sm">
                      <AvatarFallback>
                        {c.teacher
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    {c.teacher}
                  </CardDescription>
                </div>
                <Badge variant={STATUS_VARIANT[c.status as keyof typeof STATUS_VARIANT]}>
                  {c.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {c.schedule}
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {c.students} students
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button asChild size="sm" className="flex-1" disabled={c.status === 'archived'}>
                <Link to={urls.learn.live(c.id)}>{c.status === 'live' ? 'Join' : 'View'}</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to={urls.app.pages.edu.classDetail(c.id)}>Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
