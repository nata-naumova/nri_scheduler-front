import { UUID } from 'crypto';
import { ETzVariant } from '@/shared/api/types';

export interface IApiProfile {
  readonly id: UUID;
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
  readonly id: UUID;
  readonly nickname: string;
  readonly about: string | null;
  readonly avatar_link: string | null;
  readonly city: string | null;
  readonly region: string | null;
  readonly verified: boolean;
}

export interface IApiUserPair {
  readonly id: UUID;
  readonly nickname: string;
}

export interface IPlayerApp {
  readonly approval: boolean | null;
  readonly company_id: UUID;
  readonly company_name: string;
  readonly event_cancelled: boolean;
  readonly event_date: string; // "2025-04-15T07:24:00Z"
  readonly event_id: UUID;
  readonly id: UUID;
  readonly location_id: UUID;
  readonly location_name: string;
  readonly master_id: UUID;
  readonly master_name: string;
}

export interface IMasterApp {
  readonly approval: boolean | null;
  readonly company_id: UUID;
  readonly company_name: string;
  readonly event_cancelled: boolean;
  readonly event_date: string; // "2025-04-15T07:24:00Z"
  readonly event_id: UUID;
  readonly id: UUID;
  readonly location_id: UUID;
  readonly location_name: string;
  readonly player_id: UUID;
  readonly player_name: string;
}

export interface ITouchesFilter {
  readonly masters: boolean | null | undefined;
  readonly players: boolean | null | undefined;
  readonly coPlayers: boolean | null | undefined;
}
