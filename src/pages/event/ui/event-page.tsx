import type { UUID } from 'node:crypto';
import { useForm } from 'react-hook-form';

import {
  Button,
  Container,
  createListCollection,
  Group,
  HStack,
  Input,
  InputAddon,
  NativeSelect,
  Stack,
} from '@chakra-ui/react';

import dayjs from 'dayjs';

import { NotFoundPage } from '../../not-found/ui/not-found';
import { useStore } from '@nanostores/react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { $tz } from '@/app/store/profile';
import { EVENT_FORMAT, navBack, YYYY_MM_DD } from '@/shared/utils';
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
import { EventCardSkeleton } from './event-skeleton';
import { EventCard } from './event-card';
import { IApiEvent } from '@/entities/event/api/types';
import { IApiLocation } from '@/entities/location/api/types';
import { readLocations } from '@/entities/location/api/api';
import { readEvent, updateEvent } from '@/entities/event/api/api-event';

interface IFormEditEvent {
  readonly company: UUID;
  readonly location: UUID;
  readonly start: string;
  readonly startTime: string;
  readonly max_slots: string;
  readonly plan_duration: string;
}

export const EventPage = () => {
  const route = useNavigate();
  const eventId = undefined;
  const [fetching, setFetching] = useState(false);
  const [event, setEvent] = useState<IApiEvent | null>(null);
  const [open, setOpen] = useState(false);
  const [locationList, setLocationList] = useState<ReadonlyArray<IApiLocation>>([]);
  const [isDisableEditEventSubmitButton, setIsDisableEditEventSubmitButton] = useState(false);
  const tz = useStore($tz);

  const getLocations = () => {
    return readLocations().then((responce) => {
      if (responce?.payload) {
        setLocationList(responce.payload);
      }
      return responce?.payload || null;
    });
  };

  const locations = useMemo(() => {
    return createListCollection({
      items: locationList,
      itemToString: (item) => item.name,
      itemToValue: (item) => item.id,
    });
  }, [locationList]);
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<IFormEditEvent>();
  const onSubmit = handleSubmit((data) => {
    const { location, start, startTime, max_slots, plan_duration } = data;

    if (data) {
      const date = dayjs.tz(`${start} ${startTime}`, EVENT_FORMAT, tz);
      setIsDisableEditEventSubmitButton(true);
      if (!eventId) {
        return;
      }
      updateEvent(
        eventId,
        date.toISOString(),
        location,
        Number(max_slots) || null,
        Number(plan_duration) || null,
      )
        .then((res) => {
          if (res !== null) {
            setOpen(false);
          }
        })
        .then(() =>
          readEvent(eventId).then((res) => {
            if (res !== null) {
              setEvent(res.payload);
              return res?.payload;
            }
          }),
        )
        .finally(() => {
          setIsDisableEditEventSubmitButton(false);
        });
    }
  });
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
  useEffect(() => {
    if (eventId) {
      setFetching(true);
      readEvent(eventId)
        .then((res) => {
          if (res !== null) {
            setEvent(res.payload);
            return res?.payload;
          }
        })
        .then((eventData) => {
          if (eventData?.you_are_master) {
            return getLocations();
          }
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [route.matches?.id]);

  const eventDate = dayjs(event?.date).tz(tz);

  const updateEventData = () => {
    if (eventId) {
      setFetching(true);
      readEvent(eventId)
        .then((res) => {
          if (res !== null) {
            setEvent(res.payload);
            return res?.payload;
          }
        })
        .then((eventData) => {
          if (eventData?.you_are_master) {
            return getLocations();
          }
        })
        .finally(() => {
          setFetching(false);
        });
    }
  };

  return (
    <section>
      <Container>
        <Button mb={4} onClick={navBack}>
          Вернуться назад
        </Button>
        {event?.you_are_master && (
          <HStack alignItems="top">
            <DrawerRoot
              open={open}
              onOpenChange={(e) => {
                setOpen(e.open);
              }}
            >
              <DrawerBackdrop />
              <DrawerTrigger asChild>
                <Button colorPalette="cyan" mt="4" mb="4" variant="solid">
                  Редактировать событие
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Редактирование события</DrawerTitle>
                </DrawerHeader>
                <DrawerBody>
                  <form onSubmit={onSubmit}>
                    <Stack gap="4" w="full">
                      <HStack alignItems="start" gap={2} width="full">
                        <Field
                          label="Начало"
                          errorText={errors.start?.message}
                          invalid={!!errors.start?.message}
                        >
                          <Input
                            type="date"
                            defaultValue={eventDate.format(YYYY_MM_DD)}
                            min={dayjs().tz(tz).format(YYYY_MM_DD)}
                            {...register('start', {
                              required: 'Заполните поле',
                              validate: validateDate,
                            })}
                          />
                        </Field>
                        <Field
                          label="Время"
                          errorText={errors.startTime?.message}
                          invalid={!!errors.startTime?.message}
                        >
                          <Input
                            type="time"
                            defaultValue={eventDate.format('HH:mm')}
                            {...register('startTime', {
                              required: 'Заполните поле',
                              validate: validateTime,
                            })}
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
                            placeholder="Выберите из списка"
                            {...register('location', {
                              required: 'Заполните',
                            })}
                            defaultValue={event.location_id}
                          >
                            {locations.items.map((location) => (
                              <option value={location.id} key={location.name}>
                                {location.name}
                              </option>
                            ))}
                          </NativeSelect.Field>
                          <NativeSelect.Indicator />
                        </NativeSelect.Root>
                      </Field>

                      <Field label="Максимальное количество игроков">
                        <Input
                          type="number"
                          min="1"
                          step="1"
                          defaultValue={event?.max_slots || 0}
                          {...register('max_slots')}
                        />
                      </Field>

                      <Field label="Планируемая длительность">
                        <Group attached w="full">
                          <Input
                            type="number"
                            min="1"
                            step="1"
                            defaultValue={event?.plan_duration || 0}
                            {...register('plan_duration')}
                          />
                          <InputAddon>час</InputAddon>
                        </Group>
                      </Field>
                    </Stack>
                    <Button disabled={isDisableEditEventSubmitButton} type="submit" w="full" mt={6}>
                      Редактировать
                    </Button>
                    <DrawerTrigger asChild>
                      <Button type="button" w="full" mt={6}>
                        Отмена
                      </Button>
                    </DrawerTrigger>
                  </form>
                </DrawerBody>
                <DrawerCloseTrigger />
              </DrawerContent>
            </DrawerRoot>
          </HStack>
        )}
        {fetching ? (
          <EventCardSkeleton />
        ) : event !== null ? (
          <EventCard event={event} updateEventData={updateEventData} />
        ) : (
          <NotFoundPage checkButton={false} title="Событие не найдено, попробуйте еще раз!" />
        )}
      </Container>
    </section>
  );
};
