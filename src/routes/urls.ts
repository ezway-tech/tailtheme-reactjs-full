/**
 * Central URL registry.
 *
 * The shell under `/app` hosts three top-level sections:
 * - `/app/pages/<theme>/*` — themed sample pages (Edu, E-commerce, SaaS, …).
 * - `/app/ui/*` — UI Elements: styling tokens, per-primitive pages, category pages, patterns.
 * - `/app/docs/*` — documentation.
 *
 * Legacy flat aliases (e.g. `urls.app.courses`, `urls.showcase.*`, `urls.docs.*`)
 * resolve to the new canonical URLs so existing call sites keep working until
 * they are migrated in follow-up phases.
 */

const paramId = (id: string | number) => encodeURIComponent(String(id));

const pagesEdu = {
  root: '/app/pages/edu',
  courses: '/app/pages/edu/courses',
  courseDetail: (id: string | number) => `/app/pages/edu/courses/${paramId(id)}`,
  leaderboard: '/app/pages/edu/leaderboard',
  assignments: '/app/pages/edu/assignments',
  assignmentSubmit: (id: string | number) => `/app/pages/edu/assignments/${paramId(id)}/submit`,
  classes: '/app/pages/edu/classes',
  classDetail: (id: string | number) => `/app/pages/edu/classes/${paramId(id)}`,
  certificates: '/app/pages/edu/certificates',
  gradebook: '/app/pages/edu/gradebook',
  instructor: '/app/pages/edu/instructor',
  progress: '/app/pages/edu/progress',
  forum: '/app/pages/edu/forum',
  settings: '/app/pages/edu/settings',
  lessonLink: '/app/pages/edu/lesson-player',
  quizLink: '/app/pages/edu/quiz',
} as const;

const pagesEcommerce = {
  root: '/app/pages/ecommerce',
  storefront: '/app/pages/ecommerce/storefront',
  product: '/app/pages/ecommerce/product',
  cart: '/app/pages/ecommerce/cart',
  checkout: '/app/pages/ecommerce/checkout',
  orderConfirmation: '/app/pages/ecommerce/order-confirmation',
  orders: '/app/pages/ecommerce/orders',
  orderDetail: (id: string | number) => `/app/pages/ecommerce/orders/${paramId(id)}`,
  wishlist: '/app/pages/ecommerce/wishlist',
  categories: '/app/pages/ecommerce/categories',
  search: '/app/pages/ecommerce/search',
  compare: '/app/pages/ecommerce/compare',
  returns: '/app/pages/ecommerce/returns',
  seller: '/app/pages/ecommerce/seller',
  inventory: '/app/pages/ecommerce/inventory',
} as const;

const pagesSaas = {
  root: '/app/pages/saas',
  analytics: '/app/pages/saas/analytics',
  members: '/app/pages/saas/members',
  dataTable: '/app/pages/saas/data-table',
  formWizard: '/app/pages/saas/form-wizard',
  settings: '/app/pages/saas/settings',
  profile: '/app/pages/saas/profile',
  billing: '/app/pages/saas/billing',
  apiKeys: '/app/pages/saas/api-keys',
  auditLog: '/app/pages/saas/audit-log',
  integrations: '/app/pages/saas/integrations',
  security2fa: '/app/pages/saas/security-2fa',
  calendar: '/app/pages/saas/calendar',
  memberDetail: (id: string | number) => `/app/pages/saas/members/${paramId(id)}`,
  webhooks: '/app/pages/saas/webhooks',
  roles: '/app/pages/saas/roles',
  featureFlags: '/app/pages/saas/feature-flags',
  support: '/app/pages/saas/support',
  invoices: '/app/pages/saas/invoices',
} as const;

const pagesMarketing = {
  root: '/app/pages/marketing',
  landing: '/app/pages/marketing/landing',
  pricing: '/app/pages/marketing/pricing',
  about: '/app/pages/marketing/about',
  contact: '/app/pages/marketing/contact',
  blog: '/app/pages/marketing/blog',
  blogPost: (slug: string | number) => `/app/pages/marketing/blog/${paramId(slug)}`,
  faq: '/app/pages/marketing/faq',
  changelog: '/app/pages/marketing/changelog',
  terms: '/app/pages/marketing/terms',
  privacy: '/app/pages/marketing/privacy',
  features: '/app/pages/marketing/features',
  featureDetail: (slug: string) => `/app/pages/marketing/features/${paramId(slug)}`,
  careers: '/app/pages/marketing/careers',
  press: '/app/pages/marketing/press',
} as const;

