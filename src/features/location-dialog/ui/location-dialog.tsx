import LocationFormCreate from '@/pages/calendar/location-form-create';
import { Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';

export const LocationDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="surface" size="sm" w="fit-content">
          Добавить локацию
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Новая локация</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <LocationFormCreate />
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
