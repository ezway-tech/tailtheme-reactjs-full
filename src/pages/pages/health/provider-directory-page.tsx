import { useMemo, useState } from 'react';
import { MapPin, Search, Star } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  toast,
} from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { healthProviders } from '@/mocks/fixtures';

export default function ProviderDirectoryPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return healthProviders;
    return healthProviders.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.specialty.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q),
    );
  }, [query]);

  function book(id: string, name: string) {
    toast.success(`Booking request sent to ${name} (demo)`);
    void id;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Provider directory"
        description="Find specialists and book an appointment."
      />

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search by name, specialty, or location…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search providers"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">No providers match your search.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((p) => (
            <Card key={p.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-base">{p.name}</CardTitle>
                    <CardDescription>{p.specialty}</CardDescription>
                  </div>
                  <Badge variant={p.accepting ? 'default' : 'secondary'}>
                    {p.accepting ? 'Accepting' : 'Waitlist'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-3">
                <div className="space-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" aria-hidden />
                    {p.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" aria-hidden />
                    {p.location}
                  </span>
                </div>
                <Button size="sm" disabled={!p.accepting} onClick={() => book(p.id, p.name)}>
                  Book
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
