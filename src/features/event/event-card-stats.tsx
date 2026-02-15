import { IApiEvent } from '@/entities/event/api/types';
import { calcMapIconLink } from '@/shared/utils';
import { DataList, HStack, Image, Link, Text } from '@chakra-ui/react';
import { EventPlayersList } from './event-player-list';
import dayjs from 'dayjs';

interface EventCardStatsProps {
  event: IApiEvent;
  tz: string;
}

export const EventCardStats = ({ event, tz }: EventCardStatsProps) => {
  const eventDate = dayjs(event.date).tz(tz);

  const stats = [
    { label: 'Мастер игры', value: event.master, href: `/profile/${event.master_id}` },
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
      value: (
        <EventPlayersList
          players={event.players.map((p) => ({ userId: p.userId, nickname: p.nickname }))}
        />
      ),
    },
    {
      label: 'Продолжительность',
      value: event.plan_duration ? `${event.plan_duration} ч` : 'Не строим планов',
    },
  ];

  return (
    <DataList.Root orientation="horizontal">
      {stats.map((item) => {
        const iconLink = item.mapLink ? calcMapIconLink(item.mapLink) : null;
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
                    <a target="_blank" href={item.mapLink!} rel="noreferrer">
                      <Image height="1.75rem" src={iconLink} alt="Показать локацию на карте" />
                    </a>
                  )}
                </HStack>
              ) : typeof item.value === 'string' ? (
                <Text>{item.value}</Text>
              ) : (
                item.value
              )}
            </DataList.ItemValue>
          </DataList.Item>
        );
      })}
    </DataList.Root>
  );
};