const pagesSocial = {
  root: '/app/pages/social',
  feed: '/app/pages/social/feed',
  postDetail: (id: string | number) => `/app/pages/social/posts/${paramId(id)}`,
  messages: '/app/pages/social/messages',
  notifications: '/app/pages/social/notifications',
  profile: '/app/pages/social/profile',
  userProfile: (id: string | number) => `/app/pages/social/users/${paramId(id)}`,
  discover: '/app/pages/social/discover',
  groups: '/app/pages/social/groups',
  groupDetail: (id: string | number) => `/app/pages/social/groups/${paramId(id)}`,
  events: '/app/pages/social/events',
  bookmarks: '/app/pages/social/bookmarks',
  settings: '/app/pages/social/settings',
  storyCreate: '/app/pages/social/story/create',
} as const;

const pagesVehicle = {
  root: '/app/pages/vehicle',
  listing: '/app/pages/vehicle/listing',
  detail: '/app/pages/vehicle/detail',
  booking: '/app/pages/vehicle/booking',
  mapSearch: '/app/pages/vehicle/map',
  compare: '/app/pages/vehicle/compare',
  financing: '/app/pages/vehicle/financing',
  hostDashboard: '/app/pages/vehicle/host',
  myBookings: '/app/pages/vehicle/my-bookings',
  reviews: '/app/pages/vehicle/reviews',
  insurance: '/app/pages/vehicle/insurance',
} as const;

const pagesHealth = {
  root: '/app/pages/health',
  appointments: '/app/pages/health/appointments',
  patients: '/app/pages/health/patients',
  patientDetail: (id: string | number) => `/app/pages/health/patients/${paramId(id)}`,
  records: '/app/pages/health/records',
  prescriptions: '/app/pages/health/prescriptions',
  labResults: '/app/pages/health/lab-results',
  telehealth: '/app/pages/health/telehealth',
  intake: '/app/pages/health/intake',
  providers: '/app/pages/health/providers',
  billing: '/app/pages/health/billing',
  waitingRoom: '/app/pages/health/waiting-room',
  patientPortal: '/app/pages/health/portal',
} as const;

const pagesFinance = {
  root: '/app/pages/finance',
  wallet: '/app/pages/finance/wallet',
  transactions: '/app/pages/finance/transactions',
  invoices: '/app/pages/finance/invoices',
  budget: '/app/pages/finance/budget',
  cards: '/app/pages/finance/cards',
  transfer: '/app/pages/finance/transfer',
  savings: '/app/pages/finance/savings',
  investments: '/app/pages/finance/investments',
  taxDocuments: '/app/pages/finance/tax-documents',
  recurring: '/app/pages/finance/recurring',
  dispute: '/app/pages/finance/dispute',
  reports: '/app/pages/finance/reports',
} as const;

const pagesCrm = {
  root: '/app/pages/crm',
  pipeline: '/app/pages/crm/pipeline',
  deals: '/app/pages/crm/deals',
  dealDetail: (id: string | number) => `/app/pages/crm/deals/${paramId(id)}`,
  contacts: '/app/pages/crm/contacts',
  contactDetail: (id: string | number) => `/app/pages/crm/contacts/${paramId(id)}`,
  companies: '/app/pages/crm/companies',
  companyDetail: (id: string | number) => `/app/pages/crm/companies/${paramId(id)}`,
  activities: '/app/pages/crm/activities',
  quotes: '/app/pages/crm/quotes',
  reports: '/app/pages/crm/reports',
  segments: '/app/pages/crm/segments',
} as const;

const pagesProject = {
  root: '/app/pages/project',
  kanban: '/app/pages/project/kanban',
  projects: '/app/pages/project/projects',
  projectDetail: (id: string | number) => `/app/pages/project/projects/${paramId(id)}`,
  tasks: '/app/pages/project/tasks',
  gantt: '/app/pages/project/gantt',
  roadmap: '/app/pages/project/roadmap',
  sprint: '/app/pages/project/sprint',
  files: '/app/pages/project/files',
  timeTracking: '/app/pages/project/time-tracking',
  workload: '/app/pages/project/workload',
  reports: '/app/pages/project/reports',
  settings: '/app/pages/project/settings',
} as const;

