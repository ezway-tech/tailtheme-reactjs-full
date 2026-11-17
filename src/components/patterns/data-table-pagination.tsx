import * as React from 'react';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/cn';

export interface DataTablePaginationProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  /** Page size dropdown values. Default `[5, 10, 20, 30, 50]`. */
  pageSizeOptions?: number[];
  /** Show “n row(s) selected” when row selection is enabled. */
  showSelectedCount?: boolean;
}

/**
 * Full pagination bar: page size, optional selection summary, first/prev/next/last.
 */
export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [5, 10, 20, 30, 50],
  showSelectedCount = false,
  className,
  ...props
}: DataTablePaginationProps<TData>) {
  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const selected =
    showSelectedCount && 'getFilteredSelectedRowModel' in table
      ? table.getFilteredSelectedRowModel().rows.length
      : 0;
  const total =
    showSelectedCount && 'getFilteredRowModel' in table
      ? table.getFilteredRowModel().rows.length
      : 0;

  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4',
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap">Rows per page</span>
          <Select
            value={`${pageSize}`}
            onValueChange={(v) => {
              table.setPageSize(Number(v));
            }}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {showSelectedCount ? (
          <span className="tabular-nums">
            {selected} of {total} row(s) selected
          </span>
        ) : null}
      </div>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="flex w-[120px] items-center justify-center text-sm font-medium tabular-nums">
          Page {pageCount === 0 ? 0 : pageIndex + 1} of {Math.max(1, pageCount)}
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            aria-label="First page"
          >
            <ChevronFirst className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
            aria-label="Last page"
          >
            <ChevronLast className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
