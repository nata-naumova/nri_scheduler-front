import { Box, Container, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/react';

import { usePageMeta } from '@/shared/lib/usePageMeta';
import { CalendarToolbar } from '@/widgets/calendar/ui/calendar-toolbar';

import { useCalendarEvents } from '@/features/calendar/model/useLoadCalendarEvents';
import { ScheduleXCalendar } from '@schedule-x/react';

import { CompanyDialog } from '../../features/company/company.ui';
import { LocationDialog } from '@/features/location-dialog/ui/location-dialog';

export const CalendarPage = () => {
  usePageMeta({ title: 'Календарь', description: '' });

  const { calendar } = useCalendarEvents();

  if (!calendar) return null;

  return (
    <Box as="section" minH="full">
      <Container>
        <Flex direction="column" gap={6}>
          <Stack>
            <Heading>Добро пожаловать в НРИ Календарь</Heading>
            <Text>
              Мы создали этот сервис, чтобы упростить вашу жизнь. Начните использовать все его
              возможности прямо сейчас!
            </Text>
          </Stack>

          <CalendarToolbar />

          <Box>
            <ScheduleXCalendar calendarApp={calendar} />
          </Box>

          {/* mastery */}
          <HStack gap={4}>
            <LocationDialog />
            <CompanyDialog />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
