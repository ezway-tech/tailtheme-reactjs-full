import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { ecommerceCategories } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

export default function CategoryHubPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Shop by category"
        description="Browse curated collections. Each category links to filtered search results."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {ecommerceCategories.map((cat) => (
          <Card key={cat.id} className="overflow-hidden">
            <div className="grid sm:grid-cols-2">
              <div className="aspect-[4/3] overflow-hidden bg-muted sm:aspect-auto">
                <img src={cat.image} alt="" className="h-full w-full object-cover" />
              </div>
              <CardContent className="flex flex-col justify-center gap-3 p-6">
                <div>
                  <h2 className="text-xl font-semibold">{cat.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{cat.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{cat.productCount} products</p>
                </div>
                <Button asChild variant="outline" size="sm" className="w-fit">
                  <Link
                    to={`${urls.app.pages.ecommerce.search}?category=${encodeURIComponent(cat.name)}`}
                  >
                    Browse {cat.name}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
