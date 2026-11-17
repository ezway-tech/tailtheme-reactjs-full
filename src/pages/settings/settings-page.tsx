import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from '@/components/ui';
import {
  ActivityLog,
  type ActivityLogEntry,
  AvatarUploadField,
  PageHeader,
  SaveBar,
  ThemeCustomizer,
} from '@/components/patterns';
import { urls } from '@/routes/urls';

const SECURITY_ACTIVITY: ActivityLogEntry[] = [
  {
    id: 's1',
    actorName: 'Alex Nguyen',
    verb: 'signed in from',
    target: 'Chrome · Ho Chi Minh City',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
  },
  {
    id: 's2',
    actorName: 'Alex Nguyen',
    verb: 'enabled two-factor authentication',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
];

export default function SettingsPage() {
  const { t } = useTranslation();
  const [profileDirty, setProfileDirty] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={t('pages.settings.title', 'Settings')}
        description={t(
          'pages.settings.subtitle',
          'Manage your account, preferences and appearance.',
        )}
      />
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="profile">{t('pages.settings.tabs.profile', 'Profile')}</TabsTrigger>
          <TabsTrigger value="account">{t('pages.settings.tabs.account', 'Account')}</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">
            {t('pages.settings.tabs.notifications', 'Notifications')}
          </TabsTrigger>
          <TabsTrigger value="billing">{t('pages.settings.tabs.billing', 'Billing')}</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="appearance">
            {t('pages.settings.tabs.appearance', 'Appearance')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="relative pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>This is how others will see you on the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-20">
              <AvatarUploadField fallback="AN" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="set-name">Display name</Label>
                  <Input
                    id="set-name"
                    defaultValue="Alex Nguyen"
                    onChange={() => setProfileDirty(true)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="set-email">Email</Label>
                  <Input
                    id="set-email"
                    type="email"
                    defaultValue="alex@tailtheme.test"
                    onChange={() => setProfileDirty(true)}
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <Label htmlFor="set-bio">Bio</Label>
                  <Textarea
                    id="set-bio"
                    rows={4}
                    placeholder="Tell us about yourself"
                    onChange={() => setProfileDirty(true)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <SaveBar
            dirty={profileDirty}
            onDiscard={() => setProfileDirty(false)}
            onSave={() => setProfileDirty(false)}
          />
        </TabsContent>

        <TabsContent value="account" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Email and marketing preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="acct-email">Primary email</Label>
                <Input id="acct-email" type="email" defaultValue="alex@tailtheme.test" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Product updates</Label>
                  <p className="text-xs text-muted-foreground">News and tips.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This permanently removes your data. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Delete account</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="pt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="set-pw">Current password</Label>
                <Input id="set-pw" type="password" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="set-new-pw">New password</Label>
                <Input id="set-new-pw" type="password" />
              </div>
              <Button>Update password</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Two-factor authentication</CardTitle>
                <CardDescription>Authenticator app recommended.</CardDescription>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link to={urls.app.pages.saas.security2fa}>Manage 2FA</Link>
              </Button>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent security activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityLog entries={SECURITY_ACTIVITY} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Course updates', 'Quiz reminders', 'Security alerts', 'Marketing'].map((name) => (
                <div key={name} className="flex items-center justify-between">
                  <Label>{name}</Label>
                  <Switch defaultChecked={name !== 'Marketing'} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>Pro plan · renews monthly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Full billing UI with invoices and usage meters lives on the dedicated page.
              </p>
              <Button asChild>
                <Link to={urls.app.pages.saas.billing}>Open billing</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
              <CardDescription>Invite members and manage roles.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button asChild variant="outline">
                <Link to={urls.app.pages.saas.members}>Members</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to={urls.app.pages.saas.apiKeys}>API keys</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to={urls.app.pages.saas.integrations}>Integrations</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to={urls.app.pages.saas.auditLog}>Audit log</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & data</CardTitle>
              <CardDescription>Export or delete personal data (GDPR-style stubs).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline">Download my data</Button>
              <Button asChild variant="outline">
                <Link to={urls.app.pages.marketing.privacy}>Privacy policy</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize colors, typography and scaling.</CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeCustomizer inline />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
