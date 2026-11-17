import * as React from 'react';
import {
  type ColumnDef,
  type ExpandedState,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import type { GalleryUser } from './table-shared';
import { tableGalleryUsers } from './table-shared';

export function RowsTab() {
  const data = React.useMemo(() => tableGalleryUsers.slice(0, 12), []);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const columns = React.useMemo<ColumnDef<GalleryUser>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomePageRowsSelected()
                  ? 'indeterminate'
                  : false
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(Boolean(value))}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 36,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
      },
      { accessorKey: 'email', header: 'Email' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => <span className="capitalize">{row.getValue('status')}</span>,
      },
      {
        accessorKey: 'points',
        header: () => <div className="text-right">Points</div>,
        cell: ({ row }) => (
          <div className="text-right tabular-nums">
            {row.getValue<number>('points').toLocaleString()}
          </div>
        ),
      },
      {
        id: 'expand',
        header: '',
        cell: ({ row }) => (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 px-2"
            onClick={() => row.toggleExpanded()}
            aria-expanded={row.getIsExpanded()}
          >
            {row.getIsExpanded() ? 'Hide' : 'Details'}
          </Button>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [],
  );

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table is intentionally not memoized
  const table = useReactTable({
    data,
    columns,
    state: { rowSelection, expanded },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
  });

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <div className="space-y-6">
      <ShowcaseSection
        block
        title="Row selection & expansion"
        description="Checkbox column + select-all (indeterminate when partial). Secondary rows show expanded detail; selection count drives a lightweight bulk toolbar."
      >
        <div className="flex flex-col gap-3">
          {selectedCount > 0 ? (
            <div className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-2 text-sm">
              <span className="font-medium tabular-nums">{selectedCount}</span>
              <span className="text-muted-foreground">row(s) selected</span>
              <Button type="button" size="sm" variant="secondary" className="gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                Email
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => table.resetRowSelection()}
              >
                Clear
              </Button>
            </div>
          ) : null}

          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id}>
                    {hg.headers.map((h) => (
                      <TableHead
                        key={h.id}
                        className={h.column.id === 'select' ? 'w-10' : undefined}
                      >
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
                      No rows.
                    </TableCell>
                  </TableRow>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <React.Fragment key={row.id}>
                      <TableRow data-state={row.getIsSelected() ? 'selected' : undefined}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                      {row.getIsExpanded() ? (
                        <TableRow className="bg-muted/35 hover:bg-muted/35">
                          <TableCell
                            colSpan={row.getVisibleCells().length}
                            className="py-4 text-sm text-muted-foreground"
                          >
                            <p className="font-medium text-foreground">Detail</p>
                            <p>
                              {row.original.name} — joined {row.original.joinedAt}, streak{' '}
                              {row.original.streak} days, role {row.original.role}.
                            </p>
                          </TableCell>
                        </TableRow>
                      ) : null}
                    </React.Fragment>
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
