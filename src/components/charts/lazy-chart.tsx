import { lazy, Suspense, type ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/cn';

const LazyPipelineFunnelChart = lazy(() => import('./pipeline-funnel-chart'));

export interface LazyFunnelChartProps {
  data: { stage: string; value: number; count: number }[];
  className?: string;
  minHeight?: number;
}

/**
 * Code-splits Recharts into a separate async chunk. Use for dashboard charts.
 */
export function LazyFunnelChart({ data, className, minHeight = 256 }: LazyFunnelChartProps) {
  return (
    <div className={cn('w-full', className)} style={{ minHeight }}>
      <Suspense fallback={<Skeleton className="h-full w-full rounded-md" style={{ minHeight }} />}>
        <LazyPipelineFunnelChart data={data} />
      </Suspense>
    </div>
  );
}

export interface LazyChartBoundaryProps {
  children: ReactNode;
  minHeight?: number;
  className?: string;
}

/** Generic Suspense boundary for any lazy-loaded chart module. */
export function LazyChartBoundary({
  children,
  minHeight = 256,
  className,
}: LazyChartBoundaryProps) {
  return (
    <div className={cn('w-full', className)} style={{ minHeight }}>
      <Suspense fallback={<Skeleton className="h-full w-full rounded-md" style={{ minHeight }} />}>
        {children}
      </Suspense>
    </div>
  );
}
