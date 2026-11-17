export interface SocialPost {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
}

export const socialPosts: SocialPost[] = [
  {
    id: 'p-1',
    author: 'Maria Garcia',
    handle: '@maria',
    avatar: 'https://i.pravatar.cc/64?img=5',
    time: '2h',
    content: 'Shipped a new theming guide. Tokens > hard-coded values every single time 🎨',
    likes: 24,
    comments: 5,
    shares: 2,
  },
  {
    id: 'p-2',
    author: 'Alex Nguyen',
    handle: '@alex',
    avatar: 'https://i.pravatar.cc/64?img=1',
    time: '5h',
    content: 'TIL: `content-visibility: auto` is a free perf win for long pages. 🚀',
    likes: 58,
    comments: 11,
    shares: 8,
  },
  {
    id: 'p-3',
    author: 'Hiro Tanaka',
    handle: '@hiro',
    avatar: 'https://i.pravatar.cc/64?img=3',
    time: '1d',
    content:
      'Working on a new dashboard UI using TailTheme primitives. The Sidebar collapsible nav is 🔥',
    likes: 142,
    comments: 28,
    shares: 19,
  },
];

export function getSocialPost(id: string): SocialPost | undefined {
  return socialPosts.find((p) => p.id === id);
}

export const socialPostComments: Record<
  string,
  { id: string; author: string; text: string; time: string }[]
> = {
  'p-1': [
    { id: 'c1', author: 'Alex', text: 'Saving this for our design review.', time: '1h' },
    { id: 'c2', author: 'Priya', text: 'Do you have a Figma plugin link?', time: '45m' },
  ],
  'p-2': [{ id: 'c3', author: 'Hiro', text: 'Huge win on long tables too.', time: '3h' }],
  'p-3': [
    { id: 'c4', author: 'Maria', text: 'The command palette is chef kiss.', time: '20h' },
    { id: 'c5', author: 'Sam', text: 'Which theme preset are you on?', time: '18h' },
  ],
};
