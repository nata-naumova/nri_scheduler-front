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
import { mockEvents, mockBgEvents } from '../model/mock-events';
import { Temporal } from '@js-temporal/polyfill';
import { calendarConfig } from '@/shared/config/calendar-config';

export const useCalendarEvents = () => {
  const navigate = useNavigate();

  // Плагины календаря
  const [calendarControls] = useState(() => createCalendarControlsPlugin());
  const [recurrencePlugin] = useState(() => createEventRecurrencePlugin());
  const [eventsServicePlugin] = useState(() => createEventsServicePlugin());

  const calendar = useCalendarApp({
    locale: 'ru-RU',
    timezone: 'Asia/Tokyo',
    defaultView: 'monthGrid',
    views: [viewMonthGrid],
    calendars: calendarConfig,
    events: [],
    backgroundEvents: mockBgEvents,
    plugins: [recurrencePlugin, eventsServicePlugin, calendarControls],
    monthGridOptions: { nEventsPerDay: 2 },
    callbacks: {
      onRangeUpdate(range) {
        console.log('onRangeUpdate', range.start, range.end);
        loadEvents(range.start, range.end);
      },
      onEventClick(event) {
        navigate(`/event/${event.id}`);
      },
    },
  });

  // Функция загрузки событий через мок API
  const loadEvents = async (start?: Temporal.ZonedDateTime, end?: Temporal.ZonedDateTime) => {
    const events = await calendarApi.getEvents(start, end);
    console.log('Events: ', events);

    // Добавляем события через EventsServicePlugin
    events.forEach((e: any) => eventsServicePlugin.add(e));

    return events;
  };

  // Загрузка всех событий при монтировании
  useEffect(() => {
    loadEvents();
  }, []);

  // Вызов getAll для синхронизации EventsServicePlugin
  useEffect(() => {
    eventsServicePlugin.getAll();
  }, []);

  return {
    calendar,
    calendarControls,
    recurrencePlugin,
    eventsServicePlugin,
  };
};
