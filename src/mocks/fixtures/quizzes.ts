export interface QuizChoice {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  type: 'single' | 'multiple';
  prompt: string;
  choices: QuizChoice[];
  correctIds: string[];
}

export interface SampleQuiz {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  passingScore: number;
  questions: QuizQuestion[];
}

export const sampleQuizzes: SampleQuiz[] = [
  {
    id: 'q-1',
    title: 'TypeScript Fundamentals',
    description: 'Check your understanding of TypeScript basics.',
    durationMinutes: 10,
    passingScore: 60,
    questions: [
      {
        id: 'q-1-1',
        type: 'single',
        prompt: 'Which keyword declares a read-only property on a class?',
        choices: [
          { id: 'a', label: 'const' },
          { id: 'b', label: 'readonly' },
          { id: 'c', label: 'final' },
          { id: 'd', label: 'immutable' },
        ],
        correctIds: ['b'],
      },
      {
        id: 'q-1-2',
        type: 'multiple',
        prompt: 'Which of the following are valid TypeScript utility types? (select all)',
        choices: [
          { id: 'a', label: 'Partial<T>' },
          { id: 'b', label: 'Maybe<T>' },
          { id: 'c', label: 'Required<T>' },
          { id: 'd', label: 'Pick<T, K>' },
        ],
        correctIds: ['a', 'c', 'd'],
      },
      {
        id: 'q-1-3',
        type: 'single',
        prompt: 'What is the difference between `unknown` and `any`?',
        choices: [
          { id: 'a', label: 'They are identical' },
          {
            id: 'b',
            label: '`unknown` requires type narrowing before use, `any` does not',
          },
          { id: 'c', label: '`any` is safer than `unknown`' },
          { id: 'd', label: '`unknown` cannot appear in generics' },
        ],
        correctIds: ['b'],
      },
      {
        id: 'q-1-4',
        type: 'single',
        prompt: 'Which type describes "any value except null/undefined"?',
        choices: [
          { id: 'a', label: 'any' },
          { id: 'b', label: 'unknown' },
          { id: 'c', label: 'NonNullable<unknown>' },
          { id: 'd', label: 'object' },
        ],
        correctIds: ['c'],
      },
      {
        id: 'q-1-5',
        type: 'single',
        prompt: '`as const` applied to an object literal does what?',
        choices: [
          { id: 'a', label: 'Freezes the object at runtime' },
          { id: 'b', label: 'Marks all properties as readonly and narrows literal types' },
          { id: 'c', label: 'Converts it to a JSON string' },
          { id: 'd', label: 'Creates an enum' },
        ],
        correctIds: ['b'],
      },
    ],
  },
];

export function findQuiz(id: string): SampleQuiz | undefined {
  return sampleQuizzes.find((q) => q.id === id);
}
