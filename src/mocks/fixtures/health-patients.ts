export type PatientRisk = 'low' | 'med' | 'high';

export interface SamplePatient {
  id: string;
  name: string;
  age: number;
  gender: 'F' | 'M' | 'NB';
  lastVisit: string;
  condition: string;
  risk: PatientRisk;
  mrn: string;
}

export const samplePatients: SamplePatient[] = [
  {
    id: 'p-1001',
    name: 'Nora Kim',
    age: 42,
    gender: 'F',
    lastVisit: '2026-04-12',
    condition: 'Hypertension',
    risk: 'med',
    mrn: 'MRN-1001',
  },
  {
    id: 'p-1002',
    name: 'Jorge Pérez',
    age: 31,
    gender: 'M',
    lastVisit: '2026-03-22',
    condition: 'Asthma',
    risk: 'low',
    mrn: 'MRN-1002',
  },
  {
    id: 'p-1003',
    name: 'Aisha Khan',
    age: 55,
    gender: 'F',
    lastVisit: '2026-04-18',
    condition: 'Type 2 diabetes',
    risk: 'high',
    mrn: 'MRN-1003',
  },
  {
    id: 'p-1004',
    name: "Liam O'Connor",
    age: 28,
    gender: 'M',
    lastVisit: '2026-02-10',
    condition: 'Migraine',
    risk: 'low',
    mrn: 'MRN-1004',
  },
  {
    id: 'p-1005',
    name: 'Sofia Martins',
    age: 67,
    gender: 'F',
    lastVisit: '2026-04-01',
    condition: 'COPD',
    risk: 'high',
    mrn: 'MRN-1005',
  },
];

export function getSamplePatient(id: string): SamplePatient | undefined {
  return samplePatients.find((p) => p.id === id);
}
