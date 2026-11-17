import { useMemo, useState } from 'react';
import { AlertTriangle, Package } from 'lucide-react';
import {
  Badge,
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { sampleProducts } from '@/mocks/fixtures';

interface InventoryRow {
  sku: string;
  name: string;
  category: string;
  stock: number;
  reserved: number;
  reorderAt: number;
}

const INVENTORY: InventoryRow[] = sampleProducts.map((p, i) => ({
  sku: `SKU-${p.id.toUpperCase()}`,
  name: p.name,
  category: p.category,
  stock: p.inStock ? 24 + i * 7 : 0,
  reserved: i % 3,
  reorderAt: 10,
}));

export default function InventoryAdminPage() {
  const [q, setQ] = useState('');

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return INVENTORY.filter(
      (r) => !needle || `${r.sku} ${r.name} ${r.category}`.toLowerCase().includes(needle),
    );
  }, [q]);

  const lowStock = rows.filter((r) => r.stock > 0 && r.stock <= r.reorderAt).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory"
        description="SKU levels, reservations, and low-stock alerts."
        actions={<Button size="sm">Export CSV</Button>}
      />

      {lowStock > 0 ? (
        <div className="flex items-center gap-2 rounded-md border border-warning/40 bg-warning/10 px-4 py-3 text-sm">
          <AlertTriangle className="h-4 w-4 text-warning" aria-hidden />
          <span>
            <strong>{lowStock}</strong> SKU{lowStock === 1 ? '' : 's'} below reorder threshold
          </span>
        </div>
      ) : null}

      <Input
        className="max-w-sm"
        placeholder="Search SKU or product…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">On hand</TableHead>
            <TableHead className="text-right">Reserved</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => {
            const isLow = r.stock > 0 && r.stock <= r.reorderAt;
            const isOut = r.stock === 0;
            return (
              <TableRow key={r.sku}>
                <TableCell className="font-mono text-xs">{r.sku}</TableCell>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.category}</TableCell>
                <TableCell className="text-right">{r.stock}</TableCell>
                <TableCell className="text-right">{r.reserved}</TableCell>
                <TableCell>
                  {isOut ? (
                    <Badge variant="danger">Out of stock</Badge>
                  ) : isLow ? (
                    <Badge variant="warning">Low stock</Badge>
                  ) : (
                    <Badge variant="success">Healthy</Badge>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {rows.length === 0 ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Package className="h-4 w-4" /> No SKUs match your search.
        </p>
      ) : null}
    </div>
  );
}
