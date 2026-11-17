import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Minus, X } from 'lucide-react';
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { sampleProducts, type SampleProduct } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const ROWS: { label: string; key: keyof SampleProduct | 'priceDisplay' }[] = [
  { label: 'Price', key: 'priceDisplay' },
  { label: 'Category', key: 'category' },
  { label: 'Rating', key: 'rating' },
  { label: 'Reviews', key: 'reviews' },
  { label: 'In stock', key: 'inStock' },
];

function cellValue(p: SampleProduct, key: (typeof ROWS)[number]['key']) {
  if (key === 'priceDisplay') return `$${p.price}`;
  if (key === 'inStock') return p.inStock;
  return p[key];
}

export default function CompareProductsPage() {
  const [selected, setSelected] = useState<string[]>(['p-1', 'p-2', 'p-4']);

  const products = sampleProducts.filter((p) => selected.includes(p.id));

  function toggle(id: string) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Compare products"
        description="Select up to 3 products to compare side by side."
        actions={
          <Button asChild variant="outline" size="sm">
            <Link to={urls.app.pages.ecommerce.storefront}>Back to shop</Link>
          </Button>
        }
      />

      <div className="flex flex-wrap gap-3">
        {sampleProducts.map((p) => (
          <label
            key={p.id}
            className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-sm"
          >
            <Checkbox checked={selected.includes(p.id)} onCheckedChange={() => toggle(p.id)} />
            {p.name}
          </label>
        ))}
      </div>

      {products.length < 2 ? (
        <p className="text-sm text-muted-foreground">Select at least two products to compare.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-40">Spec</TableHead>
              {products.map((p) => (
                <TableHead key={p.id}>
                  <img src={p.image} alt="" className="mb-2 h-16 w-16 rounded-md object-cover" />
                  {p.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map(({ label, key }) => (
              <TableRow key={label}>
                <TableCell className="font-medium">{label}</TableCell>
                {products.map((p) => (
                  <TableCell key={p.id}>
                    {key === 'inStock' ? (
                      p.inStock ? (
                        <Check className="h-4 w-4 text-success" aria-label="Yes" />
                      ) : (
                        <Minus className="h-4 w-4 text-muted-foreground" aria-label="No" />
                      )
                    ) : (
                      String(cellValue(p, key))
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow>
              <TableCell />
              {products.map((p) => (
                <TableCell key={p.id}>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelected((s) => s.filter((id) => id !== p.id))}
                  >
                    <X className="h-4 w-4" /> Remove
                  </Button>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
}
