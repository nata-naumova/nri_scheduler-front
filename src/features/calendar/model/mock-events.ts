// import { Temporal } from '@js-temporal/polyfill';
import { IApiEvent } from '@/entities/event/api/types';
import 'temporal-polyfill/global';

export const mockEvents: IApiEvent[] = [
  {
    id: '1',
    company: 'Мерри Поппинс',
    company_id: '1',
    master: 'Мастер Игорек',
    master_id: '1',
    location: 'Москва',
    location_id: '1',
    date: '2026-02-16T12:00:00+03:00',
    max_slots: 10,
    plan_duration: 3,
    players: [
      ['1', 'Миша'],
      ['2', 'Таня'],
    ],
    you_applied: false,
    you_are_master: true,
    cancelled: false,
  },
  {
    id: '2',
    company: 'Фантазия',
    company_id: '2',
    master: 'Мастер Пётр',
    master_id: '2',
    location: 'Санкт-Петербург',
    location_id: '2',
    date: '2026-02-18T15:00:00+03:00',
    max_slots: 8,
    plan_duration: 2,
    players: [
      ['1', 'Миша'],
      ['2', 'Таня'],
    ],
    you_applied: false,
    you_are_master: false,
    cancelled: false,
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
