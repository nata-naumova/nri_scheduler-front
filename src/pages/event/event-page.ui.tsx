import { Box, Container, Grid, Image } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IApiEvent } from '@/entities/event/api/types';
import { readEvent } from '@/entities/event/api/api-event';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { AppBreadcrumb } from '@/shared/ui/custom/app-breadcrumbs';
import { EventDetailsForm } from '@/features/event/event-card-stats';
import { useStore } from '@nanostores/react';
import { $tz } from '@/entities/user/timezone/model/tz.store';
// import { EventCardFooter } from '@/features/event/event-card-footer';
import { useUser } from '@/features/auth/model/useAuth';
import { DetailLayout } from '@/features/detail-layout/detail-layout';

dayjs.extend(utc);
dayjs.extend(timezone);

export const EventPage = () => {
  const { id } = useParams();
  const eventId = id ? String(id) : null;

  const tz = useStore($tz);
  const { user } = useUser();

  const [event, setEvent] = useState<IApiEvent | null>(null);
  const [fetching, setFetching] = useState(false);
  const nowDate = dayjs().tz(tz);

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

  return (
    <Box as="section">
      <DetailLayout>
        <Grid templateColumns="2fr 1fr" gap="6" mt={4}>
          <EventDetailsForm event={event} tz={tz} />
          {/* <EventCardFooter
            event={event}
            nowDate={nowDate}
            youApplied={false}
            isLoading={fetching}
            profileSigned={!!user?.signed}
            profileVerified={!!user?.verified}
            onSubscribe={() => console.log('handleSubscribe')}
            onCancelEvent={() => console.log('onCancelEvent')}
            onReopenEvent={() => console.log('onReopenEvent')}
          /> */}
        </Grid>
      </DetailLayout>
    </Box>
  );
};