const pagesAuthErrors = {
  root: '/app/pages/auth-errors',
  login: '/app/pages/auth-errors/login',
  register: '/app/pages/auth-errors/register',
  forgot: '/app/pages/auth-errors/forgot',
  loginSplit: '/app/pages/auth-errors/login-split',
  registerSplit: '/app/pages/auth-errors/register-split',
  notFound: '/app/pages/auth-errors/404',
  serverError: '/app/pages/auth-errors/500',
  forbidden: '/app/pages/auth-errors/403',
} as const;

const uiComponents = {
  root: '/app/ui/components',
  button: '/app/ui/components/button',
  input: '/app/ui/components/input',
  form: '/app/ui/components/form',
  select: '/app/ui/components/select',
  dialog: '/app/ui/components/dialog',
  table: '/app/ui/components/table',
  card: '/app/ui/components/card',
  badge: '/app/ui/components/badge',
  tabs: '/app/ui/components/tabs',
  toast: '/app/ui/components/toast',
  tooltip: '/app/ui/components/tooltip',
  dropdownMenu: '/app/ui/components/dropdown-menu',
  datePicker: '/app/ui/components/date-picker',
  pagination: '/app/ui/components/pagination',
  skeleton: '/app/ui/components/skeleton',
  emptyState: '/app/ui/components/empty-state',
  pinInput: '/app/ui/components/pin-input',
  fileUpload: '/app/ui/components/file-upload',
  statCard: '/app/ui/components/stat-card',
  icons: '/app/ui/components/icons',
  charts: '/app/ui/components/charts',
  media: '/app/ui/components/media',
  richInputs: '/app/ui/components/rich-inputs',
} as const;

/**
 * Example/showcase pages mounted under `/app/ui/examples/*`.
 *
 * These cover composed primitive groups (Inputs, Overlays, …), high-level
 * Patterns (PageHeader/EmptyState/…) and Animations (formerly "Motion").
 */
const uiExamples = {
  root: '/app/ui/examples',
  inputs: '/app/ui/examples/inputs',
  overlays: '/app/ui/examples/overlays',
  navigation: '/app/ui/examples/navigation',
  data: '/app/ui/examples/data-display',
  feedback: '/app/ui/examples/feedback',
  layout: '/app/ui/examples/layout',
  patterns: '/app/ui/examples/patterns',
  animations: '/app/ui/examples/animations',
  pageTransitions: '/app/ui/examples/page-transitions',
  marketingBlocks: '/app/ui/examples/marketing-blocks',
  /**
   * @deprecated Use `pageTransitions` — same path kept temporarily for older links.
   */
  routeTransitions: '/app/ui/examples/page-transitions',
} as const;

/**
 * Legacy `/app/ui/category/*` shape, retained as alias so existing callers
 * (`urls.app.ui.category.inputs` etc.) keep resolving to the new
 * `/app/ui/examples/*` URLs without change.
 */
const uiCategoryLegacy = {
  root: uiExamples.root,
  inputs: uiExamples.inputs,
  overlays: uiExamples.overlays,
  navigation: uiExamples.navigation,
  data: uiExamples.data,
  feedback: uiExamples.feedback,
  layout: uiExamples.layout,
} as const;

/**
 * Styling tokens reference under `/app/ui/tokens/*`.
 *
 * `root` keeps backward compatibility — callers can pass `urls.app.ui.tokens`
 * directly to `<Link>` / `<Navigate>` if they accept a string, or use
 * `urls.app.ui.tokens.root` explicitly. Each sub-page is a focused reference
 * (Colors, Typography, Spacing, Radius, Shadow, Breakpoints).
 */
const uiTokens = {
  root: '/app/ui/tokens',
  colors: '/app/ui/tokens/colors',
  presets: '/app/ui/tokens/presets',
  typography: '/app/ui/tokens/typography',
  spacing: '/app/ui/tokens/spacing',
  radius: '/app/ui/tokens/radius',
  shadow: '/app/ui/tokens/shadow',
  breakpoints: '/app/ui/tokens/breakpoints',
} as const;

