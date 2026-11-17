import { lazy, Suspense } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { AppShell, AuthLayout, FullscreenLayout, RootLayout } from '@/layouts';
import LoadingSplashPage from '@/pages/loading-splash-page';
import { urls } from '@/routes/urls';

/* ---------- Core app pages (existing) ---------- */
const DashboardPage = lazy(() => import('@/pages/dashboard/dashboard-page'));
const StarterHomePage = lazy(() => import('@/pages/starter/home-page'));
const StarterFormExamplePage = lazy(() => import('@/pages/starter/form-example-page'));
const EduDashboardPage = lazy(() => import('@/pages/dashboards/edu-dashboard-page'));
const EcommerceDashboardPage = lazy(() => import('@/pages/dashboards/ecommerce-dashboard-page'));
const SaasDashboardPage = lazy(() => import('@/pages/dashboards/saas-dashboard-page'));
const FinanceDashboardPage = lazy(() => import('@/pages/dashboards/finance-dashboard-page'));
const ProjectDashboardPage = lazy(() => import('@/pages/dashboards/project-dashboard-page'));
const HealthDashboardPage = lazy(() => import('@/pages/dashboards/health-dashboard-page'));
const SocialDashboardPage = lazy(() => import('@/pages/dashboards/social-dashboard-page'));
const MarketingDashboardPage = lazy(() => import('@/pages/dashboards/marketing-dashboard-page'));
const VehicleDashboardPage = lazy(() => import('@/pages/dashboards/vehicle-dashboard-page'));
const CrmDashboardPage = lazy(() => import('@/pages/dashboards/crm-dashboard-page'));
const SettingsPage = lazy(() => import('@/pages/settings/settings-page'));
const ProfilePage = lazy(() => import('@/pages/profile/profile-page'));
const PricingPage = lazy(() => import('@/pages/pricing/pricing-page'));
const DataTablePage = lazy(() => import('@/pages/data-table/data-table-page'));
const FormWizardPage = lazy(() => import('@/pages/form-wizard/form-wizard-page'));
const CoursesPage = lazy(() => import('@/pages/courses/courses-page'));
const CourseDetailPage = lazy(() => import('@/pages/courses/course-detail-page'));
const LeaderboardPage = lazy(() => import('@/pages/leaderboard/leaderboard-page'));

/* ---------- Auth + fullscreen + errors (existing, unchanged layouts) ---------- */
const LoginPage = lazy(() => import('@/pages/auth/login-page'));
const RegisterPage = lazy(() => import('@/pages/auth/register-page'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgot-password-page'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/reset-password-page'));
const VerifyEmailPage = lazy(() => import('@/pages/auth/verify-email-page'));
const TwoFactorPage = lazy(() => import('@/pages/auth/two-factor-page'));
const AcceptInvitePage = lazy(() => import('@/pages/auth/accept-invite-page'));
const AccountLockedPage = lazy(() => import('@/pages/auth/account-locked-page'));
const MagicLinkSentPage = lazy(() => import('@/pages/auth/magic-link-sent-page'));
const SsoPickerPage = lazy(() => import('@/pages/auth/sso-picker-page'));
const SessionExpiredPage = lazy(() => import('@/pages/auth/session-expired-page'));
const LoginSplitPage = lazy(() => import('@/pages/auth/login-split-page'));
const RegisterSplitPage = lazy(() => import('@/pages/auth/register-split-page'));
const OnboardingPage = lazy(() => import('@/pages/onboarding/onboarding-page'));

const LessonPlayerPage = lazy(() => import('@/pages/learn/lesson-player-page'));
const QuizPage = lazy(() => import('@/pages/learn/quiz-page'));
const LiveSessionPage = lazy(() => import('@/pages/learn/live-session-page'));

const LandingPage = lazy(() => import('@/pages/landing/landing-page'));

const NotFoundPage = lazy(() => import('@/pages/errors/not-found-page'));
const ServerErrorPage = lazy(() => import('@/pages/errors/server-error-page'));
const ForbiddenPage = lazy(() => import('@/pages/errors/forbidden-page'));
const MaintenancePage = lazy(() => import('@/pages/errors/maintenance-page'));

/* ---------- Docs (existing pages, now mounted under /app/docs) ---------- */
const DocsHomePage = lazy(() => import('@/pages/docs/docs-home-page'));
const GettingStartedPage = lazy(() => import('@/pages/docs/getting-started-page'));
const ConfigurationThemingPage = lazy(() => import('@/pages/docs/configuration-theming-page'));
const ArchitectureRoutingPage = lazy(() => import('@/pages/docs/architecture-routing-page'));

/* ---------- UI Elements: tokens, patterns, per-primitive, category ---------- */
const TokensPage = lazy(() => import('@/pages/ui/tokens-page'));
const TokensColorsPage = lazy(() => import('@/pages/ui/tokens/colors-page'));
const TokensPresetsPage = lazy(() => import('@/pages/ui/tokens/presets-page'));
const TokensTypographyPage = lazy(() => import('@/pages/ui/tokens/typography-page'));
const TokensSpacingPage = lazy(() => import('@/pages/ui/tokens/spacing-page'));
const TokensRadiusPage = lazy(() => import('@/pages/ui/tokens/radius-page'));
const TokensShadowPage = lazy(() => import('@/pages/ui/tokens/shadow-page'));
const TokensBreakpointsPage = lazy(() => import('@/pages/ui/tokens/breakpoints-page'));
const PatternsPage = lazy(() => import('@/pages/ui/patterns-page'));
const PageTransitionsShowcasePage = lazy(
  () => import('@/pages/ui/examples/page-transitions-showcase-page'),
);
const MarketingBlocksPage = lazy(() => import('@/pages/ui/examples/marketing-blocks-page'));
const MotionPage = lazy(() => import('@/pages/ui/motion-page'));

const ButtonPage = lazy(() => import('@/pages/ui/components/button-page'));
const InputPage = lazy(() => import('@/pages/ui/components/input-page'));
const FormPage = lazy(() => import('@/pages/ui/components/form-page'));
const SelectPage = lazy(() => import('@/pages/ui/components/select-page'));
const DialogPage = lazy(() => import('@/pages/ui/components/dialog-page'));
const UiTablePage = lazy(() => import('@/pages/ui/components/table-page'));
const CardPage = lazy(() => import('@/pages/ui/components/card-page'));
const BadgePage = lazy(() => import('@/pages/ui/components/badge-page'));
const TabsPage = lazy(() => import('@/pages/ui/components/tabs-page'));
const ToastPage = lazy(() => import('@/pages/ui/components/toast-page'));
const TooltipPage = lazy(() => import('@/pages/ui/components/tooltip-page'));
const DropdownMenuPage = lazy(() => import('@/pages/ui/components/dropdown-menu-page'));
const DatePickerPage = lazy(() => import('@/pages/ui/components/date-picker-page'));
const PaginationPage = lazy(() => import('@/pages/ui/components/pagination-page'));
const SkeletonPage = lazy(() => import('@/pages/ui/components/skeleton-page'));
const EmptyStatePage = lazy(() => import('@/pages/ui/components/empty-state-page'));
const PinInputPage = lazy(() => import('@/pages/ui/components/pin-input-page'));
const FileUploadPage = lazy(() => import('@/pages/ui/components/file-upload-page'));
const StatCardPage = lazy(() => import('@/pages/ui/components/stat-card-page'));
const UiIconsPage = lazy(() => import('@/pages/ui/components/icons-page'));
const UiChartsPage = lazy(() => import('@/pages/ui/components/charts-page'));
const MediaPage = lazy(() => import('@/pages/ui/components/media-page'));
const RichInputsPage = lazy(() => import('@/pages/ui/components/rich-inputs-page'));

