import { IApiEvent } from '@/entities/event/api/types';
import { Heading, HStack, Link } from '@chakra-ui/react';

interface EventCardHeaderProps {
  event: IApiEvent;
}

export const EventCardHeader = ({ event }: EventCardHeaderProps) => (
  <HStack mb="6" gap="3">
    <Heading size="3xl">
      Игра по кампании:&nbsp;
      <Link colorPalette="cyan" variant="underline" href={`/company/${event.company_id}`}>
        {event.company}
      </Link>
    </Heading>
  </HStack>
);
