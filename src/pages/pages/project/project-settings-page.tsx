import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from '@/components/ui';
import { PageContent, PageHeader } from '@/components/patterns';

export default function ProjectSettingsPage() {
  return (
    <PageContent width="narrow" className="space-y-6">
      <PageHeader
        title="Project settings"
        description="Defaults and notifications for this workspace."
      />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">General</CardTitle>
          <CardDescription>Project identity and default views.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project name</Label>
            <Input id="project-name" defaultValue="TailTheme Platform" />
          </div>
          <div className="space-y-2">
            <Label>Default view</Label>
            <Select defaultValue="kanban">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kanban">Kanban board</SelectItem>
                <SelectItem value="list">Task list</SelectItem>
                <SelectItem value="gantt">Gantt timeline</SelectItem>
                <SelectItem value="calendar">Calendar</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="task-assigned">Task assigned to me</Label>
            <Switch id="task-assigned" defaultChecked />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="due-soon">Due date reminders</Label>
            <Switch id="due-soon" defaultChecked />
          </div>
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="mentions">@mentions in comments</Label>
            <Switch id="mentions" />
          </div>
        </CardContent>
      </Card>
    </PageContent>
  );
}