const InputsCategoryPage = lazy(() => import('@/pages/ui/category/inputs-category-page'));
const OverlaysCategoryPage = lazy(() => import('@/pages/ui/category/overlays-category-page'));
const NavigationCategoryPage = lazy(() => import('@/pages/ui/category/navigation-category-page'));
const DataCategoryPage = lazy(() => import('@/pages/ui/category/data-category-page'));
const FeedbackCategoryPage = lazy(() => import('@/pages/ui/category/feedback-category-page'));
const LayoutCategoryPage = lazy(() => import('@/pages/ui/category/layout-category-page'));

/* ---------- Themed PAGES ---------- */
// Edu
const AssignmentsPage = lazy(() => import('@/pages/pages/edu/assignments-page'));
const ClassesPage = lazy(() => import('@/pages/pages/edu/classes-page'));
const LessonLinkPage = lazy(() => import('@/pages/pages/edu/lesson-link-page'));
const QuizLinkPage = lazy(() => import('@/pages/pages/edu/quiz-link-page'));
const AssignmentSubmitPage = lazy(() => import('@/pages/pages/edu/assignment-submit-page'));
const ClassDetailPage = lazy(() => import('@/pages/pages/edu/class-detail-page'));
const CertificatesPage = lazy(() => import('@/pages/pages/edu/certificates-page'));
const GradebookPage = lazy(() => import('@/pages/pages/edu/gradebook-page'));
const InstructorDashboardPage = lazy(() => import('@/pages/pages/edu/instructor-dashboard-page'));
const StudentProgressPage = lazy(() => import('@/pages/pages/edu/student-progress-page'));
const DiscussionForumPage = lazy(() => import('@/pages/pages/edu/discussion-forum-page'));
const EduSettingsPage = lazy(() => import('@/pages/pages/edu/edu-settings-page'));

// E-commerce
const StorefrontPage = lazy(() => import('@/pages/pages/ecommerce/storefront-page'));
const ProductDetailPage = lazy(() => import('@/pages/pages/ecommerce/product-detail-page'));
const CartPage = lazy(() => import('@/pages/pages/ecommerce/cart-page'));
const CheckoutPage = lazy(() => import('@/pages/pages/ecommerce/checkout-page'));
const OrdersListPage = lazy(() => import('@/pages/pages/ecommerce/orders-list-page'));
const OrderDetailPage = lazy(() => import('@/pages/pages/ecommerce/order-detail-page'));
const OrderConfirmationPage = lazy(() => import('@/pages/pages/ecommerce/order-confirmation-page'));
const WishlistPage = lazy(() => import('@/pages/pages/ecommerce/wishlist-page'));
const CategoryHubPage = lazy(() => import('@/pages/pages/ecommerce/category-hub-page'));
const SearchResultsPage = lazy(() => import('@/pages/pages/ecommerce/search-results-page'));
const CompareProductsPage = lazy(() => import('@/pages/pages/ecommerce/compare-products-page'));
const ReturnsPage = lazy(() => import('@/pages/pages/ecommerce/returns-page'));
const SellerDashboardPage = lazy(() => import('@/pages/pages/ecommerce/seller-dashboard-page'));
const InventoryAdminPage = lazy(() => import('@/pages/pages/ecommerce/inventory-admin-page'));

// SaaS (new)
const AnalyticsPage = lazy(() => import('@/pages/pages/saas/analytics-page'));
const MembersPage = lazy(() => import('@/pages/pages/saas/members-page'));
const BillingPage = lazy(() => import('@/pages/pages/saas/billing-page'));
const ApiKeysPage = lazy(() => import('@/pages/pages/saas/api-keys-page'));
const AuditLogPage = lazy(() => import('@/pages/pages/saas/audit-log-page'));
const IntegrationsPage = lazy(() => import('@/pages/pages/saas/integrations-page'));
const Security2faPage = lazy(() => import('@/pages/pages/saas/security-2fa-page'));
const SaasCalendarPage = lazy(() => import('@/pages/pages/saas/calendar-page'));
const MemberDetailPage = lazy(() => import('@/pages/pages/saas/member-detail-page'));
const WebhooksPage = lazy(() => import('@/pages/pages/saas/webhooks-page'));
const RolesPermissionsPage = lazy(() => import('@/pages/pages/saas/roles-permissions-page'));
const FeatureFlagsPage = lazy(() => import('@/pages/pages/saas/feature-flags-page'));
const SupportTicketsPage = lazy(() => import('@/pages/pages/saas/support-tickets-page'));
const SaasInvoicesPage = lazy(() => import('@/pages/pages/saas/invoices-page'));

// Marketing (new)
const AboutPage = lazy(() => import('@/pages/pages/marketing/about-page'));
const ContactPage = lazy(() => import('@/pages/pages/marketing/contact-page'));
const BlogListPage = lazy(() => import('@/pages/pages/marketing/blog-list-page'));
const BlogPostPage = lazy(() => import('@/pages/pages/marketing/blog-post-page'));
const FaqPage = lazy(() => import('@/pages/pages/marketing/faq-page'));
const ChangelogPage = lazy(() => import('@/pages/pages/marketing/changelog-page'));
const LegalTermsPage = lazy(() => import('@/pages/pages/marketing/legal-terms-page'));
const LegalPrivacyPage = lazy(() => import('@/pages/pages/marketing/legal-privacy-page'));
const FeaturesIndexPage = lazy(() => import('@/pages/pages/marketing/features-index-page'));
const FeatureDetailPage = lazy(() => import('@/pages/pages/marketing/feature-detail-page'));
const CareersPage = lazy(() => import('@/pages/pages/marketing/careers-page'));
const PressMediaKitPage = lazy(() => import('@/pages/pages/marketing/press-media-kit-page'));

// Social
const FeedPage = lazy(() => import('@/pages/pages/social/feed-page'));
const MessagesPage = lazy(() => import('@/pages/pages/social/messages-page'));
const NotificationsCenterPage = lazy(
  () => import('@/pages/pages/social/notifications-center-page'),
);
const SocialProfilePage = lazy(() => import('@/pages/pages/social/social-profile-page'));
const PostDetailPage = lazy(() => import('@/pages/pages/social/post-detail-page'));
const UserProfilePage = lazy(() => import('@/pages/pages/social/user-profile-page'));
const DiscoverPage = lazy(() => import('@/pages/pages/social/discover-page'));
const GroupsPage = lazy(() => import('@/pages/pages/social/groups-page'));
const GroupDetailPage = lazy(() => import('@/pages/pages/social/group-detail-page'));
const SocialEventsPage = lazy(() => import('@/pages/pages/social/events-page'));
const BookmarksPage = lazy(() => import('@/pages/pages/social/bookmarks-page'));
const SocialSettingsPage = lazy(() => import('@/pages/pages/social/social-settings-page'));
const StoryCreatePage = lazy(() => import('@/pages/pages/social/story-create-page'));

// Vehicle
const VehicleListingPage = lazy(() => import('@/pages/pages/vehicle/vehicle-listing-page'));
const VehicleDetailPage = lazy(() => import('@/pages/pages/vehicle/vehicle-detail-page'));
const VehicleBookingPage = lazy(() => import('@/pages/pages/vehicle/vehicle-booking-page'));
const MapSearchPage = lazy(() => import('@/pages/pages/vehicle/map-search-page'));
const CompareVehiclesPage = lazy(() => import('@/pages/pages/vehicle/compare-vehicles-page'));
const FinancingCalculatorPage = lazy(
  () => import('@/pages/pages/vehicle/financing-calculator-page'),
);
const HostDashboardPage = lazy(() => import('@/pages/pages/vehicle/host-dashboard-page'));
const MyBookingsPage = lazy(() => import('@/pages/pages/vehicle/my-bookings-page'));
const VehicleReviewsPage = lazy(() => import('@/pages/pages/vehicle/vehicle-reviews-page'));
const InsuranceAddonPage = lazy(() => import('@/pages/pages/vehicle/insurance-addon-page'));

