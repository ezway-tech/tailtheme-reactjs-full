import * as React from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { DataTableFacetedFilter } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import type { GalleryUser } from './table-shared';
import { tableGalleryUsers } from './table-shared';

function arrIncludesSome<T extends string>(
  row: { getValue: (id: string) => unknown },
  columnId: string,
  filterValue: unknown,
): boolean {
  const selected = filterValue as T[] | undefined;
  if (!selected?.length) return true;
  const v = row.getValue(columnId) as T;
  return selected.includes(v);
}

const columns: ColumnDef<GalleryUser>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
    filterFn: 'includesString',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    filterFn: 'includesString',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    filterFn: arrIncludesSome,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    filterFn: arrIncludesSome,
    cell: ({ row }) => <span className="capitalize">{row.getValue('status')}</span>,
  },
  {
    accessorKey: 'department',
    header: 'Dept',
    filterFn: arrIncludesSome,
    cell: ({ row }) => <span className="capitalize">{row.getValue('department')}</span>,
  },
  {
    accessorKey: 'points',
    header: () => <div className="text-right">Points</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.getValue<number>('points').toLocaleString()}
      </div>
    ),
    filterFn: (row, _columnId, filterValue) => {
      const v = row.getValue<number>('points');
      const box = filterValue as { min?: number; max?: number } | undefined;
      if (!box || (box.min == null && box.max == null)) return true;
      if (box.min != null && v < box.min) return false;
      if (box.max != null && v > box.max) return false;
      return true;
    },
  },
  {
    accessorKey: 'joinedAt',
    header: 'Joined',
    filterFn: (row, _columnId, filterValue) => {
      const raw = row.getValue<string>('joinedAt');
      const t = new Date(raw).getTime();
      const box = filterValue as { from?: string; to?: string } | undefined;
      if (!box || (!box.from && !box.to)) return true;
      if (box.from) {
        const fromT = new Date(box.from).setHours(0, 0, 0, 0);
        if (t < fromT) return false;
      }
      if (box.to) {
        const toT = new Date(box.to).setHours(23, 59, 59, 999);
        if (t > toT) return false;
      }
      return true;
    },
  },
];

const STATUS_OPTIONS = [
  { label: 'Active', value: 'active' },
  { label: 'Invited', value: 'invited' },
  { label: 'Suspended', value: 'suspended' },
];

const ROLE_OPTIONS = [
  { label: 'Admin', value: 'admin' },
  { label: 'Instructor', value: 'instructor' },
  { label: 'Student', value: 'student' },
];

export function FilteringTab() {
  const data = React.useMemo(() => tableGalleryUsers, []);

  const [globalInput, setGlobalInput] = React.useState('');
  const [globalFilter, setGlobalFilter] = React.useState('');
  React.useEffect(() => {
    const id = window.setTimeout(() => setGlobalFilter(globalInput), 320);
    return () => window.clearTimeout(id);
  }, [globalInput]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [pointsMin, setPointsMin] = React.useState('');
  const [pointsMax, setPointsMax] = React.useState('');
  const [dateFrom, setDateFrom] = React.useState('');
  const [dateTo, setDateTo] = React.useState('');

  React.useEffect(() => {
    const min = pointsMin === '' ? undefined : Number(pointsMin);
    const max = pointsMax === '' ? undefined : Number(pointsMax);
    const hasRange = (min != null && !Number.isNaN(min)) || (max != null && !Number.isNaN(max));
    setColumnFilters((prev) => {
      const rest = prev.filter((f) => f.id !== 'points');
      if (!hasRange) return rest;
      return [...rest, { id: 'points', value: { min, max } }];
    });
  }, [pointsMin, pointsMax]);

  React.useEffect(() => {
    const has = Boolean(dateFrom || dateTo);
    setColumnFilters((prev) => {
      const rest = prev.filter((f) => f.id !== 'joinedAt');
      if (!has) return rest;
      return [
        ...rest,
        { id: 'joinedAt', value: { from: dateFrom || undefined, to: dateTo || undefined } },
      ];
    });
  }, [dateFrom, dateTo]);

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table is intentionally not memoized
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
  });

  return (
    <div className="space-y-6">
      <ShowcaseSection
        block
        title="Filtering toolkit"
        description="Debounced global search (~320ms), faceted multi-select (counts via `getFacetedRowModel`), and column filters for numeric range + date range — applied together on one dataset."
      >
        <div className="flex flex-col gap-4">
          <div className="flex max-w-md flex-col gap-2">
            <Label htmlFor="global-filter">Global search</Label>
            <Input
              id="global-filter"
              placeholder="Filter across columns…"
              value={globalInput}
              onChange={(e) => setGlobalInput(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-wrap gap-2">
              <DataTableFacetedFilter
                column={table.getColumn('status')}
                title="Status"
                options={STATUS_OPTIONS}
              />
              <DataTableFacetedFilter
                column={table.getColumn('role')}
                title="Role"
                options={ROLE_OPTIONS}
              />
            </div>
          </div>

          <div className="grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label>Points min</Label>
              <Input
                inputMode="numeric"
                placeholder="Min"
                value={pointsMin}
                onChange={(e) => setPointsMin(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Points max</Label>
              <Input
                inputMode="numeric"
                placeholder="Max"
                value={pointsMax}
                onChange={(e) => setPointsMax(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="joined-from">Joined from</Label>
              <Input
                id="joined-from"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="joined-to">Joined to</Label>
              <Input
                id="joined-to"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Showing <strong>{table.getFilteredRowModel().rows.length}</strong> of {data.length}{' '}
            rows.
          </p>

          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id}>
                    {hg.headers.map((h) => (
                      <TableHead key={h.id}>
                        {h.isPlaceholder
                          ? null
                          : flexRender(h.column.columnDef.header, h.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="py-10 text-center text-muted-foreground"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
