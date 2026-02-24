import { ETzVariant } from '@/shared/api/types';

export interface IStoreProfile {
  readonly id: string;
  readonly email: string | null;
  readonly email_verified: boolean;
  readonly nickname: string;
  readonly about_me: string | null;
  readonly city: string | null;
  readonly region: string | null;
  readonly timezone_offset: number | null;
  readonly tz_variant: ETzVariant | null;
  readonly signed: boolean;
  readonly verified: boolean;
  readonly avatar_url: string;
}

export interface IEmptyStoreProfile {
  readonly id: undefined;
  readonly email: undefined;
  readonly email_verified: undefined;
  readonly nickname: undefined;
  readonly about_me: undefined;
  readonly city: undefined;
  readonly region: undefined;
  readonly timezone_offset: undefined;
  readonly tz_variant: undefined;
  readonly signed: false;
  readonly verified: undefined;
  readonly avatar_url: undefined;
}

export type TStoreProfile = IStoreProfile | IEmptyStoreProfile;
