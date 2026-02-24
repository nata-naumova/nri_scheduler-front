import { Button, Flex } from '@chakra-ui/react';

import { LuArrowDownWideNarrow, LuFilter } from 'react-icons/lu';
import { EventDialog } from '@/features/event/event.ui';

export const CalendarToolbar = () => {
  return (
    <Flex justifyContent="end" gap={4}>
      <Button variant="surface">
        <LuArrowDownWideNarrow />
        Сортировка
      </Button>
      <Button variant="surface">
        <LuFilter />
        Фильтры
      </Button>

      <EventDialog />
    </Flex>
  );
};
