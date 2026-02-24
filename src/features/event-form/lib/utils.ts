import { EVENT_FORMAT } from '@/shared/utils';
import dayjs, { tz } from 'dayjs';

export const validateDate = (value: string) => {
  clearErrors('startTime');
  const fieldDate = dayjs.tz(`${value} 12:00`, EVENT_FORMAT, tz);
  const nowDate = dayjs().tz(tz);
  if (nowDate.isSame(fieldDate, 'day') || fieldDate.isAfter(nowDate, 'day')) {
    return true;
  } else {
    return 'Вы указали прошлый день';
  }
};

export const validateTime = (value: string) => {
  if (!isStart) {
    return 'Укажите дату';
  }
  const fultime = dayjs.tz(`${isStart} ${value}`, EVENT_FORMAT, tz);
  const nowDate = dayjs().tz(tz);
  if (nowDate.isSame(fultime, 'minute') || fultime.isAfter(nowDate, 'minute')) {
    return true;
  } else {
    return 'Вы указали прошлое время';
  }
};
