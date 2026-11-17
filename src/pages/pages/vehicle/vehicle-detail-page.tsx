import { Link } from 'react-router-dom';
import { Bolt, Cog, Fuel, Gauge, MapPin, Shield, Star, Users } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { urls } from '@/routes/urls';

const SPECS = [
  { icon: Users, label: 'Seats', value: '5 adults' },
  { icon: Fuel, label: 'Range', value: '330 mi (EPA)' },
  { icon: Gauge, label: 'Top speed', value: '135 mph' },
  { icon: Cog, label: 'Drivetrain', value: 'Dual motor AWD' },
  { icon: Bolt, label: 'Charging', value: '250 kW Supercharger' },
  { icon: Shield, label: 'Safety', value: '5-star NHTSA' },
];

export default function VehicleDetailPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tesla Model Y (2025)"
        description="Long Range · Dual motor AWD"
        actions={
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link to={urls.app.pages.vehicle.compare}>Compare</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to={urls.app.pages.vehicle.financing}>Financing</Link>
            </Button>
            <Button asChild>
              <Link to={urls.app.pages.vehicle.booking}>Book this vehicle</Link>
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="flex aspect-video items-center justify-center rounded-lg bg-muted text-9xl">
            <span aria-hidden>🚙</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {['🚙', '🪑', '🧭', '🔋'].map((e, i) => (
              <div
                key={i}
                className="flex aspect-video items-center justify-center rounded-md bg-muted text-4xl"
              >
                <span aria-hidden>{e}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-3xl font-bold">$145</span>
                <span className="text-sm font-normal text-muted-foreground">/day</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> 4.9 · 128 reviews
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> Available at SFO, LAX, JFK
              </div>
              <div className="flex flex-wrap gap-1">
                {['Autopilot', 'Premium audio', 'Glass roof', 'Hepa filter'].map((f) => (
                  <Badge key={f} variant="outline">
                    {f}
                  </Badge>
                ))}
              </div>
              <Separator />
              <Button asChild className="w-full">
                <Link to={urls.app.pages.vehicle.booking}>Reserve now</Link>
              </Button>
              <Button variant="outline" className="w-full">
                Save for later
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="specs">
        <TabsList>
          <TabsTrigger value="specs">Specs</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="specs" className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {SPECS.map(({ icon: Icon, label, value }) => (
            <Card key={label}>
              <CardContent className="flex items-center gap-3 p-4">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="description" className="space-y-3 text-sm text-muted-foreground">
          <p>
            The 2025 Model Y Long Range offers 330 miles of EPA-estimated range, dual motor
            all-wheel drive, and 250 kW Supercharging. The cabin features a panoramic glass roof,
            15" center display, and premium audio with 14 speakers.
          </p>
          <p>
            Active safety comes standard — automatic emergency braking, lane-keep assist, and
            forward collision warning — alongside optional Full Self-Driving capability.
          </p>
        </TabsContent>
        <TabsContent value="reviews" className="space-y-3 text-sm text-muted-foreground">
          <p>Guest ratings and trip feedback for this listing.</p>
          <Button asChild variant="outline" size="sm">
            <Link to={urls.app.pages.vehicle.reviews}>View all reviews</Link>
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
