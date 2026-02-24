import { IApiCompany } from '@/entities/company/api/types';
import { IEventStyle } from '@/shared/utils';

export interface CompanyFormValues extends IApiCompany {
  style: IEventStyle;
}
