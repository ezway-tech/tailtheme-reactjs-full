export type EduClassStatus = 'live' | 'upcoming' | 'archived';

export interface SampleEduClass {
  id: string;
  name: string;
  teacher: string;
  students: number;
  schedule: string;
  status: EduClassStatus;
  room: string;
  description: string;
}

export const sampleEduClasses: SampleEduClass[] = [
  {
    id: 'c-1',
    name: 'Design Systems',
    teacher: 'Maria Garcia',
    students: 24,
    schedule: 'Mon · Wed · 10:00',
    status: 'live',
    room: 'Studio A',
    description: 'Token pipelines, component APIs, and documentation for cross-functional teams.',
  },
  {
    id: 'c-2',
    name: 'React Advanced',
    teacher: 'Alex Nguyen',
    students: 32,
    schedule: 'Tue · Thu · 14:00',
    status: 'live',
    room: 'Lab 3',
    description:
      'Concurrent features, composition patterns, and performance profiling in React 19.',
  },
  {
    id: 'c-3',
    name: 'A11y Foundations',
    teacher: 'Aisha Khan',
    students: 18,
    schedule: 'Fri · 09:00',
    status: 'upcoming',
    room: 'Room 12',
    description: 'WCAG principles, keyboard flows, and assistive technology testing.',
  },
  {
    id: 'c-4',
    name: 'UX Research',
    teacher: 'Layla Ahmed',
    students: 15,
    schedule: 'Wed · 16:00',
    status: 'live',
    room: 'Studio B',
    description: 'Interviews, usability tests, and synthesis workshops.',
  },
  {
    id: 'c-5',
    name: 'Motion & Animation',
    teacher: 'Hiro Tanaka',
    students: 22,
    schedule: 'Sat · 11:00',
    status: 'upcoming',
    room: 'Lab 1',
    description: 'Motion design for the web with reduced-motion fallbacks.',
  },
  {
    id: 'c-6',
    name: 'Writing for Dev',
    teacher: 'Priya Patel',
    students: 12,
    schedule: 'Tue · 18:00',
    status: 'archived',
    room: 'Online',
    description: 'Docs, changelogs, and in-product UX copy for engineers.',
  },
];

export function getSampleEduClass(id: string): SampleEduClass | undefined {
  return sampleEduClasses.find((c) => c.id === id);
}
