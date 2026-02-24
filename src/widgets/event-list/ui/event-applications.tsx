import { Tabs } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useStore } from '@nanostores/react';

import { $checkboxState, toggleCheckbox } from '@/shared/store/checkboxStore';
import { useEventApplications } from '@/features/event-applications/model/useEventApplications';
import { EAbortReason } from '@/shared/api/types';

import { PROFILE_TABS } from '@/widgets/profile-tabs/model/profile.data';
import { EventList } from '@/widgets/event/event-list.ui';

export const EventApplications = () => {
  const [, EVENTS_TAB] = PROFILE_TABS;

  const { eventsType, eventsView } = useStore($checkboxState);
  const { playerAppList, masterAppList, load } = useEventApplications();

  useEffect(() => {
    const abortController = new AbortController();
    load(eventsType, abortController);

    return () => abortController.abort(EAbortReason.UNMOUNT);
  }, [eventsType]);

  return (
    <Tabs.Content value={EVENTS_TAB.id}>
      <EventList
        isChecked={eventsType}
        toggleCheckbox={() => toggleCheckbox('eventsType')}
        layoutMode={eventsView}
        onLayoutToggle={() => toggleCheckbox('eventsView')}
        playerAppList={playerAppList}
        masterAppList={masterAppList}
        // onUpdate={load}
      />
    </Tabs.Content>
  );
};
