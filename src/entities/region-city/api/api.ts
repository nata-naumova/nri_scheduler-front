import { ajax, prepareAjax } from '@/shared/api/ajax';
import { IApiCity, IApiRegion } from './types';
import { POST } from '@/shared/config/constants';

export const readRegionsList = () => {
  return ajax<ReadonlyArray<IApiRegion>>(`/api/regions`);
};

export const addRegion = (name: string, timezone: string) => {
  return ajax<null>(`/api/regions`, prepareAjax({ name, timezone }, POST));
};

export const readCitiesList = (region?: string | null) => {
  const query = new URLSearchParams();

  if (region) {
    query.set('region', region);
  }

  return ajax<ReadonlyArray<IApiCity>>(`/api/cities?${query}`);
};

export const addCity = (name: string, region: string, own_timezone?: string | null) => {
  return ajax<null>(`/api/cities`, prepareAjax({ name, region, own_timezone }, POST));
};
