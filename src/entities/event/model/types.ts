export type Event = {
  id: string;
  title: string;
  start: Temporal.ZonedDateTime;
  end: Temporal.ZonedDateTime;
  people?: string[];
  calendarId?: string;
};
