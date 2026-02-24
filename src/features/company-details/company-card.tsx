import { IApiCompanyInfo } from '@/entities/company/api/types';
import { Box, DataList, Heading, HStack } from '@chakra-ui/react';

interface CompanyCardProps {
  item: IApiCompanyInfo;
}

export const CompanyCard = ({ item }: CompanyCardProps) => {
  if (!item) return <Box>Компания не найдена. Попробуйте снова</Box>;

  return (
    <Box my={6} spaceY={4}>
      <HStack justifyContent="space-between" gap={2} flexWrap="wrap" alignItems="center">
        <Heading size="3xl">{item.name}</Heading>
      </HStack>
      <DataList.Root orientation="horizontal">
        <DataList.Item>
          <DataList.ItemLabel>Система</DataList.ItemLabel>
          <DataList.ItemValue>{item.system}</DataList.ItemValue>
        </DataList.Item>
        <DataList.Item>
          <DataList.ItemLabel>Мастер игры</DataList.ItemLabel>
          <DataList.ItemValue>{item.master_name}</DataList.ItemValue>
        </DataList.Item>
        <DataList.Item>
          <DataList.ItemLabel>Описание</DataList.ItemLabel>
          <DataList.ItemValue>{item.description}</DataList.ItemValue>
        </DataList.Item>
      </DataList.Root>
    </Box>
  );
};
