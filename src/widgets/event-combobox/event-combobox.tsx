import {
  Combobox,
  TagsInput,
  useCombobox,
  useFilter,
  useListCollection,
  useTagsInput,
} from '@chakra-ui/react';
import { useId, useRef } from 'react';

export const EventComboboxField = (items: any) => {
  const { contains } = useFilter({ sensitivity: 'base' });

  const { collection, filter } = useListCollection({
    initialItems: items,
    filter: contains,
  });

  const uid = useId();
  const controlRef = useRef<HTMLDivElement | null>(null);

  const tags = useTagsInput({
    ids: { input: `input_${uid}`, control: `control_${uid}` },
  });

  const comobobox = useCombobox({
    ids: { input: `input_${uid}`, control: `control_${uid}` },
    collection,
    onInputValueChange(e) {
      filter(e.inputValue);
    },
    value: [],
    allowCustomValue: true,
    onValueChange: (e) => tags.addValue(e.value[0]),
    selectionBehavior: 'clear',
  });

  return (
    <Combobox.RootProvider value={comobobox}>
      <TagsInput.RootProvider value={tags}>
        <TagsInput.Label>Кампания</TagsInput.Label>

        <TagsInput.Control ref={controlRef}>
          {tags.value.map((tag, index) => (
            <TagsInput.Item key={index} index={index} value={tag}>
              <TagsInput.ItemPreview>
                <TagsInput.ItemText>{tag}</TagsInput.ItemText>
                <TagsInput.ItemDeleteTrigger />
              </TagsInput.ItemPreview>
            </TagsInput.Item>
          ))}

          <Combobox.Input unstyled asChild>
            <TagsInput.Input placeholder="Заполните поле" />
          </Combobox.Input>
        </TagsInput.Control>

        <Combobox.Positioner>
          <Combobox.Content>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.id}>
                <Combobox.ItemText>{item.name}</Combobox.ItemText>
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </TagsInput.RootProvider>
    </Combobox.RootProvider>
  );
};
