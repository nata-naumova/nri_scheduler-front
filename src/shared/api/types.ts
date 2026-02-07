export const enum EAbortReason {
  TIMEOUT = 'timeout',
  UNMOUNT = 'unmount',
}

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

export interface IRequestInit {
  readonly body?: string | FormData | URLSearchParams;
  readonly headers?: Record<string, string>;
  readonly method?: string;
  readonly timeoutMilliseconds?: number;
}

export const enum ETzVariant {
  CITY = 'city',
  DEVICE = 'device',
  OWN = 'own',
}
