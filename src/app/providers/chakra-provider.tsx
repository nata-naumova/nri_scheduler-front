import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { ReactNode } from 'react';

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {},
  },
});

export function ChakraAppProvider({ children }: { children: ReactNode }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
