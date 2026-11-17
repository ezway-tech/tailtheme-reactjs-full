import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Switch,
  toast,
} from '@/components/ui';
import { PageContent, PageHeader } from '@/components/patterns';

export default function SocialSettingsPage() {
  return (
    <PageContent width="narrow" className="space-y-6">
      <PageHeader title="Social settings" description="Privacy, messaging, and safety controls." />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Privacy</CardTitle>
          <CardDescription>Who can see and interact with your profile.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="profile-visibility">Public profile</Label>
            <Switch id="profile-visibility" defaultChecked />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="dms">Allow direct messages</Label>
            <Switch id="dms" defaultChecked />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="mentions">Allow @mentions</Label>
            <Switch id="mentions" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card id="report-flow">
        <CardHeader>
          <CardTitle className="text-base">Safety</CardTitle>
          <CardDescription>
            Report harassment, spam, or impersonation. Our team reviews reports within 24 hours. You
            can also block users to hide their content immediately.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            onClick={() =>
              toast.info('Report submitted (demo)', {
                description: 'We will review this account within 24 hours.',
              })
            }
          >
            Report or block user
          </Button>
        </CardContent>
      </Card>
    </PageContent>
  );
}
