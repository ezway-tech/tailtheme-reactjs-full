import { PageHeader } from '@/components/patterns';
import { FaqSection, type FaqItem } from '@/components/patterns/marketing';

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Can I use TailTheme in commercial projects?',
    answer:
      'Yes. The template is designed for buyer products — swap branding, tokens, and copy. Check your license tier for redistribution limits.',
  },
  {
    question: 'Does it include a backend or API?',
    answer:
      'No. All data is mocked in src/mocks/fixtures. Wire your own API or Supabase/Firebase; patterns stay the same.',
  },
  {
    question: 'How does dark mode work?',
    answer:
      'Runtime theme via PreferencesProvider and CSS variables. Both .dark class and data-theme="dark" are supported for gradual migration.',
  },
  {
    question: 'Is the template accessible?',
    answer:
      'We target WCAG AA: focus rings, skip links, reduced motion, and semantic landmarks. Run your own audit before launch.',
  },
  {
    question: 'Which browsers are supported?',
    answer: 'Modern evergreen browsers (Chrome, Firefox, Safari, Edge). IE is not supported.',
  },
  {
    question: 'How do I add a new vertical theme?',
    answer:
      'Add routes under src/routes, pages under src/pages/pages/<theme>, and a branch in app-nav-tree.ts. Reuse patterns from SaaS or E-commerce.',
  },
];

export default function FaqPage() {
  return (
    <div className="space-y-0">
      <div className="px-6 pt-6">
        <PageHeader
          title="FAQ"
          description="Answers to common questions about licensing, stack, and customization."
        />
      </div>
      <FaqSection items={FAQ_ITEMS} className="pt-0" />
    </div>
  );
}
