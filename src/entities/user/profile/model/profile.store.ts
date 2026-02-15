import { computed, map, task } from 'nanostores';
import { IApiProfile } from '../../api/types';
import { IStoreProfile, TStoreProfile } from './profile.types';

const EMPTY_USER = {};

const _profile = map<IApiProfile | typeof EMPTY_USER>(EMPTY_USER);

export const $profile = computed(_profile, (p) =>
  task(async () => {
    if (!('id' in p)) {
      const { avatar_link } = _profile.get() as IApiProfile;
      URL.revokeObjectURL(avatar_link as string);
      return { signed: false } as TStoreProfile;
    }

    const prof: IStoreProfile = {
      id: p.id,
      email: p.email,
      email_verified: p.email_verified,
      nickname: p.nickname,
      about_me: p.about_me,
      city: p.city,
      region: p.region,
      timezone_offset: p.timezone_offset,
      tz_variant: p.tz_variant,
      signed: true,
      verified: p.email_verified || Boolean(p.tg_id),
    };

    return prof;
  }),
);
export const enter = (profile: IApiProfile) => _profile.set(profile);
export const leave = () => {
  _profile.set(EMPTY_USER);
};