const ui = {
  root: '/app/ui',
  tokens: uiTokens,
  components: uiComponents,
  examples: uiExamples,

  // ---- Legacy aliases (do not remove without migrating call sites) ----
  /** @deprecated Use `urls.app.ui.examples.patterns` instead. */
  patterns: uiExamples.patterns,
  /** @deprecated Use `urls.app.ui.examples.animations` instead. */
  motion: uiExamples.animations,
  /** @deprecated Use `urls.app.ui.examples` instead. */
  category: uiCategoryLegacy,
} as const;

const docs = {
  root: '/app/docs',
  gettingStarted: '/app/docs/getting-started',
  configurationTheming: '/app/docs/configuration-theming',
  architectureRouting: '/app/docs/architecture-routing',
} as const;

/** Domain dashboards under `/app/dashboards/*` (flagship overview stays `/app/dashboard`). */
const dashboards = {
  root: '/app/dashboards',
  overview: '/app/dashboard',
  edu: '/app/dashboards/edu',
  ecommerce: '/app/dashboards/ecommerce',
  saas: '/app/dashboards/saas',
  finance: '/app/dashboards/finance',
  project: '/app/dashboards/project',
  health: '/app/dashboards/health',
  social: '/app/dashboards/social',
  marketing: '/app/dashboards/marketing',
  vehicle: '/app/dashboards/vehicle',
  crm: '/app/dashboards/crm',
} as const;

export const urls = {
  landing: '/landing',

  app: {
    root: '/app',
    dashboard: '/app/dashboard',
    dashboards,

    /** Minimal starter surfaces (also used by Lite / create:project exports). */
    starter: {
      home: '/app/starter',
      form: '/app/starter/form',
    },

    pages: {
      root: '/app/pages',
      edu: pagesEdu,
      ecommerce: pagesEcommerce,
      saas: pagesSaas,
      marketing: pagesMarketing,
      social: pagesSocial,
      vehicle: pagesVehicle,
      health: pagesHealth,
      finance: pagesFinance,
      crm: pagesCrm,
      project: pagesProject,
      authErrors: pagesAuthErrors,
    },

    ui,
    docs,

    // ---- Legacy flat aliases (kept for backward compatibility) ----
    settings: pagesSaas.settings,
    profile: pagesSaas.profile,
    pricing: pagesMarketing.pricing,
    dataTable: pagesSaas.dataTable,
    formWizard: pagesSaas.formWizard,
    notifications: pagesSocial.notifications,
    courses: pagesEdu.courses,
    courseDetail: pagesEdu.courseDetail,
    leaderboard: pagesEdu.leaderboard,
    icons: uiComponents.icons,
    charts: uiComponents.charts,
  },

  auth: {
    root: '/auth',
    login: '/auth/login',
    register: '/auth/register',
    forgot: '/auth/forgot',
    resetPassword: '/auth/reset-password',
    verifyEmail: '/auth/verify-email',
    twoFactor: '/auth/two-factor',
    acceptInvite: '/auth/accept-invite',
    accountLocked: '/auth/account-locked',
    magicLinkSent: '/auth/magic-link-sent',
    sso: '/auth/sso',
    sessionExpired: '/auth/session-expired',
    loginSplit: '/auth/login-split',
    registerSplit: '/auth/register-split',
  },

  onboarding: {
    root: '/onboarding',
  },

  learn: {
    root: '/learn',
    lesson: (id: string | number) => `/learn/lessons/${paramId(id)}`,
    quiz: (id: string | number) => `/learn/quiz/${paramId(id)}`,
    live: (id: string | number) => `/learn/live/${paramId(id)}`,
  },

  // ---- Legacy top-level aliases (re-mapped to the new canonical URLs) ----
  showcase: {
    root: ui.root,
    components: ui.components.root,
    tokens: ui.tokens.root,
    patterns: uiExamples.patterns,
  },
  docs,

  errors: {
    notFound: '/error/404',
    server: '/error/500',
    forbidden: '/error/403',
    maintenance: '/error/maintenance',
  },
} as const;
