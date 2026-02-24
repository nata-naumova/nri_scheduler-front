import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCalendarApp } from '@schedule-x/react';
import {
  createEventRecurrencePlugin,
  createEventsServicePlugin,
} from '@schedule-x/event-recurrence';
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls';
import { viewMonthGrid } from '@schedule-x/calendar';

import { useCompanies, useEvents, useMasters } from '../api/calendar-api';
import { mockBgEvents } from '../model/mock-events';

import { calendarConfig } from '@/shared/config/calendar-config';
import { IApiEvent } from '@/entities/event/api/types';
import { useStore } from '@nanostores/react';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { $tz } from '@/entities/user/timezone/model/tz.store';
import '@schedule-x/theme-default/dist/index.css';

dayjs.extend(utc);
dayjs.extend(timezone);

export const useCalendarEvents = () => {
  const navigate = useNavigate();
  const tz = useStore($tz);

  const [calendarControls] = useState(() => createCalendarControlsPlugin());
  const [recurrencePlugin] = useState(() => createEventRecurrencePlugin());
  const [eventsServicePlugin] = useState(() => createEventsServicePlugin());

  const { events, loading: loadingEvents } = useEvents();
  const { companies, loading: loadingCompanies } = useCompanies();
  const { masters, loading: loadingMasters } = useMasters();

  const companiesMap = useMemo(
    () => Object.fromEntries(companies.map((c) => [c.id, c.name])),
    [companies],
  );

  const mastersMap = useMemo(
    () => Object.fromEntries(masters.map((m) => [m.id, m.name])),
    [masters],
  );

  const apiEventToCalendarEvent = (e: IApiEvent) => {
    const start = Temporal.ZonedDateTime.from(e.start_date);
    const end = Temporal.ZonedDateTime.from(e.end_date);

    const startDate = new Date(start.toInstant().epochMilliseconds);
    const endDate = new Date(end.toInstant().epochMilliseconds);

    return {
      id: e.id,
      title: `${companiesMap[e.company_id] ?? 'Компания'} — ${mastersMap[e.master_id] ?? 'Мастер'}`,
      start_date: startDate,
      end_date: endDate,
      calendarId: 'personal',
      apiEvent: e,
    };
  };

  const calendar = useCalendarApp({
    locale: 'ru-RU',
    timezone: tz,
    defaultView: 'monthGrid',
    views: [viewMonthGrid],
    theme: 'dark',
    calendars: calendarConfig,
    events: [],
    backgroundEvents: mockBgEvents,
    plugins: [recurrencePlugin, eventsServicePlugin, calendarControls],
    monthGridOptions: { nEventsPerDay: 2 },
    callbacks: {
      onRangeUpdate() {
        if (!loadingEvents && !loadingCompanies && !loadingMasters) {
          const calendarEvents = events.map(apiEventToCalendarEvent);
          eventsServicePlugin.set(calendarEvents);
        }
      },
      onEventClick(event) {
        navigate(`/event/${event.id}`, { state: event.apiEvent });
      },
    },
  });

  if (calendar) calendar.setTheme('dark');

  const ready = !loadingEvents && !loadingCompanies && !loadingMasters;

  useEffect(() => {
    if (!calendar || !ready) return;

    const calendarEvents = events.map(apiEventToCalendarEvent);
    eventsServicePlugin.set(calendarEvents);
  }, [calendar, ready, events, companiesMap, mastersMap]);

  return {
    calendar,
    calendarControls,
    recurrencePlugin,
    eventsServicePlugin,
  };
};
