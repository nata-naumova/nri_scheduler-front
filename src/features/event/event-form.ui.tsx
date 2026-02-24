// import { EventComboboxField } from '@/widgets/event-combobox/event-combobox';
import { Checkbox, Group, HStack, Input, InputAddon } from '@chakra-ui/react';
import { useEventForm } from '../event-form/model/useEventForm';
import { Field } from '@/shared/ui/field';
import { Controller } from 'react-hook-form';
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';

export const EventFormCreate = () => {
  const { form, onSubmit } = useEventForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const companies = [
    { id: 1, name: 'companies1' },
    { id: 2, name: 'companies2' },
  ];
  const locations = [
    { id: 1, name: 'locations1' },
    { id: 2, name: 'locations2' },
  ];

  return (
    <form onSubmit={() => console.log('onSubmit EventFormCreate')}>
      {/* <EventComboboxField items={companies} />
        <EventComboboxField items={locations} /> */}

      <Field
        label="Кампания *"
        // helperText={companies.items.length > 0 ? '' : 'Сначала создайте кампанию'}
        errorText={errors.company?.message}
        invalid={!!errors.company?.message}
      >
        <AutoComplete
          // onChange={field.onChange}
          openOnFocus
          freeSolo
          // value={field.value}
          emptyState="Ничего не найдено"
        >
          <AutoCompleteInput
            variant="outline"
            // onBlur={field.onBlur}
            // ref={field.ref}
            disabled={companies.length < 1}
          />
          <AutoCompleteList bg="inherit">
            <AutoCompleteGroup>
              {companies.map((c) => (
                <AutoCompleteItem
                  key={c.id}
                  value={{ title: c.id }}
                  label={c.name}
                  textTransform="capitalize"
                  _hover={{
                    bg: 'gray.200',
                  }}
                />
              ))}
            </AutoCompleteGroup>
          </AutoCompleteList>
        </AutoComplete>
      </Field>

      <HStack alignItems="start" gap={2} width="full">
        <Field label="Начало" errorText={errors.start?.message} invalid={!!errors.start?.message}>
          <Input
            type="date"
            // min={dayjs().tz(tz).format(YYYY_MM_DD)}
            // {...register('start', {
            //   required: 'Заполните поле',
            //   validate: validateDate,
            // })}
          />
        </Field>
        <Field
          label="Время"
          errorText={errors.startTime?.message}
          invalid={!!errors.startTime?.message}
        >
          <Input
            type="time"
            // {...register('startTime', {
            //   required: 'Заполните поле',
            //   validate: validateTime,
            // })}
          />
        </Field>
      </HStack>
      <Field
        label="Локация *"
        helperText={locations.length > 0 ? '' : 'Сначала создайте локацию'}
        errorText={errors.location?.message}
        invalid={!!errors.location?.message}
      >
        <AutoComplete
          // onChange={field.onChange}
          openOnFocus
          freeSolo
          // value={field.value}
          emptyState="Ничего не найдено"
        >
          <AutoCompleteInput
            variant="outline"
            // onBlur={field.onBlur}
            // ref={field.ref}
            disabled={locations.length < 1}
          />
          <AutoCompleteList bg="inherit">
            <AutoCompleteGroup>
              {locations.map((option) => (
                <AutoCompleteItem
                  key={option.id}
                  value={{
                    title: option.id,
                  }}
                  label={option.name}
                  textTransform="capitalize"
                  _hover={{
                    bg: 'gray.200',
                  }}
                />
              ))}
            </AutoCompleteGroup>
          </AutoCompleteList>
        </AutoComplete>
      </Field>

      <Field
        label="Максимальное количество игроков"
        errorText={errors.max_slots?.message}
        // invalid={!!errors.max_slots?.message && !isMaxSlotsChecked}
      >
        <Input
          type="number"
          placeholder="Заполните поле"
          // disabled={isMaxSlotsChecked}
          // {...register('max_slots', {
          //   validate: (value) => {
          //     if (!isMaxSlotsChecked && !value) {
          //       return 'Укажите количество игроков';
          //     }
          //     return true;
          //   },
          // })}
        />
      </Field>

      <Checkbox.Root
        mt={2}
        // checked={field.value}
        // onCheckedChange={({ checked }) => field.onChange(checked)}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Без ограничений</Checkbox.Label>
      </Checkbox.Root>
      <Field
        label="Планируемая длительность"
        errorText={errors.plan_duration?.message}
        // invalid={!!errors.plan_duration?.message && !isMaxDuration}
      >
        <Group attached w="full">
          <Input
            type="number"
            placeholder="Заполните поле"
            min="1"
            step="1"
            // disabled={isMaxDuration}
            // {...register('plan_duration', {
            //   validate: (value) => {
            //     if (!isMaxDuration && !value) {
            //       return 'Укажите продолжительность';
            //     }
            //     return true;
            //   },
            // })}
          />
          <InputAddon>час</InputAddon>
        </Group>
      </Field>

      <Checkbox.Root
        mt={2}
        // checked={field.value}
        // onCheckedChange={({ checked }) => field.onChange(checked)}
      >
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Без ограничений</Checkbox.Label>
      </Checkbox.Root>
    </form>
  );
};
