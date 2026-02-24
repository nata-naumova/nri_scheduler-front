import { Field } from '@/shared/ui/field';
import { Box, Input, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { CompanyFormValues } from '../company/company.types';

export const CompanyFormUpdate = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<CompanyFormValues>();

  const onSubmit = () => {
    console.log('onSubmit CompanyFormUpdate');
  };

  return (
    <Box as="form" spaceY={4} onSubmit={onSubmit}>
      <Field label="Название *" errorText={errors.name?.message} invalid={!!errors.name?.message}>
        <Input
          placeholder="Заполните поле"
          {...register('name', {
            required: 'Заполните поле',
          })}
        />
      </Field>
      <Field
        label="Система *"
        errorText={errors.system?.message}
        invalid={!!errors.system?.message}
      >
        <Input
          placeholder="Заполните поле"
          {...register('system', {
            required: 'Заполните поле',
          })}
        />
      </Field>
      <Field label="Описание">
        <Textarea placeholder="Расскажите о своей кампании" {...register('description')} />
      </Field>
    </Box>
  );
};
