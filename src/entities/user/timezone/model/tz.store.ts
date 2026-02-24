import { computed } from 'nanostores';
import { $profile } from '../../profile/model/profile.store';
import { IApiProfile } from '../../api/types';
import dayjs from 'dayjs';

export const TIMEZONES: ReadonlyMap<number, string> = new Map([
  [2, 'Europe/Kaliningrad'],
  [3, 'Europe/Moscow'],
  [4, 'Europe/Samara'],
  [5, 'Asia/Yekaterinburg'],
  [6, 'Asia/Omsk'],
  [7, 'Asia/Krasnoyarsk'],
  [8, 'Asia/Irkutsk'],
  [9, 'Asia/Yakutsk'],
  [10, 'Asia/Vladivostok'],
  [11, 'Asia/Magadan'],
  [12, 'Asia/Kamchatka'],

  [1, 'Europe/Berlin'],
  [0, 'Europe/London'],
  [-1, 'Atlantic/Cape_Verde'],
  [-2, 'America/Noronha'],
  [-3, 'America/Argentina/Buenos_Aires'],
  [-4, 'America/Halifax'],
  [-5, 'America/New_York'],
  [-6, 'America/Chicago'],
  [-7, 'America/Denver'],
  [-8, 'America/Los_Angeles'],
  [-9, 'America/Anchorage'],
  [-10, 'Pacific/Honolulu'],
  [-11, 'Pacific/Pago_Pago'],
]);

export const $tz = computed($profile, (p: Partial<IApiProfile> | undefined) => {
  // если профиль ещё не загружен
  if (!p || p.get_tz_from_device || typeof p.timezone_offset !== 'number') {
    return dayjs.tz.guess();
  }

  const timeZone = TIMEZONES.get(p.timezone_offset as number);
  if (timeZone) return timeZone;

  console.error('Передано некорректное смещение временной зоны', p.timezone_offset);
  return dayjs.tz.guess();
});
