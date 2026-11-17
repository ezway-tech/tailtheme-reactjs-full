import type { LucideIcon } from 'lucide-react';
import {
  AlertCircle,
  Boxes,
  Briefcase,
  Car,
  Compass,
  FolderKanban,
  Gauge,
  GraduationCap,
  HeartPulse,
  Layers,
  Palette,
  Rss,
  ShoppingBag,
  Wallet,
} from 'lucide-react';

import { urls } from '@/routes/urls';

/** A single nav node in the sidebar tree. Leaf nodes have `to`; branches have `children`. */
export interface NavNode {
  id: string;
  labelKey: string;
  fallback: string;
  icon?: LucideIcon;
  to?: string;
  children?: NavNode[];
  /** If true and node has `to`, match path exactly (avoid parent matching). */
  end?: boolean;
  /** Optional count shown as a pill on branch rows in the sidebar. */
  badge?: number;
}

/** Leaf entry with icon inherited from the nearest ancestor that defines one. */
export interface FlatNavLeaf {
  id: string;
  labelKey: string;
  fallback: string;
  to: string;
  end?: boolean;
  icon?: LucideIcon;
}

export const PAGES_TREE: NavNode[] = [
  {
    id: 'edu',
    labelKey: 'nav.themes.edu',
    fallback: 'Edu',
    icon: GraduationCap,
    badge: 14,
    children: [
      {
        id: 'edu.courses',
        labelKey: 'nav.edu.courses',
        fallback: 'Courses',
        to: urls.app.pages.edu.courses,
      },
      {
        id: 'edu.leaderboard',
        labelKey: 'nav.edu.leaderboard',
        fallback: 'Leaderboard',
        to: urls.app.pages.edu.leaderboard,
      },
      {
        id: 'edu.assignments',
        labelKey: 'nav.edu.assignments',
        fallback: 'Assignments',
        to: urls.app.pages.edu.assignments,
      },
      {
        id: 'edu.classes',
        labelKey: 'nav.edu.classes',
        fallback: 'Classes',
        to: urls.app.pages.edu.classes,
      },
      {
        id: 'edu.lesson',
        labelKey: 'nav.edu.lessonPlayer',
        fallback: 'Lesson player',
        to: urls.app.pages.edu.lessonLink,
      },
      {
        id: 'edu.quiz',
        labelKey: 'nav.edu.quiz',
        fallback: 'Quiz',
        to: urls.app.pages.edu.quizLink,
      },
      {
        id: 'edu.certificates',
        labelKey: 'nav.edu.certificates',
        fallback: 'Certificates',
        to: urls.app.pages.edu.certificates,
      },
      {
        id: 'edu.gradebook',
        labelKey: 'nav.edu.gradebook',
        fallback: 'Gradebook',
        to: urls.app.pages.edu.gradebook,
      },
      {
        id: 'edu.instructor',
        labelKey: 'nav.edu.instructor',
        fallback: 'Instructor',
        to: urls.app.pages.edu.instructor,
      },
      {
        id: 'edu.progress',
        labelKey: 'nav.edu.progress',
        fallback: 'My progress',
        to: urls.app.pages.edu.progress,
      },
      {
        id: 'edu.forum',
        labelKey: 'nav.edu.forum',
        fallback: 'Forum',
        to: urls.app.pages.edu.forum,
      },
      {
        id: 'edu.settings',
        labelKey: 'nav.edu.settings',
        fallback: 'Learning settings',
        to: urls.app.pages.edu.settings,
      },
    ],
  },
  {
    id: 'ecommerce',
    labelKey: 'nav.themes.ecommerce',
    fallback: 'E-commerce',
    icon: ShoppingBag,
    badge: 12,
    children: [
      {
        id: 'ec.storefront',
        labelKey: 'nav.ecommerce.storefront',
        fallback: 'Storefront',
        to: urls.app.pages.ecommerce.storefront,
      },
      {
        id: 'ec.product',
        labelKey: 'nav.ecommerce.product',
        fallback: 'Product detail',
        to: urls.app.pages.ecommerce.product,
      },
      {
        id: 'ec.cart',
        labelKey: 'nav.ecommerce.cart',
        fallback: 'Cart',
        to: urls.app.pages.ecommerce.cart,
      },
      {
        id: 'ec.checkout',
        labelKey: 'nav.ecommerce.checkout',
        fallback: 'Checkout',
        to: urls.app.pages.ecommerce.checkout,
      },
      {
        id: 'ec.orders',
        labelKey: 'nav.ecommerce.orders',
        fallback: 'Orders',
        to: urls.app.pages.ecommerce.orders,
      },
      {
        id: 'ec.wishlist',
        labelKey: 'nav.ecommerce.wishlist',
        fallback: 'Wishlist',
        to: urls.app.pages.ecommerce.wishlist,
      },
      {
        id: 'ec.categories',
        labelKey: 'nav.ecommerce.categories',
        fallback: 'Categories',
        to: urls.app.pages.ecommerce.categories,
      },
      {
        id: 'ec.search',
        labelKey: 'nav.ecommerce.search',
        fallback: 'Search',
        to: urls.app.pages.ecommerce.search,
      },
      {
        id: 'ec.compare',
        labelKey: 'nav.ecommerce.compare',
        fallback: 'Compare',
        to: urls.app.pages.ecommerce.compare,
      },
      {
        id: 'ec.returns',
        labelKey: 'nav.ecommerce.returns',
        fallback: 'Returns',
        to: urls.app.pages.ecommerce.returns,
      },
      {
        id: 'ec.seller',
        labelKey: 'nav.ecommerce.seller',
        fallback: 'Seller dashboard',
        to: urls.app.pages.ecommerce.seller,
      },
      {
        id: 'ec.inventory',
        labelKey: 'nav.ecommerce.inventory',
        fallback: 'Inventory',
        to: urls.app.pages.ecommerce.inventory,
      },
    ],
  },
  {
    id: 'saas',
    labelKey: 'nav.themes.saas',
    fallback: 'SaaS / Admin',
    icon: Briefcase,
    badge: 16,
    children: [
      {
        id: 'saas.analytics',
        labelKey: 'nav.saas.analytics',
        fallback: 'Analytics',
        to: urls.app.pages.saas.analytics,
      },
      {
        id: 'saas.members',
        labelKey: 'nav.saas.members',
        fallback: 'Members',
        to: urls.app.pages.saas.members,
      },
      {
        id: 'saas.dataTable',
        labelKey: 'nav.saas.dataTable',
        fallback: 'Data table',
        to: urls.app.pages.saas.dataTable,
      },
      {
        id: 'saas.formWizard',
        labelKey: 'nav.saas.formWizard',
        fallback: 'Form wizard',
        to: urls.app.pages.saas.formWizard,
      },
      {
        id: 'saas.settings',
        labelKey: 'nav.saas.settings',
        fallback: 'Settings',
        to: urls.app.pages.saas.settings,
      },
      {
        id: 'saas.billing',
        labelKey: 'nav.saas.billing',
        fallback: 'Billing',
        to: urls.app.pages.saas.billing,
      },
      {
        id: 'saas.apiKeys',
        labelKey: 'nav.saas.apiKeys',
        fallback: 'API keys',
        to: urls.app.pages.saas.apiKeys,
      },
      {
        id: 'saas.auditLog',
        labelKey: 'nav.saas.auditLog',
        fallback: 'Audit log',
        to: urls.app.pages.saas.auditLog,
      },
      {
        id: 'saas.integrations',
        labelKey: 'nav.saas.integrations',
        fallback: 'Integrations',
        to: urls.app.pages.saas.integrations,
      },
      {
        id: 'saas.security2fa',
        labelKey: 'nav.saas.security2fa',
        fallback: '2FA setup',
        to: urls.app.pages.saas.security2fa,
      },
      {
        id: 'saas.calendar',
        labelKey: 'nav.saas.calendar',
        fallback: 'Calendar',
        to: urls.app.pages.saas.calendar,
      },
      {
        id: 'saas.webhooks',
        labelKey: 'nav.saas.webhooks',
        fallback: 'Webhooks',
        to: urls.app.pages.saas.webhooks,
      },
      {
        id: 'saas.roles',
        labelKey: 'nav.saas.roles',
        fallback: 'Roles',
        to: urls.app.pages.saas.roles,
      },
      {
        id: 'saas.featureFlags',
        labelKey: 'nav.saas.featureFlags',
        fallback: 'Feature flags',
        to: urls.app.pages.saas.featureFlags,
      },
      {
        id: 'saas.support',
        labelKey: 'nav.saas.support',
        fallback: 'Support',
        to: urls.app.pages.saas.support,
      },
      {
        id: 'saas.invoices',
        labelKey: 'nav.saas.invoices',
        fallback: 'Invoices',
        to: urls.app.pages.saas.invoices,
      },
      {
        id: 'saas.profile',
        labelKey: 'nav.saas.profile',
        fallback: 'Profile',
        to: urls.app.pages.saas.profile,
      },
    ],
  },
  {
    id: 'marketing',
    labelKey: 'nav.themes.marketing',
    fallback: 'Marketing',
    icon: Compass,
    children: [
      {
        id: 'mk.landing',
        labelKey: 'nav.marketing.landing',
        fallback: 'Landing',
        to: urls.app.pages.marketing.landing,
      },
      {
        id: 'mk.pricing',
        labelKey: 'nav.marketing.pricing',
        fallback: 'Pricing',
        to: urls.app.pages.marketing.pricing,
      },
      {
        id: 'mk.about',
        labelKey: 'nav.marketing.about',
        fallback: 'About',
        to: urls.app.pages.marketing.about,
      },
      {
        id: 'mk.contact',
        labelKey: 'nav.marketing.contact',
        fallback: 'Contact',
        to: urls.app.pages.marketing.contact,
      },
      {
        id: 'mk.blog',
        labelKey: 'nav.marketing.blog',
        fallback: 'Blog',
        to: urls.app.pages.marketing.blog,
      },
      {
        id: 'mk.faq',
        labelKey: 'nav.marketing.faq',
        fallback: 'FAQ',
        to: urls.app.pages.marketing.faq,
      },
      {
        id: 'mk.changelog',
        labelKey: 'nav.marketing.changelog',
        fallback: 'Changelog',
        to: urls.app.pages.marketing.changelog,
      },
      {
        id: 'mk.terms',
        labelKey: 'nav.marketing.terms',
        fallback: 'Terms',
        to: urls.app.pages.marketing.terms,
      },
      {
        id: 'mk.privacy',
        labelKey: 'nav.marketing.privacy',
        fallback: 'Privacy',
        to: urls.app.pages.marketing.privacy,
      },
      {
        id: 'mk.features',
        labelKey: 'nav.marketing.features',
        fallback: 'Features',
        to: urls.app.pages.marketing.features,
      },
      {
        id: 'mk.careers',
        labelKey: 'nav.marketing.careers',
        fallback: 'Careers',
        to: urls.app.pages.marketing.careers,
      },
      {
        id: 'mk.press',
        labelKey: 'nav.marketing.press',
        fallback: 'Press kit',
        to: urls.app.pages.marketing.press,
      },
    ],
  },
  {
    id: 'social',
    labelKey: 'nav.themes.social',
    fallback: 'Social',
    icon: Rss,
    badge: 12,
    children: [
      {
        id: 'so.feed',
        labelKey: 'nav.social.feed',
        fallback: 'Feed',
        to: urls.app.pages.social.feed,
      },
      {
        id: 'so.messages',
        labelKey: 'nav.social.messages',
        fallback: 'Messages',
        to: urls.app.pages.social.messages,
      },
      {
        id: 'so.notifications',
        labelKey: 'nav.social.notifications',
        fallback: 'Notifications',
        to: urls.app.pages.social.notifications,
      },
      {
        id: 'so.profile',
        labelKey: 'nav.social.profile',
        fallback: 'Profile',
        to: urls.app.pages.social.profile,
      },
      {
        id: 'so.discover',
        labelKey: 'nav.social.discover',
        fallback: 'Discover',
        to: urls.app.pages.social.discover,
      },
      {
        id: 'so.groups',
        labelKey: 'nav.social.groups',
        fallback: 'Groups',
        to: urls.app.pages.social.groups,
      },
      {
        id: 'so.events',
        labelKey: 'nav.social.events',
        fallback: 'Events',
        to: urls.app.pages.social.events,
      },
      {
        id: 'so.bookmarks',
        labelKey: 'nav.social.bookmarks',
        fallback: 'Bookmarks',
        to: urls.app.pages.social.bookmarks,
      },
      {
        id: 'so.settings',
        labelKey: 'nav.social.settings',
        fallback: 'Settings',
        to: urls.app.pages.social.settings,
      },
      {
        id: 'so.story',
        labelKey: 'nav.social.story',
        fallback: 'Create story',
        to: urls.app.pages.social.storyCreate,
      },
    ],
  },
  {
    id: 'vehicle',
    labelKey: 'nav.themes.vehicle',
    fallback: 'Vehicle',
    icon: Car,
    badge: 10,
    children: [
      {
        id: 'vh.listing',
        labelKey: 'nav.vehicle.listing',
        fallback: 'Listing',
        to: urls.app.pages.vehicle.listing,
      },
      {
        id: 'vh.detail',
        labelKey: 'nav.vehicle.detail',
        fallback: 'Detail',
        to: urls.app.pages.vehicle.detail,
      },
      {
        id: 'vh.booking',
        labelKey: 'nav.vehicle.booking',
        fallback: 'Booking',
        to: urls.app.pages.vehicle.booking,
      },
      {
        id: 'vh.map',
        labelKey: 'nav.vehicle.map',
        fallback: 'Map search',
        to: urls.app.pages.vehicle.mapSearch,
      },
      {
        id: 'vh.compare',
        labelKey: 'nav.vehicle.compare',
        fallback: 'Compare',
        to: urls.app.pages.vehicle.compare,
      },
      {
        id: 'vh.financing',
        labelKey: 'nav.vehicle.financing',
        fallback: 'Financing',
        to: urls.app.pages.vehicle.financing,
      },
      {
        id: 'vh.host',
        labelKey: 'nav.vehicle.host',
        fallback: 'Host dashboard',
        to: urls.app.pages.vehicle.hostDashboard,
      },
      {
        id: 'vh.myBookings',
        labelKey: 'nav.vehicle.myBookings',
        fallback: 'My bookings',
        to: urls.app.pages.vehicle.myBookings,
      },
      {
        id: 'vh.reviews',
        labelKey: 'nav.vehicle.reviews',
        fallback: 'Reviews',
        to: urls.app.pages.vehicle.reviews,
      },
      {
        id: 'vh.insurance',
        labelKey: 'nav.vehicle.insurance',
        fallback: 'Insurance',
        to: urls.app.pages.vehicle.insurance,
      },
    ],
  },
  {
    id: 'health',
    labelKey: 'nav.themes.health',
    fallback: 'Healthcare',
    icon: HeartPulse,
    badge: 12,
    children: [
      {
        id: 'he.appointments',
        labelKey: 'nav.health.appointments',
        fallback: 'Appointments',
        to: urls.app.pages.health.appointments,
      },
      {
        id: 'he.patients',
        labelKey: 'nav.health.patients',
        fallback: 'Patients',
        to: urls.app.pages.health.patients,
      },
      {
        id: 'he.records',
        labelKey: 'nav.health.records',
        fallback: 'Records',
        to: urls.app.pages.health.records,
      },
      {
        id: 'he.prescriptions',
        labelKey: 'nav.health.prescriptions',
        fallback: 'Prescriptions',
        to: urls.app.pages.health.prescriptions,
      },
      {
        id: 'he.labResults',
        labelKey: 'nav.health.labResults',
        fallback: 'Lab results',
        to: urls.app.pages.health.labResults,
      },
      {
        id: 'he.telehealth',
        labelKey: 'nav.health.telehealth',
        fallback: 'Telehealth',
        to: urls.app.pages.health.telehealth,
      },
      {
        id: 'he.intake',
        labelKey: 'nav.health.intake',
        fallback: 'Intake',
        to: urls.app.pages.health.intake,
      },
      {
        id: 'he.providers',
        labelKey: 'nav.health.providers',
        fallback: 'Providers',
        to: urls.app.pages.health.providers,
      },
      {
        id: 'he.billing',
        labelKey: 'nav.health.billing',
        fallback: 'Billing',
        to: urls.app.pages.health.billing,
      },
      {
        id: 'he.waitingRoom',
        labelKey: 'nav.health.waitingRoom',
        fallback: 'Waiting room',
        to: urls.app.pages.health.waitingRoom,
      },
      {
        id: 'he.portal',
        labelKey: 'nav.health.portal',
        fallback: 'Patient portal',
        to: urls.app.pages.health.patientPortal,
      },
    ],
  },
  {
    id: 'finance',
    labelKey: 'nav.themes.finance',
    fallback: 'Finance',
    icon: Wallet,
    badge: 12,
    children: [
      {
        id: 'fi.wallet',
        labelKey: 'nav.finance.wallet',
        fallback: 'Wallet',
        to: urls.app.pages.finance.wallet,
      },
      {
        id: 'fi.transactions',
        labelKey: 'nav.finance.transactions',
        fallback: 'Transactions',
        to: urls.app.pages.finance.transactions,
      },
      {
        id: 'fi.invoices',
        labelKey: 'nav.finance.invoices',
        fallback: 'Invoices',
        to: urls.app.pages.finance.invoices,
      },
      {
        id: 'fi.budget',
        labelKey: 'nav.finance.budget',
        fallback: 'Budget',
        to: urls.app.pages.finance.budget,
      },
      {
        id: 'fi.cards',
        labelKey: 'nav.finance.cards',
        fallback: 'Cards',
        to: urls.app.pages.finance.cards,
      },
      {
        id: 'fi.transfer',
        labelKey: 'nav.finance.transfer',
        fallback: 'Transfer',
        to: urls.app.pages.finance.transfer,
      },
      {
        id: 'fi.savings',
        labelKey: 'nav.finance.savings',
        fallback: 'Savings',
        to: urls.app.pages.finance.savings,
      },
      {
        id: 'fi.investments',
        labelKey: 'nav.finance.investments',
        fallback: 'Investments',
        to: urls.app.pages.finance.investments,
      },
      {
        id: 'fi.taxDocuments',
        labelKey: 'nav.finance.taxDocuments',
        fallback: 'Tax documents',
        to: urls.app.pages.finance.taxDocuments,
      },
      {
        id: 'fi.recurring',
        labelKey: 'nav.finance.recurring',
        fallback: 'Recurring',
        to: urls.app.pages.finance.recurring,
      },
      {
        id: 'fi.dispute',
        labelKey: 'nav.finance.dispute',
        fallback: 'Dispute',
        to: urls.app.pages.finance.dispute,
      },
      {
        id: 'fi.reports',
        labelKey: 'nav.finance.reports',
        fallback: 'Reports',
        to: urls.app.pages.finance.reports,
      },
    ],
  },
  {
    id: 'project',
    labelKey: 'nav.themes.project',
    fallback: 'Project',
    icon: FolderKanban,
    badge: 11,
    children: [
      {
        id: 'pr.kanban',
        labelKey: 'nav.project.kanban',
        fallback: 'Kanban',
        to: urls.app.pages.project.kanban,
      },
      {
        id: 'pr.projects',
        labelKey: 'nav.project.projects',
        fallback: 'Projects',
        to: urls.app.pages.project.projects,
      },
      {
        id: 'pr.tasks',
        labelKey: 'nav.project.tasks',
        fallback: 'Tasks',
        to: urls.app.pages.project.tasks,
      },
      {
        id: 'pr.gantt',
        labelKey: 'nav.project.gantt',
        fallback: 'Gantt',
        to: urls.app.pages.project.gantt,
      },
      {
        id: 'pr.roadmap',
        labelKey: 'nav.project.roadmap',
        fallback: 'Roadmap',
        to: urls.app.pages.project.roadmap,
      },
      {
        id: 'pr.sprint',
        labelKey: 'nav.project.sprint',
        fallback: 'Sprint',
        to: urls.app.pages.project.sprint,
      },
      {
        id: 'pr.files',
        labelKey: 'nav.project.files',
        fallback: 'Files',
        to: urls.app.pages.project.files,
      },
      {
        id: 'pr.timeTracking',
        labelKey: 'nav.project.timeTracking',
        fallback: 'Time tracking',
        to: urls.app.pages.project.timeTracking,
      },
      {
        id: 'pr.workload',
        labelKey: 'nav.project.workload',
        fallback: 'Workload',
        to: urls.app.pages.project.workload,
      },
      {
        id: 'pr.reports',
        labelKey: 'nav.project.reports',
        fallback: 'Reports',
        to: urls.app.pages.project.reports,
      },
      {
        id: 'pr.settings',
        labelKey: 'nav.project.settings',
        fallback: 'Settings',
        to: urls.app.pages.project.settings,
      },
    ],
  },
  {
    id: 'crm',
    labelKey: 'nav.themes.crm',
    fallback: 'CRM',
    icon: Briefcase,
    badge: 10,
    children: [
      {
        id: 'crm.pipeline',
        labelKey: 'nav.crm.pipeline',
        fallback: 'Pipeline',
        to: urls.app.pages.crm.pipeline,
      },
      {
        id: 'crm.deals',
        labelKey: 'nav.crm.deals',
        fallback: 'Deals',
        to: urls.app.pages.crm.deals,
      },
      {
        id: 'crm.contacts',
        labelKey: 'nav.crm.contacts',
        fallback: 'Contacts',
        to: urls.app.pages.crm.contacts,
      },
      {
        id: 'crm.companies',
        labelKey: 'nav.crm.companies',
        fallback: 'Companies',
        to: urls.app.pages.crm.companies,
      },
      {
        id: 'crm.activities',
        labelKey: 'nav.crm.activities',
        fallback: 'Activities',
        to: urls.app.pages.crm.activities,
      },
      {
        id: 'crm.quotes',
        labelKey: 'nav.crm.quotes',
        fallback: 'Quotes',
        to: urls.app.pages.crm.quotes,
      },
      {
        id: 'crm.reports',
        labelKey: 'nav.crm.reports',
        fallback: 'Reports',
        to: urls.app.pages.crm.reports,
      },
      {
        id: 'crm.segments',
        labelKey: 'nav.crm.segments',
        fallback: 'Segments',
        to: urls.app.pages.crm.segments,
      },
    ],
  },
  {
    id: 'authErrors',
    labelKey: 'nav.themes.authErrors',
    fallback: 'Auth & Errors',
    icon: AlertCircle,
    children: [
      {
        id: 'ae.login',
        labelKey: 'nav.authErrors.login',
        fallback: 'Login',
        to: urls.app.pages.authErrors.login,
      },
      {
        id: 'ae.register',
        labelKey: 'nav.authErrors.register',
        fallback: 'Register',
        to: urls.app.pages.authErrors.register,
      },
      {
        id: 'ae.forgot',
        labelKey: 'nav.authErrors.forgot',
        fallback: 'Forgot password',
        to: urls.app.pages.authErrors.forgot,
      },
      {
        id: 'ae.loginSplit',
        labelKey: 'nav.authErrors.loginSplit',
        fallback: 'Login split',
        to: urls.app.pages.authErrors.loginSplit,
      },
      {
        id: 'ae.registerSplit',
        labelKey: 'nav.authErrors.registerSplit',
        fallback: 'Register split',
        to: urls.app.pages.authErrors.registerSplit,
      },
      {
        id: 'ae.404',
        labelKey: 'nav.authErrors.notFound',
        fallback: '404',
        to: urls.app.pages.authErrors.notFound,
      },
      {
        id: 'ae.500',
        labelKey: 'nav.authErrors.serverError',
        fallback: '500',
        to: urls.app.pages.authErrors.serverError,
      },
      {
        id: 'ae.403',
        labelKey: 'nav.authErrors.forbidden',
        fallback: '403',
        to: urls.app.pages.authErrors.forbidden,
      },
    ],
  },
];

