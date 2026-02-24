import { Box, Button, CloseButton, Dialog, Portal } from '@chakra-ui/react';
import { CompanyFormUpdate } from './company-form';
import { convertEventStyleToCSS } from '@/shared/utils';
import { IApiCompanyInfo } from '@/entities/company/api/types';

interface CompanyDialogProps {
  item: IApiCompanyInfo;
}

export const CompanyDialog = ({ item }: CompanyDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="surface" w="fit-content" colorPalette="blue">
          Редактировать
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Редактирование</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body spaceY={4}>
              <CompanyFormUpdate />
              <Box
                w="fit-content"
                p={1}
                borderRadius="sm"
                fontSize="xs"
                style={convertEventStyleToCSS(item.event_style)}
              >
                Внешний вид в календаре
              </Box>
            </Dialog.Body>
            <Dialog.Footer>
              <Button type="submit" form="create-location-form">
                Сохранить
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
