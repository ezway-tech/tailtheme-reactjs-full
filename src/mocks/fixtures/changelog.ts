export type ChangelogEntryType = 'new' | 'improved' | 'fixed';

export interface ChangelogItem {
  type: ChangelogEntryType;
  text: string;
}

export interface ChangelogRelease {
  version: string;
  date: string;
  title?: string;
  items: ChangelogItem[];
}

export const CHANGELOG_RELEASES: ChangelogRelease[] = [
  {
    version: '0.2.0',
    date: '2026-05-19',
    title: 'Template depth pass',
    items: [
      { type: 'new', text: 'Date range picker, rich text editor, and image crop primitives.' },
      { type: 'new', text: 'Marketing FAQ, changelog, and legal pages.' },
      { type: 'improved', text: 'Dark-mode shadows and typography preset classes.' },
      { type: 'fixed', text: 'Calendar TypeScript props and layout variant typing.' },
    ],
  },
  {
    version: '0.1.2',
    date: '2026-04-02',
    items: [
      { type: 'improved', text: 'Command palette groups and keyboard shortcuts overlay.' },
      { type: 'fixed', text: 'RTL sidebar collapse overlap on tablet breakpoints.' },
    ],
  },
  {
    version: '0.1.0',
    date: '2026-03-10',
    title: 'Initial public preview',
    items: [
      { type: 'new', text: 'Nine vertical dashboards and 50+ themed demo pages.' },
      { type: 'new', text: 'Runtime theme customizer with 16 palette presets.' },
      { type: 'new', text: 'i18n (English + Vietnamese) and view transitions.' },
    ],
  },
];
