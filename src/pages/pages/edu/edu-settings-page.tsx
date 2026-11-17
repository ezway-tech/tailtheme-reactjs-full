import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
  Switch,
} from '@/components/ui';
import { PageContent, PageHeader } from '@/components/patterns';

export default function EduSettingsPage() {
  return (
    <PageContent width="narrow" className="space-y-6">
      <PageHeader
        title="Learning preferences"
        description="Notifications and defaults for your student profile."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notifications</CardTitle>
          <CardDescription>Choose what you receive by email and in-app.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { id: 'assignments', label: 'Assignment due reminders', default: true },
            { id: 'grades', label: 'Grade posted', default: true },
            { id: 'forum', label: 'Forum replies', default: false },
            { id: 'live', label: 'Live class starting soon', default: true },
            { id: 'certificates', label: 'Certificate available', default: true },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4">
              <Label htmlFor={item.id}>{item.label}</Label>
              <Switch id={item.id} defaultChecked={item.default} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Playback</CardTitle>
          <CardDescription>Lesson player defaults.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="autoplay">Autoplay next lesson</Label>
            <Switch id="autoplay" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="captions">Captions on by default</Label>
            <Switch id="captions" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </PageContent>
  );
}
