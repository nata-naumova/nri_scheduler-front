import { mockEvents, mockBgEvents } from '../model/mock-events';
import { Temporal } from '@js-temporal/polyfill';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const calendarApi = {
  getEvents: async (start?: Temporal.ZonedDateTime, end?: Temporal.ZonedDateTime) => {
    await delay(300); // имитация сетевого запроса
    if (start && end) {
      return mockEvents.filter(
        (e) =>
          Temporal.ZonedDateTime.compare(e.start, end) <= 0 &&
          Temporal.ZonedDateTime.compare(e.end, start) >= 0,
      );
    }
    return mockEvents;
  },

  getBackgroundEvents: async () => {
    await delay(300);
    return mockBgEvents;
  },

  addEvent: async (event: (typeof mockEvents)[0]) => {
    await delay(200);
    mockEvents.push(event);
    return event;
  },
};
