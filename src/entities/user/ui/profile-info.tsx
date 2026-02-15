import { Box, Heading, Text, Badge, Stack } from '@chakra-ui/react';

type Props = {
  user: ProfileUser;
};

export const ProfileInfo = ({ user }: Props) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={6}>
      <Stack spacing={4}>
        <Heading size="md">{user.nickname}</Heading>

        <Stack spacing={1}>
          <Text fontWeight="medium">Email</Text>
          <Text>{user.email}</Text>
          {user.email_verified && <Badge w="fit-content">подтвержден</Badge>}
        </Stack>

        {user.city && (
          <Stack spacing={1}>
            <Text fontWeight="medium">Город</Text>
            <Text>{user.city}</Text>
          </Stack>
        )}

        {user.about_me && (
          <Stack spacing={1}>
            <Text fontWeight="medium">О себе</Text>
            <Text whiteSpace="pre-wrap">{user.about_me}</Text>
          </Stack>
        )}

        {user.verified && (
          <Badge colorScheme="green" w="fit-content">
            Профиль подтверждён
          </Badge>
        )}
      </Stack>
    </Box>
  );
};
