import { IPlayerApp } from './types';

export const MOCK_PLAYER_APPS: IPlayerApp[] = [
  {
    id: '523e4567-e89b-12d3-a456-426614174001',
    event_id: '1',
    event_date: '2026-02-15T19:00:00Z',
    event_cancelled: false,

    company_id: '1',
    company_name: 'Антикафе "Тайм-кафе"',

    location_id: '1',
    location_name: 'Центральный филиал',

    approval: true,
    role: 'player',

    master_id: '1',
    master_name: 'Алексей Петров',
  },
];

export const readPlayerAppsList = (
  abortController?: AbortController,
): Promise<{ payload: IPlayerApp[] }> => {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      if (abortController?.signal.aborted) {
        reject(new Error('Aborted'));
        return;
      }
      resolve({ payload: MOCK_PLAYER_APPS });
    }, 500);

    abortController?.signal.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject(new Error('Abotred'));
    });
  });
};
