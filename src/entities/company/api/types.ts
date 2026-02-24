export interface IApiCompany {
  readonly id: string;
  readonly master: string;
  readonly name: string;
  readonly system: string;
  readonly description: string | null;
  readonly cover_link: string | null;
}

export interface IApiStyledCompany {
  readonly id: string;
  readonly master: string;
  readonly name: string;
  readonly system: string;
  readonly description: string | null;
  readonly cover_link: string | null;
  readonly event_style: string | null;
}

export interface IApiCompanyInfo {
  readonly id: string;
  readonly master: string;
  readonly name: string;
  readonly master_name: string;
  readonly system: string;
  readonly description: string | null;
  readonly cover_link: string | null;
  readonly you_are_master: boolean;
  readonly event_style: string | null;
}
