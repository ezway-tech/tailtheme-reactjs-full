import * as React from 'react';
import {
  type ColumnDef,
  type ExpandedState,
  type GroupingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import type { GalleryUser } from './table-shared';
import { orgTreeData, pivotSaleRows, tableGalleryUsers, type OrgRow } from './table-shared';

function TreeSection() {
  const data = React.useMemo(() => orgTreeData, []);
  const [expanded, setExpanded] = React.useState<ExpandedState>(true);

  const columns = React.useMemo<ColumnDef<OrgRow>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Unit',
        cell: ({ row }) => (
          <div
            className="flex items-center gap-2"
            style={{ paddingLeft: `${row.depth * 1.25}rem` }}
          >
            <button
              type="button"
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted/60 disabled:cursor-default disabled:opacity-40"
              onClick={() => row.toggleExpanded()}
              aria-expanded={row.getIsExpanded()}
              disabled={!row.getCanExpand()}
            >
              {row.getCanExpand() ? (row.getIsExpanded() ? '−' : '+') : '·'}
            </button>
            <span className="font-medium">{row.getValue('name')}</span>
          </div>
        ),
      },
      {
        accessorKey: 'region',
        header: 'Region',
        cell: ({ row }) => <span className="text-muted-foreground">{row.getValue('region')}</span>,
      },
      {
        accessorKey: 'headcount',
        header: () => <div className="text-right">Headcount</div>,
        cell: ({ row }) => (
          <div className="text-right tabular-nums">
            {row.getValue<number>('headcount').toLocaleString()}
          </div>
        ),
      },
      {
        accessorKey: 'revenue',
        header: () => <div className="text-right">Revenue</div>,
        cell: ({ row }) => (
          <div className="text-right tabular-nums">
            ${row.getValue<number>('revenue').toLocaleString()}
          </div>
        ),
      },
    ],
    [],
  );

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table is intentionally not memoized
  const table = useReactTable({
    data,
    columns,
    state: { expanded },
    onExpandedChange: setExpanded,
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: (row) => row.subRows,
  });

  return (
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
  );
}

function GroupingSection() {
  const data = React.useMemo(() => tableGalleryUsers, []);
  const [grouping, setGrouping] = React.useState<GroupingState>(['department']);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const columns = React.useMemo<ColumnDef<GalleryUser>[]>(
    () => [
      {
        accessorKey: 'department',
        header: 'Department',
        cell: ({ row }) => <span className="capitalize">{row.getValue('department')}</span>,
      },
      {
        accessorKey: 'name',
        header: 'Member',
        cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
      },
      {
        accessorKey: 'points',
        header: () => <div className="text-right">Points</div>,
        aggregationFn: 'sum',
        cell: ({ row }) => (
          <div className="text-right tabular-nums">
            {row.getValue<number>('points').toLocaleString()}
          </div>
        ),
        aggregatedCell: ({ getValue }) => (
          <div className="text-right tabular-nums font-semibold">
            {getValue<number>().toLocaleString()}
          </div>
        ),
      },
    ],
    [],
  );

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table is intentionally not memoized
  const table = useReactTable({
    data,
    columns,
    state: { grouping, expanded },
    onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
                  {cell.getIsPlaceholder() ? null : cell.getIsGrouped() ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="inline-flex h-7 w-7 items-center justify-center rounded border border-border text-muted-foreground hover:bg-muted/60"
                        onClick={row.getToggleExpandedHandler()}
                        aria-expanded={row.getIsExpanded()}
                      >
                        {row.getIsExpanded() ? '−' : '+'}
                      </button>
                      <span className="font-medium capitalize">
                        {String(row.getGroupingValue('department'))}
                      </span>
                      <span className="text-muted-foreground">({row.subRows.length})</span>
                    </div>
                  ) : cell.getIsAggregated() ? (
                    flexRender(
                      cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
                      cell.getContext(),
                    )
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-muted/40 font-medium">
            <TableCell colSpan={2}>Total (visible rows)</TableCell>
            <TableCell className="text-right tabular-nums">
              {data.reduce((s, u) => s + u.points, 0).toLocaleString()}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

function PivotSection() {
  const totals = pivotSaleRows.reduce(
    (acc, r) => ({
      electronics: acc.electronics + r.electronics,
      apparel: acc.apparel + r.apparel,
      food: acc.food + r.food,
    }),
    { electronics: 0, apparel: 0, food: 0 },
  );

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Region</TableHead>
            <TableHead className="text-right">Electronics</TableHead>
            <TableHead className="text-right">Apparel</TableHead>
            <TableHead className="text-right">Food</TableHead>
            <TableHead className="text-right">Row sum</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pivotSaleRows.map((row) => (
            <TableRow key={row.region}>
              <TableCell className="font-medium">{row.region}</TableCell>
              <TableCell className="text-right tabular-nums">
                ${row.electronics.toLocaleString()}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                ${row.apparel.toLocaleString()}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                ${row.food.toLocaleString()}
              </TableCell>
              <TableCell className="text-right tabular-nums font-medium">
                ${(row.electronics + row.apparel + row.food).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-muted/40 font-medium">
            <TableCell>Column totals</TableCell>
            <TableCell className="text-right tabular-nums">
              ${totals.electronics.toLocaleString()}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              ${totals.apparel.toLocaleString()}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              ${totals.food.toLocaleString()}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              ${(totals.electronics + totals.apparel + totals.food).toLocaleString()}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export function HierarchyTab() {
  return (
    <div className="space-y-6">
      <ShowcaseSection
        block
        title="Tree data (sub-rows)"
        description="`getSubRows` + `getExpandedRowModel`: hierarchical org units with depth padding."
      >
        <TreeSection />
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Grouping & aggregation"
        description="Group by department with summed points. TanStack Table v8 has no native pivot engine — use `getGroupedRowModel` + `aggregationFn`, or pre-shape data like the pivot demo below."
      >
        <GroupingSection />
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Pivot-style layout (manual)"
        description="Regions × category columns precomputed in data — classic spreadsheet pivot. Swap `fetch` results or build this shape from OLAP / SQL `PIVOT`."
      >
        <PivotSection />
      </ShowcaseSection>
    </div>
  );
}
