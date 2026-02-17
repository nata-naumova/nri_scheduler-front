import { ETzVariant } from '@/shared/api/types';

export interface IApiProfile {
  readonly id: string;
  readonly email: string | null;
  readonly email_verified: boolean;
  readonly tg_id: number | null;
  readonly nickname: string;
  readonly about_me: string | null;
  readonly avatar_link: string | null;
  readonly city: string | null;
  readonly region: string | null;
  readonly timezone_offset: number | null;
  readonly tz_variant: ETzVariant | null;
  readonly get_tz_from_device: boolean;
}

export interface IApiShortProfile {
  readonly id: string;
  readonly nickname: string;
  readonly about: string | null;
  readonly avatar_link: string | null;
  readonly city: string | null;
  readonly region: string | null;
  readonly verified: boolean;
}

export interface IApiUserPair {
  readonly id: string;
  readonly nickname: string;
}

export interface IBaseApp {
  readonly id: string;
  readonly event_id: string;
  readonly event_date: string;
  readonly event_cancelled: boolean;

  readonly company_id: string;
  readonly company_name: string;

  readonly location_id: string;
  readonly location_name: string;

  readonly approval: boolean | null;
}

export interface IPlayerApp extends IBaseApp {
  readonly role: 'player';
  readonly master_id: string;
  readonly master_name: string;
}

export interface IMasterApp extends IBaseApp {
  readonly role: 'master';
  readonly player_id: string;
  readonly player_name: string;
}

export type IApp = IPlayerApp | IMasterApp;

export interface ITouchesFilter {
  readonly masters: boolean | null | undefined;
  readonly players: boolean | null | undefined;
  readonly coPlayers: boolean | null | undefined;
}
