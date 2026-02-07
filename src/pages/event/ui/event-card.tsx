import { $profile, $tz } from '@/app/store/profile';
import { applyEvent, cancelEvent, EScenarioStatus, IApiEvent, reopenEvent } from '@/shared/api';
import { CloseButton } from '@/shared/ui/close-button';
import { HoverCard } from '@/shared/ui/hover-card';
import { Warning } from '@/shared/ui/icons';
import { toaster } from '@/shared/ui/toaster';
import { calcMapIconLink } from '@/shared/utils';
import {
  Button,
  Card,
  DataList,
  Dialog,
  Heading,
  HStack,
  Image,
  Link,
  Portal,
  Text,
} from '@chakra-ui/react';
import { useStore } from '@nanostores/react';
import dayjs from 'dayjs';
import { useState } from 'react';

export const EventCard = ({
  event,
  updateEventData,
}: {
  event: IApiEvent;
  updateEventData: () => void;
}) => {
  const tz = useStore($tz);
  const profile = useStore($profile);

  const eventDate = dayjs(event.date).tz(tz);

  const [isLoading, setIsLoading] = useState(false);
  const [youApplied, setYouApplied] = useState(event.you_applied);

  const stats = [
    {
      label: 'Мастер игры',
      value: event.master,
      href: `/profile/${event.master_id}`,
    },
    {
      label: 'Место проведения',
      value: event.location,
      href: `/location/${event.location_id}`,
      mapLink: event.location_map_link,
    },
    { label: 'Дата', value: eventDate.format('DD MMMM') },
    { label: 'Время', value: eventDate.format('HH:mm') },
    {
      label: 'Количество игроков',
      value: event.max_slots ? `${event.players.length} из ${event.max_slots}` : 'Без ограничений',
    },
    {
      label: 'Записаны',
      value: event?.players?.length ? (
        <>
          {event.players.map(([userId, nickname], i) => (
            <>
              <Link key={userId} href={`/profile/${userId}`} colorPalette="blue">
                {nickname}
              </Link>
              {i !== event.players.length - 1 ? ', ' : ''}
            </>
          ))}
        </>
      ) : (
        'Пока никто не записался'
      ),
    },
    {
      label: 'Продолжительность',
      value: event.plan_duration ? `${event.plan_duration} ч` : 'Не строим планов',
    },
  ];

  const handleSubscribe = () => {
    setIsLoading(true);
    applyEvent(event.id)
      .then((responce) => {
        if (responce?.status === EScenarioStatus.SCENARIO_SUCCESS) {
          setYouApplied(true);
          toaster.success({ title: 'Успех. Запись оформлена' });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const nowDate = dayjs().tz(tz);

  const onCancelEvent = () => {
    cancelEvent(event.id).then(() => {
      toaster.success({ title: 'Событие отменено' });
      updateEventData();
    });
  };

  const onReopenEvent = () => {
    reopenEvent(event.id).then(() => {
      toaster.success({ title: 'Событие открыто' });
      updateEventData();
    });
  };

  return (
    <Card.Root width="full">
      <Card.Body>
        <HStack mb="6" gap="3">
          <Heading size="3xl">
            Игра по кампании:&nbsp;
            <Link colorPalette="cyan" variant="underline" href={`/company/${event.company_id}`}>
              {event.company}
            </Link>
          </Heading>
        </HStack>
        <DataList.Root orientation="horizontal">
          {stats.map((item) => {
            const iconLink = calcMapIconLink(item.mapLink);

            return (
              <DataList.Item key={item.label}>
                <DataList.ItemLabel minW="150px">{item.label}</DataList.ItemLabel>
                <DataList.ItemValue color="black" fontWeight="500">
                  {item.href ? (
                    <HStack>
                      <Link href={item.href} colorPalette="blue">
                        {item.value}
                      </Link>
                      {iconLink && (
                        <a target="_blank" href={item.mapLink as string} rel="noreferrer">
                          <Image height="1.75rem" src={iconLink} alt="Показать локацию на карте" />
                        </a>
                      )}
                    </HStack>
                  ) : (
                    <p>{item.value}</p>
                  )}
                </DataList.ItemValue>
              </DataList.Item>
            );
          })}
        </DataList.Root>
      </Card.Body>
      <Card.Footer>
        {profile?.signed ? (
          !event.you_are_master &&
          (nowDate.isSame(eventDate, 'minute') || eventDate.isAfter(nowDate, 'minute')) &&
          !event.cancelled ? (
            <>
              <Button
                variant="subtle"
                colorPalette="blue"
                minW="115px"
                onClick={handleSubscribe}
                disabled={isLoading || youApplied || !profile.verified}
              >
                {isLoading ? '...' : youApplied ? 'Вы записаны' : 'Записаться'}
              </Button>
              {!profile.verified && (
                <HoverCard content="Нельзя записаться на событие - контактные данные не подтверждены">
                  <Warning />
                </HoverCard>
              )}
            </>
          ) : null
        ) : (
          !event.cancelled && 'необходимо авторизоваться для записи на игру'
        )}
        {eventDate.isBefore(nowDate, 'minute') && (
          <>
            <HoverCard content="Запись закрыта потому что событие уже стартовало">
              <Warning />
            </HoverCard>
            <Text>Запись закрыта</Text>
          </>
        )}
        {event.cancelled && (
          <>
            <HoverCard content="Запись закрыта потому что мастер отменил событие">
              <Warning />
            </HoverCard>
            <Text>Запись закрыта мастером</Text>
          </>
        )}
        {event.you_are_master && !event.cancelled && (
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
        {event.you_are_master && event.cancelled && (
          <Button onClick={onReopenEvent} variant="subtle" colorPalette="blue" minW="115px">
            Переоткрыть событие
          </Button>
        )}
      </Card.Footer>
    </Card.Root>
  );
};
