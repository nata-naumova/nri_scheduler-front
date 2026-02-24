import { IApiEvent } from '@/entities/event/api/types';
import {
  Button,
  Field,
  Fieldset,
  Group,
  HStack,
  Input,
  InputGroup,
  Stack,
  TagsInput,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

interface EventDetailsFormProps {
  event: IApiEvent | null;
  tz: string;
}

export type StatItem = {
  key: string;
  label: string;
  render: React.ReactNode;
};

export const useEventStats = (event: IApiEvent, tz: string): StatItem[] => {
  const eventDate = dayjs(event.date).tz(tz);

  return [
    {
      key: 'master',
      label: 'Ведущий',
      render: <Input defaultValue={event.master} />,
    },
    {
      key: 'location',
      label: 'Локация',
      render: <Input defaultValue={event.location} />,
    },
    {
      key: 'date',
      label: 'Дата и время',
      render: (
        <>
          <Input defaultValue={eventDate.format('DD MMMM')} />
          <Input defaultValue={eventDate.format('HH:mm')} />
        </>
      ),
    },
    {
      key: '',
      label: 'Параметры',
      render: (
        <HStack alignItems="flex-start" w="full">
          {event.max_slots ? (
            <Stack w="full">
              <Input defaultValue={event.players.length} />
              <Field.HelperText>Максимальное количество игроков {event.max_slots}</Field.HelperText>
            </Stack>
          ) : (
            'Без ограничений'
          )}
          <Stack w="full">
            <Input defaultValue={event.plan_duration || 'Без ограничений'} />
            <Field.HelperText>Длительность игры в часах</Field.HelperText>
          </Stack>
        </HStack>
      ),
    },
    {
      key: '',
      label: 'Игроки',
      render: (
        <TagsInput.Root readOnly defaultValue={event.players.map(([, nick]) => nick)}>
          <TagsInput.Control>
            <TagsInput.Items />

            <TagsInput.Input placeholder="Read-only..." />
          </TagsInput.Control>

          <TagsInput.HiddenInput />
        </TagsInput.Root>
      ),
    },
  ];
};

export const EventDetailsForm = ({ event, tz }: EventDetailsFormProps) => {
  if (!event) return;

  const stats = useEventStats(event, tz);
  return (
    <Fieldset.Root maxW="2xl">
      <Stack mb={4}>
        <Fieldset.Legend fontSize="2xl">Детали события #{event.id}</Fieldset.Legend>
        {/* <Fieldset.HelperText></Fieldset.HelperText> */}
      </Stack>

      <Fieldset.Content gap={2} css={{ '--field-label-width': '150px' }}>
        {stats.map((item) => (
          <Field.Root orientation="horizontal" w="full">
            <Field.Label>{item.label}</Field.Label>
            {item.render}
          </Field.Root>
        ))}
      </Fieldset.Content>
      <Group grow>
        <Button type="submit" alignSelf="flex-start">
          Изменить
        </Button>
        <Button variant="subtle" colorPalette="blue" onClick={() => console.log('onSubscribe')}>
          Записаться
        </Button>
        <Button
          onClick={() => console.log('onReopenEvent')}
          variant="surface"
          colorPalette="purple"
        >
          Переоткрыть
        </Button>
        <Button type="button" variant="subtle" colorPalette="red">
          Отменить
        </Button>
      </Group>
    </Fieldset.Root>
  );
};
