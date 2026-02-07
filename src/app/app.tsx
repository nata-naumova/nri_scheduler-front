import { ErrorBoundary } from './error-boundary';
import AppRouter from './browser-router';
import { Toaster } from '@/shared/ui/toaster';
import { ChakraAppProvider } from './providers/chakra-provider';

function App() {
  return (
    <ErrorBoundary>
      <ChakraAppProvider>
        <AppRouter />
        <Toaster />
      </ChakraAppProvider>
    </ErrorBoundary>
  );
}

export default App;
