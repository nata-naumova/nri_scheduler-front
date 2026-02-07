export const API_HOST = import.meta.env.PROD
  ? ''
  : (import.meta.env.CLIENT_API_HOST as string | undefined) || '';

export const CREDENTIALS = import.meta.env.PROD ? undefined : 'include';

export const TG_BOT_ID = import.meta.env.CLIENT_TG_BOT_ID as string | undefined;

export const POST = 'POST';
export const PUT = 'PUT';
export const URL_ENCODED = true;

export const enum EVerificationChannel {
  EMAIL = 'email',
}
