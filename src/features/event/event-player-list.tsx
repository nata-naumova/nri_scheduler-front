import { Box, HStack, Link, Text } from '@chakra-ui/react';
import React from 'react';

interface Player {
  userId: string;
  nickname: string;
}

interface EventPlayersListProps {
  players: Player[];
}

export const EventPlayersList = ({ players }: EventPlayersListProps) => {
  if (!players.length) return <Text>Пока никто не записался</Text>;

  return (
    <HStack>
      {players.map((player, i) => (
        <React.Fragment key={player.userId}>
          <Link href={`/profile/${player.userId}`} colorPalette="blue">
            {player.nickname}
          </Link>
          {i !== players.length - 1 && <Text>, </Text>}
        </React.Fragment>
      ))}
    </HStack>
  );
};
