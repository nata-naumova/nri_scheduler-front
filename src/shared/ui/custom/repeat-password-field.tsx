import { Field } from '../field';
import { PasswordInput } from '../password-input';

export const RepeatPasswordField = ({ register, getValues, error }) => (
  <Field label="Повторите пароль" invalid={!!error} errorText={error?.message} my={2} required>
    <PasswordInput
      {...register('repassword', {
        required: 'Заполните поле',
        validate: (v) => v === getValues('password') || 'Пароли не совпадают',
      })}
    />
  </Field>
);
