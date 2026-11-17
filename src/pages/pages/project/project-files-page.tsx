import { Download, FileArchive, FileImage, FileText } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const FILES = [
  { id: 'f-1', name: 'Q2-roadmap.pdf', type: 'pdf', size: '1.2 MB', icon: FileText },
  { id: 'f-2', name: 'Dashboard-mock.fig', type: 'fig', size: '8.4 MB', icon: FileImage },
  { id: 'f-3', name: 'Design-assets.zip', type: 'zip', size: '24.1 MB', icon: FileArchive },
  { id: 'f-4', name: 'Sprint-notes.pdf', type: 'pdf', size: '340 KB', icon: FileText },
  { id: 'f-5', name: 'Wireframes.fig', type: 'fig', size: '5.6 MB', icon: FileImage },
  { id: 'f-6', name: 'Release-bundle.zip', type: 'zip', size: '12.8 MB', icon: FileArchive },
];

export default function ProjectFilesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Project files"
        description="Shared documents, designs, and archives."
        actions={<Button>Upload file</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FILES.map((file) => {
          const Icon = file.icon;
          return (
            <Card key={file.id}>
              <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <CardTitle className="truncate text-sm">{file.name}</CardTitle>
                  <p className="text-xs text-muted-foreground uppercase">
                    {file.type} · {file.size}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <Button size="sm" variant="outline" className="w-full">
                  <Download className="h-4 w-4" /> Download
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
