import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, Star, Truck } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  Label,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { sampleProducts } from '@/mocks/fixtures';
import { urls } from '@/routes/urls';

const p = sampleProducts[0];

export default function ProductDetailPage() {
  return (
    <div className="space-y-6">
      <PageHeader title={p.name} description={p.description} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid gap-2">
          <div className="aspect-square overflow-hidden rounded-lg border border-border bg-muted">
            <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {sampleProducts.slice(1, 5).map((t) => (
              <div
                key={t.id}
                className="aspect-square overflow-hidden rounded-md border border-border bg-muted"
              >
                <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <Badge variant="outline" className="mb-2 uppercase">
              {p.category}
            </Badge>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-semibold">${p.price}</span>
              {p.originalPrice ? (
                <span className="text-sm text-muted-foreground line-through">
                  ${p.originalPrice}
                </span>
              ) : null}
            </div>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-current text-amber-500" />
                {p.rating.toFixed(1)}
              </span>
              <span>·</span>
              <span>{p.reviews} reviews</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Size</Label>
            <RadioGroup defaultValue="m" className="flex gap-2">
              {['xs', 's', 'm', 'l', 'xl'].map((s) => (
                <Label
                  key={s}
                  htmlFor={`sz-${s}`}
                  className="flex h-9 w-11 cursor-pointer items-center justify-center rounded-md border border-border text-sm uppercase peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-foreground [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary [&:has([data-state=checked])]:text-primary-foreground"
                >
                  <RadioGroupItem id={`sz-${s}`} value={s} className="sr-only peer" />
                  {s}
                </Label>
              ))}
            </RadioGroup>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="lg" asChild>
              <Link to={urls.app.pages.ecommerce.cart}>Add to cart</Link>
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-4 w-4" /> Save
            </Button>
          </div>

          <Card>
            <CardContent className="grid grid-cols-1 gap-3 pt-6 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-muted-foreground" /> Free shipping over $50
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-muted-foreground" /> 30-day returns
              </div>
            </CardContent>
          </Card>

          <Separator />

          <Tabs defaultValue="desc">
            <TabsList>
              <TabsTrigger value="desc">Description</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="desc" className="text-sm text-muted-foreground">
              {p.description} Built to last through seasons with reinforced stitching and natural
              fibres.
            </TabsContent>
            <TabsContent value="shipping" className="text-sm text-muted-foreground">
              Orders placed before 2pm ship same day. Free ground shipping on orders over $50.
            </TabsContent>
            <TabsContent value="reviews" className="text-sm text-muted-foreground">
              {p.reviews} verified reviews — average {p.rating.toFixed(1)} / 5.
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
