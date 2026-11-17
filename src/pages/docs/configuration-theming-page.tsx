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

export default function ConfigurationThemingPage() {
  return (
    <div>
      <DocsTitle>Configuration &amp; theming</DocsTitle>
      <DocsSubtitle>
        White-label defaults and storage keys live in <DocsCode>src/config.ts</DocsCode>. Tokens and
        the Tailwind v4 <DocsCode>@theme</DocsCode> bridge live in CSS; runtime preferences flow
        through React and <DocsCode>localStorage</DocsCode>.
      </DocsSubtitle>

      <DocsH2>
        Fork defaults in <DocsCode>src/config.ts</DocsCode>
      </DocsH2>
      <DocsP>
        Use this file as the single place to tune product name (<DocsCode>APP_TITLE</DocsCode>),
        default primary/accent HSL, UI scale steps (<DocsCode>UI_SCALE_STEPS</DocsCode>), preset
        palettes (<DocsCode>PRESET_PALETTES</DocsCode>), motion defaults, color mode defaults (
        <DocsCode>DEFAULT_COLOR_MODE</DocsCode>, <DocsCode>COLOR_MODE_STORAGE_KEY</DocsCode>), and
        the preferences blob key (<DocsCode>PREFERENCES_STORAGE_KEY</DocsCode>).{' '}
        <DocsCode>usePreferences</DocsCode> and <DocsCode>ThemeProvider</DocsCode> read these values
        so the Theme Customizer and reset action stay aligned with your fork.
      </DocsP>

      <DocsH2>Environment variables vs code config</DocsH2>
      <DocsP>
        Vite only exposes variables prefixed with <DocsCode>VITE_</DocsCode> (ports, API base URL,
        mock toggles, etc.). Product title, default theme colors, motion defaults, and{' '}
        <DocsCode>localStorage</DocsCode> keys are <strong>not</strong> loaded from{' '}
        <DocsCode>.env</DocsCode> — keep them in <DocsCode>src/config.ts</DocsCode> so forks stay
        easy to grep and ship.
      </DocsP>

      <DocsH2>Design tokens</DocsH2>
      <DocsP>
        Tokens live in <DocsCode>src/styles/globals.css</DocsCode> in two layers:
      </DocsP>
      <DocsList>
        <li>
          <strong>TailTheme brand tokens</strong> — <DocsCode>--color-surface</DocsCode>,{' '}
          <DocsCode>--color-brand</DocsCode>, tone tokens (success/warning/info/danger).
        </li>
        <li>
          <strong>shadcn semantic tokens</strong> — <DocsCode>--color-background</DocsCode>,{' '}
          <DocsCode>--color-primary</DocsCode>, <DocsCode>--color-border</DocsCode>, etc.
        </li>
      </DocsList>
      <DocsH3>Editing tokens</DocsH3>
      <DocsP>
        Adjust the <DocsCode>@theme</DocsCode> block and related <DocsCode>:root</DocsCode> /{' '}
        <DocsCode>.dark</DocsCode> rules. Keep semantic names so shadcn-style components keep
        working.
      </DocsP>

      <DocsH2>Dark / light mode</DocsH2>
      <DocsP>
        Dark mode toggles the <DocsCode>.dark</DocsCode> class on <DocsCode>&lt;html&gt;</DocsCode>.
        <DocsCode>ThemeProvider</DocsCode> handles this and persists the choice. Use{' '}
        <DocsCode>useTheme</DocsCode> in UI code:
      </DocsP>
      <DocsBlock>
        {`import { useTheme } from '@/hooks/use-theme';

const { theme, setTheme, resolvedTheme } = useTheme();
setTheme('dark'); // 'light' | 'dark' | 'system'`}
      </DocsBlock>
      <DocsP>
        On supporting browsers, theme changes may run inside{' '}
        <DocsCode>document.startViewTransition</DocsCode> when reduced motion is off.
      </DocsP>

      <DocsH2>User preferences</DocsH2>
      <DocsP>
        Layout, typography, motion, and brand overrides are stored as JSON under{' '}
        <DocsCode>PREFERENCES_STORAGE_KEY</DocsCode>. Available fields include:
      </DocsP>
      <DocsList>
        <li>
          <DocsCode>layout</DocsCode> — <DocsCode>'sidebar'</DocsCode>
        </li>
        <li>
          <DocsCode>radius</DocsCode> — number in <DocsCode>rem</DocsCode> (0 → 1.5)
        </li>
        <li>
          <DocsCode>fontFamily</DocsCode> — <DocsCode>'inter' | 'outfit' | 'system'</DocsCode>
        </li>
        <li>
          <DocsCode>primaryHsl</DocsCode> / <DocsCode>accentHsl</DocsCode> — HSL triples without the{' '}
          <DocsCode>hsl()</DocsCode> wrapper
        </li>
        <li>
          <DocsCode>uiScale</DocsCode> — percentage on the root font size; steps from{' '}
          <DocsCode>UI_SCALE_STEPS</DocsCode>
        </li>
        <li>
          <DocsCode>rtl</DocsCode> — boolean
        </li>
        <li>
          <DocsCode>sidebarState</DocsCode> —{' '}
          <DocsCode>'expanded' | 'collapsed' | 'offcanvas'</DocsCode>
        </li>
      </DocsList>

      <DocsH2>Defaults, presets &amp; product name</DocsH2>
      <DocsP>
        <DocsCode>DEFAULT_PREFERENCES_VALUES</DocsCode> and <DocsCode>PRESET_PALETTES</DocsCode>{' '}
        define the initial experience and the chips in the customizer — change them when you ship a
        new brand without touching provider code.
      </DocsP>
      <DocsCallout title="Product name">
        <DocsCode>APP_TITLE</DocsCode> drives the visible product name in the shell. Keep it aligned
        with <DocsCode>index.html</DocsCode> if you care about the browser tab title on the landing
        route.
      </DocsCallout>

      <DocsH2>Motion &amp; routing</DocsH2>
      <DocsP>
        Motion primitives under UI Elements use <DocsCode>useMotionPrefs</DocsCode> /{' '}
        <DocsCode>useReducedMotion</DocsCode> as stable shims (no theme toggle). Route enter/exit is
        opt-in per route via <DocsCode>handle.pageTransition</DocsCode> — see{' '}
        <Link
          to={urls.docs.architectureRouting}
          className="font-medium underline underline-offset-2"
        >
          Architecture &amp; routing
        </Link>
        . Theme/light–dark changes still use <DocsCode>document.startViewTransition</DocsCode> when
        the browser supports it and OS reduced-motion allows it.
      </DocsP>
      <DocsCallout title="Explore">
        See motion primitives and token tables on the{' '}
        <Link to={urls.app.ui.motion} className="font-medium underline underline-offset-2">
          Motion
        </Link>{' '}
        page under UI Elements.
      </DocsCallout>

      <DocsH2>Reading &amp; updating preferences</DocsH2>
      <DocsP>
        Use <DocsCode>usePreferences</DocsCode> from <DocsCode>@/hooks</DocsCode>:
      </DocsP>
      <DocsBlock>
        {`import { usePreferences } from '@/hooks';

const { preferences, setPreferences, resetPreferences, toggleSidebar } = usePreferences();
setPreferences({ uiScale: 110 });`}
      </DocsBlock>
      <DocsP>
        Runtime color overrides write HSL values to{' '}
        <DocsCode>document.documentElement.style</DocsCode> so tokens re-theme instantly:
      </DocsP>
      <DocsBlock>
        {`const { setPreferences } = usePreferences();
setPreferences({
  primaryHsl: '262 72% 52%',
  accentHsl:  '330 85% 60%',
});`}
      </DocsBlock>
      <DocsH3>Resetting to defaults</DocsH3>
      <DocsP>
        The customizer exposes a reset that restores <DocsCode>DEFAULT_PREFERENCES</DocsCode> from
        config. Clearing site data also wipes the stored JSON blob.
      </DocsP>

      <DocsH2>Theme customizer</DocsH2>
      <DocsP>
        Drop <DocsCode>ThemeCustomizer</DocsCode> anywhere — side sheet by default, or{' '}
        <DocsCode>inline</DocsCode> inside settings tabs.
      </DocsP>
      <DocsBlock>
        {`import { ThemeCustomizer } from '@/components/patterns';

<ThemeCustomizer />            // default: drawer trigger
<ThemeCustomizer inline />      // embed inside a Card or Tab`}
      </DocsBlock>
      <DocsCallout title="Tip">
        Use the palette icon in the header to open the customizer and preview changes without
        touching code.
      </DocsCallout>

      <DocsFooter
        prev={{ to: urls.docs.gettingStarted, label: 'Getting started' }}
        next={{ to: urls.docs.architectureRouting, label: 'Architecture & routing' }}
      />
    </div>
  );
}
