import { useForm } from 'react-hook-form';
import { Button, Input, Stack, Textarea } from '@chakra-ui/react';

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';
import { Field } from '@/shared/ui/field';
import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';

import { $profile } from '@/app/store/profile';
import { IApiLocation } from '@/entities/location/api/types';
import { addLocation } from '@/entities/location/api/api';

const Location = () => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IApiLocation>();

  const profile = useStore($profile);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown, { passive: true });
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      setOpen(false);
    };
  }, []);

  const onSubmit = handleSubmit((data) => {
    const { name, address, description, map_link } = data;
    if (data) {
      addLocation(name, address, description, null /* city */, map_link).then((res) => {
        if (res !== null) {
          reset();
          setOpen(false);
        }
      });
    }
  });

  return (
    <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button disabled={!profile?.signed} variant="outline" size={{ base: 'xs', md: 'md' }}>
          Создать локацию
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Создание локации</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <form onSubmit={onSubmit}>
            <Stack gap="4" align="flex-start" maxW="lg" w="full" mx="auto">
              <Field
                label="Название *"
                errorText={errors.name?.message}
                invalid={!!errors.name?.message}
              >
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
            <Button type="submit" w="full" mt={6}>
              Создать
            </Button>
          </form>
        </DrawerBody>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default Location;
