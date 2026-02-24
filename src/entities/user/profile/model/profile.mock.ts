import { IFormSignin } from '@/pages/sign-in/model/types';
import { TStoreProfile } from './profile.types';

export const TEST_USER: TStoreProfile = {
  id: '1',
  email: 'test@example.com',
  email_verified: true,
  nickname: 'Тестовый Пользователь',
  about_me: 'Я тестовый пользователь для разработки',
  city: 'Москва',
  region: 'Московская область',
  timezone_offset: 3,
  tz_variant: null,
  signed: true,
  verified: true,
  avatar_url: 'https://i.pinimg.com/1200x/70/0f/57/700f57201ef7a1bfb69c62d57b7f98e9.jpg',
};

export const TEST_CREDENTIALS: IFormSignin = {
  email: 'test@example.com',
  password: 'test123',
};

export const isTestUser = (email: string): boolean => {
  return email === TEST_CREDENTIALS.email;
};
