import { UUID } from 'node:crypto';

export interface IFormEditEvent {
  readonly company: UUID;
  readonly location: UUID;
  readonly start: string;
  readonly startTime: string;
  readonly max_slots: string;
  readonly plan_duration: string;
}
