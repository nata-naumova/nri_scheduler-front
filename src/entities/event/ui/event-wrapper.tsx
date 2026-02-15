import { NotFoundPage } from '@/pages/not-found/ui/not-found';
import { IApiEvent } from '../api/types';
import { EventCardSkeleton } from './event-skeleton';
import { EventCard } from './event-card/event-card';

interface EventWrapperProps {
  event: IApiEvent | null;
  fetching: boolean;
  updateEventData: () => void;
}

export const EventWrapper = ({ event, fetching, updateEventData }: EventWrapperProps) => {
  if (fetching) return <EventCardSkeleton />;
  if (!event)
    return <NotFoundPage checkButton={false} title="Событие не найдено, попробуйте еще раз!" />;
  return <EventCard event={event} updateEventData={updateEventData} />;
};
