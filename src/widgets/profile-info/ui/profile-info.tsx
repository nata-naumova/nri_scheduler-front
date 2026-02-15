import { ProfileInfo } from '@/entities/user/ui/profile-info';
import { PROFILE_TABS } from '@/widgets/profile-tabs/model/profile.data';

import { Tabs } from '@chakra-ui/react';

export const ProfileInfoWidget = () => {
  const [USER_TAB] = PROFILE_TABS;

  const profile = {
    id: 1,
    email: 'nanata@ya.ru',
    email_verified: true,
    nickname: 'nanata',
    about_me: 'описание',
    city: 'Москва',
    verified: true,
  };

  return (
    <Tabs.Content value={USER_TAB.id} maxW="2xl">
      <ProfileInfo user={profile} />
    </Tabs.Content>
  );
};
