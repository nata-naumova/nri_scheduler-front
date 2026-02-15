import { IApiEvent } from '@/entities/event/api/types';
import { CloseButton } from '@/shared/ui/close-button';
import { HoverCard } from '@/shared/ui/hover-card';
import { Warning } from '@/shared/ui/icons';
import { Button, Dialog, HStack, Portal, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';

interface EventCardFooterProps {
  event: IApiEvent;
  nowDate: dayjs.Dayjs;
  youApplied: boolean;
  isLoading: boolean;
  profileSigned: boolean;
  profileVerified: boolean;
  onSubscribe: () => void;
  onCancelEvent: () => void;
  onReopenEvent: () => void;
}

export const EventCardFooter = ({
  event,
  nowDate,
  youApplied,
  isLoading,
  profileSigned,
  profileVerified,
  onSubscribe,
  onCancelEvent,
  onReopenEvent,
}: EventCardFooterProps) => {
  const eventDate = dayjs(event.date);

  const isMaster = event.you_are_master;
  const isCancelled = event.cancelled;
  const isEventInFuture =
    nowDate.isSame(eventDate, 'minute') || eventDate.isAfter(nowDate, 'minute');
  const isEventStarted = eventDate.isBefore(nowDate, 'minute');

  const canSubscribe = profileSigned && !isMaster && !isCancelled && isEventInFuture;
  const showAuthMessage = !profileSigned && !isCancelled;

  return (
    <>
      {/* Подписка на событие */}
      {canSubscribe && (
        <HStack gap="2">
          <Button
            variant="subtle"
            colorPalette="blue"
            minW="115px"
            onClick={onSubscribe}
            disabled={isLoading || youApplied || !profileVerified}
          >
            {isLoading ? '...' : youApplied ? 'Вы записаны' : 'Записаться'}
          </Button>
          {!profileVerified && (
            <HoverCard content="Нельзя записаться на событие - контактные данные не подтверждены">
              <Warning />
            </HoverCard>
          )}
        </HStack>
      )}

      {/* Сообщение о необходимости авторизации */}
      {showAuthMessage && <Text>необходимо авторизоваться для записи на игру</Text>}

      {/* Событие уже началось */}
      {isEventStarted && (
        <HStack gap="2">
          <HoverCard content="Запись закрыта потому что событие уже стартовало">
            <Warning />
          </HoverCard>
          <Text>Запись закрыта</Text>
        </HStack>
      )}

      {/* Событие отменено мастером */}
      {isCancelled && (
        <HStack gap="2">
          <HoverCard content="Запись закрыта потому что мастер отменил событие">
            <Warning />
          </HoverCard>
          <Text>Запись закрыта мастером</Text>
        </HStack>
      )}

      {/* Кнопка отмены события для мастера */}
      {isMaster && !isCancelled && (
        <Dialog.Root role="alertdialog" placement="center">
          <Dialog.Trigger asChild>
            <Button type="button" variant="subtle" colorPalette="blue" minW="115px">
              Отменить событие
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>А вы уверены?</Dialog.Title>
                </Dialog.Header>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Нет</Button>
                  </Dialog.ActionTrigger>
                  <Button colorPalette="red" onClick={onCancelEvent}>
                    Да
                  </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      )}

      {/* Кнопка переоткрытия события для мастера */}
      {isMaster && isCancelled && (
        <Button onClick={onReopenEvent} variant="subtle" colorPalette="blue" minW="115px">
          Переоткрыть событие
        </Button>
      )}
    </>
  );
};
