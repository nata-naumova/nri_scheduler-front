import { API_HOST } from '@/shared/config/constants';
import { atom, computed, task } from 'nanostores';
import { getTgAvatar } from '../../api/api-profile';
import { procetar } from 'procetar';
import { $profile } from '../../profile/model/profile.store';

const _tgAvatarLink = atom('');
export const setFromTgAuthorization = (tgAvatarLink: string) => _tgAvatarLink.set(tgAvatarLink);

export const $avatarLink = computed([$profile, _tgAvatarLink], (p, tg) =>
  task(async () => {
    if ('avatar_link' in p && p.avatar_link) {
      return {
        link: API_HOST + p.avatar_link,
        source: 'Аватар установлен пользователем',
      };
    }

    if (tg) {
      const tgPhotoRes = await getTgAvatar(tg).catch(() => null);
      if (tgPhotoRes && tgPhotoRes.ok) {
        const tgPhotoBuf = await tgPhotoRes.blob().catch(() => null);
        if (tgPhotoBuf) {
          return {
            link: URL.createObjectURL(tgPhotoBuf),
            source: 'Аватар из Telegram',
          };
        }
      }
    }

    if ('id' in p) {
      const gen = await procetar(p.id);
      return {
        link: gen,
        source: 'Сгенерированный аватар',
      };
    }

    return undefined;
  }),
);
