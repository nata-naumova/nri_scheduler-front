import { useState } from 'react';
import { IApiCompany } from '@/entities/company/api/types';
import { readMyCompanies } from '@/entities/company/api/api';

export const useMyCompanies = () => {
  const [companies, setCompanies] = useState<ReadonlyArray<IApiCompany>>([]);
  const [loading, setLoading] = useState(false);

  const load = async (abortController?: AbortController) => {
    try {
      setLoading(true);
      const response = await readMyCompanies(null, abortController);
      if (response?.payload) setCompanies(response.payload);
    } finally {
      setLoading(false);
    }
  };

  return { companies, loading, load };
};
