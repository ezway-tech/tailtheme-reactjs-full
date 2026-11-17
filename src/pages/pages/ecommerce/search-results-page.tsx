import { Link, useSearchParams } from 'react-router-dom';
import { Search, Star } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { sampleProducts } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';
import { useMemo, useState } from 'react';

export default function SearchResultsPage() {
  const [params, setParams] = useSearchParams();
  const initialQ = params.get('q') ?? '';
  const categoryFilter = params.get('category') ?? 'all';
  const [q, setQ] = useState(initialQ);

  const results = useMemo(() => {
    const needle = (params.get('q') ?? q).trim().toLowerCase();
    return sampleProducts.filter((p) => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (!needle) return true;
      return `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(needle);
    });
  }, [params, q, categoryFilter]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const next = new URLSearchParams(params);
    if (q.trim()) next.set('q', q.trim());
    else next.delete('q');
    setParams(next);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Search"
        description={
          results.length
            ? `${results.length} result${results.length === 1 ? '' : 's'}`
            : 'No products match your query.'
        }
      />

      <form onSubmit={handleSearch} className="flex flex-wrap gap-2">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search products…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <Select
          value={params.get('sort') ?? 'relevance'}
          onValueChange={(v) => {
            const next = new URLSearchParams(params);
            next.set('sort', v);
            setParams(next);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price-asc">Price: low</SelectItem>
            <SelectItem value="price-desc">Price: high</SelectItem>
            <SelectItem value="rating">Top rated</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">Search</Button>
      </form>

      {categoryFilter !== 'all' ? (
        <Badge variant="secondary">Category: {categoryFilter}</Badge>
      ) : null}

      {results.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Try a different keyword or browse categories.</p>
            <Button asChild className="mt-4" variant="outline">
              <Link to={urls.app.pages.ecommerce.categories}>Browse categories</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              <div className="aspect-video overflow-hidden bg-muted">
                <img src={p.image} alt="" className="h-full w-full object-cover" />
              </div>
              <CardContent className="space-y-1 pt-4">
                <p className="text-xs text-muted-foreground">{p.category}</p>
                <Link
                  to={urls.app.pages.ecommerce.product}
                  className="font-medium hover:text-text-brand"
                >
                  {p.name}
                </Link>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
                  {p.rating}
                </div>
                <p className="font-semibold">${p.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
