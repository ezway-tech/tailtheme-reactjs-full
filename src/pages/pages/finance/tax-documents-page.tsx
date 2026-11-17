import { Download, FileText } from 'lucide-react';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { PageHeader } from '@/components/patterns';

const DOCUMENTS = [
  { id: 'd-2024', year: '2024', files: ['1099-INT.pdf', '1099-DIV.pdf', 'Annual-summary.pdf'] },
  { id: 'd-2023', year: '2023', files: ['1099-INT.pdf', '1099-DIV.pdf'] },
  { id: 'd-2022', year: '2022', files: ['1099-INT.pdf'] },
];

export default function TaxDocumentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tax documents" description="Download forms by tax year." />

      <div className="space-y-4">
        {DOCUMENTS.map((group) => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle className="text-base">Tax year {group.year}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {group.files.map((file) => (
                <div
                  key={file}
                  className="flex items-center justify-between rounded-md border border-border p-3"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {file}
                  </span>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" /> Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
