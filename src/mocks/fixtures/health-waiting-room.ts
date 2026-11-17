export type WaitingStatus = 'checked-in' | 'in-room' | 'called';

export interface WaitingRoomEntry {
  id: string;
  patient: string;
  reason: string;
  position: number;
  etaMinutes: number;
  status: WaitingStatus;
}

export const waitingRoomQueue: WaitingRoomEntry[] = [
  {
    id: 'wr-1',
    patient: 'Nora Kim',
    reason: 'Follow-up · Cardio',
    position: 1,
    etaMinutes: 5,
    status: 'called',
  },
  {
    id: 'wr-2',
    patient: 'Jorge Pérez',
    reason: 'Initial consult',
    position: 2,
    etaMinutes: 18,
    status: 'checked-in',
  },
  {
    id: 'wr-3',
    patient: 'Chen Wei',
    reason: 'Annual physical',
    position: 3,
    etaMinutes: 32,
    status: 'checked-in',
  },
  {
    id: 'wr-4',
    patient: 'Priya Patel',
    reason: 'Lab review',
    position: 4,
    etaMinutes: 48,
    status: 'in-room',
  },
];