// Health
const AppointmentsPage = lazy(() => import('@/pages/pages/health/appointments-page'));
const PatientsListPage = lazy(() => import('@/pages/pages/health/patients-list-page'));
const PatientDetailPage = lazy(() => import('@/pages/pages/health/patient-detail-page'));
const MedicalRecordsPage = lazy(() => import('@/pages/pages/health/medical-records-page'));
const PrescriptionsPage = lazy(() => import('@/pages/pages/health/prescriptions-page'));
const LabResultsPage = lazy(() => import('@/pages/pages/health/lab-results-page'));
const TelehealthPage = lazy(() => import('@/pages/pages/health/telehealth-page'));
const IntakeWizardPage = lazy(() => import('@/pages/pages/health/intake-wizard-page'));
const ProviderDirectoryPage = lazy(() => import('@/pages/pages/health/provider-directory-page'));
const HealthBillingPage = lazy(() => import('@/pages/pages/health/health-billing-page'));
const WaitingRoomPage = lazy(() => import('@/pages/pages/health/waiting-room-page'));
const PatientPortalPage = lazy(() => import('@/pages/pages/health/patient-portal-page'));

// Finance
const WalletPage = lazy(() => import('@/pages/pages/finance/wallet-page'));
const TransactionsPage = lazy(() => import('@/pages/pages/finance/transactions-page'));
const InvoicesPage = lazy(() => import('@/pages/pages/finance/invoices-page'));
const BudgetPage = lazy(() => import('@/pages/pages/finance/budget-page'));
const FinanceCardsPage = lazy(() => import('@/pages/pages/finance/cards-page'));
const TransferPage = lazy(() => import('@/pages/pages/finance/transfer-page'));
const SavingsGoalsPage = lazy(() => import('@/pages/pages/finance/savings-goals-page'));
const InvestmentsPage = lazy(() => import('@/pages/pages/finance/investments-page'));
const TaxDocumentsPage = lazy(() => import('@/pages/pages/finance/tax-documents-page'));
const RecurringPaymentsPage = lazy(() => import('@/pages/pages/finance/recurring-payments-page'));
const DisputePage = lazy(() => import('@/pages/pages/finance/dispute-page'));
const FinancialReportsPage = lazy(() => import('@/pages/pages/finance/financial-reports-page'));

// CRM
const PipelinePage = lazy(() => import('@/pages/pages/crm/pipeline-page'));
const DealsPage = lazy(() => import('@/pages/pages/crm/deals-page'));
const DealDetailPage = lazy(() => import('@/pages/pages/crm/deal-detail-page'));
const CrmContactsPage = lazy(() => import('@/pages/pages/crm/contacts-page'));
const ContactDetailPage = lazy(() => import('@/pages/pages/crm/contact-detail-page'));
const CrmCompaniesPage = lazy(() => import('@/pages/pages/crm/companies-page'));
const CompanyDetailPage = lazy(() => import('@/pages/pages/crm/company-detail-page'));
const CrmActivitiesPage = lazy(() => import('@/pages/pages/crm/activities-page'));
const CrmQuotesPage = lazy(() => import('@/pages/pages/crm/quotes-page'));
const CrmReportsPage = lazy(() => import('@/pages/pages/crm/crm-reports-page'));
const CrmSegmentsPage = lazy(() => import('@/pages/pages/crm/segments-page'));

// Project
const KanbanPage = lazy(() => import('@/pages/pages/project/kanban-page'));
const ProjectsListPage = lazy(() => import('@/pages/pages/project/projects-list-page'));
const ProjectDetailPage = lazy(() => import('@/pages/pages/project/project-detail-page'));
const TasksCalendarPage = lazy(() => import('@/pages/pages/project/tasks-calendar-page'));
const GanttPage = lazy(() => import('@/pages/pages/project/gantt-page'));
const RoadmapPage = lazy(() => import('@/pages/pages/project/roadmap-page'));
const SprintPlanningPage = lazy(() => import('@/pages/pages/project/sprint-planning-page'));
const ProjectFilesPage = lazy(() => import('@/pages/pages/project/project-files-page'));
const TimeTrackingPage = lazy(() => import('@/pages/pages/project/time-tracking-page'));
const TeamWorkloadPage = lazy(() => import('@/pages/pages/project/team-workload-page'));
const ProjectReportsPage = lazy(() => import('@/pages/pages/project/project-reports-page'));
const ProjectSettingsPage = lazy(() => import('@/pages/pages/project/project-settings-page'));

// Auth & Errors (link wrappers)
const AuthLinksPage = lazy(() => import('@/pages/pages/auth-errors/auth-links-page'));
const ErrorLinksPage = lazy(() => import('@/pages/pages/auth-errors/error-links-page'));

function withSuspense(node: React.ReactNode): React.ReactNode {
  return <Suspense fallback={<LoadingSplashPage />}>{node}</Suspense>;
}

