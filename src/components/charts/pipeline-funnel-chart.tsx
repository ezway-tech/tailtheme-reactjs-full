import type { CSSProperties } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export interface FunnelDatum {
  stage: string;
  value: number;
  count: number;
}

export interface PipelineFunnelChartProps {
  data: FunnelDatum[];
}

function tooltipStyle(): CSSProperties {
  return {
    background: 'hsl(var(--color-card-hsl, 0 0% 100%))',
    border: '1px solid hsl(var(--color-border-hsl, 220 13% 91%))',
    borderRadius: '0.5rem',
    fontSize: '0.75rem',
  };
}

/** Recharts bundle — import only via `LazyChart` to keep initial chunk smaller. */
export default function PipelineFunnelChart({ data }: PipelineFunnelChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis dataKey="stage" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip
          contentStyle={tooltipStyle()}
          formatter={(value, _name, item) => {
            const v = typeof value === 'number' ? value : Number(value);
            const count =
              item && typeof item === 'object' && 'payload' in item
                ? ((item.payload as { count?: number }).count ?? 0)
                : 0;
            return [`$${v}k · ${count} deals`, 'Value'];
          }}
        />
        <Bar dataKey="value" fill="hsl(var(--color-primary-hsl, 205 70% 37%))" radius={4} />
      </BarChart>
    </ResponsiveContainer>
  );
}
