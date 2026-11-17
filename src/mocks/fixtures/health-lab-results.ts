export type LabFlag = 'normal' | 'high' | 'low';

export interface HealthLabResult {
  id: string;
  test: string;
  value: string;
  range: string;
  flag: LabFlag;
  date: string;
}

export const healthLabResults: HealthLabResult[] = [
  {
    id: 'lab-1',
    test: 'HbA1c',
    value: '7.2%',
    range: '4.0–5.6%',
    flag: 'high',
    date: '2026-04-18',
  },
  {
    id: 'lab-2',
    test: 'LDL cholesterol',
    value: '118 mg/dL',
    range: '< 100 mg/dL',
    flag: 'high',
    date: '2026-04-18',
  },
  {
    id: 'lab-3',
    test: 'TSH',
    value: '2.1 mIU/L',
    range: '0.4–4.0 mIU/L',
    flag: 'normal',
    date: '2026-04-12',
  },
  {
    id: 'lab-4',
    test: 'Vitamin D',
    value: '18 ng/mL',
    range: '30–100 ng/mL',
    flag: 'low',
    date: '2026-03-22',
  },
  {
    id: 'lab-5',
    test: 'Creatinine',
    value: '0.9 mg/dL',
    range: '0.6–1.2 mg/dL',
    flag: 'normal',
    date: '2026-04-01',
  },
];
