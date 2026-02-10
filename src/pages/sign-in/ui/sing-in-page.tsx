import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { FaTelegramPlane as TelegramIcon } from 'react-icons/fa';
import { MdOutlineAlternateEmail as EmailIcon } from 'react-icons/md';

import {
  Button,
  Container,
  FieldErrorText,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';

import { Field } from '../../../shared/ui/field';
import { PasswordInput } from '../../../shared/ui/password-input';
import { toaster } from '../../../shared/ui/toaster';

import { ITelegramUser } from '../../../shared/typings/telegram';
import { signIn, signInTg } from '@/shared/api/auth';
import { getMyProfile } from '@/entities/user/api/api-profile';
import { TG_BOT_ID } from '@/shared/config/constants';
import { AuthLayout } from '@/shared/ui/custom/auth-layout';
import { EmailField } from '@/shared/ui/custom/email-field';
import { PasswordField } from '@/shared/ui/custom/password-field';

interface IFormSignin {
  readonly email: string;
  readonly password: string;
}

export const SignInPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormSignin>();

  const [fetching, setFetching] = useState(false);
  const [isEmailVisible, setEmailVisibility] = useState(false);

  const onSubmit = handleSubmit(({ email, password }) => {
    setFetching(true);

    signIn(email, password)
      .then((res) => {
        return res === null ? null : getMyProfile();
      })
      .then((res) => {
        if (res !== null) {
          reset();
          toaster.success({ title: 'Успешная авторизация' });
          // navigate('/calendar');
        } else {
          setFetching(false);
        }
      });
  });

  const submitTg = (user: ITelegramUser | boolean): void => {
    if (!user || typeof user !== 'object') {
      toaster.error({
        title: 'Не удалось установить связь с Telegram',
      });
      return;
    }

    setFetching(true);

    signInTg(user)
      .then((res) => res && getMyProfile())
      .then((res) => {
        if (res !== null) {
          reset();
          toaster.success({ title: 'Успешная авторизация' });
          // navigate('/calendar');
        } else {
          setFetching(false);
        }
      });
  };

  return (
    <Container>
      <AuthLayout
        title="Добро пожаловать"
        subtitle="для авторизации введите следующие данные: test@ya.ru \ 1234"
        footerText="Еще не зарегистрированы?"
        footerLinkHref="/sign-up"
        footerLinkText="Зарегистрироваться"
      >
        <form onSubmit={onSubmit}>
          <EmailField register={register} error={errors.email} />
          <PasswordField register={register} error={errors.password} />
          <Button type="submit" disabled={fetching} w="full">
            Войти
          </Button>
        </form>
        <Button
          backgroundColor="#08c"
          disabled={!TG_BOT_ID || fetching}
          onClick={() => {
            window.Telegram.Login.auth({ bot_id: TG_BOT_ID!, request_access: true }, submitTg);
          }}
        >
          <TelegramIcon /> Войти через Telegram
        </Button>
      </AuthLayout>
    </Container>
  );
};
