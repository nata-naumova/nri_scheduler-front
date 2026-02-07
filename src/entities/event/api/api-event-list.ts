import { ajax } from '@/shared/api/ajax';
import { IEventsFilter } from './types';
import { IApiShortEvent } from '@/shared/api';

export const readEventsList = (
  date_from: string,
  date_to: string,
  filters?: IEventsFilter | null,
) => {
  const query: Record<string, string> = { date_from, date_to };

  if (filters) {
    Object.entries(filters).forEach(([key, val]) => {
      if (val !== null && val !== undefined && val !== '') {
        query[key] = Array.isArray(val) ? val.join() : val;
      }
    });
  }

  return ajax<ReadonlyArray<IApiShortEvent>>(`/api/events?${new URLSearchParams(query)}`);
};
