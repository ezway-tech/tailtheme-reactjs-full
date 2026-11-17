import { Activity, CreditCard, DollarSign, Users } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { PageHeader } from '@/components/patterns';
import { ShowcaseSection } from '@/components/showcase/showcase-section';
import { ComponentApi } from '@/components/showcase/component-api';

const REVENUE = [12, 14, 13, 15, 16, 18, 17, 19, 21, 22, 24, 26];
const CHURN = [4.2, 4.4, 4.5, 4.3, 4.7, 4.9, 5.1, 5.0, 5.3, 5.4, 5.6, 5.5];
const SIGNUPS = [120, 132, 119, 145, 160, 152, 168, 175, 182, 190, 195, 210];
const MAU = [3, 3.1, 3.05, 3.15, 3.2, 3.18, 3.22, 3.21, 3.23, 3.22, 3.24, 3.23];

export default function StatCardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="StatCard"
        description="KPI tile for dashboards: label, value, trend pill, optional icon and an inline sparkline. Compose multiple cards in a CSS grid for a summary row."
      />

      <ComponentApi
        description="Source: src/components/ui/stat-card.tsx. The sparkline is a tiny inline SVG — for full charts use the Charts page (Recharts)."
        importCode={`import { StatCard } from '@/components/ui';`}
        props={[
          {
            name: 'label',
            type: 'React.ReactNode',
            description: 'Field name above the value (e.g. "Revenue").',
          },
          {
            name: 'value',
            type: 'React.ReactNode',
            description: 'Pre-formatted KPI value — keep it short.',
          },
          {
            name: 'caption',
            type: 'React.ReactNode',
            description: 'Optional subtitle next to the trend pill.',
          },
          {
            name: 'delta',
            type: 'React.ReactNode',
            description: 'Trend pill content (e.g. "+12.4%").',
          },
          {
            name: 'trend',
            type: `'up' | 'down' | 'neutral'`,
            default: `'neutral'`,
            description: 'Drives the trend color and arrow icon.',
          },
          {
            name: 'icon',
            type: 'LucideIcon',
            description: 'Optional icon shown in a muted pill in the corner.',
          },
          {
            name: 'sparkline',
            type: 'number[]',
            description: 'Series for the inline sparkline. Hidden when omitted.',
          },
          {
            name: 'sparklineTone',
            type: `'up' | 'down' | 'neutral'`,
            description: 'Override sparkline color independently from `trend`.',
          },
        ]}
        tokens={[
          { name: '--card / --card-foreground', description: 'Card background and text color.' },
          { name: '--success-bg / --success-text', description: 'Up trend pill + sparkline.' },
          { name: '--danger-bg / --danger-text', description: 'Down trend pill + sparkline.' },
          {
            name: '--muted / --muted-foreground',
            description: 'Neutral trend, icon pill background and label color.',
          },
        ]}
      />

      <ShowcaseSection
        title="KPI grid"
        description="The most common shape: 3–4 stat cards across the top of a dashboard."
        code={`<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
  <StatCard label="Revenue" value="$48,210" delta="+12.4%" trend="up" icon={DollarSign} sparkline={[/*...*/]} />
  <StatCard label="Active users" value="3.2k" delta="+1.8%" trend="up" icon={Users} sparkline={[/*...*/]} />
  <StatCard label="Churn" value="5.5%" delta="+0.4%" trend="down" icon={Activity} sparkline={[/*...*/]} />
  <StatCard label="MRR" value="$8,450" delta="0.0%" trend="neutral" icon={CreditCard} sparkline={[/*...*/]} />
</div>`}
      >
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Revenue"
            value="$48,210"
            delta="+12.4%"
            trend="up"
            caption="vs last month"
            icon={DollarSign}
            sparkline={REVENUE}
          />
          <StatCard
            label="Active users"
            value="3.21k"
            delta="+1.8%"
            trend="up"
            caption="vs last week"
            icon={Users}
            sparkline={SIGNUPS}
          />
          <StatCard
            label="Churn"
            value="5.5%"
            delta="+0.4%"
            trend="down"
            caption="vs last month"
            icon={Activity}
            sparkline={CHURN}
          />
          <StatCard
            label="MRR"
            value="$8,450"
            delta="0.0%"
            trend="neutral"
            caption="vs last month"
            icon={CreditCard}
            sparkline={MAU}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Without sparkline"
        description="Drop the chart for very small spaces or when you only need the headline."
        code={`<StatCard label="New signups" value="1,204" delta="+24" trend="up" />`}
      >
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard label="New signups" value="1,204" delta="+24" trend="up" caption="last 24h" />
          <StatCard
            label="Open tickets"
            value="38"
            delta="-6"
            trend="up"
            caption="last 24h"
            sparklineTone="up"
          />
          <StatCard label="Failed payments" value="9" delta="+3" trend="down" caption="last 24h" />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Trend variants"
        description="`trend` controls both the pill color and the arrow icon — and the sparkline tone unless you override `sparklineTone`."
        code={`<StatCard trend="up" delta="+12%" sparkline={[...]} />
<StatCard trend="down" delta="-3%" sparkline={[...]} />
<StatCard trend="neutral" delta="0%" sparkline={[...]} />`}
      >
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard
            label="Up"
            value="912"
            delta="+12%"
            trend="up"
            sparkline={[2, 3, 5, 4, 6, 7, 9, 11]}
          />
          <StatCard
            label="Down"
            value="412"
            delta="-3%"
            trend="down"
            sparkline={[10, 9, 9, 8, 7, 6, 5, 4]}
          />
          <StatCard
            label="Neutral"
            value="612"
            delta="0%"
            trend="neutral"
            sparkline={[5, 6, 5, 6, 5, 6, 5, 6]}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Compact (no icon, big sparkline)"
        description="Pair with a wider grid cell when you want the trend chart to do most of the talking."
        code={`<StatCard label="Page views" value="128k" sparkline={[...]} className="lg:col-span-2" />`}
      >
        <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-3">
          <StatCard
            label="Page views"
            value="128.4k"
            delta="+5.6%"
            trend="up"
            sparkline={[80, 90, 88, 95, 110, 108, 115, 120, 122, 128]}
            className="lg:col-span-2"
          />
          <StatCard
            label="Bounce rate"
            value="42%"
            delta="-1.2%"
            trend="up"
            sparkline={[50, 48, 47, 47, 46, 45, 44, 43, 42]}
          />
        </div>
      </ShowcaseSection>
    </div>
  );
}
