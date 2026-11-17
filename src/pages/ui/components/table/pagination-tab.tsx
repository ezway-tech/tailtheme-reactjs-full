import * as React from 'react';
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { DataTablePagination } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import type { GalleryUser } from './table-shared';
import { tableGalleryUsers } from './table-shared';

const slimColumns: ColumnDef<GalleryUser>[] = [
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

function PageSizeDemo() {
  const data = React.useMemo(() => tableGalleryUsers, []);

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table is intentionally not memoized
  const table = useReactTable({
    data,
    columns: slimColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10, pageIndex: 0 } },
  });

  const start = table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1;
  const end = Math.min(
    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
    data.length,
  );

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Showing <strong className="tabular-nums text-foreground">{start}</strong>–
        <strong className="tabular-nums text-foreground">{end}</strong> of{' '}
        <strong className="tabular-nums text-foreground">{data.length}</strong> rows.
      </p>
      <div className="rounded-md border border-border">
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
            {table.getRowModel().rows.map((row) => (
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
      <DataTablePagination table={table} pageSizeOptions={[5, 10, 15, 30]} />
    </div>
  );
}

function JumpToPageDemo() {
  const data = React.useMemo(() => tableGalleryUsers, []);
  const [jump, setJump] = React.useState('1');

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table is intentionally not memoized
  const table = useReactTable({
    data,
    columns: slimColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10, pageIndex: 0 } },
  });

  const pageCount = table.getPageCount();

  function applyJump() {
    const n = Number.parseInt(jump, 10);
    if (!Number.isFinite(n)) return;
    const idx = Math.min(pageCount, Math.max(1, n)) - 1;
    table.setPageIndex(idx);
  }

  return (
    <div className="space-y-4">
      <div className="flex max-w-sm flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-col gap-1.5">
          <Label htmlFor="jump-page">Go to page</Label>
          <Input
            id="jump-page"
            inputMode="numeric"
            placeholder="1"
            value={jump}
            onChange={(e) => setJump(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') applyJump();
            }}
          />
        </div>
        <Button type="button" variant="secondary" onClick={applyJump}>
          Jump
        </Button>
      </div>
      <div className="rounded-md border border-border">
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
            {table.getRowModel().rows.map((row) => (
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
      <DataTablePagination table={table} pageSizeOptions={[10]} />
    </div>
  );
}

function LoadMoreDemo() {
  const full = React.useMemo(() => tableGalleryUsers, []);
  const [take, setTake] = React.useState(10);

  const data = React.useMemo(() => full.slice(0, take), [full, take]);

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table is intentionally not memoized
  const table = useReactTable({
    data,
    columns: slimColumns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: 1,
  });

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Loaded <strong className="tabular-nums text-foreground">{data.length}</strong> of{' '}
        <strong className="tabular-nums text-foreground">{full.length}</strong> rows (cursor-style
        append).
      </p>
      <div className="rounded-md border border-border">
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
            {table.getRowModel().rows.map((row) => (
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
      <Button
        type="button"
        variant="outline"
        disabled={take >= full.length}
        onClick={() => setTake((n) => Math.min(full.length, n + 10))}
      >
        Load more (+10)
      </Button>
    </div>
  );
}

export function PaginationTab() {
  return (
    <div className="space-y-6">
      <ShowcaseSection
        block
        title="Page size & range"
        description="Client pagination with `DataTablePagination`: page-size `Select`, first/prev/next/last, and “Showing i–j of n” copy."
      >
        <PageSizeDemo />
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Jump to page"
        description="Numeric input maps to `table.setPageIndex` (clamp to page count). Combine with the same pagination bar."
      >
        <JumpToPageDemo />
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Cursor-style load more"
        description="Append slices into local state instead of page indices — similar UX to GraphQL cursors / infinite queries."
      >
        <LoadMoreDemo />
      </ShowcaseSection>
    </div>
  );
}
