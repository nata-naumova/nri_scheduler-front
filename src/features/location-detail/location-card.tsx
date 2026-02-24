import { IApiLocation } from '@/entities/location/api/types';
import { calcMapIconLink } from '@/shared/utils';
import { Box, DataList, Heading, HStack, Image } from '@chakra-ui/react';

interface LocationCardProps {
  item: IApiLocation | null;
}

export const LocationCard = ({ item }: LocationCardProps) => {
  const iconLink = calcMapIconLink(item?.map_link ?? '#');

  if (!item) return <Box>Локация не найдена</Box>;

  return (
    <Box spaceY={4}>
      <Heading size="3xl">
        <HStack>
          <span>Локация - {item.name}</span>
          {iconLink && (
            <a target="_blank" href={item.map_link as string} rel="noreferrer">
              <Image height="2.375rem" src={iconLink} alt="Показать локацию на карте" />
            </a>
          )}
        </HStack>
      </Heading>
      <DataList.Root orientation="horizontal">
        <DataList.Item>
          <DataList.ItemLabel>Регион</DataList.ItemLabel>
          <DataList.ItemValue>{item.region}</DataList.ItemValue>
        </DataList.Item>
        <DataList.Item>
          <DataList.ItemLabel>Город</DataList.ItemLabel>
          <DataList.ItemValue>{item.city}</DataList.ItemValue>
        </DataList.Item>
        <DataList.Item>
          <DataList.ItemLabel>Адрес</DataList.ItemLabel>
          <DataList.ItemValue>{item.address}</DataList.ItemValue>
        </DataList.Item>
        <DataList.Item>
          <DataList.ItemLabel>Описание</DataList.ItemLabel>
          <DataList.ItemValue>{item.description}</DataList.ItemValue>
        </DataList.Item>
      </DataList.Root>
    </Box>
  );
};
