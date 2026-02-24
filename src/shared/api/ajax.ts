import { API_HOST, CREDENTIALS } from '../config/constants';
import { toaster } from '../ui/toaster';
import { EAbortReason, EScenarioStatus, IApiResponse, IRequestInit } from './types';

export const ajax = async <T>(
  input: string,
  init?: IRequestInit | null,
  abort?: AbortController,
  isSoft = false,
): Promise<IApiResponse<T> | null> => {
  let controller = abort;
  let timeoutId: ReturnType<typeof setTimeout>;

  if (init?.timeoutMilliseconds) {
    controller = controller || new AbortController();
    timeoutId = setTimeout(() => controller!.abort(EAbortReason.TIMEOUT), init.timeoutMilliseconds);
  }

  try {
    const response = await fetch(API_HOST + input, {
      body: init?.body,
      cache: 'no-store',
      credentials: CREDENTIALS,
      headers: init?.headers,
      method: init?.method,
      signal: controller?.signal,
    });

    if (!response.ok) return handleError(response, isSoft);

    const apiRes: IApiResponse<T> = await response.json();
    return handleStatus(apiRes, isSoft);
  } catch (err) {
    if (controller?.signal.aborted && controller.signal.reason === EAbortReason.TIMEOUT) {
      toaster.error({
        title: 'Истекло время ожидания ответа сервера',
      });
      return null;
    }

    toaster.error({ title: 'Неизвестная ошибка' });
    console.error(err);

    return null;
  } finally {
    clearTimeout(timeoutId);
  }
};

const handleError = async (res: Response, isSoft: boolean) => {
  const body = await res.text().catch(() => null);
  toaster.error({ title: 'Ошибка обращения к серверу' });
  console.error({ status: res.status, body });
  return null;
};

const handleStatus = <T>(apiRes: IApiResponse<T>, isSoft: boolean) => {
  switch (apiRes.status) {
    case EScenarioStatus.SCENARIO_SUCCESS:
      return apiRes;
    case EScenarioStatus.UNAUTHORIZED:
    case EScenarioStatus.SESSION_EXPIRED:
      // leave();
      if (!isSoft) toaster.error({ title: apiRes.result });
      return null;
    case EScenarioStatus.SCENARIO_FAIL:
    case EScenarioStatus.SYSTEM_ERROR:
      toaster.error({ title: apiRes.result });
      return null;
    default:
      toaster.error({ title: 'Неизвестный статус ответа' });
      console.error(apiRes);
      return null;
  }
};

export const prepareAjax = (
  payload?: object,
  method?: string,
  urlencoded = false,
): IRequestInit => {
  return {
    body: payload
      ? urlencoded
        ? new URLSearchParams(payload as Record<string, string>)
        : JSON.stringify(payload)
      : undefined,
    headers: payload
      ? {
          'Content-Type': 'application/' + (urlencoded ? 'x-www-form-urlencoded' : 'json'),
        }
      : undefined,
    method,
  };
};

export const checkResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.json();
};
