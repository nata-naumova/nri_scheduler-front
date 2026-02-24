import { Card, DataList, HStack, Skeleton } from '@chakra-ui/react';

export const LocationCardSkeleton = () => {
  const stats = [{ label: 'Имя' }, { label: 'Адрес' }, { label: 'Описание' }];

  return (
    <Card.Root width="full">
      <Card.Body>
        <HStack mb="6" gap="3">
          <Skeleton height="38px" w="30%" />
        </HStack>
        <DataList.Root orientation="horizontal">
          {stats.map((item, index) => (
            <DataList.Item key={index}>
              <DataList.ItemLabel minW="150px">{item.label}</DataList.ItemLabel>
              <DataList.ItemValue color="black" fontWeight="500">
                <Skeleton height="20px" w="30%" />
              </DataList.ItemValue>
            </DataList.Item>
          ))}
        </DataList.Root>
      </Card.Body>
    </Card.Root>
  );
};
