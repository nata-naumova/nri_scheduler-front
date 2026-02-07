// import { Temporal } from '@js-temporal/polyfill';
import 'temporal-polyfill/global';

export const mockEvents = [
  // Февраль 2026
  {
    id: '1',
    title: 'Каркассон Турнир',
    start: Temporal.ZonedDateTime.from('2026-02-07T18:00:00+03:00[Europe/Moscow]'),
    end: Temporal.ZonedDateTime.from('2026-02-07T21:00:00+03:00[Europe/Moscow]'),
    people: ['Иван', 'Мария'],
    calendarId: 'personal',
  },
  {
    id: '2',
    title: 'Настольный Мафия Вечер',
    start: Temporal.ZonedDateTime.from('2026-02-10T19:00:00+03:00[Europe/Moscow]'),
    end: Temporal.ZonedDateTime.from('2026-02-10T22:00:00+03:00[Europe/Moscow]'),
    people: ['Алексей', 'Ольга', 'Сергей'],
    calendarId: 'work',
  },
  {
    id: '3',
    title: 'Тикет ту Райд: Европа',
    start: Temporal.ZonedDateTime.from('2026-02-14T17:00:00+03:00[Europe/Moscow]'),
    end: Temporal.ZonedDateTime.from('2026-02-14T20:00:00+03:00[Europe/Moscow]'),
    people: ['Наталья', 'Дмитрий'],
    calendarId: 'personal',
  },
  {
    id: '4',
    title: 'Скраббл: Блиц',
    start: Temporal.ZonedDateTime.from('2026-02-21T18:30:00+03:00[Europe/Moscow]'),
    end: Temporal.ZonedDateTime.from('2026-02-21T21:30:00+03:00[Europe/Moscow]'),
    people: ['Елена', 'Павел'],
    calendarId: 'work',
  },
  {
    id: '5',
    title: 'Диксит Вечер',
    start: Temporal.ZonedDateTime.from('2026-02-28T19:00:00+03:00[Europe/Moscow]'),
    end: Temporal.ZonedDateTime.from('2026-02-28T22:00:00+03:00[Europe/Moscow]'),
    people: ['София', 'Максим', 'Виктория'],
    calendarId: 'personal',
  },

  // Март 2026
  {
    id: '6',
    title: 'Колонизаторы: Турнир',
    start: Temporal.ZonedDateTime.from('2026-03-03T18:00:00+03:00[Europe/Moscow]'),
    end: Temporal.ZonedDateTime.from('2026-03-03T21:00:00+03:00[Europe/Moscow]'),
    people: ['Андрей', 'Ирина'],
    calendarId: 'personal',
  },
  {
    id: '7',
    title: 'Уно: Турнир',
    start: Temporal.ZonedDateTime.from('2026-03-08T17:30:00+03:00[Europe/Moscow]'),
    end: Temporal.ZonedDateTime.from('2026-03-08T19:30:00+03:00[Europe/Moscow]'),
    people: ['Денис', 'Анна', 'Кирилл'],
    calendarId: 'work',
  },
  {
    id: '8',
    title: 'Билет на поезд: США',
    start: Temporal.ZonedDateTime.from('2026-03-12T18:00:00+03:00[Europe/Moscow]'),
    end: Temporal.ZonedDateTime.from('2026-03-12T21:00:00+03:00[Europe/Moscow]'),
    people: ['Лилия', 'Роман'],
    calendarId: 'personal',
  },
  {
    id: '9',
    title: 'Диксит: Тематическая ночь',
    start: Temporal.ZonedDateTime.from('2026-03-19T19:00:00+03:00[Europe/Moscow]'),
    end: Temporal.ZonedDateTime.from('2026-03-19T22:00:00+03:00[Europe/Moscow]'),
    people: ['Олег', 'Надежда', 'Светлана'],
    calendarId: 'work',
  },
  {
    id: '10',
    title: 'Манчкин: Сражение',
    start: Temporal.ZonedDateTime.from('2026-03-26T18:30:00+03:00[Europe/Moscow]'),
    end: Temporal.ZonedDateTime.from('2026-03-26T21:30:00+03:00[Europe/Moscow]'),
    people: ['Игорь', 'Марина'],
    calendarId: 'personal',
  },
];

export const mockBgEvents = [
  {
    title: 'Технические работы',
    start: Temporal.PlainDate.from('2026-02-14'),
    end: Temporal.PlainDate.from('2026-02-15'),
    style: {
      backgroundColor: 'gray',
      opacity: 0.3,
    },
  },
];
