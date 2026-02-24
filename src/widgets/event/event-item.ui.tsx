import { IMasterApp, IPlayerApp } from '@/entities/user/api/types';
import { DialogItem } from '@/shared/ui/dialog';
import { Badge, Button, Card, Heading } from '@chakra-ui/react';
import dayjs from 'dayjs';

interface EventItemProps {
  item: IPlayerApp | IMasterApp;
  isMasterView: boolean;
  onReject?: (eventId: string) => void;
  onApprove?: (eventId: string) => void;
}

function isMasterApp(item: IPlayerApp | IMasterApp): item is IMasterApp {
  return 'player_name' in item;
}

export const EventItem = ({ item, isMasterView, onReject, onApprove }: EventItemProps) => {
  const isMaster = isMasterApp(item);

  return (
    <DialogItem
      item={item}
      trigger={
        <Card.Root h="full" cursor="pointer" _hover={{ shadow: 'md' }}>
          <Card.Header>
            {isMasterView ? (
              <Heading>
                Игрок{' '}
                <Badge fontSize="inherit" variant="surface">
                  {isMaster ? item.player_name : item.master_name}
                </Badge>{' '}
                хочет присоединиться к вашей игре по кампании{' '}
                <Badge fontSize="inherit" variant="surface">
                  {item.company_name}
                </Badge>
              </Heading>
            ) : (
              <Heading>
                Вы подали заявку на участие в игре по кампании{' '}
                <Badge fontSize="inherit" variant="surface">
                  {item.company_name}
                </Badge>{' '}
                мастера{' '}
                <Badge fontSize="inherit" variant="surface">
                  {isMaster ? item.player_name : item.master_name}
                </Badge>
              </Heading>
            )}
          </Card.Header>
          <Card.Body gap="2">
            <Card.Description lineClamp={4}>
              {dayjs(item.event_date).format('D MMMM YYYY')}
            </Card.Description>
          </Card.Body>
        </Card.Root>
      }
      footer={
        isMasterView && (
          <>
            <Button
              variant="outline"
              onClick={() => onReject?.(item.id)}
              disabled={item.approval === false}
            >
              {item.approval ? 'Отклонить' : 'Отклонено'}
            </Button>
            <Button onClick={() => onApprove?.(item.id)} disabled={item.approval === true}>
              {item.approval ? 'Подтверждено' : 'Подтвердить'}
            </Button>
          </>
        )
      }
    />
  );
};
