import { ajax, prepareAjax } from './ajax';
import { EVerificationChannel, POST, URL_ENCODED } from '../config/constants';
import { ITelegramUser } from '../typings/telegram';
import { setFromTgAuthorization } from '@/entities/user/avatar/model/avatar.store';
import { leave } from '@/entities/user/profile/model/profile.store';

const FAKE_USER = {
  id: 1,
  email: 'admin@ya.ru',
  password: 'admin',
};

export const registration = (nickname: string, email: string, password: string) => {
  return ajax<null>(
    '/api/registration',
    prepareAjax({ nickname, email, password }, POST, URL_ENCODED),
  );
};

export const signIn = (email: string, password: string) => {
  return ajax<null>('/api/signin', prepareAjax({ email, password }, POST, URL_ENCODED));
};

export const signInTg = (data: ITelegramUser) => {
  return ajax<null>('/api/signin/tg', prepareAjax(data, POST)).then((res) => {
    if (res && data.photo_url) {
      setFromTgAuthorization(data.photo_url);
    }
    return res;
  });
};

export const logout = () =>
  ajax<null>('/api/logout', prepareAjax(undefined, POST)).then((res) => {
    if (res) {
      leave();
    }

    return res;
  });

export const verifyEmail = (code: string) => {
  return ajax<null>(
    '/api/verify',
    prepareAjax({ code, channel: EVerificationChannel.EMAIL }, POST),
  );
};

export const sendVerificationLink = () =>
  ajax<null>('/api/profile/send-email-verification', prepareAjax(undefined, POST));
