import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Stack,
  Popover,
  Portal,
} from '@chakra-ui/react';

import { useAuthVerification } from '@/shared/utils';
import { $avatarLink } from '@/app/store/profile';

import { Avatar } from '@/shared/ui/avatar';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '@/shared/api/auth';
import { useStore } from '@nanostores/react';
import { Logotype } from '@/shared/ui/custom/logotype';
import { Tooltip } from '@/shared/ui/tooltip';
import { LuChevronDown } from 'react-icons/lu';
import { HeaderMenu } from '@/features/header-menu/ui/header-menu';

export const Header = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  // const { profile, isAuthenticated, isVerified } = useAuthVerification();
  // const avatarLink = useStore($avatarLink);

  const profile = {
    email: 'test@ya.ru',
    nickname: 'test',
    link: 'https://i.pinimg.com/1200x/40/80/31/408031a6390ed009ae9da918fae73032.jpg',
  };
  const isVerified = true;

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
      <Box borderBottomWidth={1} mb={4}>
        <Container>
          <Flex gap={4} align="center" justify="space-between" py="4">
            <Logotype href="/" />

            <HStack gap={6}>
              <Button variant="surface" onClick={() => navigate('/sign-in')}>
                Авторизация
              </Button>
              <HStack>
                <Tooltip content="Профиль">
                  <Button
                    variant="ghost"
                    w={11}
                    h={11}
                    onClick={() => handleNavigation('/profile')}
                  >
                    <Avatar src={profile?.link} fallback={profile?.nickname} />
                  </Button>
                </Tooltip>

                <HeaderMenu profile={profile} isVerified={isVerified} />
              </HStack>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </header>
  );
};
