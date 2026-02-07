import { ajax } from '@/shared/api/ajax';
import { IMasterApp } from './types';
import { UUID } from 'crypto';

export const readMasterAppsList = (abortController?: AbortController) =>
  ajax<ReadonlyArray<IMasterApp>>(`/api/apps/master`, null, abortController);
export const readMasterAppsListByEvent = (eventId: UUID) =>
  ajax<ReadonlyArray<IMasterApp>>(`/api/apps/master/by_event/${eventId}`);
export const readMasterAppsListCompanyClosest = (companyId: UUID) =>
  ajax<ReadonlyArray<IMasterApp>>(`/api/apps/master/company_closest/${companyId}`);
export const readMasterApp = (appId: UUID) => ajax<IMasterApp | null>(`/api/apps/master/${appId}`);
