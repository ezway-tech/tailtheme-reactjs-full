import * as React from 'react';
import type { RowData } from '@tanstack/react-table';
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import type { GalleryUser } from './table-shared';
import { tableGalleryUsers } from './table-shared';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- TData matches upstream generic pattern
  interface TableMeta<TData extends RowData> {
    updateData?: (rowId: string, columnId: string, value: unknown) => void;
  }
}

function EditableNameCell({
  initial,
  rowId,
  columnId,
  updateData,
}: {
  initial: string;
  rowId: string;
  columnId: string;
  updateData?: (id: string, col: string, value: unknown) => void;
}) {
  const [value, setValue] = React.useState(initial);
  React.useEffect(() => setValue(initial), [initial]);

  return (
    <Input
      className="h-8"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {
        if (value !== initial) updateData?.(rowId, columnId, value);
      }}
    />
  );
}

function EditablePointsCell({
  initial,
  rowId,
  columnId,
  updateData,
}: {
  initial: number;
  rowId: string;
  columnId: string;
  updateData?: (id: string, col: string, value: unknown) => void;
}) {
  const [value, setValue] = React.useState(String(initial));
  React.useEffect(() => setValue(String(initial)), [initial]);

  return (
    <Input
      className="h-8 text-right tabular-nums"
      inputMode="numeric"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {
        const next = Number(value);
        if (!Number.isFinite(next)) {
          setValue(String(initial));
          return;
        }
        if (next !== initial) updateData?.(rowId, columnId, next);
      }}
    />
  );
}

export function EditingTab() {
  const seed = React.useMemo(() => tableGalleryUsers.slice(0, 8), []);
  const [data, setData] = React.useState<GalleryUser[]>(() => seed);

  const columns = React.useMemo<ColumnDef<GalleryUser>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ getValue, row, column, table }) => (
          <EditableNameCell
            initial={getValue<string>()}
            rowId={row.original.id}
            columnId={column.id}
            updateData={table.options.meta?.updateData}
          />
        ),
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row, column, table }) => {
          const update = table.options.meta?.updateData;
          return (
            <Select
              value={row.original.role}
              onValueChange={(v) => update?.(row.original.id, column.id, v as GalleryUser['role'])}
            >
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">admin</SelectItem>
                <SelectItem value="instructor">instructor</SelectItem>
                <SelectItem value="student">student</SelectItem>
              </SelectContent>
            </Select>
          );
        },
      },
      {
        accessorKey: 'points',
        header: () => <div className="text-right">Points</div>,
        cell: ({ getValue, row, column, table }) => (
          <EditablePointsCell
            initial={getValue<number>()}
            rowId={row.original.id}
            columnId={column.id}
            updateData={table.options.meta?.updateData}
          />
        ),
      },
    ],
    [],
  );

  const updateData = React.useCallback((rowId: string, columnId: string, value: unknown) => {
    setData((old) =>
      old.map((row) => {
        if (row.id !== rowId) return row;
        return { ...row, [columnId]: value } as GalleryUser;
      }),
    );
  }, []);

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table is intentionally not memoized
  const table = useReactTable({
    data,
    columns,
    meta: { updateData },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6">
      <ShowcaseSection
        block
        title="Inline editing"
        description="Blur-to-commit text and number fields; role uses `Select` on change. Data updates via `table.options.meta.updateData` (TanStack pattern)."
      >
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
      </ShowcaseSection>
    </div>
  );
}
