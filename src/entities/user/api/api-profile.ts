import { IApiProfile, IApiShortProfile, IApiUserPair, ITouchesFilter } from './types';
import { ajax, prepareAjax } from '@/shared/api/ajax';
import { IApiResponse } from '@/shared/api/types';
import { API_HOST, PUT } from '@/shared/config/constants';

export const getMyProfile = () => ajax<IApiProfile>(`/api/profile/my`);

export const updateMyProfile = (data: Partial<IApiProfile>) =>
  ajax<null>(`/api/profile/my`, prepareAjax(data, PUT));

export const getAnotherUserProfile = (userId: string) =>
  ajax<IApiShortProfile>(`/api/profile/${userId}`);

export const setAvatar = (url: string) =>
  ajax<null>(`/api/profile/avatar`, prepareAjax({ url }, PUT));

export const getTgAvatar = (link: string) => {
  const query = new URLSearchParams({ link });
  return fetch(`${API_HOST}/api/tg-avatar?${query}`);
};

export const softCheck = () =>
  (getMyProfile as unknown as (isSoft: boolean) => Promise<IApiResponse<IApiProfile> | null>)(true);

export const getTouchesHistory = (search?: ITouchesFilter | null) => {
  const query = new URLSearchParams({
    masters: Boolean(search?.masters).toString(),
    players: Boolean(search?.players).toString(),
    co_players: Boolean(search?.coPlayers).toString(),
  });
  return ajax<ReadonlyArray<IApiUserPair>>(`/api/touches-history?${query}`);
};
