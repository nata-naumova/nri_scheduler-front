export interface IApiEvent {
  readonly id: number;
  readonly company_id: number;
  readonly master_id: number;
  readonly location_id: number;
  readonly start_date: string;
  readonly end_date: string;
  readonly max_slots: number | null;
  readonly plan_duration: number | null;
  readonly player_ids: number[];
  readonly you_applied: boolean;
  readonly you_are_master: boolean;
  // readonly your_approval: boolean | null;
  // readonly cancelled: boolean;
}

export interface IEventsFilter {
  master?: number | null;
  location?: number | null;
  region?: string | null;
  city?: string | null;
  applied?: boolean | null;
  not_rejected?: boolean | null;
  imamaster?: boolean | null;
  company?: number[] | null;
}
