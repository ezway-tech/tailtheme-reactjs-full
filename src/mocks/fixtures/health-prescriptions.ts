export type PrescriptionStatus = 'active' | 'pending' | 'expired';

export interface HealthPrescription {
  id: string;
  patient: string;
  drug: string;
  dose: string;
  status: PrescriptionStatus;
  refillsLeft: number;
}

export const healthPrescriptions: HealthPrescription[] = [
  {
    id: 'rx-1',
    patient: 'Nora Kim',
    drug: 'Lisinopril',
    dose: '10 mg · daily',
    status: 'active',
    refillsLeft: 2,
  },
  {
    id: 'rx-2',
    patient: 'Jorge Pérez',
    drug: 'Albuterol inhaler',
    dose: '2 puffs · PRN',
    status: 'active',
    refillsLeft: 0,
  },
  {
    id: 'rx-3',
    patient: 'Aisha Khan',
    drug: 'Metformin',
    dose: '500 mg · twice daily',
    status: 'pending',
    refillsLeft: 3,
  },
  {
    id: 'rx-4',
    patient: "Liam O'Connor",
    drug: 'Sumatriptan',
    dose: '50 mg · PRN',
    status: 'expired',
    refillsLeft: 0,
  },
  {
    id: 'rx-5',
    patient: 'Sofia Martins',
    drug: 'Tiotropium',
    dose: '18 mcg · daily',
    status: 'active',
    refillsLeft: 1,
  },
];
