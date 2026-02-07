import { ajax } from '@/shared/api/ajax';
import { IPlayerApp } from './types';
import { UUID } from 'crypto';

export const readPlayerAppsList = (abortController?: AbortController) =>
  ajax<ReadonlyArray<IPlayerApp>>(`/api/apps`, null, abortController);
export const readPlayerApp = (appId: UUID) => ajax<IPlayerApp | null>(`/api/apps/${appId}`);
export const readPlayerAppByEvent = (eventId: UUID) =>
  ajax<IPlayerApp | null>(`/api/apps/by_event/${eventId}`);
export const readPlayerAppCompanyClosest = (companyId: UUID) =>
  ajax<IPlayerApp | null>(`/api/apps/company_closest/${companyId}`);
