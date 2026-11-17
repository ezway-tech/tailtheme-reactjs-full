import * as React from 'react';
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Download } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import type { GalleryUser } from './table-shared';
import { tableGalleryUsers } from './table-shared';

const slimCols: ColumnDef<GalleryUser>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'points',
    header: () => <div className="text-right">Points</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.getValue<number>('points').toLocaleString()}
      </div>
    ),
  },
];

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function downloadCsv(rows: GalleryUser[]) {
  const headers = [
    'id',
    'name',
    'email',
    'role',
    'status',
    'department',
    'points',
    'joinedAt',
  ] as const;
  const lines = [
    headers.join(','),
    ...rows.map((r) =>
      [r.id, r.name, r.email, r.role, r.status, r.department, r.points, r.joinedAt]
        .map((v) => csvEscape(String(v)))
        .join(','),
    ),
  ];
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tailtheme-users.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export function StatesTab() {
  const [density, setDensity] = React.useState<'comfortable' | 'compact'>('comfortable');
  const [showError, setShowError] = React.useState(true);

  const cellPad = density === 'compact' ? 'py-1.5 text-xs' : 'py-3';
  const headPad = density === 'compact' ? 'h-8 py-1 text-xs' : '';

  const data = React.useMemo(() => tableGalleryUsers.slice(0, 6), []);

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table is intentionally not memoized
  const table = useReactTable({
    data,
    columns: slimCols,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6">
      <ShowcaseSection
        block
        title="Loading skeleton"
        description="Reserve layout while data loads — mirror column widths for less jump."
      >
        <div className="rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-[140px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[200px]" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="ml-auto h-4 w-16" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Empty state"
        description="Pair `EmptyState` with zero-row tables or standalone panels."
      >
        <EmptyState
          variant="no-results"
          title="No rows yet"
          description="Adjust filters or invite users to populate this table."
          bordered
          actions={
            <Button type="button" size="sm">
              Invite member
            </Button>
          }
        />
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Error + retry"
        description="Inline alert above the grid — wire `retry` to refetch your query."
      >
        {showError ? (
          <Alert variant="danger" className="mb-4">
            <AlertTitle>Could not load users</AlertTitle>
            <AlertDescription className="flex flex-wrap items-center gap-2">
              Network timeout (demo).
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={() => setShowError(false)}
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        ) : (
          <p className="mb-4 text-sm text-muted-foreground">
            Error dismissed — hook your refetch here.
          </p>
        )}
        <div className="rounded-md border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={2} className="py-10 text-center text-muted-foreground">
                  {showError ? '…' : 'Ready to load'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Density toggle"
        description="Switch padding + font size on cells — map to a `data-density` attribute for CSS hooks."
      >
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <span className="text-sm text-muted-foreground">Density</span>
          <ToggleGroup
            type="single"
            value={density}
            onValueChange={(v) => {
              if (v === 'comfortable' || v === 'compact') setDensity(v);
            }}
          >
            <ToggleGroupItem value="comfortable" aria-label="Comfortable">
              Comfortable
            </ToggleGroupItem>
            <ToggleGroupItem value="compact" aria-label="Compact">
              Compact
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="rounded-md border border-border" data-density={density}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((h) => (
                    <TableHead key={h.id} className={headPad}>
                      {h.isPlaceholder
                        ? null
                        : flexRender(h.column.columnDef.header, h.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cellPad}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="CSV export"
        description="Client-side download from the current row slice — for large datasets, stream from the server instead."
      >
        <Button
          type="button"
          variant="outline"
          className="gap-2"
          onClick={() => downloadCsv(tableGalleryUsers)}
        >
          <Download className="h-4 w-4" aria-hidden />
          Export gallery users (.csv)
        </Button>
      </ShowcaseSection>
    </div>
  );
}
