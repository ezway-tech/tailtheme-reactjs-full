export type AssignmentStatus = 'open' | 'submitted' | 'graded' | 'overdue';

export interface SampleAssignment {
  id: string;
  title: string;
  course: string;
  due: string;
  status: AssignmentStatus;
  grade?: string;
  rubric: string[];
  maxPoints: number;
}

export const sampleAssignments: SampleAssignment[] = [
  {
    id: 'a-1',
    title: 'Essay: intro to design tokens',
    course: 'Design systems 101',
    due: 'Apr 24',
    status: 'open',
    maxPoints: 100,
    rubric: ['Clear thesis', 'Token examples', 'Accessibility note'],
  },
  {
    id: 'a-2',
    title: 'Refactor the login form',
    course: 'React advanced',
    due: 'Apr 20',
    status: 'overdue',
    maxPoints: 50,
    rubric: ['Hooks rules', 'Error states', 'Tests'],
  },
  {
    id: 'a-3',
    title: 'Quiz: typography',
    course: 'Design systems 101',
    due: 'Apr 18',
    status: 'submitted',
    maxPoints: 30,
    rubric: ['Scale consistency', 'Contrast'],
  },
  {
    id: 'a-4',
    title: 'A11y audit',
    course: 'A11y foundations',
    due: 'Apr 15',
    status: 'graded',
    grade: 'A-',
    maxPoints: 80,
    rubric: ['Keyboard', 'Screen reader', 'Report quality'],
  },
  {
    id: 'a-5',
    title: 'Component library pitch',
    course: 'UX research',
    due: 'Apr 28',
    status: 'open',
    maxPoints: 60,
    rubric: ['Problem framing', 'Evidence', 'Next steps'],
  },
];

export function getSampleAssignment(id: string): SampleAssignment | undefined {
  return sampleAssignments.find((a) => a.id === id);
}
