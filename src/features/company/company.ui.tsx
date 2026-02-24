import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  Portal,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react';

import { CompanyFormCreate } from './company-form.ui';
import { PreviewCompany } from '@/features/company/company-preview.ui';

export const CompanyDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="surface" size="sm" w="fit-content">
          Добавить кампанию
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Новая кампании</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <CompanyFormCreate onSubmit={() => console.log('onSubmit CompanyFormCreate')} />
              <Stack gap={2}>
                <HStack mt={2}>
                  <Separator flex="1" />
                  <Text flexShrink="0">Оформление</Text>
                  <Separator flex="1" />
                </HStack>
                {/* <PreviewCompany /> */}
              </Stack>
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
