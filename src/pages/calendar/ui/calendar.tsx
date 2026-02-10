import { Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';

import { useStore } from '@nanostores/react';
import { $mastery } from '@/app/store/mastery';

import { usePageMeta } from '@/shared/lib/usePageMeta';
import { CalendarToolbar } from '@/widgets/calendar/ui/calendar-toolbar';
import { CalendarWidget } from '@/widgets/calendar/ui/calendar-widget';

import { useCalendarEvents } from '@/features/calendar/model/useLoadCalendarEvents';

export const CalendarPage = () => {
  usePageMeta({ title: 'Календарь', description: '' });

  const mastery = useStore($mastery);
  const { calendar } = useCalendarEvents();

  return (
    <section className={'calendar-page'}>
      <Container h={'full'} pb={'6'}>
        <Stack>
          <Heading>Добро пожаловать в НРИ Календарь</Heading>
          <Text>
            Мы создали этот сервис, чтобы упростить вашу жизнь. Начните использовать все его
            возможности прямо сейчас!
          </Text>
        </Stack>

        <Flex gap="4" direction="column" h={'full'}>
          <CalendarToolbar />
          <CalendarWidget calendar={calendar} mastery={mastery} />
        </Flex>
      </Container>
    </section>
  );
};

export default CalendarPage;
