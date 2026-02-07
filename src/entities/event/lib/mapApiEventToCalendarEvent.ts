import { EVENT_FORMAT } from '@/shared/utils';
import dayjs from 'dayjs';

const DEFAULT_EVENT_DURATION = 4;

export const mapApiEventToCalendarEvent = (apiEvent: any, tz: string) => {
  const start = dayjs(apiEvent.date).tz(tz);

  let end = start.add(apiEvent.plan_duration ?? DEFAULT_EVENT_DURATION, 'hour');

  if (!end.isSame(start, 'day')) {
    end = start.endOf('day');
  }

  return {
    id: apiEvent.id,
    title: apiEvent.company,
    start: start.format(EVENT_FORMAT),
    end: end.format(EVENT_FORMAT),
    style: apiEvent.style,
  };
};
