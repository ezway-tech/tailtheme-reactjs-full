export interface SocialGroup {
  id: string;
  name: string;
  members: number;
  description: string;
  visibility: 'public' | 'private';
}

export const socialGroups: SocialGroup[] = [
  {
    id: 'g-1',
    name: 'Tailwind Builders',
    members: 1240,
    description: 'Tips, plugins, and UI patterns for Tailwind CSS v4.',
    visibility: 'public',
  },
  {
    id: 'g-2',
    name: 'React 19 Early Access',
    members: 890,
    description: 'Discussing concurrent features and compiler wins.',
    visibility: 'public',
  },
  {
    id: 'g-3',
    name: 'Design Systems Guild',
    members: 412,
    description: 'Tokens, Figma, and engineering handoff.',
    visibility: 'private',
  },
];

export function getSocialGroup(id: string): SocialGroup | undefined {
  return socialGroups.find((g) => g.id === id);
}
