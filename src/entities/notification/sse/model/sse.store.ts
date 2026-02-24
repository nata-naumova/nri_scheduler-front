import { $profile } from '@/entities/user/profile/model/profile.store';
import { $tz } from '@/entities/user/timezone/model/tz.store';
import { API_HOST } from '@/shared/config/constants';
import { toaster } from '@/shared/ui/toaster';
import { YYYY_MM_DD } from '@/shared/utils';

let eventSource: EventSource | null = null;
const DATE_REGEXP = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/;

$profile.listen((p) => {
  if (p?.signed) {
    eventSource = new EventSource(API_HOST + '/api/sse', {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      let msg: string = event.data;
      const match = msg.match(DATE_REGEXP)?.[0];
      if (match) {
        const date = dayjs(match).tz($tz.get()).format(YYYY_MM_DD);
        msg = msg.replace(match, date);
      }
      toaster.success({ title: msg });
    };

    eventSource.onerror = (event) => {
      console.info('sse error:');
      console.error(event);
    };
  } else {
    eventSource?.close();
    eventSource = null;
  }
});
