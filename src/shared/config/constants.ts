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

export const MENU_HEADER_2 = [
  {
    title: 'Событие',
    href: '/event/1',
  },
  {
    title: 'Кампания',
    href: '/company/1',
  },
  {
    title: 'Локация',
    href: '/location/1',
  },
  {
    title: 'Верификация',
    href: '/verification',
  },
];

export const MENU_HEADER = [
  {
    title: 'Регионы и города',
    href: '/#',
  },
];
