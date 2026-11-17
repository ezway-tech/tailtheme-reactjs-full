import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Trash2 } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardFooter } from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { sampleProducts } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const WISHLIST_IDS = ['p-1', 'p-3', 'p-5', 'p-6'];

export default function WishlistPage() {
  const items = sampleProducts.filter((p) => WISHLIST_IDS.includes(p.id));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Wishlist"
        description={`${items.length} saved items — move to cart or remove.`}
        actions={
          <Button asChild size="sm">
            <Link to={urls.app.pages.ecommerce.cart}>
              <ShoppingCart className="h-4 w-4" /> View cart
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((p) => (
          <Card key={p.id} className="overflow-hidden">
            <div className="relative aspect-square overflow-hidden bg-muted">
              <img src={p.image} alt="" className="h-full w-full object-cover" />
              <Button
                size="icon"
                variant="secondary"
                className="absolute right-2 top-2 h-8 w-8"
                aria-label="Remove from wishlist"
              >
                <Heart className="h-4 w-4 fill-primary text-primary" />
              </Button>
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
                {p.rating} ({p.reviews})
              </div>
              <p className="text-lg font-semibold">${p.price}</p>
              {!p.inStock ? <Badge variant="secondary">Out of stock</Badge> : null}
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm" className="flex-1" disabled={!p.inStock}>
                Add to cart
              </Button>
              <Button size="icon" variant="ghost" aria-label="Remove">
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
