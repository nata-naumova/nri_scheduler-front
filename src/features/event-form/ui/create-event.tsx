import { Field } from '@/shared/ui/field';
import { Stack } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

export const CreateEventForm = () => {
  const companiesLength = 0;

  return (
    <form onSubmit={() => console.log('CreateEventForm form submit')}>
      <Stack gap="4" w="full">
        <Field
          label="Кампания *"
          helperText={companiesLength > 0 ? '' : 'Сначала создайте кампанию'}
          errorText={errors.company?.message}
          invalid={!!errors.company?.message}
        >
          <Controller
            name="company"
            control={control}
            rules={{ required: 'Выберите кампанию' }}
            render={({ field }) => (
              <AutoComplete
                onChange={field.onChange}
                openOnFocus
                freeSolo
                value={field.value}
                emptyState="Ничего не найдено"
              >
                <AutoCompleteInput
                  variant="outline"
                  onBlur={field.onBlur}
                  ref={field.ref}
                  disabled={companies.items.length < 1}
                />
                <AutoCompleteList bg="inherit">
                  <AutoCompleteGroup>
                    {companies.items.map((c) => (
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
            )}
          />
        </Field>

        <HStack alignItems="start" gap={2} width="full">
          <Field label="Начало" errorText={errors.start?.message} invalid={!!errors.start?.message}>
            <Input
              type="date"
              min={dayjs().tz(tz).format(YYYY_MM_DD)}
              {...register('start', {
                required: 'Заполните поле',
                validate: validateDate,
              })}
            />
          </Field>
          <Field
            label="Время"
            errorText={errors.startTime?.message}
            invalid={!!errors.startTime?.message}
          >
            <Input
              type="time"
              {...register('startTime', {
                required: 'Заполните поле',
                validate: validateTime,
              })}
            />
          </Field>
        </HStack>

        <Card.Root>
          <Card.Body padding={2}>
            <Field
              label="Локация *"
              helperText={locations.items.length > 0 ? '' : 'Сначала создайте локацию'}
              errorText={errors.location?.message}
              invalid={!!errors.location?.message}
            >
              <Controller
                name="location"
                control={control}
                rules={{ required: 'Выберите локацию' }}
                render={({ field }) => (
                  <AutoComplete
                    onChange={field.onChange}
                    openOnFocus
                    freeSolo
                    value={field.value}
                    emptyState="Ничего не найдено"
                  >
                    <AutoCompleteInput
                      variant="outline"
                      onBlur={field.onBlur}
                      ref={field.ref}
                      disabled={locations.items.length < 1}
                    />
                    <AutoCompleteList bg="inherit">
                      <AutoCompleteGroup>
                        {locations.items.map((option) => (
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
                )}
              />
            </Field>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <CardBody padding={2}>
            <Field
              label="Максимальное количество игроков"
              errorText={errors.max_slots?.message}
              invalid={!!errors.max_slots?.message && !isMaxSlotsChecked}
            >
              <Input
                type="number"
                placeholder="Заполните поле"
                disabled={isMaxSlotsChecked}
                {...register('max_slots', {
                  validate: (value) => {
                    if (!isMaxSlotsChecked && !value) {
                      return 'Укажите количество игроков';
                    }
                    return true;
                  },
                })}
              />
            </Field>
            <Controller
              name="isMax_slots"
              control={control}
              render={({ field }) => (
                <Checkbox.Root
                  mt={2}
                  checked={field.value}
                  onCheckedChange={({ checked }) => field.onChange(checked)}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Без ограничений</Checkbox.Label>
                </Checkbox.Root>
              )}
            />
          </CardBody>
        </Card.Root>

        <Card.Root>
          <CardBody padding={2}>
            <Field
              label="Планируемая длительность"
              errorText={errors.plan_duration?.message}
              invalid={!!errors.plan_duration?.message && !isMaxDuration}
            >
              <Group attached w="full">
                <Input
                  type="number"
                  placeholder="Заполните поле"
                  min="1"
                  step="1"
                  disabled={isMaxDuration}
                  {...register('plan_duration', {
                    validate: (value) => {
                      if (!isMaxDuration && !value) {
                        return 'Укажите продолжительность';
                      }
                      return true;
                    },
                  })}
                />
                <InputAddon>час</InputAddon>
              </Group>
            </Field>

            <Controller
              name="isPlan_duration"
              control={control}
              render={({ field }) => (
                <Checkbox.Root
                  mt={2}
                  checked={field.value}
                  onCheckedChange={({ checked }) => field.onChange(checked)}
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                  <Checkbox.Label>Без ограничений</Checkbox.Label>
                </Checkbox.Root>
              )}
            />
          </CardBody>
        </Card.Root>
      </Stack>
      <Button disabled={isDisableCreateEventSubmitButton} type="submit" w="full" mt={6}>
        Создать
      </Button>
    </form>
  );
};
