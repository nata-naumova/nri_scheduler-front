import { ErrorBoundary } from './error-boundary';
import AppRouter from './browser-router';
import { Toaster } from '@chakra-ui/react';

function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
      <Toaster />
    </ErrorBoundary>
  );
}

export default App;
