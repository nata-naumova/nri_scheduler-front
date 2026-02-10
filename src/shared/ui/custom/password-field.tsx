import { Field } from '../field';
import { PasswordInput } from '../password-input';

export const PasswordField = ({ register, error }) => (
  <Field
    label="Пароль"
    //   invalid={Boolean(errors)}
    invalid={!!error}
    errorText={error?.message}
    my={2}
    required
  >
    <PasswordInput
      placeholder="******"
      autoComplete="password"
      {...register('password', {
        required: 'Заполните поле',
      })}
    />
  </Field>
);
