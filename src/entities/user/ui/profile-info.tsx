import { Box, Heading, Text, Badge, Stack } from '@chakra-ui/react';
import { TStoreProfile } from '../profile/model/profile.types';

type Props = {
  user: TStoreProfile | null;
};

export const ProfileInfo = ({ user }: Props) => {
  if (!user) return;

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6}>
      <Stack spaceY={4}>
        <Heading size="md">{user.nickname}</Heading>

        <Stack spaceY={1}>
          <Text fontWeight="medium">Email</Text>
          <Text>{user.email}</Text>
          {user.email_verified && <Badge w="fit-content">подтвержден</Badge>}
        </Stack>

        {user.city && (
          <Stack spaceY={1}>
            <Text fontWeight="medium">Город</Text>
            <Text>{user.city}</Text>
          </Stack>
        )}

        {user.about_me && (
          <Stack spaceY={1}>
            <Text fontWeight="medium">О себе</Text>
            <Text whiteSpace="pre-wrap">{user.about_me}</Text>
          </Stack>
        )}

        {user.email_verified && (
          <Badge colorScheme="green" w="fit-content">
            Профиль подтверждён
          </Badge>
        )}
      </Stack>
    </Box>
  );
};
