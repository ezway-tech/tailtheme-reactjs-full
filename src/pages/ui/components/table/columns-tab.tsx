import * as React from 'react';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  type ColumnDef,
  type ColumnPinningState,
  type Header,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { DataTableColumnToggle } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { cn } from '@/lib/cn';
import type { GalleryUser } from './table-shared';
import { tableGalleryUsers } from './table-shared';

const baseCols = ['name', 'email', 'department', 'status', 'points'] as const;

function pinHeaderStyle<T>(header: Header<T, unknown>): React.CSSProperties {
  const col = header.column;
  const pinned = col.getIsPinned();
  return {
    position: pinned ? 'sticky' : 'relative',
    left: pinned === 'left' ? `${header.getStart('left')}px` : undefined,
    right: pinned === 'right' ? `${col.getAfter('right')}px` : undefined,
    zIndex: pinned ? 2 : 0,
    width: header.getSize(),
    background: 'hsl(var(--background))',
    boxShadow:
      pinned === 'left'
        ? 'inset -1px 0 0 0 hsl(var(--border))'
        : pinned === 'right'
          ? 'inset 1px 0 0 0 hsl(var(--border))'
          : undefined,
  };
}

function pinCellStyle<T>(column: Header<T, unknown>['column']): React.CSSProperties {
  const pinned = column.getIsPinned();
  return {
    position: pinned ? 'sticky' : undefined,
    left: pinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: pinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    zIndex: pinned ? 1 : 0,
    width: column.getSize(),
    background: 'hsl(var(--background))',
    boxShadow:
      pinned === 'left'
        ? 'inset -1px 0 0 0 hsl(var(--border))'
        : pinned === 'right'
          ? 'inset 1px 0 0 0 hsl(var(--border))'
          : undefined,
  };
}

const visibilityColumns: ColumnDef<GalleryUser>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
  },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'department',
    header: 'Dept',
    cell: ({ row }) => <span className="capitalize">{row.getValue('department')}</span>,
  },
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
];

function VisibilityDemo() {
  const data = React.useMemo(() => tableGalleryUsers.slice(0, 12), []);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    email: false,
    department: true,
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table is intentionally not memoized
  const table = useReactTable({
    data,
    columns: visibilityColumns,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <DataTableColumnToggle table={table} />
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
    </div>
  );
}

const pinColumns: ColumnDef<GalleryUser>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <span className="font-medium">{row.getValue('name')}</span>,
    size: 180,
    minSize: 120,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 220,
    minSize: 160,
  },
  {
    accessorKey: 'department',
    header: 'Dept',
    cell: ({ row }) => <span className="capitalize">{row.getValue('department')}</span>,
    size: 130,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <span className="capitalize">{row.getValue('status')}</span>,
    size: 110,
  },
  {
    accessorKey: 'points',
    header: () => <div className="text-right">Points</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.getValue<number>('points').toLocaleString()}
      </div>
    ),
    size: 100,
  },
];

function PinningDemo() {
  const data = React.useMemo(() => tableGalleryUsers.slice(0, 15), []);
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({
    left: ['name'],
    right: ['points'],
  });

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table is intentionally not memoized
  const table = useReactTable({
    data,
    columns: pinColumns,
    state: { columnPinning },
    onColumnPinningChange: setColumnPinning,
    enableColumnPinning: true,
    columnResizeMode: 'onChange',
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="max-w-full overflow-x-auto rounded-md border border-border">
      <Table style={{ width: table.getTotalSize() }}>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead key={header.id} style={pinHeaderStyle(header)} className="relative">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} style={pinCellStyle(cell.column)}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
        Scroll horizontally — name stays left, points stays right (`columnPinning` + sticky offsets
        from sizing).
      </p>
    </div>
  );
}

const resizeColumns: ColumnDef<GalleryUser>[] = [
  { accessorKey: 'name', header: 'Name', size: 200 },
  { accessorKey: 'email', header: 'Email', size: 260 },
  {
    accessorKey: 'points',
    header: () => <div className="text-right">Points</div>,
    cell: ({ row }) => (
      <div className="text-right tabular-nums">
        {row.getValue<number>('points').toLocaleString()}
      </div>
    ),
    size: 120,
  },
];

function ResizeDemo() {
  const data = React.useMemo(() => tableGalleryUsers.slice(0, 8), []);

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table is intentionally not memoized
  const table = useReactTable({
    data,
    columns: resizeColumns,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border border-border">
      <Table style={{ width: table.getTotalSize() }}>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead key={header.id} className="relative" style={{ width: header.getSize() }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                  <div
                    role="separator"
                    aria-orientation="vertical"
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={cn(
                      'absolute right-0 top-0 z-10 h-full w-1 cursor-col-resize touch-none select-none bg-border opacity-0 hover:opacity-100',
                      header.column.getIsResizing() && 'bg-primary opacity-100',
                    )}
                  />
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
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

const reorderColumnDefs: ColumnDef<GalleryUser>[] = [
  { accessorKey: 'name', header: 'Name', id: 'name' },
  { accessorKey: 'email', header: 'Email', id: 'email' },
  { accessorKey: 'department', header: 'Dept', id: 'department' },
  { accessorKey: 'status', header: 'Status', id: 'status' },
  { accessorKey: 'points', header: 'Points', id: 'points' },
];

function DraggableHeader({ header }: { header: Header<GalleryUser, unknown> }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: header.column.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.85 : 1,
    width: header.getSize(),
    position: 'relative',
  };

  return (
    <TableHead ref={setNodeRef} style={style} className="bg-background">
      <button
        type="button"
        className="flex w-full items-center gap-1 rounded px-1 py-0.5 text-left text-sm font-medium text-muted-foreground hover:bg-muted/60"
        {...attributes}
        {...listeners}
      >
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
      </button>
    </TableHead>
  );
}

function ReorderDemo() {
  const data = React.useMemo(() => tableGalleryUsers.slice(0, 8), []);
  const [columnOrder, setColumnOrder] = React.useState<string[]>(() => [...baseCols]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor),
  );

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table is intentionally not memoized
  const table = useReactTable({
    data,
    columns: reorderColumnDefs,
    state: { columnOrder },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setColumnOrder((order) => {
      const oldIndex = order.indexOf(active.id as string);
      const newIndex = order.indexOf(over.id as string);
      return arrayMove(order, oldIndex, newIndex);
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
        <div className="rounded-md border border-border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((header) => (
                    <DraggableHeader key={header.id} header={header} />
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
      </SortableContext>
    </DndContext>
  );
}

export function ColumnsTab() {
  return (
    <div className="space-y-6">
      <ShowcaseSection
        block
        title="Column visibility"
        description="Toggle leaf columns — pairs with `columnVisibility` state and `DataTableColumnToggle`."
      >
        <VisibilityDemo />
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Column pinning"
        description="Pin name left and points right; horizontal scroll keeps sticky columns aligned (`columnPinning` + sizing offsets)."
      >
        <PinningDemo />
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Column resize"
        description="Drag the vertical grip on header edges — `enableColumnResizing` + `columnResizeMode: 'onChange'`."
      >
        <ResizeDemo />
      </ShowcaseSection>

      <ShowcaseSection
        block
        title="Column reorder (drag)"
        description="Drag header labels horizontally — `@dnd-kit/sortable` updates `columnOrder` (TanStack Table)."
      >
        <ReorderDemo />
      </ShowcaseSection>
    </div>
  );
}
