import { IApiLocation } from '@/entities/location/api/types';
import { calcMapIconLink } from '@/shared/utils';
import { Card, DataList, Heading, HStack, Image } from '@chakra-ui/react';

export const LocationCard = ({ location }: { location: IApiLocation }) => {
  const stats = [
    { label: 'Регион', value: location.region },
    { label: 'Город', value: location.city },
    { label: 'Адрес', value: location.address },
    { label: 'Описание', value: location.description },
  ];

  const iconLink = calcMapIconLink(location.map_link);

  return (
    <Card.Root width="full">
      <Card.Body>
        <HStack mb="6" gap="3">
          <Heading size="3xl">
            <HStack>
              <span>Локация - {location.name}</span>
              {iconLink && (
                <a target="_blank" href={location.map_link as string} rel="noreferrer">
                  <Image height="2.375rem" src={iconLink} alt="Показать локацию на карте" />
                </a>
              )}
            </HStack>
          </Heading>
        </HStack>
        <DataList.Root orientation="horizontal">
          {stats.map((item) => (
            <DataList.Item key={item.label}>
              <DataList.ItemLabel minW="150px">{item.label}</DataList.ItemLabel>
              <DataList.ItemValue color="black" fontWeight="500">
                <span>{item.value || '—'}</span>
              </DataList.ItemValue>
            </DataList.Item>
          ))}
        </DataList.Root>
      </Card.Body>
      <Card.Footer></Card.Footer>
    </Card.Root>
  );
};
