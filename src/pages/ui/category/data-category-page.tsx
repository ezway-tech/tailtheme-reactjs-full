import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  DescriptionList,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
  ScrollArea,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';

export default function DataCategoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Data display"
        description="Show information compactly: Table, Card, Avatar, Progress, Skeleton, ScrollArea."
      />

      <ShowcaseSection title="Card + Avatar">
        <Card className="w-full max-w-sm">
          <CardHeader className="flex flex-row items-center gap-3 space-y-0">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/64?img=5" alt="user" />
              <AvatarFallback>UV</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">Unread inbox</CardTitle>
              <CardDescription>3 messages pending</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Mark all as read to clear the badge.
          </CardContent>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection title="Progress">
        <div className="w-full max-w-md space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Upload</span>
            <span>62%</span>
          </div>
          <Progress value={62} />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Storage</span>
            <span>87%</span>
          </div>
          <Progress value={87} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Skeleton"
        description="Loading placeholder that matches final layout."
      >
        <div className="w-full max-w-md space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="ScrollArea" description="Custom scrollbars that respect theme.">
        <ScrollArea className="h-48 w-full rounded-md border border-border">
          <div className="space-y-2 p-3 text-sm">
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>Item {i + 1} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            ))}
          </div>
        </ScrollArea>
      </ShowcaseSection>

      <ShowcaseSection title="Description list">
        <DescriptionList
          className="max-w-md"
          items={[
            { term: 'Plan', description: 'Pro' },
            { term: 'Seats', description: '12' },
            { term: 'Renewal', description: 'Apr 28, 2026' },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Compact table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Key</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Plan</TableCell>
              <TableCell>Pro</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Members</TableCell>
              <TableCell>12</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Next invoice</TableCell>
              <TableCell>Apr 28, 2026</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ShowcaseSection>
    </div>
  );
}
