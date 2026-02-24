export const enum EScenarioStatus {
  SCENARIO_SUCCESS = 0,
  SCENARIO_FAIL = 400,
  UNAUTHORIZED = 401,
  SESSION_EXPIRED = 419,
  SYSTEM_ERROR = 500,
}

export interface IApiResponse<T = null> {
  readonly status: EScenarioStatus;
  readonly result: string;
  readonly payload: T;
}
