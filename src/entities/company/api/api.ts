import { ajax, prepareAjax } from '@/shared/api/ajax';
import { IApiCompany, IApiCompanyInfo, IApiStyledCompany } from './types';
import { UUID } from 'crypto';
import { POST, PUT } from '@/shared/config/constants';

export const readMyCompanies = (nameFilter?: string | null, abortController?: AbortController) => {
  const query = new URLSearchParams();
  if (nameFilter) {
    query.append('name', nameFilter);
  }

  return ajax<ReadonlyArray<IApiCompany>>(`/api/companies/my?${query}`, undefined, abortController);
};

export const readCompanyById = (companyId: UUID) =>
  ajax<IApiCompanyInfo>(`/api/companies/${companyId}`);

export const addCompany = (
  name: string,
  system: string,
  data: Partial<Omit<IApiStyledCompany, 'id' | 'master' | 'name' | 'system' | 'cover_link'>>,
) => ajax<UUID>('/api/companies', prepareAjax({ name, system, ...data }, POST));

export const updateCompany = (
  companyId: UUID,
  data: Partial<Omit<IApiStyledCompany, 'id' | 'master' | 'cover_link'>>,
) => {
  return ajax<null>(`/api/companies/${companyId}`, prepareAjax(data, PUT));
};

export const setCompanyCover = (companyId: UUID, url: string) =>
  ajax<null>(`/api/companies/${companyId}/cover`, prepareAjax({ url }, PUT));
