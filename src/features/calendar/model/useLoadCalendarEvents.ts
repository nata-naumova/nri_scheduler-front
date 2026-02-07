import { useEffect, useState } from 'react';
import { useCalendarApp } from '@schedule-x/react';
import {
  createEventRecurrencePlugin,
  createEventsServicePlugin,
} from '@schedule-x/event-recurrence';
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls';
import { mockEvents, mockBgEvents } from './mock-events';
import { viewMonthGrid } from '@schedule-x/calendar';
import { useNavigate } from 'react-router-dom';

export const useCalendarEvents = () => {
  const [calendarControls] = useState(() => createCalendarControlsPlugin());
  const [recurrencePlugin] = useState(() => createEventRecurrencePlugin());
  const [eventsServicePlugin] = useState(() => createEventsServicePlugin());

  const calendarConfig = {
    personal: {
      colorName: 'personal',
      lightColors: {
        main: '#f9d71c',
        container: '#fff5aa',
        onContainer: '#594800',
      },
      darkColors: {
        main: '#fff5c0',
        onContainer: '#fff5de',
        container: '#a29742',
      },
    },
    work: {
      colorName: 'work',
      lightColors: {
        main: '#f91c45',
        container: '#ffd2dc',
        onContainer: '#59000d',
      },
      darkColors: {
        main: '#ffc0cc',
        onContainer: '#ffdee6',
        container: '#a24258',
      },
    },
  };

  const navigate = useNavigate();

  const calendar = useCalendarApp({
    locale: 'ru-RU',
    timezone: 'Asia/Tokyo',
    defaultView: 'monthGrid',
    views: [viewMonthGrid],
    calendars: calendarConfig,
    events: mockEvents,
    backgroundEvents: mockBgEvents,
    plugins: [recurrencePlugin, eventsServicePlugin, calendarControls],
    monthGridOptions: { nEventsPerDay: 2 },
    callbacks: {
      onRangeUpdate(range) {
        console.log('Range updated:', range.start, range.end);
      },
      onEventClick(event) {
        navigate(`/event/${event.id}`);
      },
    },
  });

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
