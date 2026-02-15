import { applyEvent, cancelEvent, reopenEvent } from '@/entities/event/api/api-event';
import { $profile } from '@/entities/user/profile/model/profile.store';
import { $tz } from '@/entities/user/timezone/model/tz.store';
import { toaster } from '@/shared/ui/toaster';
import { Card } from '@chakra-ui/react';
import { useStore } from '@nanostores/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { EventCardProps } from './event-card.types';
import { EventCardFooter } from '@/features/event/event-card-footer';
import { EventCardHeader } from '@/features/event/event-card-header';
import { EventCardStats } from '@/features/event/event-card-stats';

export const EventCard = ({ event, updateEventData }: EventCardProps) => {
  const tz = useStore($tz);
  const profile = useStore($profile);
  const nowDate = dayjs().tz(tz);

  const [isLoading, setIsLoading] = useState(false);
  const [youApplied, setYouApplied] = useState(event.you_applied);

  const handleSubscribe = () => {
    setIsLoading(true);
    applyEvent(event.id)
      .then(() => {
        setYouApplied(true);
        toaster.success({ title: 'Успех. Запись оформлена' });
      })
      .finally(() => setIsLoading(false));
  };

  const onCancelEvent = () => {
    cancelEvent(event.id).then(() => {
      toaster.success({ title: 'Событие отменено' });
      updateEventData();
    });
  };

  const onReopenEvent = () => {
    reopenEvent(event.id).then(() => {
      toaster.success({ title: 'Событие открыто' });
      updateEventData();
    });
  };

  return (
    <Card.Root width="full">
      <Card.Body>
        <EventCardHeader event={event} />
        <EventCardStats event={event} tz={tz} />
      </Card.Body>

      <Card.Footer>
        <EventCardFooter
          event={event}
          nowDate={nowDate}
          youApplied={youApplied}
          isLoading={isLoading}
          profileSigned={!!profile?.signed}
          profileVerified={!!profile?.verified}
          onSubscribe={handleSubscribe}
          onCancelEvent={onCancelEvent}
          onReopenEvent={onReopenEvent}
        />
      </Card.Footer>
    </Card.Root>
  );
};
