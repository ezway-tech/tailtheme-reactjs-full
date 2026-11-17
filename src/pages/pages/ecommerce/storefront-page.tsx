import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { MotionCard, StaggerGrid } from '@/components/motion';
import { sampleProducts } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';
import { useMemo, useState } from 'react';

export default function StorefrontPage() {
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return sampleProducts.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (needle && !p.name.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [q, category]);

  const categories = ['all', ...Array.from(new Set(sampleProducts.map((p) => p.category)))];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Storefront"
        description="Browse the catalog, filter by category, click a card to view product detail."
        actions={
          <Button asChild variant="outline" size="sm">
            <Link to={urls.app.pages.ecommerce.cart}>
              <ShoppingCart className="h-4 w-4" /> Cart (2)
            </Link>
          </Button>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <Input
          className="max-w-sm"
          placeholder="Search products…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c === 'all' ? 'All categories' : c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <StaggerGrid
        key={`${q}|${category}`}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        stagger="normal"
      >
        {filtered.map((p) => (
          <MotionCard key={p.id} className="h-full">
            <Card className="group h-full overflow-hidden">
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardContent className="space-y-1 pt-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs uppercase tracking-wider text-muted-foreground">
                    {p.category}
                  </p>
                  {!p.inStock ? <Badge variant="secondary">Out of stock</Badge> : null}
                </div>
                <Link
                  to={urls.app.pages.ecommerce.product}
                  className="block font-medium hover:underline"
                >
                  {p.name}
                </Link>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
                  <span>{p.rating.toFixed(1)}</span>
                  <span>·</span>
                  <span>{p.reviews} reviews</span>
                </div>
              </CardContent>
              <CardFooter className="justify-between pt-0">
                <div>
                  <span className="font-semibold">${p.price}</span>
                  {p.originalPrice ? (
                    <span className="ml-2 text-xs text-muted-foreground line-through">
                      ${p.originalPrice}
                    </span>
                  ) : null}
                </div>
                <Button size="sm" disabled={!p.inStock}>
                  Add
                </Button>
              </CardFooter>
            </Card>
          </MotionCard>
        ))}
      </StaggerGrid>
    </div>
  );
}
