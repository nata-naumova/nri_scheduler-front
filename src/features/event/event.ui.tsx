import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';

import { LuPlus } from 'react-icons/lu';
import { EventFormCreate } from './event-form.ui';

export const EventDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="surface" ml="auto" colorPalette="green">
          <LuPlus />
          Новое событие
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Новое событие</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <EventFormCreate />
            </Dialog.Body>
            <Dialog.Footer>
              <Button type="submit" form="create-location-form">
                Создать
              </Button>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Отмена</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
