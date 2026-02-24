import { useForm } from 'react-hook-form';
import { Button, Input, Stack, Textarea } from '@chakra-ui/react';

import { Field } from '@/shared/ui/field';

import { IApiLocation } from '@/entities/location/api/types';

const LocationFormCreate = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IApiLocation>();

  const onSubmit = handleSubmit((data) => {
    const { name, address, description, map_link } = data;
    // if (data) {
    //   addLocation(name, address, description, null /* city */, map_link).then((res) => {
    //     if (res !== null) {
    //       reset();
    //       // setOpen(false);
    //     }
    //   });
    // }
    console.log(data);
  });

  return (
    <form id="create-location-form" onSubmit={() => console.log('onSubmit LocationFormCreate')}>
      <Stack gap="4" align="flex-start" maxW="lg" w="full" mx="auto">
        <Field label="Название *" errorText={errors.name?.message} invalid={!!errors.name?.message}>
          <Input
            placeholder="Заполните поле"
            {...register('name', { required: 'Заполните поле' })}
          />
        </Field>
        <Field label="Адрес">
          <Input placeholder="Заполните поле" {...register('address')} />
        </Field>
        <Field label="Ссылка на карту">
          <Input placeholder="Укажите ссылку на карту" type="url" {...register('map_link')} />
        </Field>
        <Field label="Описание">
          <Textarea placeholder="Расскажите о своей локации" {...register('description')} />
        </Field>
      </Stack>
    </form>
  );
};

export default LocationFormCreate;
