import { MENU_HEADER, MENU_HEADER_2 } from '@/shared/config/constants';
import { Avatar } from '@/shared/ui/avatar';
import { Tooltip } from '@/shared/ui/tooltip';
import { Box, HStack, IconButton, Menu, Portal, Stack, Text } from '@chakra-ui/react';
import { LuChevronDown } from 'react-icons/lu';
import { Link } from 'react-router-dom';

interface HeaderMenuProps {
  profile: any;
  isVerified?: boolean;
}

export const HeaderMenu = ({ profile, isVerified }: HeaderMenuProps) => (
  <Menu.Root>
    <Menu.Trigger asChild>
      <Box>
        <Tooltip content="Меню">
          <IconButton variant="ghost" size="xs">
            <LuChevronDown />
          </IconButton>
        </Tooltip>
      </Box>
    </Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel fontSize={12}>Сейчас</Menu.ItemGroupLabel>
            <Menu.Item value={profile.nickname}>
              <HStack>
                <Avatar src={profile?.avatar_url} fallback={profile?.nickname} />
                <Stack gap={1}>
                  <Text fontWeight="bold">{profile.nickname}</Text>
                  <Text color="gray.600">{profile.email}</Text>
                </Stack>
              </HStack>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.Separator />
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel fontSize={12}>Навигация</Menu.ItemGroupLabel>
            {MENU_HEADER.map((link) => (
              <Menu.Item key={link.href} asChild value={link.title} cursor="pointer">
                <Link to={link.href}>{link.title}</Link>
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
          <Menu.Separator />
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel fontSize={12}>Страницы</Menu.ItemGroupLabel>
            {MENU_HEADER_2.map((link) => (
              <Menu.Item key={link.href} asChild value={link.title} cursor="pointer">
                <Link to={link.href}>{link.title}</Link>
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
          <Menu.Separator />
          <Menu.Item value="delete" color="fg.error" _hover={{ bg: 'bg.error', color: 'fg.error' }}>
            Выйти
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
);
