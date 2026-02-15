import { Tabs } from '@chakra-ui/react';
import { useStore } from '@nanostores/react';

import { $activeTab, setActiveTab } from '@/app/store/tabsStore';
import { PROFILE_TABS } from '../model/profile.data';

type Props = {
  children: React.ReactNode;
};

export const ProfileTabs = ({ children }: Props) => {
  const activeTab = useStore($activeTab);

  return (
    <Tabs.Root value={activeTab} onValueChange={(e) => setActiveTab(e.value)} variant="outline">
      <Tabs.List>
        {PROFILE_TABS.map(({ id, label }) => (
          <Tabs.Trigger key={id} value={id}>
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {children}
    </Tabs.Root>
  );
};
