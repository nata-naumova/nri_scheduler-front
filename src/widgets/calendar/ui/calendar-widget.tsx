import { Box } from '@chakra-ui/react';
import { ScheduleXCalendar, useCalendarApp } from '@schedule-x/react';

interface CalendarWidgetProps {
  calendar: ReturnType<typeof useCalendarApp>;
  mastery?: boolean;
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({ calendar, mastery }) => {
  if (!calendar) return null;

  return (
    <Box
      p={2}
      h="full"
      borderRadius="lg"
      background={mastery ? '#18181b' : '#e4e4e7'}
      transition="background 0.2s ease-in-out"
    >
      <ScheduleXCalendar calendarApp={calendar} />
    </Box>
  );
};
