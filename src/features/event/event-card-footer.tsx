import { IApiEvent } from '@/entities/event/api/types';
import { Box, Heading, Timeline } from '@chakra-ui/react';
import { LuCheck } from 'react-icons/lu';

interface EventCardFooterProps {
  event: IApiEvent;
}

export const EventCardFooter = ({ event }: EventCardFooterProps) => {
  if (!event) return;

  const timelineEvent = [
    { title: 'Событие началось', isLoading: false },
    { title: 'Событие отменено', description: 'Запись закрыта мастером', isLoading: true },
    { title: 'Не удалось записаться', description: 'Нужна авторизация', isLoading: false },
    { title: 'Не удалось записаться', description: 'Подтвердите данные', isLoading: false },
    { title: 'Запись на событие', isLoading: false },
  ];

  const isMaster = !!event.master_id;
  // const isCancelled = event.cancelled;
  // const isEventInFuture =
  //   nowDate.isSame(eventDate, 'minute') || eventDate.isAfter(nowDate, 'minute');
  // const isEventStarted = eventDate.isBefore(nowDate, 'minute');

  // const canSubscribe = profileSigned && !isMaster && !isCancelled && isEventInFuture;
  // const showAuthMessage = !profileSigned && !isCancelled;

  return (
    <Box>
      <Heading size="2xl" mb={6}>
        История события
      </Heading>
      <Timeline.Root maxW="400px" mb={6} variant="subtle">
        {timelineEvent.map((item) => (
          <Timeline.Item>
            <Timeline.Connector>
              <Timeline.Separator />
              {item.isLoading ? (
                <Timeline.Indicator bg="teal.solid" color="teal.contrast">
                  <LuCheck />
                </Timeline.Indicator>
              ) : (
                <Timeline.Indicator>
                  <LuCheck />
                </Timeline.Indicator>
              )}
            </Timeline.Connector>
            <Timeline.Content>
              <Timeline.Title textStyle="sm">{item.title}</Timeline.Title>
              <Timeline.Description>{item.description}</Timeline.Description>
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline.Root>
    </Box>
  );
};
