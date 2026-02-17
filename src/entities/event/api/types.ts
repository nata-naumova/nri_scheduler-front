import { UUID } from 'crypto';

export interface IApiEvent {
  readonly id: UUID;
  readonly company: string;
  readonly company_id: UUID;
  readonly master: string;
  readonly master_id: UUID;
  readonly location: string;
  readonly location_id: UUID;
  readonly location_map_link: string | null;
  readonly date: string;
  readonly max_slots: number | null;
  readonly plan_duration: number | null;
  readonly players: ReadonlyArray<readonly [userId: string, nickName: string]>;
  readonly you_applied: boolean;
  readonly you_are_master: boolean;
  readonly your_approval: boolean | null;
  readonly cancelled: boolean;
}

export interface IEventsFilter {
  master?: UUID | null;
  location?: UUID | null;
  region?: string | null;
  city?: string | null;
  applied?: boolean | null;
  not_rejected?: boolean | null;
  imamaster?: boolean | null;
  company?: UUID[] | null;
}
