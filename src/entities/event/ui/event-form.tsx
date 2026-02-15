import { IFormEditEvent } from '@/pages/event/model/types';
import { IApiEvent } from '../api/types';
import { useStore } from '@nanostores/react';
import { $tz } from '@/entities/user/timezone/model/tz.store';
import { useForm } from 'react-hook-form';
import { Button, Group, HStack, Input, InputAddon, NativeSelect, Stack } from '@chakra-ui/react';
import { Field } from '@/shared/ui/field';

interface EventFormProps {
  event: IApiEvent;
  onSubmit: (data: IFormEditEvent) => void;
}

export const EventForm = ({ event, onSubmit }: EventFormProps) => {
  const tz = useStore($tz);
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<IFormEditEvent>();

  const [start] = watch(['start']);

  const validateDate = (value: string) => {
    clearErrors('startTime');
    const fieldDate = dayjs.tz(`${value} 12:00`, EVENT_FORMAT, tz);
    const nowDate = dayjs().tz(tz);
    if (nowDate.isSame(fieldDate, 'day') || fieldDate.isAfter(nowDate, 'day')) {
      return true;
    } else {
      return 'Вы указали прошлый день';
    }
  };

  const validateTime = (value: string) => {
    if (!start) {
      return 'Укажите дату';
    }
    const fultime = dayjs.tz(`${start} ${value}`, EVENT_FORMAT, tz);
    const nowDate = dayjs().tz(tz);
    if (nowDate.isSame(fultime, 'minute') || fultime.isAfter(nowDate, 'minute')) {
      return true;
    } else {
      return 'Вы указали прошлое время';
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" w="full">
        <HStack alignItems="start" gap={2} width="full">
          <Field label="Начало" errorText={errors.start?.message} invalid={!!errors.start?.message}>
            <Input
              type="date"
              {...register('start', { required: 'Заполните поле', validate: validateDate })}
            />
          </Field>
          <Field
            label="Время"
            errorText={errors.startTime?.message}
            invalid={!!errors.startTime?.message}
          >
            <Input
              type="time"
              {...register('startTime', { required: 'Заполните поле', validate: validateTime })}
            />
          </Field>
        </HStack>
        <Field
          label="Локация"
          errorText={errors.location?.message}
          invalid={!!errors.location?.message}
        >
          <NativeSelect.Root>
            <NativeSelect.Field
              {...register('location', { required: 'Заполните' })}
              defaultValue={event.location_id}
            >
              {/* {locations.items.map((location) => (
                <option value={location.id} key={location.name}>
                  {location.name}
                </option>
              ))} */}
              <option value={event.location_id}>{event.location}</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field>

        <Field label="Максимальное количество игроков">
          <Input type="number" min="1" step="1" {...register('max_slots')} />
        </Field>

        <Field label="Планируемая длительность">
          <Group attached w="full">
            <Input type="number" min="1" step="1" {...register('plan_duration')} />
            <InputAddon>час</InputAddon>
          </Group>
        </Field>
      </Stack>
      <Button type="submit" w="full" mt={6}>
        Редактировать
      </Button>
    </form>
  );
};
