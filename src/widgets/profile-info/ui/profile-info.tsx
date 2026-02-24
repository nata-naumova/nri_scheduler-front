import { ProfileInfo } from '@/entities/user/ui/profile-info';
import { useUser } from '@/features/auth/model/useAuth';
import { PROFILE_TABS } from '@/widgets/profile-tabs/model/profile.data';

import { Tabs } from '@chakra-ui/react';

export const ProfileInfoWidget = () => {
  const [USER_TAB] = PROFILE_TABS;
  const { user } = useUser();

  return (
    <Tabs.Content value={USER_TAB.id} maxW="2xl">
      <ProfileInfo user={user} />
    </Tabs.Content>
  );
};
