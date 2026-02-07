import { useState } from 'react';
import { Box, Button, Container, Flex, HStack, Link, Stack, Text } from '@chakra-ui/react';

import { useStore } from '@nanostores/react';
import { useAuthVerification } from '@/shared/utils';
import { $avatarLink } from '@/app/store/profile';
import { logout } from '@/shared/api';
import { Popover } from '@/shared/ui/popover';
import { Avatar } from '@/shared/ui/avatar';
import { useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const { profile, isAuthenticated, isVerified } = useAuthVerification();
  const avatarLink = useStore($avatarLink);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/sign-in');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header>
      <Box borderBottomWidth={1} mb={6}>
        <Container>
          <Flex gap={4} align="center" justify="space-between" py="6">
            <Link variant="plain" href="/calendar" fontWeight={600} fontSize={24} minHeight="44px">
              НРИ Календарь
            </Link>
            {!isAuthenticated ? (
              <Popover
                open={open}
                onOpenChange={(e) => setOpen(e.open)}
                positioning={{ placement: 'bottom-end' }}
                content={
                  <Stack>
                    <Button variant="ghost" onClick={() => handleNavigation('/profile')}>
                      Профиль
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => isVerified && handleNavigation('/regions')}
                      disabled={!isVerified}
                      cursor={isVerified ? 'pointer' : 'not-allowed'}
                    >
                      {isVerified ? 'Регионы и города' : 'Регионы и города (подтвердите эл. почту)'}
                    </Button>
                    <Button variant="ghost" colorPalette="red" onClick={handleLogout}>
                      Выйти
                    </Button>
                  </Stack>
                }
              >
                <HStack key={profile?.email} gap="4">
                  <Avatar src={avatarLink?.link} fallback={profile?.nickname} />
                  <Stack gap="0">
                    <Text fontWeight="medium">{profile?.nickname}</Text>
                    <Text color="fg.muted" textStyle="sm">
                      {profile?.email}
                    </Text>
                  </Stack>
                </HStack>
              </Popover>
            ) : (
              path !== '/sign-in' &&
              path !== '/sign-up' && (
                <Button type="button" h="44px" ml="auto" onClick={() => navigate('/sign-in')}>
                  Вход и регистрация
                </Button>
              )
            )}
          </Flex>
        </Container>
      </Box>
    </header>
  );
};
