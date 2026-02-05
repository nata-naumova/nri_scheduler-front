import { Button, HStack, Input, Stack } from '@chakra-ui/react';

import { Avatar } from '../../ui/avatar';
import { toaster } from '../../ui/toaster';
import { getMyProfile, setAvatar } from '../../../api';
import { $avatarLink } from '../../../store/profile';
import { useStore } from '@nanostores/react';
import { useState } from 'react';

export const ProfilePicture = ({ nickname }: { readonly nickname: string | undefined }) => {
  const link = useStore($avatarLink);
  const [newLink, setNewLink] = useState('');

  return (
    <HStack>
      <Avatar src={link?.link} fallback={nickname} w="100px" h="100px" />
      <Stack>
        {link?.source}
        <HStack>
          <Input
            placeholder="Заполните поле"
            value={newLink}
            onChange={(e) => setNewLink(e.currentTarget.value)}
          />
          <Button
            type="button"
            disabled={!newLink}
            onClick={() =>
              setAvatar(newLink)
                .then((res) => res && getMyProfile())
                .then(
                  (res) =>
                    res &&
                    toaster.success({
                      title: 'Ссылка на аватар обновлена',
                    }),
                )
            }
          >
            Обновить ссылку
          </Button>
        </HStack>
      </Stack>
    </HStack>
  );
};