export const UI_TREE: NavNode[] = [
  {
    id: 'tokens',
    labelKey: 'nav.ui.tokens',
    fallback: 'Styling tokens',
    icon: Palette,
    children: [
      {
        id: 'tk.overview',
        labelKey: 'nav.ui.tk.overview',
        fallback: 'Overview',
        to: urls.app.ui.tokens.root,
        end: true,
      },
      {
        id: 'tk.colors',
        labelKey: 'nav.ui.tk.colors',
        fallback: 'Colors',
        to: urls.app.ui.tokens.colors,
      },
      {
        id: 'tk.presets',
        labelKey: 'nav.ui.tk.presets',
        fallback: 'Theme presets',
        to: urls.app.ui.tokens.presets,
      },
      {
        id: 'tk.typography',
        labelKey: 'nav.ui.tk.typography',
        fallback: 'Typography',
        to: urls.app.ui.tokens.typography,
      },
      {
        id: 'tk.spacing',
        labelKey: 'nav.ui.tk.spacing',
        fallback: 'Spacing',
        to: urls.app.ui.tokens.spacing,
      },
      {
        id: 'tk.radius',
        labelKey: 'nav.ui.tk.radius',
        fallback: 'Radius',
        to: urls.app.ui.tokens.radius,
      },
      {
        id: 'tk.shadow',
        labelKey: 'nav.ui.tk.shadow',
        fallback: 'Shadow',
        to: urls.app.ui.tokens.shadow,
      },
      {
        id: 'tk.breakpoints',
        labelKey: 'nav.ui.tk.breakpoints',
        fallback: 'Breakpoints',
        to: urls.app.ui.tokens.breakpoints,
      },
    ],
  },
  {
    id: 'components',
    labelKey: 'nav.ui.components',
    fallback: 'Core components',
    icon: Boxes,
    children: [
      {
        id: 'c.button',
        labelKey: 'nav.ui.c.button',
        fallback: 'Button',
        to: urls.app.ui.components.button,
      },
      {
        id: 'c.input',
        labelKey: 'nav.ui.c.input',
        fallback: 'Input & Textarea',
        to: urls.app.ui.components.input,
      },
      {
        id: 'c.form',
        labelKey: 'nav.ui.c.form',
        fallback: 'Form',
        to: urls.app.ui.components.form,
      },
      {
        id: 'c.select',
        labelKey: 'nav.ui.c.select',
        fallback: 'Select & Combobox',
        to: urls.app.ui.components.select,
      },
      {
        id: 'c.dialog',
        labelKey: 'nav.ui.c.dialog',
        fallback: 'Dialog / Drawer',
        to: urls.app.ui.components.dialog,
      },
      {
        id: 'c.table',
        labelKey: 'nav.ui.c.table',
        fallback: 'Table',
        to: urls.app.ui.components.table,
      },
      {
        id: 'c.card',
        labelKey: 'nav.ui.c.card',
        fallback: 'Card',
        to: urls.app.ui.components.card,
      },
      {
        id: 'c.badge',
        labelKey: 'nav.ui.c.badge',
        fallback: 'Badge & Avatar',
        to: urls.app.ui.components.badge,
      },
      {
        id: 'c.tabs',
        labelKey: 'nav.ui.c.tabs',
        fallback: 'Tabs & Accordion',
        to: urls.app.ui.components.tabs,
      },
      {
        id: 'c.toast',
        labelKey: 'nav.ui.c.toast',
        fallback: 'Toast & Alert',
        to: urls.app.ui.components.toast,
      },
      {
        id: 'c.tooltip',
        labelKey: 'nav.ui.c.tooltip',
        fallback: 'Tooltip',
        to: urls.app.ui.components.tooltip,
      },
      {
        id: 'c.dropdownMenu',
        labelKey: 'nav.ui.c.dropdownMenu',
        fallback: 'Dropdown menu',
        to: urls.app.ui.components.dropdownMenu,
      },
      {
        id: 'c.datePicker',
        labelKey: 'nav.ui.c.datePicker',
        fallback: 'Date picker',
        to: urls.app.ui.components.datePicker,
      },
      {
        id: 'c.pagination',
        labelKey: 'nav.ui.c.pagination',
        fallback: 'Pagination',
        to: urls.app.ui.components.pagination,
      },
      {
        id: 'c.skeleton',
        labelKey: 'nav.ui.c.skeleton',
        fallback: 'Skeleton',
        to: urls.app.ui.components.skeleton,
      },
      {
        id: 'c.emptyState',
        labelKey: 'nav.ui.c.emptyState',
        fallback: 'Empty state',
        to: urls.app.ui.components.emptyState,
      },
      {
        id: 'c.pinInput',
        labelKey: 'nav.ui.c.pinInput',
        fallback: 'PIN / OTP',
        to: urls.app.ui.components.pinInput,
      },
      {
        id: 'c.fileUpload',
        labelKey: 'nav.ui.c.fileUpload',
        fallback: 'File upload',
        to: urls.app.ui.components.fileUpload,
      },
      {
        id: 'c.statCard',
        labelKey: 'nav.ui.c.statCard',
        fallback: 'Stat card',
        to: urls.app.ui.components.statCard,
      },
      {
        id: 'c.icons',
        labelKey: 'nav.ui.c.icons',
        fallback: 'Icons',
        to: urls.app.ui.components.icons,
      },
      {
        id: 'c.charts',
        labelKey: 'nav.ui.c.charts',
        fallback: 'Charts',
        to: urls.app.ui.components.charts,
      },
      {
        id: 'c.media',
        labelKey: 'nav.ui.c.media',
        fallback: 'Media & layout',
        to: urls.app.ui.components.media,
      },
      {
        id: 'c.richInputs',
        labelKey: 'nav.ui.c.richInputs',
        fallback: 'Rich inputs',
        to: urls.app.ui.components.richInputs,
      },
    ],
  },
  {
    id: 'examples',
    labelKey: 'nav.ui.examples',
    fallback: 'Example components',
    icon: Layers,
    children: [
      {
        id: 'ex.inputs',
        labelKey: 'nav.ui.ex.inputs',
        fallback: 'Inputs',
        to: urls.app.ui.examples.inputs,
      },
      {
        id: 'ex.overlays',
        labelKey: 'nav.ui.ex.overlays',
        fallback: 'Overlays',
        to: urls.app.ui.examples.overlays,
      },
      {
        id: 'ex.navigation',
        labelKey: 'nav.ui.ex.navigation',
        fallback: 'Navigation',
        to: urls.app.ui.examples.navigation,
      },
      {
        id: 'ex.data',
        labelKey: 'nav.ui.ex.data',
        fallback: 'Data display',
        to: urls.app.ui.examples.data,
      },
      {
        id: 'ex.feedback',
        labelKey: 'nav.ui.ex.feedback',
        fallback: 'Feedback',
        to: urls.app.ui.examples.feedback,
      },
      {
        id: 'ex.layout',
        labelKey: 'nav.ui.ex.layout',
        fallback: 'Layout',
        to: urls.app.ui.examples.layout,
      },
      {
        id: 'ex.patterns',
        labelKey: 'nav.ui.ex.patterns',
        fallback: 'Patterns',
        to: urls.app.ui.examples.patterns,
      },
      {
        id: 'ex.pageTransitions',
        labelKey: 'nav.ui.ex.pageTransitions',
        fallback: 'Page transitions',
        to: urls.app.ui.examples.pageTransitions,
      },
      {
        id: 'ex.marketingBlocks',
        labelKey: 'nav.ui.ex.marketingBlocks',
        fallback: 'Marketing blocks',
        to: urls.app.ui.examples.marketingBlocks,
      },
      {
        id: 'ex.animations',
        labelKey: 'nav.ui.ex.animations',
        fallback: 'Animations',
        to: urls.app.ui.examples.animations,
      },
    ],
  },
];

