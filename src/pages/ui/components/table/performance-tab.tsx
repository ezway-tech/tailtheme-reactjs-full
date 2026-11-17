import * as React from 'react';
import {
  type ColumnDef,
  type PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { DataTablePagination } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import type { GalleryUser } from './table-shared';
import { tableGalleryUsers } from './table-shared';

const DEPTS: GalleryUser['department'][] = ['engineering', 'design', 'sales', 'support'];

function buildVirtualDataset(count: number): GalleryUser[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `virt-${i}`,
    name: `Synthetic user ${i + 1}`,
    email: `user${i}@tailtheme.test`,
    role: i % 11 === 0 ? 'admin' : i % 5 === 0 ? 'instructor' : 'student',
    status: i % 7 === 0 ? 'invited' : i % 13 === 0 ? 'suspended' : 'active',
    joinedAt: `2024-${String((i % 12) + 1).padStart(2, '0')}-15`,
    streak: i % 90,
    points: (i * 773) % 12000,
    department: DEPTS[i % DEPTS.length],
  }));
}

const virtualColumns: ColumnDef<GalleryUser>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    size: 220,
    cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 260,
  },
  {
    accessorKey: 'department',
    header: 'Dept',
    size: 120,
    cell: ({ row }) => <span className="capitalize">{row.getValue('department')}</span>,
  },
  {
    accessorKey: 'points',
    header: () => <div className="text-right">Points</div>,
    size: 100,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.getValue<number>('points').toLocaleString()}
      </div>
    ),
  },
];

function VirtualizedDemo() {
  const data = React.useMemo(() => buildVirtualDataset(10_000), []);
  const parentRef = React.useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table is intentionally not memoized
  const table = useReactTable({
    data,
    columns: virtualColumns,
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
  });

  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 14,
  });

  const vRows = virtualizer.getVirtualItems();

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        10k synthetic rows — only visible DOM rows are mounted (see{' '}
        <a
          href="https://tanstack.com/virtual/latest"
          className="font-medium underline underline-offset-2"
          target="_blank"
          rel="noreferrer"
        >
          TanStack Virtual
        </a>
        ). Absolute-positioned rows skip shared per-row borders; prefer zebra striping or cell
        borders if you need strong separation.
      </p>
      <div ref={parentRef} className="h-[420px] overflow-auto rounded-md border border-border">
        <table className="relative w-full caption-bottom text-sm">
          <TableHeader className="sticky top-0 z-10 bg-background shadow-[inset_0_-1px_0_0_hsl(var(--border))]">
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="flex w-full">
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="flex items-center border-r border-border px-2 py-2 text-left last:border-r-0"
                    style={{ width: header.getSize(), flex: 'none' }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody
            className="relative grid"
            style={{ height: `${virtualizer.getTotalSize()}px` }}
          >
            {vRows.map((vi) => {
              const row = rows[vi.index];
              if (!row) return null;
              return (
                <TableRow
                  key={row.id}
                  data-index={vi.index}
                  className="absolute flex w-full border-b border-border bg-background hover:bg-muted/40"
                  style={{
                    transform: `translateY(${vi.start}px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="flex items-center border-r border-border px-2 py-2 text-sm last:border-r-0"
                      style={{ width: cell.column.getSize(), flex: 'none' }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </table>
      </div>
    </div>
  );
}

const slimCols: ColumnDef<GalleryUser>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
  },
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

function ServerSideDemo() {
  const full = React.useMemo(() => tableGalleryUsers, []);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [data, setData] = React.useState<GalleryUser[]>([]);
  const [loading, setLoading] = React.useState(true);
  const total = full.length;

  React.useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => {
      const start = pagination.pageIndex * pagination.pageSize;
      setData(full.slice(start, start + pagination.pageSize));
      setLoading(false);
    }, 480);
    return () => window.clearTimeout(timer);
  }, [full, pagination.pageIndex, pagination.pageSize]);

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table is intentionally not memoized
  const table = useReactTable({
    data,
    columns: slimCols,
    pageCount: Math.ceil(total / pagination.pageSize) || 1,
    state: { pagination },
    manualPagination: true,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Simulated latency (~480ms): swap the `setTimeout` body for `fetch` + JSON. Wire
        `manualPagination`, `manualSorting`, `manualFiltering`, and `rowCount` for server-driven
        grids.
      </p>
      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Loading page…
        </div>
      ) : null}
      <div
        className={
          loading ? 'rounded-md border border-border opacity-60' : 'rounded-md border border-border'
        }
        aria-busy={loading}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!loading &&
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}

export function PerformanceTab() {
  return (
    <div className="space-y-6">
      <ShowcaseSection
        block
        title="Virtualized rows"
        description="Large datasets: pair TanStack Table row models with `@tanstack/react-virtual`."
      >
        <VirtualizedDemo />
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Server-side template"
        description="Manual pagination with mocked latency — replace with your API contract."
      >
        <ServerSideDemo />
      </ShowcaseSection>
    </div>
  );
}
