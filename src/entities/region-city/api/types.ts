export interface IApiRegion {
  readonly name: string;
  readonly timezone: string;
}

export interface IApiCity {
  readonly name: string;
  readonly region: string;
  readonly own_timezone: string | null;
}
