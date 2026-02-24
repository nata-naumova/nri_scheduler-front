export interface IFormCreateEvent {
  readonly company: string;
  readonly location: string;
  readonly start: string;
  readonly startTime: string;
  readonly max_slots: number | null;
  readonly plan_duration: number | null;
  readonly isMax_slots: boolean;
  readonly isPlan_duration: boolean;
  readonly region: string;
  readonly city: string;
}
