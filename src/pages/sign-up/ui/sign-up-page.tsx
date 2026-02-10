import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Button, Container, Input } from '@chakra-ui/react';

import { toaster } from '@/shared/ui/toaster';
import { ITelegramUser } from '@/shared/typings/telegram';
import { Field } from '@/shared/ui/field';
import { PasswordInput } from '@/shared/ui/password-input';
import { registration, signInTg } from '@/shared/api/auth';
import { getMyProfile } from '@/entities/user/api/api-profile';

import { AuthLayout } from '@/shared/ui/custom/auth-layout';
import { EmailField } from '@/shared/ui/custom/email-field';
import { PasswordField } from '@/shared/ui/custom/password-field';
import { RepeatPasswordField } from '@/shared/ui/custom/repeat-password-field';
import { IFormValues } from '@/shared/typings/auth-form';

export const SingUpPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IFormValues>();

  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();

  const onSubmit = handleSubmit(({ name, email, password }) => {
    setFetching(true);

    registration(name, email, password).then((res) => {
      if (res !== null) {
        toaster.success({
          title: 'Вам отправлено письмо для подтверждения email',
        });
        navigate('/sign-in');
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
          navigate('/calendar');
        } else {
          setFetching(false);
        }
      });
  };

  return (
    <Container>
      <AuthLayout
        title="Регистрация"
        footerText="Уже зарегистрированы?"
        footerLinkHref="/sign-in"
        footerLinkText="Авторизация"
      >
        <form onSubmit={onSubmit}>
          <Field label="Логин" invalid={Boolean(errors.name)} errorText={errors.name?.message}>
            <Input
              placeholder="login"
              {...register('name', {
                required: 'Заполните поле',
              })}
            />
          </Field>
          <EmailField register={register} error={errors.email} />
          <PasswordField register={register} error={errors.password} />
          <RepeatPasswordField
            register={register}
            getValues={getValues}
            error={errors.repassword}
          />

          <Button type="submit" disabled={fetching} w="full" mt={2}>
            Регистрация
          </Button>
        </form>
      </AuthLayout>
    </Container>
  );
};

export default SingUpPage;
