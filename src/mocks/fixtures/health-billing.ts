export type ClaimStatus = 'paid' | 'pending' | 'denied';

export interface HealthClaim {
  id: string;
  service: string;
  date: string;
  amount: number;
  patientOwes: number;
  status: ClaimStatus;
}

export const healthClaims: HealthClaim[] = [
  {
    id: 'clm-1',
    service: 'Office visit · follow-up',
    date: '2026-04-12',
    amount: 185,
    patientOwes: 25,
    status: 'paid',
  },
  {
    id: 'clm-2',
    service: 'Lab panel · metabolic',
    date: '2026-04-18',
    amount: 240,
    patientOwes: 40,
    status: 'pending',
  },
  {
    id: 'clm-3',
    service: 'Telehealth consult',
    date: '2026-03-22',
    amount: 95,
    patientOwes: 15,
    status: 'paid',
  },
  {
    id: 'clm-4',
    service: 'Imaging · chest X-ray',
    date: '2026-02-10',
    amount: 320,
    patientOwes: 80,
    status: 'denied',
  },
];

export const healthBillingSummary = {
  ytdBilled: 2840,
  patientResponsibility: 412,
  pendingClaims: 2,
};
