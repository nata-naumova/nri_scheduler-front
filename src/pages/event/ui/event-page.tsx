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

import { NotFoundPage } from '../../not-found/ui/not-found';
import { useStore } from '@nanostores/react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

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
import { EventCardSkeleton } from '../../../entities/event/ui/event-skeleton';
import { EventCard } from '../../../entities/event/ui/event-card/event-card';
import { IApiEvent } from '@/entities/event/api/types';
import { IApiLocation } from '@/entities/location/api/types';
import { readLocations } from '@/entities/location/api/api';
import { readEvent, updateEvent } from '@/entities/event/api/api-event';
import { IFormEditEvent } from '../model/types';
import { $tz } from '@/entities/user/timezone/model/tz.store';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { EventWrapper } from '@/entities/event/ui/event-wrapper';
import { EventForm } from '@/entities/event/ui/event-form';

dayjs.extend(utc);
dayjs.extend(timezone);

export const EventPage = () => {
  const { id } = useParams();
  const eventId = id ? String(id) : null;

  const [event, setEvent] = useState<IApiEvent | null>(null);
  const [fetching, setFetching] = useState(false);
  const [open, setOpen] = useState(false);
  const tz = useStore($tz);

  useEffect(() => {
    if (!eventId) return;
    setFetching(true);
    readEvent(eventId)
      .then((res) => setEvent(res?.payload ?? null))
      .finally(() => setFetching(false));
  }, [eventId]);

  const updateEventData = () => {
    if (!eventId) return;
    setFetching(true);
    readEvent(eventId)
      .then((res) => setEvent(res?.payload ?? null))
      .finally(() => setFetching(false));
  };

  const handleSubmit = (data: any) => {
    console.log('Submit form data', data);
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
                  <EventForm event={event} onSubmit={handleSubmit} />
                </DrawerBody>
                <DrawerCloseTrigger />
              </DrawerContent>
            </DrawerRoot>
          </HStack>
        )}
        <EventWrapper event={event} fetching={fetching} updateEventData={updateEventData} />
      </Container>
    </section>
  );
};
