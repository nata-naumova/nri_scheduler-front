import { parseColor, Portal } from '@ark-ui/react';
import { Box, Button, ColorPicker, HStack, Presence, Stack, useDisclosure } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

export const PreviewCompany = () => {
  const { open, onToggle } = useDisclosure();

  return (
    <>
      <Stack gap={2}>
        <Box p="1" borderLeftWidth="4px" borderRadius="4px">
          Название кампании
        </Box>
        <Presence
          present={open}
          animationName={{ _open: 'fade-in', _closed: 'fade-out' }}
          animationDuration="moderate"
        >
          <Stack gap={2}>
            {(['background', 'highlight', 'text'] as const).map((name) => (
              <Controller
                key={name}
                name={`style.${name}`}
                render={({ field }) => (
                  <ColorPicker.Root
                    value={parseColor(field.value)}
                    onValueChange={(e) => field.onChange(e.value.toString('hex'))}
                    size="xs"
                  >
                    <ColorPicker.HiddenInput />
                    <ColorPicker.Label>
                      {name === 'background' ? 'Фон' : name === 'highlight' ? 'Акцент' : 'Текст'}
                    </ColorPicker.Label>
                    <ColorPicker.Control>
                      <ColorPicker.Input />
                      <ColorPicker.Trigger />
                    </ColorPicker.Control>
                    <Portal>
                      <ColorPicker.Positioner zIndex="popover !important">
                        <ColorPicker.Content>
                          <ColorPicker.Area />
                          <HStack>
                            <ColorPicker.EyeDropper size="xs" variant="outline" />
                            <ColorPicker.Sliders />
                          </HStack>
                        </ColorPicker.Content>
                      </ColorPicker.Positioner>
                    </Portal>
                  </ColorPicker.Root>
                )}
              />
            ))}
          </Stack>
        </Presence>
        <Button variant="outline" onClick={onToggle}>
          Изменить стиль
        </Button>
      </Stack>
    </>
  );
};
