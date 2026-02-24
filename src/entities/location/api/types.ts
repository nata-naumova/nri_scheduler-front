import { UUID } from 'crypto';

export interface IApiLocation {
  readonly id: string;
  readonly name: string;
  readonly address: string | null;
  readonly description: string | null;
  readonly region: string | null;
  readonly city: string | null;
  readonly map_link: string | null;
}
