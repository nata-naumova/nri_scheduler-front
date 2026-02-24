import { Header } from '@/widgets/header';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box as="main" flex="1">
        <Outlet />
      </Box>
    </Flex>
  );
}
