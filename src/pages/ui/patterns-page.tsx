import { Inbox, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { urls } from '@/routes/urls';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ConfirmProvider,
  DataTableToolbar,
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
  PatternFormField,
  PricingBlock,
  SelectableCard,
  type PricingTier,
  useConfirm,
} from '@/components/patterns';
import { toast } from '@/components/ui/sonner';
import { ShowcaseSection } from '@/components/showcase/showcase-section';

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Everything you need to launch a side project.',
    monthlyPrice: 0,
    annualPrice: 0,
    cta: 'Start free',
    features: [
      { label: 'Up to 3 projects' },
      { label: 'Community support' },
      { label: 'Custom domains', included: false },
      { label: 'Priority support', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing teams that ship every week.',
    monthlyPrice: 29,
    annualPrice: 23,
    highlighted: true,
    cta: 'Start 14-day trial',
    features: [
      { label: 'Unlimited projects' },
      { label: 'Custom domains' },
      { label: 'Email + chat support' },
      { label: 'Audit log', note: 'Last 30 days of activity' },
    ],
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Advanced controls for organisations.',
    monthlyPrice: 79,
    annualPrice: 64,
    cta: 'Contact sales',
    ctaVariant: 'secondary',
    features: [
      { label: 'Everything in Pro' },
      { label: 'SSO & SAML' },
      { label: 'SOC 2 report' },
      { label: 'Dedicated CSM' },
    ],
  },
];

function ConfirmButton() {
  const confirm = useConfirm();
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        const ok = await confirm({
          title: 'Are you sure?',
          description: 'This will permanently delete the item.',
          confirmLabel: 'Delete',
          tone: 'danger',
        });
        toast(ok ? 'Confirmed' : 'Cancelled');
      }}
    >
      Confirm delete
    </Button>
  );
}

export default function PatternsPage() {
  const { t } = useTranslation();
  return (
    <ConfirmProvider>
      <div className="space-y-6">
        <PageHeader
          title={t('patterns.title', 'Patterns')}
          description={t(
            'patterns.subtitle',
            'High-level composed patterns built from primitives.',
          )}
          actions={<Button size="sm">Primary</Button>}
        />

        <ShowcaseSection title="PageHeader">
          <PageHeader
            className="w-full"
            title="Projects"
            description="Everything you own, all in one place."
            actions={<Button size="sm">New project</Button>}
          />
        </ShowcaseSection>

        <ShowcaseSection title="EmptyState / ErrorState / LoadingState">
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            <EmptyState
              icon={<Inbox className="h-5 w-5" />}
              title="Inbox zero"
              description="No new messages. Enjoy the quiet."
              action={<Button size="sm">Refresh</Button>}
            />
            <ErrorState
              title="Request failed"
              description="We couldn't complete your request."
              action={
                <Button size="sm" variant="outline">
                  Retry
                </Button>
              }
            />
            <LoadingState label="Loading…" />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="FormField (pattern)">
          <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
            <PatternFormField label="Email" placeholder="you@example.com" required />
            <PatternFormField
              label="Password"
              type="password"
              description="Minimum 8 characters."
              error="Password is too short"
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection title="DataTableToolbar">
          <DataTableToolbar
            className="w-full"
            search={{ placeholder: 'Search…' }}
            filters={
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="mine">Mine</SelectItem>
                </SelectContent>
              </Select>
            }
            viewOptions={
              <Button variant="outline" size="sm">
                Columns
              </Button>
            }
          />
        </ShowcaseSection>

        <ShowcaseSection title="useConfirm hook">
          <ConfirmButton />
        </ShowcaseSection>

        <ShowcaseSection
          title="SelectableCard"
          description="Radio/checkbox plan cards for checkout or onboarding."
        >
          <fieldset className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
            <SelectableCard
              name="plan"
              value="starter"
              type="radio"
              defaultChecked
              title="Starter"
              description="For side projects"
              price="$0/mo"
            />
            <SelectableCard
              name="plan"
              value="pro"
              type="radio"
              title="Pro"
              description="For growing teams"
              price="$29/mo"
              badge="Popular"
            />
          </fieldset>
        </ShowcaseSection>

        <ShowcaseSection
          title="PricingBlock"
          description="3-tier marketing pricing block with monthly/annual cadence toggle, recommended-tier highlight and per-tier feature checklist."
        >
          <PricingBlock
            className="w-full"
            tiers={PRICING_TIERS}
            onSelectTier={(tier, cadence) => toast.success(`Selected ${tier.id} (${cadence}) plan`)}
          />
        </ShowcaseSection>

        <ShowcaseSection
          title="Motion primitives"
          description="Reusable animation building blocks — see them all with live demos."
        >
          <Button asChild variant="outline">
            <Link to={urls.app.ui.motion}>
              <Sparkles className="mr-1 h-4 w-4" />
              Open Motion showcase
            </Link>
          </Button>
        </ShowcaseSection>
      </div>
    </ConfirmProvider>
  );
}
