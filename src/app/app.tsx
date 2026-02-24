import { ErrorBoundary } from './error-boundary';
import AppRouter from './browser-router';
import { Toaster } from '@/shared/ui/toaster';
import { ChakraAppProvider } from './providers/chakra-provider';
import { Theme } from '@chakra-ui/react';

function App() {
  return (
    <ErrorBoundary>
      <ChakraAppProvider>
        <Theme appearance="dark">
          <AppRouter />
          <Toaster />
        </Theme>
      </ChakraAppProvider>
    </ErrorBoundary>
  );
}

export default App;
