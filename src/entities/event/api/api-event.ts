import { UUID } from 'crypto';
import { IApiEvent } from './types';
import { ajax, prepareAjax } from '@/shared/api/ajax';
import { POST, PUT } from '@/shared/config/constants';
import { mockEvents } from '@/features/calendar/model/mock-events';

export const readEvent = (eventId: string) =>
  new Promise<{ payload: IApiEvent | null }>((resolve) => {
    const event = mockEvents.find((e) => e.id === eventId) ?? null;
    setTimeout(() => resolve({ payload: event }), 200);
  });

export const updateEvent = (
  eventId: string,
  date: string,
  locationId: string,
  max_slots: number | null,
  plan_duration: number | null,
) =>
  new Promise<void>((resolve) => {
    const idx = mockEvents.findIndex((e) => e.id === eventId);
    if (idx !== -1) {
      mockEvents[idx] = {
        ...mockEvents[idx],
        date,
        location_id: locationId,
        max_slots,
        plan_duration,
      };
    }
    setTimeout(() => resolve(), 200);
  });

export const applyEvent = (eventId: string) =>
  new Promise<void>((resolve) => {
    const event = mockEvents.find((e) => e.id === eventId);
    if (event && !event.you_applied) {
      event.you_applied = true;
    }
    setTimeout(() => resolve(), 200);
  });

export const cancelEvent = (eventId: string) =>
  new Promise<void>((resolve) => {
    const event = mockEvents.find((e) => e.id === eventId);
    if (event) event.cancelled = true;
    setTimeout(() => resolve(), 200);
  });

export const reopenEvent = (eventId: string) =>
  new Promise<void>((resolve) => {
    const event = mockEvents.find((e) => e.id === eventId);
    if (event) event.cancelled = false;
    setTimeout(() => resolve(), 200);
  });

export const approveApplication = (appId: string) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), 200));

export const rejectApplication = (appId: string) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), 200));
