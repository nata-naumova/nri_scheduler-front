import { emailValidation } from '@/shared/lib/form/validation';
import { Field } from '../field';
import { Input } from '@chakra-ui/react';

export const EmailField = ({ register, error }) => (
  <Field
    label="Электронная почта"
    // invalid={Boolean(errors.email)}
    invalid={!!error}
    errorText={error?.message}
    my={2}
    required
  >
    <Input placeholder="test@ya.ru" autoComplete="email" {...register('email', emailValidation)} />
  </Field>
);
