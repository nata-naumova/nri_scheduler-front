import { Box, Button, Container, Flex, HStack } from '@chakra-ui/react';

import { Avatar } from '@/shared/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { Logotype } from '@/shared/ui/custom/logotype';
import { Tooltip } from '@/shared/ui/tooltip';
import { HeaderMenu } from '@/features/header-menu/ui/header-menu';
import { useAuth, useUser } from '@/features/auth/model/useAuth';

export const Header = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();
  const { user } = useUser();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header>
      <Box borderBottomWidth={1} mb={4}>
        <Container>
          <Flex gap={4} align="center" justify="space-between" py="4">
            <Logotype href="/" />

            <HStack gap={6}>
              {isAuthenticated ? (
                <Button variant="surface" onClick={() => navigate('/sign-in')}>
                  Авторизация
                </Button>
              ) : (
                <HStack>
                  <Tooltip content="Профиль">
                    <Button
                      variant="ghost"
                      w={11}
                      h={11}
                      onClick={() => handleNavigation('/profile')}
                    >
                      <Avatar src={user?.avatar_url} fallback={user?.nickname} />
                    </Button>
                  </Tooltip>

                  <HeaderMenu profile={user} isVerified={true} />
                </HStack>
              )}
            </HStack>
          </Flex>
        </Container>
      </Box>
    </header>
  );
};
