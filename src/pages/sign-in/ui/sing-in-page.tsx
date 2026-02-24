import { useForm } from 'react-hook-form';
import { FaTelegramPlane as TelegramIcon } from 'react-icons/fa';

import { Button, Container } from '@chakra-ui/react';

import { toaster } from '../../../shared/ui/toaster';

import { TG_BOT_ID } from '@/shared/config/constants';
import { AuthLayout } from '@/shared/ui/custom/auth-layout';
import { EmailField } from '@/shared/ui/custom/email-field';
import { PasswordField } from '@/shared/ui/custom/password-field';
import { routes } from '@/shared/config/routes';
import { IFormSignin } from '../model/types';
import { useAuth } from '@/features/auth/model/useAuth';
import { TEST_CREDENTIALS } from '@/entities/user/profile/model/profile.mock';
import { useNavigate } from 'react-router-dom';

export const SignInPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<IFormSignin>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const success = await login({
        email: data.email,
        password: data.password,
      });

      if (success) {
        toaster.success({
          title: 'Успешная авторизация',
          description: 'Добро пожаловать!',
        });
        navigate(routes.home());
      }
    } catch (error) {
      toaster.error({
        title: 'Ошибка авторизации',
        description: error instanceof Error ? error.message : 'Попробуйте позже',
      });
    }
  });

  const handleTestLogin = async () => {
    setValue('email', TEST_CREDENTIALS.email);
    setValue('password', TEST_CREDENTIALS.password);

    try {
      const success = await login({
        email: TEST_CREDENTIALS.email,
        password: TEST_CREDENTIALS.password,
      });

      if (success) {
        toaster.success({
          title: '🧪 Тестовый режим',
          description: 'Вы вошли как тестовый пользователь',
        });
        navigate(routes.home());
      }
    } catch (error) {
      toaster.error({
        title: 'Ошибка тестового входа',
        description: 'Попробуйте обычную авторизацию',
      });
    }
  };

  return (
    <Container>
      <AuthLayout
        title="Добро пожаловать"
        subtitle="для авторизации заполните поля"
        footerText="Еще не зарегистрированы?"
        footerLinkHref={routes.signUp()}
        footerLinkText="Зарегистрироваться"
      >
        <form onSubmit={onSubmit}>
          <EmailField register={register} error={errors.email} />
          <PasswordField register={register} error={errors.password} />
          <Button type="submit" disabled={isLoading} w="full">
            Войти
          </Button>
        </form>
        <Button
          variant="outline"
          type="submit"
          disabled={isLoading}
          w="full"
          onClick={handleTestLogin}
        >
          Тестовый вход
        </Button>
        <Button
          backgroundColor="#08c"
          disabled={!TG_BOT_ID || isLoading}
          // onClick={() => {
          //   window.Telegram.Login.auth({ bot_id: TG_BOT_ID!, request_access: true }, submitTg);
          // }}
        >
          <TelegramIcon /> Войти через Telegram
        </Button>
      </AuthLayout>
    </Container>
  );
};
