import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalendarApp } from '@schedule-x/react';
import {
  createEventRecurrencePlugin,
  createEventsServicePlugin,
} from '@schedule-x/event-recurrence';
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls';
import { viewMonthGrid } from '@schedule-x/calendar';

import { calendarApi } from '../api/calendar-api';
import { mockBgEvents } from '../model/mock-events';

import { calendarConfig } from '@/shared/config/calendar-config';
import { IApiEvent } from '@/entities/event/api/types';
import { useStore } from '@nanostores/react';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { $tz } from '@/entities/user/timezone/model/tz.store';

dayjs.extend(utc);
dayjs.extend(timezone);

export const useCalendarEvents = () => {
  const navigate = useNavigate();
  const tz = useStore($tz);

  const [calendarControls] = useState(() => createCalendarControlsPlugin());
  const [recurrencePlugin] = useState(() => createEventRecurrencePlugin());
  const [eventsServicePlugin] = useState(() => createEventsServicePlugin());

  const apiEventToCalendarEvent = (e: IApiEvent) => {
    const dateStr = e.date.includes('T') ? e.date : `${e.date}T09:00:00`;

    const start = Temporal.ZonedDateTime.from(`${dateStr}[${tz}]`);
    const end = start.add({ hours: e.plan_duration ?? 3 });

    return {
      id: e.id,
      title: `${e.company} — ${e.master}`,
      start,
      end,
      calendarId: 'personal',
      apiEvent: e,
    };
  };

  const loadEvents = async (start?: string, end?: string) => {
    try {
      const apiEvents = await calendarApi.getEvents(start, end);
      const calendarEvents = apiEvents.map(apiEventToCalendarEvent);

      // Сохраняем события в плагине
      if (eventsServicePlugin.set) {
        eventsServicePlugin.set(calendarEvents);
      } else {
        eventsServicePlugin.removeAll();
        calendarEvents.forEach(eventsServicePlugin.add);
      }

      console.log('API события:', apiEvents);
      console.log('События для календаря:', calendarEvents);

      return calendarEvents;
    } catch (err) {
      console.error('Ошибка загрузки событий', err);
      return [];
    }
  };

  const calendar = useCalendarApp({
    locale: 'ru-RU',
    timezone: tz,
    defaultView: 'monthGrid',
    views: [viewMonthGrid],
    calendars: calendarConfig,
    events: [],
    backgroundEvents: mockBgEvents,
    plugins: [recurrencePlugin, eventsServicePlugin, calendarControls],
    monthGridOptions: { nEventsPerDay: 2 },
    callbacks: {
      onRangeUpdate(range) {
        loadEvents(range.start, range.end);
      },
      onEventClick(event) {
        navigate(`/event/${event.id}`, { state: event.apiEvent });
      },
    },
  });

  useEffect(() => {
    if (!calendar || !eventsServicePlugin) return;
    loadEvents();
  }, [calendar, eventsServicePlugin]);

  return {
    calendar,
    calendarControls,
    recurrencePlugin,
    eventsServicePlugin,
  };
};
