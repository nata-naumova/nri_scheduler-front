import { useState } from 'react';
import { IMasterApp, IPlayerApp } from '@/entities/user/api/types';
import { readPlayerAppsList } from '@/entities/user/api/api-player';
import { readMasterAppsList } from '@/entities/user/api/api-master';

export const useEventApplications = () => {
  const [playerAppList, setPlayerAppList] = useState<IPlayerApp[]>([]);
  const [masterAppList, setMasterAppList] = useState<IMasterApp[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async (eventsType: boolean, abortController?: AbortController) => {
    try {
      setLoading(true);

      const response = eventsType
        ? await readPlayerAppsList(abortController)
        : await readMasterAppsList(abortController);

      if (response?.payload) {
        if (eventsType) setPlayerAppList(response.payload);
        else setMasterAppList(response.payload);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    playerAppList,
    masterAppList,
    loading,
    load,
  };
};