export const TOP_TREE: NavNode[] = [
  {
    id: 'dashboards',
    labelKey: 'nav.dashboards.group',
    fallback: 'Dashboards',
    icon: Gauge,
    children: [
      {
        id: 'dashboards.overview',
        labelKey: 'nav.dashboards.overview',
        fallback: 'Overview',
        to: urls.app.dashboard,
        end: true,
      },
      {
        id: 'dashboards.edu',
        labelKey: 'nav.dashboards.edu',
        fallback: 'Edu',
        to: urls.app.dashboards.edu,
      },
      {
        id: 'dashboards.ecommerce',
        labelKey: 'nav.dashboards.ecommerce',
        fallback: 'E‑commerce',
        to: urls.app.dashboards.ecommerce,
      },
      {
        id: 'dashboards.saas',
        labelKey: 'nav.dashboards.saas',
        fallback: 'SaaS',
        to: urls.app.dashboards.saas,
      },
      {
        id: 'dashboards.finance',
        labelKey: 'nav.dashboards.finance',
        fallback: 'Finance',
        to: urls.app.dashboards.finance,
      },
      {
        id: 'dashboards.project',
        labelKey: 'nav.dashboards.project',
        fallback: 'Project',
        to: urls.app.dashboards.project,
      },
      {
        id: 'dashboards.health',
        labelKey: 'nav.dashboards.health',
        fallback: 'Healthcare',
        to: urls.app.dashboards.health,
      },
      {
        id: 'dashboards.social',
        labelKey: 'nav.dashboards.social',
        fallback: 'Social',
        to: urls.app.dashboards.social,
      },
      {
        id: 'dashboards.marketing',
        labelKey: 'nav.dashboards.marketing',
        fallback: 'Marketing',
        to: urls.app.dashboards.marketing,
      },
      {
        id: 'dashboards.vehicle',
        labelKey: 'nav.dashboards.vehicle',
        fallback: 'Vehicle',
        to: urls.app.dashboards.vehicle,
      },
      {
        id: 'dashboards.crm',
        labelKey: 'nav.dashboards.crm',
        fallback: 'CRM',
        to: urls.app.dashboards.crm,
      },
    ],
  },
];

/**
 * Flatten a nav tree to leaves with `to`, carrying the nearest ancestor icon for command palette / quick links.
 */
export function flattenNavLeaves(tree: NavNode[], parentIcon?: LucideIcon): FlatNavLeaf[] {
  return tree.flatMap((node) => {
    const icon = node.icon ?? parentIcon;
    if (node.children?.length) {
      return flattenNavLeaves(node.children, icon);
    }
    if (node.to) {
      return [
        {
          id: node.id,
          labelKey: node.labelKey,
          fallback: node.fallback,
          to: node.to,
          end: node.end,
          icon,
        },
      ];
    }
    return [];
  });
}

export function nodeMatchesPath(node: NavNode, pathname: string): boolean {
  if (node.to) {
    if (node.end) return pathname === node.to;
    return pathname === node.to || pathname.startsWith(`${node.to}/`);
  }
  return (node.children ?? []).some((child) => nodeMatchesPath(child, pathname));
}
