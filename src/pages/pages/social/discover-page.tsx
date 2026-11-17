import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui';
import { PageHeader } from '@/components/patterns';
import { urls } from '@/routes/urls';
import discoverArt01 from '@/assets/image/discover-art-01.jpg';
import discoverArt02 from '@/assets/image/discover-art-02.jpg';
import discoverArt03 from '@/assets/image/discover-art-03.jpg';
import discoverArt04 from '@/assets/image/discover-art-04.jpg';
import discoverArt05 from '@/assets/image/discover-art-05.jpg';
import discoverArt06 from '@/assets/image/discover-art-06.jpg';
import discoverArt07 from '@/assets/image/discover-art-07.jpg';
import discoverArt08 from '@/assets/image/discover-art-08.jpg';

const DISCOVER_ITEMS = [
  {
    id: 'u-1',
    user: 'maria',
    img: discoverArt01,
  },
  {
    id: 'u-2',
    user: 'alex',
    img: discoverArt02,
  },
  {
    id: 'u-3',
    user: 'hiro',
    img: discoverArt03,
  },
  {
    id: 'u-4',
    user: 'priya',
    img: discoverArt04,
  },
  {
    id: 'u-5',
    user: 'liam',
    img: discoverArt05,
  },
  {
    id: 'u-6',
    user: 'aisha',
    img: discoverArt06,
  },
  {
    id: 'u-7',
    user: 'noah',
    img: discoverArt07,
  },
  {
    id: 'u-8',
    user: 'sofia',
    img: discoverArt08,
  },
];

export default function DiscoverPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Discover"
        description="Explore trending photos and creators across the network."
      />

      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
        {DISCOVER_ITEMS.map((item) => (
          <Card key={item.id} className="mb-4 break-inside-avoid overflow-hidden">
            <img src={item.img} alt="" className="w-full object-cover" loading="lazy" />
            <CardContent className="p-3">
              <Link
                to={urls.app.pages.social.userProfile(item.id)}
                className="text-sm font-medium hover:underline"
              >
                @{item.user}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
