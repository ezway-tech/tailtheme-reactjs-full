import { Link } from 'react-router-dom';
import {
  DocsBlock,
  DocsCallout,
  DocsCode,
  DocsFooter,
  DocsH2,
  DocsH3,
  DocsList,
  DocsP,
  DocsSubtitle,
  DocsTitle,
} from './docs-prose';
import { urls } from '@/routes/urls';

export default function ArchitectureRoutingPage() {
  return (
    <div>
      <DocsTitle>Architecture &amp; routing</DocsTitle>
      <DocsSubtitle>
        Pick a layout per route, keep URLs in one map, and mirror each leaf in the nav trees inside{' '}
        <DocsCode>AppShell</DocsCode>. Component demos live under <DocsCode>/app/ui</DocsCode>{' '}
        rather than a separate docs page.
      </DocsSubtitle>

      <DocsH2>URL map</DocsH2>
      <DocsP>
        Canonical paths are defined in <DocsCode>src/routes/urls.ts</DocsCode> and consumed from
        navigators, breadcrumbs, and tests. When you add a page, add a typed entry there first, then
        wire the route in <DocsCode>route-objects.tsx</DocsCode> so deep links never drift.
      </DocsP>
      <DocsList>
        <li>
          <DocsCode>urls.app.pages.*</DocsCode> — themed sample pages (Edu, E-commerce, SaaS, …)
        </li>
        <li>
          <DocsCode>urls.app.ui.*</DocsCode> — UI Elements (tokens, primitives, patterns, motion)
        </li>
        <li>
          <DocsCode>urls.app.docs.*</DocsCode> — this documentation tree
        </li>
        <li>
          <DocsCode>urls.auth.*</DocsCode>, <DocsCode>urls.learn.*</DocsCode>,{' '}
          <DocsCode>urls.errors.*</DocsCode> — routes outside the main shell where appropriate
        </li>
      </DocsList>

      <DocsH2>Legacy redirects</DocsH2>
      <DocsP>
        Flat paths such as <DocsCode>/app/settings</DocsCode> redirect to nested URLs under{' '}
        <DocsCode>/app/pages/…</DocsCode>. Older docs slugs (<DocsCode>/app/docs/theming</DocsCode>,{' '}
        <DocsCode>/app/docs/customizing</DocsCode>, <DocsCode>/app/docs/layouts</DocsCode>) redirect
        to this guide or to UI Elements for the old Components overview. Keep{' '}
        <DocsCode>&lt;Navigate replace /&gt;</DocsCode> entries when you rename routes so bookmarks
        keep working.
      </DocsP>
      <DocsCallout title="Showcase routes">
        Legacy <DocsCode>/showcase/*</DocsCode> URLs redirect to <DocsCode>/app/ui/*</DocsCode>.{' '}
        <DocsCode>urls.showcase.*</DocsCode> remains as an alias for older call sites.
      </DocsCallout>

      <DocsH2>Layouts</DocsH2>
      <DocsList>
        <li>
          <DocsCode>AppShell</DocsCode> — main chrome; switches <DocsCode>sidebar</DocsCode>,{' '}
          <DocsCode>top-nav</DocsCode>, and <DocsCode>compact</DocsCode> from preferences.
        </li>
        <li>
          <DocsCode>AuthLayout</DocsCode> — centered card for login/register/forgot.
        </li>
        <li>
          <DocsCode>FullscreenLayout</DocsCode> — lesson player and quizzes.
        </li>
        <li>
          <DocsCode>DocsLayout</DocsCode> — sidebar TOC + content for documentation.
        </li>
        <li>
          <DocsCode>ShowcaseLayout</DocsCode> — gallery shell; public entry{' '}
          <DocsCode>/showcase</DocsCode> forwards to <DocsCode>/app/ui</DocsCode>.
        </li>
      </DocsList>

      <DocsH2>Navigation data</DocsH2>
      <DocsP>
        Sidebar and top nav use plain trees (<DocsCode>PAGES_TREE</DocsCode>,{' '}
        <DocsCode>UI_TREE</DocsCode>, <DocsCode>DOCS_TREE</DocsCode>) in{' '}
        <DocsCode>AppShell.tsx</DocsCode>. Each leaf points at <DocsCode>urls.app.*</DocsCode> and
        carries an i18n <DocsCode>labelKey</DocsCode>. When you add a section: one URL constant, one
        route object, one tree row, and a translation key if the label is new.
      </DocsP>

      <DocsH2>Lazy-loaded pages</DocsH2>
      <DocsP>
        Route components use <DocsCode>React.lazy</DocsCode> and <DocsCode>Suspense</DocsCode> in{' '}
        <DocsCode>route-objects.tsx</DocsCode> to keep the initial bundle small.
      </DocsP>

      <DocsH2>Wiring routes</DocsH2>
      <DocsP>
        Routes live in <DocsCode>src/routes/route-objects.tsx</DocsCode>:
      </DocsP>
      <DocsBlock>
        {`{
  path: '/app',
  element: <AppShell />,
  children: [
    { index: true, element: <Navigate to="/app/dashboard" replace /> },
    { path: 'dashboard', element: <DashboardPage />, handle: { breadcrumb: 'Dashboard' } },
    { path: 'courses', element: <CoursesPage />, handle: { breadcrumb: 'Courses' } },
  ],
},`}
      </DocsBlock>

      <DocsH2>Auto breadcrumbs</DocsH2>
      <DocsP>
        Set <DocsCode>handle.breadcrumb</DocsCode> on each route —{' '}
        <DocsCode>BreadcrumbsAuto</DocsCode> derives the trail from{' '}
        <DocsCode>useMatches()</DocsCode>.
      </DocsP>
      <DocsH3>Optional metadata</DocsH3>
      <DocsP>
        You can extend <DocsCode>handle</DocsCode> with more fields as long as types stay aligned
        with the router module augmentation used in the codebase.
      </DocsP>

      <DocsH2>Page enter/exit transitions (opt-in)</DocsH2>
      <DocsP>
        The main shell wraps the primary <DocsCode>&lt;Outlet /&gt;</DocsCode> with{' '}
        <DocsCode>PageOutletTransition</DocsCode> so navigation can animate when a route opts in.
        There is no theme-customizer or user-preference global preset: only routes that set{' '}
        <DocsCode>handle.pageTransition</DocsCode> (see <DocsCode>AppRouteHandle</DocsCode>) get
        enter/exit tweens. Preset ids are defined in{' '}
        <DocsCode>src/lib/motion/page-transition-presets.ts</DocsCode>. If no ancestor match defines
        a transition, the shell uses <DocsCode>APP_PAGE_DEFAULT_TRANSITION</DocsCode> from config
        (this repo keeps it <DocsCode>'none'</DocsCode> so unnamed routes stay instant). Ops can
        disable all outlet animation with <DocsCode>APP_PAGE_TRANSITIONS_ENABLED</DocsCode>.
      </DocsP>
      <DocsBlock>
        {`{
  path: 'analytics',
  element: <AnalyticsPage />,
  handle: {
    breadcrumb: 'Analytics',
    pageTransition: 'fadeScale',
  } satisfies AppRouteHandle,
},`}
      </DocsBlock>
      <DocsP>
        For a mount-only animation on a subtree when you cannot use <DocsCode>handle</DocsCode>, use{' '}
        <DocsCode>PageAnimated</DocsCode> from <DocsCode>@/components/motion</DocsCode> — avoid
        stacking it on the same surface as an outlet transition. Live examples:{' '}
        <Link
          to={urls.app.ui.examples.pageTransitions}
          className="font-medium underline underline-offset-2"
        >
          Page transitions
        </Link>
        .
      </DocsP>

      <DocsH2>UI components &amp; imports</DocsH2>
      <DocsP>
        Primitives live in <DocsCode>src/components/ui</DocsCode>, compositions in{' '}
        <DocsCode>src/components/patterns</DocsCode>, and motion helpers in{' '}
        <DocsCode>src/components/motion</DocsCode>. Browse live examples from the sidebar under{' '}
        <strong>UI Elements</strong> or start at{' '}
        <Link to={urls.app.ui.root} className="font-medium underline underline-offset-2">
          /app/ui
        </Link>
        .
      </DocsP>
      <DocsList>
        <li>
          <Link to={urls.app.ui.tokens.root} className="text-primary hover:underline">
            Styling tokens
          </Link>{' '}
          — CSS variables and the Tailwind theme bridge
        </li>
        <li>
          <Link to={urls.app.ui.patterns} className="text-primary hover:underline">
            Patterns
          </Link>{' '}
          — headers, command palette, and other compositions
        </li>
        <li>
          <Link to={urls.app.ui.motion} className="text-primary hover:underline">
            Motion
          </Link>{' '}
          — <DocsCode>Reveal</DocsCode>, <DocsCode>MotionList</DocsCode>, duration/easing tables
        </li>
      </DocsList>
      <DocsP>
        Prefer barrels <DocsCode>@/components/ui</DocsCode> and{' '}
        <DocsCode>@/components/patterns</DocsCode> for imports. Primitives are Radix + CVA +
        Tailwind v4 (named exports, typed, <DocsCode>displayName</DocsCode> set).
      </DocsP>

      <DocsFooter
        prev={{ to: urls.docs.configurationTheming, label: 'Configuration & theming' }}
        next={{ to: urls.docs.root, label: 'Documentation' }}
      />
    </div>
  );
}
