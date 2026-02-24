import { UUID } from 'crypto';
import { IApiLocation } from './types';
import { ajax, prepareAjax } from '@/shared/api/ajax';
import { POST } from '@/shared/config/constants';

export const readLocations = (nameFilter?: string | null) => {
  const query = new URLSearchParams();
  if (nameFilter) {
    query.append('name', nameFilter);
  }

  return ajax<ReadonlyArray<IApiLocation>>(`/api/locations?${query}`);
};

export const readLocationById = (locId: UUID) => ajax<IApiLocation>(`/api/locations/${locId}`);

export const addLocation = (data: IApiLocation) =>
  ajax<UUID>('/api/locations', prepareAjax(data, POST));
