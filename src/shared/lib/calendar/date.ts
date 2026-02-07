import dayjs from 'dayjs';

export const convertRangeToTz = (start: string, end: string, tz: string) => {
  return {
    start: dayjs(start).tz(tz).format(),
    end: dayjs(end).tz(tz).format(),
  };
};
