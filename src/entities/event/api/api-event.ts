import { UUID } from 'crypto';
import { IApiEvent } from './types';
import { ajax, prepareAjax } from '@/shared/api/ajax';
import { POST, PUT } from '@/shared/config/constants';

export const readEvent = (eventId: UUID) => {
  return ajax<IApiEvent>(`/api/events/${eventId}`);
};

export const createEvent = (
  company: UUID,
  date: string,
  location: UUID,
  max_slots: number | null,
  plan_duration: number | null,
) => {
  return ajax<UUID>(
    '/api/events',
    prepareAjax({ company, date, location, max_slots, plan_duration }, POST),
  );
};

export const applyEvent = (eventId: UUID) => {
  return ajax<UUID>(`/api/events/apply/${eventId}`, prepareAjax(undefined, POST));
};

export const updateEvent = (
  eventId: UUID,
  date: string,
  location: UUID,
  max_slots: number | null,
  plan_duration: number | null,
) => {
  return ajax<null>(
    `/api/events/${eventId}`,
    prepareAjax({ date, location, max_slots, plan_duration }, PUT),
  );
};

export const cancelEvent = (eventId: UUID) => {
  return ajax<null>(`/api/events/cancel/${eventId}`, prepareAjax(undefined, POST));
};

export const reopenEvent = (eventId: UUID) => {
  return ajax<null>(`/api/events/reopen/${eventId}`, prepareAjax(undefined, POST));
};

export const approveApplication = (appId: UUID) => {
  return ajax<null>(`/api/apps/approve/${appId}`, prepareAjax(undefined, POST));
};
export const rejectApplication = (appId: UUID) => {
  return ajax<null>(`/api/apps/reject/${appId}`, prepareAjax(undefined, POST));
};