export const appRouteObjects: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Navigate to={urls.app.dashboard} replace /> },

      { path: urls.landing, element: withSuspense(<LandingPage />) },

      /* ------------------- MAIN APP SHELL ------------------- */
      {
        path: urls.app.root,
        element: <AppShell />,
        handle: { breadcrumb: 'App' },
        children: [
          { index: true, element: <Navigate to={urls.app.dashboard} replace /> },
          {
            path: 'dashboard',
            element: withSuspense(<DashboardPage />),
            handle: { breadcrumb: 'Dashboard' },
          },
          {
            path: 'starter',
            handle: { breadcrumb: 'Starter' },
            children: [
              {
                index: true,
                element: withSuspense(<StarterHomePage />),
                handle: { breadcrumb: 'Home' },
              },
              {
                path: 'form',
                element: withSuspense(<StarterFormExamplePage />),
                handle: { breadcrumb: 'Form example' },
              },
            ],
          },

          {
            path: 'dashboards',
            handle: { breadcrumb: 'Dashboards' },
            children: [
              { index: true, element: <Navigate to={urls.app.dashboard} replace /> },
              {
                path: 'edu',
                element: withSuspense(<EduDashboardPage />),
                handle: { breadcrumb: 'Edu dashboard' },
              },
              {
                path: 'ecommerce',
                element: withSuspense(<EcommerceDashboardPage />),
                handle: { breadcrumb: 'E-commerce dashboard' },
              },
              {
                path: 'saas',
                element: withSuspense(<SaasDashboardPage />),
                handle: { breadcrumb: 'SaaS dashboard' },
              },
              {
                path: 'finance',
                element: withSuspense(<FinanceDashboardPage />),
                handle: { breadcrumb: 'Finance dashboard' },
              },
              {
                path: 'project',
                element: withSuspense(<ProjectDashboardPage />),
                handle: { breadcrumb: 'Project dashboard' },
              },
              {
                path: 'health',
                element: withSuspense(<HealthDashboardPage />),
                handle: { breadcrumb: 'Healthcare dashboard' },
              },
              {
                path: 'social',
                element: withSuspense(<SocialDashboardPage />),
                handle: { breadcrumb: 'Social dashboard' },
              },
              {
                path: 'marketing',
                element: withSuspense(<MarketingDashboardPage />),
                handle: { breadcrumb: 'Marketing dashboard' },
              },
              {
                path: 'vehicle',
                element: withSuspense(<VehicleDashboardPage />),
                handle: { breadcrumb: 'Vehicle dashboard' },
              },
              {
                path: 'crm',
                element: withSuspense(<CrmDashboardPage />),
                handle: { breadcrumb: 'CRM dashboard' },
              },
            ],
          },

          /* ----- PAGES / <theme>/... ----- */
          {
            path: 'pages',
            handle: { breadcrumb: 'Pages' },
            children: [
              { index: true, element: <Navigate to={urls.app.pages.edu.courses} replace /> },

              // Edu
              {
                path: 'edu',
                handle: { breadcrumb: 'Edu' },
                children: [
                  { index: true, element: <Navigate to={urls.app.pages.edu.courses} replace /> },
                  {
                    path: 'courses',
                    handle: { breadcrumb: 'Courses' },
                    children: [
                      { index: true, element: withSuspense(<CoursesPage />) },
                      {
                        path: ':id',
                        element: withSuspense(<CourseDetailPage />),
                        handle: { breadcrumb: 'Course' },
                      },
                    ],
                  },
                  {
                    path: 'leaderboard',
                    element: withSuspense(<LeaderboardPage />),
                    handle: { breadcrumb: 'Leaderboard' },
                  },
                  {
                    path: 'assignments',
                    handle: { breadcrumb: 'Assignments' },
                    children: [
                      { index: true, element: withSuspense(<AssignmentsPage />) },
                      {
                        path: ':id/submit',
                        element: withSuspense(<AssignmentSubmitPage />),
                        handle: { breadcrumb: 'Submit' },
                      },
                    ],
                  },
                  {
                    path: 'classes',
                    handle: { breadcrumb: 'Classes' },
                    children: [
                      { index: true, element: withSuspense(<ClassesPage />) },
                      {
                        path: ':id',
                        element: withSuspense(<ClassDetailPage />),
                        handle: { breadcrumb: 'Class' },
                      },
                    ],
                  },
                  {
                    path: 'certificates',
                    element: withSuspense(<CertificatesPage />),
                    handle: { breadcrumb: 'Certificates' },
                  },
                  {
                    path: 'gradebook',
                    element: withSuspense(<GradebookPage />),
                    handle: { breadcrumb: 'Gradebook' },
                  },
                  {
                    path: 'instructor',
                    element: withSuspense(<InstructorDashboardPage />),
                    handle: { breadcrumb: 'Instructor' },
                  },
                  {
                    path: 'progress',
                    element: withSuspense(<StudentProgressPage />),
                    handle: { breadcrumb: 'My progress' },
                  },
                  {
                    path: 'forum',
                    element: withSuspense(<DiscussionForumPage />),
                    handle: { breadcrumb: 'Forum' },
                  },
                  {
                    path: 'settings',
                    element: withSuspense(<EduSettingsPage />),
                    handle: { breadcrumb: 'Learning settings' },
                  },
                  {
                    path: 'lesson-player',
                    element: withSuspense(<LessonLinkPage />),
                    handle: { breadcrumb: 'Lesson player' },
                  },
                  {
                    path: 'quiz',
                    element: withSuspense(<QuizLinkPage />),
                    handle: { breadcrumb: 'Quiz' },
                  },
                ],
              },

              // E-commerce
              {
                path: 'ecommerce',
                handle: { breadcrumb: 'E-commerce' },
                children: [
                  {
                    index: true,
                    element: <Navigate to={urls.app.pages.ecommerce.storefront} replace />,
                  },
                  {
                    path: 'storefront',
                    element: withSuspense(<StorefrontPage />),
                    handle: { breadcrumb: 'Storefront' },
                  },
                  {
                    path: 'product',
                    element: withSuspense(<ProductDetailPage />),
                    handle: { breadcrumb: 'Product' },
                  },
                  {
                    path: 'cart',
                    element: withSuspense(<CartPage />),
                    handle: { breadcrumb: 'Cart' },
                  },
                  {
                    path: 'checkout',
                    element: withSuspense(<CheckoutPage />),
                    handle: { breadcrumb: 'Checkout' },
                  },
                  {
                    path: 'order-confirmation',
                    element: withSuspense(<OrderConfirmationPage />),
                    handle: { breadcrumb: 'Order confirmed' },
                  },
                  {
                    path: 'wishlist',
                    element: withSuspense(<WishlistPage />),
                    handle: { breadcrumb: 'Wishlist' },
                  },
                  {
                    path: 'categories',
                    element: withSuspense(<CategoryHubPage />),
                    handle: { breadcrumb: 'Categories' },
                  },
                  {
                    path: 'search',
                    element: withSuspense(<SearchResultsPage />),
                    handle: { breadcrumb: 'Search' },
                  },
                  {
                    path: 'compare',
                    element: withSuspense(<CompareProductsPage />),
                    handle: { breadcrumb: 'Compare' },
                  },
                  {
                    path: 'returns',
                    element: withSuspense(<ReturnsPage />),
                    handle: { breadcrumb: 'Returns' },
                  },
                  {
                    path: 'seller',
                    element: withSuspense(<SellerDashboardPage />),
                    handle: { breadcrumb: 'Seller dashboard' },
                  },
                  {
                    path: 'inventory',
                    element: withSuspense(<InventoryAdminPage />),
                    handle: { breadcrumb: 'Inventory' },
                  },
                  {
                    path: 'orders',
                    handle: { breadcrumb: 'Orders' },
                    children: [
                      { index: true, element: withSuspense(<OrdersListPage />) },
                      {
                        path: ':id',
                        element: withSuspense(<OrderDetailPage />),
                        handle: { breadcrumb: 'Order' },
                      },
                    ],
                  },
                ],
              },

              // SaaS / Admin
              {
                path: 'saas',
                handle: { breadcrumb: 'SaaS' },
                children: [
                  { index: true, element: <Navigate to={urls.app.pages.saas.analytics} replace /> },
                  {
                    path: 'analytics',
                    element: withSuspense(<AnalyticsPage />),
                    handle: { breadcrumb: 'Analytics', pageTransition: 'fadeScale' },
                  },
                  {
                    path: 'members',
                    handle: { breadcrumb: 'Members' },
                    children: [
                      { index: true, element: withSuspense(<MembersPage />) },
                      {
                        path: ':id',
                        element: withSuspense(<MemberDetailPage />),
                        handle: { breadcrumb: 'Member' },
                      },
                    ],
                  },
                  {
                    path: 'data-table',
                    element: withSuspense(<DataTablePage />),
                    handle: { breadcrumb: 'Data table' },
                  },
                  {
                    path: 'form-wizard',
                    element: withSuspense(<FormWizardPage />),
                    handle: { breadcrumb: 'Form wizard' },
                  },
                  {
                    path: 'settings',
                    element: withSuspense(<SettingsPage />),
                    handle: { breadcrumb: 'Settings' },
                  },
                  {
                    path: 'profile',
                    element: withSuspense(<ProfilePage />),
                    handle: { breadcrumb: 'Profile' },
                  },
                  {
                    path: 'billing',
                    element: withSuspense(<BillingPage />),
                    handle: { breadcrumb: 'Billing' },
                  },
                  {
                    path: 'api-keys',
                    element: withSuspense(<ApiKeysPage />),
                    handle: { breadcrumb: 'API keys' },
                  },
                  {
                    path: 'audit-log',
                    element: withSuspense(<AuditLogPage />),
                    handle: { breadcrumb: 'Audit log' },
                  },
                  {
                    path: 'integrations',
                    element: withSuspense(<IntegrationsPage />),
                    handle: { breadcrumb: 'Integrations' },
                  },
                  {
                    path: 'security-2fa',
                    element: withSuspense(<Security2faPage />),
                    handle: { breadcrumb: 'Two-factor auth' },
                  },
                  {
                    path: 'calendar',
                    element: withSuspense(<SaasCalendarPage />),
                    handle: { breadcrumb: 'Calendar' },
                  },
                  {
                    path: 'webhooks',
                    element: withSuspense(<WebhooksPage />),
                    handle: { breadcrumb: 'Webhooks' },
                  },
                  {
                    path: 'roles',
                    element: withSuspense(<RolesPermissionsPage />),
                    handle: { breadcrumb: 'Roles' },
                  },
                  {
                    path: 'feature-flags',
                    element: withSuspense(<FeatureFlagsPage />),
                    handle: { breadcrumb: 'Feature flags' },
                  },
                  {
                    path: 'support',
                    element: withSuspense(<SupportTicketsPage />),
                    handle: { breadcrumb: 'Support' },
                  },
                  {
                    path: 'invoices',
                    element: withSuspense(<SaasInvoicesPage />),
                    handle: { breadcrumb: 'Invoices' },
                  },
                ],
              },

              // Marketing
              {
                path: 'marketing',
                handle: { breadcrumb: 'Marketing' },
                children: [
                  {
                    index: true,
                    element: <Navigate to={urls.app.pages.marketing.landing} replace />,
                  },
                  {
                    path: 'landing',
                    element: withSuspense(<LandingPage />),
                    handle: { breadcrumb: 'Landing' },
                  },
                  {
                    path: 'pricing',
                    element: withSuspense(<PricingPage />),
                    handle: { breadcrumb: 'Pricing' },
                  },
                  {
                    path: 'about',
                    element: withSuspense(<AboutPage />),
                    handle: { breadcrumb: 'About' },
                  },
                  {
                    path: 'contact',
                    element: withSuspense(<ContactPage />),
                    handle: { breadcrumb: 'Contact' },
                  },
                  {
                    path: 'blog',
                    handle: { breadcrumb: 'Blog' },
                    children: [
                      { index: true, element: withSuspense(<BlogListPage />) },
                      {
                        path: ':slug',
                        element: withSuspense(<BlogPostPage />),
                        handle: { breadcrumb: 'Post' },
                      },
                    ],
                  },
                  {
                    path: 'faq',
                    element: withSuspense(<FaqPage />),
                    handle: { breadcrumb: 'FAQ' },
                  },
                  {
                    path: 'changelog',
                    element: withSuspense(<ChangelogPage />),
                    handle: { breadcrumb: 'Changelog' },
                  },
                  {
                    path: 'terms',
                    element: withSuspense(<LegalTermsPage />),
                    handle: { breadcrumb: 'Terms' },
                  },
                  {
                    path: 'privacy',
                    element: withSuspense(<LegalPrivacyPage />),
                    handle: { breadcrumb: 'Privacy' },
                  },
                  {
                    path: 'features',
                    handle: { breadcrumb: 'Features' },
                    children: [
                      { index: true, element: withSuspense(<FeaturesIndexPage />) },
                      {
                        path: ':slug',
                        element: withSuspense(<FeatureDetailPage />),
                        handle: { breadcrumb: 'Feature' },
                      },
                    ],
                  },
                  {
                    path: 'careers',
                    element: withSuspense(<CareersPage />),
                    handle: { breadcrumb: 'Careers' },
                  },
                  {
                    path: 'press',
                    element: withSuspense(<PressMediaKitPage />),
                    handle: { breadcrumb: 'Press kit' },
                  },
                ],
              },

              // Social
              {
                path: 'social',
                handle: { breadcrumb: 'Social' },
                children: [
                  { index: true, element: <Navigate to={urls.app.pages.social.feed} replace /> },
                  {
                    path: 'feed',
                    element: withSuspense(<FeedPage />),
                    handle: { breadcrumb: 'Feed' },
                  },
                  {
                    path: 'posts',
                    children: [
                      {
                        path: ':id',
                        element: withSuspense(<PostDetailPage />),
                        handle: { breadcrumb: 'Post' },
                      },
                    ],
                  },
                  {
                    path: 'users',
                    children: [
                      {
                        path: ':id',
                        element: withSuspense(<UserProfilePage />),
                        handle: { breadcrumb: 'User' },
                      },
                    ],
                  },
                  {
                    path: 'discover',
                    element: withSuspense(<DiscoverPage />),
                    handle: { breadcrumb: 'Discover' },
                  },
                  {
                    path: 'groups',
                    handle: { breadcrumb: 'Groups' },
                    children: [
                      { index: true, element: withSuspense(<GroupsPage />) },
                      {
                        path: ':id',
                        element: withSuspense(<GroupDetailPage />),
                        handle: { breadcrumb: 'Group' },
                      },
                    ],
                  },
                  {
                    path: 'events',
                    element: withSuspense(<SocialEventsPage />),
                    handle: { breadcrumb: 'Events' },
                  },
                  {
                    path: 'bookmarks',
                    element: withSuspense(<BookmarksPage />),
                    handle: { breadcrumb: 'Bookmarks' },
                  },
                  {
                    path: 'settings',
                    element: withSuspense(<SocialSettingsPage />),
                    handle: { breadcrumb: 'Settings' },
                  },
                  {
                    path: 'story',
                    children: [
                      {
                        path: 'create',
                        element: withSuspense(<StoryCreatePage />),
                        handle: { breadcrumb: 'Create story' },
                      },
                    ],
                  },
                  {
                    path: 'messages',
                    element: withSuspense(<MessagesPage />),
                    handle: { breadcrumb: 'Messages' },
                  },
                  {
                    path: 'notifications',
                    element: withSuspense(<NotificationsCenterPage />),
                    handle: { breadcrumb: 'Notifications' },
                  },
                  {
                    path: 'profile',
                    element: withSuspense(<SocialProfilePage />),
                    handle: { breadcrumb: 'Profile' },
                  },
                ],
              },

              // Vehicle
              {
                path: 'vehicle',
                handle: { breadcrumb: 'Vehicle' },
                children: [
                  {
                    index: true,
                    element: <Navigate to={urls.app.pages.vehicle.listing} replace />,
                  },
                  {
                    path: 'listing',
                    element: withSuspense(<VehicleListingPage />),
                    handle: { breadcrumb: 'Listing' },
                  },
                  {
                    path: 'detail',
                    element: withSuspense(<VehicleDetailPage />),
                    handle: { breadcrumb: 'Detail' },
                  },
                  {
                    path: 'booking',
                    element: withSuspense(<VehicleBookingPage />),
                    handle: { breadcrumb: 'Booking' },
                  },
                  {
                    path: 'map',
                    element: withSuspense(<MapSearchPage />),
                    handle: { breadcrumb: 'Map search' },
                  },
                  {
                    path: 'compare',
                    element: withSuspense(<CompareVehiclesPage />),
                    handle: { breadcrumb: 'Compare' },
                  },
                  {
                    path: 'financing',
                    element: withSuspense(<FinancingCalculatorPage />),
                    handle: { breadcrumb: 'Financing' },
                  },
                  {
                    path: 'host',
                    element: withSuspense(<HostDashboardPage />),
                    handle: { breadcrumb: 'Host dashboard' },
                  },
                  {
                    path: 'my-bookings',
                    element: withSuspense(<MyBookingsPage />),
                    handle: { breadcrumb: 'My bookings' },
                  },
                  {
                    path: 'reviews',
                    element: withSuspense(<VehicleReviewsPage />),
                    handle: { breadcrumb: 'Reviews' },
                  },
                  {
                    path: 'insurance',
                    element: withSuspense(<InsuranceAddonPage />),
                    handle: { breadcrumb: 'Insurance' },
                  },
                ],
              },

              // Health
              {
                path: 'health',
                handle: { breadcrumb: 'Healthcare' },
                children: [
                  {
                    index: true,
                    element: <Navigate to={urls.app.pages.health.appointments} replace />,
                  },
                  {
                    path: 'appointments',
                    element: withSuspense(<AppointmentsPage />),
                    handle: { breadcrumb: 'Appointments' },
                  },
                  {
                    path: 'patients',
                    handle: { breadcrumb: 'Patients' },
                    children: [
                      { index: true, element: withSuspense(<PatientsListPage />) },
                      {
                        path: ':id',
                        element: withSuspense(<PatientDetailPage />),
                        handle: { breadcrumb: 'Patient' },
                      },
                    ],
                  },
                  {
                    path: 'records',
                    element: withSuspense(<MedicalRecordsPage />),
                    handle: { breadcrumb: 'Records' },
                  },
                  {
                    path: 'prescriptions',
                    element: withSuspense(<PrescriptionsPage />),
                    handle: { breadcrumb: 'Prescriptions' },
                  },
                  {
                    path: 'lab-results',
                    element: withSuspense(<LabResultsPage />),
                    handle: { breadcrumb: 'Lab results' },
                  },
                  {
                    path: 'telehealth',
                    element: withSuspense(<TelehealthPage />),
                    handle: { breadcrumb: 'Telehealth' },
                  },
                  {
                    path: 'intake',
                    element: withSuspense(<IntakeWizardPage />),
                    handle: { breadcrumb: 'Intake' },
                  },
                  {
                    path: 'providers',
                    element: withSuspense(<ProviderDirectoryPage />),
                    handle: { breadcrumb: 'Providers' },
                  },
                  {
                    path: 'billing',
                    element: withSuspense(<HealthBillingPage />),
                    handle: { breadcrumb: 'Billing' },
                  },
                  {
                    path: 'waiting-room',
                    element: withSuspense(<WaitingRoomPage />),
                    handle: { breadcrumb: 'Waiting room' },
                  },
                  {
                    path: 'portal',
                    element: withSuspense(<PatientPortalPage />),
                    handle: { breadcrumb: 'Patient portal' },
                  },
                ],
              },

              // Finance
              {
                path: 'finance',
                handle: { breadcrumb: 'Finance' },
                children: [
                  { index: true, element: <Navigate to={urls.app.pages.finance.wallet} replace /> },
                  {
                    path: 'wallet',
                    element: withSuspense(<WalletPage />),
                    handle: { breadcrumb: 'Wallet' },
                  },
                  {
                    path: 'transactions',
                    element: withSuspense(<TransactionsPage />),
                    handle: { breadcrumb: 'Transactions' },
                  },
                  {
                    path: 'invoices',
                    element: withSuspense(<InvoicesPage />),
                    handle: { breadcrumb: 'Invoices' },
                  },
                  {
                    path: 'budget',
                    element: withSuspense(<BudgetPage />),
                    handle: { breadcrumb: 'Budget' },
                  },
                  {
                    path: 'cards',
                    element: withSuspense(<FinanceCardsPage />),
                    handle: { breadcrumb: 'Cards' },
                  },
                  {
                    path: 'transfer',
                    element: withSuspense(<TransferPage />),
                    handle: { breadcrumb: 'Transfer' },
                  },
                  {
                    path: 'savings',
                    element: withSuspense(<SavingsGoalsPage />),
                    handle: { breadcrumb: 'Savings' },
                  },
                  {
                    path: 'investments',
                    element: withSuspense(<InvestmentsPage />),
                    handle: { breadcrumb: 'Investments' },
                  },
                  {
                    path: 'tax-documents',
                    element: withSuspense(<TaxDocumentsPage />),
                    handle: { breadcrumb: 'Tax documents' },
                  },
                  {
                    path: 'recurring',
                    element: withSuspense(<RecurringPaymentsPage />),
                    handle: { breadcrumb: 'Recurring' },
                  },
                  {
                    path: 'dispute',
                    element: withSuspense(<DisputePage />),
                    handle: { breadcrumb: 'Dispute' },
                  },
                  {
                    path: 'reports',
                    element: withSuspense(<FinancialReportsPage />),
                    handle: { breadcrumb: 'Reports' },
                  },
                ],
              },

              // CRM
              {
                path: 'crm',
                handle: { breadcrumb: 'CRM' },
                children: [
                  { index: true, element: <Navigate to={urls.app.pages.crm.pipeline} replace /> },
                  {
                    path: 'pipeline',
                    element: withSuspense(<PipelinePage />),
                    handle: { breadcrumb: 'Pipeline' },
                  },
                  {
                    path: 'deals',
                    handle: { breadcrumb: 'Deals' },
                    children: [
                      { index: true, element: withSuspense(<DealsPage />) },
                      {
                        path: ':id',
                        element: withSuspense(<DealDetailPage />),
                        handle: { breadcrumb: 'Deal' },
                      },
                    ],
                  },
                  {
                    path: 'contacts',
                    handle: { breadcrumb: 'Contacts' },
                    children: [
                      { index: true, element: withSuspense(<CrmContactsPage />) },
                      {
                        path: ':id',
                        element: withSuspense(<ContactDetailPage />),
                        handle: { breadcrumb: 'Contact' },
                      },
                    ],
                  },
                  {
                    path: 'companies',
                    handle: { breadcrumb: 'Companies' },
                    children: [
                      { index: true, element: withSuspense(<CrmCompaniesPage />) },
                      {
                        path: ':id',
                        element: withSuspense(<CompanyDetailPage />),
                        handle: { breadcrumb: 'Company' },
                      },
                    ],
                  },
                  {
                    path: 'activities',
                    element: withSuspense(<CrmActivitiesPage />),
                    handle: { breadcrumb: 'Activities' },
                  },
                  {
                    path: 'quotes',
                    element: withSuspense(<CrmQuotesPage />),
                    handle: { breadcrumb: 'Quotes' },
                  },
                  {
                    path: 'reports',
                    element: withSuspense(<CrmReportsPage />),
                    handle: { breadcrumb: 'Reports' },
                  },
                  {
                    path: 'segments',
                    element: withSuspense(<CrmSegmentsPage />),
                    handle: { breadcrumb: 'Segments' },
                  },
                ],
              },

              // Project
              {
                path: 'project',
                handle: { breadcrumb: 'Project' },
                children: [
                  { index: true, element: <Navigate to={urls.app.pages.project.kanban} replace /> },
                  {
                    path: 'kanban',
                    element: withSuspense(<KanbanPage />),
                    handle: { breadcrumb: 'Kanban' },
                  },
                  {
                    path: 'projects',
                    handle: { breadcrumb: 'Projects' },
                    children: [
                      { index: true, element: withSuspense(<ProjectsListPage />) },
                      {
                        path: ':id',
                        element: withSuspense(<ProjectDetailPage />),
                        handle: { breadcrumb: 'Project' },
                      },
                    ],
                  },
                  {
                    path: 'tasks',
                    element: withSuspense(<TasksCalendarPage />),
                    handle: { breadcrumb: 'Tasks' },
                  },
                  {
                    path: 'gantt',
                    element: withSuspense(<GanttPage />),
                    handle: { breadcrumb: 'Gantt' },
                  },
                  {
                    path: 'roadmap',
                    element: withSuspense(<RoadmapPage />),
                    handle: { breadcrumb: 'Roadmap' },
                  },
                  {
                    path: 'sprint',
                    element: withSuspense(<SprintPlanningPage />),
                    handle: { breadcrumb: 'Sprint' },
                  },
                  {
                    path: 'files',
                    element: withSuspense(<ProjectFilesPage />),
                    handle: { breadcrumb: 'Files' },
                  },
                  {
                    path: 'time-tracking',
                    element: withSuspense(<TimeTrackingPage />),
                    handle: { breadcrumb: 'Time tracking' },
                  },
                  {
                    path: 'workload',
                    element: withSuspense(<TeamWorkloadPage />),
                    handle: { breadcrumb: 'Workload' },
                  },
                  {
                    path: 'reports',
                    element: withSuspense(<ProjectReportsPage />),
                    handle: { breadcrumb: 'Reports' },
                  },
                  {
                    path: 'settings',
                    element: withSuspense(<ProjectSettingsPage />),
                    handle: { breadcrumb: 'Project settings' },
                  },
                ],
              },

              // Auth & Errors link wrappers — the 6 individual URLs redirect to the real
              // auth/error pages which live under their own layouts. The root shows a combined
              // landing page with helpful links.
              {
                path: 'auth-errors',
                handle: { breadcrumb: 'Auth & Errors' },
                children: [
                  { index: true, element: withSuspense(<AuthLinksPage />) },
                  {
                    path: 'errors',
                    element: withSuspense(<ErrorLinksPage />),
                    handle: { breadcrumb: 'Errors' },
                  },
                  { path: 'login', element: <Navigate to={urls.auth.login} replace /> },
                  { path: 'register', element: <Navigate to={urls.auth.register} replace /> },
                  { path: 'forgot', element: <Navigate to={urls.auth.forgot} replace /> },
                  { path: 'login-split', element: <Navigate to={urls.auth.loginSplit} replace /> },
                  { path: 'login-cover', element: <Navigate to={urls.auth.loginSplit} replace /> },
                  { path: 'login-overlay', element: <Navigate to={urls.auth.login} replace /> },
                  {
                    path: 'register-split',
                    element: <Navigate to={urls.auth.registerSplit} replace />,
                  },
                  { path: '404', element: <Navigate to={urls.errors.notFound} replace /> },
                  { path: '500', element: <Navigate to={urls.errors.server} replace /> },
                  { path: '403', element: <Navigate to={urls.errors.forbidden} replace /> },
                ],
              },
            ],
          },

          /* ----- UI ELEMENTS ----- */
          {
            path: 'ui',
            handle: { breadcrumb: 'UI Elements' },
            children: [
              { index: true, element: <Navigate to={urls.app.ui.tokens.root} replace /> },
              {
                path: 'tokens',
                handle: { breadcrumb: 'Tokens' },
                children: [
                  { index: true, element: withSuspense(<TokensPage />) },
                  {
                    path: 'colors',
                    element: withSuspense(<TokensColorsPage />),
                    handle: { breadcrumb: 'Colors' },
                  },
                  {
                    path: 'presets',
                    element: withSuspense(<TokensPresetsPage />),
                    handle: { breadcrumb: 'Theme presets' },
                  },
                  {
                    path: 'typography',
                    element: withSuspense(<TokensTypographyPage />),
                    handle: { breadcrumb: 'Typography' },
                  },
                  {
                    path: 'spacing',
                    element: withSuspense(<TokensSpacingPage />),
                    handle: { breadcrumb: 'Spacing' },
                  },
                  {
                    path: 'radius',
                    element: withSuspense(<TokensRadiusPage />),
                    handle: { breadcrumb: 'Radius' },
                  },
                  {
                    path: 'shadow',
                    element: withSuspense(<TokensShadowPage />),
                    handle: { breadcrumb: 'Shadow' },
                  },
                  {
                    path: 'breakpoints',
                    element: withSuspense(<TokensBreakpointsPage />),
                    handle: { breadcrumb: 'Breakpoints' },
                  },
                ],
              },
              {
                path: 'components',
                handle: { breadcrumb: 'Components' },
                children: [
                  { index: true, element: <Navigate to={urls.app.ui.components.button} replace /> },
                  {
                    path: 'button',
                    element: withSuspense(<ButtonPage />),
                    handle: { breadcrumb: 'Button' },
                  },
                  {
                    path: 'input',
                    element: withSuspense(<InputPage />),
                    handle: { breadcrumb: 'Input' },
                  },
                  {
                    path: 'form',
                    element: withSuspense(<FormPage />),
                    handle: { breadcrumb: 'Form' },
                  },
                  {
                    path: 'select',
                    element: withSuspense(<SelectPage />),
                    handle: { breadcrumb: 'Select' },
                  },
                  {
                    path: 'dialog',
                    element: withSuspense(<DialogPage />),
                    handle: { breadcrumb: 'Dialog' },
                  },
                  {
                    path: 'table',
                    element: withSuspense(<UiTablePage />),
                    handle: { breadcrumb: 'Table' },
                  },
                  {
                    path: 'card',
                    element: withSuspense(<CardPage />),
                    handle: { breadcrumb: 'Card' },
                  },
                  {
                    path: 'badge',
                    element: withSuspense(<BadgePage />),
                    handle: { breadcrumb: 'Badge' },
                  },
                  {
                    path: 'tabs',
                    element: withSuspense(<TabsPage />),
                    handle: { breadcrumb: 'Tabs' },
                  },
                  {
                    path: 'toast',
                    element: withSuspense(<ToastPage />),
                    handle: { breadcrumb: 'Toast' },
                  },
                  {
                    path: 'tooltip',
                    element: withSuspense(<TooltipPage />),
                    handle: { breadcrumb: 'Tooltip' },
                  },
                  {
                    path: 'dropdown-menu',
                    element: withSuspense(<DropdownMenuPage />),
                    handle: { breadcrumb: 'Dropdown menu' },
                  },
                  {
                    path: 'date-picker',
                    element: withSuspense(<DatePickerPage />),
                    handle: { breadcrumb: 'Date picker' },
                  },
                  {
                    path: 'pagination',
                    element: withSuspense(<PaginationPage />),
                    handle: { breadcrumb: 'Pagination' },
                  },
                  {
                    path: 'skeleton',
                    element: withSuspense(<SkeletonPage />),
                    handle: { breadcrumb: 'Skeleton' },
                  },
                  {
                    path: 'empty-state',
                    element: withSuspense(<EmptyStatePage />),
                    handle: { breadcrumb: 'Empty state' },
                  },
                  {
                    path: 'pin-input',
                    element: withSuspense(<PinInputPage />),
                    handle: { breadcrumb: 'PIN input' },
                  },
                  {
                    path: 'file-upload',
                    element: withSuspense(<FileUploadPage />),
                    handle: { breadcrumb: 'File upload' },
                  },
                  {
                    path: 'stat-card',
                    element: withSuspense(<StatCardPage />),
                    handle: { breadcrumb: 'Stat card' },
                  },
                  {
                    path: 'icons',
                    element: withSuspense(<UiIconsPage />),
                    handle: { breadcrumb: 'Icons' },
                  },
                  {
                    path: 'charts',
                    element: withSuspense(<UiChartsPage />),
                    handle: { breadcrumb: 'Charts' },
                  },
                  {
                    path: 'media',
                    element: withSuspense(<MediaPage />),
                    handle: { breadcrumb: 'Media & layout' },
                  },
                  {
                    path: 'rich-inputs',
                    element: withSuspense(<RichInputsPage />),
                    handle: { breadcrumb: 'Rich inputs' },
                  },
                ],
              },
              {
                path: 'examples',
                handle: { breadcrumb: 'Examples' },
                children: [
                  { index: true, element: <Navigate to={urls.app.ui.examples.inputs} replace /> },
                  {
                    path: 'inputs',
                    element: withSuspense(<InputsCategoryPage />),
                    handle: { breadcrumb: 'Inputs' },
                  },
                  {
                    path: 'overlays',
                    element: withSuspense(<OverlaysCategoryPage />),
                    handle: { breadcrumb: 'Overlays' },
                  },
                  {
                    path: 'navigation',
                    element: withSuspense(<NavigationCategoryPage />),
                    handle: { breadcrumb: 'Navigation' },
                  },
                  {
                    path: 'data-display',
                    element: withSuspense(<DataCategoryPage />),
                    handle: { breadcrumb: 'Data display' },
                  },
                  {
                    path: 'feedback',
                    element: withSuspense(<FeedbackCategoryPage />),
                    handle: { breadcrumb: 'Feedback' },
                  },
                  {
                    path: 'layout',
                    element: withSuspense(<LayoutCategoryPage />),
                    handle: { breadcrumb: 'Layout' },
                  },
                  {
                    path: 'patterns',
                    element: withSuspense(<PatternsPage />),
                    handle: { breadcrumb: 'Patterns' },
                  },
                  {
                    path: 'page-transitions',
                    element: withSuspense(<PageTransitionsShowcasePage />),
                    handle: { breadcrumb: 'Page transitions' },
                  },
                  {
                    path: 'route-transitions',
                    element: <Navigate to={urls.app.ui.examples.pageTransitions} replace />,
                  },
                  {
                    path: 'animations',
                    element: withSuspense(<MotionPage />),
                    handle: { breadcrumb: 'Animations' },
                  },
                  {
                    path: 'marketing-blocks',
                    element: withSuspense(<MarketingBlocksPage />),
                    handle: { breadcrumb: 'Marketing blocks' },
                  },
                ],
              },

              /* ---- Legacy `/app/ui/{patterns,motion,category/*}` redirects ---- */
              {
                path: 'patterns',
                element: <Navigate to={urls.app.ui.examples.patterns} replace />,
              },
              {
                path: 'motion',
                element: <Navigate to={urls.app.ui.examples.animations} replace />,
              },
              {
                path: 'category',
                children: [
                  { index: true, element: <Navigate to={urls.app.ui.examples.root} replace /> },
                  {
                    path: 'inputs',
                    element: <Navigate to={urls.app.ui.examples.inputs} replace />,
                  },
                  {
                    path: 'overlays',
                    element: <Navigate to={urls.app.ui.examples.overlays} replace />,
                  },
                  {
                    path: 'navigation',
                    element: <Navigate to={urls.app.ui.examples.navigation} replace />,
                  },
                  {
                    path: 'data-display',
                    element: <Navigate to={urls.app.ui.examples.data} replace />,
                  },
                  {
                    path: 'feedback',
                    element: <Navigate to={urls.app.ui.examples.feedback} replace />,
                  },
                  {
                    path: 'layout',
                    element: <Navigate to={urls.app.ui.examples.layout} replace />,
                  },
                ],
              },
            ],
          },

          /* ----- DOCS ----- */
          {
            path: 'docs',
            handle: { breadcrumb: 'Docs' },
            children: [
              { index: true, element: withSuspense(<DocsHomePage />) },
              {
                path: 'getting-started',
                element: withSuspense(<GettingStartedPage />),
                handle: { breadcrumb: 'Getting started' },
              },
              {
                path: 'configuration-theming',
                element: withSuspense(<ConfigurationThemingPage />),
                handle: { breadcrumb: 'Configuration & theming' },
              },
              {
                path: 'architecture-routing',
                element: withSuspense(<ArchitectureRoutingPage />),
                handle: { breadcrumb: 'Architecture & routing' },
              },
              {
                path: 'theming',
                element: <Navigate to={urls.app.docs.configurationTheming} replace />,
              },
              {
                path: 'customizing',
                element: <Navigate to={urls.app.docs.configurationTheming} replace />,
              },
              {
                path: 'layouts',
                element: <Navigate to={urls.app.docs.architectureRouting} replace />,
              },
              {
                path: 'components',
                element: <Navigate to={urls.app.ui.root} replace />,
              },
              {
                path: 'deploying',
                element: <Navigate to={urls.app.docs.root} replace />,
              },
            ],
          },

          /* ----- LEGACY FLAT REDIRECTS (old /app/* routes) ----- */
          { path: 'settings', element: <Navigate to={urls.app.pages.saas.settings} replace /> },
          { path: 'profile', element: <Navigate to={urls.app.pages.saas.profile} replace /> },
          { path: 'pricing', element: <Navigate to={urls.app.pages.marketing.pricing} replace /> },
          { path: 'data-table', element: <Navigate to={urls.app.pages.saas.dataTable} replace /> },
          {
            path: 'form-wizard',
            element: <Navigate to={urls.app.pages.saas.formWizard} replace />,
          },
          {
            path: 'notifications',
            element: <Navigate to={urls.app.pages.social.notifications} replace />,
          },
          {
            path: 'courses',
            children: [
              { index: true, element: <Navigate to={urls.app.pages.edu.courses} replace /> },
              {
                path: ':id',
                element: <LegacyCourseRedirect />,
              },
            ],
          },
          {
            path: 'leaderboard',
            element: <Navigate to={urls.app.pages.edu.leaderboard} replace />,
          },
          { path: 'icons', element: <Navigate to={urls.app.ui.components.icons} replace /> },
          { path: 'charts', element: <Navigate to={urls.app.ui.components.charts} replace /> },
        ],
      },

      /* ------------------- AUTH ------------------- */
      { path: urls.auth.loginSplit, element: withSuspense(<LoginSplitPage />) },
      { path: urls.auth.registerSplit, element: withSuspense(<RegisterSplitPage />) },
      { path: '/auth/login-cover', element: <Navigate to={urls.auth.loginSplit} replace /> },
      { path: '/auth/login-overlay', element: <Navigate to={urls.auth.login} replace /> },

      {
        path: urls.auth.root,
        element: <AuthLayout />,
        children: [
          { index: true, element: <Navigate to={urls.auth.login} replace /> },
          { path: 'login', element: withSuspense(<LoginPage />) },
          { path: 'register', element: withSuspense(<RegisterPage />) },
          { path: 'forgot', element: withSuspense(<ForgotPasswordPage />) },
          { path: 'reset-password', element: withSuspense(<ResetPasswordPage />) },
          { path: 'verify-email', element: withSuspense(<VerifyEmailPage />) },
          { path: 'two-factor', element: withSuspense(<TwoFactorPage />) },
          { path: 'accept-invite', element: withSuspense(<AcceptInvitePage />) },
          { path: 'account-locked', element: withSuspense(<AccountLockedPage />) },
          { path: 'magic-link-sent', element: withSuspense(<MagicLinkSentPage />) },
          { path: 'sso', element: withSuspense(<SsoPickerPage />) },
          { path: 'session-expired', element: withSuspense(<SessionExpiredPage />) },
        ],
      },

      { path: urls.onboarding.root, element: withSuspense(<OnboardingPage />) },

      /* ------------------- LEARN (Fullscreen) ------------------- */
      {
        path: urls.learn.root,
        element: <FullscreenLayout />,
        children: [
          { path: 'lessons/:id', element: withSuspense(<LessonPlayerPage />) },
          { path: 'quiz/:id', element: withSuspense(<QuizPage />) },
          { path: 'live/:id', element: withSuspense(<LiveSessionPage />) },
        ],
      },

      /* ------------------- LEGACY /showcase/* → /app/ui/* ------------------- */
      { path: '/showcase', element: <Navigate to={urls.app.ui.root} replace /> },
      {
        path: '/showcase/components',
        element: <Navigate to={urls.app.ui.components.root} replace />,
      },
      { path: '/showcase/components/:rest', element: <LegacyShowcaseComponentRedirect /> },
      { path: '/showcase/tokens', element: <Navigate to={urls.app.ui.tokens.root} replace /> },
      { path: '/showcase/patterns', element: <Navigate to={urls.app.ui.patterns} replace /> },

      /* ------------------- LEGACY /docs/* → /app/docs/* ------------------- */
      { path: '/docs', element: <Navigate to={urls.app.docs.root} replace /> },
      { path: '/docs/:rest', element: <LegacyDocsRedirect /> },

      /* ------------------- ERRORS ------------------- */
      { path: urls.errors.notFound, element: withSuspense(<NotFoundPage />) },
      { path: urls.errors.server, element: withSuspense(<ServerErrorPage />) },
      { path: urls.errors.forbidden, element: withSuspense(<ForbiddenPage />) },
      { path: urls.errors.maintenance, element: withSuspense(<MaintenancePage />) },

      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
];

/* ---------- small helpers for dynamic legacy redirects ---------- */
import { useParams } from 'react-router-dom';

function LegacyCourseRedirect() {
  const { id = '' } = useParams<{ id: string }>();
  return <Navigate to={urls.app.pages.edu.courseDetail(id)} replace />;
}

function LegacyDocsRedirect() {
  const { rest = '' } = useParams<{ rest: string }>();
  return <Navigate to={`${urls.app.docs.root}/${rest}`} replace />;
}

function LegacyShowcaseComponentRedirect() {
  const { rest = '' } = useParams<{ rest: string }>();
  return <Navigate to={`${urls.app.ui.components.root}/${rest}`} replace />;
}
