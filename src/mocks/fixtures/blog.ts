export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  tags: string[];
  readTime: string;
  publishedAt: string;
  hero: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'theming-tokens',
    title: 'Theming with tokens: a practical guide',
    excerpt:
      'How to model color, spacing, and typography as tokens — and why it pays off for multi-brand apps.',
    author: 'Alex Nguyen',
    tags: ['theming', 'design'],
    readTime: '6 min',
    publishedAt: 'Apr 18, 2026',
    hero: 'bg-gradient-to-br from-primary to-accent',
  },
  {
    slug: 'nested-sidebar',
    title: 'Building a nested collapsible sidebar',
    excerpt:
      'Lessons from migrating three top-level areas into a single AppShell without losing a11y.',
    author: 'Maria Garcia',
    tags: ['architecture', 'a11y'],
    readTime: '9 min',
    publishedAt: 'Apr 11, 2026',
    hero: 'bg-gradient-to-br from-sky-500 to-indigo-600',
  },
  {
    slug: 'content-visibility',
    title: 'content-visibility: a free perf win',
    excerpt: 'A tiny CSS property that can dramatically reduce render cost on long pages.',
    author: 'Hiro Tanaka',
    tags: ['performance'],
    readTime: '4 min',
    publishedAt: 'Apr 03, 2026',
    hero: 'bg-gradient-to-br from-emerald-500 to-lime-500',
  },
  {
    slug: 'forms-that-dont-suck',
    title: "Forms that don't suck: composition over config",
    excerpt:
      'Why composition beats a giant config schema for real-world forms, and how to migrate.',
    author: 'Priya Patel',
    tags: ['forms', 'dx'],
    readTime: '7 min',
    publishedAt: 'Mar 27, 2026',
    hero: 'bg-gradient-to-br from-amber-500 to-rose-500',
  },
];
