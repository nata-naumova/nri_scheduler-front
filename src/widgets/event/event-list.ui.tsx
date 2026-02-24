import { Grid, HStack, Stack, Switch, useBreakpointValue } from '@chakra-ui/react';

import { IMasterApp, IPlayerApp } from '@/entities/user/api/types';
import { toaster } from '@/shared/ui/toaster';
import { approveApplication, rejectApplication } from '@/entities/event/api/api-event';
import { ViewToggle } from '@/shared/ui/view-toggle';
import { getGridColumnsConfig, PROFILE_TEXTS } from '../profile-tabs/model/profile.data';
import { EmptyList } from '../empty-list';
import { EventItem } from './event-item.ui';

interface EventListProps {
  isChecked: boolean;
  layoutMode: boolean;
  onLayoutToggle: () => void;
  toggleCheckbox: () => void;
  playerAppList: IPlayerApp[];
  masterAppList: IMasterApp[];
  onUpdate?: () => Promise<void>;
}

export const EventList = ({
  isChecked,
  toggleCheckbox,
  layoutMode,
  onLayoutToggle,
  playerAppList,
  masterAppList,
  onUpdate,
}: EventListProps) => {
  const currentList = isChecked ? playerAppList : masterAppList;
  const isEmpty = currentList.length === 0;
  const emptyTexts = isChecked
    ? PROFILE_TEXTS.emptyStates.player
    : PROFILE_TEXTS.emptyStates.master;

  const handleApprove = async (eventId: string) => {
    const result = await approveApplication(eventId);
    if (result !== null && result !== undefined) {
      toaster.success({ title: 'Заявка подтверждена' });
      await onUpdate?.();
    }
  };

  const handleReject = async (eventId: string) => {
    const result = await rejectApplication(eventId);
    if (result !== null && result !== undefined) {
      toaster.success({ title: 'Заявка отклонена' });
      await onUpdate?.();
    }
  };

  const gridColumns = useBreakpointValue(getGridColumnsConfig(layoutMode));

  return (
    <Stack>
      <HStack justify="flex-end" gap={4}>
        <Switch.Root checked={isChecked} onCheckedChange={toggleCheckbox}>
          <Switch.HiddenInput />
          <Switch.Label>
            {isChecked ? PROFILE_TEXTS.switchLabels.master : PROFILE_TEXTS.switchLabels.player}
          </Switch.Label>
          <Switch.Control />
        </Switch.Root>
        <ViewToggle isChecked={layoutMode} toggleCheckbox={onLayoutToggle} />
      </HStack>

      {isEmpty ? (
        <EmptyList title={emptyTexts.title} description={emptyTexts.description} />
      ) : (
        <Grid templateColumns={`repeat(${gridColumns}, 1fr)`} gap="4">
          {currentList.map((item) => (
            <EventItem
              key={item.id}
              item={item}
              isMasterView={!isChecked}
              onReject={handleReject}
              onApprove={handleApprove}
            />
          ))}
        </Grid>
      )}
    </Stack>
  );
};
