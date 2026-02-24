import { Field } from '@/shared/ui/field';
import { HStack, Input, Separator, Stack, Text, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { DEFAULT_EVENT_STYLE } from '@/shared/utils';

import { CompanyFormValues } from './company.types';

interface CompanyFormCreateProps {
  onSubmit: () => void;
}

export const CompanyFormCreate = ({ onSubmit }: CompanyFormCreateProps) => {
  const {
    register,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    defaultValues: {
      name: '',
      system: '',
      description: '',
      style: DEFAULT_EVENT_STYLE,
    },
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={2}>
        <HStack>
          <Separator flex="1" />
          <Text flexShrink="0">Данные</Text>
          <Separator flex="1" />
        </HStack>
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
      </Stack>
    </form>
  );
};
